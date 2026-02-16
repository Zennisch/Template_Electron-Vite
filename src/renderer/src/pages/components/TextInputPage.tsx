import ZText from "@renderer/components/primary/ZText"
import ZTextInput from "@renderer/components/primary/ZTextInput"
import ShowcaseSection from "@renderer/pages/components/ShowcaseSection"
import { useState } from "react"

const TextInputPage = () => {
  const [value, setValue] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Text Input
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZTextInput</code> component
          allows users to enter text. It supports various sizes, states, and validation messages, including multiline text
          areas.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-8">
        <ShowcaseSection title="Basic Usage">
          <div className="flex flex-col gap-6">
            <ZTextInput label="Username" placeholder="Enter your username" />
            <ZTextInput label="Email" placeholder="john@example.com" type="email" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Controlled State">
          <div className="flex flex-col gap-4">
            <ZTextInput
              label="Controlled Input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type something..."
            />
            <div className="text-sm text-slate-500 bg-slate-50 p-2 rounded break-all">
              Output: <span className="font-mono text-indigo-600">{value}</span>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Sizes">
          <div className="flex flex-col gap-6">
            <ZTextInput size="sm" label="Small Input" placeholder="text-sm" />
            <ZTextInput size="md" label="Medium Input (Default)" placeholder="text-base" />
            <ZTextInput size="lg" label="Large Input" placeholder="text-lg" />
            <ZTextInput size="xl" label="Extra Large Input" placeholder="text-xl" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="States & Validation">
          <div className="flex flex-col gap-6">
            <ZTextInput label="Disabled Input" disabled value="Cannot edit this" />
            <ZTextInput label="With Helper Text" helpText="We'll never share your email with anyone else." />
            <ZTextInput label="With Error" error="Invalid email address" defaultValue="invalid-email" />
            <ZTextInput label="Read Only" readOnly defaultValue="Read only content" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Icons">
          <div className="flex flex-col gap-6">
            <ZTextInput
              label="With Start Icon"
              iconStart={<i className="fa-solid fa-user text-slate-400" />}
              placeholder="Username"
            />
            <ZTextInput
              label="With End Icon"
              iconEnd={<i className="fa-solid fa-magnifying-glass text-slate-400" />}
              placeholder="Search..."
            />
            <ZTextInput
              label="Password Toggle"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconEnd={
                <i
                  className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-slate-400 cursor-pointer hover:text-indigo-500`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              }
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Multiline (Textarea)">
          <div className="flex flex-col gap-6">
            <ZTextInput multiline label="Bio" placeholder="Tell us about yourself" rows={3} />
            <ZTextInput multiline label="Comment" placeholder="Leave a comment..." rows={5} fullWidth />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Full Width" className="md:col-span-2">
          <ZTextInput fullWidth label="Full Width Input" placeholder="Stretches to fill container" />
        </ShowcaseSection>

        <ShowcaseSection title="Shadows" className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">
            <ZTextInput shadow="none" label="No Shadow" placeholder="shadow-none" />
            <ZTextInput shadow="sm" label="Small Shadow" placeholder="shadow-sm" />
            <ZTextInput shadow="md" label="Medium Shadow" placeholder="shadow-md" />
            <ZTextInput shadow="lg" label="Large Shadow" placeholder="shadow-lg" />
          </div>
        </ShowcaseSection>
      </div>
    </div>
  )
}

export default TextInputPage
