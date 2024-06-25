const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    minWidth: 600,
    minHeight: 800,
    title: 'Moddesta',
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'ui', 'preload.js')
    }
  });

  win.loadFile('ui/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});