import { app, BrowserWindow } from 'electron';

const isProd = process.env.NODE_ENV === 'production';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
  });

  if (isProd) {
    win.loadFile('./public/index.html');
  } else {
    win.loadURL('http://localhost:8080/public/index.html');
    win.webContents.openDevTools({ mode: 'detach' });
  }
};

app.whenReady().then(() => {
  createWindow();
});

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
