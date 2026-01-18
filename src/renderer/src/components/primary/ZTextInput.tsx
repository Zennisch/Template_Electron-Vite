import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { forwardRef, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, useEffect, useId, useState } from "react"
import { cn } from "./utils"

type Size = "sm" | "md" | "lg" | "xl"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  error?: string | boolean
  helpText?: string

  iconStart?: ReactNode
  iconEnd?: ReactNode

  size?: Size
  shadow?: Shadow
  fullWidth?: boolean

  multiline?: boolean
  rows?: number

  containerClassName?: string
}

const sizeClasses: Record<Size, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl"
}

const paddingClasses: Record<Size, string> = {
  sm: "px-2.5 py-1.5",
  md: "px-3 py-2.5",
  lg: "px-4 py-3",
  xl: "px-5 py-3.5"
}

const labelMapping: Record<Size, string> = {
  sm: "top-1.5 left-1.5 text-sm",
  md: "top-2.5 left-2 text-base",
  lg: "top-3 left-3 text-lg",
  xl: "top-3.5 left-4 text-xl"
}

const iconStartPadding: Record<Size, string> = {
  sm: "pl-6",
  md: "pl-7",
  lg: "pl-8",
  xl: "pl-9"
}

const shadowClasses: Record<Shadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg",
  xl: "shadow-xl"
}

const ZTextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>((props, ref) => {
  const {
    label,
    error,
    helpText,

    iconStart,
    iconEnd,

    size = "md",
    shadow = "none",
    fullWidth = false,

    multiline = false,
    rows = 3,

    containerClassName,
    className,
    id,
    value,
    defaultValue,
    disabled,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    ...rest
  } = props

  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`
  const helpId = `${inputId}-help`

  const [isFocused, setIsFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue || "")

  const controls = useAnimation()

  const isControlled = value !== undefined
  const actualValue = isControlled ? value : internalValue
  const hasValue = !!String(actualValue ?? "")

  const labelVariants = {
    initial: {
      x: 0,
      y: 0,
      scale: 1,
      color: "#64748b"
    },
    float: {
      x: iconStart ? -12 : 0,
      y: size === "sm" ? -30 : size === "md" ? -34 : size === "lg" ? -38 : -44,
      scale: 0.85,
      color: error ? "#dc2626" : "#4f46e5"
    }
  }

  const borderVariants = {
    initial: {
      borderColor: "#e2e8f0",
      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)"
    },
    focus: {
      borderColor: "#4f46e5",
      boxShadow: "0px 0px 0px 4px rgba(79, 70, 229, 0.1)"
    },
    error: {
      borderColor: "#dc2626",
      boxShadow: "0px 0px 0px 4px rgba(220, 38, 38, 0.1)"
    }
  }

  useEffect(() => {
    if (error) {
      controls.start({
        x: [0, -4, 4, -4, 4, 0],
        transition: { duration: 0.4 }
      })
    }
  }, [error, controls])

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true)
    onFocus?.(e as any)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false)
    onBlur?.(e as any)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
    onChange?.(e as any)
  }

  const containerClasses = cn("relative mt-6 mb-2", fullWidth ? "w-full" : "max-w-md w-auto", containerClassName)

  const wrapperClasses = cn(
    "relative border rounded-lg bg-white flex items-center transition-colors",
    paddingClasses[size],
    shadowClasses[shadow],
    disabled ? "opacity-60 cursor-not-allowed bg-slate-50" : ""
  )

  const inputBaseClasses = cn(
    "w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 z-10",
    sizeClasses[size],
    "disabled:cursor-not-allowed resize-none",
    className
  )

  const labelBaseClasses = cn(
    "absolute pointer-events-none bg-transparent px-1 font-medium origin-top-left whitespace-nowrap z-20",
    labelMapping[size],
    iconStart ? iconStartPadding[size] : undefined
  )

  const shouldFloat = isFocused || hasValue || !!placeholder

  return (
    <div className={containerClasses}>
      <motion.div animate={controls}>
        <motion.div
          className={wrapperClasses}
          variants={borderVariants}
          initial="initial"
          animate={error ? "error" : isFocused ? "focus" : "initial"}
          whileHover={!isFocused && !error && !disabled ? { borderColor: "#cbd5e1" } : {}}
        >
          {iconStart && <div className={cn("text-slate-500 mr-2 shrink-0 flex items-center justify-center")}>{iconStart}</div>}

          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={inputId}
              value={actualValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder={placeholder}
              rows={rows}
              className={cn(inputBaseClasses, "block")}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : helpText ? helpId : undefined}
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type="text"
              id={inputId}
              value={actualValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder={placeholder}
              className={inputBaseClasses}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : helpText ? helpId : undefined}
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {iconEnd && <div className={cn("text-slate-500 ml-2 shrink-0 flex items-center justify-center")}>{iconEnd}</div>}

          {label && (
            <motion.label
              htmlFor={inputId}
              className={labelBaseClasses}
              variants={labelVariants}
              initial="initial"
              animate={shouldFloat ? "float" : "initial"}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {label}
            </motion.label>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {(error || helpText) && (
          <motion.div
            key={error ? "error" : "help"}
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {error ? (
              <p className="text-red-600 text-sm mt-1 ml-1 font-medium" id={errorId}>
                {typeof error === "string" ? error : "Invalid input"}
              </p>
            ) : (
              <p className="text-slate-500 text-sm mt-1 ml-1" id={helpId}>
                {helpText}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

ZTextInput.displayName = "ZTextInput"

export default ZTextInput
