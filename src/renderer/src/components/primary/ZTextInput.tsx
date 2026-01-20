import { motion, useAnimation, Variants } from "framer-motion"
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
  useEffect,
  useId,
  useMemo,
  useState
} from "react"
import { cn } from "./utils"
import { ZHelperText } from "./ZHelperText"

type Size = "sm" | "md" | "lg" | "xl"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"

interface TextInputSizeConfig {
  text: string
  padding: string
  label: string
  iconPadValue: string
  floatY: number
  gap: string
  helperMargin: string
}

const TEXT_INPUT_SIZES: Record<Size, TextInputSizeConfig> = {
  sm: {
    text: "text-sm",
    padding: "px-2.5 py-1.5",
    label: "top-1.5 left-1.5 text-sm",
    iconPadValue: "24px",
    floatY: -16,
    gap: "gap-1.5",
    helperMargin: "ml-0.5"
  },
  md: {
    text: "text-base",
    padding: "px-3 py-2.5",
    label: "top-2.5 left-2 text-base",
    iconPadValue: "28px",
    floatY: -22,
    gap: "gap-2",
    helperMargin: "ml-1"
  },
  lg: {
    text: "text-lg",
    padding: "px-4 py-3",
    label: "top-3 left-3 text-lg",
    iconPadValue: "32px",
    floatY: -26,
    gap: "gap-2.5",
    helperMargin: "ml-1.5"
  },
  xl: {
    text: "text-xl",
    padding: "px-5 py-3.5",
    label: "top-3.5 left-4 text-xl",
    iconPadValue: "36px",
    floatY: -28,
    gap: "gap-3",
    helperMargin: "ml-2"
  }
}

const SHADOW_CLASSES: Record<Shadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg",
  xl: "shadow-xl"
}

const SHADOW_VALUES: Record<Shadow, string> = {
  none: "0 0 #0000",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
}

const COLORS: Record<string, string> = {
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

const ANIMATION_CONFIG = {
  LABEL_SCALE: 0.85,
  LABEL_PADDING_LEFT: "4px",
  RING_WIDTH: "4px",
  ERROR_SHAKE_DURATION: 0.4,
  TRANSITION_DURATION: 0.2,
  SHAKE_DISTANCE: 4
}

const LABEL_VARIANTS: Variants = {
  initial: (custom: { paddingStart: string }) => ({
    x: 0,
    y: 0,
    scale: 1,
    paddingLeft: custom.paddingStart,
    color: COLORS.textDefault,
    backgroundColor: "rgba(255, 255, 255, 0)"
  }),
  float: (custom: { y: number; error: boolean; hasIcon: boolean; bgColor: string; paddingStart: string }) => ({
    x: 0,
    y: custom.y,
    scale: ANIMATION_CONFIG.LABEL_SCALE,
    paddingLeft: ANIMATION_CONFIG.LABEL_PADDING_LEFT,
    backgroundColor: custom.bgColor,
    color: custom.error ? COLORS.textError : COLORS.textFocus
  })
}

const BORDER_VARIANTS: Variants = {
  initial: (shadow) => ({ borderColor: COLORS.borderDefault, boxShadow: shadow }),

  focus: (shadow) => ({
    borderColor: COLORS.borderFocus,
    boxShadow: `0px 0px 0px ${ANIMATION_CONFIG.RING_WIDTH} ${COLORS.shadowFocus}, ${shadow}`
  }),
  error: (shadow) => ({
    borderColor: COLORS.borderError,
    boxShadow: `0px 0px 0px ${ANIMATION_CONFIG.RING_WIDTH} ${COLORS.shadowError}, ${shadow}`
  }),
  hover: { borderColor: COLORS.borderHover }
}

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

export type ZTextInputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "onChange" | "onBlur" | "onFocus"> & {
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  }

const ZTextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, ZTextInputProps>((props, ref) => {
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
      const dist = ANIMATION_CONFIG.SHAKE_DISTANCE
      controls.start({
        x: [0, -dist, dist, -dist, dist, 0],
        transition: { duration: ANIMATION_CONFIG.ERROR_SHAKE_DURATION }
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

  const config = TEXT_INPUT_SIZES[size]

  const containerClasses = cn("relative mt-6 mb-2", fullWidth ? "w-full" : "max-w-md w-auto", containerClassName)

  const wrapperClasses = cn(
    "relative flex items-center rounded-lg border",
    "bg-white",
    config.gap,
    config.padding,
    SHADOW_CLASSES[shadow],
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
      paddingStart: iconStart ? config.iconPadValue : ANIMATION_CONFIG.LABEL_PADDING_LEFT
    }),
    [config.floatY, error, iconStart, backgroundColor, config.iconPadValue]
  )

  return (
    <div className={containerClasses}>
      <motion.div animate={controls}>
        <motion.div
          className={wrapperClasses}
          variants={BORDER_VARIANTS}
          initial="initial"
          custom={SHADOW_VALUES[shadow]}
          animate={error ? "error" : isFocused ? "focus" : "initial"}
          whileHover={!isFocused && !error && !disabled ? "hover" : undefined}
          transition={{ duration: ANIMATION_CONFIG.TRANSITION_DURATION }}
        >
          {iconStart && (
            <div className="text-slate-500 shrink-0 flex items-center justify-center pointer-events-none">{iconStart}</div>
          )}

          {multiline ? (
            <textarea
              ref={ref as Ref<HTMLTextAreaElement>}
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
              ref={ref as Ref<HTMLInputElement>}
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
            <div className="text-slate-500 shrink-0 flex items-center justify-center pointer-events-none">{iconEnd}</div>
          )}

          {label && (
            <motion.label
              htmlFor={inputId}
              className={labelClasses}
              variants={LABEL_VARIANTS}
              initial="initial"
              animate={shouldFloat ? "float" : "initial"}
              custom={labelCustom}
              transition={{ duration: ANIMATION_CONFIG.TRANSITION_DURATION, ease: "easeOut" }}
            >
              {label}
            </motion.label>
          )}
        </motion.div>
      </motion.div>

      <ZHelperText error={error} helpText={helpText} errorId={errorId} helpId={helpId} className={config.helperMargin} />
    </div>
  )
})

ZTextInput.displayName = "ZTextInput"

export default ZTextInput
