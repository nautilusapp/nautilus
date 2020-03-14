import { app, BrowserWindow } from 'electron';
import os from 'os';
import path from 'path';

if (module.hot) {
  module.hot.accept();
}

const createWindow = () => {
  let window = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences:
      process.env.NODE_ENV === 'development'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(app.getAppPath(), 'dist/index.js'),
          },
  });

  if (process.env.NODE_ENV === 'development') {
    window.loadURL(`http://localhost:9080`);
    window.webContents.openDevTools();
  } else {
    window.loadURL(`file://${app.getAppPath()}/../index.html`);
  }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
