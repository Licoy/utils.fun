import { categories, tools } from "@/lib/tools";

import { defaultLocale, getLocaleConfig, isLocale, localeConfig, locales, routableLocales, type Locale } from "@/lib/i18n/config";
import { arDictionary } from "@/lib/i18n/dictionaries/ar";
import { cnDictionary } from "@/lib/i18n/dictionaries/cn";
import { deDictionary } from "@/lib/i18n/dictionaries/de";
import { enDictionary } from "@/lib/i18n/dictionaries/en";
import { esDictionary } from "@/lib/i18n/dictionaries/es";
import { jaDictionary } from "@/lib/i18n/dictionaries/ja";
import { koDictionary } from "@/lib/i18n/dictionaries/ko";
import { ruDictionary } from "@/lib/i18n/dictionaries/ru";
import { twDictionary } from "@/lib/i18n/dictionaries/tw";
import type { Dictionary } from "@/lib/i18n/types";

const dictionaries: Record<Locale, Dictionary> = {
  cn: {
    ...cnDictionary,
    categories,
    tools,
  },
  en: {
    ...enDictionary,
    categories,
    tools,
  },
  es: {
    ...esDictionary,
    categories,
    tools,
  },
  ja: {
    ...jaDictionary,
    categories,
    tools,
  },
  ko: {
    ...koDictionary,
    categories,
    tools,
  },
  ru: {
    ...ruDictionary,
    categories,
    tools,
  },
  de: {
    ...deDictionary,
    categories,
    tools,
  },
  tw: {
    ...twDictionary,
    categories,
    tools,
  },
  ar: {
    ...arDictionary,
    categories,
    tools,
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getInlineMessageKey(zh: string, en: string) {
  return `${zh}__${en}`;
}

export {
  defaultLocale,
  getLocaleConfig,
  isLocale,
  localeConfig,
  locales,
  routableLocales,
  type Locale,
  type Dictionary,
};
