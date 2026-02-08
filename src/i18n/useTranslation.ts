import { createElement, type ReactElement } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useLocaleContext } from './LocaleProvider';
import type { MessageValues } from './types';

type MessageKey<TMessages> = keyof TMessages & string;
type MessageContent<TMessages, K extends MessageKey<TMessages>> =
  TMessages[K] & string;

type ValuesRequired<
  TMessages extends Record<string, string>,
  K extends MessageKey<TMessages>,
> = MessageValues<MessageContent<TMessages, K>> extends Record<string, never>
  ? false
  : true;

export interface TranslateFn<TMessages extends Record<string, string>> {
  <K extends MessageKey<TMessages>>(
    key: ValuesRequired<TMessages, K> extends true ? never : K,
  ): string;

  <K extends MessageKey<TMessages>>(
    key: K,
    values: MessageValues<MessageContent<TMessages, K>>,
  ): string;
}

interface FormatMessageFn<TMessages extends Record<string, string>> {
  <K extends MessageKey<TMessages>>(
    key: ValuesRequired<TMessages, K> extends true ? never : K,
  ): ReactElement;

  <K extends MessageKey<TMessages>>(
    key: K,
    values: MessageValues<MessageContent<TMessages, K>>,
  ): ReactElement;
}

interface UseTranslationReturn<TMessages extends Record<string, string>> {
  locale: ReturnType<typeof useLocaleContext>['locale'];
  setLocale: ReturnType<typeof useLocaleContext>['setLocale'];
  t: TranslateFn<TMessages>;
  formatMessage: FormatMessageFn<TMessages>;
}

export const useTranslation = <
  TMessages extends Record<string, string>,
>(): UseTranslationReturn<TMessages> => {
  const { locale, setLocale } = useLocaleContext();
  const intl = useIntl();

  const t: TranslateFn<TMessages> = (key: any, values?: any) => {
    return intl.formatMessage({ id: key }, values);
  };

  const formatMessage: FormatMessageFn<TMessages> = (
    key: any,
    values?: any,
  ) => {
    return createElement(FormattedMessage, { id: key, values });
  };

  return { locale, setLocale, t, formatMessage };
};

export const createUseTranslation = <
  TMessages extends Record<string, string>,
>() => {
  return () => useTranslation<TMessages>();
};
