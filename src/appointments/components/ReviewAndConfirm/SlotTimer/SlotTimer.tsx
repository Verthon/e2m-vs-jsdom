import { Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Text } from 'src/ui/atoms/Text/Text';
import { useAppointmentsTranslation } from '../../../i18n/useAppointmentsTranslation';
import { SlotExpiredDialog } from './SlotExpiredDialog';

const TOTAL_SECONDS = 4 * 60 + 59;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function SlotTimer() {
  const { t } = useAppointmentsTranslation();
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [timerAnnouncement, setTimerAnnouncement] = useState('');
  const isExpired = secondsLeft <= 0;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        if (next === 180) setTimerAnnouncement('3 minutes remaining');
        else if (next === 60) setTimerAnnouncement('1 minute remaining');
        else if (next === 30) setTimerAnnouncement('30 seconds remaining');
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  return (
    <>
      <div
        role="status"
        className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-600 rounded-lg p-5 flex items-center gap-4 mb-10"
      >
        <Timer aria-hidden="true" className="text-amber-600 size-6" />
        <div className="flex-1">
          <Text as="p" weight="bold" variant="m">
            {t('appointments.reviewAndConfirm.timer.title')}
          </Text>
          <Text as="p" variant="s">
            {t('appointments.reviewAndConfirm.timer.body')}{' '}
            <span role="timer" className="font-mono font-bold">
              {formatTime(secondsLeft)}
            </span>
          </Text>
        </div>
      </div>

      <span aria-live="assertive" className="sr-only">
        {timerAnnouncement}
      </span>

      {isExpired && (
        <SlotExpiredDialog isOpen={isExpired} onOpenChange={() => {}} />
      )}
    </>
  );
}
