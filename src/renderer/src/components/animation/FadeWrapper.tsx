import { motion } from "framer-motion"
import { FadeWrapperProps } from "./wrapper"

export default function FadeWrapper({ children, className }: FadeWrapperProps): React.JSX.Element {
  return (
    <motion.div className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  )
}
