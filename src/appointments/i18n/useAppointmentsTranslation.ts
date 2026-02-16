import { createUseTranslation } from 'src/i18n/useTranslation';

import type en from './en.json';

type AppointmentsMessages = typeof en;

export const useAppointmentsTranslation = createUseTranslation<AppointmentsMessages>();
