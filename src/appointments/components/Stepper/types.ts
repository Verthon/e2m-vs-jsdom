import type { ReactElement, ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/** @public */
export type StepperAction =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'goto'; step: number }; // 1-based, visited steps only

// ---------------------------------------------------------------------------
// Render props
// ---------------------------------------------------------------------------

/**
 * Read-only state and dispatch injected into each step's render function.
 * @public
 */
export type StepRenderProps = {
  dispatch: (action: StepperAction) => void;
  /** 1-based index of the active step. */
  currentStep: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
};

// ---------------------------------------------------------------------------
// Component props
// ---------------------------------------------------------------------------

/**
 * Props for a single wizard step.
 * @public
 */
export type StepProps = {
  label: string;
  description?: string;
  children: (props: StepRenderProps) => ReactNode;
};

/**
 * Props for the root Stepper component.
 * @public
 */
export type StepperProps = {
  /** Used in `document.title` as "Step X of Y: {stepLabel} – {title}". */
  title: string;
  children: ReactElement<StepProps> | ReactElement<StepProps>[];
};

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

export type StepperState = {
  activeStep: number; // 1-based
  visitedSteps: Set<number>;
};

export type StepperInternalAction =
  | { type: 'next'; totalSteps: number }
  | { type: 'prev' }
  | { type: 'goto'; step: number; visitedSteps: Set<number> };