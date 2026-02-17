import { useMemo } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { useStepperContext } from './StepperContext';
import { StepperNavItem } from './StepperNavItem';
import type { NavItemRenderState } from './StepperNavItem';

type NavRenderState = {
  activeStep: number;
  totalSteps: number;
};

type StepperNavProps = useRender.ComponentProps<'nav', NavRenderState> & {
  renderItem?: useRender.ComponentProps<'li', NavItemRenderState>['render'];
};

export const StepperNav = (props: StepperNavProps) => {
  const { render, renderItem, ...rest } = props;
  const { state, orderedKeys } = useStepperContext();

  const activeStep = orderedKeys.indexOf(state.activeKey);
  const totalSteps = orderedKeys.length;

  const renderState = useMemo<NavRenderState>(
    () => ({ activeStep, totalSteps }),
    [activeStep, totalSteps]
  );

  const internalProps: useRender.ElementProps<'nav'> = {
    'aria-label': 'Progress',
    children: (
      <ol>
        {orderedKeys.map((key, index) => (
          <StepperNavItem
            key={key}
            stepKey={key}
            index={index}
            render={renderItem}
          />
        ))}
      </ol>
    ),
  };

  const element = useRender({
    defaultTagName: 'nav',
    render,
    state: renderState,
    props: mergeProps<'nav'>(internalProps, rest),
  });

  return element;
};
