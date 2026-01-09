import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { setupIpcEvent } from './setupIpcEvent'
import { createWindow } from './createWindow'

const onBrowserWindowCreated = (_: Electron.Event, window: Electron.BrowserWindow) => {
  optimizer.watchWindowShortcuts(window)
}

const onActivate = () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
}

export const onWindowAllClosed = () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

export const appReadyCallback = () => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', onBrowserWindowCreated)

  setupIpcEvent(ipcMain)

  createWindow()

  app.on('activate', onActivate)
}
