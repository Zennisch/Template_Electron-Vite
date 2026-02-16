import ZText from "@renderer/components/primary/ZText"

const TextPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto">
      <div className="flex flex-col gap-4">
        <ZText variant="heading" size="2xl" weight="bold">
          Typography (ZText)
        </ZText>
        <ZText variant="body" size="md" color="secondary">
          A flexible text component for displaying content with various styles and semantic meanings.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Variants Section */}
        <section className="flex flex-col gap-4 p-6 border border-slate-200 rounded-lg">
          <ZText variant="heading" size="lg" weight="semibold" className="mb-2">
            Variants
          </ZText>
          <div className="flex flex-col gap-2">
            <ZText variant="heading" size="xl">Heading Text</ZText>
            <ZText variant="subheading" size="lg">Subheading Text</ZText>
            <ZText variant="body" size="md">Body Text (Default)</ZText>
            <ZText variant="caption" size="sm">Caption Text</ZText>
            <ZText variant="label" size="sm">Label Text</ZText>
            <ZText variant="overline" size="xs">OVERLINE TEXT</ZText>
          </div>
        </section>

        {/* Weights Section */}
        <section className="flex flex-col gap-4 p-6 border border-slate-200 rounded-lg">
          <ZText variant="heading" size="lg" weight="semibold" className="mb-2">
            Weights
          </ZText>
          <div className="flex flex-col gap-2">
            <ZText weight="light">Light Weight</ZText>
            <ZText weight="regular">Regular Weight</ZText>
            <ZText weight="medium">Medium Weight</ZText>
            <ZText weight="semibold">Semibold Weight</ZText>
            <ZText weight="bold">Bold Weight</ZText>
            <ZText weight="extrabold">Extrabold Weight</ZText>
          </div>
        </section>

        {/* Colors Section */}
        <section className="flex flex-col gap-4 p-6 border border-slate-200 rounded-lg">
          <ZText variant="heading" size="lg" weight="semibold" className="mb-2">
            Colors
          </ZText>
          <div className="flex flex-col gap-2">
            <ZText color="default">Default Color</ZText>
            <ZText color="primary">Primary Color</ZText>
            <ZText color="secondary">Secondary Color</ZText>
            <ZText color="success">Success Color</ZText>
            <ZText color="warning">Warning Color</ZText>
            <ZText color="error">Error Color</ZText>
            <ZText color="muted">Muted Color</ZText>
          </div>
        </section>

        {/* Decorators Section */}
        <section className="flex flex-col gap-4 p-6 border border-slate-200 rounded-lg">
          <ZText variant="heading" size="lg" weight="semibold" className="mb-2">
            Decorators & Transforms
          </ZText>
          <div className="flex flex-col gap-2">
            <ZText italic>Italic Text</ZText>
            <ZText underline>Underlined Text</ZText>
            <ZText strikethrough>Strikethrough Text</ZText>
            <ZText transform="uppercase">Uppercase Transform</ZText>
            <ZText transform="lowercase">Lowercase Transform</ZText>
            <ZText transform="capitalize">Capitalize Transform</ZText>
          </div>
        </section>

        {/* Alignment Section */}
        <section className="flex flex-col gap-4 p-6 border border-slate-200 rounded-lg md:col-span-2">
          <ZText variant="heading" size="lg" weight="semibold" className="mb-2">
            Alignment
          </ZText>
          <div className="flex flex-col gap-2 bg-slate-50 p-4 rounded">
            <ZText align="left" className="bg-slate-200/50 p-1">Left Aligned</ZText>
            <ZText align="center" className="bg-slate-200/50 p-1">Center Aligned</ZText>
            <ZText align="right" className="bg-slate-200/50 p-1">Right Aligned</ZText>
            <ZText align="justify" className="bg-slate-200/50 p-1">
              Justify Aligned: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </ZText>
          </div>
        </section>

        {/* Truncation Section */}
        <section className="flex flex-col gap-4 p-6 border border-slate-200 rounded-lg md:col-span-2">
          <ZText variant="heading" size="lg" weight="semibold" className="mb-2">
            Truncation
          </ZText>
          <div className="flex flex-col gap-4">
            <div>
              <ZText variant="label" className="mb-1">Single Line Truncation (truncate=true):</ZText>
              <div className="w-64 bg-slate-100 p-2 rounded">
                <ZText truncate>
                  This is a very long text that should be truncated because it exceeds the container width.
                </ZText>
              </div>
            </div>
            
            <div>
               <ZText variant="label" className="mb-1">Line Clamp (truncate=2):</ZText>
               <div className="w-64 bg-slate-100 p-2 rounded">
                <ZText truncate={2}>
                  This is a longer block of text that is intended to span multiple lines but should be cut off after the second line. This demonstrates the line clamping functionality which is very useful for card descriptions and summaries.
                </ZText>
              </div>
            </div>

            <div>
               <ZText variant="label" className="mb-1">No Wrap (noWrap=true):</ZText>
               <div className="w-64 bg-slate-100 p-2 rounded overflow-hidden">
                <ZText noWrap>
                  This text will not wrap to the next line even if it runs out of space in the container.
                </ZText>
              </div>
            </div>
          </div>
        </section>

        {/* Polymorphic Section */}
        <section className="flex flex-col gap-4 p-6 border border-slate-200 rounded-lg md:col-span-2">
          <ZText variant="heading" size="lg" weight="semibold" className="mb-2">
            Polymorphic (as prop)
          </ZText>
          <div className="flex flex-col gap-2">
             <ZText as="h1" variant="heading" size="2xl">Rendered as &lt;h1&gt;</ZText>
             <ZText as="span" variant="body" className="bg-yellow-100">Rendered as &lt;span&gt; inline</ZText>
             <ZText as="label" variant="label" className="block mt-2">Rendered as &lt;label&gt;</ZText>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TextPage
