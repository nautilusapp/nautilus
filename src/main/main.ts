import { app, BrowserWindow } from 'electron';
import path from 'path';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import createMenu from './menu';

if (module.hot) {
  module.hot.accept();
}

const createWindow = () => {
  let window = new BrowserWindow({
    width: 1000,
    height: 750,
    titleBarStyle: 'hidden',
    webPreferences:
      process.env.NODE_ENV === 'development'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(app.getAppPath(), 'dist/index.js'),
          },
  });
  window.maximize();
  if (process.env.NODE_ENV === 'development') {
    window.loadURL(`http://localhost:9080`);
    window.webContents.on('did-frame-finish-load', () => {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name: string) => {
          window.webContents.openDevTools();
          console.log(`Added Extension: ${name}`);
        })
        .catch((err: Error) => console.log(`An error occurred: ${err}`));
    });
  } else {
    window.loadURL(`file://${app.getAppPath()}/../index.html`);
  }
  return window;
};

app
  .whenReady()
  .then(createWindow)
  .then(createMenu);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMenu(createWindow());
  }
});
