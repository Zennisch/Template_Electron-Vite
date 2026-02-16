import { motion, MotionNodeAnimationOptions } from "framer-motion"
import { cn } from "../primary/utils"

type AnimationType =
  | "fade"
  | "scale"
  | "slideLeft"
  | "slideRight"
  | "slideUp"
  | "slideDown"
  | "zoom"
  | "blur"
  | "rotate"
  | "flip"
  | "bounce"
  | "custom"

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

interface AnimationPresets {
  initial: MotionNodeAnimationOptions["initial"]
  animate: MotionNodeAnimationOptions["animate"]
  exit: MotionNodeAnimationOptions["exit"]
}

const animationPresets: Record<Exclude<AnimationType, "custom">, AnimationPresets> = {
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
  slideLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "100%" }
  },
  slideRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "-100%" }
  },
  slideUp: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "-100%" }
  },
  slideDown: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "100%" }
  },
  zoom: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
  },
  blur: {
    initial: { filter: "blur(10px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: "blur(10px)", opacity: 0 }
  },
  rotate: {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 }
  },
  flip: {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: 90, opacity: 0 }
  },
  bounce: {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: { y: -100, opacity: 0 }
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
      style={{ willChange: "transform, opacity" }}
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
