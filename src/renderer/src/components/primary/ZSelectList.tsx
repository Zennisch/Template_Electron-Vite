import { KeyboardEvent, RefObject, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { cn, LoadingSpinner, SearchIcon } from "./utils"
import { ZSelectOption } from "./ZSelectOption"
import { ZSelectItem } from "./ZSelect"

const LIST_ANIMATION = {
  DURATION_ENTER: 0.2,
  DURATION_EXIT: 0.15,
  SCALE_HIDDEN: 0.95,
  Y_HIDDEN: -10
}

const LIST_LAYOUT = {
  Z_INDEX: 9999,
  MAX_HEIGHT: "max-h-60",
  SEARCH_ICON_SIZE: "h-4 w-4",
  LOADING_ICON_SIZE: "h-4 w-4",
  CONTAINER_PADDING: "py-1",
  SEARCH_CONTAINER_PADDING: "p-2",
  SEARCH_ICON_PADDING_LEFT: "pl-2",
  SEARCH_INPUT_PADDING: "py-1.5 pl-8 pr-3",
  EMPTY_STATE_PADDING: "py-2 px-3",
  LOADING_GAP: "gap-2"
}

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: LIST_ANIMATION.SCALE_HIDDEN,
    y: LIST_ANIMATION.Y_HIDDEN,
    transition: { duration: LIST_ANIMATION.DURATION_EXIT, ease: "easeIn" }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: LIST_ANIMATION.DURATION_ENTER, ease: "easeOut" }
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
            zIndex: LIST_LAYOUT.Z_INDEX
          }}
          className={cn(
            "overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm origin-top",
            LIST_LAYOUT.CONTAINER_PADDING,
            LIST_LAYOUT.MAX_HEIGHT
          )}
          role="listbox"
          tabIndex={-1}
        >
          {searchable && (
            <li className={cn("sticky top-0 z-10 bg-white border-b border-slate-100", LIST_LAYOUT.SEARCH_CONTAINER_PADDING)}>
              <div className="relative">
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 flex items-center text-slate-400",
                    LIST_LAYOUT.SEARCH_ICON_PADDING_LEFT
                  )}
                >
                  <SearchIcon className={LIST_LAYOUT.SEARCH_ICON_SIZE} />
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={cn(
                    "w-full rounded border border-slate-300 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900",
                    LIST_LAYOUT.SEARCH_INPUT_PADDING
                  )}
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
            <div
              className={cn(
                "text-slate-500 text-sm text-center flex justify-center items-center",
                LIST_LAYOUT.EMPTY_STATE_PADDING,
                LIST_LAYOUT.LOADING_GAP
              )}
            >
              <LoadingSpinner className={cn("animate-spin", LIST_LAYOUT.LOADING_ICON_SIZE)} />
              <span>Loading...</span>
            </div>
          ) : options.length === 0 ? (
            <div className={cn("text-slate-500 text-sm text-center", LIST_LAYOUT.EMPTY_STATE_PADDING)}>
              No options found
            </div>
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
