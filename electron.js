const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const https = require('https');

const CURRENT_VERSION = app.getVersion(); // читается из package.json
const GITHUB_REPO = '1Haritono/Anime_app';

// Проверка обновлений через GitHub Releases API (без electron-updater)
function checkForUpdates(win) {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_REPO}/releases/latest`,
    headers: { 'User-Agent': 'AniKingHub-Updater' }
  };

  https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const release = JSON.parse(data);
        const latestTag = (release.tag_name || '').replace(/^v/, '');
        const currentTag = CURRENT_VERSION.replace(/^v/, '');
        if (latestTag && latestTag !== currentTag) {
          // Отправляем событие в renderer — кнопка обновления загорится зелёным
          win.webContents.send('update_available', {
            version: latestTag,
            url: release.html_url,
            notes: release.body || ''
          });
        }
      } catch (e) {
        console.log('Update check parse error:', e.message);
      }
    });
  }).on('error', (e) => {
    console.log('Update check network error:', e.message);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1380,
    height: 900,
    title: 'AniKingHub',
    icon: path.join(__dirname, 'public/icon.png'),
    backgroundColor: '#0f1015',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  const indexPath = path.join(__dirname, 'dist/index.html');
  if (require('fs').existsSync(indexPath)) {
    win.loadFile(indexPath);
  } else {
    win.loadFile(path.join(__dirname, 'index.html'));
  }

  // Проверяем обновления через 3 секунды после запуска
  win.webContents.on('did-finish-load', () => {
    setTimeout(() => checkForUpdates(win), 3000);
  });

  // IPC: открыть ссылку на релиз в браузере
  ipcMain.on('open_release_url', (event, url) => {
    shell.openExternal(url);
  });

  // IPC: оконные контролы (для frameless window)
  ipcMain.on('window-minimize', () => win.minimize());
  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  });
  ipcMain.on('window-close', () => win.close());
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
