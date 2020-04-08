/**
 * ************************
 * @name main
 * @description spins up electron application with specific settings
 * ************************
 */
import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import createMenu from './menu';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import fixPath from 'fix-path';

// in development, reload with HMR from webpack-dev-server
if (module.hot) {
  module.hot.accept();
}

// function to find $PATH for bash cli in production, on macOS
// https://github.com/sindresorhus/fix-path
if (process.env.NODE_ENV === 'production') {
  fixPath();
}

// create the electron application shell
const createWindow = () => {
  // set window object
  const window = new BrowserWindow({
    width: 1000,
    height: 750,
    // remove titleBar native to mac, keep stoplights
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // set electron app size to full screen
  window.maximize();

  // if in development, load content from dev server and install dev tools
  if (process.env.NODE_ENV === 'development') {
    // load from webpack dev server
    window.loadURL(`http://localhost:9080`);
    // install non-native dev tools
    window.webContents.on('did-frame-finish-load', () => {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name: string) => {
          window.webContents.openDevTools();
          console.log(`Added Extension: ${name}`);
        })
        .catch((err: Error) => console.log(`An error occurred: ${err}`));
    });
  } else {
    // in production, load content from electron application files
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

// when the electron engine is ready, create window and menubar
app.whenReady().then(createWindow).then(createMenu);

// for every OS but mac, quit the application when windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// open a new window if no windows are opened
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMenu(createWindow());
  }
});
