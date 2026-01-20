import { motion } from "framer-motion"
import { ChangeEvent, forwardRef, InputHTMLAttributes, useId, useState } from "react"
import { cn } from "./utils"
import { ZHelperText } from "./ZHelperText"

type Size = "sm" | "md" | "lg"
type LabelPlacement = "left" | "right"

interface SwitchSizeConfig {
  track: string
  thumb: string
  x: number
  label: string
  containerGap: string
  helperPaddingLeft: string
  helperPaddingRight: string
  border: string
}

const SWITCH_SIZES: Record<Size, SwitchSizeConfig> = {
  sm: {
    track: "w-7 h-4",
    thumb: "w-3 h-3",
    x: 12,
    label: "text-sm",
    containerGap: "gap-2",
    helperPaddingLeft: "pl-9",
    helperPaddingRight: "pr-9",
    border: "border-2"
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-5 h-5",
    x: 20,
    label: "text-sm",
    containerGap: "gap-3",
    helperPaddingLeft: "pl-14",
    helperPaddingRight: "pr-14",
    border: "border-2"
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-6 h-6",
    x: 28,
    label: "text-base",
    containerGap: "gap-3",
    helperPaddingLeft: "pl-17",
    helperPaddingRight: "pr-17",
    border: "border-2"
  }
}

const SWITCH_COLORS = {
  TRACK: {
    CHECKED: "#4f46e5",
    UNCHECKED: "#e2e8f0",
    ERROR: "#dc2626"
  }
}

const ANIMATION_CONFIG = {
  DURATION: 0.2
}

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
  const config = SWITCH_SIZES[size]

  return (
    <div className={cn("flex flex-col", disabled && "opacity-50 cursor-not-allowed")}>
      <div
        className={cn(
          "inline-flex items-center align-middle",
          labelPlacement === "left" ? "flex-row-reverse" : "flex-row",
          config.containerGap,
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
              "relative inline-flex shrink-0 cursor-pointer rounded-full border-transparent",
              config.border,
              "focus:outline-none",
              isError
                ? "peer-focus-visible:ring-2 peer-focus-visible:ring-red-500 peer-focus-visible:ring-offset-2"
                : "peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600 peer-focus-visible:ring-offset-2",
              config.track,
              className
            )}
            initial={false}
            animate={{
              backgroundColor: isChecked
                ? isError
                  ? SWITCH_COLORS.TRACK.ERROR
                  : SWITCH_COLORS.TRACK.CHECKED
                : SWITCH_COLORS.TRACK.UNCHECKED
            }}
            transition={{ duration: ANIMATION_CONFIG.DURATION, ease: "easeOut" }}
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
                duration: ANIMATION_CONFIG.DURATION
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
        className={cn(labelPlacement === "left" ? cn("text-right", config.helperPaddingRight) : config.helperPaddingLeft)}
      />
    </div>
  )
})

ZSwitch.displayName = "ZSwitch"

export default ZSwitch
