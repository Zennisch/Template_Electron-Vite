import { motion, Transition } from "framer-motion"
import { cn } from "../primary/utils"

interface HorizontalSlideWrapperProps {
  children: React.ReactNode
  transition?: Transition
  className?: string
}

const HorizontalSlideWrapper = ({
  children,
  transition = { duration: 0.4, ease: "easeInOut" },
  className
}: HorizontalSlideWrapperProps): React.JSX.Element => {
  const baseClass = "absolute w-full h-full top-0 left-0"
  const combinedClass = cn(baseClass, className)

  return (
    <motion.div
      className={combinedClass}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export default HorizontalSlideWrapper
