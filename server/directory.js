const express = require('express');
const db = require('./db');
const { requireAuth } = require('./auth');
const { saveUploadedImage, deleteUploadedFile, uploadMiddleware } = require('./uploads');
const { FLAGS, ALL_PERMISSIONS, computePermissions, hasPermission, canManageRole, canManageMember } = require('./permissions');

const insertGuild = db.prepare('INSERT INTO guilds (name, owner_id, created_at) VALUES (?, ?, ?)');
const insertMember = db.prepare(
  'INSERT OR IGNORE INTO guild_members (guild_id, user_id, joined_at) VALUES (?, ?, ?)'
);
const findGuild = db.prepare('SELECT * FROM guilds WHERE id = ?');
const isMember = db.prepare('SELECT 1 FROM guild_members WHERE guild_id = ? AND user_id = ?');
const guildsForUser = db.prepare(`
  SELECT g.* FROM guilds g
  JOIN guild_members gm ON gm.guild_id = g.id
  WHERE gm.user_id = ?
  ORDER BY g.created_at ASC
`);
const channelsForGuild = db.prepare(
  'SELECT * FROM channels WHERE guild_id = ? ORDER BY position ASC, id ASC'
);
const insertChannel = db.prepare(
  'INSERT INTO channels (guild_id, name, type, position, created_at) VALUES (?, ?, ?, ?, ?)'
);
const maxChannelPosition = db.prepare(
  'SELECT COALESCE(MAX(position), -1) as maxPos FROM channels WHERE guild_id = ?'
);
const findChannel = db.prepare('SELECT * FROM channels WHERE id = ?');
const updateGuildIcon = db.prepare('UPDATE guilds SET icon_url = ? WHERE id = ?');
const updateGuildBanner = db.prepare('UPDATE guilds SET banner_url = ? WHERE id = ?');
const emojiForGuild = db.prepare(
  'SELECT id, name, image_url FROM guild_emoji WHERE guild_id = ? ORDER BY name ASC'
);
const insertEmoji = db.prepare(
  'INSERT INTO guild_emoji (guild_id, name, image_url, uploader_id, created_at) VALUES (?, ?, ?, ?, ?)'
);
const findEmoji = db.prepare('SELECT * FROM guild_emoji WHERE id = ? AND guild_id = ?');
const deleteEmoji = db.prepare('DELETE FROM guild_emoji WHERE id = ? AND guild_id = ?');

const insertRole = db.prepare(
  'INSERT INTO roles (guild_id, name, color, permissions_bitfield, position, created_at) VALUES (?, ?, ?, ?, ?, ?)'
);
const rolesForGuild = db.prepare('SELECT * FROM roles WHERE guild_id = ? ORDER BY position DESC, id ASC');
const findRole = db.prepare('SELECT * FROM roles WHERE id = ? AND guild_id = ?');
const updateRoleStmt = db.prepare(
  'UPDATE roles SET name = ?, color = ?, permissions_bitfield = ?, position = ? WHERE id = ?'
);
const deleteRoleStmt = db.prepare('DELETE FROM roles WHERE id = ?');
const maxRolePosition = db.prepare('SELECT COALESCE(MAX(position), -1) as maxPos FROM roles WHERE guild_id = ?');

const assignRoleStmt = db.prepare(
  'INSERT OR IGNORE INTO member_roles (guild_id, user_id, role_id) VALUES (?, ?, ?)'
);
const unassignRoleStmt = db.prepare(
  'DELETE FROM member_roles WHERE guild_id = ? AND user_id = ? AND role_id = ?'
);
const roleAssignmentsForGuild = db.prepare('SELECT user_id, role_id FROM member_roles WHERE guild_id = ?');

const membersForGuild = db.prepare(`
  SELECT u.id, u.username, u.display_name, u.avatar_url, u.is_bot
  FROM guild_members gm JOIN users u ON u.id = gm.user_id
  WHERE gm.guild_id = ?
  ORDER BY u.username ASC
`);
const removeMemberStmt = db.prepare('DELETE FROM guild_members WHERE guild_id = ? AND user_id = ?');
const removeMemberRolesStmt = db.prepare('DELETE FROM member_roles WHERE guild_id = ? AND user_id = ?');

