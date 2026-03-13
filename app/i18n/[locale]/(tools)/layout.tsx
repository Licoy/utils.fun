import { notFound } from "next/navigation";

import { ToolLayout } from "@/app/pages/tool-layout";
import { getPathPrefix, isRoutableLocale } from "@/lib/locale";

export default async function SeoLocaleToolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isRoutableLocale(locale)) {
    notFound();
  }

  return (
    <ToolLayout locale={locale} pathPrefix={getPathPrefix(locale)}>
      {children}
    </ToolLayout>
  );
}
