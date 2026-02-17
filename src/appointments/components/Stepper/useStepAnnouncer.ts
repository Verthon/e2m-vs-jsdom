import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useStepperContext } from './StepperContext';
import { useRegistration } from './RegistrationContext';

export const useStepAnnouncer = (liveRegionRef: RefObject<HTMLElement | null>): void => {
  const { state, orderedKeys } = useStepperContext();
  const { getMeta } = useRegistration();

  const activeKey = state.activeKey;
  const stepIndex = orderedKeys.indexOf(activeKey);
  const total = orderedKeys.length;
  const n = stepIndex === -1 ? 1 : stepIndex + 1;

  const meta = getMeta(activeKey);
  const labelText = typeof meta?.label === 'string' ? meta.label : '';
  const announcement = labelText
    ? `Step ${n} of ${total}: ${labelText}`
    : `Step ${n} of ${total}`;

  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = announcement;
    }
  }, [announcement, liveRegionRef]);
};
