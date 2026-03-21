import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { TimeSlots } from './TimeSlots';
import { useGetTimeslots } from '../../hooks/useGetTimeslots';
import { dateService } from 'src/core/services/dateService';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';
import { Heading } from 'src/ui/atoms/Heading/Heading';
import { Text } from 'src/ui/atoms/Text/Text';

interface PickATimeProps {
  readonly doctorId: string;
  readonly onSelectionChange?: (selection: { date: Date | null; time: string | null }) => void;
}

export function PickATime({ doctorId, onSelectionChange }: PickATimeProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const date = selectedDate ? dateService.toDateString(selectedDate) : '';
  const { timeslots, isPending, isError, refetch } = useGetTimeslots(doctorId, date);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    onSelectionChange?.({ date, time: selectedTime });
  };

  const handleTimeSelect = (time: string) => {
    const next = selectedTime === time ? null : time;
    setSelectedTime(next);
    onSelectionChange?.({ date: selectedDate, time: next });
  };

  const { t } = useAppointmentsTranslation();

  return (
    <div className="space-y-6">
      <div>
        <Heading as="h2" variant="heading-md">
          {t('appointments.pickATime.heading')}
        </Heading>
        <Text as="p" variant="s" color="grey600">
          {t('appointments.pickATime.description')}
        </Text>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div className="lg:col-span-5 self-start">
        <DatePicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
      </div>
      <div className="lg:col-span-7">
        <TimeSlots selectedTime={selectedTime} onTimeSelect={handleTimeSelect} timeslots={timeslots} isPending={isPending} isError={isError} dateSelected={selectedDate !== null} onRetry={refetch} />
      </div>
    </div>
    </div>
  );
}
