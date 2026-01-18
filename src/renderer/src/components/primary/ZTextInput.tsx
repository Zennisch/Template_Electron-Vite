import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion"
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useId,
  useMemo,
  useState
} from "react"
import { cn } from "./utils"

type Size = "sm" | "md" | "lg" | "xl"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"

type BaseProps = {
  label?: string
  error?: string | boolean
  helpText?: string

  iconStart?: ReactNode
  iconEnd?: ReactNode

  size?: Size
  shadow?: Shadow
  fullWidth?: boolean
  backgroundColor?: string

  multiline?: boolean
  rows?: number

  containerClassName?: string
}

export type TextInputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "onChange" | "onBlur" | "onFocus"> & {
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  }

const shadowClasses: Record<Shadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg",
  xl: "shadow-xl"
}

const shadowValues: Record<Shadow, string> = {
  none: "0 0 #0000",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
}

const colors: Record<string, string> = {
  borderDefault: "#e2e8f0",
  borderHover: "#cbd5e1",
  borderFocus: "#4f46e5",
  borderError: "#dc2626",
  textDefault: "#64748b",
  textFocus: "#4f46e5",
  textError: "#dc2626",
  shadowFocus: "rgba(79, 70, 229, 0.1)",
  shadowError: "rgba(220, 38, 38, 0.1)"
}

const sizeConfig: Record<
  Size,
  { text: string; padding: string; label: string; iconPad: string; iconPadValue: string; floatY: number }
> = {
  sm: {
    text: "text-sm",
    padding: "px-2.5 py-1.5",
    label: "top-1.5 left-1.5 text-sm",
    iconPad: "pl-6",
    iconPadValue: "24px",
    floatY: -16
  },
  md: {
    text: "text-base",
    padding: "px-3 py-2.5",
    label: "top-2.5 left-2 text-base",
    iconPad: "pl-7",
    iconPadValue: "28px",
    floatY: -22
  },
  lg: {
    text: "text-lg",
    padding: "px-4 py-3",
    label: "top-3 left-3 text-lg",
    iconPad: "pl-8",
    iconPadValue: "32px",
    floatY: -26
  },
  xl: {
    text: "text-xl",
    padding: "px-5 py-3.5",
    label: "top-3.5 left-4 text-xl",
    iconPad: "pl-9",
    iconPadValue: "36px",
    floatY: -28
  }
}

const labelVariants: Variants = {
  initial: (custom: { paddingStart: string }) => ({
    x: 0,
    y: 0,
    scale: 1,
    paddingLeft: custom.paddingStart,
    color: colors.textDefault,
    backgroundColor: "rgba(255, 255, 255, 0)"
  }),
  float: (custom: { y: number; error: boolean; hasIcon: boolean; bgColor: string; paddingStart: string }) => ({
    x: 0,
    y: custom.y,
    scale: 0.85,
    paddingLeft: "4px",
    backgroundColor: custom.bgColor,
    color: custom.error ? colors.textError : colors.textFocus
  })
}

const borderVariants: Variants = {
  initial: (shadow) => ({ borderColor: colors.borderDefault, boxShadow: shadow }),

  focus: (shadow) => ({
    borderColor: colors.borderFocus,
    boxShadow: `0px 0px 0px 4px ${colors.shadowFocus}, ${shadow}`
  }),
  error: (shadow) => ({
    borderColor: colors.borderError,
    boxShadow: `0px 0px 0px 4px ${colors.shadowError}, ${shadow}`
  }),
  hover: { borderColor: colors.borderHover }
}

const ZTextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>((props, ref) => {
  const {
    label,
    error,
    helpText,

    iconStart,
    iconEnd,

    size = "md",
    backgroundColor = "#ffffff",
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

  const isControlled = value !== undefined
  const actualValue = isControlled ? value : internalValue

  const hasValue = actualValue !== "" && actualValue !== null && actualValue !== undefined
  const shouldFloat = isFocused || hasValue || !!placeholder

  const controls = useAnimation()

  useEffect(() => {
    if (error) {
      controls.start({
        x: [0, -4, 4, -4, 4, 0],
        transition: { duration: 0.4 }
      })
    }
  }, [error, controls])

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
    onChange?.(e)
  }

  const config = sizeConfig[size]

  const containerClasses = cn("relative mt-6 mb-2", fullWidth ? "w-full" : "max-w-md w-auto", containerClassName)

  const wrapperClasses = cn(
    "relative flex items-center rounded-lg border",
    "bg-white",
    config.padding,
    shadowClasses[shadow],
    disabled && "opacity-60 cursor-not-allowed bg-slate-50"
  )

  const inputBaseClasses = cn(
    "w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 z-10",
    "disabled:cursor-not-allowed resize-none",
    config.text,
    className
  )

  const labelClasses = cn(
    "absolute pointer-events-none bg-transparent px-1 font-medium origin-top-left whitespace-nowrap z-20",
    config.label
  )

  const labelCustom = useMemo(
    () => ({
      y: config.floatY,
      error: !!error,
      hasIcon: !!iconStart,
      bgColor: backgroundColor,
      paddingStart: iconStart ? config.iconPadValue : "4px"
    }),
    [config.floatY, error, iconStart, backgroundColor, config.iconPadValue]
  )

  return (
    <div className={containerClasses}>
      <motion.div animate={controls}>
        <motion.div
          className={wrapperClasses}
          variants={borderVariants}
          initial="initial"
          custom={shadowValues[shadow]}
          animate={error ? "error" : isFocused ? "focus" : "initial"}
          whileHover={!isFocused && !error && !disabled ? "hover" : undefined}
          transition={{ duration: 0.2 }}
        >
          {iconStart && (
            <div className="text-slate-500 mr-2 shrink-0 flex items-center justify-center pointer-events-none">{iconStart}</div>
          )}

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

          {iconEnd && (
            <div className="text-slate-500 ml-2 shrink-0 flex items-center justify-center pointer-events-none">{iconEnd}</div>
          )}

          {label && (
            <motion.label
              htmlFor={inputId}
              className={labelClasses}
              variants={labelVariants}
              initial="initial"
              animate={shouldFloat ? "float" : "initial"}
              custom={labelCustom}
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

ZTextInput.displayName = "TextInput"

export default ZTextInput
