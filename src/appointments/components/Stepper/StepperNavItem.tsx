import { useMemo } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { useStepperContext } from './StepperContext';
import { useRegistration } from './RegistrationContext';

export type NavItemRenderState = {
  active: boolean;
  completed: boolean;
  visited: boolean;
  optional: boolean;
};

type StepperNavItemProps = {
  stepKey: string;
  index: number;
  render?: useRender.ComponentProps<'li', NavItemRenderState>['render'];
};

const stateAttributesMapping = (state: NavItemRenderState): Record<string, string | undefined> => ({
  'data-active': state.active ? '' : undefined,
  'data-completed': state.completed ? '' : undefined,
  'data-visited': state.visited ? '' : undefined,
  'data-optional': state.optional ? '' : undefined,
});

export const StepperNavItem = ({ stepKey, index, render }: StepperNavItemProps) => {
  const { state, dispatch } = useStepperContext();
  const { getMeta } = useRegistration();

  const meta = getMeta(stepKey);
  const stepState = state.steps.get(stepKey);
  const active = stepKey === state.activeKey;
  const completed = stepState?.completed ?? false;
  const visited = stepState?.visited ?? false;
  const optional = meta?.optional ?? false;
  const label = meta?.label ?? `Step ${index + 1}`;
  const description = meta?.description ?? null;

  const renderState = useMemo<NavItemRenderState>(
    () => ({ active, completed, visited, optional }),
    [active, completed, visited, optional]
  );

  const content = (
    <>
      {label}
      {description}
    </>
  );

  const itemContent =
    completed || visited ? (
      <button type="button" onClick={() => dispatch({ type: 'GO_TO', key: stepKey })}>
        {content}
      </button>
    ) : (
      <span inert="">{content}</span>
    );

  const internalProps: useRender.ElementProps<'li'> = {
    'aria-current': active ? 'step' : undefined,
    ...stateAttributesMapping(renderState),
    children: itemContent,
  };

  const element = useRender({
    defaultTagName: 'li',
    render,
    state: renderState,
    props: mergeProps<'li'>(internalProps),
  });

  return element;
};
