import { motion, Transition } from "framer-motion"
import { cn } from "../primary/utils"

interface ScaleWrapperProps {
  children: React.ReactNode
  transition?: Transition
  className?: string
}

const ScaleWrapper = ({
  children,
  transition = { duration: 0.4, ease: "easeInOut" },
  className
}: ScaleWrapperProps): React.JSX.Element => {
  const baseClass = "absolute w-full h-full top-0 left-0"
  const combinedClass = cn(baseClass, className)

  return (
    <motion.div
      className={combinedClass}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export default ScaleWrapper
