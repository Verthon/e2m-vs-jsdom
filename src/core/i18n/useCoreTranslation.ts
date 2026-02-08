import { createUseTranslation } from 'src/i18n/useTranslation';

import type en from './en.json';

type CoreMessages = typeof en;

export const useCoreTranslation = createUseTranslation<CoreMessages>();
