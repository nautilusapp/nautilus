import { dialog, Menu, BrowserWindow, shell } from 'electron';
import fs from 'fs';
import runDockerComposeValidation from '../common/dockerComposeValidation';

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
              .then((result: Electron.OpenDialogReturnValue) => {
                // if user exits out of file upload prompt
                if (!result.filePaths[0]) return;
                return runDockerComposeValidation(result.filePaths[0]);
              })
              .then((validationResults: any) => {
                //if validation actually ran and user did not exit out of file upload prompt
                if (validationResults) {
                  //if there was an error with the file
                  if (validationResults.error) {
                    window.webContents.send(
                      'file-upload-error-within-electron',
                      validationResults.error,
                    );
                    //process file and send to front end
                  } else if (validationResults.filePath) {
                    let yamlText = fs
                      .readFileSync(validationResults.filePath)
                      .toString();
                    window.webContents.send(
                      'file-uploaded-within-electron',
                      yamlText,
                    );
                  }
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
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
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
            shell.openExternal('http://nautilusdev.com');
          },
        },
        {
          label: 'Visit Nautilus on GitHub',
          click() {
            shell.openExternal('https://github.com/oslabs-beta/nautilus');
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

export default createMenu;
