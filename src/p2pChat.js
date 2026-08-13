(function () {
  const manager = window.Wyre.webrtc.createPeerManager();

  let myId = null;
  let sendSignal = () => {};
  let messageHandler = () => {};
  let currentChannelId = null;
  const peerChannels = new Map(); // peerId -> channelId

  function init({ sendSignal: send, onMessage }) {
    sendSignal = send || (() => {});
    messageHandler = onMessage || (() => {});

    manager.configure({
      onIceCandidate: (peerId, candidate) => {
        const channelId = peerChannels.get(peerId);
        if (channelId == null) return;
        sendSignal({ type: 'rtc:ice', to: peerId, channelId, candidate, kind: 'text' });
      },
      onLocalDescription: (peerId, description) => {
        const channelId = peerChannels.get(peerId);
        if (channelId == null) return;
        sendSignal({
          type: description.type === 'offer' ? 'rtc:offer' : 'rtc:answer',
          to: peerId,
          channelId,
          sdp: description,
          kind: 'text',
        });
      },
      onOpen: () => {},
      onClose: (peerId) => {
        peerChannels.delete(peerId);
      },
      onMessage: (_peerId, data) => {
        messageHandler(data);
      },
    });
  }

  function setMyId(id) {
    myId = id;
  }

  function connectToPeer(channelId, peerId) {
    if (peerId === myId) return;
    peerChannels.set(peerId, channelId);
    // Politeness fixa pelo tie-break de id (evita glare): menor id sempre insiste
    // na propria oferta (impolido, cria o data channel), maior id cede em colisao.
    manager.open(peerId, { polite: myId > peerId, withDataChannel: myId < peerId });
  }

  function joinChannel(channelId, peers) {
    currentChannelId = channelId;
    for (const peer of peers) connectToPeer(channelId, peer.id);
  }

  function peerJoined(channelId, user) {
    if (channelId !== currentChannelId) return;
    connectToPeer(channelId, user.id);
  }

  function peerLeft(userId) {
    manager.closePeer(userId);
    peerChannels.delete(userId);
  }

  function leaveChannel() {
    manager.closeAll();
    peerChannels.clear();
    currentChannelId = null;
  }

  function handleSignal(msg) {
    const { type, from, channelId, sdp, candidate } = msg;
    peerChannels.set(from, channelId);
    if (type === 'rtc:ice') manager.handleCandidate(from, candidate);
    else manager.handleDescription(from, sdp);
  }

  function makeMessageId() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function sendMessage(channelId, text, user) {
    const message = { id: makeMessageId(), channelId, user, text, ts: Date.now() };
    manager.broadcast(message);
    return message;
  }

  window.Wyre = window.Wyre || {};
  window.Wyre.p2pChat = {
    init,
    setMyId,
    joinChannel,
    peerJoined,
    peerLeft,
    leaveChannel,
    handleSignal,
    sendMessage,
  };
})();
