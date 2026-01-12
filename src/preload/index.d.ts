import { ElectronAPI } from "@electron-toolkit/preload"
import { api } from "./index.js"

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}
