import { ArrowRight, BrainCircuit, Calendar, FileText, Sparkles } from "lucide-react";
import { Heading } from "src/ui/atoms/Heading/Heading";
import { Link } from "src/ui/atoms/Link/Link";
import { Text } from "src/ui/atoms/Text/Text";
import { useHomeTranslation } from "../../i18n/useHomeTranslation";

export const HowItWorks = () => {
  const { t } = useHomeTranslation();

  return (
    <section className="bg-neutral-100 py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <Heading as="h2" variant="heading-lg">
            {t("home.howItWorks.heading")}
          </Heading>
          <Text as="p" variant="l" color="grey600">
            {t("home.howItWorks.subheading")}
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-surface-container-lowest rounded-[0.625rem] ghost-border p-8 flex flex-col h-full relative overflow-hidden transition-all">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="bg-surface-container-low px-3 py-1 rounded-sm border border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <Sparkles aria-hidden="true" size={14} className="text-primary" />
                    <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                      {t("home.howItWorks.aiChecker.badge")}
                    </span>
                  </div>
                </div>
                <BrainCircuit aria-hidden="true" size={32} className="text-primary" />
              </div>
              <div>
                <Heading as="h3" variant="heading-sm">
                  {t("home.howItWorks.aiChecker.title")}
                </Heading>
                <Text as="p" variant="s" color="grey600">
                  {t("home.howItWorks.aiChecker.description")}
                </Text>
              </div>
            </div>
            <div className="mt-auto">
              <Link href="#">
                <Text variant="s" weight="bold">{t("home.howItWorks.aiChecker.cta")}</Text>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-[0.625rem] ghost-border p-8 flex flex-col h-full transition-all">
            <div className="flex flex-col gap-6">
              <div className="flex justify-start">
                <Calendar aria-hidden="true" size={32} className="text-primary" />
              </div>
              <div>
                <Heading as="h3" variant="heading-sm">
                  {t("home.howItWorks.booking.title")}
                </Heading>
                <Text as="p" variant="s" color="grey600">
                  {t("home.howItWorks.booking.description")}
                </Text>
              </div>
            </div>
            <div className="mt-auto">
              <Link href="#">
                <Text variant="s" weight="bold">{t("home.howItWorks.booking.cta")}</Text>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-[0.625rem] ghost-border p-8 flex flex-col h-full transition-all">
            <div className="flex flex-col gap-6">
              <div className="flex justify-start">
                <FileText aria-hidden="true" size={32} className="text-primary" />
              </div>
              <div>
                <Heading as="h3" variant="heading-sm">
                  {t("home.howItWorks.records.title")}
                </Heading>
                <Text as="p" variant="s" color="grey600">
                  {t("home.howItWorks.records.description")}
                </Text>
              </div>
            </div>
            <div className="mt-auto">
              <Link href="#">
                <Text variant="s" weight="bold">{t("home.howItWorks.records.cta")}</Text>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-200 pt-8">
          <Text as="p" variant="caption" color="grey600">
            {t("home.howItWorks.footerNote")}
          </Text>
        </div>
      </div>
    </section>
  );
};
