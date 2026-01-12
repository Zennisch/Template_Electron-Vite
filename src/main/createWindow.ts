import { shell, BrowserWindow, WindowOpenHandlerResponse } from "electron"
import { join } from "path"
import { is } from "@electron-toolkit/utils"

const WINDOW_WIDTH = 1280
const WINDOW_HEIGHT = 720
const SHOW_WHEN_CREATED = true
const ICON = join(__dirname, "../../resources/icon.png")

const onReadyToShow = (window: Electron.BrowserWindow): void => {
  window.show()
}

const setWindowOpenHandlerCallback = (details: Electron.HandlerDetails): WindowOpenHandlerResponse => {
  shell.openExternal(details.url)
  return { action: "deny" }
}

const loadURLOrFile = (window: Electron.BrowserWindow) => {
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    window.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    window.loadFile(join(__dirname, "../renderer/index.html"))
  }
}

export const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    show: SHOW_WHEN_CREATED,
    autoHideMenuBar: true,
    icon: ICON,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  })

  mainWindow.on("ready-to-show", () => onReadyToShow(mainWindow))

  mainWindow.webContents.setWindowOpenHandler((details) => setWindowOpenHandlerCallback(details))

  loadURLOrFile(mainWindow)
}
