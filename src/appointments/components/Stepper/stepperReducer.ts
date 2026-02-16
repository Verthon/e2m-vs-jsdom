import type { StepperState, StepperAction } from './types';

export const createInitialState = (totalSteps: number): StepperState => ({
  currentStep: 0,
  totalSteps,
  direction: 'forward',
  steps: Object.fromEntries(
    Array.from({ length: totalSteps }, (_, i) => [
      i,
      { completed: false, valid: false, visited: i === 0 },
    ])
  ),
});

export const stepperReducer = (
  state: StepperState,
  action: StepperAction
): StepperState => {
  switch (action.type) {
    case 'NEXT': {
      const nextStep = Math.min(state.currentStep + 1, state.totalSteps - 1);
      return {
        ...state,
        currentStep: nextStep,
        direction: 'forward',
        steps: {
          ...state.steps,
          [state.currentStep]: {
            ...state.steps[state.currentStep],
            visited: true,
          },
          [nextStep]: {
            ...state.steps[nextStep],
            visited: true,
          },
        },
      };
    }

    case 'PREV': {
      const prevStep = Math.max(state.currentStep - 1, 0);
      return {
        ...state,
        currentStep: prevStep,
        direction: 'backward',
      };
    }

    case 'GO_TO': {
      const targetStep = action.step;
      const isAllowed =
        targetStep <= state.currentStep || state.steps[targetStep]?.visited;

      if (!isAllowed) {
        return state;
      }

      const direction = targetStep > state.currentStep ? 'forward' : 'backward';

      return {
        ...state,
        currentStep: targetStep,
        direction,
      };
    }

    case 'COMPLETE_STEP': {
      return {
        ...state,
        steps: {
          ...state.steps,
          [action.step]: {
            ...state.steps[action.step],
            completed: true,
            valid: true,
          },
        },
      };
    }

    case 'INVALIDATE_STEP': {
      return {
        ...state,
        steps: {
          ...state.steps,
          [action.step]: {
            ...state.steps[action.step],
            completed: false,
            valid: false,
          },
        },
      };
    }

    case 'SET_STEP_VALIDITY': {
      return {
        ...state,
        steps: {
          ...state.steps,
          [action.step]: {
            ...state.steps[action.step],
            valid: action.valid,
          },
        },
      };
    }

    case 'RESET': {
      return createInitialState(state.totalSteps);
    }

    default:
      return state;
  }
};


