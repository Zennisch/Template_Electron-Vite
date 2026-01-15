import { ChangeEvent, forwardRef, HTMLAttributes, useId, useState } from "react"
import { cn } from "./utils"

type Size = "sm" | "md" | "lg"

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "value"> {
  label?: string

  min?: number
  max?: number
  step?: number

  value?: number
  defaultValue?: number
  showValue?: boolean

  error?: string | boolean
  helpText?: string

  fullWidth?: boolean
  size?: Size

  containerClassName?: string
  disabled?: boolean

  onChange?: (value: number) => void
  valueFormatter?: (value: number) => string
}

const Slider = forwardRef<HTMLInputElement, SliderProps>((props, ref) => {
  const {
    label,

    min = 0,
    max = 100,
    step = 1,

    value,
    defaultValue,
    showValue = false,

    error,
    helpText,

    disabled = false,
    fullWidth = false,
    size = "md",

    id,
    className,
    containerClassName,

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

  const percentage = ((currentValue - min) / (max - min)) * 100

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const isError = !!error

  const containerClasses = cn(
    "flex flex-col gap-2",
    fullWidth ? "w-full" : "w-64",
    disabled && "opacity-50 cursor-not-allowed",
    containerClassName
  )

  const sizeClasses: Record<Size, string> = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  }

  const thumbSizeClasses: Record<Size, string> = {
    sm: "[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3",
    md: "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4",
    lg: "[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6"
  }

  const inputClasses = cn(
    "w-full appearance-none rounded-lg bg-slate-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-110",
    "[&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:active:scale-110",

    isError
      ? "focus-visible:ring-red-500 [&::-webkit-slider-thumb]:bg-red-600 [&::-moz-range-thumb]:bg-red-600"
      : "focus-visible:ring-indigo-600 [&::-webkit-slider-thumb]:bg-indigo-600 [&::-moz-range-thumb]:bg-indigo-600",

    sizeClasses[size],
    thumbSizeClasses[size],
    className
  )

  const trackColor = isError ? "#dc2626" : "#4f46e5"
  const emptyColor = "#e2e8f0"

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center mb-1">
        {label && (
          <label
            htmlFor={sliderId}
            className={cn("block text-sm font-medium leading-6", isError ? "text-red-600" : "text-slate-900")}
          >
            {label}
          </label>
        )}

        {showValue && (
          <span className={cn("text-sm font-medium tabular-nums", isError ? "text-red-600" : "text-slate-700")}>
            {valueFormatter(currentValue)}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
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
          className={inputClasses}
          style={{
            background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${percentage}%, ${emptyColor} ${percentage}%, ${emptyColor} 100%)`
          }}
          aria-invalid={isError}
          aria-describedby={isError ? errorId : helpText ? helpId : undefined}
          {...rest}
        />
      </div>

      {(isError || helpText) && (
        <div className="mt-0">
          {isError && typeof error === "string" && (
            <p className="text-sm text-red-600" id={errorId}>
              {error}
            </p>
          )}

          {!isError && helpText && (
            <p className="text-sm text-slate-500" id={helpId}>
              {helpText}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

Slider.displayName = "Slider"

export default Slider
