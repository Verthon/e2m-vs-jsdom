import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useAppointmentsTranslation } from '../i18n/useAppointmentsTranslation';
import { ChooseDoctor } from '../components/ChooseDoctor/ChooseDoctor';

export default function ChooseDoctorPage() {
  const { t } = useAppointmentsTranslation();
  const [searchParams] = useSearchParams();
  const specialtyId = searchParams.get('specialtyId');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
              {t('appointments.chooseDoctor.heading')}
            </h1>
            <span className="text-slate-900 dark:text-slate-300 text-sm font-bold uppercase tracking-wider">
              {t('appointments.chooseDoctor.stepLabel')}
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              role="progressbar"
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-full bg-primary rounded-full"
              style={{ width: '75%' }}
            />
          </div>
          <p className="text-slate-700 dark:text-slate-400 text-base font-medium">
            {t('appointments.chooseDoctor.description')}
          </p>
        </div>
        <ChooseDoctor specialtyId={specialtyId} selectedDoctorId={selectedDoctorId} onSelect={(id) => setSelectedDoctorId(id)} />
      </main>
    </div>
  );
}
