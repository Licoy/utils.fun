import { ToolPageLoading } from "@/components/tool-page-loading";
import { getPreferredLocale } from "@/lib/locale-server";

export default async function ToolRouteLoading() {
  const locale = await getPreferredLocale();

  return <ToolPageLoading locale={locale} />;
}