const insertBan = db.prepare(
  'INSERT OR REPLACE INTO bans (guild_id, user_id, banned_by, reason, created_at) VALUES (?, ?, ?, ?, ?)'
);
const findBan = db.prepare('SELECT 1 FROM bans WHERE guild_id = ? AND user_id = ?');
const deleteBanStmt = db.prepare('DELETE FROM bans WHERE guild_id = ? AND user_id = ?');

// DM nao tem lista de amigos - pode conversar com quem compartilha pelo menos
// uma guild (mesma regra de fallback do Discord pra quem nao e "amigo").
const dmContactsStmt = db.prepare(`
  SELECT DISTINCT u.id, u.username, u.display_name, u.avatar_url, u.is_bot
  FROM guild_members gm1
  JOIN guild_members gm2 ON gm2.guild_id = gm1.guild_id AND gm2.user_id != gm1.user_id
  JOIN users u ON u.id = gm2.user_id
  WHERE gm1.user_id = ?
  ORDER BY u.username ASC
`);
const shareGuildStmt = db.prepare(`
  SELECT 1 FROM guild_members gm1
  JOIN guild_members gm2 ON gm2.guild_id = gm1.guild_id
  WHERE gm1.user_id = ? AND gm2.user_id = ?
  LIMIT 1
`);

function getDmContacts(userId) {
  return dmContactsStmt.all(userId).map((u) => ({
    id: u.id,
    username: u.username,
    displayName: u.display_name,
    avatarUrl: u.avatar_url,
    isBot: !!u.is_bot,
  }));
}

function shareGuild(userIdA, userIdB) {
  return !!shareGuildStmt.get(userIdA, userIdB);
}

const EMOJI_NAME_RE = /^[a-zA-Z0-9_]{2,32}$/;
const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

function serializeGuild(guild, viewerId) {
  const channels = channelsForGuild
    .all(guild.id)
    .map((c) => ({ id: c.id, name: c.name, type: c.type, position: c.position }));
  return {
    id: guild.id,
    name: guild.name,
    ownerId: guild.owner_id,
    iconUrl: guild.icon_url,
    bannerUrl: guild.banner_url,
    channels,
    permissions: viewerId ? computePermissions(guild.id, viewerId) : 0,
  };
}

function serializeRole(role) {
  return {
    id: role.id,
    name: role.name,
    color: role.color,
    permissions: role.permissions_bitfield,
    position: role.position,
  };
}

function getGuildsForUser(userId) {
  return guildsForUser.all(userId).map((g) => serializeGuild(g, userId));
}

function isChannelMember(channelId, userId) {
  const channel = findChannel.get(channelId);
  if (!channel) return false;
  return !!isMember.get(channel.guild_id, userId);
}

function requireMembership(req, res, next) {
  const guildId = Number(req.params.id);
  const guild = findGuild.get(guildId);
  if (!guild) {
    res.status(404).json({ error: 'Guild nao encontrada.' });
    return;
  }
  if (!isMember.get(guildId, req.user.id)) {
    res.status(403).json({ error: 'Voce nao e membro dessa guild.' });
    return;
  }
  req.guild = guild;
  next();
}

function requireGuildPermission(flagName) {
  const flag = FLAGS[flagName];
  return function (req, res, next) {
    const guildId = Number(req.params.id);
    const guild = findGuild.get(guildId);
    if (!guild) {
      res.status(404).json({ error: 'Guild nao encontrada.' });
      return;
    }
    if (!isMember.get(guildId, req.user.id)) {
      res.status(403).json({ error: 'Voce nao e membro dessa guild.' });
      return;
    }
    if (!hasPermission(guildId, req.user.id, flag)) {
      res.status(403).json({ error: 'Voce nao tem permissao pra fazer isso.' });
      return;
    }
    req.guild = guild;
    next();
  };
}

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  res.json({ guilds: getGuildsForUser(req.user.id) });
});

