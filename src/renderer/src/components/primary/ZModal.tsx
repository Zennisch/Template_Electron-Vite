import { AnimatePresence, motion, useAnimation, Variants, HTMLMotionProps } from "framer-motion"
import { forwardRef, MouseEvent, ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { cn, LoadingSpinner, XMarkIcon } from "./utils"

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "full"
type Position = "center" | "top"

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

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15, delay: 0.1 } }
}

const modalVariants: Variants = {
  hidden: (position: Position) => ({
    opacity: 0,
    scale: 0.95,
    y: position === "top" ? -20 : 10
  }),
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15 }
  }
}

const contentVariants: Variants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15, ease: "easeIn" } }
}

const sizeClasses: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-[calc(100vw-2rem)]"
}

const positionClasses: Record<Position, string> = {
  center: "items-center",
  top: "items-start pt-16"
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
      controls.start({
        x: [0, -6, 6, -6, 6, 0],
        transition: { type: "tween", duration: 0.3 }
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
            "fixed inset-0 z-50 flex justify-center overflow-y-auto overflow-x-hidden p-4",
            positionClasses[position],
            overlayClassName
          )}
          aria-modal="true"
          role="dialog"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm -z-10"
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
              "relative w-full rounded-xl bg-white text-left shadow-2xl ring-1 ring-slate-900/5",
              sizeClasses[size],
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
                  className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/60 backdrop-blur-[2px]"
                >
                  <LoadingSpinner className="h-8 w-8 animate-spin text-indigo-600" />
                </motion.div>
              )}
            </AnimatePresence>

            {header && (
              <div className={cn("flex items-center justify-between border-b border-slate-100 px-6 py-4", headerClassName)}>
                <div className="text-lg font-semibold text-slate-900 leading-6">{header}</div>
                {showCloseButton && !loading && (
                  <button
                    type="button"
                    className="ml-auto -mr-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            {!header && showCloseButton && !loading && (
              <button
                type="button"
                className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                onClick={onClose}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}

            <div className={cn("p-6", bodyClassName)}>
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
                  "flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4 rounded-b-xl",
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
