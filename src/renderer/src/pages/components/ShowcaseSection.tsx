import ZText from "@renderer/components/primary/ZText"
import { ReactNode } from "react"

interface ShowcaseSectionProps {
  title: string
  children: ReactNode
  className?: string
}

const ShowcaseSection = ({ title, children, className = "" }: ShowcaseSectionProps) => (
  <section className={`flex flex-col gap-4 p-6 border border-slate-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
    <div className="pb-2 border-b border-slate-100 mb-2">
      <ZText variant="subheading" size="md" weight="semibold" className="text-slate-800">
        {title}
      </ZText>
    </div>
    {children}
  </section>
)

export default ShowcaseSection
