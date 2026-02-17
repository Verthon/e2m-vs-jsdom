import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export const useStepFocus = (
  activeKey: string,
  stepKey: string,
  stepRef: RefObject<HTMLFieldSetElement | null>
): void => {
  const wasActiveRef = useRef(false);

  useEffect(() => {
    const isActive = activeKey === stepKey;
    if (isActive && !wasActiveRef.current) {
      stepRef.current?.focus();
    }
    wasActiveRef.current = isActive;
  }, [activeKey, stepKey, stepRef]);
};
