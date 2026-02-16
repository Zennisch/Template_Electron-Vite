import ZText from "@renderer/components/primary/ZText"
import ShowcaseSection from "@renderer/pages/components/ShowcaseSection"

const TextPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Typography
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZText</code> component is
          the foundation for all typography in the application, offering consistent variants, weights, and colors.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Variants Section */}
        <ShowcaseSection title="Variants" className="row-span-2">
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <ZText variant="heading" size="xl">
                Heading
              </ZText>
              <ZText variant="caption" color="muted">
                Used for page titles and major sections
              </ZText>
            </div>
            <div className="space-y-1">
              <ZText variant="subheading" size="lg">
                Subheading
              </ZText>
              <ZText variant="caption" color="muted">
                Used for subsection titles
              </ZText>
            </div>
            <div className="space-y-1">
              <ZText variant="body" size="md">
                Body
              </ZText>
              <ZText variant="caption" color="muted">
                The default text size for standard content
              </ZText>
            </div>
            <div className="space-y-1">
              <ZText variant="caption" size="sm">
                Caption
              </ZText>
              <ZText variant="caption" color="muted">
                Smaller text for hints and secondary info
              </ZText>
            </div>
            <div className="space-y-1">
              <ZText variant="label" size="sm">
                Label
              </ZText>
              <ZText variant="caption" color="muted">
                Used for form inputs and UI elements
              </ZText>
            </div>
            <div className="space-y-1">
              <ZText variant="overline" size="xs">
                Overline
              </ZText>
              <ZText variant="caption" color="muted">
                Used for eyebrows and small headers
              </ZText>
            </div>
          </div>
        </ShowcaseSection>

        {/* Colors Section */}
        <ShowcaseSection title="Colors">
          <div className="grid grid-cols-1 gap-3">
            {[
              { color: "default", label: "Default", bg: "bg-slate-900" },
              { color: "primary", label: "Primary", bg: "bg-indigo-600" },
              { color: "secondary", label: "Secondary", bg: "bg-slate-600" },
              { color: "success", label: "Success", bg: "bg-green-600" },
              { color: "warning", label: "Warning", bg: "bg-amber-600" },
              { color: "error", label: "Error", bg: "bg-red-600" },
              { color: "muted", label: "Muted", bg: "bg-slate-400" }
            ].map((item) => (
              <div
                key={item.color}
                className="flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${item.bg} ring-2 ring-offset-2 ring-transparent group-hover:ring-${item.bg.replace("bg-", "")}/30`}
                  ></div>
                  <ZText color={item.color as any} weight="medium">
                    {item.label}
                  </ZText>
                </div>
                <ZText variant="caption" className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                  {item.color}
                </ZText>
              </div>
            ))}
          </div>
        </ShowcaseSection>

        {/* Weights Section */}
        <ShowcaseSection title="Weights">
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between border-b border-dashed border-slate-100 pb-2">
              <ZText weight="light" size="lg">
                Light
              </ZText>
              <span className="text-xs text-slate-400 font-mono">300</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-dashed border-slate-100 pb-2">
              <ZText weight="regular" size="lg">
                Regular
              </ZText>
              <span className="text-xs text-slate-400 font-mono">400</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-dashed border-slate-100 pb-2">
              <ZText weight="medium" size="lg">
                Medium
              </ZText>
              <span className="text-xs text-slate-400 font-mono">500</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-dashed border-slate-100 pb-2">
              <ZText weight="semibold" size="lg">
                Semibold
              </ZText>
              <span className="text-xs text-slate-400 font-mono">600</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-dashed border-slate-100 pb-2">
              <ZText weight="bold" size="lg">
                Bold
              </ZText>
              <span className="text-xs text-slate-400 font-mono">700</span>
            </div>
            <div className="flex items-baseline justify-between">
              <ZText weight="extrabold" size="lg">
                Extrabold
              </ZText>
              <span className="text-xs text-slate-400 font-mono">800</span>
            </div>
          </div>
        </ShowcaseSection>

        {/* Alignment Section */}
        <ShowcaseSection title="Alignment" className="md:col-span-2 xl:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <ZText variant="label" size="xs" color="muted" className="uppercase tracking-wider">
                Left
              </ZText>
              <div className="bg-slate-100/50 p-4 rounded-lg border-2 border-dashed border-slate-200">
                <ZText align="left">Expected default behavior.</ZText>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <ZText variant="label" size="xs" color="muted" className="uppercase tracking-wider">
                Center
              </ZText>
              <div className="bg-slate-100/50 p-4 rounded-lg border-2 border-dashed border-slate-200">
                <ZText align="center">Centered content.</ZText>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <ZText variant="label" size="xs" color="muted" className="uppercase tracking-wider">
                Right
              </ZText>
              <div className="bg-slate-100/50 p-4 rounded-lg border-2 border-dashed border-slate-200">
                <ZText align="right">Aligned to the end.</ZText>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:col-span-3 mt-2">
              <ZText variant="label" size="xs" color="muted" className="uppercase tracking-wider">
                Justify
              </ZText>
              <div className="bg-slate-100/50 p-4 rounded-lg border-2 border-dashed border-slate-200">
                <ZText align="justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </ZText>
              </div>
            </div>
          </div>
        </ShowcaseSection>

        {/* Decorators Section */}
        <ShowcaseSection title="Decorators & Transforms">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="flex flex-col gap-1">
              <ZText variant="label" size="xs" color="muted">
                Italic
              </ZText>
              <ZText italic>Emphasized text</ZText>
            </div>
            <div className="flex flex-col gap-1">
              <ZText variant="label" size="xs" color="muted">
                Underline
              </ZText>
              <ZText underline>Important link-like</ZText>
            </div>
            <div className="flex flex-col gap-1">
              <ZText variant="label" size="xs" color="muted">
                Strikethrough
              </ZText>
              <ZText strikethrough color="muted">
                Deleted content
              </ZText>
            </div>
            <div className="flex flex-col gap-1">
              <ZText variant="label" size="xs" color="muted">
                Uppercase
              </ZText>
              <ZText transform="uppercase">shouting text</ZText>
            </div>
            <div className="flex flex-col gap-1">
              <ZText variant="label" size="xs" color="muted">
                Lowercase
              </ZText>
              <ZText transform="lowercase">Quiet Text</ZText>
            </div>
            <div className="flex flex-col gap-1">
              <ZText variant="label" size="xs" color="muted">
                Capitalize
              </ZText>
              <ZText transform="capitalize">proper noun style</ZText>
            </div>
          </div>
        </ShowcaseSection>

        {/* Truncation Section */}
        <ShowcaseSection title="Truncation & Wrapping" className="md:col-span-2 xl:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <ZText variant="label">Single Line Truncation</ZText>
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-slate-500">truncate=true</code>
              </div>
              <div className="w-full max-w-sm bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 relative group overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-indigo-50/50 to-transparent"></div>
                <ZText truncate className="text-indigo-900">
                  This is a very long text that should be truncated because it exceeds the container width. It is useful for
                  list items or table cells where space is limited.
                </ZText>
                <div className="absolute -bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-indigo-400 bg-white px-2 py-0.5 rounded-full shadow-sm border border-indigo-100">
                    Container Width Limit
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <ZText variant="label">Multi-line Clamp</ZText>
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-slate-500">truncate=2</code>
              </div>
              <div className="w-full max-w-sm bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                <ZText truncate={2} className="text-indigo-900">
                  This is a longer block of text that is intended to span multiple lines but should be cut off after the second
                  line. This demonstrates the line clamping functionality which is very useful for card descriptions and
                  summaries where you want to show a preview of content.
                </ZText>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <div className="flex justify-between items-baseline">
                <ZText variant="label">No Wrap</ZText>
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-slate-500">noWrap=true</code>
              </div>
              <div className="w-full bg-slate-100 p-3 rounded-lg border border-slate-200 overflow-x-auto">
                <ZText noWrap>
                  This text will not wrap to the next line even if it runs out of space in the container. It will just keep
                  going and going until the end of the content.
                </ZText>
              </div>
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </div>
  )
}

export default TextPage
