import { useIntl } from "react-intl";
import { useLocaleContext } from "./LocaleProvider";
import type { ReactNode } from "react";

type RichTextRenderer = (chunks: ReactNode) => ReactNode;

type PrimitiveValues = Record<string, string | number>;
type RichValues = Record<
  string,
  string | number | ReactNode | RichTextRenderer
>;

interface TranslateFn {
  (key: string, values?: PrimitiveValues): string;
  (key: string, values: RichValues): ReactNode;
}

export const useLocale = () => {
  const { locale, setLocale } = useLocaleContext();
  const intl = useIntl();

  const t = ((key: string, values?: RichValues) =>
    intl.formatMessage({ id: key }, values as any)) as TranslateFn;

  return { locale, setLocale, t } as const;
};
