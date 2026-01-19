import { forwardRef, InputHTMLAttributes, ReactNode, Ref, TextareaHTMLAttributes, useId } from "react"
import { cn } from "../utils"

type Size = "sm" | "md" | "lg" | "xl"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"
type LabelPlacement = "top" | "left"

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  labelPlacement?: LabelPlacement

  error?: string | boolean
  helpText?: string

  iconStart?: ReactNode
  iconEnd?: ReactNode

  size?: Size
  shadow?: Shadow
  fullWidth?: boolean

  multiline?: boolean
  rows?: number

  containerClassName?: string
}

const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>((props, ref) => {
  const {
    label,
    labelPlacement = "top",

    error,
    helpText,

    iconStart,
    iconEnd,

    size = "md",
    shadow = "none",
    fullWidth = false,

    multiline = false,
    rows = 3,

    containerClassName,
    className,
    id,
    disabled,
    ...rest
  } = props

  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`
  const helpId = `${inputId}-help`

  const isError = !!error

  const containerClasses = cn(
    "flex",
    labelPlacement === "top" ? "flex-col gap-1.5" : "flex-row gap-4",
    fullWidth ? "w-full" : "w-auto",
    containerClassName
  )

  const labelClasses = cn(
    "block text-sm font-medium leading-6 text-slate-900",
    isError && "text-red-600",
    disabled && "opacity-50 cursor-not-allowed",
    labelPlacement === "left" && "min-w-[120px] pt-2"
  )

  const contentWrapperClasses = cn("flex flex-col", fullWidth ? "w-full" : "flex-1")

  const inputWrapperClasses = cn("relative rounded-md shadow-sm w-full")

  const sizeClasses: Record<Size, string> = {
    sm: "h-9 py-1 text-sm",
    md: "h-10 py-2 text-sm",
    lg: "h-11 py-2 text-base",
    xl: "h-12 py-3 text-lg"
  }

  const shadowClasses: Record<Shadow, string> = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
    xl: "shadow-xl"
  }

  const inputBaseClasses = cn(
    "block w-full rounded-md border-0 ring-1 ring-inset transition-colors",
    "focus:ring-2 focus:ring-inset outline-none",
    "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:ring-slate-200",
    "bg-white text-slate-900 placeholder:text-slate-400",
    shadowClasses[shadow],
    className
  )

  const stateClasses = isError
    ? "ring-red-300 focus:ring-red-500 text-red-900 placeholder:text-red-300"
    : "ring-slate-300 focus:ring-indigo-600 hover:ring-slate-400"

  const paddingLeftClass = iconStart ? "pl-10" : "pl-3"
  const paddingRightClass = iconEnd ? "pr-10" : "pr-3"

  const inputClasses = cn(
    inputBaseClasses,
    stateClasses,
    multiline ? "py-2" : sizeClasses[size],
    paddingLeftClass,
    paddingRightClass
  )

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}

      <div className={contentWrapperClasses}>
        <div className={inputWrapperClasses}>
          {iconStart && (
            <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-slate-500 z-10">
              {iconStart}
            </div>
          )}

          {multiline ? (
            <textarea
              id={inputId}
              ref={ref as Ref<HTMLTextAreaElement>}
              rows={rows}
              className={inputClasses}
              disabled={disabled}
              aria-invalid={isError}
              aria-describedby={isError ? errorId : helpText ? helpId : undefined}
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              id={inputId}
              ref={ref as Ref<HTMLInputElement>}
              className={inputClasses}
              disabled={disabled}
              aria-invalid={isError}
              aria-describedby={isError ? errorId : helpText ? helpId : undefined}
              {...rest}
            />
          )}

          {iconEnd && (
            <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-slate-500 z-10">
              {iconEnd}
            </div>
          )}
        </div>

        {(isError || helpText) && (
          <div className="mt-1">
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
    </div>
  )
})

TextInput.displayName = "TextInput"

export default TextInput
