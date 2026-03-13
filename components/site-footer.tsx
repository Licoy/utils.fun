"use client";

import { useSiteConfig } from "@/components/providers/site-config-provider";

export function SiteFooter() {
  const siteConfig = useSiteConfig();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div
          className="text-center [&_a]:underline [&_a]:underline-offset-4 [&_img]:inline-block [&_img]:align-middle"
          dangerouslySetInnerHTML={{
            __html: siteConfig.footerHtml || `<span>${siteConfig.title}</span>`,
          }}
        />
      </div>
    </footer>
  );
}
