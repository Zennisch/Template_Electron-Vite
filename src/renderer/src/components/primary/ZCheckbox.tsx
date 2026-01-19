import { AnimatePresence, motion, Variants } from "framer-motion"
import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useEffect, useId, useRef, useState } from "react"
import { AnimatedCheckIcon, AnimatedIndeterminateIcon, cn } from "./utils"
import { ZHelperText } from "./ZHelperText"

type Size = "sm" | "md" | "lg"
type LabelPlacement = "left" | "right"
type Shadow = "none" | "sm" | "md" | "lg"

export interface ZCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: ReactNode
  labelPlacement?: LabelPlacement

  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean

  error?: boolean | string
  helpText?: string

  size?: Size
  shadow?: Shadow

  containerClassName?: string

  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void
}

const sizeConfig: Record<Size, { box: string; icon: string; text: string; labelGap: string }> = {
  sm: {
    box: "h-4 w-4 rounded",
    icon: "w-3 h-3",
    text: "text-sm",
    labelGap: "gap-2"
  },
  md: {
    box: "h-5 w-5 rounded",
    icon: "w-3.5 h-3.5",
    text: "text-sm",
    labelGap: "gap-2.5"
  },
  lg: {
    box: "h-6 w-6 rounded-md",
    icon: "w-4 h-4",
    text: "text-base",
    labelGap: "gap-3"
  }
}

const shadowClasses: Record<Shadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg"
}

const boxVariants: Variants = {
  unchecked: {
    backgroundColor: "#fff",
    borderColor: "#cbd5e1",
    scale: 1
  },
  checked: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
    scale: 1
  },
  hover: {
    borderColor: "#4f46e5"
  },
  tap: {
    scale: 0.9
  },
  error: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2"
  },
  errorChecked: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626"
  }
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
    shadow = "sm",

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

    if (!isControlled) {
      setInternalChecked(e.target.checked)
    }
    onChange?.(e.target.checked, e)
  }

  const isError = !!error
  const config = sizeConfig[size]

  const containerClasses = cn(
    "relative inline-flex items-center",
    labelPlacement === "left" ? "flex-row-reverse" : "flex-row",
    config.labelGap,
    containerClassName
  )

  const labelClasses = cn(
    "cursor-pointer select-none font-medium text-slate-900",
    config.text,
    disabled && "opacity-50 cursor-not-allowed",
    isError && "text-red-600"
  )

  const boxClasses = cn(
    "flex items-center justify-center border transition-shadow",
    config.box,
    shadowClasses[shadow],
    disabled ? "opacity-50 cursor-not-allowed bg-slate-100" : "cursor-pointer bg-white",
    // Focus ring handled by parent focus-within or manual focus state if simpler
    // We'll use focus-visible on the hidden input to trigger a ring on this box via sibling selector?
    // Actually easier to wrap input and box.
    className
  )

  let variantState = "unchecked"
  if (isError) {
    variantState = isChecked || indeterminate ? "errorChecked" : "error"
  } else {
    variantState = isChecked || indeterminate ? "checked" : "unchecked"
  }

  const [isFocused, setIsFocused] = useState(false)

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
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            onFocus={(e) => {
              setIsFocused(true)
              onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              onBlur?.(e)
            }}
            aria-invalid={isError}
            aria-describedby={error ? errorId : helpText ? helpId : undefined}
            {...rest}
          />

          <motion.div
            className={boxClasses}
            variants={boxVariants}
            initial={false}
            animate={variantState}
            whileTap={!disabled ? "tap" : undefined}
            transition={{ duration: 0.15 }}
            onClick={() => innerRef.current?.click()}
            style={{
              boxShadow: isFocused ? `0 0 0 2px #fff, 0 0 0 4px ${isError ? "#ef4444" : "#4f46e5"}` : undefined
            }}
          >
            <AnimatePresence mode="wait">
              {indeterminate ? (
                <AnimatedIndeterminateIcon key="indeterminate" className={cn("text-white", config.icon)} />
              ) : isChecked ? (
                <AnimatedCheckIcon key="checked" className={cn("text-white", config.icon)} />
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
        className={labelPlacement === "left" ? "text-right pr-1" : size === "sm" ? "ml-6" : size === "md" ? "ml-7" : "ml-9"}
      />
    </div>
  )
})

ZCheckbox.displayName = "ZCheckbox"

export default ZCheckbox
