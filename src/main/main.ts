import electron from 'electron';
// import path from 'path';

const app = electron.app;

if (module.hot) {
  module.hot.accept();
}

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
            // preload: path.join(app.getAppPath(), 'renderer.js'),
          },
  });

  if (process.env.NODE_ENV === 'development') {
    window.loadURL(`http://localhost:${process.env.DEV_PORT}`);
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
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
