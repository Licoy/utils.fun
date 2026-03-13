export type CategorySlug =
  | "generate"
  | "image"
  | "encrypt"
  | "time"
  | "convert"
  | "finance"
  | "text"
  | "dev";

export type ToolSlug =
  | "rand-password"
  | "qrcode"
  | "screen-record"
  | "random-number"
  | "guid"
  | "random-group"
  | "watermark"
  | "image-compress"
  | "qrcode-decode"
  | "barcode"
  | "md5"
  | "file-md5"
  | "hmac"
  | "sha"
  | "aes"
  | "rabbit"
  | "des"
  | "rc4"
  | "base64"
  | "unicode"
  | "url"
  | "timestamp"
  | "calculation"
  | "world"
  | "working-day"
  | "batch-timestamp"
  | "unit-converter"
  | "english-amount"
  | "sum-list"
  | "loan"
  | "rmb"
  | "text-dedupe"
  | "emoji-clean"
  | "id-card-cn"
  | "simplified-traditional"
  | "pinyin"
  | "pluralize"
  | "english-case"
  | "cn-en"
  | "trim"
  | "regex"
  | "md-html"
  | "json"
  | "json-to-types"
  | "css"
  | "js"
  | "html"
  | "sql"
  | "crontab"
  | "naming-converter"
  | "color-converter"
  | "websocket"
  | "go-struct-json"
  | "less2css"
  | "binary";

export const categoryRegistry = [
  {
    "slug": "generate"
  },
  {
    "slug": "image"
  },
  {
    "slug": "encrypt"
  },
  {
    "slug": "time"
  },
  {
    "slug": "convert"
  },
  {
    "slug": "finance"
  },
  {
    "slug": "text"
  },
  {
    "slug": "dev"
  }
] as const satisfies ReadonlyArray<{
  slug: CategorySlug;
}>;

export const toolRegistry = [
  {
    "slug": "rand-password",
    "category": "generate"
  },
  {
    "slug": "qrcode",
    "category": "generate"
  },
  {
    "slug": "screen-record",
    "category": "generate"
  },
  {
    "slug": "random-number",
    "category": "generate"
  },
  {
    "slug": "guid",
    "category": "generate"
  },
  {
    "slug": "random-group",
    "category": "generate"
  },
  {
    "slug": "watermark",
    "category": "image"
  },
  {
    "slug": "image-compress",
    "category": "image"
  },
  {
    "slug": "qrcode-decode",
    "category": "image"
  },
  {
    "slug": "barcode",
    "category": "image"
  },
  {
    "slug": "md5",
    "category": "encrypt"
  },
  {
    "slug": "file-md5",
    "category": "encrypt"
  },
  {
    "slug": "hmac",
    "category": "encrypt"
  },
  {
    "slug": "sha",
    "category": "encrypt"
  },
  {
    "slug": "aes",
    "category": "encrypt"
  },
  {
    "slug": "rabbit",
    "category": "encrypt"
  },
  {
    "slug": "des",
    "category": "encrypt"
  },
  {
    "slug": "rc4",
    "category": "encrypt"
  },
  {
    "slug": "base64",
    "category": "encrypt"
  },
  {
    "slug": "unicode",
    "category": "encrypt"
  },
  {
    "slug": "url",
    "category": "encrypt"
  },
  {
    "slug": "timestamp",
    "category": "time"
  },
  {
    "slug": "calculation",
    "category": "time"
  },
  {
    "slug": "world",
    "category": "time"
  },
  {
    "slug": "working-day",
    "category": "time"
  },
  {
    "slug": "batch-timestamp",
    "category": "time"
  },
  {
    "slug": "unit-converter",
    "category": "convert"
  },
  {
    "slug": "english-amount",
    "category": "finance"
  },
  {
    "slug": "sum-list",
    "category": "finance"
  },
  {
    "slug": "loan",
    "category": "finance"
  },
  {
    "slug": "rmb",
    "category": "text"
  },
  {
    "slug": "text-dedupe",
    "category": "text"
  },
  {
    "slug": "emoji-clean",
    "category": "text"
  },
  {
    "slug": "id-card-cn",
    "category": "text"
  },
  {
    "slug": "simplified-traditional",
    "category": "text"
  },
  {
    "slug": "pinyin",
    "category": "text"
  },
  {
    "slug": "pluralize",
    "category": "text"
  },
  {
    "slug": "english-case",
    "category": "text"
  },
  {
    "slug": "cn-en",
    "category": "text"
  },
  {
    "slug": "trim",
    "category": "text"
  },
  {
    "slug": "regex",
    "category": "text"
  },
  {
    "slug": "md-html",
    "category": "text"
  },
  {
    "slug": "json",
    "category": "dev"
  },
  {
    "slug": "json-to-types",
    "category": "dev"
  },
  {
    "slug": "css",
    "category": "dev"
  },
  {
    "slug": "js",
    "category": "dev"
  },
  {
    "slug": "html",
    "category": "dev"
  },
  {
    "slug": "sql",
    "category": "dev"
  },
  {
    "slug": "crontab",
    "category": "dev"
  },
  {
    "slug": "naming-converter",
    "category": "dev"
  },
  {
    "slug": "color-converter",
    "category": "dev"
  },
  {
    "slug": "websocket",
    "category": "dev"
  },
  {
    "slug": "go-struct-json",
    "category": "dev"
  },
  {
    "slug": "less2css",
    "category": "dev"
  },
  {
    "slug": "binary",
    "category": "dev"
  }
] as const satisfies ReadonlyArray<{
  slug: ToolSlug;
  category: CategorySlug;
}>;
