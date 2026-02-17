import { useRef } from 'react';
import { useStepContext } from './StepContext';
import { useStepperContext } from './StepperContext';

type StepperValidationProps = {
  valid: boolean;
};

export const StepperValidation = ({ valid }: StepperValidationProps) => {
  const { stepKey } = useStepContext();
  const { dispatch } = useStepperContext();
  const prevValidRef = useRef<boolean | undefined>(undefined);

  if (prevValidRef.current !== valid) {
    prevValidRef.current = valid;
    dispatch({ type: 'SET_VALIDITY', key: stepKey, valid });
  }

  return null;
};
