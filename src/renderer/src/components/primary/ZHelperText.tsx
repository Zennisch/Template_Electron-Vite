import { AnimatePresence, motion } from "framer-motion"
import { cn } from "./utils"

export interface ZHelperTextProps {
  error?: boolean | string
  helpText?: string
  errorId?: string
  helpId?: string
  className?: string
  textSize?: "xs" | "sm" | "base"
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
          initial={{ opacity: 0, height: 0, y: -5 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className={cn("overflow-hidden", className)}
        >
          {isError ? (
            <p className={cn("mt-1 font-medium text-red-600", `text-${textSize}`)} id={errorId}>
              {errorMessage}
            </p>
          ) : (
            <p className={cn("mt-1 text-slate-500", `text-${textSize}`)} id={helpId}>
              {helpText}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
