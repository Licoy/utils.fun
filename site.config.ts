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

export const siteSettings = {
  title: "Utils.fun",
  titleSeparator: " - ",
  description:
    "A clean online toolbox for development, text, time, image, encoding, and quick generation tasks.",
  url: "https://utils.fun",
  logo: {
    src: "/logo.png",
    alt: "Utils.fun logo",
    width: 36,
    height: 36,
  },
  footerHtml: `<p>&copy; ${new Date().getFullYear()} Utils.fun. All rights reserved.</p>`,
  githubUrl: "https://github.com/Licoy/utils.fun",
} satisfies SiteSettings;
