import { motion, Transition } from "framer-motion"
import { ChangeEvent, FocusEvent, forwardRef, InputHTMLAttributes, useId, useRef, useState } from "react"
import { cn } from "./utils"
import { ZHelperText } from "./ZHelperText"

type Size = "sm" | "md" | "lg"

interface SliderSizeConfig {
  trackHeight: string
  thumbSize: number
  label: string
  containerGap: string
  labelMargin: string
  height: string
}

const SLIDER_SIZES: Record<Size, SliderSizeConfig> = {
  sm: {
    trackHeight: "h-1",
    thumbSize: 12,
    label: "text-sm",
    containerGap: "gap-1.5",
    labelMargin: "mb-1",
    height: "h-4"
  },
  md: {
    trackHeight: "h-2",
    thumbSize: 16,
    label: "text-base",
    containerGap: "gap-2",
    labelMargin: "mb-1.5",
    height: "h-5"
  },
  lg: {
    trackHeight: "h-3",
    thumbSize: 24,
    label: "text-lg",
    containerGap: "gap-2.5",
    labelMargin: "mb-2",
    height: "h-6"
  }
}

const LAYOUT = {
  DEFAULT_WIDTH: "w-64",
  INPUT_RESET: "m-0 p-0 appearance-none"
}

const ANIMATION_CONFIG = {
  SCALE: {
    PRESSED: 1.15,
    FOCUSED: 1.05,
    NORMAL: 1
  },
  DURATION: {
    DRAG: 0,
    JUMP: 0.2,
    SCALE: 0.1,
    SHADOW: 0.2
  }
}

const COLORS = {
  PRIMARY_SHADOW: "rgba(79, 70, 229, 0.2)",
  ERROR_SHADOW: "rgba(220, 38, 38, 0.2)",
  DEFAULT_SHADOW: "0 1px 3px 0 rgb(0 0 0 / 0.1)"
}

interface ZSliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value" | "defaultValue"> {
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

  const [internalValue, setInternalValue] = useState<number>(defaultValue ?? min)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const [isDragging, setIsDragging] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const isPressedRef = useRef(false)

  const config = SLIDER_SIZES[size]
  const percentage = ((currentValue! - min) / (max - min)) * 100

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

  const isError = !!error

  const containerClasses = cn(
    "flex flex-col relative touch-none",
    fullWidth ? "w-full" : LAYOUT.DEFAULT_WIDTH,
    disabled && "opacity-60 cursor-not-allowed",
    config.containerGap,
    containerClassName
  )

  const labelClasses = cn("block font-medium leading-6", config.label, isError ? "text-red-600" : "text-slate-900")

  const transitionSettings: Transition = isDragging
    ? { type: "tween", duration: ANIMATION_CONFIG.DURATION.DRAG }
    : { type: "tween", ease: "easeOut", duration: ANIMATION_CONFIG.DURATION.JUMP }

  return (
    <div className={containerClasses}>
      <div className={cn("flex justify-between items-center", config.labelMargin)}>
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

      <div className={cn("relative flex items-center select-none", config.height, className)}>
        <div className={cn("absolute w-full rounded-full bg-slate-200 overflow-hidden", config.trackHeight)}>
          <motion.div
            className={cn("h-full rounded-full", isError ? "bg-red-600" : "bg-indigo-600")}
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={transitionSettings}
          />
        </div>

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
            scale: isPressed
              ? ANIMATION_CONFIG.SCALE.PRESSED
              : isFocused
                ? ANIMATION_CONFIG.SCALE.FOCUSED
                : ANIMATION_CONFIG.SCALE.NORMAL,
            boxShadow: isFocused ? `0 0 0 4px ${isError ? COLORS.ERROR_SHADOW : COLORS.PRIMARY_SHADOW}` : COLORS.DEFAULT_SHADOW
          }}
          transition={{
            left: transitionSettings,
            scale: { duration: ANIMATION_CONFIG.DURATION.SCALE },
            boxShadow: { duration: ANIMATION_CONFIG.DURATION.SHADOW }
          }}
        ></motion.div>

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
          className={cn("absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20", LAYOUT.INPUT_RESET)}
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
