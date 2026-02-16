import { useState } from 'react';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';

interface DatePickerProps {
  readonly selectedDate: number | null;
  readonly onDateSelect: (day: number) => void;
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

interface CalendarMonth {
  year: number;
  month: number;
  label: string;
  startWeekday: number;
  totalDays: number;
  prevMonthDays: number[];
}

const OCTOBER_2023: CalendarMonth = {
  year: 2023,
  month: 10,
  label: 'October 2023',
  startWeekday: 0,
  totalDays: 31,
  prevMonthDays: [28, 29, 30],
};

export function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
  const { t } = useAppointmentsTranslation();
  const [calendar] = useState<CalendarMonth>(OCTOBER_2023);

  const currentDays = Array.from({ length: calendar.totalDays }, (_, i) => i + 1);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {t('appointments.pickATime.calendar.heading')}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={t('appointments.pickATime.calendar.prevMonth')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
          </button>
          <button
            type="button"
            aria-label={t('appointments.pickATime.calendar.nextMonth')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          </button>
        </div>
      </div>

      <p className="text-center font-bold text-slate-900 dark:text-white mb-4">
        {calendar.label}
      </p>

      <div className="grid grid-cols-7 text-center mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <span key={day} className="text-xs font-bold text-slate-400 uppercase py-2">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendar.prevMonthDays.map((day) => (
          <button
            key={`prev-${day}`}
            type="button"
            disabled
            className="h-12 flex items-center justify-center text-slate-300 dark:text-slate-700 text-sm"
          >
            {day}
          </button>
        ))}

        {currentDays.map((day) => {
          const isSelected = selectedDate === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => onDateSelect(day)}
              aria-pressed={isSelected}
              className={[
                'h-12 flex items-center justify-center text-sm transition-colors rounded-lg',
                isSelected
                  ? 'bg-primary text-white font-bold shadow-md'
                  : 'text-slate-900 dark:text-white hover:bg-primary/10',
              ].join(' ')}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }} aria-hidden="true">info</span>
          <span>{t('appointments.pickATime.calendar.availabilityUpdated')}</span>
        </div>
      </div>
    </div>
  );
}
