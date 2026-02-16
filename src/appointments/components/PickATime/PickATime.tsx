import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { TimeSlots } from './TimeSlots';

interface PickATimeProps {
  readonly onSelectionChange?: (date: number | null, time: string | null) => void;
}

export function PickATime({ onSelectionChange }: PickATimeProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateSelect = (day: number) => {
    const next = selectedDate === day ? null : day;
    setSelectedDate(next);
    onSelectionChange?.(next, selectedTime);
  };

  const handleTimeSelect = (time: string) => {
    const next = selectedTime === time ? null : time;
    setSelectedTime(next);
    onSelectionChange?.(selectedDate, next);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5">
        <DatePicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
      </div>
      <div className="lg:col-span-7">
        <TimeSlots selectedTime={selectedTime} onTimeSelect={handleTimeSelect} />
      </div>
    </div>
  );
}
