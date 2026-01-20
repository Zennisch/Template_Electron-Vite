import { AnimatePresence, motion } from "framer-motion"
import { cn } from "./utils"

type TextSize = "xs" | "sm" | "base"

const HELPER_SIZES: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base"
}

const ANIMATION_CONFIG = {
  INITIAL: { opacity: 0, height: 0, y: -5 },
  ANIMATE: { opacity: 1, height: "auto", y: 0 },
  EXIT: { opacity: 0, height: 0, y: -5 },
  TRANSITION: { duration: 0.2 }
}

const HELPER_LAYOUT = {
  MARGIN_TOP: "mt-1",
  CONTAINER: "overflow-hidden"
}

const HELPER_THEME = {
  ERROR: "font-medium text-red-600",
  DEFAULT: "text-slate-500"
}

interface ZHelperTextProps {
  error?: boolean | string
  helpText?: string
  errorId?: string
  helpId?: string
  className?: string
  textSize?: TextSize
  defaultErrorMessage?: string
}

export const ZHelperText = ({
  error,
  helpText,
  errorId,
  helpId,
  className,
  textSize = "sm",
  defaultErrorMessage = "Invalid input"
}: ZHelperTextProps) => {
  const isError = !!error
  const errorMessage = typeof error === "string" ? error : defaultErrorMessage

  return (
    <AnimatePresence mode="wait">
      {(isError || helpText) && (
        <motion.div
          key={isError ? "error" : "help"}
          initial={ANIMATION_CONFIG.INITIAL}
          animate={ANIMATION_CONFIG.ANIMATE}
          exit={ANIMATION_CONFIG.EXIT}
          transition={ANIMATION_CONFIG.TRANSITION}
          className={cn(HELPER_LAYOUT.CONTAINER, className)}
        >
          {isError ? (
            <p
              className={cn(HELPER_LAYOUT.MARGIN_TOP, HELPER_THEME.ERROR, HELPER_SIZES[textSize])}
              id={errorId}
            >
              {errorMessage}
            </p>
          ) : (
            <p
              className={cn(HELPER_LAYOUT.MARGIN_TOP, HELPER_THEME.DEFAULT, HELPER_SIZES[textSize])}
              id={helpId}
            >
              {helpText}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
