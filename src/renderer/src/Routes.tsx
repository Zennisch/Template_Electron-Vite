import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"
import HorizontalSlideWrapper from "./components/animation/HorizontalSlideWrapper"
import ComponentsPage from "./pages/ComponentsPage"
import ElectronPage from "./pages/ElectronPage"

const routes = [
  {
    path: "/",
    element: (
      <HorizontalSlideWrapper>
        <ElectronPage />
      </HorizontalSlideWrapper>
    )
  },
  {
    path: "/components",
    element: (
      <HorizontalSlideWrapper>
        <ComponentsPage />
      </HorizontalSlideWrapper>
    )
  }
]

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <div className="relative overflow-hidden w-full h-full">
      <AnimatePresence mode="sync">
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
