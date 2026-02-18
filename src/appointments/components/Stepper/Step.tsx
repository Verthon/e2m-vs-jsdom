import type { ReactNode } from 'react';
import { useStepperContext } from './StepperContext';

interface StepProps {
  readonly stepKey: string;
  readonly label: string;
  readonly optional?: boolean;
  readonly children: ReactNode;
}

export function Step({ stepKey, label, optional, children }: StepProps) {
  const { activeKey, orderedKeys } = useStepperContext();
  const isActive = stepKey === activeKey;
  const stepIndex = orderedKeys.indexOf(stepKey);
  const totalSteps = orderedKeys.length;

  const legendText = `${label} (Step ${stepIndex + 1} of ${totalSteps})${optional ? ' - Optional' : ''}`;

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
