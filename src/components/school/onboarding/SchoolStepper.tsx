interface Props {
  steps: string[];
  currentStep: number;
}

export default function SchoolStepper({
  steps,
  currentStep,
}: Props) {
  return (
    <div className="onboarding-stepper">
      {steps.map((step, index) => {
        const active = index === currentStep;
        const completed = index < currentStep;

        return (
          <div
            key={step}
            className={`onboarding-step ${
              active ? "active" : ""
            } ${
              completed ? "completed" : ""
            }`}
          >
            <div className="step-content">
              <div className="step-number">
                {completed ? "✓" : index + 1}
              </div>

              <span className="step-title">
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="step-line" />
            )}
          </div>
        );
      })}
    </div>
  );
}