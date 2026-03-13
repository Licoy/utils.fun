import type { SiteSettings } from "./site.config.shared";

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
  i18n: {
    cn: {
      title: "Utils.fun",
      description: "一个简洁好用的在线工具站，覆盖开发、文本、时间、图片、编码和常用生成类场景。",
      footerHtml: `<p>&copy; ${new Date().getFullYear()} Utils.fun。保留所有权利。</p>`,
      logoAlt: "Utils.fun 标志",
    },
    tw: {
      title: "Utils.fun",
      description: "一個簡潔好用的線上工具站，涵蓋開發、文字、時間、圖片、編碼與常用生成場景。",
      footerHtml: `<p>&copy; ${new Date().getFullYear()} Utils.fun。保留所有權利。</p>`,
      logoAlt: "Utils.fun 標誌",
    },
    ja: {
      title: "Utils.fun",
      description: "開発、テキスト、時間、画像、エンコード、日常的な生成作業をカバーする、シンプルで使いやすいオンラインツール集です。",
      footerHtml: `<p>&copy; ${new Date().getFullYear()} Utils.fun. All rights reserved.</p>`,
      logoAlt: "Utils.fun logo",
    },
  },
} satisfies SiteSettings;
