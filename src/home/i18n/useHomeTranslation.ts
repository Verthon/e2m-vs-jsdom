import { createUseTranslation } from "src/i18n/useTranslation";

import type en from "./en.json";

type HomeMessages = typeof en;

export const useHomeTranslation = createUseTranslation<HomeMessages>();
