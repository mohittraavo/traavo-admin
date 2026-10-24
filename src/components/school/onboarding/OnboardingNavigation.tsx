interface Props {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
}

export function OnboardingNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSaveDraft,
}: Props) {
  const lastStep = currentStep === totalSteps - 1;

  return (
    <div className="onboarding-navigation">
      <button
        type="button"
        className="btn btn-ghost"
        disabled={currentStep === 0}
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="navigation-right">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onSaveDraft}
        >
          Save Draft
        </button>

        {!lastStep && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNext}
          >
            Save & Continue →
          </button>
        )}

        {lastStep && (
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit for Approval
          </button>
        )}
      </div>
    </div>
  );
}