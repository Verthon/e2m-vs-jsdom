import { Navigate } from 'react-router';
import { AlertCircle } from 'lucide-react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { Button } from 'src/ui/atoms/Button/Button';
import { Skeleton } from 'src/ui/atoms/Skeleton/Skeleton';
import { useGetDoctorsBySpecialty } from '../../hooks/useGetDoctorsBySpecialty';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';
import { DoctorCard } from './DoctorCard';
import { routesConfig } from 'src/routing/routesConfig';

function DoctorCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 rounded-xl border-2 border-slate-200 bg-white p-6">
      <Skeleton height={160} width={192} rounded="lg" />
      <div className="flex flex-1 flex-col gap-3 w-full">
        <Skeleton height={28} width={240} />
        <Skeleton height={20} width={180} />
        <Skeleton height={16} />
        <Skeleton height={16} width={320} />
      </div>
    </div>
  );
}

interface DoctorsErrorProps {
  readonly onRetry: () => void;
}

function DoctorsError({ onRetry }: DoctorsErrorProps) {
  const { t } = useAppointmentsTranslation();
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-red-200 bg-red-50 p-6 text-center">
      <AlertCircle size={24} className="text-red-500" />
      <p className="text-sm font-medium text-red-700">
        {t('appointments.chooseDoctor.error.message')}
      </p>
      <Button variant="outline" onClick={onRetry}>
        {t('appointments.chooseDoctor.error.retry')}
      </Button>
    </div>
  );
}

interface ChooseDoctorProps {
  readonly specialtyId: string | null;
  readonly selectedDoctorId: string | null;
  readonly onSelect: (id: string, name: string, photoUrl: string) => void;
}

export function ChooseDoctor({ specialtyId, selectedDoctorId, onSelect }: ChooseDoctorProps) {
  const { t } = useAppointmentsTranslation();
  const { doctors, isPending, isError, refetch } = useGetDoctorsBySpecialty(specialtyId ?? '');

  if (typeof specialtyId !== 'string') {
    return <Navigate to={routesConfig.createAppointment} replace />;
  }

  return (
    <section aria-label={t('appointments.chooseDoctor.section')} className="flex flex-col">
      <h2 className="text-slate-900 dark:text-white text-xl font-bold">
        {t('appointments.chooseDoctor.section')}
      </h2>

      {isPending && (
        <div className="flex flex-col gap-6 mt-4">
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
        </div>
      )}

      {isError && (
        <div className="mt-4">
          <DoctorsError onRetry={() => refetch()} />
        </div>
      )}

      {doctors && (
        <RadioGroup
          value={selectedDoctorId ?? ''}
          onValueChange={(id) => {
            const doctor = doctors.find((d) => d.id === id);
            if (doctor) {
              onSelect(doctor.id, doctor.name, doctor.imageUrl);
            }
          }}
          aria-label={t('appointments.chooseDoctor.section')}
          className="flex flex-col gap-6 mt-4"
        >
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              value={doctor.id}
              name={doctor.name}
              imageUrl={doctor.imageUrl}
              imageAlt={`Portrait of ${doctor.name}`}
              rating={`${doctor.rating.rate} (${doctor.rating.amountOfReviews} reviews)`}
              nextAvailable={doctor.nextAvailable}
              bio={doctor.bio.en}
              isSelected={selectedDoctorId === doctor.id}
              onSelect={() => onSelect(doctor.id, doctor.name, doctor.imageUrl)}
            />
          ))}
        </RadioGroup>
      )}
    </section>
  );
}
