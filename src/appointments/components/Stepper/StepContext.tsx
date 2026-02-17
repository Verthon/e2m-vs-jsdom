import { createContext, useContext } from 'react';

type StepContextValue = {
  stepKey: string;
};

const StepContext = createContext<StepContextValue | null>(null);

export const useStepContext = (): StepContextValue => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStepContext must be used within a Stepper.Step');
  }
  return context;
};

export { StepContext };
