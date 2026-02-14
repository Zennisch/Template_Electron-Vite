import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useEffect, useId, useRef, useState } from "react"
import { AnimatedCheckIcon, AnimatedIndeterminateIcon, cn } from "./utils"
import { ZHelperText } from "./ZHelperText"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { LabelPlacement, Shadow, Size } from "./types/checkbox"

interface CheckboxSizeConfig {
  box: string
  text: string
  gap: string
}

const SIZES: Record<Size, CheckboxSizeConfig> = {
  sm: {
    box: "h-4 w-4 rounded",
    text: "text-sm",
    gap: "gap-0.5"
  },
  md: {
    box: "h-5 w-5 rounded",
    text: "text-base",
    gap: "gap-1"
  },
  lg: {
    box: "h-6 w-6 rounded",
    text: "text-lg",
    gap: "gap-1.5"
  }
}

const SHADOWS: Record<Shadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg"
}

const COLORS = {
  FOCUS_RING: "#4444ee",
  ERROR_RING: "#ee4444",
  WHITE_RING: "#ffffff"
}

const VARIANTS: Variants = {
  unchecked: {
    borderColor: "#ccddee",
    backgroundColor: "#ffffff",
    scale: 1
  },
  checked: {
    borderColor: "#4444ee",
    backgroundColor: "#4444ee",
    scale: 1
  },
  error: {
    borderColor: "#dd2222",
    backgroundColor: "#ffeeee"
  },
  errorChecked: {
    borderColor: "#dd2222",
    backgroundColor: "#dd2222"
  },
  hover: {
    borderColor: "#4444ee"
  },
  tap: {
    scale: 0.9
  }
}

interface ZCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: ReactNode
  labelPlacement?: LabelPlacement

  checked?: boolean
  indeterminate?: boolean

  error?: boolean | string
  helpText?: string

  size?: Size
  shadow?: Shadow

  containerClassName?: string

  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void
}

const ZCheckbox = forwardRef<HTMLInputElement, ZCheckboxProps>((props, ref) => {
  const {
    label,
    labelPlacement = "right",

    checked,
    defaultChecked,
    indeterminate = false,

    error,
    helpText,

    size = "md",
    shadow = "none",

    disabled,
    className,
    containerClassName,
    id,

    onChange,
    onFocus,
    onBlur,
    ...rest
  } = props

  const innerRef = useRef<HTMLInputElement>(null)
  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`
  const helpId = `${inputId}-help`

  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
  const [isFocused, setIsFocused] = useState(false)

  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalChecked

  useEffect(() => {
    if (!ref) return
    if (typeof ref === "function") {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
  }, [ref])

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    if (!isControlled) setInternalChecked(e.target.checked)
    onChange?.(e.target.checked, e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const isError = !!error
  const { box: boxCls, text: textCls, gap: gapCls } = SIZES[size]
  const shadowCls = SHADOWS[shadow]

  const containerClasses = cn(
    "relative inline-flex items-center",
    labelPlacement === "left" ? "flex-row-reverse" : "flex-row",
    gapCls,
    containerClassName
  )

  const labelClasses = cn(
    "cursor-pointer select-none font-medium",
    textCls,
    disabled && "opacity-50 cursor-not-allowed",
    isError ? "text-red-900" : "text-slate-900"
  )

  const boxClasses = cn(
    "flex items-center justify-center border transition-shadow",
    boxCls,
    shadowCls,
    disabled ? "opacity-50 cursor-not-allowed bg-slate-100" : "cursor-pointer bg-white",
    // Focus ring handled by parent focus-within or manual focus state if simpler
    // We'll use focus-visible on the hidden input to trigger a ring on this box via sibling selector?
    // Actually easier to wrap input and box.
    className
  )

  let variantState: string
  if (isError) {
    variantState = isChecked || indeterminate ? "errorChecked" : "error"
  } else {
    variantState = isChecked || indeterminate ? "checked" : "unchecked"
  }

  const boxShadowStyle = isFocused
    ? `0 0 0 2px ${COLORS.WHITE_RING}, 0 0 0 4px ${isError ? COLORS.ERROR_RING : COLORS.FOCUS_RING}`
    : undefined

  return (
    <div className="flex flex-col">
      <div className={containerClasses}>
        <div className="relative flex items-center">
          <input
            ref={innerRef}
            type="checkbox"
            id={inputId}
            className="peer sr-only"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={isError}
            aria-describedby={error ? errorId : helpText ? helpId : undefined}
            {...rest}
          />

          <motion.div
            className={boxClasses}
            variants={VARIANTS}
            initial={false}
            animate={variantState}
            whileTap={!disabled ? "tap" : undefined}
            transition={{ duration: 0.15 }}
            onClick={() => innerRef.current?.click()}
            style={{ boxShadow: boxShadowStyle }}
          >
            <AnimatePresence mode="wait">
              {indeterminate ? (
                <AnimatedIndeterminateIcon key="indeterminate" className={"text-white"} />
              ) : isChecked ? (
                <AnimatedCheckIcon key="checked" className={"text-white"} />
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>

        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
      </div>

      <ZHelperText
        error={error}
        helpText={helpText}
        errorId={errorId}
        helpId={helpId}
        textSize="xs"
        defaultErrorMessage="Selection required"
        className={labelPlacement === "left" ? "text-right" : ""}
      />
    </div>
  )
})

ZCheckbox.displayName = "ZCheckbox"

export default ZCheckbox
