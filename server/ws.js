const { WebSocketServer } = require('ws');
const { getUserFromToken } = require('./auth');
const { getGuildsForUser, isChannelMember, findChannel, getDmContacts, shareGuild } = require('./directory');
const { findUserById, serializeUser } = require('./profile');
const { FLAGS, hasPermission } = require('./permissions');

const channelPresence = new Map(); // channelId -> Set<ws> (canais de texto)
const voicePresence = new Map(); // channelId -> Set<ws> (canais de voz - presenca separada da de texto)
const socketMeta = new WeakMap(); // ws -> { user, channels: Set<channelId>, voiceChannels: Set<channelId> }
const userSockets = new Map(); // userId -> Set<ws>

function send(ws, payload) {
  if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(payload));
}

// Chamado pelo REST (kick/ban) pra derrubar a conexao ao vivo do usuario.
// So existe um server WS por processo, entao dados de presenca vivem em
// escopo de modulo em vez de dentro de attachWebSocket - evita ciclo de
// require entre directory.js e ws.js (directory usa require() tardio aqui).
function disconnectUserFromGuild(userId, guildId, guildName, reason) {
  const sockets = userSockets.get(userId);
  if (!sockets) return;
  for (const ws of [...sockets]) {
    send(ws, { type: 'kicked', guildId, guildName, reason });
    ws.close();
  }
}

