import { useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import type { useRender } from '@base-ui/react/use-render';
import { useStepContext } from './StepContext';
import { useRegistration } from './RegistrationContext';

type LabelRenderState = {
  active: boolean;
  completed: boolean;
};

type StepperLabelProps = useRender.ComponentProps<'span', LabelRenderState> & {
  children: ReactNode;
};

export const StepperLabel = ({ children }: StepperLabelProps) => {
  const { stepKey } = useStepContext();
  const { update } = useRegistration();

  useLayoutEffect(() => {
    update(stepKey, { label: children });
  }, [stepKey, children, update]);

  return null;
};
