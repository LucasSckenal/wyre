const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  auth: {
    getToken: () => ipcRenderer.invoke('auth:getToken'),
    setToken: (token) => ipcRenderer.invoke('auth:setToken', token),
    clearToken: () => ipcRenderer.invoke('auth:clearToken'),
  },
  db: {
    cacheGuilds: (guilds) => ipcRenderer.invoke('db:cacheGuilds', guilds),
    cacheChannels: (guildId, channels) => ipcRenderer.invoke('db:cacheChannels', guildId, channels),
    saveMessage: (msg) => ipcRenderer.invoke('db:saveMessage', msg),
    getMessages: (channelId, limit) => ipcRenderer.invoke('db:getMessages', channelId, limit),
    saveDmMessage: (msg) => ipcRenderer.invoke('db:saveDmMessage', msg),
    getDmMessages: (peerId, limit) => ipcRenderer.invoke('db:getDmMessages', peerId, limit),
  },
  screen: {
    getSources: () => ipcRenderer.invoke('screen:getSources'),
    selectSource: (sourceId) => ipcRenderer.invoke('screen:selectSource', sourceId),
  },
});
