import { KeyboardEvent, RefObject, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { SearchIcon, LoadingSpinner, cn } from "./utils"
import { ZSelectOption } from "./ZSelectOption"
import { ZSelectItem } from "./ZSelect"

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

interface ZSelectListProps<T extends string | number> {
  isOpen: boolean
  disabled?: boolean
  coords: { left: number; top: number; width: number }

  searchable: boolean
  searchQuery: string
  onSearchChange?: (query: string) => void
  onKeyDown: (e: KeyboardEvent) => void

  isLoading: boolean
  options: ZSelectItem<T>[]
  focusedIndex: number
  multiple: boolean
  selectedValues: T[]
  listRef: RefObject<HTMLUListElement | null>

  onSelect: (value: T) => void
}

export const ZSelectList = <T extends string | number>({
  isOpen,
  disabled,
  coords,
  searchable,
  searchQuery,
  onSearchChange,
  onKeyDown,
  isLoading,
  options,
  focusedIndex,
  multiple,
  selectedValues,
  listRef,
  onSelect
}: ZSelectListProps<T>) => {
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && searchable) {
      const frameId = requestAnimationFrame(() => {
        searchInputRef.current?.focus()
      })
      return () => cancelAnimationFrame(frameId)
    }
    return
  }, [isOpen, searchable])

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

  const isSelected = (val: T) => selectedValues.includes(val)

  return createPortal(
    <AnimatePresence>
      {!disabled && isOpen && (
        <motion.ul
          ref={listRef}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropdownVariants}
          style={{
            position: "fixed",
            left: coords.left,
            top: coords.top,
            width: coords.width,
            zIndex: 9999
          }}
          className={cn(
            "max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm origin-top"
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
                  onKeyDown={onKeyDown}
                  onChange={(e) => onSearchChange?.(e.target.value)}
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
          ) : options.length === 0 ? (
            <div className="py-2 px-3 text-slate-500 text-sm text-center">No options found</div>
          ) : (
            options.map((option, index) => (
              <ZSelectOption
                key={option.value}
                option={option}
                isSelected={isSelected(option.value)}
                isFocused={index === focusedIndex}
                multiple={multiple}
                onSelect={onSelect}
              />
            ))
          )}
        </motion.ul>
      )}
    </AnimatePresence>,
    document.body
  )
}
