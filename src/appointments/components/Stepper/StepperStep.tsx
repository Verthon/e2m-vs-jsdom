import { useLayoutEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { useStepperContext } from './StepperContext';
import { useRegistration } from './RegistrationContext';
import { StepContext } from './StepContext';

type StepRenderState = {
  active: boolean;
  completed: boolean;
  valid: boolean;
  visited: boolean;
};

type StepperStepProps = {
  stepKey: string;
  optional?: boolean;
  onBeforeLeave?: () => boolean | Promise<boolean>;
  children: ReactNode;
  render?: useRender.ComponentProps<'fieldset'>['render'];
} & Omit<React.ComponentPropsWithoutRef<'fieldset'>, 'children'>;

export const StepperStep = ({
  stepKey,
  optional = false,
  onBeforeLeave,
  children,
  render,
  ...rest
}: StepperStepProps) => {
  const { register, unregister, getMeta } = useRegistration();
  const { state, orderedKeys } = useStepperContext();

  useLayoutEffect(() => {
    register(stepKey, {
      key: stepKey,
      optional,
      onBeforeLeave: onBeforeLeave ?? null,
      label: null,
      description: null,
    });
    return () => {
      unregister(stepKey);
    };
  }, [stepKey]);

  const active = state.activeKey === stepKey;
  const stepState = state.steps.get(stepKey);
  const completed = stepState?.completed ?? false;
  const valid = stepState?.valid ?? false;
  const visited = stepState?.visited ?? false;

  const renderState = useMemo<StepRenderState>(
    () => ({ active, completed, valid, visited }),
    [active, completed, valid, visited]
  );

  const stepIndex = orderedKeys.indexOf(stepKey);
  const total = orderedKeys.length;
  const humanIndex = stepIndex === -1 ? 1 : stepIndex + 1;

  const meta = getMeta(stepKey);
  const labelText = meta?.label ?? null;

  const legendContent =
    typeof labelText === 'string' || labelText === null
      ? `Step ${humanIndex} of ${total}${labelText ? `: ${labelText}` : ''}`
      : labelText;

  const internalProps: useRender.ElementProps<'fieldset'> = {
    style: active ? undefined : { display: 'none' },
    children: (
      <>
        <legend className="sr-only">
          {typeof labelText === 'string' || labelText === null
            ? legendContent
            : <>Step {humanIndex} of {total}: {labelText}</>}
        </legend>
        <StepContext.Provider value={{ stepKey }}>
          {children}
        </StepContext.Provider>
      </>
    ),
  };

  const element = useRender({
    defaultTagName: 'fieldset',
    render,
    state: renderState,
    props: mergeProps<'fieldset'>(internalProps, rest),
  });

  return element;
};
