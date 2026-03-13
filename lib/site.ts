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

export function createSiteConfig(settings: SiteSettings): SiteConfig {
  const logo =
    settings.logo?.src
      ? {
          src: settings.logo.src,
          alt: settings.logo.alt || `${settings.title} logo`,
          width: settings.logo.width ?? 36,
          height: settings.logo.height ?? 36,
        }
      : null;

  return {
    name: settings.title,
    title: settings.title,
    titleSeparator: settings.titleSeparator,
    description: settings.description,
    url: settings.url,
    logo,
    footerHtml: settings.footerHtml,
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
