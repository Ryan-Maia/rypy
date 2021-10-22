const {app, ipcMain, BrowserWindow} = require('electron')
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true
  })
  mainWindow.loadURL('http://localhost:8000/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('closeWindow', (e, data) => {
	// mainWindow.hide(); PRODUCTION
	force_quit = true; app.quit(); //DEBUG
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})