const db = require('./db');

const FLAGS = {
  VIEW_CHANNEL: 1 << 0,
  SEND_MESSAGES: 1 << 1,
  MANAGE_CHANNELS: 1 << 2,
  MANAGE_ROLES: 1 << 3,
  KICK_MEMBERS: 1 << 4,
  BAN_MEMBERS: 1 << 5,
  MANAGE_GUILD: 1 << 6,
  CONNECT: 1 << 7,
  SPEAK: 1 << 8,
};

const ALL_PERMISSIONS = Object.values(FLAGS).reduce((acc, flag) => acc | flag, 0);
const DEFAULT_PERMISSIONS = FLAGS.VIEW_CHANNEL | FLAGS.SEND_MESSAGES | FLAGS.CONNECT | FLAGS.SPEAK;

const findGuildOwner = db.prepare('SELECT owner_id FROM guilds WHERE id = ?');
const rolesForMember = db.prepare(`
  SELECT r.id, r.permissions_bitfield, r.position FROM roles r
  JOIN member_roles mr ON mr.role_id = r.id
  WHERE mr.guild_id = ? AND mr.user_id = ?
`);

function isOwner(guildId, userId) {
  const guild = findGuildOwner.get(guildId);
  return !!guild && guild.owner_id === userId;
}

function computePermissions(guildId, userId) {
  if (isOwner(guildId, userId)) return ALL_PERMISSIONS;
  const roles = rolesForMember.all(guildId, userId);
  let perms = DEFAULT_PERMISSIONS;
  for (const role of roles) perms |= role.permissions_bitfield;
  return perms;
}

function hasPermission(guildId, userId, flag) {
  return (computePermissions(guildId, userId) & flag) === flag;
}

// -1 = sem cargos (posicao mais baixa possivel); Infinity = dono (sempre no topo).
function highestRolePosition(guildId, userId) {
  if (isOwner(guildId, userId)) return Infinity;
  const roles = rolesForMember.all(guildId, userId);
  if (roles.length === 0) return -1;
  return Math.max(...roles.map((role) => role.position));
}

// Um cargo so pode ser gerenciado por quem tem posicao estritamente maior (ou e o dono).
function canManageRole(guildId, actorId, role) {
  if (isOwner(guildId, actorId)) return true;
  return highestRolePosition(guildId, actorId) > role.position;
}

// Kick/ban/atribuicao de cargo em outro membro exige hierarquia estrita; ninguem
// gerencia o dono, e o dono gerencia todo mundo.
function canManageMember(guildId, actorId, targetUserId) {
  if (isOwner(guildId, targetUserId)) return false;
  if (isOwner(guildId, actorId)) return true;
  return highestRolePosition(guildId, actorId) > highestRolePosition(guildId, targetUserId);
}

module.exports = {
  FLAGS,
  ALL_PERMISSIONS,
  DEFAULT_PERMISSIONS,
  isOwner,
  computePermissions,
  hasPermission,
  highestRolePosition,
  canManageRole,
  canManageMember,
};
