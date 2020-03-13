import electron from 'electron';

const app = electron.app;

const createWindow = () => {
  let win = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // load index.html of application
  win.loadFile('index.html');

  // open with devtools
  win.webContents.openDevTools();
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
