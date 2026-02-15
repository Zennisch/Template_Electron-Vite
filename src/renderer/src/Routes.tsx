import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"
import FadeWrapper from "./components/animation/FadeWrapper"
import ComponentsPage from "./pages/ComponentsPage"
import ElectronPage from "./pages/ElectronPage"

const routes = [
  {
    path: "/",
    element: (
      <FadeWrapper>
        <ElectronPage />
      </FadeWrapper>
    )
  },
  {
    path: "/components",
    element: (
      <FadeWrapper>
        <ComponentsPage />
      </FadeWrapper>
    )
  }
]

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <div className="relative overflow-hidden w-full h-full">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default AnimatedRoutes
