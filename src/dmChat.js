(function () {
  const manager = window.Wyre.webrtc.createPeerManager();

  let myId = null;
  let sendSignal = () => {};
  let messageHandler = () => {};

  function init({ sendSignal: send, onMessage }) {
    sendSignal = send || (() => {});
    messageHandler = onMessage || (() => {});

    manager.configure({
      onIceCandidate: (peerId, candidate) => {
        sendSignal({ type: 'rtc:ice', to: peerId, candidate, kind: 'dm' });
      },
      onLocalDescription: (peerId, description) => {
        sendSignal({
          type: description.type === 'offer' ? 'rtc:offer' : 'rtc:answer',
          to: peerId,
          sdp: description,
          kind: 'dm',
        });
      },
      onOpen: () => {},
      onClose: () => {},
      onMessage: (peerId, data) => messageHandler(peerId, data),
    });
  }

  function setMyId(id) {
    myId = id;
  }

  function connectToPeer(peerId) {
    if (peerId === myId) return;
    // Mesmo tie-break dos outros dois gerenciadores (texto de canal, voz): id
    // menor sempre cria o data channel (impolido), id maior so responde quando
    // uma oferta chega (polido, criado automaticamente por handleDescription).
    manager.open(peerId, { polite: myId > peerId, withDataChannel: myId < peerId });
  }

  function disconnectPeer(peerId) {
    manager.closePeer(peerId);
  }

  function closeAll() {
    manager.closeAll();
  }

  function handleSignal(msg) {
    const { type, from, sdp, candidate } = msg;
    if (type === 'rtc:ice') manager.handleCandidate(from, candidate);
    else manager.handleDescription(from, sdp);
  }

  function makeMessageId() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  // sendToPeer (nao broadcast) - DM e 1:1, nunca deve vazar pra outra conexao
  // aberta do mesmo gerenciador.
  function sendMessage(peerId, text, user) {
    const message = { id: makeMessageId(), user, text, ts: Date.now() };
    const delivered = manager.sendToPeer(peerId, message);
    return { message, delivered };
  }

  function isConnected(peerId) {
    return manager.isConnected(peerId);
  }

  window.Wyre = window.Wyre || {};
  window.Wyre.dmChat = {
    init,
    setMyId,
    connectToPeer,
    disconnectPeer,
    closeAll,
    handleSignal,
    sendMessage,
    isConnected,
  };
})();
