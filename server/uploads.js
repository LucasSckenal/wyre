const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');

const DATA_DIR = path.join(__dirname, 'data');

function sniffImageType(buffer) {
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'png';
  }

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpeg';
  }

  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'webp';
  }

  if (
    buffer.length >= 6 &&
    buffer.toString('ascii', 0, 3) === 'GIF' &&
    (buffer.toString('ascii', 3, 6) === '87a' || buffer.toString('ascii', 3, 6) === '89a')
  ) {
    return 'gif';
  }

  return null;
}

// Nunca confia no MIME/nome declarado pelo cliente: valida magic bytes e gera
// o nome do arquivo inteiramente no servidor, eliminando path traversal por construcao.
function saveUploadedImage(buffer, subdir, prefix) {
  const type = sniffImageType(buffer);
  if (!type) {
    const err = new Error('Arquivo nao reconhecido como imagem PNG/JPEG/WEBP/GIF.');
    err.statusCode = 400;
    throw err;
  }

  const ext = type === 'jpeg' ? 'jpg' : type;
  const filename = `${prefix}-${crypto.randomBytes(8).toString('hex')}.${ext}`;
  const dir = path.join(DATA_DIR, 'uploads', subdir);
  fs.writeFileSync(path.join(dir, filename), buffer);

  return `/uploads/${subdir}/${filename}`;
}

function deleteUploadedFile(relativeUrl) {
  if (!relativeUrl || !relativeUrl.startsWith('/uploads/')) return;
  const filePath = path.join(DATA_DIR, relativeUrl.replace('/uploads/', 'uploads/'));
  fs.rm(filePath, { force: true }, () => {});
}

function uploadMiddleware(fieldName, maxBytes) {
  const mw = multer({ storage: multer.memoryStorage(), limits: { fileSize: maxBytes } }).single(fieldName);
  return (req, res, next) => {
    mw(req, res, (err) => {
      if (err) {
        const message = err.code === 'LIMIT_FILE_SIZE' ? 'Arquivo excede o tamanho maximo permitido.' : 'Erro no upload.';
        res.status(400).json({ error: message });
        return;
      }
      next();
    });
  };
}

module.exports = { sniffImageType, saveUploadedImage, deleteUploadedFile, uploadMiddleware };
