import { dialog, Menu, BrowserWindow, shell } from 'electron';
import fs from 'fs';
import dockerComposeValidation from '../common/dockerComposeValidation';
import resolveEnvVariables from '../common/resolveEnvVariables';

const createMenu = (window: BrowserWindow) => {
  const menuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open Docker-Compose File',
          accelerator: 'CommandOrControl+O',
          //on click for open menu item
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
                // if user exits out of file open prompt
                if (!result.filePaths[0]) return;
                return dockerComposeValidation(result.filePaths[0]);
              })
              .then((validationResults: any) => {
                //if validation actually ran and user did not exit out of file open prompt
                if (validationResults) {
                  //if there was an error with the file
                  if (validationResults.error) {
                    window.webContents.send(
                      'file-open-error-within-electron',
                      validationResults.error,
                    );
                    //process file and send to front end
                  } else if (validationResults.filePath) {
                    let yamlText = fs
                      .readFileSync(validationResults.filePath)
                      .toString();
                    if (validationResults.envResolutionRequired) {
                      yamlText = resolveEnvVariables(
                        yamlText,
                        validationResults.filePath,
                      );
                    }
                    window.webContents.send(
                      'file-opened-within-electron',
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
        {
          label: `Nautilus v${process.env.npm_package_version}`,
          enabled: false,
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

export default createMenu;
