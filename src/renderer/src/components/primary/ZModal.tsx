import { AnimatePresence, HTMLMotionProps, motion, useAnimation, Variants } from "framer-motion"
import { forwardRef, MouseEvent, ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { cn, LoadingSpinner, XMarkIcon } from "./utils"

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "full"
type Position = "center" | "top"

const ANIMATION_CONFIG = {
  OVERLAY: {
    DURATION: 0.2,
    EXIT_DURATION: 0.15,
    EXIT_DELAY: 0.1
  },
  MODAL: {
    SCALE_HIDDEN: 0.95,
    Y_HIDDEN_TOP: -20,
    Y_HIDDEN_CENTER: 10,
    SPRING: {
      TYPE: "spring",
      DAMPING: 25,
      STIFFNESS: 300,
      DURATION: 0.3
    },
    EXIT_DURATION: 0.15
  },
  CONTENT: {
    X_OFFSET: 10,
    DURATION: 0.2,
    EXIT_DURATION: 0.15
  },
  SHAKE: {
    X_OFFSET: 6,
    DURATION: 0.3
  }
} as const

const MODAL_SIZES: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-[calc(100vw-2rem)]"
}

const MODAL_POSITIONS: Record<Position, string> = {
  center: "items-center",
  top: "items-start pt-16"
}

const MODAL_LAYOUT = {
  PADDING: {
    OVERLAY: "p-4",
    HEADER: "px-6 py-4",
    BODY: "p-6",
    FOOTER: "px-6 py-4"
  },
  ROUNDED: {
    CONTAINER: "rounded-xl",
    FOOTER: "rounded-b-xl"
  },
  BUTTON: {
    SIZE: "h-8 w-8",
    ICON_SIZE: "h-5 w-5",
    MARGIN_HEADER: "-mr-2",
    POSITION_ABSOLUTE: "right-4 top-4"
  },
  GAP: "gap-3"
}

const MODAL_THEME = {
  OVERLAY: "bg-slate-900/60 backdrop-blur-sm",
  CONTAINER: "bg-white ring-1 ring-slate-900/5 shadow-2xl",
  HEADER: {
    BORDER: "border-b border-slate-100",
    TEXT: "text-slate-900"
  },
  FOOTER: {
    BORDER: "border-t border-slate-100",
    BG: "bg-slate-50/50"
  },
  LOADING: "bg-white/60 backdrop-blur-[2px]",
  CLOSE_BUTTON:
    "bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: ANIMATION_CONFIG.OVERLAY.DURATION } },
  exit: {
    opacity: 0,
    transition: { duration: ANIMATION_CONFIG.OVERLAY.EXIT_DURATION, delay: ANIMATION_CONFIG.OVERLAY.EXIT_DELAY }
  }
}

const modalVariants: Variants = {
  hidden: (position: Position) => ({
    opacity: 0,
    scale: ANIMATION_CONFIG.MODAL.SCALE_HIDDEN,
    y: position === "top" ? ANIMATION_CONFIG.MODAL.Y_HIDDEN_TOP : ANIMATION_CONFIG.MODAL.Y_HIDDEN_CENTER
  }),
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: ANIMATION_CONFIG.MODAL.SPRING.TYPE,
      damping: ANIMATION_CONFIG.MODAL.SPRING.DAMPING,
      stiffness: ANIMATION_CONFIG.MODAL.SPRING.STIFFNESS,
      duration: ANIMATION_CONFIG.MODAL.SPRING.DURATION
    }
  },
  exit: {
    opacity: 0,
    scale: ANIMATION_CONFIG.MODAL.SCALE_HIDDEN,
    y: ANIMATION_CONFIG.MODAL.Y_HIDDEN_CENTER,
    transition: { duration: ANIMATION_CONFIG.MODAL.EXIT_DURATION }
  }
}

const contentVariants: Variants = {
  initial: { opacity: 0, x: ANIMATION_CONFIG.CONTENT.X_OFFSET },
  animate: { opacity: 1, x: 0, transition: { duration: ANIMATION_CONFIG.CONTENT.DURATION, ease: "easeOut" } },
  exit: {
    opacity: 0,
    x: -ANIMATION_CONFIG.CONTENT.X_OFFSET,
    transition: { duration: ANIMATION_CONFIG.CONTENT.EXIT_DURATION, ease: "easeIn" }
  }
}

export interface ZModalProps extends HTMLMotionProps<"div"> {
  isOpen: boolean
  onClose: () => void

  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode

  size?: Size
  position?: Position

  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  loading?: boolean

  stepKey?: string | number

