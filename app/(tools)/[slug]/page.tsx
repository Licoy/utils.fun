import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTool, tools } from "@/lib/tools";
import { ToolPage } from "@/app/pages/tool-page";
import { getPreferredLocale } from "@/lib/locale-server";
import { getSiteConfig } from "@/lib/site.server";
import { buildAbsoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  const locale = await getPreferredLocale();
  const siteConfig = getSiteConfig();
  if (!tool) {
    return {};
  }

  return {
    title: tool.title[locale],
    description: tool.description[locale],
    alternates: {
      canonical: buildAbsoluteUrl(siteConfig, `/${tool.slug}`),
      languages: {
        en: buildAbsoluteUrl(siteConfig, `/en/${tool.slug}`),
      },
    },
  };
}

export default async function ZhToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getPreferredLocale();
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) {
    notFound();
  }

  return <ToolPage locale={locale} pathPrefix="" slug={slug} />;
}
