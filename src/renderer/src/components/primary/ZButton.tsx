import { ButtonHTMLAttributes, forwardRef, ReactNode, useState, MouseEvent, useMemo } from "react"
import { cn, DefaultSpinnerIcon } from "./utils"
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion"

type Variant = "primary" | "secondary" | "tertiary" | "ghost"
type Size = "xs" | "sm" | "md" | "lg" | "xl"
type Shape = "rounded" | "square" | "pill"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"
type PressAnimationStyle = "none" | "scale" | "ripple"
type PressAnimationDuration = "short" | "medium" | "long"
type PressAnimationStrength = "light" | "medium" | "strong"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  element?: React.ElementType
  href?: string
  target?: string

  children?: React.ReactNode

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

const ZButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    element = "button",
    href,
    target,

    children,

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
    onPointerDown,
    ...rest
  } = props

  const [ripples, setRipples] = useState<{ x: number; y: number; id: number; size: number }[]>([])

  const isDisabled = disabled || loading
  const effectiveHref = isDisabled ? undefined : href

  const baseClasses = `
      relative inline-flex items-center justify-center
      whitespace-nowrap font-medium
      outline-none focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-white
      disabled:pointer-events-none disabled:opacity-70
      select-none
      transition-colors
    `

  const variantClasses: Record<Variant, string> = {
    primary: `
      bg-indigo-600 
      text-white 
      hover:bg-indigo-700 
      focus-visible:ring-indigo-600`,
    secondary: `
      bg-white
      text-indigo-700
      border border-indigo-200
      hover:bg-indigo-50
      focus-visible:ring-indigo-600`,
    tertiary: `
      bg-indigo-100
      text-indigo-900
      hover:bg-indigo-200
      focus-visible:ring-indigo-600`,
    ghost: `
      bg-transparent
      text-indigo-700
      hover:bg-indigo-50
      focus-visible:ring-indigo-600`
  }

  const sizeClasses: Record<Size, string> = {
    xs: `
      h-8
      text-xs
      ${iconOnly ? "w-8 p-0" : "px-3"}`,
    sm: `
      h-9
      text-sm
      ${iconOnly ? "w-9 p-0" : "px-4"}`,
    md: `
      h-10
      text-sm
      ${iconOnly ? "w-10 p-0" : "px-5"}`,
    lg: `
      h-11
      text-base
      ${iconOnly ? "w-11 p-0" : "px-8"}`,
    xl: `
      h-12
      text-lg
      ${iconOnly ? "w-12 p-0" : "px-10"}`
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

  const fullWidthClass = fullWidth ? "w-full" : ""

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    shadowClasses[shadow],
    fullWidthClass,
    pressAnimationStyle === "ripple" ? "overflow-hidden transform-gpu" : "",
    className
  )

  const Element = useMemo(() => motion(element as any), [element])

  const scaleMap: Record<PressAnimationStrength, number> = {
    light: 0.98,
    medium: 0.95,
    strong: 0.9
  }

  const durationMap: Record<PressAnimationDuration, number> = {
    short: 0.1,
    medium: 0.2,
    long: 0.3
  }

  const motionProps: HTMLMotionProps<any> =
    !isDisabled && pressAnimationStyle === "scale"
      ? {
          whileTap: { scale: scaleMap[pressAnimationStrength] },
          transition: { duration: durationMap[pressAnimationDuration] }
        }
      : {}

  const handlePointerDown = (e: MouseEvent<HTMLButtonElement>) => {
    if (pressAnimationStyle === "ripple" && !isDisabled) {
      const button = e.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      setRipples((prev) => [...prev, { x, y, size, id: Date.now() }])
    }
    onPointerDown?.(e as any)
  }

  const render = () => {
    const Spinner = loadingComponent || DefaultSpinnerIcon

    if (loading && loadingText) {
      return (
        <span className="flex items-center gap-2 relative z-10">
          {Spinner}
          {loadingText}
        </span>
      )
    }

    return (
      <span className="flex items-center gap-2 relative z-10">
        {loading ? Spinner : iconStart}
        {children}
        {iconEnd}
      </span>
    )
  }

  return (
    <Element
      ref={ref}
      href={effectiveHref}
      target={target}
      type={element === "button" ? type : undefined}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={classes}
      onClick={isDisabled ? (e: any) => e.preventDefault() : onClick}
      onPointerDown={handlePointerDown}
      {...motionProps}
      {...rest}
    >
      {pressAnimationStyle === "ripple" && (
        <span className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0">
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.35 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  position: "absolute",
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                  borderRadius: "50%",
                  backgroundColor: "currentColor"
                }}
                onAnimationComplete={() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id))}
              />
            ))}
          </AnimatePresence>
        </span>
      )}
      {render()}
    </Element>
  )
})

ZButton.displayName = "Button"

export default ZButton
