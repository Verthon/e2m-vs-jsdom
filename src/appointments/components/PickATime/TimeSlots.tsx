import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';

interface TimeSlotsProps {
  readonly selectedTime: string | null;
  readonly onTimeSelect: (time: string) => void;
}

interface RecommendedSlot {
  labelKey: 'appointments.pickATime.recommended.soonest' | 'appointments.pickATime.recommended.morning' | 'appointments.pickATime.recommended.evening';
  time: string;
}

interface TimeGroup {
  labelKey: 'appointments.pickATime.allAvailability.morning' | 'appointments.pickATime.allAvailability.afternoon' | 'appointments.pickATime.allAvailability.evening';
  icon: string;
  times: string[];
}

const RECOMMENDED_SLOTS: RecommendedSlot[] = [
  { labelKey: 'appointments.pickATime.recommended.soonest', time: '08:15' },
  { labelKey: 'appointments.pickATime.recommended.morning', time: '09:30' },
  { labelKey: 'appointments.pickATime.recommended.evening', time: '17:45' },
];

const TIME_GROUPS: TimeGroup[] = [
  {
    labelKey: 'appointments.pickATime.allAvailability.morning',
    icon: 'sunny',
    times: ['08:00', '08:30', '09:00', '10:15', '11:00'],
  },
  {
    labelKey: 'appointments.pickATime.allAvailability.afternoon',
    icon: 'wb_sunny',
    times: ['13:30', '14:00', '15:15', '16:45'],
  },
  {
    labelKey: 'appointments.pickATime.allAvailability.evening',
    icon: 'dark_mode',
    times: ['18:00', '19:30'],
  },
];

export function TimeSlots({ selectedTime, onTimeSelect }: TimeSlotsProps) {
  const { t } = useAppointmentsTranslation();

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-emerald-800" aria-hidden="true">star</span>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
            {t('appointments.pickATime.recommended.heading')}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {RECOMMENDED_SLOTS.map((slot) => {
            const isSelected = selectedTime === slot.time;
            return (
              <div key={slot.time} className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase px-1">
                  {t(slot.labelKey)}
                </span>
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

      <section>
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2 uppercase tracking-tight">
          <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
          {t('appointments.pickATime.allAvailability.heading')}
        </h3>

        <div className="space-y-6">
          {TIME_GROUPS.map((group) => (
            <div key={group.labelKey}>
              <h4 className="text-sm font-bold text-slate-500 mb-3 uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-base" aria-hidden="true">{group.icon}</span>
                {t(group.labelKey)}
              </h4>
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
