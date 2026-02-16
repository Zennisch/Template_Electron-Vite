import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"
import AnimationWrapper from "./components/animation/AnimationWrapper"
import ComponentsPage from "./pages/ComponentsPage"
import ElectronPage from "./pages/ElectronPage"

const routes = [
  {
    path: "/",
    element: (
      <AnimationWrapper type="slideRight">
        <ElectronPage />
      </AnimationWrapper>
    )
  },
  {
    path: "/components",
    element: (
      <AnimationWrapper type="slideRight">
        <ComponentsPage />
      </AnimationWrapper>
    )
  }
]

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <div className="relative overflow-hidden w-full h-full">
      <AnimatePresence mode="sync" initial={false}>
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
