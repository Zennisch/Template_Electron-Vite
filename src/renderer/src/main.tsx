import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

import "@fontsource/inter/400.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/900.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./assets/main.css"
import { HashRouter } from "react-router-dom"
import { Components } from "./Components"
import ZTextInput from "./components/primary/ZTextInput"
import ZTextInputTest from "./ZTextInputTest"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ZTextInputTest />
    </HashRouter>
  </StrictMode>
)
