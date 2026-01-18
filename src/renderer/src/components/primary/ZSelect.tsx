import { AnimatePresence, motion, Variants } from "framer-motion"
import { forwardRef, HTMLAttributes, ReactNode, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react"
import { CheckIcon, ChevronDownIcon, cn, LoadingSpinner, SearchIcon, XMarkIcon } from "./utils"

type Size = "sm" | "md" | "lg" | "xl"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"
type LabelPlacement = "top" | "left"

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.15, ease: "easeIn" }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  }
}

const sizeClasses: Record<Size, string> = {
  sm: "min-h-9 py-1 text-sm pl-3 pr-8",
  md: "min-h-10 py-2 text-sm pl-3 pr-10",
  lg: "min-h-11 py-2 text-base pl-3 pr-10",
  xl: "min-h-12 py-3 text-lg pl-3 pr-12"
}

const shadowClasses: Record<Shadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg",
  xl: "shadow-xl"
}

export interface OptionItem<T extends string | number> {
  label: string
  value: T
  disabled?: boolean
  icon?: ReactNode
}

export interface SelectProps<T extends string | number> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue" | "value"
> {
  label?: string
  labelPlacement?: LabelPlacement

  options?: OptionItem<T>[]
  value?: T | T[]
  defaultValue?: T | T[]
  placeholder?: string

  error?: string | boolean
  helpText?: string

  iconStart?: ReactNode

  size?: Size
  shadow?: Shadow
  fullWidth?: boolean

  searchable?: boolean
  multiple?: boolean
  isLoading?: boolean

  containerClassName?: string
  disabled?: boolean

  onChange?: (value: T | T[]) => void
  onSearchChange?: (query: string) => void
}

