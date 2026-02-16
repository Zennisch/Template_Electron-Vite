import { useEffect, useState } from "react"
import Button from "./components/primary/ZButton"
import Checkbox from "./components/primary/ZCheckbox"
import Radio from "./components/primary/ZRadio"
import Select, { ZSelectItem } from "./components/primary/ZSelect"
import Slider from "./components/primary/ZSlider"
import Switch from "./components/primary/ZSwitch"
import TextInput from "./components/primary/ZTextInput"
import Modal from "./components/primary/ZModal"
import Text from "./components/primary/ZText"

// Simple icon placeholder
const Icon = () => <span className="text-current">★</span>

const AsyncSelect = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState<ZSelectItem<string>[]>([])

  const allData = [
    { label: "Algorithms", value: "algo" },
    { label: "Artificial Intelligence", value: "ai" },
    { label: "Backend Development", value: "be" },
    { label: "Cloud Computing", value: "cloud" },
    { label: "Data Science", value: "ds" },
    { label: "DevOps", value: "devops" },
    { label: "Frontend Development", value: "fe" },
    { label: "Machine Learning", value: "ml" },
    { label: "Network Security", value: "netsec" },
    { label: "Software Engineering", value: "se" },
    { label: "Web Security", value: "websec" }
  ]

  const handleSearch = (query: string) => {
    setIsLoading(true)
    // Simulate API delay
    setTimeout(() => {
      if (!query) {
        setOptions(allData)
      } else {
        const filtered = allData.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
        setOptions(filtered)
      }
      setIsLoading(false)
    }, 800)
  }

  // Initial load
  useEffect(() => {
    handleSearch("")
  }, [])

  return (
    <Select
      label="Async API Search"
      placeholder="Type to search capabilities..."
      searchable
      isLoading={isLoading}
      onSearchChange={handleSearch}
      options={options}
      helpText="Simulates a server-side search with 800ms delay"
    />
  )
}

