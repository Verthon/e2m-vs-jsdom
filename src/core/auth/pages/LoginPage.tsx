import { useCoreTranslation } from 'src/core/i18n/useCoreTranslation';
import { Heading } from 'src/ui/atoms/Heading/Heading';
import { Text } from 'src/ui/atoms/Text/Text';

import { PublicLayout } from '../components/PublicLayout';
import { LoginForm } from '../components/LoginForm';

const LoginPage = () => {
  const { t } = useCoreTranslation();

  return (
    <PublicLayout>
      <div className="flex items-center justify-center bg-gray-50 px-4 py-8 min-h-full">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-2">
              <Heading variant="heading-md" as="h1">
                {t('core.auth.login.title')}
              </Heading>
            </div>
            <Text variant="s" color="grey600">
              {t('core.auth.login.subtitle')}
            </Text>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
