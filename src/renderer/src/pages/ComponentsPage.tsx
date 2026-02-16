import ZButton from "@renderer/components/primary/ZButton"
import ZSelect, { ZSelectItem } from "@renderer/components/primary/ZSelect"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ButtonPage from "./components/ButtonPage"
import CheckboxPage from "./components/CheckboxPage"
import ModalPage from "./components/ModalPage"
import RadioPage from "./components/RadioPage"
import SelectPage from "./components/SelectPage"
import SliderPage from "./components/SliderPage"
import SwitchPage from "./components/SwitchPage"
import TextInputPage from "./components/TextInputPage"
import TextPage from "./components/TextPage"

type ComponentType = "text" | "button" | "checkbox" | "radio" | "switch" | "text-input" | "select" | "slider" | "modal"

const COMPONENT_OPTIONS: ZSelectItem<ComponentType>[] = [
  { label: "Text", value: "text" },
  { label: "Button", value: "button" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Radio", value: "radio" },
  { label: "Switch", value: "switch" },
  { label: "Text Input", value: "text-input" },
  { label: "Select", value: "select" },
  { label: "Slider", value: "slider" },
  { label: "Modal", value: "modal" }
]

const ComponentsPage = () => {
  const navigation = useNavigate()
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>("text")

  const renderComponentPage = () => {
    switch (selectedComponent) {
      case "text":
        return <TextPage />
      case "button":
        return <ButtonPage />
      case "checkbox":
        return <CheckboxPage />
      case "radio":
        return <RadioPage />
      case "switch":
        return <SwitchPage />
      case "text-input":
        return <TextInputPage />
      case "select":
        return <SelectPage />
      case "slider":
        return <SliderPage />
      case "modal":
        return <ModalPage />
      default:
        return (
          <div className="flex h-full items-center justify-center text-slate-500">
            Showcase for {selectedComponent} is under construction
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Left Sidebar */}
      <aside className="flex w-1/4 min-w-62.5 flex-col gap-6 border-r border-slate-200 bg-white p-6 shadow-sm z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Components</h2>
          <ZButton size="sm" variant="ghost" onClick={() => navigation("/")} iconStart={<i className="fa-solid fa-house" />}>
            Home
          </ZButton>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-slate-500">Select Component</label>
          <ZSelect
            options={COMPONENT_OPTIONS}
            value={selectedComponent}
            onChange={(val) => setSelectedComponent(val as ComponentType)}
            placeholder="Choose a component..."
            fullWidth
          />
        </div>

        <div className="mt-auto rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          <p>Select a component from the list above to view its showcase and properties.</p>
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 overflow-hidden bg-slate-50/50">{renderComponentPage()}</main>
    </div>
  )
}

export default ComponentsPage
