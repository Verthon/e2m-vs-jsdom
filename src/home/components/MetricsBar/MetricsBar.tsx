import { Text } from "src/ui/atoms/Text/Text";
import { useHomeTranslation } from "../../i18n/useHomeTranslation";
import { homeMetrics } from "../../data/metrics";

export const MetricsBar = () => {
  const { t } = useHomeTranslation();

  return (
    <section className="w-full bg-surface-container-lowest border-y border-outline-variant/20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-outline-variant/20">
        <div className="py-12 px-8 flex flex-col items-center md:items-start">
          <span className="text-[1.953rem] font-semibold tracking-tighter text-on-background tabular-nums">
            {t("home.metrics.appointmentsBooked.value", { count: homeMetrics.appointmentsBooked.count })}
          </span>
          <Text as="span" variant="caption" weight="semi-bold" color="grey600">
            {t("home.metrics.appointmentsBooked.label")}
          </Text>
        </div>
        <div className="py-12 px-8 flex flex-col items-center md:items-start">
          <span className="text-[1.953rem] font-semibold tracking-tighter text-on-background tabular-nums">
            {t("home.metrics.waitTime.value", { minutes: homeMetrics.waitTime.minutes })}
          </span>
          <Text as="span" variant="caption" weight="semi-bold" color="grey600">
            {t("home.metrics.waitTime.label")}
          </Text>
        </div>
        <div className="py-12 px-8 flex flex-col items-center md:items-start">
          <span className="text-[1.953rem] font-semibold tracking-tighter text-on-background tabular-nums">
            {t("home.metrics.patientRating.value", { rating: homeMetrics.patientRating.rating })}
          </span>
          <Text as="span" variant="caption" weight="semi-bold" color="grey600">
            {t("home.metrics.patientRating.label")}
          </Text>
        </div>
        <div className="py-12 px-8 flex flex-col items-center md:items-start">
          <span className="text-[1.953rem] font-semibold tracking-tighter text-on-background tabular-nums">
            {t("home.metrics.verifiedDoctors.value", { count: homeMetrics.verifiedDoctors.count })}
          </span>
          <Text as="span" variant="caption" weight="semi-bold" color="grey600">
            {t("home.metrics.verifiedDoctors.label")}
          </Text>
        </div>
      </div>
    </section>
  );
};
