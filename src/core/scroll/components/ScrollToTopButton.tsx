import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { FloatingButton } from '../../../ui/floatingButton/FloatingButton';
import { useScrollVisibility } from '../hooks/useScrollVisibility';
import { useCoreTranslation } from 'src/core/i18n/useCoreTranslation';

export const ScrollToTopButton = () => {
  const { t } = useCoreTranslation();
  const isVisible = useScrollVisibility(300);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <FloatingButton
      onClick={handleScrollToTop}
      variant="ghost"
      aria-label={t('core.scroll.scrollToTop')}
    >
      <ArrowUpIcon className="h-6 w-6" />
    </FloatingButton>
  );
};
