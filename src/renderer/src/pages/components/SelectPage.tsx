import ZSelect, { ZSelectItem } from "@renderer/components/primary/ZSelect";
import ZText from "@renderer/components/primary/ZText";
import { ReactNode, useEffect, useState } from "react";

const ShowcaseSection = ({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) => (
  <section
    className={`flex flex-col gap-4 p-6 border border-slate-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
  >
    <div className="pb-2 border-b border-slate-100 mb-2">
      <ZText variant="subheading" size="md" weight="semibold" className="text-slate-800">
        {title}
      </ZText>
    </div>
    {children}
  </section>
)

const BASIC_OPTIONS: ZSelectItem<string>[] = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
  { label: "Option 3", value: "opt3" },
  { label: "Option 4", value: "opt4" },
  { label: "Option 5", value: "opt5" }
]

const FRAMEWORK_OPTIONS: ZSelectItem<string>[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" }
]

const ICON_OPTIONS: ZSelectItem<string>[] = [
  { label: "Home", value: "home", icon: <i className="fa-solid fa-house" /> },
  { label: "Settings", value: "settings", icon: <i className="fa-solid fa-cog" /> },
  { label: "User", value: "user", icon: <i className="fa-solid fa-user" /> },
  { label: "Favorites", value: "favorites", icon: <i className="fa-solid fa-star" /> }
]

const ASYNC_DATA: ZSelectItem<string>[] = Array.from({ length: 50 }, (_, i) => ({
  label: `Server Option ${i + 1}`,
  value: `server-${i + 1}`
}))

const SelectPage = () => {
  const [basicValue, setBasicValue] = useState<string | string[] | undefined>()
  const [multiValue, setMultiValue] = useState<string | string[] | undefined>([])
  const [searchValue, setSearchValue] = useState<string | string[] | undefined>()

  // Async Search State
  const [asyncValue, setAsyncValue] = useState<string | string[] | undefined>()
  const [asyncOptions, setAsyncOptions] = useState<ZSelectItem<string>[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Simulate async search
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      const filtered = ASYNC_DATA.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
      setAsyncOptions(filtered)
      setIsLoading(false)
    }, 800) // 800ms delay

    return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Select Dropdown
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZSelect</code> component
          provides a flexible dropdown selection. It supports single/multi select, search, async loading, and various styling
          options.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-8">
        {/* Basic Usage */}
        <ShowcaseSection title="Basic Usage">
          <div className="flex flex-col gap-6">
            <ZSelect
              label="Simple Select"
              options={BASIC_OPTIONS}
              value={basicValue}
              onChange={setBasicValue}
              placeholder="Choose an option"
              fullWidth
            />
            <ZSelect
              label="With Default Value"
              options={BASIC_OPTIONS}
              defaultValue="opt2"
              placeholder="Choose an option"
              fullWidth
            />
          </div>
        </ShowcaseSection>

        {/* Multiple Selection */}
        <ShowcaseSection title="Multiple Selection">
          <div className="flex flex-col gap-6">
            <ZSelect
              label="Select Frameworks"
              options={FRAMEWORK_OPTIONS}
              value={multiValue}
              onChange={setMultiValue}
              placeholder="Pick your favorite(s)"
              multiple
              fullWidth
            />
            <div className="text-xs text-slate-500 bg-slate-100 p-2 rounded wrap-break-word">
              Selected: {JSON.stringify(multiValue)}
            </div>
          </div>
        </ShowcaseSection>

        {/* Sizes */}
        <ShowcaseSection title="Sizes">
          <div className="flex flex-col gap-4">
            <ZSelect size="sm" label="Small" options={BASIC_OPTIONS} placeholder="Small Select" fullWidth />
            <ZSelect size="md" label="Medium" options={BASIC_OPTIONS} placeholder="Medium Select" fullWidth />
            <ZSelect size="lg" label="Large" options={BASIC_OPTIONS} placeholder="Large Select" fullWidth />
          </div>
        </ShowcaseSection>

        {/* States & Validation */}
        <ShowcaseSection title="States & Validation">
          <div className="flex flex-col gap-6">
            <ZSelect label="Disabled Select" options={BASIC_OPTIONS} disabled placeholder="Cannot select" fullWidth />
            <ZSelect label="Error State" options={BASIC_OPTIONS} error="This field is required" fullWidth />
            <ZSelect
              label="With Helper Text"
              options={BASIC_OPTIONS}
              helpText="Select the best option for your case."
              fullWidth
            />
          </div>
        </ShowcaseSection>

        {/* With Icons */}
        <ShowcaseSection title="With Icons">
          <div className="flex flex-col gap-6">
            <ZSelect
              label="Icon in Trigger"
              options={BASIC_OPTIONS}
              iconStart={<i className="fa-solid fa-globe" />}
              placeholder="Select Region"
              fullWidth
            />
            <ZSelect label="Options with Icons" options={ICON_OPTIONS} placeholder="Select Menu Item" fullWidth />
          </div>
        </ShowcaseSection>

        {/* Searchable */}
        <ShowcaseSection title="Searchable (Local)">
          <div className="flex flex-col gap-6">
            <ZSelect
              label="Find a Framework"
              options={FRAMEWORK_OPTIONS}
              value={searchValue}
              onChange={setSearchValue}
              searchable
              placeholder="Type to search..."
              fullWidth
            />
          </div>
        </ShowcaseSection>

        {/* Async Search */}
        <ShowcaseSection title="Async Data & Search" className="md:col-span-2 xln:col-span-3">
          <div className="flex flex-col gap-6">
            <ZText variant="body" size="sm" color="secondary">
              Simulates a server fetch with 800ms delay. Type to filter options from the server.
            </ZText>
            <div className="flex gap-4 items-end">
              <ZSelect
                label="Server Search"
                options={asyncOptions}
                value={asyncValue}
                onChange={setAsyncValue}
                onSearchChange={setSearchQuery}
                searchable
                isLoading={isLoading}
                placeholder="Search server data..."
                containerClassName="w-full max-w-md"
                fullWidth
              />
              <div className="text-sm text-slate-500 pb-2">
                {isLoading ? "Fetching..." : `Found ${asyncOptions.length} results`}
              </div>
            </div>
          </div>
        </ShowcaseSection>
      </div>

      {/* Spacer for scrolling */}
      <div style={{ height: "300px", flexShrink: 0 }}></div>
    </div>
  )
}

export default SelectPage
