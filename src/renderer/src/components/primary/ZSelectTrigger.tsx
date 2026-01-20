import { ForwardedRef, forwardRef, KeyboardEvent, MouseEvent, ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDownIcon, cn, XMarkIcon } from "./utils"

type Size = "sm" | "md" | "lg" | "xl"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"

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

export interface ZSelectTriggerProps<T extends string | number> {
  id?: string
  isOpen: boolean
  disabled?: boolean
  isError?: boolean
  size?: Size
  shadow?: Shadow
  iconStart?: ReactNode
  multiple?: boolean
  placeholder?: string
  className?: string

  selectedValues: T[]
  getLabel: (val: T) => string

  onToggle: () => void
  onRemove: (value: T, e: MouseEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

const ZSelectTriggerInner = <T extends string | number>(props: ZSelectTriggerProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    id,
    isOpen,
    disabled,
    isError,
    size = "md",
    shadow = "none",
    iconStart,
    multiple,
    placeholder,
    className,
    selectedValues,
    getLabel,
    onToggle,
    onRemove,
    onKeyDown
  } = props

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
    if (multiple) {
      return (
        <div className="flex flex-wrap gap-1.5 -ml-1 w-full">
          <AnimatePresence mode="popLayout">
            {selectedValues.map((val) => (
              <motion.span
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.1 }}
                key={val}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-medium border border-indigo-200"
              >
                {getLabel(val)}
                <button
                  type="button"
                  onClick={(e) => onRemove(val, e)}
                  disabled={disabled}
                  className="hover:text-indigo-900 focus:outline-none"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
          {selectedValues.length === 0 && <span className="text-slate-400 ml-1">{placeholder}</span>}
        </div>
      )
    }

    const hasValue = selectedValues.length > 0
    return (
      <span className={cn("block truncate", !hasValue && "text-slate-400")}>
        {hasValue ? getLabel(selectedValues[0]) : placeholder}
      </span>
    )
  }

  return (
    <div
      id={id}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      className={triggerClasses}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      ref={ref}
    >
      {iconStart && !multiple && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">{iconStart}</span>
      )}

      {renderTriggerContent()}

      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDownIcon
          className={cn("h-5 w-5 text-slate-400 transition-transform duration-200", isOpen && "transform rotate-180")}
        />
      </span>
    </div>
  )
}

export const ZSelectTrigger = forwardRef(ZSelectTriggerInner) as <T extends string | number>(
  props: ZSelectTriggerProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ZSelectTriggerInner>
