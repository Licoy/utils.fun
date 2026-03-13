import type { Metadata } from "next";

import { HomePage } from "@/app/pages/home-page";
import { getPreferredLocale } from "@/lib/locale-server";
import { getSiteConfig } from "@/lib/site.server";
import { getDictionary } from "@/lib/i18n";
import { buildAbsoluteUrl, buildDocumentTitle, buildLanguageAlternateUrls } from "@/lib/site";
import { buildLocalizedPath } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getPreferredLocale();
  const siteConfig = getSiteConfig();
  const dict = getDictionary(locale);

  return {
    title: {
      absolute: buildDocumentTitle(siteConfig, dict.homeLabel),
    },
    alternates: {
      canonical: buildAbsoluteUrl(siteConfig, buildLocalizedPath(locale, "/")),
      languages: buildLanguageAlternateUrls(siteConfig, "/"),
    },
  };
}

export default async function HomePageRoute() {
  const locale = await getPreferredLocale();

  return <HomePage locale={locale} pathPrefix="" />;
}
