import type { ReactElement } from 'react';
import type { StepProps, StepperAction } from './types';

type StepperNavProps = {
  steps: ReactElement<StepProps>[];
  activeStep: number;
  visitedSteps: Set<number>;
  dispatch: (action: StepperAction) => void;
};

// Primary: oklch(0.432 0.095 166) — teal-green
// Matching greys derived from the same hue family for harmony
// Active:   border-[oklch(0.432_0.095_166)]  text-[oklch(0.432_0.095_166)]
// Visited:  border-[oklch(0.7_0.04_166)]     text-[oklch(0.35_0.07_166)]
// Locked:   border-[oklch(0.9_0.01_166)]     text-[oklch(0.65_0.02_166)]

export const StepperNav = ({ steps, activeStep, visitedSteps, dispatch }: StepperNavProps) => (
  <nav aria-label="Progress" className="bg-white border-b border-[oklch(0.9_0.01_166)]">
    <div className="max-w-7xl mx-auto px-6">
      <ol className="flex w-full gap-x-1 sm:gap-x-0">
        {steps.map((step, i) => {
          const stepNumber = i + 1;
          const isCurrent = stepNumber === activeStep;
          const isVisited = visitedSteps.has(stepNumber) && !isCurrent;
          const isLocked = !visitedSteps.has(stepNumber);

          const borderClass = isCurrent
            ? 'border-[oklch(0.432_0.095_166)]'
            : isVisited
              ? 'border-[oklch(0.7_0.04_166)] hover:border-[oklch(0.55_0.07_166)]'
              : 'border-[oklch(0.9_0.01_166)]';

          const labelClass = isCurrent
            ? 'text-[oklch(0.432_0.095_166)] font-extrabold'
            : isVisited
              ? 'text-[oklch(0.35_0.07_166)] font-bold'
              : 'text-[oklch(0.65_0.02_166)] font-bold';

          const descClass = isCurrent
            ? 'text-[oklch(0.5_0.06_166)]'
            : isVisited
              ? 'text-[oklch(0.55_0.04_166)]'
              : 'text-[oklch(0.75_0.01_166)]';

          return (
            <li key={stepNumber} className={['flex-1 flex flex-col border-b-4 transition-colors duration-150', borderClass].join(' ')}>
              <button
                type="button"
                onClick={() => {
                  if (isVisited) dispatch({ type: 'goto', step: stepNumber });
                }}
                disabled={isLocked}
                aria-current={isCurrent ? 'step' : undefined}
                aria-disabled={isLocked}
                className={[
                  'w-full h-full text-left py-4',
                  'focus:outline-none focus-visible:bg-[oklch(0.97_0.01_166)]',
                  isLocked ? 'cursor-not-allowed' : 'cursor-pointer',
                ].join(' ')}
              >
                {/* visually hidden status for screen readers */}
                <span className="sr-only">
                  {isCurrent ? 'Current step: ' : isVisited ? 'Completed: ' : 'Not yet available: '}
                </span>

                <div className="flex items-center gap-2">
                  <span className={`text-sm ${labelClass}`} aria-hidden="true">
                    Step {stepNumber}: {step.props.label}
                  </span>
                </div>

                {step.props.description && (
                  <p className={`text-xs mt-0.5 font-medium ${descClass}`}>
                    {step.props.description}
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  </nav>
);