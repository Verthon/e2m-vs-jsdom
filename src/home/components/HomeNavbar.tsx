import { Link as RouterLink } from "react-router";

import { useUser } from "src/core/auth/useUser";
import { SignedIn } from "src/core/auth/components/SignedIn";
import { SignedOut } from "src/core/auth/components/SignedOut";
import { Avatar, AvatarImage, AvatarFallback } from "src/ui/atoms/Avatar/Avatar";
import { Link } from "src/ui/atoms/Link/Link";
import { routesConfig } from "src/routing/routesConfig";
import { useHomeTranslation } from "../i18n/useHomeTranslation";

const getInitials = (userName: string): string => {
  const parts = userName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return userName.slice(0, 2).toUpperCase();
};

const BellIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const AuthenticatedNav = () => {
  const { data: user } = useUser();
  const { t } = useHomeTranslation();
  const initials = user ? getInitials(user.userName) : "AA";

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface border-b border-outline-variant/20">
      <div className="flex items-center gap-8">
        <Link component={RouterLink} to={routesConfig.home}>
          <span className="text-xl font-bold tracking-tighter text-on-background">
            {t("home.nav.brand")}
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          <Link component={RouterLink} to={routesConfig.createAppointment}>
            <span className="text-sm font-semibold text-on-background">
              {t("home.nav.appointments")}
            </span>
          </Link>
          <Link href="/">
            <span className="text-sm text-on-surface-variant">
              {t("home.nav.records")}
            </span>
          </Link>
          <Link href="/">
            <span className="text-sm text-on-surface-variant">
              {t("home.nav.assistant")}
            </span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label={t("home.nav.notifications")}
          className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"
          type="button"
        >
          <BellIcon />
        </button>

        <div className="flex items-center gap-2 px-2 py-1 bg-surface-container-low rounded-lg">
          <Avatar size="sm">
            {user?.avatarUrl && (
              <AvatarImage alt={user.userName} src={user.avatarUrl} />
            )}
            <AvatarFallback className="text-[10px] font-bold text-on-tertiary-container bg-primary-container">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            {t("home.nav.pro")}
          </span>
        </div>
      </div>
    </header>
  );
};

const UnauthenticatedNav = () => {
  const { t } = useHomeTranslation();

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface border-b border-outline-variant/20">
      <Link component={RouterLink} to={routesConfig.home}>
        <span className="text-xl font-bold tracking-tighter text-on-background">
          {t("home.nav.brand")}
        </span>
      </Link>

      <nav aria-label="Main navigation" className="flex items-center gap-6">
        <Link component={RouterLink} to={routesConfig.login}>
          <span className="text-sm text-on-surface-variant">{t("home.nav.login")}</span>
        </Link>
        <Link component={RouterLink} to={routesConfig.signup}>
          <span className="text-sm font-semibold text-on-background">{t("home.nav.signup")}</span>
        </Link>
      </nav>
    </header>
  );
};

export const HomeNavbar = () => (
  <>
    <SignedIn>
      <AuthenticatedNav />
    </SignedIn>
    <SignedOut>
      <UnauthenticatedNav />
    </SignedOut>
  </>
);
