import { CalendarDays, Heart, Pencil, AlertCircle } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Button } from 'src/ui/atoms/Button/Button';
import { Heading } from 'src/ui/atoms/Heading/Heading';
import { Text } from 'src/ui/atoms/Text/Text';
import { useModal } from '../../hooks/useModal';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';
import { Box } from 'src/ui/atoms/Box/Box';
import { SlotTimer } from './SlotTimer/SlotTimer';
import type { AppointmentDraft } from '../../types';
import { useCreateAppointment } from '../../hooks/useCreateAppointment';

const TermsOfServiceDialog = lazy(
  () => import(/* webpackChunkName: "terms-of-service-dialog" */ './TermsOfServiceDialog').then(m => ({ default: m.TermsOfServiceDialog }))
);

const CancellationPolicyDialog = lazy(
  () => import(/* webpackChunkName: "cancellation-policy-dialog" */ './CancellationPolicyDialog').then(m => ({ default: m.CancellationPolicyDialog }))
);

interface ReviewAndConfirmProps {
  readonly draft: AppointmentDraft;
}

export function ReviewAndConfirm({ draft }: ReviewAndConfirmProps) {
  const { t } = useAppointmentsTranslation();
  const tosModal = useModal();
  const cancellationModal = useModal();
  const { createAppointment, isPending, isError } = useCreateAppointment();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.specialty || !draft.doctor || !draft.date || !draft.time) {
      return;
    }

    createAppointment({
      specialtyId: draft.specialty.id,
      doctorId: draft.doctor.id,
      date: draft.date.toISOString(),
      time: draft.time,
    });
  }

  const formattedDate = draft.date
    ? new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(draft.date)
    : '';

  const calculateEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTotalMinutes = hours * 60 + minutes + 30;
    const endHours = Math.floor(endTotalMinutes / 60);
    const endMinutes = endTotalMinutes % 60;
    const ampm = endHours >= 12 ? 'PM' : 'AM';
    const displayHours = endHours % 12 || 12;
    return `${displayHours}:${endMinutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const timeRange = draft.time
    ? `${formatTime(draft.time)} — ${calculateEndTime(draft.time)}`
    : '';

  return (
    <Box gap={12} direction="column">
      <Heading as="h1" variant="heading-xl">
        {t('appointments.reviewAndConfirm.heading')}
      </Heading>

      <form id="review-form" onSubmit={handleSubmit}>
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
                    {draft.specialty?.name}
                  </Text>
                </dl>
              </div>
              <Button
                type="button"
                variant="ghost"
                aria-label="Change medical specialty"
                isDisabled={isPending}
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
                  aria-label={`Portrait of ${draft.doctor?.name}`}
                  style={{ backgroundImage: `url("${draft.doctor?.photoUrl}")` }}
                />
                <dl>
                  <Text as="dt" size="sm" weight="bold">
                    {t('appointments.reviewAndConfirm.doctor.label')}
                  </Text>
                  <Text as="dd" size="xl">
                    {draft.doctor?.name}
                  </Text>
                </dl>
              </div>
              <Button
                type="button"
                variant="ghost"
                aria-label="Change healthcare professional"
                isDisabled={isPending}
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
                    {formattedDate}
                  </Text>
                  <Text as="dd" size="lg">
                    {timeRange} (30 min)
                  </Text>
                </dl>
              </div>
              <Button
                type="button"
                variant="ghost"
                aria-label="Change appointment time"
                isDisabled={isPending}
              >
                <Pencil />
                {t('appointments.reviewAndConfirm.change')}
              </Button>
            </div>
          </div>
        </div>

        <SlotTimer />

        {isError && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 mb-8 flex items-center gap-3" role="alert">
            <AlertCircle className="size-5 shrink-0" />
            <Text size="sm">
              {t('appointments.reviewAndConfirm.error')}
            </Text>
          </div>
        )}

        <div className="mb-8">
          <Text as="p" size="sm" color="secondary">
            {t('appointments.reviewAndConfirm.legal.prefix')}
            <Button
              variant="link"
              type="button"
              aria-label="Terms of Service (opens in dialog)"
              onClick={tosModal.open}
              isDisabled={isPending}
            >
              {t('appointments.reviewAndConfirm.legal.terms')}
            </Button>{' '}
            {t('appointments.reviewAndConfirm.legal.and')}
            <Button
              variant="link"
              type="button"
              aria-label="Cancellation Policy (opens in dialog)"
              onClick={cancellationModal.open}
              isDisabled={isPending}
            >
              {t('appointments.reviewAndConfirm.legal.cancellation')}
            </Button>
            .
          </Text>
        </div>
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
    </Box>
  );
}
