import { forwardRef, InputHTMLAttributes, ReactNode, useEffect, useId, useRef } from "react"
import { cn, DefaultCheckIcon, DefaultIndeterminateIcon } from "./utils"

type LabelPlacement = "left" | "right"
type Size = "sm" | "md" | "lg"

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: ReactNode
  labelPlacement?: LabelPlacement

  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean

  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void

  error?: boolean | string
  size?: Size

  containerClassName?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    label,
    labelPlacement = "right",
    checked,
    defaultChecked,
    indeterminate = false,
    onChange,
    error,
    size = "md",
    disabled,
    className,
    containerClassName,
    id,
    ...rest
  } = props

  const innerRef = useRef<HTMLInputElement>(null)
  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  useEffect(() => {
    if (!ref) return
    if (typeof ref === "function") {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
  }, [ref])

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

  const checkboxSizeClasses: Record<Size, string> = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }

  const iconSizeClasses: Record<Size, string> = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4"
  }

  const inputClasses = cn(
    "peer appearance-none shrink-0 rounded border bg-white transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100",
    "checked:bg-indigo-600 checked:border-indigo-600",
    // Indeterminate state styling needs to mimic checked state manually via class logic
    // or relying on the fact that indeterminate usually overrides checked visually
    indeterminate && "bg-indigo-600 border-indigo-600",

    isError
      ? "border-red-300 ring-offset-red-50 focus-visible:ring-red-500 checked:bg-red-600 checked:border-red-600"
      : "border-slate-300 ring-offset-white focus-visible:ring-indigo-600",

    checkboxSizeClasses[size],
    className
  )

  return (
    <div className="flex flex-col">
      <div className={containerClasses}>
        <div className="relative flex items-center justify-center">
          <input
            ref={innerRef}
            type="checkbox"
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

          <span className="absolute pointer-events-none text-white opacity-0 peer-checked:opacity-100 transition-opacity">
            {!indeterminate && <DefaultCheckIcon className={iconSizeClasses[size]} />}
          </span>

          {indeterminate && (
            <span className="absolute pointer-events-none text-white">
              <DefaultIndeterminateIcon className={iconSizeClasses[size]} />
            </span>
          )}
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

Checkbox.displayName = "Checkbox"

export default Checkbox
