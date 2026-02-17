import { useRef } from 'react';
import type { ReactNode } from 'react';
import type React from 'react';
import { RegistrationProvider } from './RegistrationContext';
import { StepperProvider } from './StepperContext';
import { StepperStep } from './StepperStep';
import { StepperLabel } from './StepperLabel';
import { StepperDescription } from './StepperDescription';
import { StepperNav } from './StepperNav';
import { StepperValidation } from './StepperValidation';
import { StepperNext } from './StepperNext';
import { StepperPrev } from './StepperPrev';
import { StepperSkip } from './StepperSkip';
import { StepperComplete } from './StepperComplete';
import { StepperProgress } from './StepperProgress';
import { useStepAnnouncer } from './useStepAnnouncer';

type StepperRootProps = {
  onComplete: () => void;
  children: ReactNode;
  ariaLabel?: string;
};

type StepperInnerProps = {
  onComplete: () => void;
  children: ReactNode;
  ariaLabel?: string;
  liveRegionRef: React.RefObject<HTMLElement | null>;
};

const StepperInner = ({ onComplete, children, ariaLabel, liveRegionRef }: StepperInnerProps) => {
  useStepAnnouncer(liveRegionRef);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form aria-label={ariaLabel} onSubmit={handleSubmit}>
      <output
        ref={liveRegionRef as React.RefObject<HTMLOutputElement>}
        aria-live="polite"
        className="sr-only"
      />
      {children}
    </form>
  );
};

export const StepperRoot = ({ onComplete, children, ariaLabel }: StepperRootProps) => {
  const liveRegionRef = useRef<HTMLElement | null>(null);

  return (
    <RegistrationProvider>
      <StepperProvider initialKey="" allKeys={[]}>
        <StepperInner onComplete={onComplete} ariaLabel={ariaLabel} liveRegionRef={liveRegionRef}>
          {children}
        </StepperInner>
      </StepperProvider>
    </RegistrationProvider>
  );
};

export const Stepper = Object.assign(StepperRoot, {
  Step: StepperStep,
  Label: StepperLabel,
  Description: StepperDescription,
  Nav: StepperNav,
  Validation: StepperValidation,
  Next: StepperNext,
  Prev: StepperPrev,
  Skip: StepperSkip,
  Complete: StepperComplete,
  Progress: StepperProgress,
});
