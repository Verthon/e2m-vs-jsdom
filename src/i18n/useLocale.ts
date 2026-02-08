import { useIntl } from 'react-intl';
import { useLocaleContext } from './LocaleProvider';

type TranslateFn<TMessages extends Record<string, string>> = <
  Key extends keyof TMessages & string,
>(
  key: Key,
  values?: Record<string, string>,
) => string;

export const useLocale = <TMessages extends Record<string, string>>() => {
  const { locale, setLocale } = useLocaleContext();
  const intl = useIntl();

  const t: TranslateFn<TMessages> = (key, values) =>
    intl.formatMessage({ id: key }, values);

  return { locale, setLocale, t };
};
