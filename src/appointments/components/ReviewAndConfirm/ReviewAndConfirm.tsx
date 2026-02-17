import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';
import { useStepper } from '../Stepper/useStepper';

const DUMMY_SPECIALTY = {
  icon: 'cardiology',
  name: 'Cardiology',
};

const DUMMY_DOCTOR = {
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAiUVsZE1Iw3CH7i_CALbg-mYY79glCy0aNHZMY2pqORmTugnJe4t_RmTwHQVXmEybjrUPZYYApQEZp1TH633iyQHmB7PNDbh-Dv06BJ1qo8L4s3SvjyGziV4hPVZy46dqSQ6k9JgQp3bmr_UaDyWfgp8adTWVi4VY9Of1tc_lHB16Uj-mSZ1Yy2tqrXz2-wjZtqHhByH1qsipMoyCnJa1Z7edkIyNS1ImUyPowVRrzjiHgnI0I1Pr6fhuqUYZnUDWO5g_BpZn1UMk',
  imageAlt: 'Portrait of Dr. Sarah Jenkins, cardiologist',
  name: 'Dr. Sarah Jenkins',
  role: 'Senior Cardiologist',
  clinic: 'Heart & Lung Center',
};

const DUMMY_APPOINTMENT = {
  date: 'Tuesday, Oct 24, 2023',
  timeRange: '10:30 AM — 11:00 AM',
  duration: '30 min',
};

const HOLD_TIMER = '04:59';

export function ReviewAndConfirm() {
  const { t } = useAppointmentsTranslation();
  const { prev } = useStepper();

  return (
    <div>
      <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl md:text-4xl font-extrabold leading-tight text-center pb-8">
        {t('appointments.reviewAndConfirm.heading')}
      </h1>

      <div className="bg-white dark:bg-background-dark border-2 border-slate-200 dark:border-primary/30 rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-primary/10 pb-6">
            <div className="flex items-start gap-4">
              <span aria-hidden="true" className="material-symbols-outlined text-primary size-6 mt-1">
                {DUMMY_SPECIALTY.icon}
              </span>
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-extrabold uppercase tracking-wider mb-1">
                  {t('appointments.reviewAndConfirm.specialty.label')}
                </p>
                <p className="text-slate-900 dark:text-white text-xl font-medium">
                  {DUMMY_SPECIALTY.name}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="wcag-aaa-outline text-primary font-bold hover:underline px-2 py-1 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              {t('appointments.reviewAndConfirm.change')}
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-primary/10 pb-6">
            <div className="flex items-start gap-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 border border-slate-200"
                role="img"
                aria-label={DUMMY_DOCTOR.imageAlt}
                style={{ backgroundImage: `url("${DUMMY_DOCTOR.imageUrl}")` }}
              />
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-extrabold uppercase tracking-wider mb-1">
                  {t('appointments.reviewAndConfirm.doctor.label')}
                </p>
                <p className="text-slate-900 dark:text-white text-xl font-medium">
                  {DUMMY_DOCTOR.name}
                </p>
                <p className="text-primary font-semibold text-sm">
                  {DUMMY_DOCTOR.role} &bull; {DUMMY_DOCTOR.clinic}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="wcag-aaa-outline text-primary font-bold hover:underline px-2 py-1 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              {t('appointments.reviewAndConfirm.change')}
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span aria-hidden="true" className="material-symbols-outlined text-primary size-6 mt-1">
                calendar_today
              </span>
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-extrabold uppercase tracking-wider mb-1">
                  {t('appointments.reviewAndConfirm.time.label')}
                </p>
                <p className="text-slate-900 dark:text-white text-xl font-medium">
                  {DUMMY_APPOINTMENT.date}
                </p>
                <p className="text-slate-900 dark:text-white text-lg">
                  {DUMMY_APPOINTMENT.timeRange} ({DUMMY_APPOINTMENT.duration})
                </p>
              </div>
            </div>
            <button
              type="button"
              className="wcag-aaa-outline text-primary font-bold hover:underline px-2 py-1 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              {t('appointments.reviewAndConfirm.change')}
            </button>
          </div>
        </div>
      </div>

      <div
        role="alert"
        aria-live="polite"
        className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-600 rounded-lg p-5 flex items-center gap-4 mb-10"
      >
        <span aria-hidden="true" className="material-symbols-outlined text-amber-600 size-6">
          timer
        </span>
        <div className="flex-1">
          <p className="text-amber-900 dark:text-amber-100 font-bold">
            {t('appointments.reviewAndConfirm.timer.title')}
          </p>
          <p className="text-amber-900 dark:text-amber-200 text-sm">
            {t('appointments.reviewAndConfirm.timer.body')}{' '}
            <span className="font-mono font-bold">{HOLD_TIMER}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-slate-200 dark:border-primary/20">
        <button
          type="button"
          onClick={prev}
          className="wcag-aaa-outline order-2 md:order-1 flex min-w-[140px] items-center justify-center rounded-lg h-12 px-6 border-2 border-primary text-primary font-bold text-lg hover:bg-primary/5 transition-colors"
        >
          {t('appointments.stepper.back')}
        </button>
        <button
          type="button"
          className="wcag-aaa-outline order-1 md:order-2 flex flex-1 md:flex-none md:min-w-[280px] items-center justify-center rounded-lg h-14 px-8 bg-primary text-white font-extrabold text-xl shadow-lg hover:bg-primary/90 transition-all active:scale-95"
        >
          {t('appointments.reviewAndConfirm.confirm')}
        </button>
      </div>

      <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8">
        {t('appointments.reviewAndConfirm.legal.prefix')}{' '}
        <a className="underline font-medium" href="#">
          {t('appointments.reviewAndConfirm.legal.terms')}
        </a>{' '}
        {t('appointments.reviewAndConfirm.legal.and')}{' '}
        <a className="underline font-medium" href="#">
          {t('appointments.reviewAndConfirm.legal.cancellation')}
        </a>
        .
      </p>
    </div>
  );
}
