import { Stepper } from "./components/Stepper/Stepper";
import { Button } from "../ui/atoms/Button/Button";
import { useAppointmentsTranslation } from "./i18n/useAppointmentsTranslation";
import { ChooseSpecialty } from "./components/ChooseSpecialty/ChooseSpecialty";
import { useCreateAppointmentState } from "./hooks/useCreateAppointmentState";
import { PickATime } from "./components/PickATime/PickATime";
import { ChooseDoctor } from "./components/ChooseDoctor/ChooseDoctor";
import { ReviewAndConfirm } from "./components/ReviewAndConfirm/ReviewAndConfirm";
import { Step } from "./components/Stepper/Step";
import { Heading } from "src/ui/atoms/Heading/Heading";

/* BookingHeader — extract once header is shared across multiple booking steps */
function BookingHeader() {
  const { t } = useAppointmentsTranslation();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-slate-900">
          {t("appointments.header.title")}
        </h1>
      </div>
      <button
        type="button"
        className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
      >
        {t("appointments.header.cancel")}
      </button>
    </header>
  );
}

/* QuickGuide — extract to its own component once it needs to be reused or has dynamic content */
function QuickGuide() {
  const { t } = useAppointmentsTranslation();

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 gap-2.5">
      <Heading as='h2' variant='heading-md'>
        {t("appointments.quickGuide.title")}
      </Heading>

      {/* QuickGuideSection */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-700">
          {t("appointments.quickGuide.whatToExpect.title")}
        </h3>
        <p className="text-sm text-slate-500">
          {t("appointments.quickGuide.whatToExpect.body")}
        </p>
      </div>

      {/* QuickGuideSection */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-700">
          {t("appointments.quickGuide.choosingSpecialty.title")}
        </h3>
        <p className="text-sm text-slate-500">
          {t("appointments.quickGuide.choosingSpecialty.body")}
        </p>
      </div>

      {/* QuickGuideSection */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-700">
          {t("appointments.quickGuide.insurance.title")}
        </h3>
        <p className="text-sm text-slate-500">
          {t("appointments.quickGuide.insurance.body")}
        </p>
      </div>
    </aside>
  );
}

const Appointments = () => {
  const { t } = useAppointmentsTranslation();
  const {
    draft,
    dispatch: appointmentDispatch,
    stepCanProceed,
  } = useCreateAppointmentState();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <BookingHeader />

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <Stepper title={t("appointments.header.title")}>
            <Step label={t("appointments.steps.chooseSpecialty")}>
              {({ dispatch, isFirst }) => (
                <>
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[7fr_5fr]">
                    <ChooseSpecialty
                      selectedSpecialtyId={draft.specialty?.id ?? null}
                      onSelect={(id, name, description) =>
                        appointmentDispatch({
                          type: "SELECT_SPECIALTY",
                          id,
                          name,
                          description,
                        })
                      }
                    />
                    <QuickGuide />
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => dispatch({ type: "prev" })}
                      isDisabled={isFirst}
                    >
                      {t("appointments.stepper.back")}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => dispatch({ type: "next" })}
                      isDisabled={!stepCanProceed[1](draft)}
                    >
                      {t("appointments.stepper.next")}
                    </Button>
                  </div>
                </>
              )}
            </Step>

            <Step label={t("appointments.steps.chooseDoctor")}>
              {({ dispatch, isFirst }) => (
                <>
                  <ChooseDoctor
                    specialtyId={draft.specialty?.id ?? null}
                    selectedDoctorId={draft.doctor?.id ?? null}
                    onSelect={(id, name, photoUrl) =>
                      appointmentDispatch({ type: "SELECT_DOCTOR", id, name, photoUrl })
                    }
                  />
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => dispatch({ type: "prev" })}
                      isDisabled={isFirst}
                    >
                      {t("appointments.stepper.back")}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => dispatch({ type: "next" })}
                      isDisabled={!stepCanProceed[2](draft)}
                    >
                      {t("appointments.stepper.next")}
                    </Button>
                  </div>
                </>
              )}
            </Step>

            <Step label={t("appointments.steps.pickATime")}>
              {({ dispatch, isFirst }) => (
                <>
                  <PickATime
                    doctorId={draft.doctor?.id ?? ''}
                    onSelectionChange={({ date, time }) =>
                      appointmentDispatch({ type: 'SELECT_DATE_TIME', date, time })
                    }
                  />
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => dispatch({ type: "prev" })}
                      isDisabled={isFirst}
                    >
                      {t("appointments.stepper.back")}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => dispatch({ type: "next" })}
                      isDisabled={!stepCanProceed[3](draft)}
                    >
                      {t("appointments.stepper.next")}
                    </Button>
                  </div>
                </>
              )}
            </Step>

            <Step label={t("appointments.steps.reviewAndConfirm")}>
              {({ dispatch, isFirst }) => (
                <>
                  <ReviewAndConfirm />
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => dispatch({ type: "prev" })}
                      isDisabled={isFirst}
                    >
                      {t("appointments.stepper.back")}
                    </Button>
                    <div>
                      <p id="confirm-hint" className="sr-only">
                        {t("appointments.reviewAndConfirm.confirmHint")}
                      </p>
                      <Button
                        type="submit"
                        variant="primary"
                        form="review-form"
                        aria-describedby="confirm-hint"
                      >
                        {t("appointments.reviewAndConfirm.confirm")}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Step>
          </Stepper>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
