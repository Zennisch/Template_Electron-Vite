import { motion, Transition } from "framer-motion"
import { ChangeEvent, FocusEvent, forwardRef, InputHTMLAttributes, useId, useRef, useState } from "react"
import { cn } from "./utils"
import { ZHelperText } from "./ZHelperText"

type Size = "sm" | "md" | "lg"

const sizeConfig: Record<Size, { trackHeight: string; thumbSize: number; label: string }> = {
  sm: {
    trackHeight: "h-1",
    thumbSize: 12,
    label: "text-sm"
  },
  md: {
    trackHeight: "h-2",
    thumbSize: 16,
    label: "text-base"
  },
  lg: {
    trackHeight: "h-3",
    thumbSize: 24,
    label: "text-lg"
  }
}

export interface ZSliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value" | "defaultValue"
> {
  label?: string
  error?: string | boolean
  helpText?: string

  min?: number
  max?: number
  step?: number

  value?: number
  defaultValue?: number

  size?: Size
  fullWidth?: boolean
  showValue?: boolean

  valueFormatter?: (value: number) => string
  onChange?: (value: number) => void
  containerClassName?: string
}

const ZSlider = forwardRef<HTMLInputElement, ZSliderProps>((props, ref) => {
  const {
    label,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,

    error,
    helpText,

    size = "md",
    fullWidth = false,
    showValue = false,
    disabled = false,

    className,
    containerClassName,
    id,

    onChange,
    valueFormatter = (val) => val.toString(),
    ...rest
  } = props

  const generatedId = useId()
  const sliderId = id || generatedId
  const errorId = `${sliderId}-error`
  const helpId = `${sliderId}-help`

  // Logic reused from Slider.tsx
  const [internalValue, setInternalValue] = useState<number>(defaultValue ?? min)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const [isDragging, setIsDragging] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const isPressedRef = useRef(false)

  const config = sizeConfig[size]
  const percentage = ((currentValue! - min) / (max - min)) * 100

  // Handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handlePointerDown = () => {
    setIsPressed(true)
    isPressedRef.current = true
  }

  const handlePointerUp = () => {
    setIsPressed(false)
    setIsDragging(false)
    isPressedRef.current = false
  }

  const handlePointerMove = () => {
    if (isPressedRef.current && !isDragging) {
      setIsDragging(true)
    }
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  // Styles
  const isError = !!error

  const containerClasses = cn(
    "flex flex-col gap-2 relative touch-none",
    fullWidth ? "w-full" : "w-64",
    disabled && "opacity-60 cursor-not-allowed",
    containerClassName
  )

  const labelClasses = cn("block font-medium leading-6", config.label, isError ? "text-red-600" : "text-slate-900")

  // Animation variants
  // We use inline styles for width/left for performance, but motion.div for transitions

  // When dragging, we want instant updates (no transition).
  // When clicking (value jump), we want ease-out.
  const transitionSettings: Transition = isDragging
    ? { type: "tween", duration: 0 }
    : { type: "tween", ease: "easeOut", duration: 0.2 }

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center mb-1">
        {label && (
          <label htmlFor={sliderId} className={labelClasses}>
            {label}
          </label>
        )}
        {showValue && (
          <span className={cn("text-sm font-medium tabular-nums", isError ? "text-red-600" : "text-slate-700")}>
            {valueFormatter(currentValue!)}
          </span>
        )}
      </div>

      <div className={cn("relative flex items-center select-none h-6", className)}>
        {/* Track Background */}
        <div className={cn("absolute w-full rounded-full bg-slate-200 overflow-hidden", config.trackHeight)}>
          {/* Track Fill */}
          <motion.div
            className={cn("h-full rounded-full", isError ? "bg-red-600" : "bg-indigo-600")}
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={transitionSettings}
          />
        </div>

        {/* Thumb */}
        <motion.div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 bg-white rounded-full border shadow-sm z-10 flex items-center justify-center pointer-events-none",
            isError ? "border-red-600" : "border-indigo-600"
          )}
          style={{
            left: `${percentage}%`,
            width: config.thumbSize,
            height: config.thumbSize,
            x: "-50%"
          }}
          initial={false}
          animate={{
            scale: isPressed ? 1.15 : isFocused ? 1.05 : 1,
            boxShadow: isFocused
              ? `0 0 0 4px ${isError ? "rgba(220, 38, 38, 0.2)" : "rgba(79, 70, 229, 0.2)"}`
              : "0 1px 3px 0 rgb(0 0 0 / 0.1)"
          }}
          transition={{
            // Separate transition for position vs scale/shadow
            left: transitionSettings,
            scale: { duration: 0.1 },
            boxShadow: { duration: 0.2 }
          }}
        >
          {/* Optional inner dot for larger sizes? mimic IOS or keeping simple based on ZButton style */}
        </motion.div>

        {/* Invisible Interactive Input */}
        <input
          ref={ref}
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          onChange={handleChange}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 m-0 p-0 appearance-none"
          aria-invalid={isError}
          aria-describedby={isError ? errorId : helpText ? helpId : undefined}
          {...rest}
        />
      </div>

      <ZHelperText error={error} helpText={helpText} errorId={errorId} helpId={helpId} defaultErrorMessage="Invalid value" />
    </div>
  )
})

ZSlider.displayName = "ZSlider"

export default ZSlider
