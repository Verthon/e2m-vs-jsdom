import { Link as RouterLink } from "react-router";
import { useAuth } from "../../auth/useAuth";
import { useUser } from "../../auth/useUser";
import { useLogout } from "../../auth/hooks/useLogout";
import { SignedIn } from "../../auth/components/SignedIn";
import { SignedOut } from "../../auth/components/SignedOut";
import { useCoreTranslation } from "../../i18n/useCoreTranslation";
import { routesConfig } from "src/routing/routesConfig";
import { Box } from "src/ui/atoms/Box/Box";
import { Container } from "src/ui/atoms/Container/Container";
import { Text } from "src/ui/atoms/Text/Text";
import { Avatar, AvatarImage } from "src/ui/atoms/Avatar/Avatar";
import { Link } from "src/ui/atoms/Link/Link";
import { Button } from "src/ui/atoms/Button/Button";
import { Spinner } from "src/ui/atoms/Spinner/Spinner";

export const Navbar = () => {
  const { authorizationStatus } = useAuth();
  const { data: user, isPending: isUserPending } = useUser();
  const { logout, isPending: isLoggingOut } = useLogout();
  const { t } = useCoreTranslation();

  const isLoading = authorizationStatus === "pending" || isUserPending;

  return (
    <Box component="nav" padding={4} justify="between">
      <Container>
        <Box justify="between" align="center">
          <Link component={RouterLink} to={routesConfig.home}>
            <Box align="center">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8C4 6 2 4 2 2C4 2 6 4 8 8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M18 8C20 6 22 4 22 2C20 2 18 4 16 8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M4 11C3 11 2 13 2 15C3 15 4 14 5 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M20 11C21 11 22 13 22 15C21 15 20 14 19 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 8C8 8 9 18 12 22C15 18 16 8 16 8L12 10L8 8Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 4L13 7L16 7L13.5 9L14.5 12L12 10L9.5 12L10.5 9L8 7L11 7L12 4Z"
                  fill="currentColor"
                  fillOpacity="0.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path d="M10 13H11" strokeLinecap="round"></path>
                <path d="M13 13H14" strokeLinecap="round"></path>
                <path
                  d="M11 18L12 19L13 18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <Text weight="bold" variant="l">
                {t("core.nav.brand")}
              </Text>
            </Box>
          </Link>

          {isLoading && (
            <Box className="gap-4 items-center">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
            </Box>
          )}

          <SignedIn>
            {user && (
              <Box align="center" gap={6}>
                <Link component={RouterLink} to={routesConfig.createAppointment}>
                  <Text color="grey600" variant="s">
                    {t("core.nav.myAppointments")}
                  </Text>
                </Link>
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.userName} />
                </Avatar>
                <Button onClick={() => logout()}>
                  {isLoggingOut && <Spinner />}
                  {t("core.nav.logout")}
                </Button>
              </Box>
            )}
          </SignedIn>

          <SignedOut>
            <Box align="center" gap={6}>
              {/* Marketing links — visible only to unauthenticated visitors */}
              <Text color="grey600" variant="s">How it works</Text>
              <Text color="grey600" variant="s">Pricing</Text>
              <Link component={RouterLink} to={routesConfig.login}>
                <Text color="grey600" variant="s">
                  {t("core.nav.login")}
                </Text>
              </Link>
              <Link component={RouterLink} to={routesConfig.signup}>
                <Button variant="primary">{t("core.nav.signup")}</Button>
              </Link>
            </Box>
          </SignedOut>
        </Box>
      </Container>
    </Box>
  );
};
