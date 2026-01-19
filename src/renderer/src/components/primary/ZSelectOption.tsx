import { CheckIcon, cn } from "./utils"
import { ZSelectItem } from "./ZSelect"

export interface ZSelectOptionProps<T extends string | number> {
  option: ZSelectItem<T>
  isSelected: boolean
  isFocused: boolean
  multiple: boolean
  onSelect: (value: T) => void
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
        "relative cursor-default select-none py-2.5 pl-3 pr-9 transition-colors",
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
      <div className="flex items-center gap-2">
        {multiple && (
          <div
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
              isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white"
            )}
          >
            {isSelected && <CheckIcon className="h-3 w-3" />}
          </div>
        )}

        {option.icon && <span className="text-slate-400">{option.icon}</span>}
        <span className="block truncate">{option.label}</span>
      </div>

      {isSelected && !multiple && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600">
          <CheckIcon className="h-5 w-5" />
        </span>
      )}
    </li>
  )
}
