const express = require('express');
const db = require('./db');
const { requireAuth } = require('./auth');
const { saveUploadedImage, deleteUploadedFile, uploadMiddleware } = require('./uploads');

const findUserById = db.prepare(
  'SELECT id, username, display_name, avatar_url, banner_url, status_text, bio, is_bot FROM users WHERE id = ?'
);
const updateProfile = db.prepare('UPDATE users SET display_name = ?, status_text = ?, bio = ? WHERE id = ?');
const updateAvatar = db.prepare('UPDATE users SET avatar_url = ? WHERE id = ?');
const updateBanner = db.prepare('UPDATE users SET banner_url = ? WHERE id = ?');

function serializeUser(row) {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    bannerUrl: row.banner_url,
    statusText: row.status_text,
    bio: row.bio,
    isBot: !!row.is_bot,
  };
}

const router = express.Router();
router.use(requireAuth);

router.get('/me', (req, res) => {
  res.json({ user: serializeUser(findUserById.get(req.user.id)) });
});

router.patch('/me', (req, res) => {
  const { displayName, statusText, bio } = req.body || {};
  const current = findUserById.get(req.user.id);

  updateProfile.run(
    typeof displayName === 'string' ? displayName.trim().slice(0, 32) || null : current.display_name,
    typeof statusText === 'string' ? statusText.trim().slice(0, 128) || null : current.status_text,
    typeof bio === 'string' ? bio.trim().slice(0, 190) || null : current.bio,
    req.user.id
  );

  res.json({ user: serializeUser(findUserById.get(req.user.id)) });
});

router.post('/me/avatar', uploadMiddleware('avatar', 2 * 1024 * 1024), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Arquivo obrigatorio.' });
    return;
  }

  try {
    const oldUrl = findUserById.get(req.user.id).avatar_url;
    const url = saveUploadedImage(req.file.buffer, 'avatars', `user${req.user.id}`);
    updateAvatar.run(url, req.user.id);
    deleteUploadedFile(oldUrl);
    res.json({ avatarUrl: url });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

router.post('/me/banner', uploadMiddleware('banner', 2 * 1024 * 1024), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Arquivo obrigatorio.' });
    return;
  }

  try {
    const oldUrl = findUserById.get(req.user.id).banner_url;
    const url = saveUploadedImage(req.file.buffer, 'banners', `user${req.user.id}`);
    updateBanner.run(url, req.user.id);
    deleteUploadedFile(oldUrl);
    res.json({ bannerUrl: url });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  const row = findUserById.get(Number(req.params.id));
  if (!row) {
    res.status(404).json({ error: 'Usuario nao encontrado.' });
    return;
  }
  res.json({ user: serializeUser(row) });
});

module.exports = { router, serializeUser, findUserById };
