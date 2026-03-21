import { Text } from "src/ui/atoms/Text/Text";
import { Link } from "src/ui/atoms/Link/Link";
import { useHomeTranslation } from "src/home/i18n/useHomeTranslation";

export const HomeFooter = () => {
  const { t } = useHomeTranslation();

  return (
    <footer className="w-full py-12 px-8 bg-surface-container-low border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <Text as="p" variant="caption" color="grey700" weight="semi-bold">
          {t("home.footer.vibesDisclaimer")}
        </Text>
        <div className="flex gap-8">
          <Link href="#">
            <Text variant="caption" color="grey700">{t("home.footer.privacyPolicy")}</Text>
          </Link>
          <Link href="#">
            <Text variant="caption" color="grey700">{t("home.footer.termsOfService")}</Text>
          </Link>
          <Link href="#">
            <Text variant="caption" color="grey700">{t("home.footer.contact")}</Text>
          </Link>
        </div>
        <Text as="p" variant="caption" color="grey500">
          {t("home.footer.clinicalDisclaimer")}
        </Text>
      </div>
    </footer>
  );
};