  attentionTrigger?: number

  overlayClassName?: string
  containerClassName?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

const ZModal = forwardRef<HTMLDivElement, ZModalProps>((props, ref) => {
  const {
    isOpen,
    onClose,

    header,
    footer,
    children,

    size = "md",
    position = "center",

    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    loading = false,

    stepKey,
    attentionTrigger = 0,

    overlayClassName,
    containerClassName,
    headerClassName,
    bodyClassName,
    footerClassName,
    className,
    ...rest
  } = props

  const [mounted, setMounted] = useState(false)
  const controls = useAnimation()

  const isFirstRender = useRef(true)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isOpen && closeOnEscape && e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (attentionTrigger > 0 && isOpen) {
      const x = ANIMATION_CONFIG.SHAKE.X_OFFSET
      controls.start({
        x: [0, -x, x, -x, x, 0],
        transition: { type: "tween", duration: ANIMATION_CONFIG.SHAKE.DURATION }
      })
    }
  }, [attentionTrigger, controls, isOpen])

  if (!mounted) return null

  const handleBackdropClick = (e: MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex justify-center overflow-y-auto overflow-x-hidden",
            MODAL_LAYOUT.PADDING.OVERLAY,
            MODAL_POSITIONS[position],
            overlayClassName
          )}
          aria-modal="true"
          role="dialog"
          onClick={handleBackdropClick}
        >
          <motion.div
            className={cn("fixed inset-0 -z-10", MODAL_THEME.OVERLAY)}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          <motion.div
            ref={ref}
            custom={position}
            variants={modalVariants}
            initial="hidden"
            animate={controls}
            whileInView="visible"
            exit="exit"
            className={cn(
              "relative w-full text-left",
              MODAL_THEME.CONTAINER,
              MODAL_LAYOUT.ROUNDED.CONTAINER,
              MODAL_SIZES[size],
              containerClassName,
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...rest}
          >
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "absolute inset-0 z-20 flex items-center justify-center",
                    MODAL_LAYOUT.ROUNDED.CONTAINER,
                    MODAL_THEME.LOADING
                  )}
                >
                  <LoadingSpinner className="h-8 w-8 animate-spin text-indigo-600" />
                </motion.div>
              )}
            </AnimatePresence>

            {header && (
              <div
                className={cn(
                  "flex items-center justify-between",
                  MODAL_THEME.HEADER.BORDER,
                  MODAL_LAYOUT.PADDING.HEADER,
                  headerClassName
                )}
              >
                <div className={cn("text-lg font-semibold leading-6", MODAL_THEME.HEADER.TEXT)}>{header}</div>
                {showCloseButton && !loading && (
                  <button
                    type="button"
                    className={cn(
                      "ml-auto inline-flex items-center justify-center rounded-md",
                      MODAL_LAYOUT.BUTTON.SIZE,
                      MODAL_LAYOUT.BUTTON.MARGIN_HEADER,
                      MODAL_THEME.CLOSE_BUTTON
                    )}
                    onClick={onClose}
                  >
                    <XMarkIcon className={MODAL_LAYOUT.BUTTON.ICON_SIZE} />
                  </button>
                )}
              </div>
            )}

            {!header && showCloseButton && !loading && (
              <button
                type="button"
                className={cn(
                  "absolute z-10 inline-flex items-center justify-center rounded-md",
                  MODAL_LAYOUT.BUTTON.POSITION_ABSOLUTE,
                  MODAL_LAYOUT.BUTTON.SIZE,
                  MODAL_THEME.CLOSE_BUTTON
                )}
                onClick={onClose}
              >
                <XMarkIcon className={MODAL_LAYOUT.BUTTON.ICON_SIZE} />
              </button>
            )}

            <div className={cn(MODAL_LAYOUT.PADDING.BODY, bodyClassName)}>
              {stepKey !== undefined ? (
                <AnimatePresence mode="wait">
                  <motion.div key={stepKey} variants={contentVariants} initial="initial" animate="animate" exit="exit">
                    {children}
                  </motion.div>
                </AnimatePresence>
              ) : (
                children
              )}
            </div>

            {footer && (
              <div
                className={cn(
                  "flex items-center justify-end",
                  MODAL_LAYOUT.GAP,
                  MODAL_THEME.FOOTER.BORDER,
                  MODAL_THEME.FOOTER.BG,
                  MODAL_LAYOUT.PADDING.FOOTER,
                  MODAL_LAYOUT.ROUNDED.FOOTER,
                  footerClassName
                )}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
})

ZModal.displayName = "ZModal"

export default ZModal
