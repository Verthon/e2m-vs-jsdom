import { useMemo } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { useStepperContext } from './StepperContext';
import { useStepContext } from './StepContext';

type CompleteRenderState = { disabled: boolean };

type StepperCompleteProps = useRender.ComponentProps<'button', CompleteRenderState>;

export const StepperComplete = (props: StepperCompleteProps) => {
  const { render, ...rest } = props;
  const { state } = useStepperContext();
  const { stepKey } = useStepContext();

  const stepState = state.steps.get(stepKey);
  const valid = stepState?.valid ?? false;
  const disabled = !valid;

  const renderState = useMemo<CompleteRenderState>(() => ({ disabled }), [disabled]);

  const internalProps: useRender.ElementProps<'button'> = {
    type: 'submit',
    disabled,
  };

  const element = useRender({
    defaultTagName: 'button',
    render,
    state: renderState,
    props: mergeProps<'button'>(internalProps, rest),
  });

  return element;
};
