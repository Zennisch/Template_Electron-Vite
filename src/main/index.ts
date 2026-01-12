import { app } from "electron"
import { appReadyCallback, onWindowAllClosed } from "./setupElectronEvent"

app.whenReady().then(appReadyCallback)

app.on("window-all-closed", onWindowAllClosed)
