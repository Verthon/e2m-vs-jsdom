import { useCallback } from 'react';
import { useStepperContext } from './StepperContext';
import type { StepState, StepMeta } from './types';

export type UseStepperReturn = {
  activeKey: string;
  orderedKeys: string[];
  direction: 'forward' | 'backward' | null;
  isFirst: boolean;
  isLast: boolean;
  steps: Map<string, StepState>;
  meta: Map<string, StepMeta>;
  next: () => Promise<void>;
  prev: () => void;
  goTo: (key: string) => Promise<void>;
  completeStep: (key: string) => void;
  setStepValidity: (key: string, valid: boolean) => void;
  skip: () => void;
  reset: () => void;
};

export const useStepper = (): UseStepperReturn => {
  const { state, dispatch, orderedKeys, activeKey, isFirst, isLast, direction, registration } =
    useStepperContext();

  const next = useCallback(async () => {
    const meta = registration.getMeta(activeKey);
    if (meta?.onBeforeLeave) {
      const canLeave = await meta.onBeforeLeave();
      if (!canLeave) return;
    }
    dispatch({ type: 'NEXT', orderedKeys });
  }, [dispatch, orderedKeys, activeKey, registration]);

  const prev = useCallback(() => {
    dispatch({ type: 'PREV', orderedKeys });
  }, [dispatch, orderedKeys]);

  const goTo = useCallback(
    async (key: string) => {
      const meta = registration.getMeta(activeKey);
      if (meta?.onBeforeLeave) {
        const canLeave = await meta.onBeforeLeave();
        if (!canLeave) return;
      }
      dispatch({ type: 'GO_TO', key });
    },
    [dispatch, activeKey, registration]
  );

  const completeStep = useCallback(
    (key: string) => {
      dispatch({ type: 'COMPLETE_STEP', key });
    },
    [dispatch]
  );

  const setStepValidity = useCallback(
    (key: string, valid: boolean) => {
      dispatch({ type: 'SET_VALIDITY', key, valid });
    },
    [dispatch]
  );

  const skip = useCallback(() => {
    dispatch({ type: 'SKIP_STEP', orderedKeys });
  }, [dispatch, orderedKeys]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET', initialKey: orderedKeys[0] ?? '' });
  }, [dispatch, orderedKeys]);

  return {
    activeKey,
    orderedKeys,
    direction,
    isFirst,
    isLast,
    steps: state.steps,
    meta: registration.getAllMeta(),
    next,
    prev,
    goTo,
    completeStep,
    setStepValidity,
    skip,
    reset,
  };
};
