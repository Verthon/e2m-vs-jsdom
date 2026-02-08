import { Link } from 'react-router';

import { useCoreTranslation } from 'src/core/i18n/useCoreTranslation';
import { Button } from 'src/ui/atoms/Button/Button';
import { Heading } from 'src/ui/atoms/Heading/Heading';
import { Text } from 'src/ui/atoms/Text/Text';

import { Shell } from '../shell/Shell';

const NotFoundPage = () => {
  const { t } = useCoreTranslation();

  return (
    <Shell>
      <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-16 min-h-full">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <Heading variant="heading-xl" as="h1">
              404
            </Heading>
          </div>
          <div className="mb-2">
            <Heading variant="heading-md" as="h2">
              {t('core.notFound.title')}
            </Heading>
          </div>
          <div className="mb-8">
            <Text size="base" color="secondary">
              {t('core.notFound.message')}
            </Text>
          </div>
          <Link to="/">
            <Button variant="primary" size="md">
              {t('core.notFound.backHome')}
            </Button>
          </Link>
        </div>
      </div>
    </Shell>
  );
};

export default NotFoundPage;
