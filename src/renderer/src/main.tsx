import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@fontsource/inter/400.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/900.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { HashRouter } from "react-router-dom"
import "./assets/main.css"
import { Components } from "./Components"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Components />
    </HashRouter>
  </StrictMode>
)
