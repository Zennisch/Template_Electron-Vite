import ZRadio from "@renderer/components/primary/ZRadio"
import ZText from "@renderer/components/primary/ZText"
import ShowcaseSection from "@renderer/pages/components/ShowcaseSection"
import { useState } from "react"

const RadioPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("startup")
  const [selectedColor, setSelectedColor] = useState("blue")

  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Radio
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZRadio</code> component
          allows users to select a single option from a list of mutually exclusive options.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-8">
        {/* Basic Group */}
        <ShowcaseSection title="Basic Group">
          <div className="flex flex-col gap-3">
            <ZText variant="label" className="text-slate-500 mb-1">
              Select a Plan:
            </ZText>
            <ZRadio
              name="plan"
              value="free"
              label="Free Plan"
              checked={selectedPlan === "free"}
              onChange={(e) => setSelectedPlan(e.target.value)}
            />
            <ZRadio
              name="plan"
              value="startup"
              label="Startup Plan"
              checked={selectedPlan === "startup"}
              onChange={(e) => setSelectedPlan(e.target.value)}
            />
            <ZRadio
              name="plan"
              value="enterprise"
              label="Enterprise Plan"
              checked={selectedPlan === "enterprise"}
              onChange={(e) => setSelectedPlan(e.target.value)}
            />
            <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded">Selected: {selectedPlan}</div>
          </div>
        </ShowcaseSection>

        {/* Sizes */}
        <ShowcaseSection title="Sizes">
          <div className="flex flex-col gap-4">
            <ZRadio name="size" value="sm" size="sm" label="Small Radio" />
            <ZRadio name="size" value="md" size="md" label="Medium Radio (Default)" defaultChecked />
            <ZRadio name="size" value="lg" size="lg" label="Large Radio" />
          </div>
        </ShowcaseSection>

        {/* Label Placement */}
        <ShowcaseSection title="Label Placement">
          <div className="flex flex-col gap-4">
            <ZRadio name="placement" value="right" labelPlacement="right" label="Label Right (Default)" defaultChecked />
            <div className="flex justify-end border border-dashed border-slate-200 p-2 rounded">
              <ZRadio name="placement" value="left" labelPlacement="left" label="Label Left" />
            </div>
          </div>
        </ShowcaseSection>

        {/* States & Validation */}
        <ShowcaseSection title="States & Validation">
          <div className="flex flex-col gap-4">
            <ZRadio name="state" value="1" label="Disabled Unchecked" disabled />
            <ZRadio name="state" value="2" label="Disabled Checked" disabled defaultChecked />
            <ZRadio name="state" value="3" label="With Error" error="Selection invalid" />
            <ZRadio name="state" value="4" label="With Helper Text" helpText="Recommended option" />
          </div>
        </ShowcaseSection>

        {/* Custom Layout (Horizontal) */}
        <ShowcaseSection title="Horizontal Group" className="md:col-span-2">
          <div className="flex flex-col gap-2">
            <ZText variant="label" className="text-slate-500">
              Pick a Color:
            </ZText>
            <div className="flex flex-wrap gap-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <ZRadio
                name="color"
                value="red"
                label="Red"
                checked={selectedColor === "red"}
                onChange={() => setSelectedColor("red")}
              />
              <ZRadio
                name="color"
                value="blue"
                label="Blue"
                checked={selectedColor === "blue"}
                onChange={() => setSelectedColor("blue")}
              />
              <ZRadio
                name="color"
                value="green"
                label="Green"
                checked={selectedColor === "green"}
                onChange={() => setSelectedColor("green")}
              />
            </div>
          </div>
        </ShowcaseSection>

        {/* Shadows */}
        <ShowcaseSection title="Shadows">
          <div className="flex flex-col gap-4">
            <ZRadio name="shadow" value="none" shadow="none" label="No Shadow" />
            <ZRadio name="shadow" value="sm" shadow="sm" label="Small Shadow" />
            <ZRadio name="shadow" value="md" shadow="md" label="Medium Shadow" defaultChecked />
            <ZRadio name="shadow" value="lg" shadow="lg" label="Large Shadow" />
          </div>
        </ShowcaseSection>
      </div>
    </div>
  )
}

export default RadioPage
