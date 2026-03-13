import { getDictionary } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/lib/tools";

export function ToolPageLoading({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const loadingLabel = dict.toolLoadingLabel;
  const loadingHint = dict.toolLoadingHint;

  return (
    <div className="min-w-0 space-y-10">
      <section className="space-y-5 border-b border-border/60 pb-8">
        <div className="flex items-start gap-4">
          <div className="size-11 shrink-0 animate-pulse rounded-xl border border-border bg-muted/50 sm:size-12" />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-10 w-56 max-w-full animate-pulse rounded-lg bg-muted/60 sm:h-11 sm:w-72" />
            <div className="max-w-3xl space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted/50" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted/40" />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-7 w-20 animate-pulse rounded-full border border-border/70 bg-muted/40"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{loadingLabel}</p>
          <p className="text-sm text-muted-foreground">{loadingHint}</p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="space-y-5 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted/50" />
                  <div className="h-10 w-full animate-pulse rounded-xl border border-border/70 bg-muted/40" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 w-28 animate-pulse rounded bg-muted/50" />
              <div className="h-40 w-full animate-pulse rounded-2xl border border-border/70 bg-muted/35" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="h-5 w-32 animate-pulse rounded bg-muted/50" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted/40" />
            </div>
            <div className="h-52 w-full animate-pulse rounded-2xl border border-border/70 bg-muted/30" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
