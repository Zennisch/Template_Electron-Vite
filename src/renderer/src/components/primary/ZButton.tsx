import { ElementType, forwardRef, MouseEvent, ReactNode, useMemo, useState } from "react"
import { cn, DefaultSpinnerIcon } from "./utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"

type Variant = "primary" | "secondary" | "tertiary" | "ghost"
type Size = "xs" | "sm" | "md" | "lg" | "xl"
type Shape = "rounded" | "square" | "pill"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"
type PressAnimationStyle = "none" | "scale" | "ripple"
type PressAnimationDuration = "short" | "medium" | "long"
type PressAnimationStrength = "light" | "medium" | "strong"

interface ButtonSizeConfig {
  base: string
  padding: string
  iconOnly: string
  spinner: string
  gap: string
}

const VARIANT_CLASSES: Record<Variant, string> = {
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

const BUTTON_SIZES: Record<Size, ButtonSizeConfig> = {
  xs: {
    base: "h-8 text-xs",
    padding: "px-3",
    iconOnly: "w-8 p-0",
    spinner: "h-3 w-3",
    gap: "gap-1.5"
  },
  sm: {
    base: "h-9 text-sm",
    padding: "px-4",
    iconOnly: "w-9 p-0",
    spinner: "h-4 w-4",
    gap: "gap-2"
  },
  md: {
    base: "h-10 text-base",
    padding: "px-5",
    iconOnly: "w-10 p-0",
    spinner: "h-5 w-5",
    gap: "gap-2"
  },
  lg: {
    base: "h-11 text-lg",
    padding: "px-8",
    iconOnly: "w-11 p-0",
    spinner: "h-6 w-6",
    gap: "gap-2.5"
  },
  xl: {
    base: "h-12 text-xl",
    padding: "px-10",
    iconOnly: "w-12 p-0",
    spinner: "h-7 w-7",
    gap: "gap-3"
  }
}

const SHAPE_CLASSES: Record<Shape, string> = {
  rounded: "rounded-md",
  square: "rounded-none",
  pill: "rounded-full"
}

const SHADOW_CLASSES: Record<Shadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg",
  xl: "shadow-xl"
}

const SCALE_MAP: Record<PressAnimationStrength, number> = {
  light: 0.98,
  medium: 0.95,
  strong: 0.9
}

const DURATION_MAP: Record<PressAnimationDuration, number> = {
  short: 0.1,
  medium: 0.2,
  long: 0.3
}

const RippleEffect = ({ ripples, onClear }: { ripples: any[]; onClear: (id: number) => void }) => (
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
          onAnimationComplete={() => onClear(ripple.id)}
        />
      ))}
    </AnimatePresence>
  </span>
)

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

const ZButton = forwardRef<HTMLButtonElement, ZButtonProps>((props, ref) => {
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

    onClick,
    onPointerDown,
    ...rest
  } = props

  const [ripples, setRipples] = useState<{ x: number; y: number; id: number; size: number }[]>([])

  const isDisabled = disabled || loading

  const sizeConfig = BUTTON_SIZES[size]

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
    sizeConfig.base,
    VARIANT_CLASSES[variant],
    SHAPE_CLASSES[shape],
    SHADOW_CLASSES[shadow],
    iconOnly ? sizeConfig.iconOnly : sizeConfig.padding,
    fullWidth ? "w-full" : "",
    pressAnimationStyle === "ripple" && "overflow-hidden transform-gpu",
    className
  )

  const MotionComponent = useMemo(() => motion.create(Component), [Component])

  const motionProps: HTMLMotionProps<any> =
    !isDisabled && pressAnimationStyle === "scale"
      ? {
          whileTap: { scale: SCALE_MAP[pressAnimationStrength] },
          transition: { duration: DURATION_MAP[pressAnimationDuration] }
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

  const Spinner = loadingComponent || <DefaultSpinnerIcon className={cn("animate-spin", sizeConfig.spinner)} />

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
        <RippleEffect ripples={ripples} onClear={(id) => setRipples((prev) => prev.filter((r) => r.id !== id))} />
      )}

      <span className={cn("flex items-center relative z-10", sizeConfig.gap)}>{content}</span>
    </MotionComponent>
  )
})

ZButton.displayName = "ZButton"

export default ZButton
