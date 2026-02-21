import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { ReactElement } from "react";
import { StepperNav } from "./StepperNav";
import type { StepProps, StepperAction, StepperProps } from "./types";
import { StepperContext } from "./StepperContext";
import { initialState, stepperReducer } from "./stepperReducer";

/**
 * Multi-step wizard container. Owns navigation state and renders a progress nav
 * with accessible step indicators. Each child must be a <Step>.
 *
 * @public
 *
 * @example
 * <Stepper title="Book Appointment">
 *   <Step label="Specialty" description="Choose a category">
 *     {({ dispatch, isFirst, isLast }) => (
 *       <button onClick={() => dispatch({ type: 'next' })}>Next</button>
 *     )}
 *   </Step>
 *   <Step label="Review" description="Confirm details">
 *     {({ dispatch }) => (
 *       <button onClick={() => dispatch({ type: 'prev' })}>Back</button>
 *     )}
 *   </Step>
 * </Stepper>
 */
export const Stepper = ({ title, children }: StepperProps) => {
  const steps = Children.toArray(children).filter(
    (child): child is ReactElement<StepProps> => isValidElement(child),
  );

  const totalSteps = steps.length;
  const [state, rawDispatch] = useReducer(
    stepperReducer,
    undefined,
    initialState,
  );

  // Bridge public StepperAction → internal StepperInternalAction
  const dispatch = useCallback(
    (action: StepperAction) => {
      switch (action.type) {
        case "next":
          return rawDispatch({ type: "next", totalSteps });
        case "prev":
          return rawDispatch({ type: "prev" });
        case "goto":
          return rawDispatch({
            type: "goto",
            step: action.step,
            visitedSteps: state.visitedSteps,
          });
      }
    },
    [totalSteps, state.visitedSteps],
  );

  // Update document.title per W3C multi-page form guidance
  useEffect(() => {
    const activeStepEl = steps[state.activeStep - 1];
    const stepLabel = activeStepEl?.props.label ?? "";
    document.title = `Step ${state.activeStep} of ${totalSteps}: ${stepLabel} – ${title}`;
  }, [state.activeStep, totalSteps, title, steps]);

  const contextValue = useMemo(
    () => ({
      dispatch,
      currentStep: state.activeStep,
      totalSteps,
      isFirst: state.activeStep === 1,
      isLast: state.activeStep === totalSteps,
    }),
    [dispatch, state.activeStep, totalSteps],
  );

  const activeStepEl = steps[state.activeStep - 1];

  return (
    <StepperContext.Provider value={contextValue}>
      <StepperNav
        steps={steps}
        activeStep={state.activeStep}
        visitedSteps={state.visitedSteps}
        dispatch={dispatch}
      />
      <div role="region" aria-live="polite" aria-atomic="false">
        {activeStepEl}
      </div>
    </StepperContext.Provider>
  );
};
