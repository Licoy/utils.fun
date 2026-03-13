import type { MetadataRoute } from "next";

import { defaultLocale, locales } from "@/lib/i18n";
import { buildLocalizedPath } from "@/lib/locale";
import { tools } from "@/lib/tools";
import { getSiteConfig } from "@/lib/site.server";
import { buildAbsoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteConfig = getSiteConfig();

  return [
    ...locales.map((locale) => ({
      url: buildAbsoluteUrl(siteConfig, buildLocalizedPath(locale, "/")),
      changeFrequency: "weekly" as const,
      priority: locale === defaultLocale ? 1 : 0.9,
    })),
    ...tools.flatMap((tool) =>
      locales.map((locale) => ({
        url: buildAbsoluteUrl(siteConfig, buildLocalizedPath(locale, `/${tool.slug}`)),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ),
  ];
}
