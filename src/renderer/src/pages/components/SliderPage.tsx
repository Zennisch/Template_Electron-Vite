import ZSlider from "@renderer/components/primary/ZSlider"
import ZText from "@renderer/components/primary/ZText"
import ShowcaseSection from "@renderer/pages/components/ShowcaseSection"
import { useState } from "react"

const SliderPage = () => {
  const [volume, setVolume] = useState(75)
  const [price, setPrice] = useState(250)

  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Slider
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZSlider</code> component
          allows users to make selections from a range of values. It supports custom formatting, steps, and validation states.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-8">
        <ShowcaseSection title="Basic Usage">
          <div className="flex flex-col gap-6">
            <ZSlider label="Default Slider" defaultValue={30} fullWidth />
            <ZSlider label="With Value Label" defaultValue={60} showValue fullWidth />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Controlled State">
          <div className="flex flex-col gap-6">
            <ZSlider label="Volume Control" value={volume} onChange={setVolume} showValue min={0} max={100} fullWidth />
            <div className="flex items-center gap-4">
              <button className="px-3 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200" onClick={() => setVolume(0)}>
                Mute
              </button>
              <button className="px-3 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200" onClick={() => setVolume(100)}>
                Max
              </button>
              <span className="text-sm font-medium text-slate-600">Current: {volume}%</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Sizes" className="md:row-span-2">
          <div className="flex flex-col gap-8">
            <ZSlider label="Small Size" size="sm" defaultValue={25} showValue fullWidth />
            <ZSlider label="Medium Size" size="md" defaultValue={50} showValue fullWidth />
            <ZSlider label="Large Size" size="lg" defaultValue={75} showValue fullWidth />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Custom Formatting">
          <div className="flex flex-col gap-6">
            <ZSlider
              label="Price Range"
              value={price}
              onChange={setPrice}
              min={0}
              max={1000}
              step={10}
              showValue
              valueFormatter={(val) => `$${val}`}
              fullWidth
            />
            <ZSlider
              label="Satisfaction"
              defaultValue={8}
              min={1}
              max={10}
              showValue
              valueFormatter={(val) => `${val}/10`}
              fullWidth
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="States & Validation">
          <div className="flex flex-col gap-6">
            <ZSlider label="Disabled Slider" defaultValue={40} disabled showValue fullWidth />
            <ZSlider label="Error State" defaultValue={80} error="Value exceeds limit" showValue fullWidth />
            <ZSlider label="With Helper Text" defaultValue={20} helpText="Adjust sensitivity level" showValue fullWidth />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Step & Range Config">
          <div className="flex flex-col gap-6">
            <ZSlider label="Step = 25" defaultValue={25} min={0} max={100} step={25} showValue fullWidth />
            <ZSlider label="Negative Range" defaultValue={0} min={-50} max={50} showValue fullWidth />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Label Placement">
          <div className="flex flex-col gap-6">
            <ZSlider label="Left Label" labelPlacement="left" defaultValue={40} fullWidth />
            <ZSlider label="Right Label" labelPlacement="right" defaultValue={60} fullWidth />
          </div>
        </ShowcaseSection>
      </div>

      <div className="h-24"></div>
    </div>
  )
}

export default SliderPage
