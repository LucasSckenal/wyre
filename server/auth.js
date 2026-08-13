const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const express = require('express');
const db = require('./db');

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias

const insertUser = db.prepare(
  'INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, ?)'
);
const findUserByUsername = db.prepare('SELECT * FROM users WHERE username = ?');
const findUserById = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?');
const insertSession = db.prepare(
  'INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)'
);
const findSession = db.prepare('SELECT * FROM sessions WHERE token = ?');
const deleteSession = db.prepare('DELETE FROM sessions WHERE token = ?');
const deleteExpiredSessions = db.prepare('DELETE FROM sessions WHERE expires_at < ?');

function createSession(userId, ttlMs = SESSION_TTL_MS) {
  deleteExpiredSessions.run(Date.now());
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  insertSession.run(token, userId, now, now + ttlMs);
  return token;
}

function getUserFromToken(token) {
  if (!token) return null;
  const session = findSession.get(token);
  if (!session) return null;
  if (session.expires_at < Date.now()) {
    deleteSession.run(token);
    return null;
  }
  return findUserById.get(session.user_id) || null;
}

function revokeSession(token) {
  deleteSession.run(token);
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const user = getUserFromToken(token);
  if (!user) {
    res.status(401).json({ error: 'Nao autenticado.' });
    return;
  }
  req.user = user;
  req.token = token;
  next();
}

const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body || {};

  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).json({ error: 'Usuario e senha sao obrigatorios.' });
    return;
  }

  const cleanUsername = username.trim().slice(0, 32);
  if (cleanUsername.length < 3 || password.length < 6) {
    res.status(400).json({ error: 'Usuario precisa de 3+ caracteres e senha de 6+ caracteres.' });
    return;
  }

  if (findUserByUsername.get(cleanUsername)) {
    res.status(409).json({ error: 'Usuario ja existe.' });
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const info = insertUser.run(cleanUsername, passwordHash, Date.now());
  const token = createSession(info.lastInsertRowid);

  res.status(201).json({
    token,
    user: { id: info.lastInsertRowid, username: cleanUsername },
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).json({ error: 'Usuario e senha sao obrigatorios.' });
    return;
  }

  const user = findUserByUsername.get(username.trim());
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    res.status(401).json({ error: 'Usuario ou senha invalidos.' });
    return;
  }

  const token = createSession(user.id);
  res.json({ token, user: { id: user.id, username: user.username } });
});

router.post('/logout', requireAuth, (req, res) => {
  revokeSession(req.token);
  res.status(204).end();
});

module.exports = { router, requireAuth, getUserFromToken, revokeSession, createSession };
