import { useEffect } from 'react';

interface UseStepAnnouncerOptions {
  announcement: string;
  liveRegionRef: React.RefObject<HTMLDivElement | null>;
}

export function useStepAnnouncer({ announcement, liveRegionRef }: UseStepAnnouncerOptions) {
  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = announcement;
    }
  }, [announcement, liveRegionRef]);
}
