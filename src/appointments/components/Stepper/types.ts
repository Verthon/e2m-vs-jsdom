import type { ReactNode } from 'react';

export type StepState = {
  completed: boolean;
  valid: boolean;
  visited: boolean;
};

export type StepMeta = {
  key: string;
  label: ReactNode | null;
  description: ReactNode | null;
  optional: boolean;
  onBeforeLeave: (() => boolean | Promise<boolean>) | null;
};

export type StepperState = {
  activeKey: string;
  previousKey: string | null;
  steps: Map<string, StepState>;
};

export type StepperAction =
  | { type: 'NEXT'; orderedKeys: string[] }
  | { type: 'PREV'; orderedKeys: string[] }
  | { type: 'GO_TO'; key: string }
  | { type: 'COMPLETE_STEP'; key: string }
  | { type: 'SKIP_STEP'; orderedKeys: string[] }
  | { type: 'SET_VALIDITY'; key: string; valid: boolean }
  | { type: 'RESET'; initialKey: string };

export type DeriveDirection = (
  orderedKeys: string[],
  activeKey: string,
  previousKey: string | null
) => 'forward' | 'backward' | null;
