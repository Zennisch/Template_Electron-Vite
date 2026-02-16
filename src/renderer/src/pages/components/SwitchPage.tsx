import ZSwitch from "@renderer/components/primary/ZSwitch"
import ZText from "@renderer/components/primary/ZText"
import ShowcaseSection from "@renderer/pages/components/ShowcaseSection"
import { useState } from "react"

const SwitchPage = () => {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Switch
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZSwitch</code> component is
          used to toggle the state of a single setting on or off.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-8">
        {/* Basic Usage */}
        <ShowcaseSection title="Basic Usage">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <ZText>Airplane Mode</ZText>
              <ZSwitch />
            </div>
            <div className="flex items-center justify-between">
              <ZText>Wi-Fi</ZText>
              <ZSwitch defaultChecked />
            </div>
          </div>
        </ShowcaseSection>

        {/* Controlled State */}
        <ShowcaseSection title="Controlled State">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
              <ZText>Enable Feature</ZText>
              <ZSwitch checked={isEnabled} onChange={(e) => setIsEnabled(e.target.checked)} />
            </div>
            <div className="text-sm">
              Current State:{" "}
              <span className={`font-bold ${isEnabled ? "text-green-600" : "text-slate-500"}`}>{isEnabled ? "ON" : "OFF"}</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* Sizes */}
        <ShowcaseSection title="Sizes">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <ZSwitch size="sm" />
              <ZText size="sm">Small</ZText>
            </div>
            <div className="flex items-center gap-4">
              <ZSwitch size="md" defaultChecked />
              <ZText size="md">Medium</ZText>
            </div>
            <div className="flex items-center gap-4">
              <ZSwitch size="lg" />
              <ZText size="lg">Large</ZText>
            </div>
          </div>
        </ShowcaseSection>

        {/* States & Validation */}
        <ShowcaseSection title="States & Validation">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <ZText color="muted">Disabled Off</ZText>
              <ZSwitch disabled />
            </div>
            <div className="flex items-center justify-between">
              <ZText color="muted">Disabled On</ZText>
              <ZSwitch disabled defaultChecked />
            </div>
            <div className="border-t border-slate-100 pt-4">
              <ZSwitch label="With Error Message" error="Failed to sync settings" />
            </div>
            <div>
              <ZSwitch label="With Helper Text" helpText="This action cannot be undone" />
            </div>
          </div>
        </ShowcaseSection>

        {/* With Label Prop */}
        <ShowcaseSection title="Label Prop">
          <div className="flex flex-col gap-4">
            <ZSwitch label="Label Right (Default)" />
            <div className="flex justify-end border border-dashed border-slate-200 p-2 rounded">
              <ZSwitch label="Label Left" labelPlacement="left" />
            </div>
          </div>
        </ShowcaseSection>

        {/* Shadows */}
        <ShowcaseSection title="Shadows (Thumb)">
          <div className="flex items-center justify-around bg-slate-100 p-4 rounded-lg">
            <ZSwitch shadow="none" />
            <ZSwitch shadow="sm" />
            <ZSwitch shadow="md" defaultChecked />
            <ZSwitch shadow="lg" />
          </div>
          <div className="flex justify-around mt-2 text-xs text-slate-400">
            <span>None</span>
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
          </div>
        </ShowcaseSection>
      </div>
    </div>
  )
}

export default SwitchPage
