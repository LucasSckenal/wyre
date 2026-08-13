const { ipcMain } = require('electron');
const db = require('./db');

function registerDbHandlers() {
  ipcMain.handle('db:cacheGuilds', (_event, guilds) => db.cacheGuilds(guilds));
  ipcMain.handle('db:cacheChannels', (_event, guildId, channels) => db.cacheChannels(guildId, channels));
  ipcMain.handle('db:saveMessage', (_event, msg) => db.saveMessage(msg));
  ipcMain.handle('db:getMessages', (_event, channelId, limit) => db.getMessages(channelId, limit));
  ipcMain.handle('db:saveDmMessage', (_event, msg) => db.saveDmMessage(msg));
  ipcMain.handle('db:getDmMessages', (_event, peerId, limit) => db.getDmMessages(peerId, limit));
}

module.exports = { registerDbHandlers };
