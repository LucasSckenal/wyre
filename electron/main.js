const { app, BrowserWindow, ipcMain, Menu, desktopCapturer, session } = require('electron');
const path = require('path');
const fs = require('fs/promises');
const { registerDbHandlers } = require('./ipcHandlers');

function sessionFilePath() {
  return path.join(app.getPath('userData'), 'session.json');
}

async function readToken() {
  try {
    const raw = await fs.readFile(sessionFilePath(), 'utf-8');
    return JSON.parse(raw).token || null;
  } catch {
    return null;
  }
}

async function writeToken(token) {
  await fs.mkdir(app.getPath('userData'), { recursive: true });
  await fs.writeFile(sessionFilePath(), JSON.stringify({ token }), 'utf-8');
}

async function clearToken() {
  try {
    await fs.rm(sessionFilePath());
  } catch {
    // arquivo pode nao existir ainda
  }
}

ipcMain.handle('auth:getToken', readToken);
ipcMain.handle('auth:setToken', (_event, token) => writeToken(token));
ipcMain.handle('auth:clearToken', clearToken);

// Compartilhamento de tela: Electron nao tem um seletor nativo de fonte pro
// getDisplayMedia() do renderer - a gente lista as fontes via desktopCapturer,
// deixa o renderer mostrar sua propria UI de escolha, e guarda a fonte
// selecionada aqui pra resolver o handler abaixo quando o pedido chegar.
let pendingScreenSourceId = null;

ipcMain.handle('screen:getSources', async () => {
  const sources = await desktopCapturer.getSources({
    types: ['screen', 'window'],
    thumbnailSize: { width: 320, height: 180 },
  });
  return sources.map((s) => ({ id: s.id, name: s.name, thumbnail: s.thumbnail.toDataURL() }));
});

ipcMain.handle('screen:selectSource', (_event, sourceId) => {
  pendingScreenSourceId = sourceId;
});

function createWindow() {
  const win = new BrowserWindow({
    width: 960,
    height: 640,
    minWidth: 820,
    minHeight: 560,
    backgroundColor: '#16191c',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.webContents.on('console-message', (_event, _level, message) => {
    console.log('[renderer]', message);
  });

  win.loadFile(path.join(__dirname, '..', 'src', 'index.html'));
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  registerDbHandlers();

  session.defaultSession.setDisplayMediaRequestHandler((_request, callback) => {
    desktopCapturer.getSources({ types: ['screen', 'window'] }).then((sources) => {
      const match = sources.find((s) => s.id === pendingScreenSourceId) || sources[0];
      pendingScreenSourceId = null;
      if (!match) {
        callback({});
        return;
      }
      callback({ video: match, audio: 'loopback' });
    });
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
