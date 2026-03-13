export const localeConfig = {
  cn: {
    label: "简体中文",
    htmlLang: "zh-CN",
    numberFormat: "zh-CN",
    flagIcon: "twemoji:flag-china",
    direction: "ltr",
  },
  tw: {
    label: "繁體中文",
    htmlLang: "zh-Hant",
    numberFormat: "zh-TW",
    flagIcon: "twemoji:flag-china",
    direction: "ltr",
  },
  en: {
    label: "English",
    htmlLang: "en",
    numberFormat: "en-US",
    flagIcon: "twemoji:flag-united-states",
    direction: "ltr",
  },
  es: {
    label: "Español",
    htmlLang: "es",
    numberFormat: "es-ES",
    flagIcon: "twemoji:flag-spain",
    direction: "ltr",
  },
  ja: {
    label: "日本語",
    htmlLang: "ja",
    numberFormat: "ja-JP",
    flagIcon: "twemoji:flag-japan",
    direction: "ltr",
  },
  ko: {
    label: "한국어",
    htmlLang: "ko",
    numberFormat: "ko-KR",
    flagIcon: "twemoji:flag-south-korea",
    direction: "ltr",
  },
  ru: {
    label: "Русский",
    htmlLang: "ru",
    numberFormat: "ru-RU",
    flagIcon: "twemoji:flag-russia",
    direction: "ltr",
  },
  de: {
    label: "Deutsch",
    htmlLang: "de",
    numberFormat: "de-DE",
    flagIcon: "twemoji:flag-germany",
    direction: "ltr",
  },
  ar: {
    label: "العربية",
    htmlLang: "ar",
    numberFormat: "ar-SA",
    flagIcon: "twemoji:flag-saudi-arabia",
    direction: "rtl",
  },
} as const;

export type Locale = keyof typeof localeConfig;

export const defaultLocale: Locale = "cn";
export const locales = Object.keys(localeConfig) as Locale[];
export const routableLocales = locales;

export function isLocale(value: string): value is Locale {
  return value in localeConfig;
}

export function getLocaleConfig(locale: Locale) {
  return localeConfig[locale];
}
