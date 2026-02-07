import { useIntl } from 'react-intl';
import type enCore from '../core/i18n/en.json';
import { useLocaleContext } from './LocaleProvider';

export type CoreMessageKey = keyof typeof enCore;

export type MessageKey =
  | CoreMessageKey

type TranslateFn = <Key extends MessageKey>(
  key: Key,
  values?: Record<string, string>,
) => string;

export const useLocale = () => {
  const { locale, setLocale } = useLocaleContext();
  const intl = useIntl();

  const t: TranslateFn = (key, values) =>
    intl.formatMessage({ id: key }, values);

  return { locale, setLocale, t };
};
