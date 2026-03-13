import type { Metadata } from "next";

import { SiteConfigProvider } from "@/components/providers/site-config-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getSiteConfig } from "@/lib/site.server";
import "./globals.css";

export function generateMetadata(): Metadata {
  const siteConfig = getSiteConfig();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s ${siteConfig.titleSeparator} ${siteConfig.title}`,
    },
    applicationName: siteConfig.title,
    description: siteConfig.description,
    icons: siteConfig.logo
      ? {
          icon: siteConfig.logo.src,
        }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = getSiteConfig();

  return (
    <html lang="zh-CN" suppressHydrationWarning className="font-sans">
      <body>
        <SiteConfigProvider value={siteConfig}>
          <ThemeProvider>{children}</ThemeProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
