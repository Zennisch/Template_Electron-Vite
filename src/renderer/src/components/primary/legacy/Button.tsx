import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { cn, DefaultSpinnerIcon } from "../utils"

type Variant = "primary" | "secondary" | "tertiary" | "danger" | "ghost"
type Size = "xs" | "sm" | "md" | "lg" | "xl"
type Shape = "rounded" | "square" | "pill"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"
type PressAnimationStyle = "none" | "scale"
type PressAnimationDuration = "short" | "medium" | "long"
type PressAnimationStrength = "light" | "medium" | "strong"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  as?: ElementType
  href?: string
  target?: string

  variant?: Variant
  size?: Size
  shape?: Shape
  shadow?: Shadow

  fullWidth?: boolean

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
  const effectiveHref = isDisabled ? undefined : href

  const baseClasses =
    "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 select-none ring-offset-white"

  const variantClasses: Record<Variant, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-600",
    secondary: "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 focus-visible:ring-indigo-600",
    tertiary: "bg-indigo-100 text-indigo-900 hover:bg-indigo-200 focus-visible:ring-indigo-600",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
    ghost: "bg-transparent text-indigo-700 hover:bg-indigo-50 focus-visible:ring-indigo-600"
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

  const strengthMap: Record<PressAnimationStrength, string> = {
    light: "active:scale-[0.98]",
    medium: "active:scale-[0.96]",
    strong: "active:scale-[0.90]"
  }

  const animationClass = pressAnimationStyle === "scale" && !isDisabled ? strengthMap[pressAnimationStrength] : ""

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
    const Spinner = loadingComponent || DefaultSpinnerIcon

    if (loading && loadingText) {
      return (
        <span className="flex items-center gap-2">
          {Spinner}
          {loadingText}
        </span>
      )
    }

    return (
      <span className="flex items-center gap-2">
        {loading ? Spinner : iconStart}
        {children}
        {iconEnd}
      </span>
    )
  }

  return (
    <Component
      ref={ref as any}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onClick={isDisabled ? (e: any) => e.preventDefault() : onClick}
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

export default Button
