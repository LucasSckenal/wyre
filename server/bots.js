const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const express = require('express');
const db = require('./db');
const { requireAuth, createSession } = require('./auth');

const BOT_SESSION_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 1 ano

const findUserByUsername = db.prepare('SELECT 1 FROM users WHERE username = ?');
const insertBot = db.prepare(
  'INSERT INTO users (username, password_hash, created_at, is_bot, owner_user_id) VALUES (?, ?, ?, 1, ?)'
);
const botsForOwner = db.prepare(
  'SELECT id, username, display_name, avatar_url, created_at FROM users WHERE owner_user_id = ? AND is_bot = 1 ORDER BY created_at ASC'
);
const findBotOwnedBy = db.prepare('SELECT * FROM users WHERE id = ? AND owner_user_id = ? AND is_bot = 1');
const deleteUser = db.prepare('DELETE FROM users WHERE id = ?');

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const bots = botsForOwner.all(req.user.id).map((b) => ({
    id: b.id,
    username: b.username,
    displayName: b.display_name,
    avatarUrl: b.avatar_url,
    createdAt: b.created_at,
  }));
  res.json({ bots });
});

router.post('/', (req, res) => {
  const { username } = req.body || {};
  if (typeof username !== 'string' || !username.trim()) {
    res.status(400).json({ error: 'Nome de usuario do bot e obrigatorio.' });
    return;
  }

  const cleanUsername = username.trim().slice(0, 32);
  if (cleanUsername.length < 3) {
    res.status(400).json({ error: 'Nome do bot precisa de 3+ caracteres.' });
    return;
  }
  if (findUserByUsername.get(cleanUsername)) {
    res.status(409).json({ error: 'Ja existe uma conta com esse nome de usuario.' });
    return;
  }

  // Senha aleatoria que ninguem conhece: bots nunca fazem login com usuario/senha,
  // so recebem o token diretamente aqui na criacao.
  const randomPasswordHash = bcrypt.hashSync(crypto.randomBytes(32).toString('hex'), 10);
  const info = insertBot.run(cleanUsername, randomPasswordHash, Date.now(), req.user.id);
  const token = createSession(info.lastInsertRowid, BOT_SESSION_TTL_MS);

  res.status(201).json({ token, bot: { id: info.lastInsertRowid, username: cleanUsername } });
});

router.delete('/:id', (req, res) => {
  const bot = findBotOwnedBy.get(Number(req.params.id), req.user.id);
  if (!bot) {
    res.status(404).json({ error: 'Bot nao encontrado.' });
    return;
  }
  deleteUser.run(bot.id); // sessions.user_id ON DELETE CASCADE ja revoga o token do bot
  res.status(204).end();
});

module.exports = { router };