const ZSelectInner = <T extends string | number>(props: SelectProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {
    label,
    labelPlacement = "top",

    options = [],
    value,
    defaultValue,
    placeholder = "Select an option",

    error,
    helpText,

    iconStart,

    size = "md",
    shadow = "none",
    fullWidth = false,

    searchable = false,
    multiple = false,
    isLoading = false,

    className,
    containerClassName,
    id,
    disabled,

    onChange,
    onSearchChange,
    ...rest
  } = props

  const generatedId = useId()
  const selectId = id || generatedId
  const errorId = `${selectId}-error`
  const helpId = `${selectId}-help`

  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const [internalValue, setInternalValue] = useState<T | T[] | undefined>(
    defaultValue !== undefined ? defaultValue : multiple ? [] : undefined
  )
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const isError = !!error

  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
        setFocusedIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || focusedIndex < 0 || !listRef.current) return
    const list = listRef.current
    const optionsItems = list.querySelectorAll('li[role="option"]')
    const activeItem = optionsItems[focusedIndex] as HTMLElement
    if (activeItem) {
      if (focusedIndex === 0) {
        list.scrollTop = 0
      } else {
        activeItem.scrollIntoView({ block: "nearest" })
      }
    }
  }, [focusedIndex, isOpen])

  useEffect(() => {
    if (isOpen && searchable) {
      const frameId = requestAnimationFrame(() => {
        searchInputRef.current?.focus()
      })
      return () => cancelAnimationFrame(frameId)
    }
    return
  }, [isOpen, searchable])

  const handleSelect = (optionValue: T) => {
    if (multiple) {
      let newValue: T[] = []
      const currentArray = (Array.isArray(currentValue) ? currentValue : []) as T[]

      if (currentArray.includes(optionValue)) {
        newValue = currentArray.filter((v) => v !== optionValue)
      } else {
        newValue = [...currentArray, optionValue]
      }

      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)

      if (searchable) {
        searchInputRef.current?.focus()
      }
    } else {
      if (!isControlled) {
        setInternalValue(optionValue)
      }
      onChange?.(optionValue)
      setIsOpen(false)
      setSearchQuery("")
    }
  }

  const removeValue = (valToRemove: T, e: React.MouseEvent) => {
    e.stopPropagation()
    if (multiple && Array.isArray(currentValue)) {
      const currentArray = currentValue as T[]
      const newValue = currentArray.filter((v) => v !== valToRemove)
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }
  }

  const filteredOptions = useMemo(() => {
    if (onSearchChange) return options
    return options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [options, searchQuery, onSearchChange])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        if (filteredOptions.length > 0) {
          setFocusedIndex((prev) => (prev + 1) % filteredOptions.length)
        }
        break
      case "ArrowUp":
        e.preventDefault()
        if (filteredOptions.length > 0) {
          setFocusedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length)
        }
        break
      case "Enter":
        e.preventDefault()
        if (filteredOptions.length > 0 && focusedIndex >= 0 && !filteredOptions[focusedIndex].disabled) {
          handleSelect(filteredOptions[focusedIndex].value)
        }
        break
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        break
      case "Tab":
        setIsOpen(false)
        break
    }
  }

  const getLabel = (val: T) => {
    return options.find((o) => o.value === val)?.label || val
  }

  const isSelected = (val: T) => {
    if (multiple) {
      return Array.isArray(currentValue) && (currentValue as T[]).includes(val)
    }
    return currentValue === val
  }

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
    iconStart && !multiple ? "pl-10" : "",
    multiple ? "h-auto flex flex-wrap gap-1.5 items-center" : "",
    className
  )

  const renderTriggerContent = () => {
    if (multiple && Array.isArray(currentValue) && currentValue.length > 0) {
      return (
        <div className="flex flex-wrap gap-1.5 -ml-1">
          {(currentValue as T[]).map((val) => (
            <span
              key={val}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-medium border border-indigo-200"
            >
              {getLabel(val)}
              <button
                type="button"
                onClick={(e) => removeValue(val, e)}
                disabled={disabled}
                className="hover:text-indigo-900 focus:outline-none"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )
    }

    const selected = options.find((opt) => opt.value === currentValue)

    if (multiple && (!currentValue || (Array.isArray(currentValue) && currentValue.length === 0))) {
      return <span className="text-slate-400">{placeholder}</span>
    }

    if (!multiple) {
      return (
        <span className={cn("block truncate", !selected && "text-slate-400")}>{selected ? selected.label : placeholder}</span>
      )
    }

    return null
  }

  return (
    <div className={containerClasses} ref={containerRef} {...rest}>
      {label && (
        <label className={labelClasses} onClick={() => !disabled && setIsOpen(!isOpen)}>
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        <div
          id={selectId}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? undefined : selectId}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          className={triggerClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
        >
          {iconStart && !multiple && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
              {iconStart}
            </span>
          )}

          {renderTriggerContent()}

          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon
              className={cn("h-5 w-5 text-slate-400 transition-transform duration-200", isOpen && "transform rotate-180")}
            />
          </span>
        </div>

        <AnimatePresence>
          {!disabled && isOpen && (
            <motion.ul
              ref={listRef}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className={cn(
                "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm origin-top"
              )}
              role="listbox"
              tabIndex={-1}
            >
              {searchable && (
                <li className="sticky top-0 z-10 bg-white border-b border-slate-100 p-2">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
                      <SearchIcon className="h-4 w-4" />
                    </span>
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="w-full rounded border border-slate-300 py-1.5 pl-8 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900"
                      placeholder="Search..."
                      value={searchQuery}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        onSearchChange?.(e.target.value)
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </li>
              )}

              {isLoading ? (
                <div className="py-2 px-3 text-slate-500 text-sm text-center flex justify-center items-center gap-2">
                  <LoadingSpinner className="animate-spin h-4 w-4" />
                  <span>Loading...</span>
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="py-2 px-3 text-slate-500 text-sm text-center">No options found</div>
              ) : (
                filteredOptions.map((option, index) => {
                  const checked = isSelected(option.value)
                  const isFocused = index === focusedIndex

                  return (
                    <li
                      key={option.value}
                      className={cn(
                        "relative cursor-default select-none py-2.5 pl-3 pr-9 transition-colors",
                        option.disabled
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:bg-indigo-100 hover:text-indigo-900",
                        checked && !multiple ? "bg-indigo-50 text-indigo-900 font-medium" : "text-slate-900",
                        checked && multiple ? "bg-indigo-50/50" : "",
                        isFocused && !option.disabled ? "bg-indigo-100 text-indigo-900" : ""
                      )}
                      role="option"
                      aria-selected={checked}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                    >
                      <div className="flex items-center gap-2">
                        {multiple && (
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                              checked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white"
                            )}
                          >
                            {checked && <CheckIcon className="h-3 w-3" />}
                          </div>
                        )}

                        {option.icon && <span className="text-slate-400">{option.icon}</span>}
                        <span className="block truncate">{option.label}</span>
                      </div>

                      {checked && !multiple && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      )}
                    </li>
                  )
                })
              )}
            </motion.ul>
          )}
        </AnimatePresence>
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
}

const ZSelect = forwardRef(ZSelectInner) as <T extends string | number>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ZSelectInner>

;(ZSelect as any).displayName = "Select"

export default ZSelect
