import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';

interface DatePickerProps {
  readonly selectedDate: Date | null;
  readonly onDateSelect: (date: Date | null) => void;
}

export function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
  const { t } = useAppointmentsTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 w-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        {t('appointments.pickATime.calendar.heading')}
      </h3>

      <ReactDatePicker
        inline
        selected={selectedDate}
        onChange={onDateSelect}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex items-center justify-between px-2 mb-2">
            <button
              type="button"
              onClick={decreaseMonth}
              aria-label={t('appointments.pickATime.calendar.prevMonth')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <span className="font-bold text-slate-900 dark:text-white">
              {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              type="button"
              onClick={increaseMonth}
              aria-label={t('appointments.pickATime.calendar.nextMonth')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        )}
        calendarClassName="!w-full !border-none !shadow-none !bg-transparent"
        wrapperClassName="w-full"
      />

      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Info size={20} className="text-primary" aria-hidden="true" />
          <span>{t('appointments.pickATime.calendar.availabilityUpdated')}</span>
        </div>
      </div>
    </div>
  );
}
