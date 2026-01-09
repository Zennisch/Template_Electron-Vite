export const setupIpcEvent = (ipcMain: Electron.IpcMain) => {
    ipcMain.on('ping', () => console.log('pong'))
}
