import { app, BrowserWindow, Menu, dialog } from 'electron';
import path from 'path';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import fs from 'fs';

// const isMac = process.platform === 'darwin';

//create custom menu item
const createMenu = (window: BrowserWindow) => {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Upload Docker-Compose File',
          accelerator: 'CommandOrControl+U',
          //on click for upload menu item
          click() {
            dialog
              .showOpenDialog({
                properties: ['openFile'],
                filters: [
                  { name: 'Docker Compose Files', extensions: ['yml', 'yaml'] },
                  { name: 'All Files', extensions: ['*'] },
                ],
              })
              .then((result: any) => {
                if (result.filePaths[0]) {
                  let yamlText = fs
                    .readFileSync(result.filePaths[0])
                    .toString();
                  window.webContents.send(
                    'file-uploaded-within-electron',
                    yamlText,
                  );
                }
              })
              .catch((err: Error) => console.log('error reading file: ', err));
          },
        },
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
    createWindow();
  }
});
