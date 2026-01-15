import { forwardRef, HTMLAttributes, ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn, LoadingSpinner, XMarkIcon } from "./utils"

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "full"
type Position = "center" | "top"

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void

  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  children?: ReactNode

  size?: Size
  position?: Position

  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  loading?: boolean

  overlayClassName?: string
  containerClassName?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    isOpen,
    onClose,

    header,
    body,
    footer,
    children,

    size = "md",
    position = "center",

    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    loading = false,

    overlayClassName,
    containerClassName,
    headerClassName,
    bodyClassName,
    footerClassName,
    ...rest
  } = props

  const [mounted, setMounted] = useState(false)

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

  if (!mounted || !isOpen) return null

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4 backdrop-blur-sm transition-opacity animate-in fade-in duration-200",
        positionClasses[position],
        overlayClassName
      )}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      {...rest}
    >
      <div
        ref={ref}
        className={cn(
          "relative w-full transform rounded-lg bg-white text-left shadow-xl transition-all animate-in zoom-in-95 duration-200",
          sizeClasses[size],
          containerClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-[1px]">
            <LoadingSpinner className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        )}

        {header && (
          <div className={cn("flex items-center justify-between border-b border-slate-100 px-6 py-4", headerClassName)}>
            <div className="text-lg font-semibold text-slate-900 leading-6">{header}</div>
            {showCloseButton && !loading && (
              <button
                type="button"
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
            className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onClose}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}

        <div className={cn("p-6", bodyClassName)}>
          {body}
          {children}
        </div>

        {footer && (
          <div
            className={cn(
              "flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 rounded-b-lg",
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
})

Modal.displayName = "Modal"

export default Modal
