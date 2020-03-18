import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

// const isMac = process.platform === 'darwin';

const createMenu = () => {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    { role: 'window', submenu: [{ role: 'minimize' }, { role: 'close' }] },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            require('electron').shell.openExternal('https://electron.atom.io');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

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
    createWindow();
  }
});
