import { useMemo } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { useStepperContext } from './StepperContext';

type PrevRenderState = { disabled: boolean };

type StepperPrevProps = useRender.ComponentProps<'button', PrevRenderState>;

export const StepperPrev = (props: StepperPrevProps) => {
  const { render, ...rest } = props;
  const { dispatch, orderedKeys, isFirst } = useStepperContext();

  const disabled = isFirst;

  const renderState = useMemo<PrevRenderState>(() => ({ disabled }), [disabled]);

  const handleClick = () => {
    dispatch({ type: 'PREV', orderedKeys });
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
