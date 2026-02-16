import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';

interface DoctorCardProps {
  readonly name: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly rating: string;
  readonly nextAvailable: string;
  readonly nextAvailableIcon: string;
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
  nextAvailableIcon,
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
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">{nextAvailableIcon}</span>
          {nextAvailable}
        </p>
        <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed max-w-xl">{bio}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            aria-label={`${t('appointments.chooseDoctor.selectLabel')} ${name}`}
            onClick={onSelect}
            className="flex h-12 min-w-[140px] cursor-pointer items-center justify-center rounded-lg bg-primary text-white text-base font-bold transition-colors hover:bg-emerald-900 px-6 active:scale-95"
          >
            {t('appointments.chooseDoctor.selectLabel')}
          </button>
          <button
            type="button"
            onClick={onViewProfile}
            className="flex h-12 min-w-[140px] cursor-pointer items-center justify-center rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 px-6"
          >
            {t('appointments.chooseDoctor.viewProfile')}
          </button>
        </div>
      </div>
    </div>
  );
}
