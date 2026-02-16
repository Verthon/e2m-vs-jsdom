import type { ReactNode } from 'react';
import { IntlProvider } from 'react-intl'

import enCore from '../core/i18n/en.json';
import enAppointments from '../appointments/i18n/en.json';
import { LocaleProvider, useLocaleContext } from './LocaleProvider';

const messagesByLocale = {
  en: { ...enCore, ...enAppointments },
} as const;

export const I18nProvider = ({ children }: { children: ReactNode }) => (
  <LocaleProvider>
    <InnerIntlProvider>{children}</InnerIntlProvider>
  </LocaleProvider>
);

const InnerIntlProvider = ({ children }: { children: ReactNode }) => {
  const { locale } = useLocaleContext();
  const messages = messagesByLocale[locale] ?? messagesByLocale.en;

  return (
    <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
      {children}
    </IntlProvider>
  );
};
