import { StepperProvider } from "./components/Stepper/StepperContext";
import { Step } from "./components/Stepper/Step";
import { StepperProgress } from "./components/Stepper/StepperProgress";
import { useStepper } from "./components/Stepper/useStepper";
import { Button } from "../ui/atoms/Button/Button";
import { useAppointmentsTranslation } from "./i18n/useAppointmentsTranslation";
import { ChooseSpecialty } from "./components/ChooseSpecialty/ChooseSpecialty";
import { PickATime } from "./components/PickATime/PickATime";
import { ChooseDoctor } from "./components/ChooseDoctor/ChooseDoctor";

const TOTAL_STEPS = 3;

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
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
      <h2 className="text-base font-bold text-slate-900">
        {t("appointments.quickGuide.title")}
      </h2>

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

/* BookingFooter — extract once footer is shared across multiple booking steps */
function BookingFooter() {
  const { isFirst, isLast, prev, next } = useStepper();
  const { t } = useAppointmentsTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto max-w-4xl">
        <div className="mt-4 flex justify-between">
          <Button variant="outlined" onClick={prev} isDisabled={isFirst}>
            {t("appointments.stepper.back")}
          </Button>
          <Button variant="primary" onClick={next} isDisabled={isLast}>
            {t("appointments.stepper.next")}
          </Button>
        </div>
      </div>
    </footer>
  );
}

const Appointments = () => {
  const { t } = useAppointmentsTranslation();

  const handleComplete = () => {};

  return (
    <StepperProvider totalSteps={TOTAL_STEPS} onComplete={handleComplete}>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <BookingHeader />

        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-4xl space-y-6">
            <StepperProgress />

            <Step index={0} label={t("appointments.steps.chooseSpecialty")}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[7fr_5fr]">
                <ChooseSpecialty />
                <QuickGuide />
              </div>
            </Step>

            <Step index={1} label={t("appointments.steps.chooseDoctor")}>
              <ChooseDoctor />
            </Step>

            <Step index={2} label={t("appointments.steps.pickATime")}>
              <PickATime />
            </Step>
          </div>
        </main>

        <BookingFooter />
      </div>
    </StepperProvider>
  );
};

export default Appointments;
