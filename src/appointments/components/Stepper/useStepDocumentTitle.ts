import { useEffect, useRef } from 'react';
import { useStepperContext } from './StepperContext';
import { useRegistration } from './RegistrationContext';

export const useStepDocumentTitle = (
  formatter: (step: number, total: number, label: string) => string
): void => {
  const { state, orderedKeys } = useStepperContext();
  const { getMeta } = useRegistration();

  const activeKey = state.activeKey;
  const stepIndex = orderedKeys.indexOf(activeKey);
  const total = orderedKeys.length;
  const step = stepIndex === -1 ? 1 : stepIndex + 1;

  const meta = getMeta(activeKey);
  const label = typeof meta?.label === 'string' ? meta.label : '';

  const previousTitleRef = useRef<string | null>(null);

  useEffect(() => {
    previousTitleRef.current = document.title;
    document.title = formatter(step, total, label);

    return () => {
      if (previousTitleRef.current !== null) {
        document.title = previousTitleRef.current;
      }
    };
  }, [step, total, label, formatter]);
};