router.post('/', (req, res) => {
  const { name } = req.body || {};
  if (typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'Nome obrigatorio.' });
    return;
  }

  const cleanName = name.trim().slice(0, 64);
  const now = Date.now();
  const info = insertGuild.run(cleanName, req.user.id, now);
  insertMember.run(info.lastInsertRowid, req.user.id, now);
  insertChannel.run(info.lastInsertRowid, 'geral', 'text', 0, now);

  res.status(201).json({ guild: serializeGuild(findGuild.get(info.lastInsertRowid), req.user.id) });
});

router.post('/:id/join', (req, res) => {
  const guildId = Number(req.params.id);
  const guild = findGuild.get(guildId);
  if (!guild) {
    res.status(404).json({ error: 'Guild nao encontrada.' });
    return;
  }
  if (findBan.get(guildId, req.user.id)) {
    res.status(403).json({ error: 'Voce foi banido desse servidor.' });
    return;
  }

  insertMember.run(guildId, req.user.id, Date.now());
  res.json({ guild: serializeGuild(guild, req.user.id) });
});

router.post('/:id/channels', requireGuildPermission('MANAGE_CHANNELS'), (req, res) => {
  const { name, type } = req.body || {};
  if (typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'Nome obrigatorio.' });
    return;
  }
  if (type !== 'text' && type !== 'voice') {
    res.status(400).json({ error: "type deve ser 'text' ou 'voice'." });
    return;
  }

  const cleanName = name.trim().slice(0, 64);
  const position = maxChannelPosition.get(req.guild.id).maxPos + 1;
  const info = insertChannel.run(req.guild.id, cleanName, type, position, Date.now());

  res.status(201).json({ channel: { id: info.lastInsertRowid, name: cleanName, type, position } });
});

