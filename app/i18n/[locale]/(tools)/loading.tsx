import { ToolPageLoading } from "@/components/tool-page-loading";
import { defaultLocale } from "@/lib/i18n";

export default function SeoLocaleToolLoading() {
  return <ToolPageLoading locale={defaultLocale} />;
}
