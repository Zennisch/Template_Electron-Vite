import { forwardRef, ReactNode, useEffect, useId, useImperativeHandle, useRef, useState } from "react"
import { CheckIcon, ChevronDownIcon, cn } from "./utils"

type Size = "sm" | "md" | "lg" | "xl"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"
type LabelPlacement = "top" | "left"

export interface OptionItem {
  label: string
  value: string | number
  disabled?: boolean
  icon?: ReactNode
}

export interface SelectProps {
  label?: string
  labelPlacement?: LabelPlacement

  value?: string | number
  defaultValue?: string | number
  options?: OptionItem[]
  placeholder?: string

  error?: string | boolean
  helpText?: string

  iconStart?: ReactNode

  size?: Size
  shadow?: Shadow
  fullWidth?: boolean

  onChange?: (value: string | number) => void

  containerClassName?: string
  className?: string
  disabled?: boolean
  id?: string
}

const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    label,
    labelPlacement = "top",
    options = [],
    placeholder = "Select an option",
    value,
    defaultValue,
    error,
    helpText,
    iconStart,
    size = "md",
    shadow = "none",
    fullWidth = false,
    onChange,
    containerClassName,
    className,
    id,
    disabled
  } = props

  const generatedId = useId()
  const selectId = id || generatedId
  const errorId = `${selectId}-error`
  const helpId = `${selectId}-help`

  const [isOpen, setIsOpen] = useState(false)

  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const containerRef = useRef<HTMLDivElement>(null)

  const isError = !!error

  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string | number) => {
    if (!isControlled) {
      setInternalValue(optionValue)
    }
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find((opt) => opt.value === currentValue)

  const containerClasses = cn(
    "relative flex",
    labelPlacement === "top" ? "flex-col gap-1.5" : "flex-row items-baseline gap-4",
    fullWidth ? "w-full" : "w-auto",
    containerClassName
  )

  const labelClasses = cn(
    "block text-sm font-medium leading-6",
    isError ? "text-red-600" : "text-slate-900",
    disabled && "opacity-50 cursor-not-allowed",
    labelPlacement === "left" && "min-w-[120px]"
  )

  const wrapperClasses = cn("relative", fullWidth ? "w-full" : "w-64", labelPlacement === "left" && "flex-1")

  const sizeClasses: Record<Size, string> = {
    sm: "h-9 py-1 text-sm pl-3 pr-8",
    md: "h-10 py-2 text-sm pl-3 pr-10",
    lg: "h-11 py-2 text-base pl-3 pr-10",
    xl: "h-12 py-3 text-lg pl-3 pr-12"
  }

  const shadowClasses: Record<Shadow, string> = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
    xl: "shadow-xl"
  }

  const paddingLeftClass = iconStart ? "pl-10" : ""

  const triggerClasses = cn(
    "relative w-full cursor-default rounded-md border text-left transition-all",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    "bg-white",
    disabled ? "cursor-not-allowed bg-slate-50 text-slate-500 ring-slate-200 border-slate-200" : "cursor-pointer",
    isError
      ? "border-red-300 ring-red-300 focus:ring-red-500 text-red-900"
      : "border-slate-300 ring-slate-300 focus:ring-indigo-600 hover:border-slate-400",
    isOpen && !isError && "ring-2 ring-indigo-600 border-indigo-600",

    sizeClasses[size],
    shadowClasses[shadow],
    paddingLeftClass,
    className
  )

  return (
    <div className={containerClasses} ref={containerRef}>
      {label && (
        <label className={labelClasses} onClick={() => !disabled && setIsOpen(!isOpen)}>
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        <button
          type="button"
          id={selectId}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? undefined : selectId}
          disabled={disabled}
          className={triggerClasses}
          onClick={() => setIsOpen(!isOpen)}
        >
          {iconStart && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
              {iconStart}
            </span>
          )}

          <span className={cn("block truncate", !selectedOption && "text-slate-400")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon
              className={cn("h-5 w-5 text-slate-400 transition-transform duration-200", isOpen && "transform rotate-180")}
            />
          </span>
        </button>

        <ul
          className={cn(
            "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
            "transition-all duration-200 ease-in-out origin-top",
            !disabled && isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none invisible"
          )}
          role="listbox"
          tabIndex={-1}
          aria-hidden={!isOpen}
        >
          {options.length === 0 ? (
            <div className="py-2 px-3 text-slate-500 text-sm">No options</div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === currentValue
              return (
                <li
                  key={option.value}
                  className={cn(
                    "relative cursor-default select-none py-2.5 pl-3 pr-9 transition-colors",
                    option.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-indigo-50 hover:text-indigo-900",
                    isSelected ? "bg-indigo-50 text-indigo-900 font-medium" : "text-slate-900"
                  )}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                >
                  <div className="flex items-center gap-2">
                    {option.icon && <span className="text-slate-400">{option.icon}</span>}
                    <span className="block truncate">{option.label}</span>
                  </div>

                  {isSelected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                  )}
                </li>
              )
            })
          )}
        </ul>
      </div>

      {(isError || helpText) && (
        <div className={cn(labelPlacement === "left" && "ml-34")}>
          {isError && typeof error === "string" && (
            <p className="mt-1 text-sm text-red-600" id={errorId}>
              {error}
            </p>
          )}

          {!isError && helpText && (
            <p className="mt-1 text-sm text-slate-500" id={helpId}>
              {helpText}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

Select.displayName = "Select"

export default Select
