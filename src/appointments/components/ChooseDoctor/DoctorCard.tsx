import { CalendarCheck, Star } from 'lucide-react';
import { Radio } from '@base-ui/react/radio';

interface DoctorCardProps {
  readonly value: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly rating: string;
  readonly nextAvailable: string;
  readonly bio: string;
  readonly isSelected: boolean;
  readonly onSelect: () => void;
}

export function DoctorCard({
  value,
  name,
  imageUrl,
  imageAlt,
  rating,
  nextAvailable,
  bio,
  isSelected,
  onSelect,
}: DoctorCardProps) {
  const radioId = `doctor-radio-${value}`;

  return (
    <label
      htmlFor={radioId}
      className={[
        'cursor-pointer flex flex-col md:flex-row items-center gap-6 rounded-xl border-2 p-6 transition-all hover:shadow-lg',
        'outline-none focus-within:ring-[3px] focus-within:ring-ring focus-within:ring-offset-2',
        isSelected
          ? 'border-primary bg-primary/5 ring-[3px] ring-primary ring-offset-2'
          : 'border-slate-700 dark:border-slate-600 bg-white dark:bg-slate-900/50',
      ].join(' ')}
    >
      <Radio.Root id={radioId} value={value} className="sr-only" onClick={onSelect} />
      <img
        src={imageUrl}
        alt={imageAlt}
        className="h-40 w-full md:w-48 shrink-0 rounded-lg object-cover bg-slate-100"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-slate-900 dark:text-white text-2xl font-extrabold">{name}</h3>
          {isSelected && (
            <span aria-hidden="true" className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Selected
            </span>
          )}
          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-primary font-bold">
            <Star aria-hidden="true" size={14} className="fill-current" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-primary font-bold flex items-center gap-2">
          <CalendarCheck aria-hidden="true" size={20} />
          {nextAvailable}
        </p>
        <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed max-w-xl">{bio}</p>
      </div>
    </label>
  );
}
