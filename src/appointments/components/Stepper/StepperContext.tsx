import { createContext, useContext, useReducer, useMemo } from 'react';
import type { ReactNode, Dispatch } from 'react';
import { stepperReducer, createInitialState } from './stepperReducer';
import { useRegistration } from './RegistrationContext';
import type { StepperState, StepperAction } from './types';

type RegistrationContextValue = ReturnType<typeof useRegistration>;

type StepperContextValue = {
  state: StepperState;
  dispatch: Dispatch<StepperAction>;
  orderedKeys: string[];
  activeKey: string;
  isFirst: boolean;
  isLast: boolean;
  direction: 'forward' | 'backward' | null;
  registration: RegistrationContextValue;
};

const StepperContext = createContext<StepperContextValue | null>(null);

const deriveDirection = (
  orderedKeys: string[],
  activeKey: string,
  previousKey: string | null
): 'forward' | 'backward' | null => {
  if (previousKey === null) return null;
  const activeIdx = orderedKeys.indexOf(activeKey);
  const previousIdx = orderedKeys.indexOf(previousKey);
  if (activeIdx === -1 || previousIdx === -1) return null;
  return activeIdx > previousIdx ? 'forward' : 'backward';
};

type StepperProviderProps = {
  children: ReactNode;
  initialKey: string;
  allKeys: string[];
};

export const StepperProvider = ({ children, initialKey, allKeys }: StepperProviderProps) => {
  const registration = useRegistration();

  const [state, dispatch] = useReducer(
    stepperReducer,
    undefined,
    () => createInitialState(initialKey, allKeys)
  );

  const orderedKeys = useMemo(
    () => registration.getOrderedKeys(),
    [state.activeKey, registration]
  );

  const activeKey = state.activeKey;
  const activeIdx = orderedKeys.indexOf(activeKey);
  const isFirst = activeIdx <= 0;
  const isLast = orderedKeys.length > 0 && activeIdx === orderedKeys.length - 1;
  const direction = deriveDirection(orderedKeys, activeKey, state.previousKey);

  const value = useMemo<StepperContextValue>(
    () => ({
      state,
      dispatch,
      orderedKeys,
      activeKey,
      isFirst,
      isLast,
      direction,
      registration,
    }),
    [state, dispatch, orderedKeys, activeKey, isFirst, isLast, direction, registration]
  );

  return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
};

export const useStepperContext = (): StepperContextValue => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepperContext must be used within a StepperProvider');
  }
  return context;
};

export { StepperContext };
