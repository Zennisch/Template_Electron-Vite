import Button from "./components/primary/Button"
import Checkbox from "./components/primary/Checkbox"
import TextInput from "./components/primary/TextInput"

// Simple icon placeholder
const Icon = () => <span className="text-current">★</span>

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
          <Button variant="danger">Danger</Button>
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
          <Button shadow="none" variant="secondary">No Shadow</Button>
          <Button shadow="sm" variant="secondary">Small</Button>
          <Button shadow="md" variant="secondary">Medium</Button>
          <Button shadow="lg" variant="secondary">Large</Button>
          <Button shadow="xl" variant="secondary">Extra Large</Button>
        </div>
      </section>

      {/* Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Icons & Content</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button iconStart={<Icon />}>Icon Start</Button>
          <Button iconEnd={<Icon />}>Icon End</Button>
          <Button iconStart={<Icon />} iconEnd={<Icon />}>Both Icons</Button>
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
          <Button loading loadingText="Saving...">Loading Text</Button>
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
                <Button pressAnimationStyle="scale" pressAnimationStrength="light">Light</Button>
                <Button pressAnimationStyle="scale" pressAnimationStrength="medium">Medium</Button>
                <Button pressAnimationStyle="scale" pressAnimationStrength="strong">Strong</Button>
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
             <Button className="bg-pink-500 hover:bg-pink-600 focus-visible:ring-pink-500">
                Custom ClassName
             </Button>
             <Button as="a" href="#" target="_blank" variant="secondary">
                Rendered as &lt;a&gt; tag
             </Button>
          </div>
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
           <TextInput 
             label="Error State (String)" 
             error="This field is required" 
             defaultValue="Invalid value" 
           />
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
           <TextInput 
             label="Horizontal Layout (labelPlacement='left')" 
             labelPlacement="left" 
             placeholder="Labels are on the left" 
           />
           
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

    </div>
  )
}
