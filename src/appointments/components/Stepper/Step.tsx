import type { ReactNode } from 'react';
import { useStepperContext } from './StepperContext';

interface StepProps {
  index: number;
  label: string;
  optional?: boolean;
  children: ReactNode;
}

export function Step({ index, label, optional, children }: StepProps) {
  const { currentStep, totalSteps } = useStepperContext();
  const isActive = index === currentStep;

  const legendText = `${label} (Step ${index + 1} of ${totalSteps})${optional ? ' - Optional' : ''}`;

  return (
    <fieldset
      className="m-0 min-w-0 border-none p-0"
      style={isActive ? undefined : { display: 'none' }}
      {...(isActive ? { 'aria-current': 'step' as const } : {})}
    >
      <legend className="sr-only">{legendText}</legend>
      {children}
    </fieldset>
  );
}
