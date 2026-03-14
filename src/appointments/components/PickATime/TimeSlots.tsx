import { useMemo } from 'react';
import { Star, Clock, Sun, SunMedium, Moon, AlertCircle, CalendarDays } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';
import { Button } from 'src/ui/atoms/Button/Button';
import { Text } from 'src/ui/atoms/Text/Text';
import { Skeleton } from 'src/ui/atoms/Skeleton/Skeleton';
import type { TimeslotsResponse } from '../../responses/Timeslots';

interface TimeSlotsProps {
  readonly selectedTime: string | null;
  readonly onTimeSelect: (time: string) => void;
  readonly timeslots: TimeslotsResponse | undefined;
  readonly isPending: boolean;
  readonly isError: boolean;
  readonly dateSelected: boolean;
  readonly onRetry: () => void;
}

type TimeSlotsStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';

interface TimeGroup {
  labelKey: 'appointments.pickATime.allAvailability.morning' | 'appointments.pickATime.allAvailability.afternoon' | 'appointments.pickATime.allAvailability.evening';
  Icon: LucideIcon;
  times: string[];
}

function getTimeSlotsStatus(
  dateSelected: boolean,
  isPending: boolean,
  isError: boolean,
  slotsCount: number,
): TimeSlotsStatus {
  if (!dateSelected) return 'idle';
  if (isError) return 'error';
  if (isPending) return 'loading';
  if (slotsCount === 0) return 'empty';
  return 'success';
}

function groupSlots(availableTimes: string[]): TimeGroup[] {
  const morning: string[] = [];
  const afternoon: string[] = [];
  const evening: string[] = [];

  for (const time of availableTimes) {
    const hour = parseInt(time.split(':')[0], 10);
    if (hour < 12) morning.push(time);
    else if (hour < 17) afternoon.push(time);
    else evening.push(time);
  }

  return [
    { labelKey: 'appointments.pickATime.allAvailability.morning', Icon: Sun, times: morning },
    { labelKey: 'appointments.pickATime.allAvailability.afternoon', Icon: SunMedium, times: afternoon },
    { labelKey: 'appointments.pickATime.allAvailability.evening', Icon: Moon, times: evening },
  ].filter((g) => g.times.length > 0) as TimeGroup[];
}


function TimeSlotsSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Skeleton height={20} width={20} rounded="full" />
          <Skeleton height={20} width={160} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton height={12} width={64} />
              <Skeleton height={56} rounded="lg" />
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Skeleton height={20} width={20} rounded="full" />
          <Skeleton height={20} width={140} />
        </div>
        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, gi) => (
            <div key={gi}>
              <div className="flex items-center gap-1 mb-3">
                <Skeleton height={16} width={16} rounded="full" />
                <Skeleton height={14} width={80} />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} height={48} rounded="lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function TimeSlots({ selectedTime, onTimeSelect, timeslots, isPending = true, isError, dateSelected, onRetry }: TimeSlotsProps) {
  const { t } = useAppointmentsTranslation();

  const availableTimes = useMemo(
    () => timeslots?.slots.filter((s) => s.available).map((s) => s.time) ?? [],
    [timeslots],
  );

  const status = getTimeSlotsStatus(dateSelected, isPending, isError, availableTimes.length);

  type RecommendedLabelKey =
    | 'appointments.pickATime.recommended.soonest'
    | 'appointments.pickATime.recommended.morning'
    | 'appointments.pickATime.recommended.afternoon'
    | 'appointments.pickATime.recommended.evening';

  const recommended = useMemo(() => {
    const labelMap: Record<TimeGroup['labelKey'], RecommendedLabelKey> = {
      'appointments.pickATime.allAvailability.morning': 'appointments.pickATime.recommended.morning',
      'appointments.pickATime.allAvailability.afternoon': 'appointments.pickATime.recommended.afternoon',
      'appointments.pickATime.allAvailability.evening': 'appointments.pickATime.recommended.evening',
    };

    const soonest: { labelKey: RecommendedLabelKey; time: string }[] = availableTimes.length > 0
      ? [{ labelKey: 'appointments.pickATime.recommended.soonest', time: availableTimes[0] }]
      : [];

    const fromGroups = groupSlots(availableTimes)
      .filter((group) => group.times[0] !== availableTimes[0])
      .slice(0, 3 - soonest.length)
      .map((group) => ({ labelKey: labelMap[group.labelKey], time: group.times[0] }));

    return [...soonest, ...fromGroups];
  }, [availableTimes]);

  const timeGroups = useMemo(() => groupSlots(availableTimes), [availableTimes]);

  if (status === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-center h-full">
        <CalendarDays size={32} className="text-slate-400" aria-hidden="true" />
        <Text as="h3" size="base" weight="semi-bold" color="primary">
          {t('appointments.pickATime.idle.heading')}
        </Text>
        <Text size="sm" color="secondary">
          {t('appointments.pickATime.idle.description')}
        </Text>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="h-full">
        <TimeSlotsSkeleton />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-center h-full">
        <AlertCircle size={24} className="text-red-500" aria-hidden="true" />
        <Text size="sm" weight="semi-bold" color="error">{t('appointments.pickATime.error.message')}</Text>
        <Button variant="outline" size="sm" onClick={onRetry}>
          {t('appointments.pickATime.error.retry')}
        </Button>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-center h-full">
        <CalendarDays size={32} className="text-slate-400" aria-hidden="true" />
        <Text as="h3" size="base" weight="semi-bold" color="primary">
          {t('appointments.pickATime.empty.heading')}
        </Text>
        <Text size="sm" color="secondary">
          {t('appointments.pickATime.empty.description')}
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-8 h-full">
      {recommended.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-emerald-800" size={20} aria-hidden="true" />
            <Text as="h3" size="lg" weight="bold" color="primary">
              {t('appointments.pickATime.recommended.heading')}
            </Text>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {recommended.map((slot) => {
              const isSelected = selectedTime === slot.time;
              return (
                <div key={slot.time} className="flex flex-col gap-2">
                  <Text size="xs" weight="bold" color="secondary">
                    {t(slot.labelKey)}
                  </Text>
                  <button
                    type="button"
                    onClick={() => onTimeSelect(slot.time)}
                    aria-pressed={isSelected}
                    className={[
                      'h-14 rounded-lg flex items-center justify-center text-lg font-bold transition-all',
                      'focus:ring-2 focus:ring-primary focus:ring-offset-2',
                      isSelected
                        ? 'bg-emerald-800 text-white shadow-lg ring-2 ring-emerald-800 ring-offset-2'
                        : 'border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
                    ].join(' ')}
                  >
                    {slot.time}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center gap-2 mb-6">
          <Clock size={20} aria-hidden="true" />
          <Text as="h3" size="lg" weight="bold" color="primary">
            {t('appointments.pickATime.allAvailability.heading')}
          </Text>
        </div>

        <div className="space-y-6">
          {timeGroups.map((group) => (
            <div key={group.labelKey}>
              <div className="flex items-center gap-1 mb-3">
                <group.Icon size={16} aria-hidden="true" />
                <Text as="h4" size="sm" weight="bold" color="secondary">
                  {t(group.labelKey)}
                </Text>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {group.times.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => onTimeSelect(time)}
                      aria-pressed={isSelected}
                      className={[
                        'h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-colors',
                        isSelected
                          ? 'bg-emerald-800 text-white shadow-md'
                          : 'border border-slate-900 dark:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white',
                      ].join(' ')}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
