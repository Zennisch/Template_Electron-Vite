import ZButton from "@renderer/components/primary/ZButton"
import ZModal from "@renderer/components/primary/ZModal"
import ZSelect, { ZSelectItem } from "@renderer/components/primary/ZSelect"
import ZText from "@renderer/components/primary/ZText"
import ShowcaseSection from "@renderer/pages/components/ShowcaseSection"
import { useState } from "react"

const SIZES: ZSelectItem<string>[] = [
  { label: "Small (sm)", value: "sm" },
  { label: "Medium (md)", value: "md" },
  { label: "Large (lg)", value: "lg" },
  { label: "Extra Large (xl)", value: "xl" },
  { label: "2XL", value: "2xl" },
  { label: "Full Width", value: "full" }
]

const ModalPage = () => {
  const [basicOpen, setBasicOpen] = useState(false)
  const [sizeOpen, setSizeOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>("md")
  const [scrollOpen, setScrollOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)

  // Wizard State
  const [wizardOpen, setWizardOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const TOTAL_STEPS = 3

  const handleNextStep = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep((prev) => prev + 1)
    else {
      setWizardOpen(false)
      setCurrentStep(1) // Reset for next time
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1)
  }

  // Simulate loading in modal
  const handleLoadingOpen = () => {
    setLoadingOpen(true)
    setTimeout(() => setLoadingOpen(false), 2000)
  }

  return (
    <div className="flex flex-col gap-10 p-10 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <ZText variant="heading" size="3xl" weight="extrabold" className="text-slate-900 tracking-tight">
          Modal
        </ZText>
        <ZText variant="body" size="lg" color="secondary" className="max-w-2xl">
          The <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ZModal</code> component
          appears in front of application content to present information or require user interaction.
        </ZText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-8">
        {/* Basic Usage */}
        <ShowcaseSection title="Basic Usage">
          <div className="flex flex-col gap-4">
            <ZText variant="body" size="sm" color="secondary">
              A standard modal with header, body, footer, and close actions.
            </ZText>
            <ZButton onClick={() => setBasicOpen(true)}>Open Basic Modal</ZButton>

            <ZModal
              isOpen={basicOpen}
              onClose={() => setBasicOpen(false)}
              header="Welcome to ZModal"
              footer={
                <div className="flex justify-end gap-2">
                  <ZButton variant="ghost" onClick={() => setBasicOpen(false)}>
                    Cancel
                  </ZButton>
                  <ZButton onClick={() => setBasicOpen(false)}>Confirm</ZButton>
                </div>
              }
            >
              <ZText>
                This is a basic modal example. You can put any content here. Modals are great for focusing user attention on a
                specific task.
              </ZText>
            </ZModal>
          </div>
        </ShowcaseSection>

        {/* Sizes */}
        <ShowcaseSection title="Sizes">
          <div className="flex flex-col gap-4">
            <ZText variant="body" size="sm" color="secondary">
              Modals come in multiple sizes to fit different content needs.
            </ZText>
            <div className="flex gap-2">
              <div className="w-40">
                <ZSelect options={SIZES} value={selectedSize} onChange={(val) => setSelectedSize(val as string)} fullWidth />
              </div>
              <ZButton onClick={() => setSizeOpen(true)}>Open {selectedSize}</ZButton>
            </div>

            <ZModal
              isOpen={sizeOpen}
              onClose={() => setSizeOpen(false)}
              size={selectedSize as any}
              header={`Modal Size: ${selectedSize}`}
              footer={
                <div className="flex justify-end">
                  <ZButton onClick={() => setSizeOpen(false)}>Close</ZButton>
                </div>
              }
            >
              <ZText>
                This modal is demonstrating the <strong>{selectedSize}</strong> size variant. Resize the browser window to see
                how it adapts to smaller screens.
              </ZText>
            </ZModal>
          </div>
        </ShowcaseSection>

        {/* Scrollable Content */}
        <ShowcaseSection title="Scrollable Content">
          <div className="flex flex-col gap-4">
            <ZText variant="body" size="sm" color="secondary">
              Content inside the modal body scrolls automatically if it exceeds the viewport height.
            </ZText>
            <ZButton variant="primary" onClick={() => setScrollOpen(true)}>
              Open Long Modal
            </ZButton>

            <ZModal
              isOpen={scrollOpen}
              onClose={() => setScrollOpen(false)}
              header="Terms of Service"
              footer={
                <div className="flex justify-end gap-2">
                  <ZButton variant="ghost" onClick={() => setScrollOpen(false)}>
                    Decline
                  </ZButton>
                  <ZButton onClick={() => setScrollOpen(false)}>Accept</ZButton>
                </div>
              }
            >
              <div className="flex flex-col gap-4">
                {[...Array(10)].map((_, i) => (
                  <p key={i}>
                    Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                ))}
              </div>
            </ZModal>
          </div>
        </ShowcaseSection>

        {/* Alert / Danger */}
        <ShowcaseSection title="Alert State">
          <div className="flex flex-col gap-4">
            <ZText variant="body" size="sm" color="secondary">
              Use visual cues for destructive actions or important alerts.
            </ZText>
            <ZButton color="danger" onClick={() => setAlertOpen(true)}>
              Delete Account
            </ZButton>

            <ZModal
              isOpen={alertOpen}
              onClose={() => setAlertOpen(false)}
              header={
                <div className="flex items-center gap-2 text-red-600">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>Confirm Deletion</span>
                </div>
              }
              error
              footer={
                <div className="flex justify-end gap-2">
                  <ZButton variant="ghost" onClick={() => setAlertOpen(false)}>
                    Cancel
                  </ZButton>
                  <ZButton color="danger" onClick={() => setAlertOpen(false)}>
                    Delete Permanently
                  </ZButton>
                </div>
              }
            >
              <ZText>
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently
                removed.
              </ZText>
            </ZModal>
          </div>
        </ShowcaseSection>

        {/* Loading State */}
        <ShowcaseSection title="Loading State">
          <div className="flex flex-col gap-4">
            <ZText variant="body" size="sm" color="secondary">
              Modals can show a loading overlay for async operations.
            </ZText>
            <ZButton onClick={handleLoadingOpen}>Simulate Loading</ZButton>

            <ZModal isOpen={loadingOpen} onClose={() => {}} loading header="Processing Data">
              <ZText>Please wait while we process your request. This might take a few seconds...</ZText>
            </ZModal>
          </div>
        </ShowcaseSection>

        {/* Wizard Modal */}
        <ShowcaseSection title="Wizard / Multi-step">
          <div className="flex flex-col gap-4">
            <ZText variant="body" size="sm" color="secondary">
              Modals can manage multi-step processes like wizards.
            </ZText>
            <ZButton onClick={() => setWizardOpen(true)}>Start Wizard</ZButton>

            <ZModal
              isOpen={wizardOpen}
              onClose={() => setWizardOpen(false)}
              header={`Step ${currentStep} of ${TOTAL_STEPS}`}
              stepKey={currentStep} // Important for animation
              footer={
                <div className="flex justify-between w-full">
                  <ZButton variant="ghost" disabled={currentStep === 1} onClick={handlePrevStep}>
                    Back
                  </ZButton>
                  <ZButton onClick={handleNextStep}>{currentStep === TOTAL_STEPS ? "Finish" : "Next"}</ZButton>
                </div>
              }
            >
              <div className="min-h-37.5 flex flex-col justify-center">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <ZText weight="bold">Account Setup</ZText>
                    <ZText color="secondary">Let's start by setting up your account details.</ZText>
                    {/* Input placeholders */}
                    <div className="h-8 bg-slate-100 rounded w-full"></div>
                    <div className="h-8 bg-slate-100 rounded w-3/4"></div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <ZText weight="bold">Preferences</ZText>
                    <ZText color="secondary">Choose your notification settings and theme.</ZText>
                    <div className="flex gap-4">
                      <div className="h-20 w-20 bg-indigo-50 rounded border border-indigo-100"></div>
                      <div className="h-20 w-20 bg-slate-50 rounded border border-slate-100"></div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4 text-center">
                    <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <ZText weight="bold">All Done!</ZText>
                    <ZText color="secondary">Your account is ready to go. Click Finish to close.</ZText>
                  </div>
                )}
              </div>
            </ZModal>
          </div>
        </ShowcaseSection>
      </div>

      {/* Spacer for scrolling */}
      <div className="h-24"></div>
    </div>
  )
}

export default ModalPage
