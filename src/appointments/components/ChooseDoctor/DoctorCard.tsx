import { CalendarCheck, Star } from 'lucide-react';
import { Button } from 'src/ui/atoms/Button/Button';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';

interface DoctorCardProps {
  readonly name: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly rating: string;
  readonly nextAvailable: string;
  readonly bio: string;
  readonly onSelect: () => void;
  readonly onViewProfile: () => void;
}

export function DoctorCard({
  name,
  imageUrl,
  imageAlt,
  rating,
  nextAvailable,
  bio,
  onSelect,
  onViewProfile,
}: DoctorCardProps) {
  const { t } = useAppointmentsTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 rounded-xl border-2 border-slate-700 dark:border-slate-600 bg-white dark:bg-slate-900/50 p-6 transition-all hover:shadow-lg">
      <img
        src={imageUrl}
        alt={imageAlt}
        className="h-40 w-full md:w-48 shrink-0 rounded-lg object-cover bg-slate-100"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-slate-900 dark:text-white text-2xl font-extrabold">{name}</h3>
          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-primary font-bold">
            <Star size={14} className="fill-current" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-primary font-bold flex items-center gap-2">
          <CalendarCheck size={20} />
          {nextAvailable}
        </p>
        <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed max-w-xl">{bio}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            variant="primary"
            aria-label={`${t('appointments.chooseDoctor.selectLabel')} ${name}`}
            onClick={onSelect}
          >
            {t('appointments.chooseDoctor.selectLabel')}
          </Button>
          <Button variant="outline" onClick={onViewProfile}>
            {t('appointments.chooseDoctor.viewProfile')}
          </Button>
        </div>
      </div>
    </div>
  );
}
