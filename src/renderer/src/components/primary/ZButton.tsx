import { HTMLMotionProps, motion } from "framer-motion"
import { ElementType, forwardRef, MouseEvent, ReactNode, useMemo, useState } from "react"
import { cn, DefaultSpinnerIcon } from "./utils"
import { RippleEffect } from "./ZButtonRipple"

type Variant = "primary" | "secondary" | "tertiary" | "ghost"
type Size = "xs" | "sm" | "md" | "lg" | "xl"
type Shape = "rounded" | "square" | "pill"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"
export type PressAnimationStyle = "none" | "scale" | "ripple"
export type PressAnimationDuration = "short" | "medium" | "long"
export type PressAnimationStrength = "light" | "medium" | "strong"

interface SizeConfig {
  base: string
  padding: string
  gap: string
  spinner: string
}

const SIZES: Record<Size, SizeConfig> = {
  xs: {
    base: "text-xs",
    padding: "px-2 py-1.5",
    gap: "gap-1.5",
    spinner: "h-2 w-2"
  },
  sm: {
    base: "text-sm",
    padding: "px-2.5 py-1.75",
    gap: "gap-1.75",
    spinner: "h-3 w-3"
  },
  md: {
    base: "text-base",
    padding: "px-3 py-2",
    gap: "gap-2",
    spinner: "h-4 w-4"
  },
  lg: {
    base: "text-lg",
    padding: "px-3.5 py-2.25",
    gap: "gap-2.25",
    spinner: "h-5 w-5"
  },
  xl: {
    base: "text-xl",
    padding: "px-4 py-2.5",
    gap: "gap-2.5",
    spinner: "h-6 w-6"
  }
}

const VARIANTS: Record<Variant, string> = {
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
      hover:bg-transparent
      focus-visible:ring-indigo-600`
}

const SHAPES: Record<Shape, string> = {
  rounded: "rounded-md",
  square: "rounded-none",
  pill: "rounded-full"
}

const SHADOWS: Record<Shadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg",
  xl: "shadow-xl"
}

const SCALE_STRENGTHS: Record<PressAnimationStrength, number> = {
  light: 0.98,
  medium: 0.95,
  strong: 0.9
}

const SCALE_DURATIONS: Record<PressAnimationDuration, number> = {
  short: 0.1,
  medium: 0.2,
  long: 0.3
}

interface ZButtonProps extends HTMLMotionProps<"button"> {
  as?: ElementType
  href?: string
  target?: string

  children?: ReactNode

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

const ZButton = forwardRef<HTMLElement, ZButtonProps>((props, ref) => {
  const {
    as: Component = "button",

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
    href,

    onClick,
    onPointerDown,
    ...rest
  } = props

  const [ripples, setRipples] = useState<{ x: number; y: number; id: number; size: number }[]>([])

  const isDisabled = disabled || loading

  const config = SIZES[size]

  const baseClasses = `
      relative inline-flex items-center justify-center
      whitespace-nowrap font-medium
      outline-none focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-white
      disabled:pointer-events-none disabled:opacity-70
      select-none
      transition-colors
    `

  const classes = cn(
    baseClasses,
    config.base,
    config.padding,
    VARIANTS[variant],
    SHAPES[shape],
    SHADOWS[shadow],
    fullWidth ? "w-full" : "",
    pressAnimationStyle === "ripple" && "overflow-hidden transform-gpu",
    className
  )

  const MotionComponent = useMemo(() => motion.create(Component), [Component])

  const motionProps: HTMLMotionProps<any> =
    !isDisabled && pressAnimationStyle === "scale"
      ? {
          whileTap: { scale: SCALE_STRENGTHS[pressAnimationStrength] },
          transition: { duration: SCALE_DURATIONS[pressAnimationDuration] }
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

  const Spinner = loadingComponent || <DefaultSpinnerIcon className={cn("animate-spin", config.spinner)} />

  const content =
    loading && loadingText ? (
      <>
        {Spinner}
        {loadingText}
      </>
    ) : (
      <>
        {loading ? Spinner : iconStart}
        {children}
        {iconEnd}
      </>
    )

  return (
    <MotionComponent
      ref={ref}
      type={Component === "button" ? type : undefined}
      href={isDisabled ? undefined : href}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={classes}
      onClick={isDisabled ? (e: MouseEvent<HTMLElement>) => e.preventDefault() : onClick}
      onPointerDown={handlePointerDown}
      {...motionProps}
      {...rest}
    >
      {pressAnimationStyle === "ripple" && (
        <RippleEffect
          ripples={ripples}
          duration={pressAnimationDuration}
          strength={pressAnimationStrength}
          onClear={(id) => setRipples((prev) => prev.filter((r) => r.id !== id))}
        />
      )}

      <span className={cn("flex items-center relative z-10", config.gap)}>{content}</span>
    </MotionComponent>
  )
})

ZButton.displayName = "ZButton"

export default ZButton
