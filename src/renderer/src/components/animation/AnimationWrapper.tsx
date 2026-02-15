import { motion, MotionNodeAnimationOptions } from "framer-motion"
import { cn } from "../primary/utils"

type AnimationType = "fade" | "scale" | "slideHorizontal" | "slideVertical" | "custom"

interface AnimationWrapperProps {
  children: React.ReactNode
  type?: AnimationType
  initial?: MotionNodeAnimationOptions["initial"]
  animate?: MotionNodeAnimationOptions["animate"]
  exit?: MotionNodeAnimationOptions["exit"]
  variants?: MotionNodeAnimationOptions["variants"]
  transition?: MotionNodeAnimationOptions["transition"]
  className?: string
}

const animationPresets = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
  },
  slideHorizontal: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "-100%" }
  },
  slideVertical: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "-100%" }
  }
}

const AnimationWrapper = ({
  children,
  type = "fade",
  initial,
  animate,
  exit,
  variants,
  transition = { duration: 0.4, ease: "easeInOut" },
  className
}: AnimationWrapperProps): React.JSX.Element => {
  const baseClass = "absolute w-full h-full top-0 left-0"
  const combinedClass = cn(baseClass, className)

  const animationProps = type === "custom" ? { initial, animate, exit } : animationPresets[type]

  return (
    <motion.div
      className={combinedClass}
      initial={animationProps.initial}
      animate={animationProps.animate}
      exit={animationProps.exit}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export default AnimationWrapper
