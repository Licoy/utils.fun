import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/lib/site.server";

export default function NotFound() {
  const siteConfig = getSiteConfig();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="rounded-md border px-3 py-1 text-sm text-muted-foreground">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">
        页面不存在
      </h1>
      <Button asChild>
        <Link href="/">{`返回 ${siteConfig.title}`}</Link>
      </Button>
    </main>
  );
}
