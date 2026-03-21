import { type ReactNode } from "react";
import { Activity, Bot, Check, HeartPulse, type LucideIcon, Sparkles } from "lucide-react";
import { useHomeTranslation } from "../../i18n/useHomeTranslation";
import { Heading } from "src/ui/atoms/Heading/Heading";
import { Text } from "src/ui/atoms/Text/Text";
import { Button } from "src/ui/atoms/Button/Button";
import { cn } from "src/ui/utils";
import type en from "../../i18n/en.json";

type HomeMessageKey = keyof typeof en;

type Plan = {
  id: string;
  nameKey: HomeMessageKey;
  priceKey: HomeMessageKey;
  icons: LucideIcon[];
  featureKeys: HomeMessageKey[];
  ctaKey: HomeMessageKey;
  variant: "default" | "popular" | "premium";
};

const PLANS: Plan[] = [
  {
    id: "vital-signs",
    nameKey: "home.plans.vitalSigns.name",
    priceKey: "home.plans.vitalSigns.price",
    icons: [HeartPulse],
    featureKeys: [
      "home.plans.vitalSigns.feature1",
      "home.plans.vitalSigns.feature2",
      "home.plans.vitalSigns.feature3",
    ],
    ctaKey: "home.plans.vitalSigns.cta",
    variant: "default",
  },
  {
    id: "stable-condition",
    nameKey: "home.plans.stableCondition.name",
    priceKey: "home.plans.stableCondition.price",
    icons: [Activity],
    featureKeys: [
      "home.plans.stableCondition.feature1",
      "home.plans.stableCondition.feature2",
      "home.plans.stableCondition.feature3",
      "home.plans.stableCondition.feature4",
    ],
    ctaKey: "home.plans.stableCondition.cta",
    variant: "popular",
  },
  {
    id: "immortal",
    nameKey: "home.plans.immortal.name",
    priceKey: "home.plans.immortal.price",
    icons: [Sparkles, Bot],
    featureKeys: [
      "home.plans.immortal.feature1",
      "home.plans.immortal.feature2",
      "home.plans.immortal.feature3",
      "home.plans.immortal.feature4",
    ],
    ctaKey: "home.plans.immortal.cta",
    variant: "premium",
  },
];

const cardStyles: Record<Plan["variant"], string> = {
  default: "bg-muted border border-border",
  popular: "bg-primary/10 border border-border relative",
  premium: "bg-background border-2 border-primary",
};

const checkIconStyles: Record<Plan["variant"], string> = {
  default: "text-secondary",
  popular: "text-primary",
  premium: "text-primary",
};

export const TreatmentPlans = () => {
  const { t, formatMessage } = useHomeTranslation();

  return (
    <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-20">
        <div className="mb-4">
          <Heading as="h2" variant="heading-xl">
            {t("home.plans.heading")}
          </Heading>
        </div>
        <Text variant="l" color="grey500" weight="semi-bold">
          {t("home.plans.subheading")}
        </Text>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "flex flex-col p-8 rounded-[0.625rem]",
              cardStyles[plan.variant]
            )}
          >
            {plan.variant === "popular" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full">
                <Text variant="caption" color="grey50" weight="bold">
                  {t("home.plans.mostPopular").toUpperCase()}
                </Text>
              </div>
            )}

            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                {plan.icons.map((Icon, idx) => (
                  <Icon
                    key={`${plan.id}-icon-${idx}`}
                    className="text-primary"
                    size={36}
                  />
                ))}
              </div>
              <Heading as="h3" variant="heading-md">
                {t(plan.nameKey)}
              </Heading>
              <div className="mt-4">
                {formatMessage("home.plans.price", {
                  price: t(plan.priceKey),
                  sub: (chunks: ReactNode) => (
                    <Text color="grey500" weight="semi-bold">
                      {chunks}
                    </Text>
                  ),
                })}
              </div>
            </div>

            <ul className="flex-grow space-y-4 mb-10">
              {plan.featureKeys.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <Check
                    className={cn("shrink-0", checkIconStyles[plan.variant])}
                    size={16}
                  />
                  <Text variant="s" color={plan.variant === "default" ? "grey600" : "grey900"}>
                    {t(key)}
                  </Text>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.variant === "premium" ? "primary" : "default"}
              size="lg"
            >
              {t(plan.ctaKey)}
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <div>
          <Text variant="s" color="grey500" as="p">
            <span className="italic">{t("home.plans.footerAsterisk")}</span>
          </Text>
        </div>
        <div className="max-w-md mx-auto leading-relaxed">
          <Text variant="caption" color="grey600" as="p">
            {t("home.plans.footerNote")}
          </Text>
        </div>
      </div>
    </section>
  );
};