const Modals = () => {
  const [basicOpen, setBasicOpen] = useState(false)
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | "2xl" | "full">("md")
  const [sizeOpen, setSizeOpen] = useState(false)
  const [topOpen, setTopOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [customOpen, setCustomOpen] = useState(false)

  // New states for animations
  const [attentionOpen, setAttentionOpen] = useState(false)
  const [attentionTrigger, setAttentionTrigger] = useState(0)

  const [stepOpen, setStepOpen] = useState(false)
  const [step, setStep] = useState(1)

  return (
    <div className="space-y-2 unreset">
      <h1 className="text-3xl font-bold border-b pb-2">Modal Component (ZModal)</h1>
      <p className="text-gray-500">Comprehensive display of all ZModal props including new animations.</p>

      {/* Basic */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Usage</h2>
        <Button onClick={() => setBasicOpen(true)}>Open Basic Modal</Button>
        <Modal
          isOpen={basicOpen}
          onClose={() => setBasicOpen(false)}
          header="Basic Modal"
          footer={
            <div className="flex justify-end gap-2 w-full">
              <Button variant="ghost" onClick={() => setBasicOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setBasicOpen(false)}>Confirm</Button>
            </div>
          }
        >
          <p>This is a standard modal dialog with a header and footer buttons.</p>
        </Modal>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap gap-4">
          {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map((s) => (
            <Button
              key={s}
              onClick={() => {
                setSize(s)
                setSizeOpen(true)
              }}
            >
              {s.toUpperCase()}
            </Button>
          ))}
        </div>
        <Modal
          isOpen={sizeOpen}
          onClose={() => setSizeOpen(false)}
          size={size}
          header={`Size: ${size}`}
          footer={<Button onClick={() => setSizeOpen(false)}>Close</Button>}
        >
          <p className="text-slate-600">
            The width of this modal is defined by the <code>size="{size}"</code> prop.
          </p>
        </Modal>
      </section>

      {/* Position */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Positions</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setTopOpen(true)}>Top Position</Button>
        </div>
        <Modal
          isOpen={topOpen}
          onClose={() => setTopOpen(false)}
          position="top"
          header="Top Position"
          footer={<Button onClick={() => setTopOpen(false)}>Close</Button>}
        >
          <p>This modal is positioned at the top of the viewport.</p>
        </Modal>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States & Customization</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setLoadingOpen(true)}>Loading State</Button>
          <Button onClick={() => setCustomOpen(true)}>Custom Content</Button>
        </div>

        {/* Loading */}
        <Modal isOpen={loadingOpen} onClose={() => setLoadingOpen(false)} loading header="Processing Data">
          <p>The modal is in a loading state...</p>
        </Modal>

        {/* Custom */}
        <Modal
          isOpen={customOpen}
          onClose={() => setCustomOpen(false)}
          closeOnBackdropClick={false}
          header={
            <div className="flex items-center gap-2 text-indigo-600">
              <Icon /> Custom Header
            </div>
          }
          footer={
            <div className="w-full flex justify-between items-center">
              <span className="text-sm text-gray-500">Step 1 of 3</span>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setCustomOpen(false)}>
                  Back
                </Button>
                <Button onClick={() => setCustomOpen(false)}>Next</Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <p>This modal has custom content and disables backdrop closing.</p>
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded border border-yellow-200">
              <strong>Warning:</strong> You must click one of the buttons below to close.
            </div>
          </div>
        </Modal>
      </section>

      {/* Animations (New) */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Animations & Transitions</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setAttentionOpen(true)}>Attention Shake</Button>
          <Button
            onClick={() => {
              setStep(1)
              setStepOpen(true)
            }}
          >
            Step/Wizard Crossfade
          </Button>
        </div>

        {/* Attention/Shake Modal */}
        <Modal
          isOpen={attentionOpen}
          onClose={() => setAttentionOpen(false)}
          header="Micro-interaction: Shake"
          attentionTrigger={attentionTrigger}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setAttentionOpen(false)}>
                Close
              </Button>
              <Button onClick={() => setAttentionTrigger((t) => t + 1)}>Trigger Shake Error</Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p>
              Use the <code>attentionTrigger</code> prop to shake the modal when a user tries to perform an invalid action or
              needs to pay attention.
            </p>
            <div className="p-3 bg-red-50 text-red-700 rounded text-sm">
              Press the button below to simulate an error validation.
            </div>
          </div>
        </Modal>

        {/* Wizard/Step Modal */}
        <Modal
          isOpen={stepOpen}
          onClose={() => setStepOpen(false)}
          header={`Wizard Step ${step}`}
          stepKey={step}
          footer={
            <div className="flex justify-between w-full">
              <Button variant="secondary" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
              <Button onClick={() => (step < 3 ? setStep((s) => s + 1) : setStepOpen(false))}>
                {step === 3 ? "Finish" : "Next"}
              </Button>
            </div>
          }
        >
          <div className="min-h-30 flex flex-col gap-4">
            {step === 1 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Introduction</h3>
                <p>Welcome to the wizard. This content fades in from the right.</p>
                <TextInput placeholder="Enter your name" fullWidth />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Details</h3>
                <p>Please select your preferences.</p>
                <div className="space-y-2">
                  <div className="p-2 border rounded hover:bg-slate-50">Option A</div>
                  <div className="p-2 border rounded hover:bg-slate-50">Option B</div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Confirmation</h3>
                <p>You are all set! Click Finish to close.</p>
                <div className="text-center py-4 text-green-600 font-bold text-2xl">✓ Success</div>
              </div>
            )}
          </div>
        </Modal>
      </section>
    </div>
  )
}

const CheckboxWithState = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex flex-col gap-3 p-4 border rounded-lg bg-white shadow-sm max-w-sm">
      <h3 className="text-sm font-semibold text-gray-900">Controlled State</h3>
      <div className="flex items-center justify-between">
        <Checkbox label={checked ? "Active" : "Inactive"} checked={checked} onChange={(c) => setChecked(c)} />
        <Button size="xs" variant="secondary" onClick={() => setChecked(!checked)}>
          Toggle State
        </Button>
      </div>
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border">
        Current state: <span className={checked ? "text-green-600 font-bold" : "text-gray-600"}>{String(checked)}</span>
      </div>
    </div>
  )
}

