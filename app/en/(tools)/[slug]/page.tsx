import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPage } from "@/app/pages/tool-page";
import { getTool, tools } from "@/lib/tools";
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
  const siteConfig = getSiteConfig();
  if (!tool) {
    return {};
  }

  return {
    title: tool.title.en,
    description: tool.description.en,
    alternates: {
      canonical: buildAbsoluteUrl(siteConfig, `/en/${tool.slug}`),
      languages: {
        "zh-CN": buildAbsoluteUrl(siteConfig, `/${tool.slug}`),
      },
    },
  };
}

export default async function EnToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) {
    notFound();
  }

  return <ToolPage locale="en" pathPrefix="/en" slug={slug} />;
}
