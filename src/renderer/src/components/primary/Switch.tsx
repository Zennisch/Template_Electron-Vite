import { forwardRef, InputHTMLAttributes, useId } from "react"
import { cn } from "./utils"

type Size = "sm" | "md" | "lg"
type LabelPlacement = "left" | "right"

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: string
  labelPlacement?: LabelPlacement
  
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  
  size?: Size
  error?: boolean | string
  helpText?: string
  
  containerClassName?: string
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const {
    label,
    labelPlacement = "right",
    checked,
    defaultChecked,
    onChange,
    size = "md",
    error,
    helpText,
    disabled,
    className,
    containerClassName,
    id,
    ...rest
  } = props

  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`
  const helpId = `${inputId}-help`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  const isError = !!error

  const containerClasses = cn(
    "inline-flex items-center align-middle",
    labelPlacement === "left" ? "flex-row-reverse" : "flex-row",
    containerClassName
  )

  const labelClasses = cn(
    "select-none cursor-pointer text-slate-900 font-medium",
    disabled && "opacity-50 cursor-not-allowed",
    isError && "text-red-600",
    labelPlacement === "left" ? "mr-3" : "ml-3",
    size === "sm" && "text-sm",
    size === "md" && "text-sm",
    size === "lg" && "text-base"
  )

  // Classes cho phần rãnh (Track)
  const trackSizeClasses: Record<Size, string> = {
    sm: "h-4 w-7",
    md: "h-6 w-11",
    lg: "h-7 w-14",
  }

  // Classes cho phần nút tròn (Thumb)
  const thumbSizeClasses: Record<Size, string> = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  // Độ dịch chuyển khi Active (Translate X)
  // Áp dụng lên Track (div cha) để target vào Thumb (span con) thông qua arbitrary variant của Tailwind
  const translateClasses: Record<Size, string> = {
    sm: "peer-checked:[&_span]:translate-x-3",
    md: "peer-checked:[&_span]:translate-x-5",
    lg: "peer-checked:[&_span]:translate-x-7",
  }

  const trackClasses = cn(
    "peer relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "bg-slate-200", // Màu nền khi tắt
    disabled ? "cursor-not-allowed opacity-50" : "",
    isError
      ? "focus-visible:ring-red-500 peer-checked:bg-red-600"
      : "focus-visible:ring-indigo-600 peer-checked:bg-indigo-600",
    trackSizeClasses[size],
    translateClasses[size],
    className
  )

  const thumbClasses = cn(
    "pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
    "translate-x-0",
    thumbSizeClasses[size]
  )
  
  const descriptionId = error ? errorId : helpText ? helpId : undefined

  return (
    <div className="flex flex-col">
      <div className={containerClasses}>
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className="peer sr-only" // Ẩn input gốc đi
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={isError}
            aria-describedby={descriptionId}
            {...rest}
          />
          
          {/* Track giả lập */}
          <div 
            className={trackClasses} 
            onClick={() => !disabled && document.getElementById(inputId)?.click()}
          >
            {/* Thumb giả lập */}
            <span className={thumbClasses} aria-hidden="true" />
          </div>
        </div>

        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
      </div>

      {(isError || helpText) && (
        <div className={cn(labelPlacement === "left" ? "text-right pr-2" : "ml-13")}> 
          {isError && typeof error === "string" && (
            <p className="mt-1 text-xs text-red-600 font-medium" id={errorId}>
              {error}
            </p>
          )}

          {!isError && helpText && (
            <p className="mt-1 text-xs text-slate-500" id={helpId}>
              {helpText}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

Switch.displayName = "Switch"

export default Switch