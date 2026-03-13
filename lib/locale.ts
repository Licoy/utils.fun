import {
  defaultLocale,
  getLocaleConfig,
  isLocale,
  locales,
  routableLocales,
  type Locale,
} from "@/lib/i18n/config";

export const LOCALE_COOKIE_NAME = "utilsfun-locale";
export const REQUEST_LOCALE_HEADER = "x-utils-locale";

export type PathPrefix = string;

const localeAliasMap: Record<string, Locale> = {
  cn: "cn",
  zh: "cn",
  "zh-cn": "cn",
  "zh-hans": "cn",
  en: "en",
  es: "es",
  "es-es": "es",
  "es-419": "es",
  ja: "ja",
  jp: "ja",
  ko: "ko",
  "ko-kr": "ko",
  ru: "ru",
  de: "de",
  ar: "ar",
  "ar-sa": "ar",
  "ar-ae": "ar",
  tw: "tw",
  "zh-tw": "tw",
  "zh-hk": "tw",
  "zh-hant": "tw",
};

export function normalizeLocale(value?: string | null): Locale {
  if (!value) {
    return defaultLocale;
  }

  const normalizedValue = value.trim().toLowerCase();
  const normalized =
    localeAliasMap[normalizedValue] ??
    localeAliasMap[normalizedValue.split("-")[0]];

  return normalized ?? defaultLocale;
}

export function isDefaultLocale(locale: Locale) {
  return locale === defaultLocale;
}

export function isRoutableLocale(value?: string | null): value is Locale {
  return (
    value !== null &&
    value !== undefined &&
    isLocale(value) &&
    routableLocales.includes(value)
  );
}

export function getLocaleFromPath(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : null;
}

export function stripLocalePrefix(pathname: string) {
  const locale = getLocaleFromPath(pathname);

  if (!locale) {
    return pathname || "/";
  }

  return pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "") || "/";
}

export function getPathPrefix(locale: Locale): PathPrefix {
  return `/${locale}`;
}

export function buildPath(pathPrefix: PathPrefix, pathname: string) {
  const normalizedPath =
    pathname === "/"
      ? ""
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;

  return `${pathPrefix}${normalizedPath}` || "/";
}

export function buildLocalizedPath(locale: Locale, pathname: string) {
  return buildPath(getPathPrefix(locale), pathname);
}

export function buildToolPath(pathPrefix: PathPrefix, slug: string) {
  return buildPath(pathPrefix, `/${slug}`);
}

export function buildLocalizedToolPath(locale: Locale, slug: string) {
  return buildLocalizedPath(locale, `/${slug}`);
}

export function getHomePath(pathPrefix: PathPrefix) {
  return pathPrefix || "/";
}

export function getRoutableLocales() {
  return routableLocales;
}

export function matchPreferredLocale(input?: string | null) {
  if (!input) {
    return defaultLocale;
  }

  const candidates = input
    .split(",")
    .map((item) => {
      const [rawLocale, ...params] = item.trim().split(";");
      const qValue = params.find((param) => param.trim().startsWith("q="));
      const quality = qValue ? Number(qValue.split("=")[1]) : 1;

      return {
        locale: normalizeLocale(rawLocale),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  return candidates[0]?.locale ?? defaultLocale;
}

export function getLocaleHtmlLang(locale: Locale) {
  return getLocaleConfig(locale).htmlLang;
}

export function getLocaleNumberFormat(locale: Locale) {
  return getLocaleConfig(locale).numberFormat;
}

export function getLocaleFlagIcon(locale: Locale) {
  return getLocaleConfig(locale).flagIcon;
}

export function getLocaleLabel(locale: Locale) {
  return getLocaleConfig(locale).label;
}

export function getLocaleDirection(locale: Locale) {
  return getLocaleConfig(locale).direction;
}

export function getLanguageAlternates(pathname: string) {
  return Object.fromEntries(
    locales.map((locale) => [
      getLocaleHtmlLang(locale),
      buildLocalizedPath(locale, pathname),
    ]),
  );
}

export function persistLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
