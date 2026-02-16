import ZButton from "@renderer/components/primary/ZButton"
import ZText from "@renderer/components/primary/ZText"
import ShowcaseSection from "@renderer/pages/components/ShowcaseSection"
import { useState } from "react"

const ButtonPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const toggleLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Button
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZButton</code> component is
          used to trigger actions or navigation. It supports various styles, sizes, and states.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-8">
        <ShowcaseSection title="Variants">
          <div className="flex flex-wrap gap-4 items-center">
            <ZButton variant="primary">Primary</ZButton>
            <ZButton variant="secondary">Secondary</ZButton>
            <ZButton variant="tertiary">Tertiary</ZButton>
            <ZButton variant="ghost">Ghost</ZButton>
          </div>
          <div className="mt-2 p-3 bg-slate-50 rounded text-sm text-slate-500">
            Variants define the visual prominence of the button.
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Sizes">
          <div className="flex flex-wrap gap-4 items-center">
            <ZButton size="xs">XS</ZButton>
            <ZButton size="sm">Small</ZButton>
            <ZButton size="md">Medium</ZButton>
            <ZButton size="lg">Large</ZButton>
            <ZButton size="xl">Extra Large</ZButton>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Shapes">
          <div className="flex flex-wrap gap-4 items-center">
            <ZButton shape="rounded">Rounded (Default)</ZButton>
            <ZButton shape="pill">Pill</ZButton>
            <ZButton shape="square">Square</ZButton>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="States">
          <div className="flex flex-wrap gap-4 items-center">
            <ZButton disabled>Disabled</ZButton>
            <ZButton loading>Loading</ZButton>
            <ZButton loading loadingText="Processing...">
              Loading Text
            </ZButton>
            <ZButton onClick={toggleLoading} loading={isLoading}>
              Click to Load
            </ZButton>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Shadows">
          <div className="flex flex-wrap gap-4 items-center bg-slate-50 p-4 rounded-lg">
            <ZButton shadow="none" variant="secondary">
              None
            </ZButton>
            <ZButton shadow="sm" variant="secondary">
              Small
            </ZButton>
            <ZButton shadow="md" variant="secondary">
              Medium
            </ZButton>
            <ZButton shadow="lg" variant="secondary">
              Large
            </ZButton>
            <ZButton shadow="xl" variant="secondary">
              X-Large
            </ZButton>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Icons">
          <div className="flex flex-wrap gap-4 items-center">
            <ZButton iconStart={<i className="fa-solid fa-cloud-arrow-up" />}>Upload</ZButton>
            <ZButton iconEnd={<i className="fa-solid fa-arrow-right" />} variant="secondary">
              Next Step
            </ZButton>
            <ZButton
              iconOnly
              iconStart={<i className="fa-solid fa-trash" />}
              variant="ghost"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            />
            <ZButton iconOnly shape="pill" iconStart={<i className="fa-solid fa-magnifying-glass" />} variant="secondary" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Press Animations">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4">
              <ZText variant="label" className="w-20">
                Scale:
              </ZText>
              <ZButton pressAnimationStyle="scale">Scale Default</ZButton>
              <ZButton pressAnimationStyle="scale" pressAnimationStrength="strong">
                Scale Strong
              </ZButton>
            </div>
            <div className="flex items-center gap-4">
              <ZText variant="label" className="w-20">
                Ripple:
              </ZText>
              <ZButton pressAnimationStyle="ripple" className="overflow-hidden">
                Ripple Effect
              </ZButton>
            </div>
            <div className="flex items-center gap-4">
              <ZText variant="label" className="w-20">
                None:
              </ZText>
              <ZButton pressAnimationStyle="none">No Animation</ZButton>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Full Width" className="md:col-span-2">
          <div className="flex flex-col gap-4">
            <ZButton fullWidth variant="primary">
              Full Width Primary
            </ZButton>
            <ZButton fullWidth variant="secondary">
              Full Width Secondary
            </ZButton>
          </div>
        </ShowcaseSection>
      </div>
    </div>
  )
}

export default ButtonPage
