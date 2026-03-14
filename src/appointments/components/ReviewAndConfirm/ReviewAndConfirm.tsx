import { CalendarDays, Heart, Pencil, Timer } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Button } from 'src/ui/atoms/Button/Button';
import { Heading } from 'src/ui/atoms/Heading/Heading';
import { Text } from 'src/ui/atoms/Text/Text';
import { useModal } from '../../hooks/useModal';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';

const TermsOfServiceDialog = lazy(
  () => import(/* webpackChunkName: "terms-of-service-dialog" */ './TermsOfServiceDialog').then(m => ({ default: m.TermsOfServiceDialog }))
);

const CancellationPolicyDialog = lazy(
  () => import(/* webpackChunkName: "cancellation-policy-dialog" */ './CancellationPolicyDialog').then(m => ({ default: m.CancellationPolicyDialog }))
);

const DUMMY_SPECIALTY = {
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

const TOTAL_SECONDS = 4 * 60 + 59;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function ReviewAndConfirm() {
  const { t } = useAppointmentsTranslation();
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [timerAnnouncement, setTimerAnnouncement] = useState('');
  const isComplete = true;

  const tosModal = useModal();
  const cancellationModal = useModal();

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        if (next === 180) setTimerAnnouncement('3 minutes remaining');
        else if (next === 60) setTimerAnnouncement('1 minute remaining');
        else if (next === 30) setTimerAnnouncement('30 seconds remaining');
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div>
      <Heading as="h1" variant="heading-xl">
        {t('appointments.reviewAndConfirm.heading')}
      </Heading>

      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-background-dark border-2 border-slate-200 dark:border-primary/30 rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-primary/10 pb-6">
              <div className="flex items-start gap-4">
                <Heart aria-hidden="true" className="text-primary size-6 mt-1" />
                <dl>
                  <Text as="dt" size="sm" weight="bold">
                    {t('appointments.reviewAndConfirm.specialty.label')}
                  </Text>
                  <Text as="dd" size="xl">
                    {DUMMY_SPECIALTY.name}
                  </Text>
                </dl>
              </div>
              <Button
                type="button"
                variant="ghost"
                aria-label="Change medical specialty"
              >
                <Pencil />
                {t('appointments.reviewAndConfirm.change')}
              </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-primary/10 pb-6">
              <div className="flex items-start gap-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 border border-slate-200"
                  role="img"
                  aria-label={DUMMY_DOCTOR.imageAlt}
                  style={{ backgroundImage: `url("${DUMMY_DOCTOR.imageUrl}")` }}
                />
                <dl>
                  <Text as="dt" size="sm" weight="bold">
                    {t('appointments.reviewAndConfirm.doctor.label')}
                  </Text>
                  <Text as="dd" size="xl">
                    {DUMMY_DOCTOR.name}
                  </Text>
                  <Text as="dd" size="sm" color="secondary">
                    {DUMMY_DOCTOR.role} &bull; {DUMMY_DOCTOR.clinic}
                  </Text>
                </dl>
              </div>
              <Button
                type="button"
                variant="ghost"
                aria-label="Change healthcare professional"
              >
                <Pencil />
                {t('appointments.reviewAndConfirm.change')}
              </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <CalendarDays aria-hidden="true" className="text-primary size-6 mt-1" />
                <dl>
                  <Text as="dt" size="sm" weight="bold">
                    {t('appointments.reviewAndConfirm.time.label')}
                  </Text>
                  <Text as="dd" size="xl">
                    {DUMMY_APPOINTMENT.date}
                  </Text>
                  <Text as="dd" size="lg">
                    {DUMMY_APPOINTMENT.timeRange} ({DUMMY_APPOINTMENT.duration})
                  </Text>
                </dl>
              </div>
              <Button
                type="button"
                variant="ghost"
                aria-label="Change appointment time"
              >
                <Pencil />
                {t('appointments.reviewAndConfirm.change')}
              </Button>
            </div>
          </div>
        </div>

        <div
          role="status"
          className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-600 rounded-lg p-5 flex items-center gap-4 mb-10"
        >
          <Timer aria-hidden="true" className="text-amber-600 size-6" />
          <div className="flex-1">
            <Text as="p" weight="bold">
              {t('appointments.reviewAndConfirm.timer.title')}
            </Text>
            <Text as="p" size="sm">
              {t('appointments.reviewAndConfirm.timer.body')}{' '}
              <span role="timer" className="font-mono font-bold">
                {formatTime(secondsLeft)}
              </span>
            </Text>
          </div>
        </div>

        <span aria-live="assertive" className="sr-only">
          {timerAnnouncement}
        </span>

        <div className="mb-4">
          <Text as="p" size="sm" color="secondary">
            {t('appointments.reviewAndConfirm.legal.prefix')}{' '}
            <Button
              variant="link"
              type="button"
              aria-label="Terms of Service (opens in dialog)"
              onClick={tosModal.open}
            >
              {t('appointments.reviewAndConfirm.legal.terms')}
            </Button>{' '}
            {t('appointments.reviewAndConfirm.legal.and')}{' '}
            <Button
              variant="link"
              type="button"
              aria-label="Cancellation Policy (opens in dialog)"
              onClick={cancellationModal.open}
            >
              {t('appointments.reviewAndConfirm.legal.cancellation')}
            </Button>
            .
          </Text>
        </div>

        <p id="next-hint" className="sr-only">
          Complete all steps to proceed
        </p>
        <Button
          type="submit"
          variant="primary"
          isDisabled={!isComplete}
          aria-describedby="next-hint"
        >
          {t('appointments.reviewAndConfirm.confirm')}
        </Button>
      </form>

      <Suspense>
        {tosModal.isOpen && (
          <TermsOfServiceDialog isOpen={tosModal.isOpen} onOpenChange={tosModal.setIsOpen} />
        )}
      </Suspense>

      <Suspense>
        {cancellationModal.isOpen && (
          <CancellationPolicyDialog isOpen={cancellationModal.isOpen} onOpenChange={cancellationModal.setIsOpen} />
        )}
      </Suspense>
    </div>
  );
}
