import { Link as RouterLink } from "react-router";

import { Text } from "src/ui/atoms/Text/Text";
import { routesConfig } from "src/routing/routesConfig";
import { useHomeTranslation } from "../../i18n/useHomeTranslation";
import { Button } from "src/ui/atoms/Button/Button";

export const Hero = () => {
  const { t } = useHomeTranslation();

  return (
    <section className="max-w-7xl mx-auto px-8 py-20 lg:py-32">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Hero Left Content (60%) — headline, subtext, CTA buttons */}
        <div className="lg:w-[60%] space-y-8">
          <Text
            as="h1"
            weight="semi-bold"
            color="grey950"
            className="text-[2.441rem] leading-tight tracking-tight max-w-xl"
          >
            {t("home.hero.headline")}
          </Text>
          <Text
            as="p"
            variant="m"
            color="grey600"
            className="leading-relaxed max-w-lg"
          >
            {t("home.hero.subtext")}
          </Text>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" component={RouterLink} to={routesConfig.signup}>
              {t("home.hero.cta.primary")}
            </Button>
            <Button size="lg" component={RouterLink} variant="outline" to="#">
              {t("home.hero.cta.secondary")}
            </Button>
          </div>
        </div>

        {/* Hero Right Content (40%) — editorial photograph */}
        <div className="lg:w-[40%] w-full">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-[10px]">
            <img
              alt={t("home.hero.image.alt")}
              className="w-full h-full object-cover grayscale-[0.3] brightness-[0.95]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1rbodv7QkZOTZ4KCPsFHvWRhVGWlGSL10c8KhY6spjDWUrUSRfwSxHrO9iDlLiZHvXnpM9eq9Oqghpd67v74FIVUjEL27ngxYq-WaugRxNPawD0CeA-Ag8VPd8cwZqfEDJBiQhu-DEV4fiBXwJqtpI42d1PkGIKZnef6MkVGlld4xjV_NzWmw_dIzTK6RRt6HvyhaOTl-cNUA1G_oSMOWid8LziPIVkuB69QR4iWWcJ3MdK-fKR4wHZ4yj0JdxwuTgND0bYtTOLM4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
