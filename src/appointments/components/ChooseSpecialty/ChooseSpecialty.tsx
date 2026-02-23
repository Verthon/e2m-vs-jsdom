import { AlertCircle } from "lucide-react";
import { Button } from "src/ui/atoms/Button/Button";
import { Skeleton } from "src/ui/atoms/Skeleton/Skeleton";
import { useGetSpecialties } from "../../hooks/useGetSpecialties";
import { useAppointmentsTranslation } from "../../i18n/useAppointmentsTranslation";

function SpecialtyCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl border-2 border-slate-200 bg-white p-4">
      <Skeleton height={48} width={48} rounded="full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton height={16} />
        <Skeleton height={12} width={160} />
      </div>
    </div>
  );
}

interface SpecialtiesErrorProps {
  readonly onRetry: () => void;
}

function SpecialtiesError({ onRetry }: SpecialtiesErrorProps) {
  const { t } = useAppointmentsTranslation();
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-red-200 bg-red-50 p-6 text-center">
      <AlertCircle size={24} className="text-red-500" />
      <p className="text-sm font-medium text-red-700">
        {t("appointments.chooseSpecialty.error.message")}
      </p>
      <Button variant="outline" onClick={onRetry}>
        {t("appointments.chooseSpecialty.error.retry")}
      </Button>
    </div>
  );
}

interface ChooseSpecialtyProps {
  readonly selectedSpecialtyId: string | null;
  readonly onSelect: (id: string, name: string, description: string) => void;
}

export function ChooseSpecialty({ selectedSpecialtyId, onSelect }: ChooseSpecialtyProps) {
  const { t } = useAppointmentsTranslation();
  const { data, isPending, isError, refetch } = useGetSpecialties();

  const activeSpecialties = data?.filter((s) => s.isActive) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          {t("appointments.chooseSpecialty.heading")}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {t("appointments.chooseSpecialty.description")}
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label={t("appointments.chooseSpecialty.heading")}
        className="space-y-3"
      >
        {isPending && (
          <>
            <SpecialtyCardSkeleton />
            <SpecialtyCardSkeleton />
            <SpecialtyCardSkeleton />
          </>
        )}

        {isError && <SpecialtiesError onRetry={() => refetch()} />}

        {data &&
          activeSpecialties.map((specialty) => {
            const isSelected = selectedSpecialtyId === specialty.id;

            return (
              <label
                key={specialty.id}
                className={[
                  "flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all",
                  "focus-within:ring-2 focus-within:ring-emerald-800 focus-within:ring-offset-2",
                  isSelected
                    ? "border-emerald-800 bg-emerald-50"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                ].join(" ")}
              >
                <input
                  type="radio"
                  value={specialty.id}
                  checked={isSelected}
                  onChange={() => onSelect(specialty.id, specialty.name.en, specialty.description.en)}
                  className="sr-only"
                />

                <div
                  className={[
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                    isSelected
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-500",
                  ].join(" ")}
                  dangerouslySetInnerHTML={{ __html: specialty.icon }}
                />

                <div className="flex-1">
                  <p
                    className={[
                      "font-semibold text-sm",
                      isSelected ? "text-emerald-900" : "text-slate-800",
                    ].join(" ")}
                  >
                    {specialty.name.en}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {specialty.description.en}
                  </p>
                </div>

                <div
                  className={[
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isSelected
                      ? "border-emerald-800 bg-emerald-800"
                      : "border-slate-300 bg-white",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </label>
            );
          })}
      </div>
    </div>
  );
}
