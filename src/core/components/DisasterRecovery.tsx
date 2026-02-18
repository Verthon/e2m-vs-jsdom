import { useCoreTranslation } from 'src/core/i18n/useCoreTranslation';
import { Button } from 'src/ui/atoms/Button/Button';
import { Heading } from 'src/ui/atoms/Heading/Heading';
import { Text } from 'src/ui/atoms/Text/Text';

export const DisasterRecovery = () => {
  const { t } = useCoreTranslation();

  const handleRefresh = () => {
    globalThis.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-16 min-h-screen">
      <div className="text-center max-w-lg">
        <div className="mb-6">
          <Heading variant="heading-xl" as="h1">
            {t('core.disaster.title')}
          </Heading>
        </div>
        <div className="mb-8">
          <Text size="lg" color="secondary" as="p">
            {t('core.disaster.message')}
          </Text>
        </div>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" onClick={handleRefresh}>
            {t('core.disaster.refreshButton')}
          </Button>
        </div>
      </div>
    </div>
  );
};