function attachWebSocket(server) {
  const wss = new WebSocketServer({ server });

  function broadcastToSet(presenceMap, channelId, payload, exclude) {
    const set = presenceMap.get(channelId);
    if (!set) return;
    for (const client of set) {
      if (client !== exclude) send(client, payload);
    }
  }

  function presenceUsers(presenceMap, channelId) {
    const set = presenceMap.get(channelId);
    if (!set) return [];
    return [...set].map((client) => socketMeta.get(client).user);
  }

  function broadcastToChannel(channelId, payload, exclude) {
    broadcastToSet(channelPresence, channelId, payload, exclude);
  }

  function leaveChannel(ws, channelId) {
    const meta = socketMeta.get(ws);
    if (!meta || !meta.channels.has(channelId)) return;

    const set = channelPresence.get(channelId);
    if (set) {
      set.delete(ws);
      if (set.size === 0) channelPresence.delete(channelId);
    }
    meta.channels.delete(channelId);
    broadcastToChannel(channelId, { type: 'presence:leave', channelId, user: meta.user });
  }

  // DM nao tem "sala" - presenca e so "esse usuario esta online em algum lugar".
  // Avisa cada contato (quem compartilha guild) que ja esta online agora mesmo.
  function broadcastDmPresence(userId, online) {
    for (const contact of getDmContacts(userId)) {
      const targets = userSockets.get(contact.id);
      if (!targets) continue;
      for (const target of targets) send(target, { type: 'dm:presence', userId, online });
    }
  }

  function leaveVoiceChannel(ws, channelId) {
    const meta = socketMeta.get(ws);
    if (!meta || !meta.voiceChannels.has(channelId)) return;

    const set = voicePresence.get(channelId);
    if (set) {
      set.delete(ws);
      if (set.size === 0) voicePresence.delete(channelId);
    }
    meta.voiceChannels.delete(channelId);
    broadcastToSet(voicePresence, channelId, { type: 'voice:presence:leave', channelId, user: meta.user });
  }

  wss.on('connection', (ws) => {
    ws.on('message', (raw) => {
      let msg;
      try {
        msg = JSON.parse(raw);
      } catch {
        return;
      }

      if (msg.type === 'identify') {
        const session = getUserFromToken(msg.token);
        if (!session) {
          send(ws, { type: 'error', text: 'Token invalido.' });
          ws.close();
          return;
        }
        const profile = serializeUser(findUserById.get(session.id));
        const wasOffline = !userSockets.has(profile.id) || userSockets.get(profile.id).size === 0;
        socketMeta.set(ws, { user: profile, channels: new Set(), voiceChannels: new Set() });
        if (!userSockets.has(profile.id)) userSockets.set(profile.id, new Set());
        userSockets.get(profile.id).add(ws);

        const dmContacts = getDmContacts(profile.id).map((c) => ({ ...c, online: userSockets.has(c.id) }));
        send(ws, { type: 'identify-ack', user: profile, guilds: getGuildsForUser(session.id), dmContacts });
        // So espalha "fiquei online" na primeira conexao desse usuario (evita
        // barulho de presenca quando ele so abre uma segunda janela/aba).
        if (wasOffline) broadcastDmPresence(profile.id, true);
        return;
      }

      const meta = socketMeta.get(ws);
      if (!meta) {
        send(ws, { type: 'error', text: 'Envie identify primeiro.' });
        return;
      }

      if (msg.type === 'channel:join') {
        const channelId = Number(msg.channelId);
        if (!isChannelMember(channelId, meta.user.id)) {
          send(ws, { type: 'error', text: 'Sem acesso a esse canal.' });
          return;
        }

        if (!channelPresence.has(channelId)) channelPresence.set(channelId, new Set());
        const peers = presenceUsers(channelPresence, channelId);
        channelPresence.get(channelId).add(ws);
        meta.channels.add(channelId);

        send(ws, { type: 'channel:peers', channelId, peers });
        broadcastToChannel(channelId, { type: 'presence:join', channelId, user: meta.user }, ws);
        return;
      }

      if (msg.type === 'channel:leave') {
        leaveChannel(ws, Number(msg.channelId));
        return;
      }

      if (msg.type === 'voice:join') {
        const channelId = Number(msg.channelId);
        const channel = findChannel.get(channelId);
        if (!channel || channel.type !== 'voice') {
          send(ws, { type: 'error', text: 'Canal de voz invalido.' });
          return;
        }
        if (!isChannelMember(channelId, meta.user.id) || !hasPermission(channel.guild_id, meta.user.id, FLAGS.CONNECT)) {
          send(ws, { type: 'error', text: 'Sem permissao pra entrar nesse canal de voz.' });
          return;
        }

        if (!voicePresence.has(channelId)) voicePresence.set(channelId, new Set());
        const voicePeers = presenceUsers(voicePresence, channelId);
        voicePresence.get(channelId).add(ws);
        meta.voiceChannels.add(channelId);

        send(ws, { type: 'voice:peers', channelId, peers: voicePeers });
        broadcastToSet(voicePresence, channelId, { type: 'voice:presence:join', channelId, user: meta.user }, ws);
        return;
      }

      if (msg.type === 'voice:leave') {
        leaveVoiceChannel(ws, Number(msg.channelId));
        return;
      }

      if (msg.type === 'rtc:offer' || msg.type === 'rtc:answer' || msg.type === 'rtc:ice' || msg.type === 'rtc:media-state') {
        // Conteudo do chat/voz/video trafega P2P (DataChannel/tracks) - o servidor
        // so faz o relay da sinalizacao WebRTC (offer/answer/ICE/estado de midia),
        // nunca ve o conteudo. "kind" distingue conexao de texto (data channel) de
        // voz (audio/video) - sao RTCPeerConnections separadas entre os mesmos dois
        // usuarios. "rtc:media-state" avisa o peer se uma track de video recebida e
        // camera ou compartilhamento de tela (o servidor so repassa, nao interpreta).
        const toUserId = Number(msg.to);

        // DM nao passa por sala/canal - so precisa checar que os dois compartilham
        // guild (mesma regra usada pra montar a lista de contatos) e que o alvo
        // esta online em algum lugar.
        if (msg.kind === 'dm') {
          if (!shareGuild(meta.user.id, toUserId)) {
            send(ws, { type: 'error', text: 'Sem permissao pra mandar DM pra esse usuario.' });
            return;
          }
          const targetSockets = userSockets.get(toUserId);
          if (!targetSockets) return; // peer offline - handshake se perde (esperado)

          const relay = { type: msg.type, from: meta.user.id, kind: 'dm' };
          if (msg.type === 'rtc:ice') relay.candidate = msg.candidate;
          else if (msg.type === 'rtc:media-state') relay.tracks = msg.tracks;
          else relay.sdp = msg.sdp;
          for (const target of targetSockets) send(target, relay);
          return;
        }

        const channelId = Number(msg.channelId);
        const kind = msg.kind === 'voice' ? 'voice' : 'text';
        const myChannels = kind === 'voice' ? meta.voiceChannels : meta.channels;
        const presenceMap = kind === 'voice' ? voicePresence : channelPresence;

        if (!myChannels.has(channelId)) {
          send(ws, { type: 'error', text: 'Voce nao esta nesse canal.' });
          return;
        }

        const channelSet = presenceMap.get(channelId);
        const targetInChannel = channelSet && [...channelSet].some((s) => socketMeta.get(s)?.user.id === toUserId);
        if (!targetInChannel) return;

        const targetSockets = userSockets.get(toUserId);
        if (!targetSockets) return; // peer desconectou entre o join e a sinalizacao - handshake se perde (esperado)

        const relay = { type: msg.type, from: meta.user.id, channelId, kind };
        if (msg.type === 'rtc:ice') relay.candidate = msg.candidate;
        else if (msg.type === 'rtc:media-state') relay.tracks = msg.tracks;
        else relay.sdp = msg.sdp;
        for (const target of targetSockets) send(target, relay);
        return;
      }

      if (msg.type === 'profile:refresh') {
        meta.user = serializeUser(findUserById.get(meta.user.id));
        for (const channelId of meta.channels) {
          broadcastToChannel(channelId, { type: 'presence:update', channelId, user: meta.user });
        }
      }
    });

    ws.on('close', () => {
      const meta = socketMeta.get(ws);
      if (!meta) return;
      for (const channelId of [...meta.channels]) leaveChannel(ws, channelId);
      for (const channelId of [...meta.voiceChannels]) leaveVoiceChannel(ws, channelId);
      const sockets = userSockets.get(meta.user.id);
      if (sockets) {
        sockets.delete(ws);
        if (sockets.size === 0) {
          userSockets.delete(meta.user.id);
          broadcastDmPresence(meta.user.id, false); // so a ultima conexao caindo conta como "ficou offline"
        }
      }
      socketMeta.delete(ws);
    });
  });

  return wss;
}

module.exports = { attachWebSocket, disconnectUserFromGuild };
