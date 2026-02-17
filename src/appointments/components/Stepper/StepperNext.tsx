import { useMemo } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { useStepperContext } from './StepperContext';
import { useRegistration } from './RegistrationContext';
import { useStepContext } from './StepContext';

type NextRenderState = { disabled: boolean };

type StepperNextProps = useRender.ComponentProps<'button', NextRenderState>;

export const StepperNext = (props: StepperNextProps) => {
  const { render, ...rest } = props;
  const { state, dispatch, orderedKeys } = useStepperContext();
  const { getMeta } = useRegistration();
  const { stepKey } = useStepContext();

  const stepState = state.steps.get(stepKey);
  const valid = stepState?.valid ?? false;
  const disabled = !valid;

  const renderState = useMemo<NextRenderState>(() => ({ disabled }), [disabled]);

  const handleClick = async () => {
    const meta = getMeta(stepKey);
    if (meta?.onBeforeLeave) {
      const canLeave = await meta.onBeforeLeave();
      if (!canLeave) return;
    }
    dispatch({ type: 'NEXT', orderedKeys });
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
