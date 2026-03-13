export type SiteSettings = {
  title: string;
  titleSeparator: string;
  description: string;
  url: string;
  logo?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
  footerHtml: string;
  githubUrl: string;
};
