import { AnimatePresence, motion } from "framer-motion"
import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useId, useState } from "react"
import { cn } from "./utils"

type Size = "sm" | "md" | "lg"
type LabelPlacement = "left" | "right"

export interface ZRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: ReactNode
  labelPlacement?: LabelPlacement

  error?: boolean | string
  helpText?: string

  size?: Size

  containerClassName?: string

  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void
}

const sizeConfig: Record<Size, { radio: string; dot: string; label: string }> = {
  sm: { radio: "h-4 w-4", dot: "h-2 w-2", label: "text-sm ml-2" },
  md: { radio: "h-5 w-5", dot: "h-2.5 w-2.5", label: "text-base ml-2.5" },
  lg: { radio: "h-6 w-6", dot: "h-3 w-3", label: "text-lg ml-3" }
}

const sizeConfigLeft: Record<Size, { label: string }> = {
  sm: { label: "text-sm mr-2" },
  md: { label: "text-base mr-2.5" },
  lg: { label: "text-lg mr-3" }
}

const ZRadio = forwardRef<HTMLInputElement, ZRadioProps>((props, ref) => {
  const {
    label,
    labelPlacement = "right",

    checked,
    defaultChecked,

    error,
    helpText,
    size = "md",

    disabled,
    className,
    containerClassName,
    id,
    value,

    onChange,
    onBlur,
    onFocus,
    ...rest
  } = props

  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
  const isChecked = checked !== undefined ? checked : internalChecked

  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`
  const helpId = `${inputId}-help`

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined) {
      setInternalChecked(e.target.checked)
    }
    onChange?.(e.target.checked, e)
  }

  const isError = !!error
  const config = sizeConfig[size]
  const labelClass = labelPlacement === "left" ? sizeConfigLeft[size].label : config.label

  const containerClasses = cn(
    "flex",
    labelPlacement === "left" ? "flex-row-reverse justify-end" : "flex-row",
    "items-center",
    containerClassName
  )

  const inputClasses = cn(
    "peer appearance-none shrink-0 rounded-full border transition-all cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100",
    "bg-white border-slate-300",

    isError ? "checked:bg-red-600 checked:border-red-600" : "checked:bg-indigo-600 checked:border-indigo-600",

    isError
      ? "border-red-300 ring-offset-red-50 focus-visible:ring-red-500"
      : "ring-offset-white focus-visible:ring-indigo-600",

    config.radio,
    className
  )

  const labelClasses = cn(
    "select-none cursor-pointer font-medium text-slate-700",
    disabled && "opacity-50 cursor-not-allowed",
    isError && "text-red-600",
    labelClass
  )

  // Determine controlled vs uncontrolled for passing props
  // React allows passing 'checked' if it's controlled, or 'defaultChecked' if not.
  // Passing 'undefined' for checked is safe if input is uncontrolled.
  const inputProps = checked !== undefined ? { checked } : { defaultChecked }

  return (
    <div className="flex flex-col w-max">
      <div className={containerClasses}>
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            disabled={disabled}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            className={inputClasses}
            aria-invalid={isError}
            aria-describedby={error ? errorId : helpText ? helpId : undefined}
            {...inputProps}
            {...rest}
          />

          <motion.div
            initial={false}
            animate={{
              scale: isChecked ? 1 : 0,
              opacity: isChecked ? 1 : 0
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
            className={cn("absolute inset-0 m-auto bg-white rounded-full pointer-events-none", config.dot)}
          />
        </div>

        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
      </div>

      <AnimatePresence>
        {(isError || helpText) && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            className={cn("overflow-hidden", labelPlacement === "left" ? "mr-1 text-right" : "ml-0.5")}
          >
            <div className={cn(labelPlacement === "right" ? (size === "sm" ? "ml-6" : size === "md" ? "ml-7" : "ml-9") : "")}>
              {isError && (
                <p className="text-red-600 text-xs font-medium mt-1" id={errorId}>
                  {typeof error === "string" ? error : "Selection required"}
                </p>
              )}
              {!isError && helpText && (
                <p className="text-slate-500 text-xs mt-1" id={helpId}>
                  {helpText}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

ZRadio.displayName = "ZRadio"

export default ZRadio
