(function () {
  // STUN sozinho resolve a maioria das redes domesticas, mas falha atras de
  // NAT simetrico/CGNAT (comum em redes moveis e em vários provedores) - sem
  // TURN, dois peers em redes bem diferentes podem nao conseguir trocar midia
  // direto e o ICE fica preso em "checking"/"failed". Testamos um TURN
  // publico gratuito (Open Relay Project/metered.ca) e as credenciais
  // compartilhadas antigas nao funcionam mais (ICE gathering nunca completa,
  // sem candidato relay). Pra reativar TURN de verdade: gerar credenciais
  // reais numa conta gratuita (Metered.ca/Twilio/Cloudflare Calls) ou subir
  // um coturn proprio, e adicionar aqui - e o unico lugar que precisa mudar,
  // ja que os tres gerenciadores de peer (chat de texto, DM, voz/video)
  // reusam este config.
  const RTC_CONFIG = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

  // Cada chamador (chat de texto, chamada de voz/video) pede sua propria instancia
  // via createPeerManager() - conexoes RTCPeerConnection totalmente separadas mesmo
  // quando os dois lados envolvem o mesmo par de usuarios.
  //
  // Implementa "perfect negotiation": cada peer e combinado como polido (cede em
  // colisao de oferta) ou impolido (sempre insiste na propria oferta) de forma fixa
  // - isso deixa renegociacao (ligar camera/compartilhar tela no meio da chamada)
  // segura mesmo se as duas pontas tentarem ofertar ao mesmo tempo.
  function createPeerManager() {
    const connections = new Map(); // peerId -> { pc, dc, polite, makingOffer, ignoreOffer }
    const pendingCandidates = new Map(); // peerId -> candidate[] (chegaram antes da remote description)

    let handlers = {
      onIceCandidate: () => {},
      onLocalDescription: () => {},
      onOpen: () => {},
      onMessage: () => {},
      onClose: () => {},
      onTrack: () => {},
      onPeerConnectionCreated: () => {},
    };

    function configure(partial) {
      handlers = { ...handlers, ...partial };
    }

    function attachDataChannel(peerId, dc) {
      const entry = connections.get(peerId);
      if (!entry) return;
      entry.dc = dc;
      dc.addEventListener('open', () => handlers.onOpen(peerId));
      dc.addEventListener('close', () => handlers.onClose(peerId));
      dc.addEventListener('message', (event) => {
        let data;
        try {
          data = JSON.parse(event.data);
        } catch {
          return;
        }
        handlers.onMessage(peerId, data);
      });
    }

    function open(peerId, { polite = true, withDataChannel = false } = {}) {
      let entry = connections.get(peerId);
      if (entry) return entry;

      const pc = new RTCPeerConnection(RTC_CONFIG);
      entry = { pc, dc: null, polite, makingOffer: false, ignoreOffer: false };
      connections.set(peerId, entry);

      pc.addEventListener('icecandidate', (event) => {
        if (event.candidate) handlers.onIceCandidate(peerId, event.candidate);
      });
      pc.addEventListener('connectionstatechange', () => {
        if (pc.connectionState === 'closed' || pc.connectionState === 'failed') {
          closePeer(peerId);
        }
      });
      pc.addEventListener('datachannel', (event) => {
        attachDataChannel(peerId, event.channel);
      });
      pc.addEventListener('track', (event) => {
        handlers.onTrack(peerId, event);
      });
      pc.addEventListener('negotiationneeded', async () => {
        try {
          entry.makingOffer = true;
          await pc.setLocalDescription();
          handlers.onLocalDescription(peerId, pc.localDescription);
        } catch (err) {
          console.warn('Falha ao negociar com peer', peerId, err);
        } finally {
          entry.makingOffer = false;
        }
      });

      // Hook sincrono - quem chama (ex: voice.js) usa isso pra adicionar tracks
      // locais (audio/video) ANTES de qualquer offer/answer ser gerada.
      handlers.onPeerConnectionCreated(peerId, pc);

      if (withDataChannel) {
        const dc = pc.createDataChannel('chat');
        attachDataChannel(peerId, dc);
      }

      return entry;
    }

    async function flushPendingCandidates(peerId, pc) {
      const queue = pendingCandidates.get(peerId);
      if (!queue) return;
      pendingCandidates.delete(peerId);
      for (const candidate of queue) {
        try {
          await pc.addIceCandidate(candidate);
        } catch {
          // candidato invalido/obsoleto - ignorar
        }
      }
    }

    async function handleDescription(peerId, description) {
      const entry = connections.get(peerId) || open(peerId, { polite: true });
      const pc = entry.pc;

      const offerCollision = description.type === 'offer' && (entry.makingOffer || pc.signalingState !== 'stable');
      entry.ignoreOffer = !entry.polite && offerCollision;
      if (entry.ignoreOffer) return;

      await pc.setRemoteDescription(description);
      await flushPendingCandidates(peerId, pc);

      if (description.type === 'offer') {
        await pc.setLocalDescription();
        handlers.onLocalDescription(peerId, pc.localDescription);
      }
    }

    async function handleCandidate(peerId, candidate) {
      const entry = connections.get(peerId);
      if (!entry || !entry.pc.remoteDescription) {
        if (!pendingCandidates.has(peerId)) pendingCandidates.set(peerId, []);
        pendingCandidates.get(peerId).push(candidate);
        return;
      }
      try {
        await entry.pc.addIceCandidate(candidate);
      } catch (err) {
        if (!entry.ignoreOffer) console.warn('ICE candidate invalido', err);
      }
    }

    function closePeer(peerId) {
      const entry = connections.get(peerId);
      if (!entry) return;
      entry.pc.close();
      connections.delete(peerId);
      pendingCandidates.delete(peerId);
    }

    function closeAll() {
      for (const peerId of [...connections.keys()]) closePeer(peerId);
    }

    function sendToPeer(peerId, data) {
      const entry = connections.get(peerId);
      if (!entry || !entry.dc || entry.dc.readyState !== 'open') return false;
      entry.dc.send(JSON.stringify(data));
      return true;
    }

    function broadcast(data) {
      for (const entry of connections.values()) {
        if (entry.dc && entry.dc.readyState === 'open') entry.dc.send(JSON.stringify(data));
      }
    }

    function isConnected(peerId) {
      const entry = connections.get(peerId);
      return !!(entry && entry.dc && entry.dc.readyState === 'open');
    }

    function isOpen(peerId) {
      return connections.has(peerId);
    }

    function getPeerConnection(peerId) {
      const entry = connections.get(peerId);
      return entry ? entry.pc : null;
    }

    function peerIds() {
      return [...connections.keys()];
    }

    return {
      configure,
      open,
      handleDescription,
      handleCandidate,
      closePeer,
      closeAll,
      sendToPeer,
      broadcast,
      isConnected,
      isOpen,
      getPeerConnection,
      peerIds,
    };
  }

  window.Wyre = window.Wyre || {};
  window.Wyre.webrtc = { createPeerManager };
})();
