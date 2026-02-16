import { useCallback } from 'react';
import { useStepperContext } from './StepperContext';
import type { StepperAction, StepState } from './types';
import type React from 'react';

export interface UseStepperReturn {
  currentStep: number;
  totalSteps: number;
  direction: 'forward' | 'backward';
  isFirst: boolean;
  isLast: boolean;
  steps: Record<number, StepState>;

  next: () => void;
  prev: () => void;
  goTo: (step: number) => void;
  completeStep: (step: number) => void;
  invalidateStep: (step: number) => void;
  setStepValidity: (step: number, valid: boolean) => void;
  reset: () => void;

  dispatch: React.Dispatch<StepperAction>;
}

export function useStepper(): UseStepperReturn {
  const { state, dispatch, currentStep, totalSteps, isFirst, isLast } =
    useStepperContext();

  const next = useCallback(() => {
    dispatch({ type: 'NEXT' });
  }, [dispatch]);

  const prev = useCallback(() => {
    dispatch({ type: 'PREV' });
  }, [dispatch]);

  const goTo = useCallback(
    (step: number) => {
      dispatch({ type: 'GO_TO', step });
    },
    [dispatch]
  );

  const completeStep = useCallback(
    (step: number) => {
      dispatch({ type: 'COMPLETE_STEP', step });
    },
    [dispatch]
  );

  const invalidateStep = useCallback(
    (step: number) => {
      dispatch({ type: 'INVALIDATE_STEP', step });
    },
    [dispatch]
  );

  const setStepValidity = useCallback(
    (step: number, valid: boolean) => {
      dispatch({ type: 'SET_STEP_VALIDITY', step, valid });
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return {
    currentStep,
    totalSteps,
    direction: state.direction,
    isFirst,
    isLast,
    steps: state.steps,
    next,
    prev,
    goTo,
    completeStep,
    invalidateStep,
    setStepValidity,
    reset,
    dispatch,
  };
}
