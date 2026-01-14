import { forwardRef, InputHTMLAttributes, memo, ReactNode, useId } from "react"
import { cn } from "./utils"

type LabelPlacement = "left" | "right"
type Size = "sm" | "md" | "lg"

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: ReactNode
  labelPlacement?: LabelPlacement

  checked?: boolean
  defaultChecked?: boolean

  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void

  error?: boolean | string
  size?: Size

  containerClassName?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    label,
    labelPlacement = "right",
    checked,
    defaultChecked,
    onChange,
    error,
    size = "md",
    disabled,
    className,
    containerClassName,
    id,
    ...rest
  } = props

  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked, e)
  }

  const isError = !!error

  const containerClasses = cn(
    "inline-flex items-center",
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

  const radioSizeClasses: Record<Size, string> = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }

  const dotSizeClasses: Record<Size, string> = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5"
  }

  const inputClasses = cn(
    "peer appearance-none shrink-0 rounded-full border bg-white transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100",
    "checked:bg-indigo-600 checked:border-indigo-600",

    isError
      ? "border-red-300 ring-offset-red-50 focus-visible:ring-red-500 checked:bg-red-600 checked:border-red-600"
      : "border-slate-300 ring-offset-white focus-visible:ring-indigo-600",

    radioSizeClasses[size],
    className
  )

  return (
    <div className="flex flex-col">
      <div className={containerClasses}>
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            className={inputClasses}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={isError}
            aria-describedby={isError ? errorId : undefined}
            {...rest}
          />

          <span
            className={cn(
              "absolute pointer-events-none rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity transform scale-0 peer-checked:scale-100",
              dotSizeClasses[size]
            )}
          />
        </div>

        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
      </div>

      {isError && typeof error === "string" && (
        <p className={cn("mt-1 text-xs text-red-600", labelPlacement === "left" ? "text-right" : "ml-7")} id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
})

Radio.displayName = "Radio"

export default memo(Radio)
