import ZCheckbox from "@renderer/components/primary/ZCheckbox"
import ZText from "@renderer/components/primary/ZText"
import ShowcaseSection from "@renderer/pages/components/ShowcaseSection"
import { useState } from "react"

const CheckboxPage = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [child1, setChild1] = useState(true)
  const [child2, setChild2] = useState(false)

  const allChecked = child1 && child2
  const isIndeterminate = (child1 || child2) && !allChecked

  const handleParentChange = () => {
    if (allChecked || isIndeterminate) {
      setChild1(false)
      setChild2(false)
    } else {
      setChild1(true)
      setChild2(true)
    }
  }

  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Checkbox
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZCheckbox</code> component
          allows users to select one or more items from a set.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-8">
        <ShowcaseSection title="Basic Usage">
          <div className="flex flex-col gap-4">
            <ZCheckbox label="Accept terms and conditions" />
            <ZCheckbox label="Subscribe to newsletter" defaultChecked />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Controlled State">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <ZCheckbox
                checked={isChecked}
                onChange={(checked) => setIsChecked(checked)}
                label={isChecked ? "Checked" : "Unchecked"}
              />
              <span className="text-xs text-slate-500 font-mono">State: {String(isChecked)}</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Sizes">
          <div className="flex flex-col gap-4">
            <ZCheckbox size="sm" label="Small Checkbox" />
            <ZCheckbox size="md" label="Medium Checkbox (Default)" defaultChecked />
            <ZCheckbox size="lg" label="Large Checkbox" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Label Placement">
          <div className="flex flex-col gap-4">
            <ZCheckbox labelPlacement="right" label="Label Right (Default)" />
            <div className="flex justify-end border border-dashed border-slate-200 p-2 rounded">
              <ZCheckbox labelPlacement="left" label="Label Left" />
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="States & Validation">
          <div className="flex flex-col gap-4">
            <ZCheckbox label="Disabled Unchecked" disabled />
            <ZCheckbox label="Disabled Checked" disabled defaultChecked />
            <ZCheckbox label="With Error" error="This field is required" />
            <ZCheckbox label="With Helper Text" helpText="This is some helpful information." />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Indeterminate (Simulated)">
          <div className="flex flex-col gap-2">
            <ZCheckbox
              label="Parent Checkbox"
              indeterminate={isIndeterminate}
              checked={allChecked}
              onChange={handleParentChange}
            />
            <div className="ml-6 flex flex-col gap-2 border-l-2 border-slate-100 pl-4">
              <ZCheckbox label="Child Option 1" checked={child1} onChange={(checked) => setChild1(checked)} />
              <ZCheckbox label="Child Option 2" checked={child2} onChange={(checked) => setChild2(checked)} />
            </div>
          </div>
        </ShowcaseSection>

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
