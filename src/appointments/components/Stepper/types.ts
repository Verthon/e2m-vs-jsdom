export interface StepState {
  completed: boolean;
  valid: boolean;
  visited: boolean;
}

export interface StepperState {
  currentStep: number;
  totalSteps: number;
  direction: 'forward' | 'backward';
  steps: Record<number, StepState>;
}

export type StepperAction =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GO_TO'; step: number }
  | { type: 'COMPLETE_STEP'; step: number }
  | { type: 'INVALIDATE_STEP'; step: number }
  | { type: 'SET_STEP_VALIDITY'; step: number; valid: boolean }
  | { type: 'RESET' };
