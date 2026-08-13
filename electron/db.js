const path = require('path');
const { app } = require('electron');
const Database = require('better-sqlite3');

let db = null;

function getDb() {
  if (db) return db;
  const dbPath = path.join(app.getPath('userData'), 'wyre.sqlite');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS guilds_cache (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      icon_url TEXT,
      banner_url TEXT,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS channels_cache (
      id INTEGER PRIMARY KEY,
      guild_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      channel_id INTEGER NOT NULL,
      author_id INTEGER NOT NULL,
      author_name TEXT NOT NULL,
      content TEXT NOT NULL,
      sent_at INTEGER NOT NULL,
      local_received_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_messages_channel_sent ON messages(channel_id, sent_at);
    CREATE TABLE IF NOT EXISTS dm_messages (
      id TEXT PRIMARY KEY,
      peer_id INTEGER NOT NULL,
      author_id INTEGER NOT NULL,
      author_name TEXT NOT NULL,
      content TEXT NOT NULL,
      sent_at INTEGER NOT NULL,
      local_received_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_dm_messages_peer_sent ON dm_messages(peer_id, sent_at);
  `);
  return db;
}

const upsertGuildStmt = () => getDb().prepare(`
  INSERT INTO guilds_cache (id, name, icon_url, banner_url, updated_at)
  VALUES (@id, @name, @iconUrl, @bannerUrl, @updatedAt)
  ON CONFLICT(id) DO UPDATE SET name=excluded.name, icon_url=excluded.icon_url,
    banner_url=excluded.banner_url, updated_at=excluded.updated_at
`);

const upsertChannelStmt = () => getDb().prepare(`
  INSERT INTO channels_cache (id, guild_id, name, type, position, updated_at)
  VALUES (@id, @guildId, @name, @type, @position, @updatedAt)
  ON CONFLICT(id) DO UPDATE SET name=excluded.name, type=excluded.type,
    position=excluded.position, updated_at=excluded.updated_at
`);

const insertMessageStmt = () => getDb().prepare(`
  INSERT OR IGNORE INTO messages (id, channel_id, author_id, author_name, content, sent_at, local_received_at)
  VALUES (@id, @channelId, @authorId, @authorName, @content, @sentAt, @localReceivedAt)
`);

const getMessagesStmt = () => getDb().prepare(`
  SELECT id, channel_id AS channelId, author_id AS authorId, author_name AS authorName,
         content, sent_at AS sentAt, local_received_at AS localReceivedAt
  FROM messages
  WHERE channel_id = ?
  ORDER BY sent_at ASC
  LIMIT ?
`);

function cacheGuilds(guilds) {
  const now = Date.now();
  const tx = getDb().transaction((rows) => {
    for (const g of rows) {
      upsertGuildStmt().run({ id: g.id, name: g.name, iconUrl: g.iconUrl || null, bannerUrl: g.bannerUrl || null, updatedAt: now });
    }
  });
  tx(guilds);
}

function cacheChannels(guildId, channels) {
  const now = Date.now();
  const tx = getDb().transaction((rows) => {
    for (const c of rows) {
      upsertChannelStmt().run({ id: c.id, guildId, name: c.name, type: c.type, position: c.position || 0, updatedAt: now });
    }
  });
  tx(channels);
}

function saveMessage(msg) {
  insertMessageStmt().run({
    id: msg.id,
    channelId: msg.channelId,
    authorId: msg.authorId,
    authorName: msg.authorName,
    content: msg.content,
    sentAt: msg.sentAt,
    localReceivedAt: Date.now(),
  });
}

function getMessages(channelId, limit = 200) {
  return getMessagesStmt().all(channelId, limit);
}

const insertDmMessageStmt = () => getDb().prepare(`
  INSERT OR IGNORE INTO dm_messages (id, peer_id, author_id, author_name, content, sent_at, local_received_at)
  VALUES (@id, @peerId, @authorId, @authorName, @content, @sentAt, @localReceivedAt)
`);

const getDmMessagesStmt = () => getDb().prepare(`
  SELECT id, peer_id AS peerId, author_id AS authorId, author_name AS authorName,
         content, sent_at AS sentAt, local_received_at AS localReceivedAt
  FROM dm_messages
  WHERE peer_id = ?
  ORDER BY sent_at ASC
  LIMIT ?
`);

function saveDmMessage(msg) {
  insertDmMessageStmt().run({
    id: msg.id,
    peerId: msg.peerId,
    authorId: msg.authorId,
    authorName: msg.authorName,
    content: msg.content,
    sentAt: msg.sentAt,
    localReceivedAt: Date.now(),
  });
}

function getDmMessages(peerId, limit = 200) {
  return getDmMessagesStmt().all(peerId, limit);
}

module.exports = { cacheGuilds, cacheChannels, saveMessage, getMessages, saveDmMessage, getDmMessages };
