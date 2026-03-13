import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { getLanguageAlternates } from "@/lib/locale";
import { siteSettings } from "@/site.config";
import type { SiteSettings } from "@/site.config.shared";

export type SiteConfig = {
  name: string;
  title: string;
  titleSeparator: string;
  description: string;
  url: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  footerHtml: string;
  githubUrl: string;
};

export const defaultSiteConfig = createSiteConfig(siteSettings);

export function createSiteConfig(
  settings: SiteSettings,
  locale: Locale = defaultLocale,
): SiteConfig {
  const localizedSettings = settings.i18n?.[locale];
  const title = localizedSettings?.title ?? settings.title;
  const description = localizedSettings?.description ?? settings.description;
  const footerHtml = localizedSettings?.footerHtml ?? settings.footerHtml;
  const logoAlt = localizedSettings?.logoAlt ?? settings.logo?.alt ?? `${title} logo`;
  const logo =
    settings.logo?.src
      ? {
          src: settings.logo.src,
          alt: logoAlt,
          width: settings.logo.width ?? 36,
          height: settings.logo.height ?? 36,
        }
      : null;

  return {
    name: title,
    title,
    titleSeparator: settings.titleSeparator,
    description,
    url: settings.url,
    logo,
    footerHtml,
    githubUrl: settings.githubUrl,
  };
}

export function buildDocumentTitle(siteConfig: SiteConfig, pageTitle?: string) {
  if (!pageTitle || pageTitle === siteConfig.title) {
    return siteConfig.title;
  }

  return `${pageTitle} ${siteConfig.titleSeparator} ${siteConfig.title}`;
}

export function buildAbsoluteUrl(siteConfig: SiteConfig, path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildLanguageAlternateUrls(siteConfig: SiteConfig, pathname: string) {
  return Object.fromEntries(
    Object.entries(getLanguageAlternates(pathname)).map(([language, path]) => [
      language,
      buildAbsoluteUrl(siteConfig, path),
    ]),
  );
}
