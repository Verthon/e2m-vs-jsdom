import { useEffect, useRef } from 'react';

interface UseStepDocumentTitleOptions {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

export function useStepDocumentTitle({ currentStep, totalSteps, stepLabel }: UseStepDocumentTitleOptions) {
  const initialTitleRef = useRef<string>(document.title);
  const stepAnnouncement = `Step ${currentStep + 1} of ${totalSteps}`;

  useEffect(() => {
    const prefix = stepLabel
      ? `${stepAnnouncement}: ${stepLabel} – `
      : `${stepAnnouncement} – `;

    document.title = `${prefix}${initialTitleRef.current}`;

    return () => {
      document.title = initialTitleRef.current;
    };
  }, [currentStep, stepLabel, stepAnnouncement]);
}