export const Components = () => {
  return (
    <div className="flex flex-col gap-8 p-8 w-full max-w-4xl mx-auto pb-20 overflow-y-auto h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold border-b pb-2">Button Component</h1>
        <p className="text-gray-500">Comprehensive display of all Button props.</p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="xs">Extra Small (xs)</Button>
          <Button size="sm">Small (sm)</Button>
          <Button size="md">Medium (md)</Button>
          <Button size="lg">Large (lg)</Button>
          <Button size="xl">Extra Large (xl)</Button>
        </div>
      </section>

      {/* Shapes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Shapes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button shape="rounded">Rounded (Default)</Button>
          <Button shape="square">Square</Button>
          <Button shape="pill">Pill</Button>
        </div>
      </section>

      {/* Shadows */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Shadows</h2>
        <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg border">
          <Button shadow="none" variant="secondary">
            No Shadow
          </Button>
          <Button shadow="sm" variant="secondary">
            Small
          </Button>
          <Button shadow="md" variant="secondary">
            Medium
          </Button>
          <Button shadow="lg" variant="secondary">
            Large
          </Button>
          <Button shadow="xl" variant="secondary">
            Extra Large
          </Button>
        </div>
      </section>

      {/* Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Icons & Content</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button iconStart={<Icon />}>Icon Start</Button>
          <Button iconEnd={<Icon />}>Icon End</Button>
          <Button iconStart={<Icon />} iconEnd={<Icon />}>
            Both Icons
          </Button>
          <div className="flex items-center gap-2 border-l pl-4">
            <span className="text-sm text-gray-500">Icon Only:</span>
            <Button iconOnly iconStart={<Icon />} aria-label="Star" />
            <Button iconOnly iconStart={<Icon />} shape="pill" aria-label="Star" />
            <Button iconOnly iconStart={<Icon />} size="xl" aria-label="Star" />
          </div>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button loading loadingText="Saving...">
            Loading Text
          </Button>
          <Button
            loading
            loadingComponent={<span className="animate-spin text-lg leading-none">↻</span>}
            loadingText="Custom Spinner"
          >
            Custom
          </Button>
        </div>
      </section>

      {/* Animation Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Press Animations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-600">Strengths</h3>
            <div className="flex gap-2">
              <Button pressAnimationStyle="scale" pressAnimationStrength="light">
                Light
              </Button>
              <Button pressAnimationStyle="scale" pressAnimationStrength="medium">
                Medium
              </Button>
              <Button pressAnimationStyle="scale" pressAnimationStrength="strong">
                Strong
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-600">Durations & Styles</h3>
            <div className="flex gap-2">
              <Button pressAnimationStyle="none">No Animation</Button>
              <Button pressAnimationDuration="short">Short</Button>
              <Button pressAnimationDuration="long">Long</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Misc */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Miscellaneous</h2>
        <div className="space-y-4 max-w-md">
          <Button fullWidth>Full Width Button</Button>
          <div className="flex gap-4">
            <Button className="bg-pink-500 hover:bg-pink-600 focus-visible:ring-pink-500">Custom ClassName</Button>
            <Button as="a" href="#" target="_blank" variant="secondary">
              Rendered as &lt;a&gt; tag
            </Button>
          </div>
          <Button pressAnimationStyle="ripple">Ripple Effect</Button>
        </div>
      </section>

      <div className="border-t my-8"></div>

      <div className="space-y-2 unreset">
        <h1 className="text-3xl font-bold border-b pb-2">TextInput Component</h1>
        <p className="text-gray-500">Comprehensive display of all TextInput props.</p>
      </div>

      {/* Input Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="grid gap-4 max-w-md">
          <TextInput label="Small Input (sm)" size="sm" placeholder="Type here..." />
          <TextInput label="Medium Input (md)" size="md" placeholder="Type here..." />
          <TextInput label="Large Input (lg)" size="lg" placeholder="Type here..." />
          <TextInput label="Extra Large Input (xl)" size="xl" placeholder="Type here..." />
        </div>
      </section>

      {/* States/Validation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Validation & States</h2>
        <div className="grid gap-4 max-w-md">
          <TextInput label="With Helper Text" helpText="This is some helpful text explaining the input." />
          <TextInput label="Error State (String)" error="This field is required" defaultValue="Invalid value" />
          <TextInput
            label="Error State (Boolean)"
            error={true}
            helpText="Error prop is true, so this is red."
            defaultValue="Invalid value"
          />
          <TextInput label="Disabled Input" disabled defaultValue="You cannot edit this content" />
        </div>
      </section>

      {/* Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Icons</h2>
        <div className="grid gap-4 max-w-md">
          <TextInput label="Icon Start" iconStart={<Icon />} placeholder="Search..." />
          <TextInput label="Icon End" iconEnd={<Icon />} placeholder="Search..." />
          <TextInput label="Both Icons" iconStart={<Icon />} iconEnd={<Icon />} placeholder="Enter amount..." />
        </div>
      </section>

      {/* Layout & Shadows */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Layout & Styles</h2>
        <div className="grid gap-6 max-w-2xl">
          <div className="p-4 bg-gray-50 rounded-lg space-y-4 border">
            <h3 className="font-medium text-sm text-gray-600">Shadows</h3>
            <TextInput label="Shadow SM" shadow="sm" placeholder="Small shadow" className="bg-white" />
            <TextInput label="Shadow MD" shadow="md" placeholder="Medium shadow" className="bg-white" />
            <TextInput label="Shadow LG" shadow="lg" placeholder="Large shadow" className="bg-white" />
          </div>
        </div>
      </section>

      {/* Multiline */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Multiline (Textarea)</h2>
        <div className="max-w-md">
          <TextInput
            label="Bio"
            multiline
            rows={4}
            placeholder="Tell us about yourself..."
            helpText="This uses the 'multiline' prop to render a textarea."
          />
        </div>
      </section>

      {/* Animation Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Animations Check</h2>
        <div className="max-w-md space-y-4">
          <TextInput label="Floating Label" placeholder="Focus me to see float..." />
          <TextInput label="Error Shake" error="I am shaking!" defaultValue="Invalid Input" />
          <TextInput
            label="Delayed Error"
            error={!false} // Static true for demo, but implies logic
            helpText="Shows error reveal animation on mount"
          />
        </div>
      </section>

      {/* Full Width */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Full Width Container</h2>
        <div className="w-full bg-slate-100 p-4 rounded border">
          <TextInput
            label="Full Width Input"
            fullWidth
            placeholder="This input spans the full width of its container using the 'fullWidth' prop."
          />
        </div>
      </section>

      <div className="border-t my-8"></div>

      <div className="space-y-2 unreset">
        <h1 className="text-3xl font-bold border-b pb-2">Checkbox Component</h1>
        <p className="text-gray-500">Comprehensive display of all Checkbox props.</p>
      </div>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-col gap-4">
          <Checkbox label="Small Checkbox (sm)" size="sm" defaultChecked />
          <Checkbox label="Medium Checkbox (md)" size="md" defaultChecked />
          <Checkbox label="Large Checkbox (lg)" size="lg" defaultChecked />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-col gap-4">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled Unchecked" disabled />
          <Checkbox label="Disabled Checked" disabled defaultChecked />
          <Checkbox label="Disabled Indeterminate" disabled indeterminate />
        </div>
      </section>

      {/* Controlled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Controlled State</h2>
        <CheckboxWithState />
      </section>

      {/* Validation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Validation</h2>
        <div className="flex flex-col gap-4">
          <Checkbox label="Error (Boolean)" error defaultChecked />
          <Checkbox label="Error (String)" error="You must agree to the terms" />
          <div className="w-fit">
            <Checkbox label="Error with Label Left" labelPlacement="left" error="Required field" />
          </div>
        </div>
      </section>

      {/* Label Placement */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Label Placement</h2>
        <div className="flex flex-col gap-4 items-start">
          <Checkbox label="Label on Right (Default)" />
          <Checkbox label="Label on Left" labelPlacement="left" />
        </div>
      </section>

      <div className="border-t my-8"></div>

      <div className="space-y-2 unreset">
        <h1 className="text-3xl font-bold border-b pb-2">Radio Component</h1>
        <p className="text-gray-500">Comprehensive display of all Radio props.</p>
      </div>

      {/* Basic Group */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Group</h2>
        <div className="flex flex-col gap-2">
          <Radio name="fruit" value="apple" label="Apple" defaultChecked />
          <Radio name="fruit" value="banana" label="Banana" />
          <Radio name="fruit" value="orange" label="Orange" />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-col gap-4">
          <Radio name="size-demo" value="sm" label="Small Radio (sm)" size="sm" defaultChecked />
          <Radio name="size-demo" value="md" label="Medium Radio (md)" size="md" />
          <Radio name="size-demo" value="lg" label="Large Radio (lg)" size="lg" />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-col gap-4">
          <Radio name="state-1" label="Unchecked" />
          <Radio name="state-2" label="Checked" defaultChecked />
          <Radio name="state-3" label="Disabled Unchecked" disabled />
          <Radio name="state-4" label="Disabled Checked" disabled defaultChecked />
        </div>
      </section>

      {/* Validation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Validation</h2>
        <div className="flex flex-col gap-4">
          <Radio name="val-1" label="Error (Boolean)" error defaultChecked />
          <Radio name="val-2" label="Error (String)" error="Invalid selection" />
          <div className="w-fit">
            <Radio name="val-3" label="Error with Label Left" labelPlacement="left" error="Required choice" />
          </div>
        </div>
      </section>

      {/* Label Placement */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Label Placement</h2>
        <div className="flex flex-col gap-4 items-start">
          <Radio name="lp" label="Label on Right (Default)" />
          <Radio name="lp" label="Label on Left" labelPlacement="left" />
        </div>
      </section>

      <div className="border-t my-8"></div>

      <div className="space-y-2 unreset">
        <h1 className="text-3xl font-bold border-b pb-2">Select Component</h1>
        <p className="text-gray-500">Comprehensive display of all Select props.</p>
      </div>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-col gap-4 max-w-xs">
          <Select label="Small (sm)" size="sm" options={[{ label: "Small", value: "s" }]} placeholder="Select small..." />
          <Select label="Medium (md)" size="md" options={[{ label: "Medium", value: "m" }]} placeholder="Select medium..." />
          <Select label="Large (lg)" size="lg" options={[{ label: "Large", value: "l" }]} placeholder="Select large..." />
          <Select
            label="Extra Large (xl)"
            size="xl"
            options={[{ label: "Extra Large", value: "xl" }]}
            placeholder="Select extra large..."
          />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States & Validation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Standard"
            options={[
              { label: "Option 1", value: 1 },
              { label: "Option 2", value: 2 }
            ]}
          />
          <Select label="With Help Text" helpText="Please select the best option." options={[]} />
          <Select label="Error (String)" error="Selection is required" options={[]} />
          <Select label="Error (Boolean)" error helpText="This field has an error." options={[]} />
          <Select label="Disabled" disabled placeholder="Cannot select" options={[]} />
          <Select
            label="With Default Value"
            defaultValue={2}
            options={[
              { label: "Option 1", value: 1 },
              { label: "Option 2", value: 2 }
            ]}
          />
        </div>
      </section>

      {/* Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Icons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Icon Start" iconStart={<Icon />} options={[{ label: "Option 1", value: 1 }]} />
          <Select
            label="Options with Icons"
            options={[
              { label: "Star", value: "star", icon: <Icon /> },
              { label: "Heart", value: "heart", icon: <span className="text-red-500">♥</span> },
              { label: "Disabled Option", value: "dis", disabled: true }
            ]}
            placeholder="Pick an icon..."
          />
        </div>
      </section>

      {/* Styles */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Styles & Layout</h2>
        <div className="space-y-6">
          <Select label="Label Placement Left" labelPlacement="left" options={[{ label: "A", value: "a" }]} className="w-48" />

          <div className="bg-slate-50 p-4 rounded border space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Shadows</h3>
            <div className="grid grid-cols-2 gap-4">
              <Select shadow="none" placeholder="No Shadow" options={[]} className="bg-white" />
              <Select shadow="md" placeholder="Medium Shadow" options={[]} className="bg-white" />
              <Select shadow="xl" placeholder="Extra Large Shadow" options={[]} className="bg-white" />
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded border">
            <Select
              label="Full Width Select"
              fullWidth
              options={[{ label: "Wide Option", value: 1 }]}
              placeholder="I span the whole container"
            />
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Advanced Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Select
            label="Searchable Select"
            searchable
            placeholder="Type to filter..."
            options={[
              { label: "React", value: "react" },
              { label: "Vue", value: "vue" },
              { label: "Angular", value: "angular" },
              { label: "Svelte", value: "svelte" },
              { label: "Solid", value: "solid" },
              { label: "Qwik", value: "qwik" }
            ]}
          />

          <Select
            label="Multiple Select"
            multiple
            placeholder="Select multiple items..."
            defaultValue={["react", "vue"]}
            options={[
              { label: "React", value: "react" },
              { label: "Vue", value: "vue" },
              { label: "Angular", value: "angular" },
              { label: "Svelte", value: "svelte" }
            ]}
          />

          <Select
            label="Searchable + Multiple"
            searchable
            multiple
            fullWidth
            placeholder="Type to search & select multiple..."
            options={[
              { label: "Apple", value: "apple" },
              { label: "Banana", value: "banana" },
              { label: "Cherry", value: "cherry" },
              { label: "Durian", value: "durian" },
              { label: "Elderberry", value: "elderberry" },
              { label: "Fig", value: "fig" },
              { label: "Grape", value: "grape" }
            ]}
          />

          <AsyncSelect />
        </div>
      </section>

      <div className="border-t my-8"></div>

      <div className="space-y-2 unreset">
        <h1 className="text-3xl font-bold border-b pb-2">Slider Component</h1>
        <p className="text-gray-500">Comprehensive display of all Slider props.</p>
      </div>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-col gap-8 max-w-md">
          <Slider label="Small (sm)" size="sm" defaultValue={25} />
          <Slider label="Medium (md)" size="md" defaultValue={50} />
          <Slider label="Large (lg)" size="lg" defaultValue={75} />
        </div>
      </section>

      {/* Configurations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Configurations</h2>
        <div className="flex flex-col gap-8 max-w-md">
          <Slider label="Custom Range (0-10)" min={0} max={10} defaultValue={5} showValue />
          <Slider label="Step (10)" min={0} max={100} step={10} defaultValue={30} showValue />
          <Slider
            label="Currency Formatter"
            min={0}
            max={1000}
            defaultValue={450}
            showValue
            valueFormatter={(val) => `$${val}`}
          />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States & Validation</h2>
        <div className="flex flex-col gap-8 max-w-md">
          <Slider label="With Help Text" defaultValue={60} helpText="Adjust the volume level." />
          <Slider label="Error State" defaultValue={0} error="Invalid configuration" />
          <Slider label="Disabled" defaultValue={40} disabled />
        </div>
      </section>

      {/* Layout */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Layout</h2>
        <div className="w-full bg-slate-50 p-4 rounded border">
          <Slider label="Full Width" fullWidth defaultValue={50} showValue />
        </div>
      </section>

      <div className="border-t my-8"></div>

      <div className="space-y-2 unreset">
        <h1 className="text-3xl font-bold border-b pb-2">Switch Component</h1>
        <p className="text-gray-500">Comprehensive display of all Switch props.</p>
      </div>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-col gap-4">
          <Switch label="Small (sm)" size="sm" defaultChecked />
          <Switch label="Medium (md)" size="md" defaultChecked />
          <Switch label="Large (lg)" size="lg" defaultChecked />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-col gap-4">
          <Switch label="Unchecked" />
          <Switch label="Checked" defaultChecked />
          <Switch label="Disabled Unchecked" disabled />
          <Switch label="Disabled Checked" disabled defaultChecked />
        </div>
      </section>

      {/* Validation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Validation & Help Text</h2>
        <div className="flex flex-col gap-4">
          <Switch label="With Help Text" defaultChecked helpText="This option enables aggressive caching." />
          <Switch label="Error (Boolean)" error defaultChecked />
          <Switch label="Error (String)" error="Failed to sync" />
          <div className="w-fit">
            <Switch label="Error with Label Left" labelPlacement="left" error="Connection failed" />
          </div>
        </div>
      </section>

      {/* Label Placement */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Label Placement</h2>
        <div className="flex flex-col gap-4 items-start">
          <Switch label="Label on Right (Default)" />
          <Switch label="Label on Left" labelPlacement="left" />
        </div>
      </section>

      <div className="border-t my-8"></div>

      <div className="space-y-2 unreset">
        <h1 className="text-3xl font-bold border-b pb-2">Text Component</h1>
        <p className="text-gray-500">Comprehensive display of all Text props and typography variants.</p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex flex-col gap-4">
          <Text variant="heading" size="lg">Heading Variant</Text>
          <Text variant="subheading" size="md">Subheading Variant</Text>
          <Text variant="body" size="md">Body Variant - The default variant for regular text content</Text>
          <Text variant="caption" size="sm">Caption Variant - Typically used for small descriptive text</Text>
          <Text variant="label" size="sm">Label Variant - Used for form labels</Text>
          <Text variant="overline" size="xs" transform="uppercase">Overline Variant</Text>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-col gap-3">
          <Text size="xs">Extra Small (xs)</Text>
          <Text size="sm">Small (sm)</Text>
          <Text size="md">Medium (md)</Text>
          <Text size="lg">Large (lg)</Text>
          <Text size="xl">Extra Large (xl)</Text>
          <Text size="2xl">2X Large (2xl)</Text>
          <Text size="3xl">3X Large (3xl)</Text>
        </div>
      </section>

      {/* Heading Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Heading Scale</h2>
        <div className="flex flex-col gap-4">
          <Text variant="heading" size="3xl" as="h1">H1 - Hero Heading</Text>
          <Text variant="heading" size="2xl" as="h2">H2 - Main Section Heading</Text>
          <Text variant="heading" size="xl" as="h3">H3 - Subsection Heading</Text>
          <Text variant="heading" size="lg" as="h4">H4 - Component Heading</Text>
          <Text variant="heading" size="md" as="h5">H5 - Small Component Heading</Text>
          <Text variant="heading" size="sm" as="h6">H6 - Smallest Heading</Text>
        </div>
      </section>

      {/* Weights */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Font Weights</h2>
        <div className="flex flex-col gap-2">
          <Text weight="light">Light Weight (300)</Text>
          <Text weight="regular">Regular Weight (400)</Text>
          <Text weight="medium">Medium Weight (500)</Text>
          <Text weight="semibold">Semibold Weight (600)</Text>
          <Text weight="bold">Bold Weight (700)</Text>
          <Text weight="extrabold">Extra Bold Weight (800)</Text>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Colors</h2>
        <div className="flex flex-col gap-2">
          <Text color="default">Default Text Color</Text>
          <Text color="primary">Primary Color (Indigo)</Text>
          <Text color="secondary">Secondary Color (Slate)</Text>
          <Text color="success">Success Color (Green)</Text>
          <Text color="warning">Warning Color (Amber)</Text>
          <Text color="error">Error Color (Red)</Text>
          <Text color="muted">Muted Color (Light Slate)</Text>
        </div>
      </section>

      {/* Alignment */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Text Alignment</h2>
        <div className="flex flex-col gap-4 border rounded-lg p-4 bg-slate-50">
          <Text align="left" className="bg-white p-2 rounded border">Left Aligned Text (Default)</Text>
          <Text align="center" className="bg-white p-2 rounded border">Center Aligned Text</Text>
          <Text align="right" className="bg-white p-2 rounded border">Right Aligned Text</Text>
          <Text align="justify" className="bg-white p-2 rounded border">
            Justified text aligns to both left and right margins, adding extra space between words as necessary.
            This creates a clean, formal appearance often used in print media and professional documents.
          </Text>
        </div>
      </section>

      {/* Text Transform */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Text Transform</h2>
        <div className="flex flex-col gap-2">
          <Text transform="none">No Transform Applied</Text>
          <Text transform="uppercase">uppercase transform</Text>
          <Text transform="lowercase">LOWERCASE TRANSFORM</Text>
          <Text transform="capitalize">capitalize each word transform</Text>
        </div>
      </section>

      {/* Text Styles */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Text Styles</h2>
        <div className="flex flex-col gap-2">
          <Text italic>Italic Text Style</Text>
          <Text underline>Underlined Text Style</Text>
          <Text strikethrough>Strikethrough Text Style</Text>
          <Text italic underline weight="semibold">Combined: Italic + Underline + Semibold</Text>
        </div>
      </section>

      {/* Truncation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Truncation & Wrapping</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Single Line Truncate</label>
            <div className="border rounded p-2 bg-white">
              <Text truncate>
                This is a very long text that will be truncated with an ellipsis when it exceeds the container width
              </Text>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Multi-line Truncate (2 lines)</label>
            <div className="border rounded p-2 bg-white">
              <Text truncate={2}>
                This is a longer text that will be truncated after two lines. The text will show an ellipsis after the second line,
                helping to maintain a clean layout while giving users a preview of the content.
              </Text>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Multi-line Truncate (3 lines)</label>
            <div className="border rounded p-2 bg-white">
              <Text truncate={3}>
                This text demonstrates three-line truncation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">No Wrap</label>
            <div className="border rounded p-2 bg-white overflow-x-auto">
              <Text noWrap>
                This text will not wrap to the next line, creating a horizontal scroll instead if the content is too long
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Polymorphic Rendering */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Polymorphic Rendering (Semantic HTML)</h2>
        <div className="flex flex-col gap-2">
          <Text as="h1" variant="heading" size="2xl">Rendered as &lt;h1&gt;</Text>
          <Text as="h2" variant="heading" size="xl">Rendered as &lt;h2&gt;</Text>
          <Text as="p" variant="body">Rendered as &lt;p&gt; (paragraph)</Text>
          <Text as="span" variant="caption" size="sm">Rendered as &lt;span&gt; (inline)</Text>
          <Text as="label" htmlFor="demo-input" variant="label" size="sm" weight="medium">
            Rendered as &lt;label&gt; with htmlFor
          </Text>
          <Text as="div" className="bg-blue-50 p-3 rounded border border-blue-200">
            Rendered as &lt;div&gt; with custom styling
          </Text>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real World Examples</h2>
        
        <div className="space-y-6">
          {/* Article Layout */}
          <div className="p-6 border rounded-lg bg-white shadow-sm space-y-3">
            <Text variant="overline" size="xs" color="primary" transform="uppercase" weight="semibold">
              Technology
            </Text>
            <Text variant="heading" size="xl" as="h3">
              Building Modern Web Applications
            </Text>
            <Text variant="body" size="sm" color="secondary">
              By John Doe • Published on Dec 25, 2023 • 5 min read
            </Text>
            <Text variant="body" size="md" color="default">
              Learn how to create scalable and performant web applications using the latest frameworks and best practices.
              This comprehensive guide covers everything from initial setup to deployment.
            </Text>
            <Text variant="caption" size="sm" color="muted" italic>
              Last updated: January 15, 2024
            </Text>
          </div>

          {/* Card Layout */}
          <div className="p-6 border rounded-lg bg-linear-to-br from-indigo-50 to-purple-50">
            <Text variant="heading" size="lg" color="primary" weight="bold">
              Premium Plan
            </Text>
            <Text variant="body" size="md" className="mt-2 mb-4">
              Everything you need to grow your business
            </Text>
            <Text variant="heading" size="3xl" weight="extrabold" color="default">
              $99
              <Text as="span" variant="body" size="md" color="secondary" weight="regular">/month</Text>
            </Text>
            <ul className="mt-4 space-y-2">
              <Text as="li" variant="body" size="sm">✓ Unlimited projects</Text>
              <Text as="li" variant="body" size="sm">✓ Advanced analytics</Text>
              <Text as="li" variant="body" size="sm">✓ Priority support</Text>
            </ul>
          </div>

          {/* Alert Box */}
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
            <Text variant="label" size="sm" color="warning" weight="semibold">
              ⚠ Warning
            </Text>
            <Text variant="body" size="sm" color="warning" className="mt-1">
              Your subscription will expire in 3 days. Please update your payment information to avoid service interruption.
            </Text>
          </div>
        </div>
      </section>

      {/* Animation Support */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Animation Support (Framer Motion)</h2>
        <div className="flex flex-col gap-4">
          <Text
            variant="heading"
            size="lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Animated Heading (Fade In from Top)
          </Text>
          <Text
            variant="body"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Animated Body Text (Slide In from Left)
          </Text>
          <Text
            variant="caption"
            size="sm"
            color="primary"
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer inline-block w-fit"
          >
            Hover me for scale animation
          </Text>
        </div>
      </section>

      <div className="border-t my-8"></div>

      <Modals />
    </div>
  )
}
