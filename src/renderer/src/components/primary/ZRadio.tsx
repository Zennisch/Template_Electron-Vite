import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useId, useState } from "react"
import { cn } from "./utils"
import { ZHelperText } from "./ZHelperText"
import { motion } from "framer-motion"

type Size = "sm" | "md" | "lg"
type LabelPlacement = "left" | "right"

interface RadioSizeConfig {
  radio: string
  dot: string
  label: string
  gap: string
}

const SIZES: Record<Size, RadioSizeConfig> = {
  sm: {
    radio: "h-4 w-4",
    dot: "h-2 w-2",
    label: "text-sm",
    gap: "gap-0.5"
  },
  md: {
    radio: "h-5 w-5",
    dot: "h-2.5 w-2.5",
    label: "text-base",
    gap: "gap-1"
  },
  lg: {
    radio: "h-6 w-6",
    dot: "h-3 w-3",
    label: "text-lg",
    gap: "gap-1.5"
  }
}

const VARIANTS = {
  primary: {
    checked: "checked:bg-indigo-600 checked:border-indigo-600",
    focus: "ring-offset-white focus-visible:ring-indigo-600"
  },
  error: {
    checked: "checked:bg-red-600 checked:border-red-600",
    focus: "border-red-300 ring-offset-red-50 focus-visible:ring-red-500"
  }
}

interface ZRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: ReactNode
  labelPlacement?: LabelPlacement

  error?: boolean | string
  helpText?: string

  size?: Size

  containerClassName?: string

  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void
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
  const { radio: radioCls, dot: dotCls, label: labelCls, gap: gapCls } = SIZES[size]
  const { primary: primaryVar, error: errorVar } = VARIANTS

  const containerClasses = cn(
    "flex items-center",
    labelPlacement === "left" ? "flex-row-reverse justify-end" : "flex-row",
    gapCls,
    containerClassName
  )

  const errorClasses = isError ? cn(errorVar.checked, errorVar.focus) : cn(primaryVar.checked, primaryVar.focus)

  const inputClasses = cn(
    "peer appearance-none shrink-0 rounded-full border transition-all cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100",
    "bg-white border-slate-300",
    errorClasses,
    radioCls,
    className
  )

  const labelClasses = cn(
    "select-none cursor-pointer font-medium text-slate-700",
    disabled && "opacity-50 cursor-not-allowed",
    isError && "text-red-600",
    labelCls
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
            className={cn("absolute inset-0 m-auto bg-white rounded-full pointer-events-none", dotCls)}
          />
        </div>

        {label && (
          <label htmlFor={inputId} className={labelClasses}>
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
        defaultErrorMessage="Selection required"
        className={labelPlacement === "left" ? "text-right" : ""}
      />
    </div>
  )
})

ZRadio.displayName = "ZRadio"

export default ZRadio
