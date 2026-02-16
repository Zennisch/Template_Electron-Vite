import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"
import { Components } from "./Components"
import AnimationWrapper from "./components/animation/AnimationWrapper"
import ElectronPage from "./pages/ElectronPage"

const routes = [
  {
    path: "/",
    element: (
      <AnimationWrapper type="slideLeft">
        <ElectronPage />
      </AnimationWrapper>
    )
  },
  {
    path: "/components",
    element: (
      <AnimationWrapper type="slideLeft">
        <Components />
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
