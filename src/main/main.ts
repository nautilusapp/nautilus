import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import createMenu from './menu';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import fixPath from 'fix-path';
import { getStatic } from '../common/static';

if (module.hot) {
  module.hot.accept();
}

if (process.env.NODE_ENV === 'production') {
  fixPath();
}

const createWindow = () => {
  let window = new BrowserWindow({
    width: 1000,
    height: 750,
    icon: getStatic('test.icns'),
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
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
    const startUrl = process.env.NOT_PACKAGE
      ? `file://${app.getAppPath()}/../renderer/index.html`
      : url.format({
          pathname: path.join(__dirname, '/dist/renderer/index.html'),
          protocol: 'file:',
          slashes: true,
        });
    window.loadURL(startUrl);
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
