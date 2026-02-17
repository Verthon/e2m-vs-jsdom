import { useMemo } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { useStepperContext } from './StepperContext';

type ProgressRenderState = { value: number; max: number; percentage: number };

type StepperProgressProps = useRender.ComponentProps<'progress', ProgressRenderState>;

export const StepperProgress = (props: StepperProgressProps) => {
  const { render, ...rest } = props;
  const { state, orderedKeys } = useStepperContext();

  const activeIdx = orderedKeys.indexOf(state.activeKey);
  const value = activeIdx === -1 ? 1 : activeIdx + 1;
  const max = orderedKeys.length;
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  const renderState = useMemo<ProgressRenderState>(
    () => ({ value, max, percentage }),
    [value, max, percentage]
  );

  const internalProps: useRender.ElementProps<'progress'> = {
    value,
    max,
  };

  const element = useRender({
    defaultTagName: 'progress',
    render,
    state: renderState,
    props: mergeProps<'progress'>(internalProps, rest),
  });

  return element;
};
