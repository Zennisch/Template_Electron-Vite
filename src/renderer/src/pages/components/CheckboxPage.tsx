import ZCheckbox from "@renderer/components/primary/ZCheckbox"
import ZText from "@renderer/components/primary/ZText"
import { ReactNode, useState } from "react"

const ShowcaseSection = ({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) => (
  <section className={`flex flex-col gap-4 p-6 border border-slate-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
    <div className="pb-2 border-b border-slate-100 mb-2">
      <ZText variant="subheading" size="md" weight="semibold" className="text-slate-800">
        {title}
      </ZText>
    </div>
    {children}
  </section>
)

const CheckboxPage = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(true)

  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Checkbox
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZCheckbox</code> component allows users to select one or more items from a set.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-8">
        {/* Basic Usage */}
        <ShowcaseSection title="Basic Usage">
          <div className="flex flex-col gap-4">
            <ZCheckbox label="Accept terms and conditions" />
            <ZCheckbox label="Subscribe to newsletter" defaultChecked />
          </div>
        </ShowcaseSection>

        {/* Controlled State */}
        <ShowcaseSection title="Controlled State">
           <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
               <ZCheckbox 
                checked={isChecked} 
                onChange={(checked) => setIsChecked(checked)} 
                label={isChecked ? "Checked" : "Unchecked"} 
              />
              <span className="text-xs text-slate-500 font-mono">
                State: {String(isChecked)}
              </span>
            </div>
          </div>
        </ShowcaseSection>

        {/* Sizes */}
        <ShowcaseSection title="Sizes">
          <div className="flex flex-col gap-4">
            <ZCheckbox size="sm" label="Small Checkbox" />
            <ZCheckbox size="md" label="Medium Checkbox (Default)" defaultChecked />
            <ZCheckbox size="lg" label="Large Checkbox" />
          </div>
        </ShowcaseSection>

        {/* Label Placement */}
        <ShowcaseSection title="Label Placement">
          <div className="flex flex-col gap-4">
            <ZCheckbox labelPlacement="right" label="Label Right (Default)" />
            <div className="flex justify-end border border-dashed border-slate-200 p-2 rounded">
               <ZCheckbox labelPlacement="left" label="Label Left" />
            </div>
          </div>
        </ShowcaseSection>
        
        {/* States & Validation */}
        <ShowcaseSection title="States & Validation">
          <div className="flex flex-col gap-4">
            <ZCheckbox label="Disabled Unchecked" disabled />
            <ZCheckbox label="Disabled Checked" disabled defaultChecked />
            <ZCheckbox label="With Error" error="This field is required" />
             <ZCheckbox label="With Helper Text"  helpText="This is some helpful information." />
          </div>
        </ShowcaseSection>

         {/* Indeterminate State (Visual Only if supported by component, otherwise mimics logic) */}
         <ShowcaseSection title="Indeterminate (Simulated)">
           <div className="flex flex-col gap-2">
             <ZCheckbox 
               label="Parent Checkbox" 
               // Note: Native react checkbox indeterminate is usually set via ref. 
               // Assuming ZCheckbox might handle this or we just show checked/unchecked for now.
               // If ZCheckbox supports 'indeterminate' prop directly:
               // indeterminate={indeterminate}
               checked={true}
               onChange={() => setIndeterminate(!indeterminate)}
             />
             <div className="ml-6 flex flex-col gap-2 border-l-2 border-slate-100 pl-4">
               <ZCheckbox label="Child Option 1" defaultChecked />
               <ZCheckbox label="Child Option 2" />
             </div>
           </div>
        </ShowcaseSection>

        {/* Shadows */}
        <ShowcaseSection title="Shadows">
          <div className="flex flex-col gap-4">
            <ZCheckbox shadow="none" label="No Shadow" />
            <ZCheckbox shadow="sm" label="Small Shadow" defaultChecked />
            <ZCheckbox shadow="md" label="Medium Shadow" />
            <ZCheckbox shadow="lg" label="Large Shadow" defaultChecked />
          </div>
        </ShowcaseSection>
      </div>
    </div>
  )
}

export default CheckboxPage