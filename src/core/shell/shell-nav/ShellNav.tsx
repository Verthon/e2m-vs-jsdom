import { Bars3Icon, BugAntIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useCoreTranslation } from 'src/core/i18n/useCoreTranslation';

export const ShellNav = () => {
  const { t } = useCoreTranslation();
  const [open, setOpen] = useState(false);

  return (
      <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <BugAntIcon className="h-6 w-6 text-gray-900" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={t('core.toggleMenu')}
          className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
        >
          <Bars3Icon className="h-6 w-6 text-gray-900" />
        </button>
      </header>
  );
};
