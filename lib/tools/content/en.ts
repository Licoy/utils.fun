import type { CategoryContentMap, ToolContentMap } from "@/lib/tools/content-types";

export const enCategoryContent: CategoryContentMap = {
  "generate": {
    "title": "Generate",
    "description": "Fast creation tools for generating assets you can use right away."
  },
  "image": {
    "title": "Image",
    "description": "Image workflows that stay local in the browser whenever possible."
  },
  "encrypt": {
    "title": "Encrypt",
    "description": "Hashing, encoding, and common symmetric encryption helpers."
  },
  "time": {
    "title": "Time",
    "description": "Timestamp conversion, date arithmetic, and world time tools."
  },
  "convert": {
    "title": "Convert",
    "description": "Local conversion tools for common units, temperature, data sizes, and durations."
  },
  "finance": {
    "title": "Finance",
    "description": "Practical helpers for amount wording, list totals, and loan estimates."
  },
  "text": {
    "title": "Text",
    "description": "A practical text workbench for editing, converting, and validation."
  },
  "dev": {
    "title": "Dev",
    "description": "Formatting, conversion, and debugging helpers for developers."
  }
};

export const enToolContent: ToolContentMap = {
  "rand-password": {
    "title": "Random Password",
    "description": "Generate strong random passwords by length and character set with local history.",
    "highlights": [
      "Custom length",
      "Case, digits, symbols",
      "Local history"
    ]
  },
  "qrcode": {
    "title": "QR Code",
    "description": "Turn text or URLs into QR codes with adjustable size and colors.",
    "highlights": [
      "Adjust size",
      "Customize colors",
      "Download image"
    ]
  },
  "screen-record": {
    "title": "Screen Record",
    "description": "Record your screen with browser APIs and export the result locally.",
    "highlights": [
      "Native browser capture",
      "Instant preview",
      "Local export"
    ]
  },
  "random-number": {
    "title": "Range Number Lab",
    "description": "Batch-generate random values by range, precision, and uniqueness for sampling or test data.",
    "highlights": [
      "Range and precision",
      "Unique toggle",
      "Multi-line output"
    ]
  },
  "guid": {
    "title": "UUID Batch Forge",
    "description": "Create multiple UUIDs in-browser for API testing, fixtures, and placeholder records.",
    "highlights": [
      "Batch output",
      "Case toggle",
      "Text export"
    ]
  },
  "random-group": {
    "title": "Random Grouping",
    "description": "Shuffle a roster into random groups by group count or size, or pick a single winner.",
    "highlights": [
      "By group count or size",
      "Single pick mode",
      "Flexible separators"
    ]
  },
  "watermark": {
    "title": "Offline Watermark",
    "description": "Apply repeated text watermarks to local images without uploading them.",
    "highlights": [
      "Opacity and angle",
      "Local rendering",
      "Export result"
    ]
  },
  "image-compress": {
    "title": "Image Compress",
    "description": "Compress images in the browser and compare the before and after result.",
    "highlights": [
      "Quality control",
      "Before/after compare",
      "Download file"
    ]
  },
  "qrcode-decode": {
    "title": "QR Content Reader",
    "description": "Extract copyable text from a local QR image to inspect links, notes, or Wi-Fi payloads.",
    "highlights": [
      "Offline decode",
      "Image preview",
      "Copy result"
    ]
  },
  "barcode": {
    "title": "Barcode Canvas",
    "description": "Draft barcodes with multiple standards and export crisp SVG artwork right away.",
    "highlights": [
      "Switch standards",
      "Color and size",
      "SVG download"
    ]
  },
  "md5": {
    "title": "Text MD5",
    "description": "Calculate text MD5 hashes and show lower/upper case variants.",
    "highlights": [
      "32-char output",
      "Upper/lower case",
      "Copy quickly"
    ]
  },
  "file-md5": {
    "title": "File MD5",
    "description": "Hash local files in chunks for dependable MD5 verification.",
    "highlights": [
      "Local files",
      "Chunked hashing",
      "Large-file friendly"
    ]
  },
  "hmac": {
    "title": "HMAC Hash",
    "description": "Calculate keyed HMAC hashes for MD5 and SHA variants.",
    "highlights": [
      "Multiple algorithms",
      "Keyed hash",
      "Hex output"
    ]
  },
  "sha": {
    "title": "SHA Hash",
    "description": "Compute SHA1, SHA256, SHA512, and related hash values.",
    "highlights": [
      "SHA variants",
      "Fast hashing",
      "Hex output"
    ]
  },
  "aes": {
    "title": "AES Cipher",
    "description": "Encrypt and decrypt with AES using common modes and padding options.",
    "highlights": [
      "ECB/CBC",
      "Hex or Base64",
      "Custom IV"
    ]
  },
  "rabbit": {
    "title": "Rabbit Cipher",
    "description": "Encrypt and decrypt text with the Rabbit stream cipher.",
    "highlights": [
      "Lightweight",
      "Browser-side",
      "Copy result"
    ]
  },
  "des": {
    "title": "DES / 3DES",
    "description": "Handle DES and TripleDES text encryption and decryption.",
    "highlights": [
      "DES and 3DES",
      "Text encryption",
      "Base64 output"
    ]
  },
  "rc4": {
    "title": "RC4 Cipher",
    "description": "Run RC4 encryption or decryption on input text.",
    "highlights": [
      "Classic cipher",
      "Fast actions",
      "Local only"
    ]
  },
  "base64": {
    "title": "Base64",
    "description": "Convert between plain text and Base64 quickly.",
    "highlights": [
      "Unicode-safe",
      "Encode/decode",
      "Copy result"
    ]
  },
  "unicode": {
    "title": "Unicode Convert",
    "description": "Convert text to Unicode escape sequences and back.",
    "highlights": [
      "Escape output",
      "Restore readable text",
      "Local processing"
    ]
  },
  "url": {
    "title": "URL Encode",
    "description": "Encode and decode URL values safely for transport.",
    "highlights": [
      "Safe for params",
      "Encode/decode",
      "Instant result"
    ]
  },
  "timestamp": {
    "title": "Timestamp",
    "description": "Show the current timestamp and convert between time strings and timestamps.",
    "highlights": [
      "Seconds/ms",
      "Live clock",
      "Bidirectional conversion"
    ]
  },
  "calculation": {
    "title": "Date Calculation",
    "description": "Add or subtract time from a date and measure date intervals.",
    "highlights": [
      "Add days/months/years",
      "Day interval",
      "Clear forms"
    ]
  },
  "world": {
    "title": "World Time",
    "description": "View a given moment across a set of major world time zones.",
    "highlights": [
      "Multiple cities",
      "Side-by-side table",
      "Choose base zone"
    ]
  },
  "working-day": {
    "title": "Business Day Offset",
    "description": "Shift schedules by business days with optional holiday and makeup-workday overrides.",
    "highlights": [
      "Skip weekends",
      "Custom holiday list",
      "Range counting"
    ]
  },
  "batch-timestamp": {
    "title": "Multi-Line Time Converter",
    "description": "Normalize timestamp-heavy logs line by line into readable dates or raw Unix values.",
    "highlights": [
      "Auto direction",
      "Seconds and ms",
      "Batch export"
    ]
  },
  "unit-converter": {
    "title": "Unit Switchboard",
    "description": "Keep common engineering and daily units in one place for quick side-by-side conversions.",
    "highlights": [
      "Grouped switching",
      "Direct target unit",
      "Whole-group table"
    ]
  },
  "english-amount": {
    "title": "English Amount Draft",
    "description": "Draft invoice-ready English amount wording from a numeric money value.",
    "highlights": [
      "Sentence case",
      "Uppercase style",
      "Invoice ready"
    ]
  },
  "sum-list": {
    "title": "Number Sheet Summary",
    "description": "Turn loose numeric lists into sum, average, and min/max summaries for quick budgeting.",
    "highlights": [
      "Mixed separators",
      "Average and extremes",
      "Invalid token hints"
    ]
  },
  "loan": {
    "title": "Loan Payment Planner",
    "description": "Estimate monthly burden and total interest from loan principal, rate, and term.",
    "highlights": [
      "Monthly estimate",
      "Total interest",
      "First 12 months"
    ]
  },
  "rmb": {
    "title": "RMB Uppercase",
    "description": "Convert numbers into uppercase Chinese RMB wording.",
    "highlights": [
      "Financial wording",
      "Integers and decimals",
      "Instant result"
    ]
  },
  "text-dedupe": {
    "title": "List Cleanup",
    "description": "Clean repeated entries, case differences, and noisy spacing into a tidier list.",
    "highlights": [
      "Line, comma, or space",
      "Ignore case",
      "Summary kept"
    ]
  },
  "emoji-clean": {
    "title": "Emoji Cleaner",
    "description": "Strip emoji and pictographic symbols from text for cleaner, formal plain-text output.",
    "highlights": [
      "Plain text output",
      "Removed count",
      "Form-friendly"
    ]
  },
  "id-card-cn": {
    "title": "CN ID Check",
    "description": "Validate Mainland China 18-digit ID numbers and extract birthday, age, and gender details.",
    "highlights": [
      "18-digit validation",
      "Birthday and age",
      "Region prefix"
    ]
  },
  "simplified-traditional": {
    "title": "Chinese Script Switch",
    "description": "Switch quickly between Simplified and Traditional Chinese for copy cleanup and regional variants.",
    "highlights": [
      "Two-way switch",
      "Offline dictionary",
      "Long-text friendly"
    ]
  },
  "pinyin": {
    "title": "Pinyin Transcriber",
    "description": "Transcribe Chinese text into pinyin and initials for indexing, search, or note organization.",
    "highlights": [
      "Marked, plain, or numeric",
      "Initials output",
      "Local-only"
    ]
  },
  "pluralize": {
    "title": "Pluralize",
    "description": "Switch quickly between singular and plural English nouns.",
    "highlights": [
      "Singular/plural",
      "Common word forms",
      "Simple input"
    ]
  },
  "english-case": {
    "title": "English Case",
    "description": "Convert text into upper, lower, title, or sentence case.",
    "highlights": [
      "Several case styles",
      "Clean copy",
      "Copy quickly"
    ]
  },
  "cn-en": {
    "title": "CN/EN Spacing",
    "description": "Improve spacing between Chinese, English, and numbers automatically.",
    "highlights": [
      "Better mixed spacing",
      "Improved readability",
      "One-click fix"
    ]
  },
  "trim": {
    "title": "Trim Text",
    "description": "Trim whitespace from the whole text or line by line.",
    "highlights": [
      "Full trim",
      "Line trim",
      "Batch-friendly"
    ]
  },
  "regex": {
    "title": "Regex Test",
    "description": "Test whether a string matches a regular expression pattern.",
    "highlights": [
      "Flags supported",
      "Quick validation",
      "Template examples"
    ]
  },
  "md-html": {
    "title": "Markdown to HTML",
    "description": "Render Markdown into HTML and switch between code and preview.",
    "highlights": [
      "Two-pane flow",
      "HTML output",
      "Live preview"
    ]
  },
  "json": {
    "title": "JSON Format",
    "description": "Format, minify, and validate JSON content.",
    "highlights": [
      "Pretty print",
      "Minify",
      "Validation"
    ]
  },
  "json-to-types": {
    "title": "JSON Type Sketch",
    "description": "Sketch TypeScript interfaces from sample JSON before refining them by hand.",
    "highlights": [
      "Rename root type",
      "Keeps nesting",
      "Monaco dual pane"
    ]
  },
  "css": {
    "title": "CSS Format",
    "description": "Format CSS and apply lightweight compression.",
    "highlights": [
      "Prettier format",
      "Minified output",
      "Code editor"
    ]
  },
  "js": {
    "title": "JavaScript Format",
    "description": "Format or compact JavaScript snippets for quick cleanup.",
    "highlights": [
      "Prettier format",
      "Minify output",
      "Copy result"
    ]
  },
  "html": {
    "title": "HTML Format",
    "description": "Beautify HTML or compress it into a tighter representation.",
    "highlights": [
      "Cleaner structure",
      "Minified output",
      "Snippet friendly"
    ]
  },
  "sql": {
    "title": "SQL Format",
    "description": "Format SQL statements for readability or compress them for transport.",
    "highlights": [
      "Uppercase keywords",
      "Compress spaces",
      "Query friendly"
    ]
  },
  "crontab": {
    "title": "Cron Schedule",
    "description": "Preview the next several execution times from a cron expression.",
    "highlights": [
      "Next 10 runs",
      "Expression validation",
      "Time list"
    ]
  },
  "naming-converter": {
    "title": "Naming Gearbox",
    "description": "Split natural language or existing identifiers and shift them into common code naming styles.",
    "highlights": [
      "Auto word split",
      "6 naming styles",
      "Instant output"
    ]
  },
  "color-converter": {
    "title": "Color Format Bridge",
    "description": "Bridge HEX, RGB, and HSL formats with a live swatch for quick visual confirmation.",
    "highlights": [
      "Three formats",
      "Color picker",
      "Live preview"
    ]
  },
  "websocket": {
    "title": "WebSocket Test",
    "description": "Connect to a WebSocket endpoint, send messages, and inspect logs.",
    "highlights": [
      "Connect/close",
      "Message log",
      "Heartbeat settings"
    ]
  },
  "go-struct-json": {
    "title": "Go Struct / JSON",
    "description": "Convert between Go structs and JSON skeletons.",
    "highlights": [
      "Two-way conversion",
      "Keeps nesting",
      "Developer utility"
    ]
  },
  "less2css": {
    "title": "Less to CSS",
    "description": "Compile Less snippets and output the generated CSS.",
    "highlights": [
      "In-browser compile",
      "Two columns",
      "Copy output"
    ]
  },
  "binary": {
    "title": "Base Conversion",
    "description": "Convert numbers across binary, octal, decimal, hexadecimal, and more.",
    "highlights": [
      "2/8/10/16/32/36 bases",
      "Instant table",
      "Useful in development"
    ]
  }
};
