import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale-server";

export default async function NotFound() {
  const locale = await getPreferredLocale();
  const dict = getDictionary(locale);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="rounded-md border px-3 py-1 text-sm text-muted-foreground">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">
        {dict.notFound}
      </h1>
      <Button asChild>
        <Link href="/">
          {dict.backHome}
        </Link>
      </Button>
    </main>
  );
}
