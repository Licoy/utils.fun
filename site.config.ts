import { siteSettings as devSiteSettings } from "./site.config.dev";
import { siteSettings as prodSiteSettings } from "./site.config.prod";
import type { SiteSettings } from "./site.config.shared";

export type { SiteSettings } from "./site.config.shared";

export const siteSettings: SiteSettings =
  process.env.NODE_ENV === "production" ? prodSiteSettings : devSiteSettings;
