import type { StepState, StepperState, StepperAction } from './types';

export const createInitialState = (
  firstKey: string,
  allKeys: string[]
): StepperState => ({
  activeKey: firstKey,
  previousKey: null,
  steps: new Map<string, StepState>(
    allKeys.map((key) => [
      key,
      { completed: false, valid: false, visited: key === firstKey },
    ])
  ),
});

const updateStep = (
  steps: Map<string, StepState>,
  key: string,
  patch: Partial<StepState>
): Map<string, StepState> => {
  const current = steps.get(key);
  if (!current) return steps;
  const next = new Map(steps);
  next.set(key, { ...current, ...patch });
  return next;
};

export const stepperReducer = (
  state: StepperState,
  action: StepperAction
): StepperState => {
  switch (action.type) {
    case 'NEXT': {
      const { orderedKeys } = action;
      const idx = orderedKeys.indexOf(state.activeKey);
      if (idx === -1 || idx >= orderedKeys.length - 1) return state;

      const currentStep = state.steps.get(state.activeKey);
      if (!currentStep?.valid) return state;

      const nextKey = orderedKeys[idx + 1];
      const steps = updateStep(state.steps, nextKey, { visited: true });

      return {
        activeKey: nextKey,
        previousKey: state.activeKey,
        steps,
      };
    }

    case 'PREV': {
      const { orderedKeys } = action;
      const idx = orderedKeys.indexOf(state.activeKey);
      if (idx <= 0) return state;

      const prevKey = orderedKeys[idx - 1];
      return {
        ...state,
        activeKey: prevKey,
        previousKey: state.activeKey,
      };
    }

    case 'GO_TO': {
      const targetStep = state.steps.get(action.key);
      if (!targetStep?.visited) return state;

      return {
        ...state,
        activeKey: action.key,
        previousKey: state.activeKey,
      };
    }

    case 'COMPLETE_STEP': {
      return {
        ...state,
        steps: updateStep(state.steps, action.key, {
          completed: true,
          valid: true,
        }),
      };
    }

    case 'SKIP_STEP': {
      const { orderedKeys } = action;
      const idx = orderedKeys.indexOf(state.activeKey);
      if (idx === -1 || idx >= orderedKeys.length - 1) return state;

      const nextKey = orderedKeys[idx + 1];
      const steps = updateStep(state.steps, nextKey, { visited: true });

      return {
        activeKey: nextKey,
        previousKey: state.activeKey,
        steps,
      };
    }

    case 'SET_VALIDITY': {
      return {
        ...state,
        steps: updateStep(state.steps, action.key, { valid: action.valid }),
      };
    }

    case 'RESET': {
      const allKeys = Array.from(state.steps.keys());
      return createInitialState(action.initialKey, allKeys);
    }

    default:
      return state;
  }
};
