import { AnimatedCheckIcon, cn } from "./utils"
import { ZSelectItem } from "./ZSelect"

export interface ZSelectOptionProps<T extends string | number> {
  option: ZSelectItem<T>
  isSelected: boolean
  isFocused: boolean
  multiple: boolean
  onSelect: (value: T) => void
}

const OPTION_LAYOUT = {
  container: "py-2.5 pl-3 pr-9",
  checkIconPadding: "pr-3",
  contentGap: "gap-2",
  icons: {
    checkboxBox: "h-4 w-4",
    checkboxCheck: "h-3 w-3",
    singleCheck: "h-5 w-5"
  }
}

export const ZSelectOption = <T extends string | number>({
  option,
  isSelected,
  isFocused,
  multiple,
  onSelect
}: ZSelectOptionProps<T>) => {
  return (
    <li
      className={cn(
        "relative cursor-default select-none transition-colors",
        OPTION_LAYOUT.container,
        option.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-indigo-100 hover:text-indigo-900",
        isSelected && !multiple ? "bg-indigo-50 text-indigo-900 font-medium" : "text-slate-900",
        isSelected && multiple ? "bg-indigo-50/50" : "",
        isFocused && !option.disabled ? "bg-indigo-100 text-indigo-900" : ""
      )}
      role="option"
      aria-selected={isSelected}
      onClick={(e) => {
        e.stopPropagation()
        !option.disabled && onSelect(option.value)
      }}
    >
      <div className={cn("flex items-center", OPTION_LAYOUT.contentGap)}>
        {multiple && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded border transition-colors",
              OPTION_LAYOUT.icons.checkboxBox,
              isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white"
            )}
          >
            {isSelected && <AnimatedCheckIcon className={OPTION_LAYOUT.icons.checkboxCheck} />}
          </div>
        )}

        {option.icon && <span className="text-slate-400">{option.icon}</span>}
        <span className="block truncate">{option.label}</span>
      </div>

      {isSelected && !multiple && (
        <span className={cn("absolute inset-y-0 right-0 flex items-center text-indigo-600", OPTION_LAYOUT.checkIconPadding)}>
          <AnimatedCheckIcon className={OPTION_LAYOUT.icons.singleCheck} />
        </span>
      )}
    </li>
  )
}
