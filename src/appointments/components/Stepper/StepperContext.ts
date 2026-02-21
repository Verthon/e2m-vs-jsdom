import { createContext, useContext } from 'react';
import type { StepRenderProps } from './types';

export const StepperContext = createContext<StepRenderProps | null>(null);

export const useStepperContext = (): StepRenderProps => {
  const ctx = useContext(StepperContext);
  if (!ctx) throw new Error('useStepperContext must be used inside <Stepper>');
  return ctx;
};
