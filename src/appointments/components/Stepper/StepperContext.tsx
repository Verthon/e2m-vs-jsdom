import React, { createContext, useContext, useMemo, useReducer, useRef } from 'react';
import { stepperReducer, createInitialState } from './stepperReducer';
import { useStepAnnouncer } from './useStepAnnouncer';
import { useStepDocumentTitle } from './useStepDocumentTitle';
import type { StepperState, StepperAction } from './types';

interface StepperContextValue {
  state: StepperState;
  dispatch: React.Dispatch<StepperAction>;
  currentStep: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  stepLabels: string[];
}

interface StepperProviderProps {
  totalSteps: number;
  initialStep?: number;
  onComplete: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

const StepperContext = createContext<StepperContextValue | null>(null);

function buildInitialState(totalSteps: number, initialStep: number): StepperState {
  const base = createInitialState(totalSteps);
  if (initialStep === 0) {
    return base;
  }
  return {
    ...base,
    currentStep: initialStep,
    steps: Object.fromEntries(
      Array.from({ length: totalSteps }, (_, i) => [
        i,
        { completed: i < initialStep, valid: i < initialStep, visited: i <= initialStep },
      ])
    ),
  };
}

function extractStepLabels(children: React.ReactNode): string[] {
  const labels: string[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props && typeof child.props === 'object') {
      const props = child.props as { index?: number; label?: string };
      if (typeof props.index === 'number' && typeof props.label === 'string') {
        labels[props.index] = props.label;
      }
    }
  });
  return labels;
}

export function StepperProvider({
  totalSteps,
  initialStep = 0,
  onComplete,
  children,
  ariaLabel = 'Multi-step form',
}: StepperProviderProps) {
  const [state, dispatch] = useReducer(
    stepperReducer,
    undefined,
    () => buildInitialState(totalSteps, initialStep)
  );

  const liveRegionRef = useRef<HTMLDivElement>(null);

  const { currentStep } = state;
  const stepLabels = extractStepLabels(children);
  const stepLabel = stepLabels[currentStep] ?? '';
  const stepAnnouncement = `Step ${currentStep + 1} of ${totalSteps}`;

  useStepAnnouncer({ announcement: stepAnnouncement, liveRegionRef });
  useStepDocumentTitle({ currentStep, totalSteps, stepLabel });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep === totalSteps - 1) {
      onComplete();
    }
  };

  const contextValue: StepperContextValue = useMemo(
    () => ({
      state,
      dispatch,
      currentStep,
      totalSteps,
      isFirst: currentStep === 0,
      isLast: currentStep === totalSteps - 1,
      stepLabels,
    }),
    [state, dispatch, currentStep, totalSteps, stepLabels]
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <form aria-label={ariaLabel} onSubmit={handleSubmit}>
        <div
          ref={liveRegionRef}
          role="status"
          aria-live="polite"
          className="sr-only"
        />
        {children}
      </form>
    </StepperContext.Provider>
  );
}

export function useStepperContext(): StepperContextValue {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepperContext must be used within a StepperProvider');
  }
  return context;
}
