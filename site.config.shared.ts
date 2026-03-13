import type { Locale } from "./lib/i18n/config";

export type LocalizedSiteSettings = {
  title?: string;
  description?: string;
  footerHtml?: string;
  logoAlt?: string;
};

export type SiteSettings = {
  title: string;
  titleSeparator: string;
  description: string;
  url: string;
  logo?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
  footerHtml: string;
  githubUrl: string;
  i18n?: Partial<Record<Locale, LocalizedSiteSettings>>;
};
