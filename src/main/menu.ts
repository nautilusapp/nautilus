import { dialog, Menu, BrowserWindow } from 'electron';
import fs from 'fs';

const createMenu = (window: BrowserWindow) => {
  const menuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Upload Docker-Compose File',
          accelerator: 'CommandOrControl+O',
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
        { type: 'separator' },
        { role: 'close' },
        { role: 'quit' },
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
          label: 'Nautilus Homepage',
          click() {
            require('electron').shell.openExternal('https://electron.atom.io');
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

export default createMenu;
