import electron from 'electron';
import path from 'path';

const app = electron.app;

const createWindow = () => {
  let window = new electron.BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences:
      process.env.NODE_ENV === 'development'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(app.getAppPath(), 'bundle.js'),
          },
  });
  // load index.html of application
  window.loadURL(`file://${app.getAppPath()}/../index.html`);

  // open with devtools
  window.webContents.openDevTools();
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
