import { motion } from "framer-motion"
import { ChangeEvent, forwardRef, InputHTMLAttributes, useId, useState } from "react"
import { cn } from "./utils"
import { ZHelperText } from "./ZHelperText"

type Size = "sm" | "md" | "lg"
type LabelPlacement = "left" | "right"

export interface ZSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: string
  labelPlacement?: LabelPlacement

  checked?: boolean
  defaultChecked?: boolean

  size?: Size
  error?: boolean | string
  helpText?: string

  containerClassName?: string

  onChange?: (checked: boolean) => void
}

const sizeConfig = {
  sm: {
    track: "w-7 h-4",
    thumb: "w-3 h-3",
    x: 12, // 0.75rem (w-3) -> translate 12px
    label: "text-sm",
    padding: "ml-2"
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-5 h-5",
    x: 20, // 1.25rem (w-5) -> translate 20px
    label: "text-sm",
    padding: "ml-3"
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-6 h-6",
    x: 28, // 1.5rem (w-6) -> translate 28px
    label: "text-base",
    padding: "ml-3"
  }
}

const colors = {
  track: {
    checked: "#4f46e5", // indigo-600
    unchecked: "#e2e8f0", // slate-200
    error: "#dc2626" // red-600
  }
}

const ZSwitch = forwardRef<HTMLInputElement, ZSwitchProps>((props, ref) => {
  const {
    label,
    labelPlacement = "right",

    checked: checkedProp,
    defaultChecked,

    size = "md",
    error,
    helpText,

    disabled,
    className,
    containerClassName,
    id,

    onChange,
    ...rest
  } = props

  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`
  const helpId = `${inputId}-help`

  const [internalChecked, setInternalChecked] = useState(defaultChecked || false)

  const isControlled = checkedProp !== undefined
  const isChecked = isControlled ? checkedProp : internalChecked

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    if (!isControlled) {
      setInternalChecked(e.target.checked)
    }
    onChange?.(e.target.checked)
  }

  const isError = !!error
  const config = sizeConfig[size]

  return (
    <div className={cn("flex flex-col", disabled && "opacity-50 cursor-not-allowed")}>
      <div
        className={cn(
          "inline-flex items-center align-middle",
          labelPlacement === "left" ? "flex-row-reverse" : "flex-row",
          containerClassName
        )}
      >
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className="peer sr-only"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={isError}
            aria-describedby={error ? errorId : helpText ? helpId : undefined}
            {...rest}
          />

          <motion.div
            className={cn(
              "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent",
              "focus:outline-none",
              // Focus ring styles
              isError
                ? "peer-focus-visible:ring-2 peer-focus-visible:ring-red-500 peer-focus-visible:ring-offset-2"
                : "peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600 peer-focus-visible:ring-offset-2",
              config.track,
              className
            )}
            initial={false}
            animate={{
              backgroundColor: isChecked ? (isError ? colors.track.error : colors.track.checked) : colors.track.unchecked
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => !disabled && document.getElementById(inputId)?.click()}
          >
            <span className="sr-only">{label || "Switch"}</span>
            <motion.span
              className={cn("pointer-events-none inline-block rounded-full bg-white shadow ring-0", config.thumb)}
              initial={false}
              animate={{
                x: isChecked ? config.x : 0
              }}
              transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.2
              }}
            />
          </motion.div>
        </div>

        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "select-none cursor-pointer text-slate-900 font-medium",
              disabled && "cursor-not-allowed",
              isError && "text-red-600",
              labelPlacement === "left" ? "mr-3" : config.padding,
              config.label
            )}
          >
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
        className={labelPlacement === "left" ? "text-right pr-2" : "ml-1"}
      />
    </div>
  )
})

ZSwitch.displayName = "ZSwitch"

export default ZSwitch
