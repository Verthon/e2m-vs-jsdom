import type { StepperState, StepperInternalAction } from "./types";

export const stepperReducer = (
  state: StepperState,
  action: StepperInternalAction,
): StepperState => {
  switch (action.type) {
    case "next": {
      if (state.activeStep >= action.totalSteps) return state;
      const next = state.activeStep + 1;
      return {
        activeStep: next,
        visitedSteps: new Set([...state.visitedSteps, next]),
      };
    }
    case "prev": {
      if (state.activeStep <= 1) return state;
      return { ...state, activeStep: state.activeStep - 1 };
    }
    case "goto": {
      if (!action.visitedSteps.has(action.step)) return state;
      return { ...state, activeStep: action.step };
    }
    default:
      return state;
  }
};

export const initialState = () => ({
  activeStep: 1,
  visitedSteps: new Set([1]),
} satisfies StepperState);
