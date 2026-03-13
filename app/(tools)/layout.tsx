import { ToolLayout } from "@/app/pages/tool-layout";
import { getPreferredLocale } from "@/lib/locale-server";

export default async function ToolRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getPreferredLocale();

  return (
    <ToolLayout locale={locale} pathPrefix="">
      {children}
    </ToolLayout>
  );
}
