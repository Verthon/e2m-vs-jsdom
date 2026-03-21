import { useHomeTranslation } from "src/home/i18n/useHomeTranslation";

export const HomeFooter = () => {
  const { t } = useHomeTranslation();

  return (
    <footer className="w-full py-12 px-8 bg-surface-container-low border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <p className="text-[0.75rem] text-secondary font-medium tracking-tight">
          {t("home.footer.vibesDisclaimer")}
        </p>
        <div className="flex gap-8">
          <a
            className="text-[0.75rem] text-on-surface-variant hover:text-on-surface transition-colors"
            href="#"
          >
            {t("home.footer.privacyPolicy")}
          </a>
          <a
            className="text-[0.75rem] text-on-surface-variant hover:text-on-surface transition-colors"
            href="#"
          >
            {t("home.footer.termsOfService")}
          </a>
          <a
            className="text-[0.75rem] text-on-surface-variant hover:text-on-surface transition-colors"
            href="#"
          >
            {t("home.footer.contact")}
          </a>
        </div>
        <p className="text-[0.75rem] text-on-surface-variant mt-4">
          {t("home.footer.clinicalDisclaimer")}
        </p>
      </div>
    </footer>
  );
};