router.post('/:id/icon', requireGuildPermission('MANAGE_GUILD'), uploadMiddleware('icon', 2 * 1024 * 1024), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Arquivo obrigatorio.' });
    return;
  }
  try {
    const oldUrl = req.guild.icon_url;
    const url = saveUploadedImage(req.file.buffer, 'guild-icons', `guild${req.guild.id}`);
    updateGuildIcon.run(url, req.guild.id);
    deleteUploadedFile(oldUrl);
    res.json({ iconUrl: url });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

router.post('/:id/banner', requireGuildPermission('MANAGE_GUILD'), uploadMiddleware('banner', 2 * 1024 * 1024), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Arquivo obrigatorio.' });
    return;
  }
  try {
    const oldUrl = req.guild.banner_url;
    const url = saveUploadedImage(req.file.buffer, 'guild-banners', `guild${req.guild.id}`);
    updateGuildBanner.run(url, req.guild.id);
    deleteUploadedFile(oldUrl);
    res.json({ bannerUrl: url });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

router.get('/:id/emoji', requireMembership, (req, res) => {
  res.json({
    emoji: emojiForGuild.all(req.guild.id).map((e) => ({ id: e.id, name: e.name, imageUrl: e.image_url })),
  });
});

router.post('/:id/emoji', requireGuildPermission('MANAGE_GUILD'), uploadMiddleware('image', 256 * 1024), (req, res) => {
  const { name } = req.body || {};
  if (typeof name !== 'string' || !EMOJI_NAME_RE.test(name)) {
    res.status(400).json({ error: 'Nome invalido (2-32 caracteres, apenas letras/numeros/underscore).' });
    return;
  }
  if (!req.file) {
    res.status(400).json({ error: 'Arquivo obrigatorio.' });
    return;
  }

  try {
    const url = saveUploadedImage(req.file.buffer, 'emoji', `guild${req.guild.id}-${name}`);
    const info = insertEmoji.run(req.guild.id, name, url, req.user.id, Date.now());
    res.status(201).json({ emoji: { id: info.lastInsertRowid, name, imageUrl: url } });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE' || err.code === 'SQLITE_CONSTRAINT') {
      res.status(409).json({ error: 'Ja existe um emoji com esse nome nessa guild.' });
      return;
    }
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

router.delete('/:id/emoji/:emojiId', requireGuildPermission('MANAGE_GUILD'), (req, res) => {
  const emoji = findEmoji.get(Number(req.params.emojiId), req.guild.id);
  if (!emoji) {
    res.status(404).json({ error: 'Emoji nao encontrado.' });
    return;
  }
  deleteEmoji.run(emoji.id, req.guild.id);
  deleteUploadedFile(emoji.image_url);
  res.status(204).end();
});

// --- Cargos ---

router.get('/:id/roles', requireMembership, (req, res) => {
  res.json({ roles: rolesForGuild.all(req.guild.id).map(serializeRole) });
});

router.post('/:id/roles', requireGuildPermission('MANAGE_ROLES'), (req, res) => {
  const { name, color, permissions } = req.body || {};
  if (typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'Nome obrigatorio.' });
    return;
  }
  const cleanColor = typeof color === 'string' && HEX_COLOR_RE.test(color) ? color : '#99aab5';
  const perms = Number.isInteger(permissions) ? permissions & ALL_PERMISSIONS : 0;
  const position = maxRolePosition.get(req.guild.id).maxPos + 1;
  const info = insertRole.run(req.guild.id, name.trim().slice(0, 32), cleanColor, perms, position, Date.now());
  res.status(201).json({ role: serializeRole(findRole.get(info.lastInsertRowid, req.guild.id)) });
});

router.patch('/:id/roles/:roleId', requireGuildPermission('MANAGE_ROLES'), (req, res) => {
  const role = findRole.get(Number(req.params.roleId), req.guild.id);
  if (!role) {
    res.status(404).json({ error: 'Cargo nao encontrado.' });
    return;
  }
  if (!canManageRole(req.guild.id, req.user.id, role)) {
    res.status(403).json({ error: 'Voce nao pode gerenciar esse cargo.' });
    return;
  }

  const { name, color, permissions, position } = req.body || {};
  const newName = typeof name === 'string' && name.trim() ? name.trim().slice(0, 32) : role.name;
  const newColor = typeof color === 'string' && HEX_COLOR_RE.test(color) ? color : role.color;
  const newPerms = Number.isInteger(permissions) ? permissions & ALL_PERMISSIONS : role.permissions_bitfield;
  const newPosition = Number.isInteger(position) ? position : role.position;
  updateRoleStmt.run(newName, newColor, newPerms, newPosition, role.id);
  res.json({ role: serializeRole(findRole.get(role.id, req.guild.id)) });
});

router.delete('/:id/roles/:roleId', requireGuildPermission('MANAGE_ROLES'), (req, res) => {
  const role = findRole.get(Number(req.params.roleId), req.guild.id);
  if (!role) {
    res.status(404).json({ error: 'Cargo nao encontrado.' });
    return;
  }
  if (!canManageRole(req.guild.id, req.user.id, role)) {
    res.status(403).json({ error: 'Voce nao pode gerenciar esse cargo.' });
    return;
  }
  deleteRoleStmt.run(role.id);
  res.status(204).end();
});

// --- Membros ---

router.get('/:id/members', requireMembership, (req, res) => {
  const rolesByUser = new Map();
  for (const ra of roleAssignmentsForGuild.all(req.guild.id)) {
    if (!rolesByUser.has(ra.user_id)) rolesByUser.set(ra.user_id, []);
    rolesByUser.get(ra.user_id).push(ra.role_id);
  }
  const members = membersForGuild.all(req.guild.id).map((m) => ({
    id: m.id,
    username: m.username,
    displayName: m.display_name,
    avatarUrl: m.avatar_url,
    isBot: !!m.is_bot,
    isOwner: m.id === req.guild.owner_id,
    roleIds: rolesByUser.get(m.id) || [],
  }));
  res.json({ members });
});

router.post('/:id/members/:userId/roles/:roleId', requireGuildPermission('MANAGE_ROLES'), (req, res) => {
  const targetId = Number(req.params.userId);
  const role = findRole.get(Number(req.params.roleId), req.guild.id);
  if (!role) {
    res.status(404).json({ error: 'Cargo nao encontrado.' });
    return;
  }
  if (!isMember.get(req.guild.id, targetId)) {
    res.status(404).json({ error: 'Membro nao encontrado.' });
    return;
  }
  if (!canManageRole(req.guild.id, req.user.id, role)) {
    res.status(403).json({ error: 'Voce nao pode atribuir esse cargo.' });
    return;
  }
  assignRoleStmt.run(req.guild.id, targetId, role.id);
  res.status(204).end();
});

router.delete('/:id/members/:userId/roles/:roleId', requireGuildPermission('MANAGE_ROLES'), (req, res) => {
  const targetId = Number(req.params.userId);
  const role = findRole.get(Number(req.params.roleId), req.guild.id);
  if (!role) {
    res.status(404).json({ error: 'Cargo nao encontrado.' });
    return;
  }
  if (!canManageRole(req.guild.id, req.user.id, role)) {
    res.status(403).json({ error: 'Voce nao pode remover esse cargo.' });
    return;
  }
  unassignRoleStmt.run(req.guild.id, targetId, role.id);
  res.status(204).end();
});

router.post('/:id/members/:userId/kick', requireGuildPermission('KICK_MEMBERS'), (req, res) => {
  const targetId = Number(req.params.userId);
  if (targetId === req.user.id) {
    res.status(400).json({ error: 'Voce nao pode kickar a si mesmo.' });
    return;
  }
  if (!isMember.get(req.guild.id, targetId)) {
    res.status(404).json({ error: 'Membro nao encontrado.' });
    return;
  }
  if (!canManageMember(req.guild.id, req.user.id, targetId)) {
    res.status(403).json({ error: 'Voce nao pode kickar esse membro.' });
    return;
  }
  removeMemberStmt.run(req.guild.id, targetId);
  removeMemberRolesStmt.run(req.guild.id, targetId);
  notifyGuildRemoval(targetId, req.guild.id, req.guild.name, 'kicked');
  res.status(204).end();
});

router.post('/:id/members/:userId/ban', requireGuildPermission('BAN_MEMBERS'), (req, res) => {
  const targetId = Number(req.params.userId);
  if (targetId === req.user.id) {
    res.status(400).json({ error: 'Voce nao pode banir a si mesmo.' });
    return;
  }
  if (!canManageMember(req.guild.id, req.user.id, targetId)) {
    res.status(403).json({ error: 'Voce nao pode banir esse membro.' });
    return;
  }
  const { reason } = req.body || {};
  const cleanReason = typeof reason === 'string' ? reason.trim().slice(0, 200) : null;
  insertBan.run(req.guild.id, targetId, req.user.id, cleanReason, Date.now());
  removeMemberStmt.run(req.guild.id, targetId);
  removeMemberRolesStmt.run(req.guild.id, targetId);
  notifyGuildRemoval(targetId, req.guild.id, req.guild.name, 'banned');
  res.status(204).end();
});

router.delete('/:id/bans/:userId', requireGuildPermission('BAN_MEMBERS'), (req, res) => {
  deleteBanStmt.run(req.guild.id, Number(req.params.userId));
  res.status(204).end();
});

// Require tardio pra evitar ciclo (ws.js ja importa deste modulo no topo do arquivo).
function notifyGuildRemoval(userId, guildId, guildName, reason) {
  const { disconnectUserFromGuild } = require('./ws');
  disconnectUserFromGuild(userId, guildId, guildName, reason);
}

module.exports = { router, getGuildsForUser, isChannelMember, findChannel, getDmContacts, shareGuild };
