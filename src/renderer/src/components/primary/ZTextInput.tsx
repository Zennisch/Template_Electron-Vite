import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { forwardRef, InputHTMLAttributes, ReactNode, useEffect, useId, useState } from "react"

type Size = "sm" | "md" | "lg" | "xl"
type Shadow = "none" | "sm" | "md" | "lg" | "xl"
type LabelPlacement = "top" | "left"

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  labelPlacement?: LabelPlacement

  error?: string | boolean
  helpText?: string

  iconStart?: ReactNode
  iconEnd?: ReactNode

  size?: Size
  shadow?: Shadow
  fullWidth?: boolean

  multiline?: boolean
  rows?: number

  containerClassName?: string
}

const ZTextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>((props, ref) => {
  const {
    label,
    labelPlacement = "top",

    error,
    helpText,

    iconStart,
    iconEnd,

    size = "md",
    shadow = "none",
    fullWidth = false,

    multiline = false,
    rows = 3,

    containerClassName,
    className,
    id,
    value,
    disabled,
    onChange,
    ...rest
  } = props

  const inputId = id || useId()
  const errorId = `${inputId}-error`
  const helpId = `${inputId}-help`

  const [isFocused, setIsFocused] = useState(false)

  const controls = useAnimation()

  const hasValue = !!String(value ?? "")

  const labelVariants = {
    initial: {
      y: 0,
      scale: 1,
      color: "#99aaaa"
    },
    float: {
      y: -28,
      scale: 0.85,
      color: error ? "#ee4444" : "#3388ff"
    }
  }

  const borderVariants = {
    initial: {
      borderColor: "#eeeeee",
      boxShadow: "0px 0px 0px rgba(0,0,0,0)"
    },
    focus: {
      borderColor: "#3388ff",
      boxShadow: "0px 0px 0px 4px rgba(51, 136, 255, 0.1)"
    },
    error: {
      borderColor: "#ee4444",
      boxShadow: "0px 0px 0px 4px rgba(238, 68, 68, 0.1)"
    }
  }

  useEffect(() => {
    if (error) {
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      })
    }
  }, [error, controls])

  return (
    <div className="relative w-full max-w-md mt-8 mb-4">
      <motion.div animate={controls}>
        <motion.div
          className="relative border-2 rounded-lg bg-white"
          variants={borderVariants}
          initial="initial"
          animate={error ? "error" : isFocused ? "focus" : "initial"}
          whileHover={!isFocused && !error ? { borderColor: "#d1d5db" } : {}}
        >
          <input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-4 py-3 bg-transparent outline-none rounded-lg text-gray-700 z-10 relative"
          />

          <motion.label
            className="absolute left-4 top-3 pointer-events-none bg-white px-1 origin-top-left font-medium"
            variants={labelVariants}
            initial="initial"
            animate={isFocused || hasValue ? "float" : "initial"}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            key="error-message"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-sm mt-1 ml-1 overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})

ZTextInput.displayName = "TextInput"

export default ZTextInput
