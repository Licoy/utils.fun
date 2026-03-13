import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { defaultSiteConfig, type SiteConfig } from "@/lib/site";

export function getSiteConfig(): SiteConfig {
  noStore();

  return applySiteEnvOverrides(defaultSiteConfig, process.env);
}

function applySiteEnvOverrides(
  baseConfig: SiteConfig,
  env: NodeJS.ProcessEnv,
): SiteConfig {
  const title = readString(env.SITE_TITLE) ?? baseConfig.title;
  const titleSeparator =
    readString(env.SITE_TITLE_SEPARATOR) ?? baseConfig.titleSeparator;
  const description = readString(env.SITE_DESCRIPTION) ?? baseConfig.description;
  const url = readString(env.SITE_URL) ?? baseConfig.url;
  const footerHtml = readString(env.SITE_FOOTER_HTML) ?? baseConfig.footerHtml;
  const githubUrl = readString(env.SITE_GITHUB_URL) ?? baseConfig.githubUrl;
  const logoHidden = readBoolean(env.SITE_LOGO_HIDDEN);
  const baseLogo = logoHidden ? null : baseConfig.logo;
  const logoSrc = readString(env.SITE_LOGO_SRC) ?? baseLogo?.src ?? "";

  const logo = logoHidden || !logoSrc
    ? null
    : {
        src: logoSrc,
        alt: readString(env.SITE_LOGO_ALT) ?? baseLogo?.alt ?? `${title} logo`,
        width: readNumber(env.SITE_LOGO_WIDTH) ?? baseLogo?.width ?? 36,
        height: readNumber(env.SITE_LOGO_HEIGHT) ?? baseLogo?.height ?? 36,
      };

  return {
    ...baseConfig,
    name: title,
    title,
    titleSeparator,
    description,
    url,
    logo,
    footerHtml,
    githubUrl,
  };
}

function readString(value?: string) {
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  return normalized || null;
}

function readNumber(value?: string) {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function readBoolean(value?: string) {
  if (!value) {
    return false;
  }

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}
