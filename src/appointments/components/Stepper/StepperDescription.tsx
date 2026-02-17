import { useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import type { useRender } from '@base-ui/react/use-render';
import { useStepContext } from './StepContext';
import { useRegistration } from './RegistrationContext';

type DescriptionRenderState = {
  active: boolean;
  completed: boolean;
};

type StepperDescriptionProps = useRender.ComponentProps<
  'span',
  DescriptionRenderState
> & {
  children: ReactNode;
};

export const StepperDescription = ({ children }: StepperDescriptionProps) => {
  const { stepKey } = useStepContext();
  const { update } = useRegistration();

  useLayoutEffect(() => {
    update(stepKey, { description: children });
  }, [stepKey, children, update]);

  return null;
};
