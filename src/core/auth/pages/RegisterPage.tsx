import { useCoreTranslation } from 'src/core/i18n/useCoreTranslation';

import { RegisterForm } from '../components/RegisterForm';
import { PublicLayout } from '../components/PublicLayout';
import { Heading } from 'src/ui/atoms/Heading/Heading';
import { Text } from 'src/ui/atoms/Text/Text';

const RegisterPage = () => {
  const { t } = useCoreTranslation();

  return (
    <PublicLayout>
      <div className="flex items-center justify-center bg-gray-50 px-4 py-8 min-h-full">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-2">
              <Heading variant="heading-md" as="h1">
                {t('core.auth.register.title')}
              </Heading>
            </div>
            <Text variant="s" color="grey600">
              {t('core.auth.register.subtitle')}
            </Text>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default RegisterPage;
