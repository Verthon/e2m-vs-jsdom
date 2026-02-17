import { useMemo } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { useStepperContext } from './StepperContext';
import { useRegistration } from './RegistrationContext';
import { useStepContext } from './StepContext';

type SkipRenderState = { disabled: boolean };

type StepperSkipProps = useRender.ComponentProps<'button', SkipRenderState>;

export const StepperSkip = (props: StepperSkipProps) => {
  const { render, ...rest } = props;
  const { dispatch, orderedKeys } = useStepperContext();
  const { getMeta } = useRegistration();
  const { stepKey } = useStepContext();

  const meta = getMeta(stepKey);
  const optional = meta?.optional ?? false;
  const disabled = !optional;

  const renderState = useMemo<SkipRenderState>(() => ({ disabled }), [disabled]);

  const handleClick = () => {
    dispatch({ type: 'SKIP_STEP', orderedKeys });
  };

  const internalProps: useRender.ElementProps<'button'> = {
    type: 'button',
    disabled,
    onClick: handleClick,
  };

  const element = useRender({
    defaultTagName: 'button',
    render,
    state: renderState,
    props: mergeProps<'button'>(internalProps, rest),
  });

  return element;
};
