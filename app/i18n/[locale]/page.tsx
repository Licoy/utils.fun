import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "@/app/pages/home-page";
import { getDictionary, type Locale } from "@/lib/i18n";
import { buildLocalizedPath, getPathPrefix, getRoutableLocales, isRoutableLocale } from "@/lib/locale";
import { buildAbsoluteUrl, buildDocumentTitle, buildLanguageAlternateUrls } from "@/lib/site";
import { getSiteConfig } from "@/lib/site.server";

export function generateStaticParams() {
  return getRoutableLocales().map((locale) => ({ locale }));
}

function resolveLocale(locale: string): Locale {
  if (!isRoutableLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const siteConfig = getSiteConfig(resolvedLocale);
  const dict = getDictionary(resolvedLocale);

  return {
    title: {
      absolute: buildDocumentTitle(siteConfig, dict.homeLabel),
    },
    alternates: {
      canonical: buildAbsoluteUrl(siteConfig, buildLocalizedPath(resolvedLocale, "/")),
      languages: buildLanguageAlternateUrls(siteConfig, "/"),
    },
  };
}

export default async function SeoLocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);

  return <HomePage locale={resolvedLocale} pathPrefix={getPathPrefix(resolvedLocale)} />;
}
