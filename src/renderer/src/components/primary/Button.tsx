import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from "react"
import { cn, DefaultSpinner } from "./utils"

type Variant = "primary" | "secondary" | "tertiary" | "danger" | "ghost"
type Size = "xs" | "sm" | "md" | "lg" | "xl"
type Shape = "rounded" | "square" | "pill"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"
type PressAnimationStyle = "none" | "scale"
type PressAnimationDuration = "short" | "medium" | "long"
type PressAnimationStrength = "light" | "medium" | "strong"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  as?: React.ElementType
  href?: string
  target?: string

  variant?: Variant
  size?: Size
  shape?: Shape
  shadow?: Shadow

  fullWidth?: boolean
  preserveWidthOnLoading?: boolean

  iconOnly?: boolean
  iconStart?: ReactNode
  iconEnd?: ReactNode

  loading?: boolean
  loadingText?: string
  loadingComponent?: ReactNode

  pressAnimationStyle?: PressAnimationStyle
  pressAnimationDuration?: PressAnimationDuration
  pressAnimationStrength?: PressAnimationStrength
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    as: Component = "button",
    href,
    target,

    variant = "primary",
    size = "md",
    shape = "rounded",
    shadow = "none",

    fullWidth = false,
    preserveWidthOnLoading = true,

    iconOnly = false,
    iconStart,
    iconEnd,

    loading = false,
    loadingText,
    loadingComponent,

    pressAnimationStyle = "scale",
    pressAnimationDuration = "medium",
    pressAnimationStrength = "medium",

    className,
    disabled,
    type = "button",
    onClick,
    ...rest
  } = props
  const isDisabled = disabled || loading

  const showIconStart = !!iconStart && !(loading && !loadingText)
  const showIconEnd = !!iconEnd && !(loading && !loadingText)

  const effectiveHref = isDisabled ? undefined : href

  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none ring-offset-white dark:ring-offset-slate-950"

  const variantClasses: Record<Variant, string> = {
    primary:
      "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 focus-visible:ring-slate-900",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80 focus-visible:ring-slate-500",
    tertiary:
      "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 focus-visible:ring-slate-500", // Outline style
    danger: "bg-red-500 text-slate-50 hover:bg-red-500/90 focus-visible:ring-red-500",
    ghost:
      "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 text-slate-700 dark:text-slate-300 focus-visible:ring-slate-500"
  }

  const sizeClasses: Record<Size, string> = {
    xs: `h-8 text-xs ${iconOnly ? "w-8 p-0" : "px-3"}`,
    sm: `h-9 text-sm ${iconOnly ? "w-9 p-0" : "px-4"}`,
    md: `h-10 text-sm ${iconOnly ? "w-10 p-0" : "px-5"}`,
    lg: `h-11 text-base ${iconOnly ? "w-11 p-0" : "px-8"}`,
    xl: `h-12 text-lg ${iconOnly ? "w-12 p-0" : "px-10"}`
  }

  const shapeClasses: Record<Shape, string> = {
    rounded: "rounded-md",
    square: "rounded-none",
    pill: "rounded-full"
  }

  const shadowClasses: Record<Shadow, string> = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
    xl: "shadow-xl"
  }

  const durationClasses: Record<PressAnimationDuration, string> = {
    short: "duration-75",
    medium: "duration-150",
    long: "duration-300"
  }

  let animationClass = ""
  if (pressAnimationStyle === "scale" && !isDisabled) {
    const strengthMap: Record<PressAnimationStrength, string> = {
      light: "active:scale-[0.98]",
      medium: "active:scale-[0.96]",
      strong: "active:scale-[0.90]"
    }
    animationClass = strengthMap[pressAnimationStrength]
  }

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    shadowClasses[shadow],
    durationClasses[pressAnimationDuration],
    animationClass,
    fullWidth ? "w-full" : "",
    className
  )

  const renderContent = () => {
    // CASE 1: Loading without loadingText
    if (loading && !loadingText) {
      return (
        <>
          {/* Spinner tuyệt đối ở giữa */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {loadingComponent || DefaultSpinner}
          </span>

          {/* Nội dung gốc bị ẩn đi (opacity-0) để giữ kích thước nút không đổi */}
          <span className={cn("flex items-center gap-2 opacity-0", preserveWidthOnLoading ? "invisible" : "hidden")}>
            {iconStart}
            {children}
            {iconEnd}
          </span>
        </>
      )
    }

    // CASE 2: Loading with loadingText
    if (loading && loadingText) {
      return (
        <span className="flex items-center gap-2">
          {loadingComponent || DefaultSpinner}
          {loadingText}
        </span>
      )
    }

    // CASE 3: Not loading
    return (
      <span className="flex items-center gap-2">
        {showIconStart && iconStart}
        {children}
        {showIconEnd && iconEnd}
      </span>
    )
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  return (
    <Component
      ref={ref as any}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onClick={handleClick}
      type={Component === "button" ? type : undefined}
      href={effectiveHref}
      target={target}
      {...rest}
    >
      {renderContent()}
    </Component>
  )
})

Button.displayName = "Button"

export default memo(Button)
