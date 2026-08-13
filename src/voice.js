(function () {
  const manager = window.Wyre.webrtc.createPeerManager();

  let myId = null;
  let sendSignal = () => {};
  let currentChannelId = null;
  const peerChannels = new Map(); // peerId -> channelId
  const remoteAudioEls = new Map(); // peerId -> HTMLAudioElement
  const peerTrackLabels = new Map(); // peerId -> Map(trackId -> 'camera'|'screen')

  let localStream = null; // audio do mic (+ video da webcam, quando ligada)
  let screenStream = null; // captura de tela, quando ligada
  let micMuted = false;
  let deafened = false;

  let onRemoteTrack = () => {};
  let onRemoteTrackEnded = () => {};
  let onLocalTrackChange = () => {};

  function init({ sendSignal: send, onRemoteTrack: onTrack, onRemoteTrackEnded: onTrackEnded, onLocalTrackChange: onLocalChange }) {
    sendSignal = send || (() => {});
    onRemoteTrack = onTrack || (() => {});
    onRemoteTrackEnded = onTrackEnded || (() => {});
    onLocalTrackChange = onLocalChange || (() => {});

    manager.configure({
      onPeerConnectionCreated: (_peerId, pc) => {
        // Peer novo entrando na chamada ja recebe meu estado atual (audio +
        // camera/tela se estiverem ligadas) desde a primeira negociacao.
        if (localStream) {
          for (const track of localStream.getTracks()) pc.addTrack(track, localStream);
        }
        if (screenStream) {
          for (const track of screenStream.getTracks()) pc.addTrack(track, screenStream);
        }
      },
      onIceCandidate: (peerId, candidate) => {
        const channelId = peerChannels.get(peerId);
        if (channelId == null) return;
        sendSignal({ type: 'rtc:ice', to: peerId, channelId, candidate, kind: 'voice' });
      },
      onLocalDescription: (peerId, description) => {
        const channelId = peerChannels.get(peerId);
        if (channelId == null) return;
        sendSignal({
          type: description.type === 'offer' ? 'rtc:offer' : 'rtc:answer',
          to: peerId,
          channelId,
          sdp: description,
          kind: 'voice',
        });
      },
      onTrack: (peerId, event) => {
        const track = event.track;
        if (track.kind === 'audio') {
          attachRemoteAudio(peerId, event.streams[0]);
          return;
        }
        const label = peerTrackLabels.get(peerId)?.get(track.id) || 'camera';
        onRemoteTrack(peerId, track, label, event.streams[0]);
        track.addEventListener('ended', () => onRemoteTrackEnded(peerId, track.id));
      },
      onClose: (peerId) => {
        detachRemoteAudio(peerId);
        peerChannels.delete(peerId);
        peerTrackLabels.delete(peerId);
      },
    });
  }

  function setMyId(id) {
    myId = id;
  }

  function attachRemoteAudio(peerId, stream) {
    let el = remoteAudioEls.get(peerId);
    if (!el) {
      el = document.createElement('audio');
      el.autoplay = true;
      el.dataset.peerId = String(peerId);
      el.muted = deafened;
      document.body.appendChild(el);
      remoteAudioEls.set(peerId, el);
    }
    el.srcObject = stream;
  }

  function detachRemoteAudio(peerId) {
    const el = remoteAudioEls.get(peerId);
    if (!el) return;
    el.srcObject = null;
    el.remove();
    remoteAudioEls.delete(peerId);
  }

  async function ensureMic() {
    if (localStream) return true;
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      applyMicMuted();
      return true;
    } catch (err) {
      console.warn('Nao foi possivel acessar o microfone:', err.message);
      return false;
    }
  }

  function applyMicMuted() {
    if (!localStream) return;
    for (const track of localStream.getAudioTracks()) track.enabled = !micMuted;
  }

  function setMicMuted(muted) {
    micMuted = muted;
    applyMicMuted();
  }

  function setDeafened(value) {
    deafened = value;
    for (const el of remoteAudioEls.values()) el.muted = deafened;
  }

  function connectedPeerIds() {
    return [...peerChannels.keys()];
  }

  function sendMediaStateToAll() {
    const tracks = [];
    if (localStream) {
      for (const t of localStream.getVideoTracks()) tracks.push({ id: t.id, label: 'camera' });
    }
    if (screenStream) {
      for (const t of screenStream.getVideoTracks()) tracks.push({ id: t.id, label: 'screen' });
    }
    for (const peerId of connectedPeerIds()) {
      const channelId = peerChannels.get(peerId);
      sendSignal({ type: 'rtc:media-state', to: peerId, channelId, kind: 'voice', tracks });
    }
  }

  async function enableCamera() {
    if (localStream && localStream.getVideoTracks().length > 0) return true;
    try {
      const camStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const track = camStream.getVideoTracks()[0];
      if (!localStream) {
        localStream = camStream;
        applyMicMuted();
      } else {
        localStream.addTrack(track);
      }
      for (const peerId of connectedPeerIds()) {
        const pc = manager.getPeerConnection(peerId);
        if (pc) pc.addTrack(track, localStream);
      }
      sendMediaStateToAll();
      onLocalTrackChange();
      return true;
    } catch (err) {
      console.warn('Nao foi possivel acessar a camera:', err.message);
      return false;
    }
  }

  function disableCamera() {
    if (!localStream) return;
    for (const track of localStream.getVideoTracks()) {
      track.stop();
      localStream.removeTrack(track);
      for (const peerId of connectedPeerIds()) {
        const pc = manager.getPeerConnection(peerId);
        const sender = pc && pc.getSenders().find((s) => s.track === track);
        if (sender) pc.removeTrack(sender);
      }
    }
    sendMediaStateToAll();
    onLocalTrackChange();
  }

  function isCameraOn() {
    return !!(localStream && localStream.getVideoTracks().some((t) => t.readyState === 'live'));
  }

  async function enableScreenShare(sourceId) {
    if (screenStream) return true;
    try {
      await window.api.screen.selectSource(sourceId);
      screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const track = screenStream.getVideoTracks()[0];
      track.addEventListener('ended', () => disableScreenShare());
      for (const peerId of connectedPeerIds()) {
        const pc = manager.getPeerConnection(peerId);
        if (pc) pc.addTrack(track, screenStream);
      }
      sendMediaStateToAll();
      onLocalTrackChange();
      return true;
    } catch (err) {
      console.warn('Nao foi possivel compartilhar a tela:', err.message);
      screenStream = null;
      return false;
    }
  }

  function disableScreenShare() {
    if (!screenStream) return;
    for (const track of screenStream.getTracks()) {
      track.stop();
      for (const peerId of connectedPeerIds()) {
        const pc = manager.getPeerConnection(peerId);
        const sender = pc && pc.getSenders().find((s) => s.track === track);
        if (sender) pc.removeTrack(sender);
      }
    }
    screenStream = null;
    sendMediaStateToAll();
    onLocalTrackChange();
  }

  function isScreenSharing() {
    return !!screenStream;
  }

  function getLocalCameraStream() {
    if (!localStream || localStream.getVideoTracks().length === 0) return null;
    return localStream;
  }

  function getLocalScreenStream() {
    return screenStream;
  }

  function connectToPeer(channelId, peerId) {
    if (peerId === myId) return;
    peerChannels.set(peerId, channelId);
    manager.open(peerId, { polite: myId > peerId });
    sendMediaStateToAll();
  }

  async function joinChannel(channelId, peers) {
    currentChannelId = channelId;
    await ensureMic();
    for (const peer of peers) connectToPeer(channelId, peer.id);
  }

  function peerJoined(channelId, user) {
    if (channelId !== currentChannelId) return;
    connectToPeer(channelId, user.id);
  }

  function peerLeft(userId) {
    manager.closePeer(userId);
    detachRemoteAudio(userId);
    peerChannels.delete(userId);
    peerTrackLabels.delete(userId);
  }

  function leaveChannel() {
    manager.closeAll();
    for (const peerId of [...remoteAudioEls.keys()]) detachRemoteAudio(peerId);
    peerChannels.clear();
    peerTrackLabels.clear();
    currentChannelId = null;
    if (localStream) {
      for (const track of localStream.getTracks()) track.stop();
      localStream = null;
    }
    if (screenStream) {
      for (const track of screenStream.getTracks()) track.stop();
      screenStream = null;
    }
    onLocalTrackChange();
  }

  function handleSignal(msg) {
    const { type, from, channelId, sdp, candidate, tracks } = msg;
    if (type === 'rtc:media-state') {
      const labels = new Map();
      for (const t of tracks || []) labels.set(t.id, t.label);
      peerTrackLabels.set(from, labels);
      return;
    }
    peerChannels.set(from, channelId);
    if (type === 'rtc:ice') manager.handleCandidate(from, candidate);
    else manager.handleDescription(from, sdp);
  }

  window.Wyre = window.Wyre || {};
  window.Wyre.voice = {
    init,
    setMyId,
    joinChannel,
    peerJoined,
    peerLeft,
    leaveChannel,
    handleSignal,
    ensureMic,
    setMicMuted,
    setDeafened,
    enableCamera,
    disableCamera,
    isCameraOn,
    enableScreenShare,
    disableScreenShare,
    isScreenSharing,
    getLocalCameraStream,
    getLocalScreenStream,
    isConnected: (peerId) => manager.isOpen(peerId),
    getCurrentChannelId: () => currentChannelId,
  };
})();
