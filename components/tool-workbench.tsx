"use client";

import {
  Download,
  History,
  LoaderCircle,
  MonitorUp,
  Play,
  Square,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import ImageCompare from "image-compare-viewer";
import JsBarcode from "jsbarcode";
import JsonToTS from "json-to-ts";
import jsQR from "jsqr";
import * as OpenCC from "opencc-js";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { marked } from "marked";
import pluralize from "pluralize";
import { pinyin } from "pinyin-pro";
import QRCode from "qrcode";
import SparkMD5 from "spark-md5";
import { format as formatSql } from "sql-formatter";
import {
  cloneElement,
  isValidElement,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
} from "react";
import { Alert as UIAlert } from "@/components/ui/alert";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Button as UIButton, buttonVariants } from "@/components/ui/button";
import { Checkbox as UICheckbox } from "@/components/ui/checkbox";
import { Input as UIInput } from "@/components/ui/input";
import { ScrollArea as UIScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator as UISeparator } from "@/components/ui/separator";
import { Slider as UISlider } from "@/components/ui/slider";
import { Switch as UISwitch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea as UITextarea } from "@/components/ui/textarea";
import { CodeEditor } from "@/components/code-editor";
import { useSiteConfig } from "@/components/providers/site-config-provider";
import { getDictionary } from "@/lib/i18n";
import { type Locale, type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

dayjs.extend(utc);
dayjs.extend(timezone);

type ToolWorkbenchProps = {
  tool: Tool;
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
};

type Dictionary = ReturnType<typeof getDictionary>;

const worldTimezoneMap = {
  "Etc/GMT": { zh: "协调世界时", en: "UTC" },
  "Asia/Shanghai": { zh: "中国上海", en: "Shanghai" },
  "America/New_York": { zh: "美国纽约", en: "New York" },
  "America/Los_Angeles": { zh: "美国洛杉矶", en: "Los Angeles" },
  "Pacific/Honolulu": { zh: "夏威夷", en: "Honolulu" },
  "America/Santiago": { zh: "美国圣地亚哥", en: "Santiago" },
  "Asia/Tokyo": { zh: "日本东京", en: "Tokyo" },
  "Europe/Paris": { zh: "法国巴黎", en: "Paris" },
  "Europe/Berlin": { zh: "德国柏林", en: "Berlin" },
  "Europe/Moscow": { zh: "俄罗斯莫斯科", en: "Moscow" },
  "Asia/Seoul": { zh: "韩国首尔", en: "Seoul" },
} as const;

const cnToTwConverter = OpenCC.Converter({ from: "cn", to: "tw" });
const twToCnConverter = OpenCC.Converter({ from: "tw", to: "cn" });

type LocalizedText = Record<Locale, string>;

type RatioUnit = {
  value: string;
  label: LocalizedText;
  symbol: string;
  factor: number;
};

type RatioUnitGroup = {
  kind: "ratio";
  value: string;
  label: LocalizedText;
  units: RatioUnit[];
};

type TemperatureUnit = {
  value: "c" | "f" | "k";
  label: LocalizedText;
  symbol: string;
};

type TemperatureUnitGroup = {
  kind: "temperature";
  value: "temperature";
  label: LocalizedText;
  units: TemperatureUnit[];
};

type UnitGroup = RatioUnitGroup | TemperatureUnitGroup;

const unitGroups: UnitGroup[] = [
  {
    kind: "ratio",
    value: "length",
    label: { zh: "长度", en: "Length" },
    units: [
      { value: "km", label: { zh: "千米", en: "Kilometer" }, symbol: "km", factor: 1000 },
      { value: "m", label: { zh: "米", en: "Meter" }, symbol: "m", factor: 1 },
      { value: "cm", label: { zh: "厘米", en: "Centimeter" }, symbol: "cm", factor: 0.01 },
      { value: "mm", label: { zh: "毫米", en: "Millimeter" }, symbol: "mm", factor: 0.001 },
      { value: "in", label: { zh: "英寸", en: "Inch" }, symbol: "in", factor: 0.0254 },
      { value: "ft", label: { zh: "英尺", en: "Foot" }, symbol: "ft", factor: 0.3048 },
      { value: "yd", label: { zh: "码", en: "Yard" }, symbol: "yd", factor: 0.9144 },
      { value: "mi", label: { zh: "英里", en: "Mile" }, symbol: "mi", factor: 1609.344 },
    ],
  },
  {
    kind: "ratio",
    value: "area",
    label: { zh: "面积", en: "Area" },
    units: [
      { value: "km2", label: { zh: "平方千米", en: "Square kilometer" }, symbol: "km²", factor: 1_000_000 },
      { value: "m2", label: { zh: "平方米", en: "Square meter" }, symbol: "m²", factor: 1 },
      { value: "cm2", label: { zh: "平方厘米", en: "Square centimeter" }, symbol: "cm²", factor: 0.0001 },
      { value: "mm2", label: { zh: "平方毫米", en: "Square millimeter" }, symbol: "mm²", factor: 0.000001 },
      { value: "ft2", label: { zh: "平方英尺", en: "Square foot" }, symbol: "ft²", factor: 0.09290304 },
      { value: "yd2", label: { zh: "平方码", en: "Square yard" }, symbol: "yd²", factor: 0.83612736 },
      { value: "acre", label: { zh: "英亩", en: "Acre" }, symbol: "acre", factor: 4046.8564224 },
    ],
  },
  {
    kind: "ratio",
    value: "weight",
    label: { zh: "重量", en: "Weight" },
    units: [
      { value: "t", label: { zh: "吨", en: "Metric ton" }, symbol: "t", factor: 1_000_000 },
      { value: "kg", label: { zh: "千克", en: "Kilogram" }, symbol: "kg", factor: 1000 },
      { value: "g", label: { zh: "克", en: "Gram" }, symbol: "g", factor: 1 },
      { value: "mg", label: { zh: "毫克", en: "Milligram" }, symbol: "mg", factor: 0.001 },
      { value: "lb", label: { zh: "磅", en: "Pound" }, symbol: "lb", factor: 453.59237 },
      { value: "oz", label: { zh: "盎司", en: "Ounce" }, symbol: "oz", factor: 28.349523125 },
    ],
  },
  {
    kind: "ratio",
    value: "volume",
    label: { zh: "体积", en: "Volume" },
    units: [
      { value: "m3", label: { zh: "立方米", en: "Cubic meter" }, symbol: "m³", factor: 1000 },
      { value: "l", label: { zh: "升", en: "Liter" }, symbol: "L", factor: 1 },
      { value: "ml", label: { zh: "毫升", en: "Milliliter" }, symbol: "mL", factor: 0.001 },
      { value: "gal", label: { zh: "美制加仑", en: "Gallon" }, symbol: "gal", factor: 3.785411784 },
      { value: "qt", label: { zh: "夸脱", en: "Quart" }, symbol: "qt", factor: 0.946352946 },
      { value: "pt", label: { zh: "品脱", en: "Pint" }, symbol: "pt", factor: 0.473176473 },
    ],
  },
  {
    kind: "ratio",
    value: "pressure",
    label: { zh: "压力", en: "Pressure" },
    units: [
      { value: "mpa", label: { zh: "兆帕", en: "Megapascal" }, symbol: "MPa", factor: 1_000_000 },
      { value: "kpa", label: { zh: "千帕", en: "Kilopascal" }, symbol: "kPa", factor: 1000 },
      { value: "pa", label: { zh: "帕", en: "Pascal" }, symbol: "Pa", factor: 1 },
      { value: "bar", label: { zh: "巴", en: "Bar" }, symbol: "bar", factor: 100_000 },
      { value: "psi", label: { zh: "磅每平方英寸", en: "PSI" }, symbol: "psi", factor: 6894.757293168 },
      { value: "atm", label: { zh: "标准大气压", en: "Atmosphere" }, symbol: "atm", factor: 101_325 },
    ],
  },
  {
    kind: "ratio",
    value: "density",
    label: { zh: "密度", en: "Density" },
    units: [
      { value: "kgm3", label: { zh: "千克/立方米", en: "Kilogram / cubic meter" }, symbol: "kg/m³", factor: 1 },
      { value: "gcm3", label: { zh: "克/立方厘米", en: "Gram / cubic centimeter" }, symbol: "g/cm³", factor: 1000 },
      { value: "gl", label: { zh: "克/升", en: "Gram / liter" }, symbol: "g/L", factor: 1 },
      { value: "lbft3", label: { zh: "磅/立方英尺", en: "Pound / cubic foot" }, symbol: "lb/ft³", factor: 16.01846337396 },
    ],
  },
  {
    kind: "ratio",
    value: "data-size",
    label: { zh: "字节", en: "Data size" },
    units: [
      { value: "b", label: { zh: "字节", en: "Byte" }, symbol: "B", factor: 1 },
      { value: "kb", label: { zh: "KB", en: "Kilobyte" }, symbol: "KB", factor: 1024 },
      { value: "mb", label: { zh: "MB", en: "Megabyte" }, symbol: "MB", factor: 1024 ** 2 },
      { value: "gb", label: { zh: "GB", en: "Gigabyte" }, symbol: "GB", factor: 1024 ** 3 },
      { value: "tb", label: { zh: "TB", en: "Terabyte" }, symbol: "TB", factor: 1024 ** 4 },
      { value: "pb", label: { zh: "PB", en: "Petabyte" }, symbol: "PB", factor: 1024 ** 5 },
    ],
  },
  {
    kind: "ratio",
    value: "time-span",
    label: { zh: "时间", en: "Time span" },
    units: [
      { value: "day", label: { zh: "天", en: "Day" }, symbol: "day", factor: 86_400 },
      { value: "hour", label: { zh: "小时", en: "Hour" }, symbol: "h", factor: 3600 },
      { value: "minute", label: { zh: "分钟", en: "Minute" }, symbol: "min", factor: 60 },
      { value: "second", label: { zh: "秒", en: "Second" }, symbol: "s", factor: 1 },
      { value: "millisecond", label: { zh: "毫秒", en: "Millisecond" }, symbol: "ms", factor: 0.001 },
    ],
  },
  {
    kind: "temperature",
    value: "temperature",
    label: { zh: "温度", en: "Temperature" },
    units: [
      { value: "c", label: { zh: "摄氏度", en: "Celsius" }, symbol: "°C" },
      { value: "f", label: { zh: "华氏度", en: "Fahrenheit" }, symbol: "°F" },
      { value: "k", label: { zh: "开尔文", en: "Kelvin" }, symbol: "K" },
    ],
  },
];

const barcodeSamples = {
  CODE128: "UTILSFUN-2026",
  CODE39: "UTILS-FUN",
  EAN13: "6901234567892",
  EAN8: "12345670",
  UPC: "123456789999",
  ITF14: "12345678901231",
  CODE93: "UTILSFUN2026",
} as const;

export function ToolWorkbench({ tool, locale, dict }: ToolWorkbenchProps) {
  switch (tool.slug) {
    case "rand-password":
      return <RandomPasswordTool dict={dict} />;
    case "qrcode":
      return <QrCodeTool dict={dict} />;
    case "screen-record":
      return <ScreenRecordTool dict={dict} />;
    case "random-number":
      return <RandomNumberTool dict={dict} />;
    case "guid":
      return <GuidTool dict={dict} />;
    case "random-group":
      return <RandomGroupTool dict={dict} />;
    case "watermark":
      return <WatermarkTool dict={dict} locale={locale} />;
    case "image-compress":
      return <ImageCompressTool dict={dict} />;
    case "qrcode-decode":
      return <QrCodeDecodeTool dict={dict} />;
    case "barcode":
      return <BarcodeTool dict={dict} />;
    case "md5":
      return <Md5Tool dict={dict} />;
    case "file-md5":
      return <FileMd5Tool dict={dict} />;
    case "hmac":
      return <HmacTool dict={dict} />;
    case "sha":
      return <ShaTool dict={dict} />;
    case "aes":
      return <AesTool dict={dict} />;
    case "rabbit":
      return <StreamCipherTool dict={dict} type="rabbit" />;
    case "des":
      return <DesTool dict={dict} />;
    case "rc4":
      return <StreamCipherTool dict={dict} type="rc4" />;
    case "base64":
      return <Base64Tool dict={dict} />;
    case "unicode":
      return <UnicodeTool dict={dict} />;
    case "url":
      return <UrlTool dict={dict} />;
    case "timestamp":
      return <TimestampTool dict={dict} />;
    case "calculation":
      return <DateCalculationTool dict={dict} locale={locale} />;
    case "world":
      return <WorldTimeTool dict={dict} locale={locale} />;
    case "working-day":
      return <WorkingDayTool dict={dict} />;
    case "batch-timestamp":
      return <BatchTimestampTool dict={dict} />;
    case "unit-converter":
      return <UnitConverterTool dict={dict} locale={locale} />;
    case "english-amount":
      return <EnglishAmountTool dict={dict} />;
    case "sum-list":
      return <SumListTool dict={dict} />;
    case "loan":
      return <LoanTool dict={dict} />;
    case "rmb":
      return <RmbTool dict={dict} />;
    case "text-dedupe":
      return <TextDedupeTool dict={dict} />;
    case "emoji-clean":
      return <EmojiCleanerTool dict={dict} />;
    case "id-card-cn":
      return <CnIdTool dict={dict} />;
    case "simplified-traditional":
      return <SimplifiedTraditionalTool dict={dict} />;
    case "pinyin":
      return <PinyinTool dict={dict} />;
    case "pluralize":
      return <PluralizeTool dict={dict} />;
    case "english-case":
      return <EnglishCaseTool dict={dict} />;
    case "cn-en":
      return <CnEnTool dict={dict} />;
    case "trim":
      return <TrimTool dict={dict} />;
    case "regex":
      return <RegexTool dict={dict} />;
    case "md-html":
      return <MarkdownHtmlTool dict={dict} />;
    case "json":
      return <CodeFormatterTool dict={dict} type="json" />;
    case "json-to-types":
      return <JsonToTypesTool dict={dict} />;
    case "css":
      return <CodeFormatterTool dict={dict} type="css" />;
    case "js":
      return <CodeFormatterTool dict={dict} type="js" />;
    case "html":
      return <CodeFormatterTool dict={dict} type="html" />;
    case "sql":
      return <SqlTool dict={dict} />;
    case "crontab":
      return <CronTool dict={dict} />;
    case "naming-converter":
      return <NamingConverterTool dict={dict} />;
    case "color-converter":
      return <ColorConverterTool dict={dict} />;
    case "websocket":
      return <WebSocketTool dict={dict} />;
    case "go-struct-json":
      return <GoStructJsonTool dict={dict} />;
    case "less2css":
      return <LessToCssTool dict={dict} />;
    case "binary":
      return <BinaryTool dict={dict} />;
    default:
      return null;
  }
}

function isZh(dict: Dictionary) {
  return dict.locale === "zh";
}

function t(dict: Dictionary, zh: string, en: string) {
  return isZh(dict) ? zh : en;
}

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof UIBadge> & {
  variant?: "default" | "outline";
}) {
  return <UIBadge className={className} variant={variant === "outline" ? "outline" : "secondary"} {...props} />;
}

function Button({
  className,
  variant = "default",
  size = "default",
  disabled,
  href,
  download,
  target,
  rel,
  as,
  color: _color,
  type = "button",
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
  as?: React.ElementType;
  disabled?: boolean;
  color?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
  [key: string]: unknown;
}) {
  if (as === "a" || href) {
    return (
      <a
        className={cn(buttonVariants({ variant, size }), disabled && "pointer-events-none opacity-50", className)}
        href={href}
        download={download}
        target={target}
        rel={rel}
        aria-disabled={disabled}
        {...(props as React.ComponentProps<"a">)}
      >
        {children}
      </a>
    );
  }

  return (
    <UIButton
      type={type}
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
      {...(props as React.ComponentProps<"button">)}
    >
      {children}
    </UIButton>
  );
}

function Checkbox({
  className,
  checked,
  onCheckedChange,
  ...props
}: Omit<React.ComponentProps<typeof UICheckbox>, "onCheckedChange"> & {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}) {
  return (
    <UICheckbox
      checked={checked}
      onCheckedChange={(value) => onCheckedChange?.(Boolean(value))}
      className={className}
      {...props}
    />
  );
}

function Input({
  className,
  disabled,
  readOnly,
  label,
  description,
  errorMessage,
  isRequired,
  labelPlacement: _labelPlacement,
  ...props
}: React.ComponentProps<typeof UIInput> & {
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  isRequired?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  labelPlacement?: "inside" | "outside-top";
}) {
  const input = (
    <UIInput
      className={cn(
        "w-full",
        props.type === "color" && "h-12 p-1",
        readOnly && "bg-muted/40",
        className,
      )}
      disabled={disabled}
      readOnly={readOnly}
      required={isRequired}
      aria-invalid={Boolean(errorMessage)}
      {...props}
    />
  );

  if (!label) {
    return input;
  }

  return (
    <FieldShell
      label={label}
      description={description}
      errorMessage={errorMessage}
    >
      {input}
      {isRequired ? <span className="sr-only">required</span> : null}
    </FieldShell>
  );
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm font-medium text-foreground/90", className)}
      {...props}
    />
  );
}

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof UIScrollArea>) {
  return (
    <UIScrollArea
      className={className}
      {...props}
    >
      {children}
    </UIScrollArea>
  );
}

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof UISeparator> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <UISeparator
      orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "w-full" : "h-full",
        className,
      )}
      {...props}
    />
  );
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<typeof UISlider>, "min" | "max"> & {
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
  onValueChange?: (value: number[]) => void;
}) {
  return (
    <UISlider
      step={props.step}
      min={min}
      max={max}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
      {...props}
    />
  );
}

function Switch({
  className,
  checked,
  onCheckedChange,
  size: _size = "default",
  ...props
}: Omit<React.ComponentProps<typeof UISwitch>, "onCheckedChange"> & {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  size?: "sm" | "default";
}) {
  return (
    <UISwitch
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={className}
      {...props}
    />
  );
}

function Textarea({
  className,
  disabled,
  readOnly,
  label,
  description,
  errorMessage,
  isRequired,
  labelPlacement: _labelPlacement,
  ...props
}: React.ComponentProps<typeof UITextarea> & {
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  isRequired?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  labelPlacement?: "inside" | "outside-top";
}) {
  const textarea = (
    <UITextarea
      className={cn("min-h-32 w-full", readOnly && "bg-muted/40", className)}
      disabled={disabled}
      readOnly={readOnly}
      required={isRequired}
      aria-invalid={Boolean(errorMessage)}
      {...props}
    />
  );

  if (!label) {
    return textarea;
  }

  return (
    <FieldShell
      label={label}
      description={description}
      errorMessage={errorMessage}
    >
      {textarea}
      {isRequired ? <span className="sr-only">required</span> : null}
    </FieldShell>
  );
}

function Alert({
  color = "default",
  title,
  description,
}: {
  color?: "default" | "success" | "warning" | "danger";
  title: string;
  description?: string;
}) {
  return (
    <UIAlert
      tone={color}
      title={title}
      description={description}
    />
  );
}

function ToolCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid w-full items-start gap-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div className="grid w-full items-start gap-6">
        {children}
      </div>
    </section>
  );
}

function WorkbenchPanel({
  title,
  description,
  className,
  contentClassName,
  children,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("grid gap-5 rounded-2xl border border-border/70 p-5 sm:p-6", className)}>
      {title || description ? (
        <div className="grid gap-1.5">
          {title ? <h3 className="text-lg font-semibold tracking-tight">{title}</h3> : null}
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
      ) : null}
      <div className={cn("grid gap-6", contentClassName)}>{children}</div>
    </section>
  );
}

function FormStack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("grid w-full gap-6", className)}>{children}</div>;
}

function FormGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("grid w-full gap-6 md:grid-cols-2", className)}>{children}</div>;
}

function ImageComparePreview({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  className,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.innerHTML = "";

    const beforeImage = document.createElement("img");
    beforeImage.src = beforeSrc;
    beforeImage.alt = beforeAlt;
    beforeImage.decoding = "async";

    const afterImage = document.createElement("img");
    afterImage.src = afterSrc;
    afterImage.alt = afterAlt;
    afterImage.decoding = "async";

    container.append(beforeImage, afterImage);

    const viewer = new ImageCompare(container, {
      addCircle: true,
      addCircleBlur: false,
      controlShadow: false,
      showLabels: true,
      labelOptions: {
        before: beforeLabel,
        after: afterLabel,
      },
    });

    viewer.mount();

    return () => {
      container.innerHTML = "";
    };
  }, [afterAlt, afterLabel, afterSrc, beforeAlt, beforeLabel, beforeSrc]);

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border/70 bg-muted/20", className)}>
      <div ref={containerRef} className="w-full" />
    </div>
  );
}

function FieldShell({
  label,
  description,
  errorMessage,
  headerEnd,
  className,
  children,
}: {
  label: string;
  description?: string;
  errorMessage?: string;
  headerEnd?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid w-full gap-3", className)}>
      <div className="flex items-start justify-between gap-3 px-1">
        <div className="grid gap-1.5">
          <Label>{label}</Label>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {headerEnd}
      </div>
      {children}
      {errorMessage ? <p className="px-1 text-sm text-destructive">{errorMessage}</p> : null}
    </div>
  );
}

function Field({
  label,
  description,
  errorMessage,
  isRequired = false,
  children,
}: {
  label: string;
  description?: string;
  errorMessage?: string;
  isRequired?: boolean;
  children: React.ReactNode;
}) {
  const supportsHeroField =
    isValidElement(children) &&
    [Input, Textarea, NativeSelect].includes(children.type as typeof Input);

  if (supportsHeroField) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, {
      label,
      description,
      errorMessage,
      isRequired,
      labelPlacement: "outside-top",
      className: cn("w-full", (children.props as { className?: string }).className),
    });
  }

  return (
    <FieldShell
      label={label}
      description={description}
      errorMessage={errorMessage}
    >
      {children}
    </FieldShell>
  );
}

function NativeSelect({
  value,
  onChange,
  options,
  placeholder,
  label,
  description,
  errorMessage,
  isRequired,
  isInvalid,
  validationBehavior,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  validationBehavior?: "aria" | "native";
  className?: string;
}) {
  const select = (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger className={cn("w-full", className)} aria-invalid={isInvalid || Boolean(errorMessage)}>
        <SelectValue placeholder={placeholder ?? label ?? "Select"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  if (!label) {
    return select;
  }

  return (
    <FieldShell
      label={label}
      description={description}
      errorMessage={errorMessage}
    >
      {select}
      {isRequired ? <span className="sr-only">{validationBehavior}</span> : null}
    </FieldShell>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  description,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  description?: string;
  onChange: (value: number) => void;
}) {
  return (
    <FieldShell
      label={label}
      description={description}
      headerEnd={
        <Badge>
          {value}
          {suffix}
        </Badge>
      }
    >
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([next]) => onChange(next ?? value)}
      />
    </FieldShell>
  );
}

function ResultActions({
  value,
  copyText,
  copiedText,
  downloadText,
  fileName,
}: {
  value: string;
  copyText: string;
  copiedText: string;
  downloadText: string;
  fileName?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (!value) {
      return;
    }
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  function onDownload() {
    if (!value) {
      return;
    }
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName ?? "result.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" onClick={onCopy} disabled={!value}>
        {copied ? copiedText : copyText}
      </Button>
      {fileName ? (
        <Button type="button" onClick={onDownload} disabled={!value}>
          <Download className="size-4" />
          {downloadText}
        </Button>
      ) : null}
    </div>
  );
}

function OutputArea({
  label,
  value,
  fileName,
  dict,
}: {
  label: string;
  value: string;
  fileName?: string;
  dict: Dictionary;
}) {
  return (
    <FormStack className="gap-3">
      <Textarea label={label} value={value} readOnly className="min-h-40" />
      <ResultActions
        value={value}
        copyText={dict.copy}
        copiedText={dict.copied}
        downloadText={dict.download}
        fileName={fileName}
      />
    </FormStack>
  );
}

function RandomPasswordTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const raw = window.localStorage.getItem("utilsfun:password-history");
      if (!raw) {
        return;
      }

      try {
        setHistory(JSON.parse(raw) as string[]);
      } catch {
        setHistory([]);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function generate() {
    const groups = [
      lower ? "abcdefghijklmnopqrstuvwxyz" : "",
      upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
      digits ? "0123456789" : "",
      symbols ? "!@#$%^&*()_+-=[]{}<>?" : "",
    ].filter(Boolean);

    if (!groups.length) {
      return;
    }

    const charset = groups.join("");
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);
    const next = Array.from(values, (value) => charset[value % charset.length]).join("");
    setPassword(next);
    const nextHistory = [next, ...history.filter((item) => item !== next)].slice(0, 10);
    setHistory(nextHistory);
    window.localStorage.setItem("utilsfun:password-history", JSON.stringify(nextHistory));
  }

  return (
    <ToolCard title={dict.generate}>
      <FormStack>
        <FormStack>
          <SliderField
            label={t(dict, "长度", "Length")}
            value={length}
            min={6}
            max={64}
            description={t(dict, "拖动滑杆调整密码长度。", "Use the slider to balance memorability and strength.")}
            onChange={setLength}
          />
          <FormGrid className="gap-3">
            {[
              ["lower", lower, setLower],
              ["upper", upper, setUpper],
              ["digits", digits, setDigits],
              ["symbols", symbols, setSymbols],
            ].map(([name, checked, setter]) => (
              <label
                key={String(name)}
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3"
              >
                <Checkbox
                  checked={Boolean(checked)}
                  onCheckedChange={(value) =>
                    (setter as React.Dispatch<React.SetStateAction<boolean>>)(Boolean(value))
                  }
                />
                <div className="space-y-1">
                  <div className="text-sm font-medium capitalize">
                    {name === "lower"
                      ? t(dict, "小写字母", "Lowercase")
                      : name === "upper"
                        ? t(dict, "大写字母", "Uppercase")
                        : name === "digits"
                          ? t(dict, "数字", "Digits")
                          : t(dict, "符号", "Symbols")}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {name === "symbols"
                      ? t(dict, "加入符号可提升复杂度。", "Useful for higher entropy.")
                      : t(dict, "在密码中包含这一类字符。", "Include this character set.")}
                  </p>
                </div>
              </label>
            ))}
          </FormGrid>
          {!lower && !upper && !digits && !symbols ? (
            <Alert
              color="danger"
              title={t(dict, "至少选择一类字符", "Select at least one set")}
              description={t(
                dict,
                "请选择小写、大写、数字或符号中的至少一项。",
                "Choose lowercase, uppercase, digits, or symbols.",
              )}
            />
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={generate} color="primary">
              {dict.generate}
            </Button>
            {password ? (
              <Button type="button" onClick={generate} color="primary">
                {t(dict, "重新生成", "Regenerate")}
              </Button>
            ) : null}
          </div>
          <OutputArea label={dict.output} value={password} dict={dict} />
        </FormStack>
        <WorkbenchPanel
          title={(
            <span className="flex items-center gap-2">
              <History className="size-4" />
              {dict.history}
            </span>
          )}
          description={t(dict, "可快速回填最近生成的密码。", "Reuse one of the most recent generated passwords.")}
        >
          <ScrollArea className="h-64 rounded-md border border-border">
            <div className="space-y-2 p-3">
              {history.length ? (
                history.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    className="h-auto w-full justify-start px-3 py-2 font-mono text-xs"
                    onClick={() => setPassword(item)}
                  >
                    {item}
                  </Button>
                ))
              ) : (
                <div className="flex min-h-40 items-center justify-center px-4 text-center text-sm text-muted-foreground">
                  {dict.noHistory}
                </div>
              )}
            </div>
          </ScrollArea>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function QrCodeTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const siteConfig = useSiteConfig();
  const [text, setText] = useState(() => siteConfig.url);
  const [width, setWidth] = useState(240);
  const [dark, setDark] = useState("#000000");
  const [light, setLight] = useState("#ffffff");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const url = await QRCode.toDataURL(text, {
        width,
        margin: 2,
        color: { dark, light },
      });
      setResult(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolCard title={dict.generate}>
      <FormStack>
        <FormStack>
          <Field label={dict.input}>
            <Textarea value={text} onChange={(event) => setText(event.target.value)} />
          </Field>
          <FormGrid>
            <Field label={t(dict, "尺寸", "Size")}>
              <Input
                type="number"
                min={120}
                max={1024}
                value={width}
                onChange={(event) => setWidth(Number(event.target.value))}
              />
            </Field>
            <Field label={t(dict, "前景色", "Dark")}>
              <Input type="color" value={dark} onChange={(event) => setDark(event.target.value)} />
            </Field>
            <Field label={t(dict, "背景色", "Light")}>
              <Input
                type="color"
                value={light}
                onChange={(event) => setLight(event.target.value)}
              />
            </Field>
          </FormGrid>
          <Button type="button" onClick={generate} disabled={loading || !text} color="primary">
            {loading ? <LoaderCircle className="size-4 animate-spin" /> : null}
            {dict.generate}
          </Button>
        </FormStack>
        <WorkbenchPanel className="border-dashed" contentClassName="gap-0">
          <div className="flex min-h-80 items-center justify-center">
            {result ? (
              <a href={result} download="qrcode.png" className="space-y-3 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result} alt="QR code" className="mx-auto rounded-md" />
                <span className="text-sm text-muted-foreground">{dict.download}</span>
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">{t(dict, "二维码预览", "QR preview")}</p>
            )}
          </div>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function ScreenRecordTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [videoUrl]);

  async function start() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(() => undefined);
    }
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const nextUrl = URL.createObjectURL(blob);
      setVideoUrl((current) => {
        if (current) {
          URL.revokeObjectURL(current);
        }
        return nextUrl;
      });
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.src = nextUrl;
        videoRef.current.controls = true;
      }
      stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
  }

  function stop() {
    recorderRef.current?.stop();
  }

  return (
    <ToolCard title={dict.generate}>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={start} disabled={recording} color="primary">
          <Play className="size-4" />
          {dict.start}
        </Button>
        <Button type="button" onClick={stop} disabled={!recording}>
          <Square className="size-4" />
          {dict.stop}
        </Button>
        {videoUrl ? (
          <Button as="a" href={videoUrl} download="screen-record.webm">
            <Download className="size-4" />
            {dict.download}
          </Button>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-muted">
        <video ref={videoRef} className="aspect-video w-full" muted playsInline />
      </div>
    </ToolCard>
  );
}

function WatermarkTool({
  dict,
  locale,
}: {
  dict: ReturnType<typeof getDictionary>;
  locale: Locale;
}) {
  const siteConfig = useSiteConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState(() =>
    locale === "zh" ? `${siteConfig.title} 水印` : `${siteConfig.title} Watermark`,
  );
  const [color, setColor] = useState("#ffffff");
  const [size, setSize] = useState(24);
  const [alpha, setAlpha] = useState(24);
  const [rotate, setRotate] = useState(-30);
  const [imageUrl, setImageUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    return () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [resultUrl]);

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;
    setFile(nextFile);
    setResultUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return "";
    });
    setImageUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return nextFile ? URL.createObjectURL(nextFile) : "";
    });
  }

  async function renderWatermark() {
    if (!file || !canvasRef.current) {
      return;
    }

    const bitmap = await createImageBitmap(file);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha / 100;
    ctx.font = `${size}px sans-serif`;
    ctx.rotate((rotate * Math.PI) / 180);
    const xGap = size * Math.max(text.length, 4);
    const yGap = size * 3;
    for (let x = -canvas.width; x < canvas.width * 1.5; x += xGap) {
      for (let y = -canvas.height; y < canvas.height * 1.5; y += yGap) {
        ctx.fillText(text, x, y);
      }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((nextBlob) => resolve(nextBlob), "image/png");
    });

    if (!blob) {
      return;
    }

    setResultUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return URL.createObjectURL(blob);
    });
  }

  function download() {
    if (!canvasRef.current || !resultUrl) {
      return;
    }
    canvasRef.current.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `watermark-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <ToolCard title={dict.generate}>
      <FormStack className="gap-4">
        <FormStack className="gap-4">
          <Field label={t(dict, "图片", "Image")}>
            <Input type="file" accept="image/*" onChange={onFileChange} />
          </Field>
          <Field label={t(dict, "文字", "Text")}>
            <Input value={text} onChange={(event) => setText(event.target.value)} />
          </Field>
          <FormGrid className="gap-4">
            <Field label={t(dict, "颜色", "Color")}>
              <Input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
            </Field>
            <SliderField label={t(dict, "透明度", "Opacity")} value={alpha} min={5} max={100} suffix="%" onChange={setAlpha} />
            <SliderField label={t(dict, "字号", "Size")} value={size} min={12} max={64} suffix="px" onChange={setSize} />
            <SliderField
              label={t(dict, "旋转角度", "Rotate")}
              value={rotate}
              min={-90}
              max={90}
              suffix="°"
              onChange={setRotate}
            />
          </FormGrid>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={renderWatermark} disabled={!file} color="primary">
              {dict.generate}
            </Button>
            <Button type="button" onClick={download} disabled={!resultUrl}>
              {dict.download}
            </Button>
          </div>
        </FormStack>
        <FormStack className="gap-3">
          {imageUrl && resultUrl ? (
            <ImageComparePreview
              beforeSrc={imageUrl}
              afterSrc={resultUrl}
              beforeAlt={t(dict, "原图", "Original")}
              afterAlt={t(dict, "加水印后", "Watermarked")}
              beforeLabel={t(dict, "原图", "Before")}
              afterLabel={t(dict, "加水印后", "After")}
            />
          ) : imageUrl ? (
            <div className="overflow-hidden rounded-xl border border-border/70 bg-muted/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={t(dict, "原图", "Original")} className="w-full" />
            </div>
          ) : (
            <Alert
              color="warning"
              title={t(dict, "请先上传图片", "Upload an image first")}
              description={t(
                dict,
                "原图预览和加水印后的结果会显示在这里。",
                "The preview and watermarked result will appear here.",
              )}
            />
          )}
          {imageUrl && !resultUrl ? (
            <p className="text-sm text-muted-foreground">
              {t(dict, "点击“生成”后可拖动查看加水印前后对比。", "Run Generate to compare before and after with the slider.")}
            </p>
          ) : null}
          <canvas ref={canvasRef} className="hidden" />
        </FormStack>
      </FormStack>
    </ToolCard>
  );
}

function ImageCompressTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState(1600);
  const [beforeUrl, setBeforeUrl] = useState("");
  const [afterUrl, setAfterUrl] = useState("");
  const [stats, setStats] = useState<{ before: number; after: number } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    setBeforeUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    return () => {
      if (afterUrl) {
        URL.revokeObjectURL(afterUrl);
      }
    };
  }, [afterUrl]);

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;
    setFile(nextFile);
    if (!nextFile) {
      setBeforeUrl("");
    }
    setStats(null);
    setAfterUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return "";
    });
  }

  async function compress() {
    if (!file) {
      return;
    }
    setBusy(true);
    try {
      const compressed = await imageCompression(file, {
        initialQuality: quality,
        maxWidthOrHeight: maxWidth,
        useWebWorker: true,
      });
      const url = URL.createObjectURL(compressed);
      setAfterUrl((current) => {
        if (current) {
          URL.revokeObjectURL(current);
        }
        return url;
      });
      setStats({ before: file.size, after: compressed.size });
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolCard title={dict.compress}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "压缩设置", "Compression settings")}
          description={t(dict, "调整画质和宽度后，在本地生成压缩结果。", "Adjust quality and width, then generate a smaller image locally.")}
        >
          <Field label={t(dict, "图片", "Image")}>
            <Input
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </Field>
          <SliderField
            label={t(dict, "质量", "Quality")}
            value={Math.round(quality * 100)}
            min={10}
            max={100}
            suffix="%"
            onChange={(value) => setQuality(value / 100)}
          />
          <SliderField
            label={t(dict, "最大宽度", "Max width")}
            value={maxWidth}
            min={320}
            max={4000}
            step={20}
            suffix="px"
            onChange={setMaxWidth}
          />
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={compress} disabled={!file || busy} color="primary">
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {dict.compress}
            </Button>
            {afterUrl ? (
              <Button as="a" href={afterUrl} download="compressed-image">
                {dict.download}
              </Button>
            ) : null}
          </div>
          {stats ? (
            <Alert
              color="success"
              title={t(dict, "压缩结果", "Compression summary")}
              description={
                isZh(dict)
                  ? `压缩前 ${(stats.before / 1024).toFixed(1)} KB，压缩后 ${(stats.after / 1024).toFixed(1)} KB。`
                  : `Before ${(stats.before / 1024).toFixed(1)} KB, after ${(stats.after / 1024).toFixed(1)} KB.`
              }
            />
          ) : null}
        </WorkbenchPanel>
        <WorkbenchPanel
          title={t(dict, "前后对比", "Before & after")}
          description={t(dict, "压缩完成后可拖动滑块查看变化。", "After compression, drag the slider to inspect the difference.")}
          className="overflow-hidden"
          contentClassName="gap-4"
        >
          {beforeUrl && afterUrl ? (
            <ImageComparePreview
              beforeSrc={beforeUrl}
              afterSrc={afterUrl}
              beforeAlt={t(dict, "压缩前", "Before compression")}
              afterAlt={t(dict, "压缩后", "After compression")}
              beforeLabel={t(dict, "压缩前", "Before")}
              afterLabel={t(dict, "压缩后", "After")}
            />
          ) : beforeUrl ? (
            <div className="grid gap-3">
              <div className="overflow-hidden rounded-xl border border-border/70 bg-muted/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={beforeUrl} alt={t(dict, "压缩前", "Before compression")} className="w-full" />
              </div>
              <p className="text-sm text-muted-foreground">
                {t(dict, "点击“压缩”后可拖动查看前后对比。", "Run Compress to compare before and after with the slider.")}
              </p>
            </div>
          ) : (
            <div className="flex min-h-64 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
              {t(dict, "上传图片后可预览原图。", "Upload an image to preview the original.")}
            </div>
          )}
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function Md5Tool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [input, setInput] = useState("");
  const lower = useMemo(() => SparkMD5.hash(input), [input]);

  return (
    <ToolCard title="MD5">
      <Field label={dict.input}>
        <Textarea value={input} onChange={(event) => setInput(event.target.value)} />
      </Field>
      <FormGrid className="gap-5">
        <Field label={t(dict, "32 位小写", "32-bit lowercase")}>
          <Input value={lower} readOnly />
        </Field>
        <Field label={t(dict, "32 位大写", "32-bit uppercase")}>
          <Input value={lower.toUpperCase()} readOnly />
        </Field>
      </FormGrid>
    </ToolCard>
  );
}

function FileMd5Tool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  async function calculate() {
    if (!file) {
      return;
    }
    setLoading(true);
    try {
      const chunkSize = 2 * 1024 * 1024;
      const chunks = Math.ceil(file.size / chunkSize);
      const spark = new SparkMD5.ArrayBuffer();
      for (let current = 0; current < chunks; current += 1) {
        const start = current * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        spark.append(await file.slice(start, end).arrayBuffer());
      }
      setHash(spark.end());
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolCard title="MD5">
      <Field label={t(dict, "文件", "File")}>
        <Input
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
      </Field>
      <Button type="button" onClick={calculate} disabled={!file || loading} color="primary">
        {loading ? <LoaderCircle className="size-4 animate-spin" /> : null}
        {dict.calculate}
      </Button>
      <FormGrid className="gap-5">
        <Field label="MD5">
          <Input value={hash} readOnly />
        </Field>
        <Field label={t(dict, "MD5 大写", "MD5 Upper")}>
          <Input value={hash.toUpperCase()} readOnly />
        </Field>
      </FormGrid>
    </ToolCard>
  );
}

function ShaTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("sha256");
  const output = useMemo(() => {
    switch (algorithm) {
      case "sha1":
        return CryptoJS.SHA1(text).toString(CryptoJS.enc.Hex);
      case "sha224":
        return CryptoJS.SHA224(text).toString(CryptoJS.enc.Hex);
      case "sha384":
        return CryptoJS.SHA384(text).toString(CryptoJS.enc.Hex);
      case "sha512":
        return CryptoJS.SHA512(text).toString(CryptoJS.enc.Hex);
      case "sha3":
        return CryptoJS.SHA3(text).toString(CryptoJS.enc.Hex);
      default:
        return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
    }
  }, [algorithm, text]);

  return (
    <ToolCard title="SHA">
      <Field label={t(dict, "算法", "Algorithm")}>
        <NativeSelect
          value={algorithm}
          onChange={setAlgorithm}
          options={["sha1", "sha224", "sha256", "sha384", "sha512", "sha3"].map((item) => ({
            label: item.toUpperCase(),
            value: item,
          }))}
        />
      </Field>
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <OutputArea label={dict.output} value={output} dict={dict} />
    </ToolCard>
  );
}

function HmacTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("sha256");
  const output = useMemo(() => {
    switch (algorithm) {
      case "md5":
        return CryptoJS.HmacMD5(text, key).toString(CryptoJS.enc.Hex);
      case "sha1":
        return CryptoJS.HmacSHA1(text, key).toString(CryptoJS.enc.Hex);
      case "sha224":
        return CryptoJS.HmacSHA224(text, key).toString(CryptoJS.enc.Hex);
      case "sha384":
        return CryptoJS.HmacSHA384(text, key).toString(CryptoJS.enc.Hex);
      case "sha512":
        return CryptoJS.HmacSHA512(text, key).toString(CryptoJS.enc.Hex);
      case "sha3":
        return CryptoJS.HmacSHA3(text, key).toString(CryptoJS.enc.Hex);
      default:
        return CryptoJS.HmacSHA256(text, key).toString(CryptoJS.enc.Hex);
    }
  }, [algorithm, key, text]);

  return (
    <ToolCard title="HMAC">
      <FormGrid className="gap-5">
        <Field label={t(dict, "算法", "Algorithm")}>
          <NativeSelect
            value={algorithm}
            onChange={setAlgorithm}
            options={["md5", "sha1", "sha224", "sha256", "sha384", "sha512", "sha3"].map(
              (item) => ({
                label: item.toUpperCase(),
                value: item,
              }),
            )}
          />
        </Field>
        <Field label={t(dict, "密钥", "Key")}>
          <Input value={key} onChange={(event) => setKey(event.target.value)} />
        </Field>
      </FormGrid>
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <OutputArea label={dict.output} value={output} dict={dict} />
    </ToolCard>
  );
}

function AesTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [mode, setMode] = useState("CBC");
  const [padding, setPadding] = useState("Pkcs7");
  const [formatType, setFormatType] = useState("base64");
  const [action, setAction] = useState<"encrypt" | "decrypt">("encrypt");
  const [output, setOutput] = useState("");

  function execute() {
    try {
      const keyBytes = CryptoJS.enc.Utf8.parse(key);
      const config: {
        mode: unknown;
        padding: unknown;
        iv?: CryptoJS.lib.WordArray;
      } = {
        mode: CryptoJS.mode[mode as keyof typeof CryptoJS.mode],
        padding: CryptoJS.pad[padding as keyof typeof CryptoJS.pad],
      };
      if (iv) {
        config.iv = CryptoJS.enc.Utf8.parse(iv);
      }

      if (action === "encrypt") {
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), keyBytes, config);
        const hex = encrypted.ciphertext.toString().toUpperCase();
        setOutput(
          formatType === "hex"
            ? hex
            : CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(hex)),
        );
      } else {
        const payload =
          formatType === "hex"
            ? CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(text))
            : text;
        const decrypted = CryptoJS.AES.decrypt(payload, keyBytes, config);
        setOutput(decrypted.toString(CryptoJS.enc.Utf8));
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : t(dict, "处理失败", "Failed"));
    }
  }

  return (
    <ToolCard title="AES">
      <FormGrid className="gap-5">
        <Field label={t(dict, "模式", "Mode")}>
          <NativeSelect
            value={mode}
            onChange={setMode}
            options={["CBC", "CFB", "CTR", "OFB", "ECB"].map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </Field>
        <Field label={t(dict, "填充", "Padding")}>
          <NativeSelect
            value={padding}
            onChange={setPadding}
            options={["Pkcs7", "Iso97971", "AnsiX923", "Iso10126", "ZeroPadding"].map(
              (item) => ({
                label: item,
                value: item,
              }),
            )}
          />
        </Field>
        <Field label={t(dict, "输出格式", "Output")}>
          <NativeSelect
            value={formatType}
            onChange={setFormatType}
            options={[
              { label: "Base64", value: "base64" },
              { label: "Hex", value: "hex" },
            ]}
          />
        </Field>
        <Field label={t(dict, "操作", "Action")}>
          <NativeSelect
            value={action}
            onChange={(value) => setAction(value as "encrypt" | "decrypt")}
            options={[
              { label: dict.encrypt, value: "encrypt" },
              { label: dict.decrypt, value: "decrypt" },
            ]}
          />
        </Field>
      </FormGrid>
      <FormGrid className="gap-5">
        <Field label={t(dict, "密钥", "Key")}>
          <Input value={key} onChange={(event) => setKey(event.target.value)} />
        </Field>
        <Field label="IV">
          <Input value={iv} onChange={(event) => setIv(event.target.value)} />
        </Field>
      </FormGrid>
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <Button type="button" onClick={execute} color="primary">
        {action === "encrypt" ? dict.encrypt : dict.decrypt}
      </Button>
      <OutputArea label={dict.output} value={output} dict={dict} />
    </ToolCard>
  );
}

function DesTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [algorithm, setAlgorithm] = useState<"des" | "3des">("des");
  return <SymmetricCipherTool dict={dict} algorithm={algorithm} onAlgorithmChange={setAlgorithm} />;
}

function SymmetricCipherTool({
  dict,
  algorithm,
  onAlgorithmChange,
}: {
  dict: ReturnType<typeof getDictionary>;
  algorithm: "des" | "3des";
  onAlgorithmChange: (value: "des" | "3des") => void;
}) {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [action, setAction] = useState<"encrypt" | "decrypt">("encrypt");
  const [output, setOutput] = useState("");

  function execute() {
    try {
      const cipher = algorithm === "des" ? CryptoJS.DES : CryptoJS.TripleDES;
      const result =
        action === "encrypt"
          ? cipher.encrypt(text, key).toString()
          : cipher.decrypt(text, key).toString(CryptoJS.enc.Utf8);
      setOutput(result);
    } catch (error) {
      setOutput(error instanceof Error ? error.message : t(dict, "处理失败", "Failed"));
    }
  }

  return (
    <ToolCard title="DES / 3DES">
      <FormGrid className="gap-5">
        <Field label={t(dict, "算法", "Algorithm")}>
          <NativeSelect
            value={algorithm}
            onChange={(value) => onAlgorithmChange(value as "des" | "3des")}
            options={[
              { label: "DES", value: "des" },
              { label: "3DES", value: "3des" },
            ]}
          />
        </Field>
        <Field label={t(dict, "操作", "Action")}>
          <NativeSelect
            value={action}
            onChange={(value) => setAction(value as "encrypt" | "decrypt")}
            options={[
              { label: dict.encrypt, value: "encrypt" },
              { label: dict.decrypt, value: "decrypt" },
            ]}
          />
        </Field>
        <Field label={t(dict, "密钥", "Key")}>
          <Input value={key} onChange={(event) => setKey(event.target.value)} />
        </Field>
      </FormGrid>
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <Button type="button" onClick={execute} color="primary">
        {action === "encrypt" ? dict.encrypt : dict.decrypt}
      </Button>
      <OutputArea label={dict.output} value={output} dict={dict} />
    </ToolCard>
  );
}

function StreamCipherTool({
  dict,
  type,
}: {
  dict: ReturnType<typeof getDictionary>;
  type: "rabbit" | "rc4";
}) {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [action, setAction] = useState<"encrypt" | "decrypt">("encrypt");
  const [output, setOutput] = useState("");

  function execute() {
    const cipher = type === "rabbit" ? CryptoJS.Rabbit : CryptoJS.RC4;
    const result =
      action === "encrypt"
        ? cipher.encrypt(text, key).toString()
        : cipher.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    setOutput(result);
  }

  return (
    <ToolCard title={type.toUpperCase()}>
      <FormGrid className="gap-5">
        <Field label={t(dict, "密钥", "Key")}>
          <Input value={key} onChange={(event) => setKey(event.target.value)} />
        </Field>
        <Field label={t(dict, "操作", "Action")}>
          <NativeSelect
            value={action}
            onChange={(value) => setAction(value as "encrypt" | "decrypt")}
            options={[
              { label: dict.encrypt, value: "encrypt" },
              { label: dict.decrypt, value: "decrypt" },
            ]}
          />
        </Field>
      </FormGrid>
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <Button type="button" onClick={execute} color="primary">
        {action === "encrypt" ? dict.encrypt : dict.decrypt}
      </Button>
      <OutputArea label={dict.output} value={output} dict={dict} />
    </ToolCard>
  );
}

function Base64Tool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolCard title="Base64">
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setOutput(encodeUnicodeBase64(text))} color="primary">
          {dict.encode}
        </Button>
        <Button type="button" onClick={() => setOutput(decodeUnicodeBase64(text))} color="primary">
          {dict.decode}
        </Button>
      </div>
      <OutputArea label={dict.output} value={output} dict={dict} />
    </ToolCard>
  );
}

function UnicodeTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  return (
    <ToolCard title="Unicode">
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setOutput(textToUnicode(text))} color="primary">
          {dict.encode}
        </Button>
        <Button type="button" onClick={() => setOutput(unicodeToText(text))} color="primary">
          {dict.decode}
        </Button>
      </div>
      <OutputArea label={dict.output} value={output} dict={dict} />
    </ToolCard>
  );
}

function UrlTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  return (
    <ToolCard title="URL">
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setOutput(encodeURIComponent(text))} color="primary">
          {dict.encode}
        </Button>
        <Button type="button" onClick={() => setOutput(decodeURIComponentSafe(text))} color="primary">
          {dict.decode}
        </Button>
      </div>
      <OutputArea label={dict.output} value={output} dict={dict} />
    </ToolCard>
  );
}

function TimestampTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [now, setNow] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [formatOutput, setFormatOutput] = useState("");
  const [reverseInput, setReverseInput] = useState("");
  const [timestampOutput, setTimestampOutput] = useState("");
  const [unit, setUnit] = useState("ms");

  useEffect(() => {
    const bootstrap = window.setTimeout(() => {
      const current = Date.now();
      setNow(current);
      setReverseInput(dayjs(current).format("YYYY-MM-DD HH:mm:ss"));
    }, 0);

    const timer = window.setInterval(() => setNow(Date.now()), 1000);

    return () => {
      window.clearTimeout(bootstrap);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <ToolCard title={dict.calculate}>
      <FormGrid className="items-start gap-5">
        <WorkbenchPanel
          title={t(dict, "当前时间戳", "Live timestamp")}
          className="border-dashed"
          contentClassName="gap-2 text-sm"
        >
          <p>{now == null ? "-" : Math.floor(now / 1000)}</p>
          <p className="text-muted-foreground">{now ?? "-"}</p>
        </WorkbenchPanel>
        <Field label={t(dict, "单位", "Unit")}>
          <NativeSelect
            value={unit}
            onChange={setUnit}
            options={[
              { label: t(dict, "毫秒", "Milliseconds"), value: "ms" },
              { label: t(dict, "秒", "Seconds"), value: "s" },
            ]}
          />
        </Field>
      </FormGrid>
      <FormGrid className="items-start gap-5">
        <WorkbenchPanel title={t(dict, "时间戳转日期", "Timestamp to date")}>
          <Field label={t(dict, "时间戳", "Timestamp")}>
            <Input value={input} onChange={(event) => setInput(event.target.value)} />
          </Field>
          <Button
            type="button"
            color="primary"
            onClick={() =>
              setFormatOutput(
                dayjs(unit === "s" ? Number(input) * 1000 : Number(input)).format(
                  "YYYY-MM-DD HH:mm:ss",
                ),
              )
            }
          >
            {dict.convert}
          </Button>
          <OutputArea
            label={t(dict, "格式化时间", "Formatted time")}
            value={formatOutput}
            dict={dict}
          />
        </WorkbenchPanel>
        <WorkbenchPanel title={t(dict, "日期转时间戳", "Date to timestamp")}>
          <Field label={t(dict, "日期时间", "Date time")}>
            <Input
              value={reverseInput}
              onChange={(event) => setReverseInput(event.target.value)}
            />
          </Field>
          <Button
            type="button"
            color="primary"
            onClick={() => {
              const value = dayjs(reverseInput).valueOf();
              setTimestampOutput(String(unit === "s" ? Math.floor(value / 1000) : value));
            }}
          >
            {dict.convert}
          </Button>
          <OutputArea label={t(dict, "时间戳", "Timestamp")} value={timestampOutput} dict={dict} />
        </WorkbenchPanel>
      </FormGrid>
    </ToolCard>
  );
}

function DateCalculationTool({
  dict,
  locale,
}: {
  dict: ReturnType<typeof getDictionary>;
  locale: Locale;
}) {
  const [start, setStart] = useState("");
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("day");
  const [condition, setCondition] = useState("add");
  const [result, setResult] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const current = dayjs();
      setStart(current.format("YYYY-MM-DD"));
      setEnd(current.add(7, "day").format("YYYY-MM-DD"));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const interval = useMemo(
    () => (start && end ? Math.abs(dayjs(end).diff(dayjs(start), "day")) : 0),
    [end, start],
  );

  return (
    <ToolCard title={dict.calculate}>
      <FormGrid className="items-start">
        <WorkbenchPanel title={t(dict, "日期加减", "Date arithmetic")}>
          <FormGrid className="gap-5">
            <Field label={t(dict, "开始日期", "Start")}>
              <Input type="date" value={start} onChange={(event) => setStart(event.target.value)} />
            </Field>
            <Field label={t(dict, "数量", "Amount")}>
              <Input
                type="number"
                value={amount}
                min={1}
                onChange={(event) => setAmount(Number(event.target.value))}
              />
            </Field>
            <Field label={t(dict, "操作", "Action")}>
              <NativeSelect
                value={condition}
                onChange={setCondition}
                options={[
                  { label: locale === "zh" ? "增加" : "Add", value: "add" },
                  { label: locale === "zh" ? "减少" : "Subtract", value: "subtract" },
                ]}
              />
            </Field>
            <Field label={t(dict, "单位", "Unit")}>
              <NativeSelect
                value={unit}
                onChange={setUnit}
                options={["day", "week", "month", "year"].map((item) => ({
                  label:
                    item === "day"
                      ? t(dict, "天", "Day")
                      : item === "week"
                        ? t(dict, "周", "Week")
                        : item === "month"
                          ? t(dict, "月", "Month")
                          : t(dict, "年", "Year"),
                  value: item,
                }))}
              />
            </Field>
          </FormGrid>
          <Button
            type="button"
            color="primary"
            onClick={() =>
              setResult(
                (condition === "add"
                  ? dayjs(start).add(amount, unit as dayjs.ManipulateType)
                  : dayjs(start).subtract(amount, unit as dayjs.ManipulateType)
                ).format("YYYY-MM-DD"),
              )
            }
          >
            {dict.calculate}
          </Button>
          <OutputArea label={dict.output} value={result} dict={dict} />
        </WorkbenchPanel>
        <WorkbenchPanel title={t(dict, "日期间隔", "Date interval")}>
          <FormGrid className="gap-5">
            <Field label={t(dict, "开始日期", "Start date")}>
              <Input type="date" value={start} onChange={(event) => setStart(event.target.value)} />
            </Field>
            <Field label={t(dict, "结束日期", "End date")}>
              <Input type="date" value={end} onChange={(event) => setEnd(event.target.value)} />
            </Field>
            <Field label={t(dict, "相差天数", "Interval")}>
              <Input value={t(dict, `${interval} 天`, `${interval} day(s)`)} readOnly />
            </Field>
          </FormGrid>
        </WorkbenchPanel>
      </FormGrid>
    </ToolCard>
  );
}

function WorldTimeTool({
  dict,
  locale,
}: {
  dict: ReturnType<typeof getDictionary>;
  locale: Locale;
}) {
  const [baseTimezone, setBaseTimezone] = useState("Asia/Shanghai");
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setValue(dayjs().format("YYYY-MM-DDTHH:mm"));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const rows = useMemo(() => {
    if (!value) {
      return [];
    }

    const source = dayjs.tz(value, baseTimezone);
    return Object.entries(worldTimezoneMap).map(([timezoneName, labels]) => ({
      timezone: timezoneName,
      label: labels[locale],
      value: source.tz(timezoneName).format("YYYY-MM-DD HH:mm:ss"),
    }));
  }, [baseTimezone, locale, value]);

  return (
    <ToolCard title={dict.baseOn}>
      <FormGrid className="gap-5">
        <Field label={dict.baseOn}>
          <NativeSelect
            value={baseTimezone}
            onChange={setBaseTimezone}
            options={Object.entries(worldTimezoneMap).map(([value, label]) => ({
              value,
              label: `${value} (${label[locale]})`,
            }))}
          />
        </Field>
        <Field label={t(dict, "时间", "Time")}>
          <Input
            type="datetime-local"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Field>
      </FormGrid>
      <div className="overflow-hidden rounded-xl border border-border">
        <Table aria-label={t(dict, "世界时间列表", "World time list")}>
          <TableHeader>
            <TableRow>
              <TableHead>{t(dict, "时区", "Timezone")}</TableHead>
              <TableHead>{t(dict, "时间", "Time")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.timezone}>
                <TableCell>
                  <div>{row.timezone}</div>
                  <div className="text-xs text-muted-foreground">{row.label}</div>
                </TableCell>
                <TableCell className="font-medium">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ToolCard>
  );
}

function RmbTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [price, setPrice] = useState("1000.00");
  const result = useMemo(() => toRmbUppercase(price), [price]);

  return (
    <ToolCard title={dict.convert}>
      <Field label={t(dict, "金额", "Price")}>
        <Input value={price} onChange={(event) => setPrice(event.target.value)} />
      </Field>
      <OutputArea label={dict.output} value={result} dict={dict} />
    </ToolCard>
  );
}

function PluralizeTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [text, setText] = useState("tool");
  const [mode, setMode] = useState("plural");
  const result = useMemo(
    () => (mode === "plural" ? pluralize(text) : pluralize(text, 1)),
    [mode, text],
  );

  return (
    <ToolCard title={dict.convert}>
      <FormGrid className="gap-5">
        <Field label={t(dict, "单词", "Word")}>
          <Input value={text} onChange={(event) => setText(event.target.value)} />
        </Field>
        <Field label={t(dict, "模式", "Mode")}>
          <NativeSelect
            value={mode}
            onChange={setMode}
            options={[
              { label: t(dict, "复数", "Plural"), value: "plural" },
              { label: t(dict, "单数", "Singular"), value: "singular" },
            ]}
          />
        </Field>
      </FormGrid>
      <OutputArea label={dict.output} value={result} dict={dict} />
    </ToolCard>
  );
}

function EnglishCaseTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const siteConfig = useSiteConfig();
  const [text, setText] = useState(
    () => `${siteConfig.title} makes utilities feel calmer`,
  );
  const [mode, setMode] = useState("title");
  const result = useMemo(() => {
    switch (mode) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "sentence":
        return text
          .split("\n")
          .map((line) =>
            line ? line.charAt(0).toUpperCase() + line.slice(1).toLowerCase() : line,
          )
          .join("\n");
      default:
        return text
          .split(" ")
          .map((part) =>
            part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part,
          )
          .join(" ");
    }
  }, [mode, text]);

  return (
    <ToolCard title={dict.convert}>
      <FormStack className="gap-5">
        <Field label={dict.input}>
          <Textarea value={text} onChange={(event) => setText(event.target.value)} />
        </Field>
        <Field label={t(dict, "模式", "Mode")}>
          <NativeSelect
            value={mode}
            onChange={setMode}
            options={[
              { label: t(dict, "全大写", "Upper"), value: "upper" },
              { label: t(dict, "全小写", "Lower"), value: "lower" },
              { label: t(dict, "标题格式", "Title"), value: "title" },
              { label: t(dict, "句首大写", "Sentence"), value: "sentence" },
            ]}
          />
        </Field>
        <OutputArea label={dict.output} value={result} dict={dict} />
      </FormStack>
    </ToolCard>
  );
}

function CnEnTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const siteConfig = useSiteConfig();
  const [text, setText] = useState(
    () => `欢迎使用 ${siteConfig.title}，请输入中英混排文本试试看。`,
  );
  const result = useMemo(() => optimizeMixedSpacing(text), [text]);

  return (
    <ToolCard title={dict.convert}>
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <OutputArea label={dict.output} value={result} dict={dict} />
    </ToolCard>
  );
}

function TrimTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [text, setText] = useState("  hello \n  world  ");
  const [mode, setMode] = useState("line");
  const result = useMemo(() => {
    if (mode === "all") {
      return text.trim();
    }
    return text
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
  }, [mode, text]);

  return (
    <ToolCard title={dict.convert}>
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <Field label={t(dict, "模式", "Mode")}>
        <NativeSelect
          value={mode}
          onChange={setMode}
          options={[
            { label: t(dict, "去除首尾空白", "Trim whole text"), value: "all" },
            { label: t(dict, "逐行去除空白", "Trim each line"), value: "line" },
          ]}
        />
      </Field>
      <OutputArea label={dict.output} value={result} dict={dict} />
    </ToolCard>
  );
}

function RegexTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const siteConfig = useSiteConfig();
  const siteHost = new URL(siteConfig.url).host.replace(/^www\./, "");
  const siteEmail = `hello@${siteHost}`;
  const [pattern, setPattern] = useState("/^[\\w.-]+@[\\w.-]+\\.[A-Za-z]{2,}$/");
  const [text, setText] = useState(() => siteEmail);
  const [message, setMessage] = useState("");

  function validate() {
    try {
      const regex = parseRegex(pattern);
      const matched = regex.test(text);
      setMessage(t(dict, matched ? "匹配成功" : "未匹配", matched ? "Matched" : "Not matched"));
    } catch {
      setMessage(dict.invalidRegex);
    }
  }

  return (
    <ToolCard title={dict.check}>
      <Field label={t(dict, "表达式", "Pattern")}>
        <Input value={pattern} onChange={(event) => setPattern(event.target.value)} />
      </Field>
      <Field label={dict.input}>
        <Textarea value={text} onChange={(event) => setText(event.target.value)} />
      </Field>
      <Button type="button" onClick={validate} color="primary">
        {dict.check}
      </Button>
      <Field label={dict.output}>
        <Input value={message} readOnly />
      </Field>
    </ToolCard>
  );
}

function MarkdownHtmlTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const siteConfig = useSiteConfig();
  const [markdown, setMarkdown] = useState(
    () => `# ${siteConfig.title}\n\n- 在线工具\n- 文本处理\n- 时间换算`,
  );
  const [tab, setTab] = useState("html");
  const html = useMemo(() => marked.parse(markdown, { async: false }), [markdown]);

  return (
    <ToolCard title="Markdown / HTML">
      <FormStack>
        <Field label="Markdown">
          <CodeEditor height={360} language="markdown" value={markdown} onChange={setMarkdown} />
        </Field>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="preview">{dict.preview}</TabsTrigger>
          </TabsList>
          <TabsContent value="html">
            <Field label="HTML">
              <CodeEditor height={360} language="html" readOnly value={html} />
              <ResultActions
                value={html}
                copyText={dict.copy}
                copiedText={dict.copied}
                downloadText={dict.download}
                fileName="rendered.html"
              />
            </Field>
          </TabsContent>
          <TabsContent value="preview">
            <div className="prose max-w-none rounded-xl border border-border p-6 dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
          </TabsContent>
        </Tabs>
      </FormStack>
    </ToolCard>
  );
}

function CodeFormatterTool({
  dict,
  type,
}: {
  dict: ReturnType<typeof getDictionary>;
  type: "json" | "css" | "js" | "html";
}) {
  const siteConfig = useSiteConfig();
  const [input, setInput] = useState(() =>
    getFormatterSample(type, siteConfig.title),
  );
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  async function formatCode() {
    setBusy(true);
    try {
      if (type === "json") {
        setOutput(JSON.stringify(JSON.parse(input), null, 2));
      } else {
        setOutput(await formatWithPrettier(type, input));
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : t(dict, "格式化失败", "Format failed"));
    } finally {
      setBusy(false);
    }
  }

  function compressCode() {
    try {
      if (type === "json") {
        setOutput(JSON.stringify(JSON.parse(input)));
      } else if (type === "html") {
        setOutput(input.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim());
      } else {
        setOutput(input.replace(/\s+/g, " ").trim());
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : t(dict, "压缩失败", "Compress failed"));
    }
  }

  const language =
    type === "json"
      ? "json"
      : type === "css"
        ? "css"
        : type === "js"
          ? "javascript"
          : "html";

  return (
    <ToolCard title={type.toUpperCase()}>
      <FormStack>
        <Field label={dict.input}>
          <CodeEditor height={400} language={language} value={input} onChange={setInput} />
        </Field>
        <Field label={dict.output}>
          <CodeEditor height={400} language={language} readOnly value={output} />
        </Field>
      </FormStack>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={formatCode} disabled={busy} color="primary">
          {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {dict.format}
        </Button>
        <Button type="button" onClick={compressCode} color="primary">
          {dict.compress}
        </Button>
      </div>
    </ToolCard>
  );
}

function SqlTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [input, setInput] = useState("select id, name from users where status = 1 order by created_at desc;");
  const [output, setOutput] = useState("");

  return (
    <ToolCard title="SQL">
      <FormStack>
        <Field label={dict.input}>
          <CodeEditor height={360} language="sql" value={input} onChange={setInput} />
        </Field>
        <Field label={dict.output}>
          <CodeEditor height={360} language="sql" readOnly value={output} />
        </Field>
      </FormStack>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          color="primary"
          onClick={() =>
            setOutput(
              formatSql(input, {
                language: "sql",
                keywordCase: "upper",
              }),
            )
          }
        >
          {dict.format}
        </Button>
        <Button type="button" onClick={() => setOutput(input.replace(/\s+/g, " ").trim())} color="primary">
          {dict.compress}
        </Button>
      </div>
    </ToolCard>
  );
}

function CronTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [expression, setExpression] = useState("*/10 * * * *");
  const [rows, setRows] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  async function calculate() {
    try {
      const parser = await import("cron-parser");
      const parseExpression =
        (parser as { parseExpression?: (value: string) => { next: () => Date } }).parseExpression ??
        (parser as { default?: { parseExpression?: (value: string) => { next: () => Date } } }).default?.parseExpression;
      if (!parseExpression) {
        throw new Error(t(dict, "Cron 解析器不可用", "Cron parser not available"));
      }
      const interval = parseExpression(expression);
      const next = Array.from({ length: 10 }, () =>
        dayjs(interval.next()).format("YYYY-MM-DD HH:mm:ss"),
      );
      setRows(next);
      setMessage("");
    } catch (error) {
      setRows([]);
      setMessage(error instanceof Error ? error.message : t(dict, "Cron 表达式无效", "Invalid cron expression"));
    }
  }

  return (
    <ToolCard title="Crontab">
      <Field label={t(dict, "表达式", "Expression")}>
        <Input value={expression} onChange={(event) => setExpression(event.target.value)} />
      </Field>
      <Button type="button" onClick={calculate} color="primary">
        {dict.calculate}
      </Button>
      {message ? (
        <Alert
          color="danger"
          title={t(dict, "表达式无效", "Invalid expression")}
          description={message}
        />
      ) : null}
      <div className="space-y-2">
        {rows.map((row, index) => (
          <div
            key={`${row}-${index}`}
            className="flex items-center justify-between rounded-md border border-border px-4 py-3 text-sm"
          >
            <span>#{index + 1}</span>
            <span>{row}</span>
          </div>
        ))}
      </div>
    </ToolCard>
  );
}

function WebSocketTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const siteConfig = useSiteConfig();
  const socketRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<number | null>(null);
  const [address, setAddress] = useState("wss://echo.websocket.events");
  const [heartbeatEnabled, setHeartbeatEnabled] = useState(false);
  const [heartbeatInterval, setHeartbeatInterval] = useState("0");
  const [heartbeatMessage, setHeartbeatMessage] = useState("ping");
  const [message, setMessage] = useState(() => `hello ${siteConfig.title}`);
  const [logs, setLogs] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    return () => {
      if (heartbeatRef.current) {
        window.clearInterval(heartbeatRef.current);
      }
      socketRef.current?.close();
    };
  }, []);

  function writeLog(text: string) {
    startTransition(() => {
      setLogs((current) => [
        `${dayjs().format("HH:mm:ss")}  ${text}`,
        ...current,
      ].slice(0, 50));
    });
  }

  function connect() {
    const socket = new WebSocket(address);
    socketRef.current = socket;
    socket.onopen = () => {
      setConnected(true);
      writeLog(t(dict, "已连接", "Connected"));
      const interval = Number(heartbeatInterval);
      if (heartbeatEnabled && interval > 0) {
        heartbeatRef.current = window.setInterval(() => {
          socket.send(heartbeatMessage);
          writeLog(`${t(dict, "已发送", "Sent")}: ${heartbeatMessage}`);
        }, interval * 1000);
      }
    };
    socket.onmessage = (event) => writeLog(`${t(dict, "已接收", "Received")}: ${String(event.data)}`);
    socket.onerror = () => writeLog(t(dict, "连接异常", "Connection error"));
    socket.onclose = () => {
      setConnected(false);
      writeLog(t(dict, "连接已关闭", "Closed"));
      if (heartbeatRef.current) {
        window.clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
    };
  }

  function close() {
    socketRef.current?.close();
  }

  function send() {
    socketRef.current?.send(message);
    writeLog(`${t(dict, "已发送", "Sent")}: ${message}`);
  }

  return (
    <ToolCard title="WebSocket">
      <FormStack className="gap-5">
        <Field label={t(dict, "连接地址", "Address")}>
          <Input value={address} onChange={(event) => setAddress(event.target.value)} />
        </Field>
        <FieldShell
          label={t(dict, "心跳", "Heartbeat")}
          description={t(dict, "自动发送保活消息。", "Send keepalive messages automatically.")}
        >
          <div className="flex items-center justify-end rounded-md border border-border px-4 py-3">
            <Switch checked={heartbeatEnabled} onCheckedChange={setHeartbeatEnabled} />
          </div>
        </FieldShell>
      </FormStack>
      <FormGrid className={cn("gap-5", !heartbeatEnabled && "opacity-60")}>
        <Field label={t(dict, "心跳间隔（秒）", "Heartbeat interval (seconds)")}>
          <Input
            value={heartbeatInterval}
            onChange={(event) => setHeartbeatInterval(event.target.value)}
            disabled={!heartbeatEnabled}
          />
        </Field>
        <Field label={t(dict, "心跳内容", "Heartbeat message")}>
          <Input
            value={heartbeatMessage}
            onChange={(event) => setHeartbeatMessage(event.target.value)}
            disabled={!heartbeatEnabled}
          />
        </Field>
      </FormGrid>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={connect} disabled={connected} color="primary">
          <MonitorUp className="size-4" />
          {t(dict, "连接", "Connect")}
        </Button>
        <Button type="button" onClick={close} disabled={!connected}>
          {t(dict, "关闭", "Close")}
        </Button>
      </div>
      <Separator />
      <Field label={t(dict, "消息内容", "Message")}>
        <Textarea value={message} onChange={(event) => setMessage(event.target.value)} />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={send} disabled={!connected} color="primary">
          {t(dict, "发送", "Send")}
        </Button>
        <Button type="button" onClick={() => setLogs([])}>
          {dict.clear}
        </Button>
      </div>
      <WorkbenchPanel
        title={t(dict, "日志", "Logs")}
        description={t(dict, "连接事件和消息会按时间倒序展示。", "Connection events and messages are shown in reverse chronological order.")}
      >
        <ScrollArea className="h-72 rounded-md border bg-background">
          <div className="space-y-2 p-4 text-sm">
            {logs.length ? (
              logs.map((item) => (
                <div key={item} className="rounded-md bg-secondary px-3 py-2">
                  {item}
                </div>
              ))
            ) : (
              <div className="flex min-h-48 items-center justify-center text-muted-foreground">
                {t(dict, "暂无消息。", "No messages yet.")}
              </div>
            )}
          </div>
        </ScrollArea>
      </WorkbenchPanel>
    </ToolCard>
  );
}

function GoStructJsonTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [goText, setGoText] = useState(
    "type User struct {\n  Name string `json:\"name\"`\n  Age int `json:\"age\"`\n}\n",
  );
  const [jsonText, setJsonText] = useState('{"name":"","age":0}');

  return (
    <ToolCard title="Go Struct / JSON">
      <FormStack>
        <Field label="Go">
          <CodeEditor height={400} language="go" value={goText} onChange={setGoText} />
        </Field>
        <Field label="JSON">
          <CodeEditor height={400} language="json" value={jsonText} onChange={setJsonText} />
        </Field>
      </FormStack>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setJsonText(goStructToJson(goText))} color="primary">
          Go → JSON
        </Button>
        <Button type="button" onClick={() => setGoText(jsonToGoStruct(jsonText))} color="primary">
          JSON → Go
        </Button>
      </div>
    </ToolCard>
  );
}

function LessToCssTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [lessCode, setLessCode] = useState("@primary: #111111;\n.card { color: @primary; padding: 16px; }");
  const [cssCode, setCssCode] = useState("");
  const [busy, setBusy] = useState(false);

  async function convert() {
    setBusy(true);
    try {
      const less = (await import("less")).default;
      const result = await less.render(lessCode);
      setCssCode(result.css);
    } catch (error) {
      setCssCode(error instanceof Error ? error.message : t(dict, "编译失败", "Compile failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolCard title="Less → CSS">
      <FormStack>
        <Field label="Less">
          <CodeEditor height={400} language="less" value={lessCode} onChange={setLessCode} />
        </Field>
        <Field label="CSS">
          <CodeEditor height={400} language="css" readOnly value={cssCode} />
        </Field>
      </FormStack>
      <Button type="button" onClick={convert} disabled={busy} color="primary">
        {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
        {dict.convert}
      </Button>
    </ToolCard>
  );
}

function BinaryTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [base, setBase] = useState("10");
  const [value, setValue] = useState("255");
  const rows = useMemo(() => {
    const parsed = Number.parseInt(value, Number(base));
    if (Number.isNaN(parsed)) {
      return [];
    }
    return [2, 8, 10, 16, 32, 36].map((item) => ({
      base: item,
      value: parsed.toString(item),
    }));
  }, [base, value]);

  return (
    <ToolCard title={dict.convert}>
      <FormGrid className="gap-5">
        <Field label={t(dict, "数值", "Value")}>
          <Input value={value} onChange={(event) => setValue(event.target.value)} />
        </Field>
        <Field label={t(dict, "进制", "Base")}>
          <NativeSelect
            value={base}
            onChange={setBase}
            options={[2, 8, 10, 16, 32, 36].map((item) => ({
              label: t(dict, `${item} 进制`, `Base ${item}`),
              value: String(item),
            }))}
          />
        </Field>
      </FormGrid>
      <div className="overflow-hidden rounded-xl border border-border">
        {rows.length ? (
          <Table aria-label={t(dict, "进制转换结果", "Base conversion result")}>
            <TableHeader>
              <TableRow>
                <TableHead>{t(dict, "进制", "Base")}</TableHead>
                <TableHead>{t(dict, "结果", "Value")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.base}>
                  <TableCell>{row.base}</TableCell>
                  <TableCell className="font-mono">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex min-h-40 items-center justify-center px-4 text-center text-sm text-muted-foreground">
            {t(dict, "请输入符合当前进制的有效数字。", "Enter a valid number for the selected base.")}
          </div>
        )}
      </div>
    </ToolCard>
  );
}

function RandomNumberTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("10");
  const [precision, setPrecision] = useState("0");
  const [unique, setUnique] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function generate() {
    const minValue = Number(min);
    const maxValue = Number(max);
    const countValue = Number.parseInt(count, 10);
    const precisionValue = Number.parseInt(precision, 10);

    if (
      !Number.isFinite(minValue) ||
      !Number.isFinite(maxValue) ||
      !Number.isInteger(countValue) ||
      countValue <= 0 ||
      !Number.isInteger(precisionValue) ||
      precisionValue < 0
    ) {
      setError(t(dict, "请先填写有效的范围、数量和小数位。", "Enter valid range, count, and precision values first."));
      setOutput("");
      return;
    }

    const start = Math.min(minValue, maxValue);
    const end = Math.max(minValue, maxValue);
    if (unique && precisionValue > 0) {
      setError(t(dict, "唯一值模式仅支持整数随机数。", "Unique mode currently supports integers only."));
      setOutput("");
      return;
    }

    const integerRange = Math.floor(end) - Math.ceil(start) + 1;
    if (unique && integerRange < countValue) {
      setError(
        t(
          dict,
          "当前整数范围不足以生成这么多不重复的随机数。",
          "The current integer range is too small for that many unique numbers.",
        ),
      );
      setOutput("");
      return;
    }

    const values: string[] = [];
    const seen = new Set<number>();

    while (values.length < countValue) {
      const ratio = crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff;
      let next = 0;

      if (precisionValue === 0) {
        next = Math.floor(start + ratio * (end - start + 1));
      } else {
        next = Number((start + ratio * (end - start)).toFixed(precisionValue));
      }

      if (unique) {
        if (seen.has(next)) {
          continue;
        }
        seen.add(next);
      }

      values.push(precisionValue === 0 ? String(Math.trunc(next)) : next.toFixed(precisionValue));
    }

    setError("");
    setOutput(values.join("\n"));
  }

  return (
    <ToolCard title={t(dict, "区间随机数工坊", "Range number lab")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "生成设置", "Generation settings")}
          description={t(
            dict,
            "设置区间、数量和精度后，在浏览器中批量生成随机数。",
            "Generate a batch of random numbers locally by range, count, and precision.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "最小值", "Minimum")}>
              <Input value={min} onChange={(event) => setMin(event.target.value)} inputMode="decimal" />
            </Field>
            <Field label={t(dict, "最大值", "Maximum")}>
              <Input value={max} onChange={(event) => setMax(event.target.value)} inputMode="decimal" />
            </Field>
            <Field label={t(dict, "数量", "Count")}>
              <Input value={count} onChange={(event) => setCount(event.target.value)} inputMode="numeric" />
            </Field>
            <Field label={t(dict, "小数位", "Precision")}>
              <Input value={precision} onChange={(event) => setPrecision(event.target.value)} inputMode="numeric" />
            </Field>
          </FormGrid>
          <FieldShell
            label={t(dict, "唯一值模式", "Unique values")}
            description={t(
              dict,
              "开启后会避免重复数字，适合抽样和编号场景。",
              "Avoid duplicates for sampling or simple ID scenarios.",
            )}
          >
            <div className="flex items-center justify-end rounded-md border border-border px-4 py-3">
              <Switch checked={unique} onCheckedChange={setUnique} />
            </div>
          </FieldShell>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={generate} color="primary">
              {dict.generate}
            </Button>
          </div>
          {error ? <Alert color="danger" title={error} /> : null}
        </WorkbenchPanel>
        <WorkbenchPanel title={dict.output}>
          <OutputArea label={dict.output} value={output} dict={dict} fileName="random-numbers.txt" />
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function GuidTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [count, setCount] = useState("5");
  const [uppercase, setUppercase] = useState(false);
  const [output, setOutput] = useState("");

  function generate() {
    const amount = Math.min(Math.max(Number.parseInt(count, 10) || 1, 1), 50);
    const values = Array.from({ length: amount }, () => {
      const id = crypto.randomUUID();
      return uppercase ? id.toUpperCase() : id;
    });
    setOutput(values.join("\n"));
  }

  return (
    <ToolCard title={t(dict, "UUID 批量发生器", "UUID batch forge")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "生成设置", "Generation settings")}
          description={t(
            dict,
            "使用浏览器原生 UUID 能力批量生成唯一标识。",
            "Generate UUIDs in batches with the browser's native crypto API.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "数量", "Count")}>
              <Input value={count} onChange={(event) => setCount(event.target.value)} inputMode="numeric" />
            </Field>
            <FieldShell
              label={t(dict, "大写输出", "Uppercase output")}
              description={t(dict, "按接口或文档需要切换字母大小写。", "Switch letter casing for APIs or documentation needs.")}
            >
              <div className="flex items-center justify-end rounded-md border border-border px-4 py-3">
                <Switch checked={uppercase} onCheckedChange={setUppercase} />
              </div>
            </FieldShell>
          </FormGrid>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={generate} color="primary">
              {dict.generate}
            </Button>
          </div>
        </WorkbenchPanel>
        <WorkbenchPanel title={dict.output}>
          <OutputArea label={dict.output} value={output} dict={dict} fileName="uuid-list.txt" />
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function RandomGroupTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [input, setInput] = useState("Alice\nBob\nCathy\nDavid\nElla\nFrank\nGrace");
  const [delimiter, setDelimiter] = useState("line");
  const [mode, setMode] = useState("group-count");
  const [sizeValue, setSizeValue] = useState("2");
  const [dedupe, setDedupe] = useState(true);
  const [groupOutput, setGroupOutput] = useState("");
  const [pickedOutput, setPickedOutput] = useState("");
  const items = useMemo(() => parseListTokens(input, delimiter, dedupe), [dedupe, delimiter, input]);

  function shuffle() {
    const amount = Math.max(Number.parseInt(sizeValue, 10) || 1, 1);
    const shuffled = shuffleList(items);
    const groups = mode === "group-count" ? splitByGroupCount(shuffled, amount) : splitByGroupSize(shuffled, amount);
    const groupText = groups
      .map(
        (group, index) =>
          `${t(dict, "第", "Group ")}${localeGroupIndex(index + 1, dict)}${t(dict, "组", "")}: ${group.join(", ")}`,
      )
      .join("\n");
    setGroupOutput(groupText);
    setPickedOutput(shuffled[0] ?? "");
  }

  return (
    <ToolCard title={t(dict, "随机分组与点名", "Random grouping and pick")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "名单设置", "Roster settings")}
          description={t(
            dict,
            "适合课堂分组、活动抽签或面试候选名单随机整理。",
            "Useful for classroom grouping, event draws, or randomizing candidate lists.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "分隔方式", "Delimiter")}>
              <NativeSelect
                value={delimiter}
                onChange={setDelimiter}
                options={[
                  { label: t(dict, "按行", "Line breaks"), value: "line" },
                  { label: t(dict, "按逗号", "Comma"), value: "comma" },
                  { label: t(dict, "按空白", "Whitespace"), value: "space" },
                ]}
              />
            </Field>
            <Field label={t(dict, "分组逻辑", "Grouping mode")}>
              <NativeSelect
                value={mode}
                onChange={setMode}
                options={[
                  { label: t(dict, "按组数分", "By group count"), value: "group-count" },
                  { label: t(dict, "按每组人数分", "By size per group"), value: "group-size" },
                ]}
              />
            </Field>
            <Field label={mode === "group-count" ? t(dict, "组数", "Group count") : t(dict, "每组人数", "Size per group")}>
              <Input value={sizeValue} onChange={(event) => setSizeValue(event.target.value)} inputMode="numeric" />
            </Field>
            <FieldShell label={t(dict, "先去重", "Deduplicate first")}>
              <div className="flex items-center justify-end rounded-md border border-border px-4 py-3">
                <Switch checked={dedupe} onCheckedChange={setDedupe} />
              </div>
            </FieldShell>
          </FormGrid>
          <Field label={dict.input}>
            <Textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-52" />
          </Field>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={shuffle} color="primary">
              {dict.generate}
            </Button>
          </div>
          <Alert
            color="success"
            title={
              isZh(dict)
                ? `当前可用名单 ${items.length} 项。`
                : `${items.length} usable entries are ready.`
            }
          />
        </WorkbenchPanel>
        <WorkbenchPanel title={t(dict, "分组结果", "Grouping result")}>
          <FormGrid className="gap-5">
            <OutputArea label={t(dict, "分组列表", "Groups")} value={groupOutput} dict={dict} fileName="random-groups.txt" />
            <OutputArea label={t(dict, "本轮点名", "Picked item")} value={pickedOutput} dict={dict} />
          </FormGrid>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function QrCodeDecodeTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function decode() {
    if (!file) {
      return;
    }

    try {
      const imageUrl = URL.createObjectURL(file);
      const image = await loadImageElement(imageUrl);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth || image.width;
      canvas.height = image.naturalHeight || image.height;
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error(t(dict, "无法读取图片像素数据。", "Unable to access image pixels."));
      }
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const decoded = jsQR(imageData.data, canvas.width, canvas.height, {
        inversionAttempts: "attemptBoth",
      });
      URL.revokeObjectURL(imageUrl);

      if (!decoded) {
        setError(t(dict, "没有识别到二维码内容。", "No QR code could be detected in this image."));
        setOutput("");
        return;
      }

      setError("");
      setOutput(decoded.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : t(dict, "识别失败", "Decode failed"));
      setOutput("");
    }
  }

  return (
    <ToolCard title={t(dict, "扫码内容读取", "QR content reader")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "上传二维码图片", "Upload a QR image")}
          description={t(
            dict,
            "图片会在当前浏览器中解析，不会上传到任何服务器。",
            "The image is decoded entirely in your browser and never uploaded.",
          )}
        >
          <Field label={t(dict, "图片文件", "Image file")}>
            <Input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setOutput("");
                setError("");
              }}
            />
          </Field>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={decode} disabled={!file} color="primary">
              {dict.check}
            </Button>
          </div>
          {error ? <Alert color="warning" title={error} /> : null}
        </WorkbenchPanel>
        <WorkbenchPanel title={t(dict, "预览与结果", "Preview and result")}>
          {previewUrl ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
              <div className="overflow-hidden rounded-xl border border-border/70 bg-muted/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt={t(dict, "二维码预览", "QR preview")} className="w-full object-contain" />
              </div>
              <OutputArea label={dict.output} value={output} dict={dict} />
            </div>
          ) : (
            <div className="flex min-h-52 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
              {t(dict, "上传二维码图片后可在这里查看预览和识别结果。", "Upload a QR image to preview it and inspect the decoded result here.")}
            </div>
          )}
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function BarcodeTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const [format, setFormat] = useState("CODE128");
  const [value, setValue] = useState<string>(barcodeSamples.CODE128);
  const [width, setWidth] = useState("2");
  const [height, setHeight] = useState("96");
  const [lineColor, setLineColor] = useState("#111111");
  const [background, setBackground] = useState("#ffffff");
  const [displayValue, setDisplayValue] = useState(true);
  const barcodeError = useMemo(
    () => getBarcodeValidationError(format, value || barcodeSamples[format as keyof typeof barcodeSamples], dict),
    [dict, format, value],
  );

  useEffect(() => {
    const element = barcodeRef.current;
    if (!element) {
      return;
    }

    if (barcodeError) {
      element.innerHTML = "";
      return;
    }

    try {
      JsBarcode(element, value || barcodeSamples[format as keyof typeof barcodeSamples], {
        background,
        displayValue,
        format,
        height: Math.max(Number(height) || 96, 40),
        lineColor,
        margin: 12,
        width: Math.max(Number(width) || 2, 1),
      });
    } catch {
      element.innerHTML = "";
    }
  }, [background, barcodeError, displayValue, format, height, lineColor, value, width]);

  function downloadSvg() {
    const svg = barcodeRef.current;
    if (!svg) {
      return;
    }
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `barcode-${format.toLowerCase()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolCard title={t(dict, "条码画板", "Barcode canvas")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "条形码设置", "Barcode settings")}
          description={t(
            dict,
            "支持常见条形码格式，并可直接导出生成后的 SVG。",
            "Support common barcode formats and export the generated SVG directly.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "格式", "Format")}>
              <NativeSelect
                value={format}
                onChange={setFormat}
                options={Object.keys(barcodeSamples).map((item) => ({ label: item, value: item }))}
              />
            </Field>
            <Field label={t(dict, "内容", "Value")}>
              <Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={barcodeSamples[format as keyof typeof barcodeSamples]}
              />
            </Field>
            <Field label={t(dict, "线宽", "Bar width")}>
              <Input value={width} onChange={(event) => setWidth(event.target.value)} inputMode="numeric" />
            </Field>
            <Field label={t(dict, "高度", "Height")}>
              <Input value={height} onChange={(event) => setHeight(event.target.value)} inputMode="numeric" />
            </Field>
            <Field label={t(dict, "前景色", "Line color")}>
              <Input type="color" value={lineColor} onChange={(event) => setLineColor(event.target.value)} />
            </Field>
            <Field label={t(dict, "背景色", "Background")}>
              <Input type="color" value={background} onChange={(event) => setBackground(event.target.value)} />
            </Field>
          </FormGrid>
          <FieldShell
            label={t(dict, "显示文本", "Display text")}
            description={t(dict, "显示或隐藏条形码下方的原始内容。", "Show or hide the original text below the barcode.")}
          >
            <div className="flex items-center justify-end rounded-md border border-border px-4 py-3">
              <Switch checked={displayValue} onCheckedChange={setDisplayValue} />
            </div>
          </FieldShell>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={downloadSvg} disabled={Boolean(barcodeError)} color="primary">
              {dict.download}
            </Button>
          </div>
          {barcodeError ? <Alert color="warning" title={barcodeError} /> : null}
        </WorkbenchPanel>
        <WorkbenchPanel title={t(dict, "条形码预览", "Barcode preview")}>
          <div className="flex min-h-56 items-center justify-center overflow-auto rounded-xl border border-border/70 bg-white p-6">
            <svg ref={barcodeRef} className="max-w-full" />
          </div>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function WorkingDayTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const today = dayjs().format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(today);
  const [offsetDays, setOffsetDays] = useState("5");
  const [rangeStart, setRangeStart] = useState(today);
  const [rangeEnd, setRangeEnd] = useState(dayjs().add(14, "day").format("YYYY-MM-DD"));
  const [holidayText, setHolidayText] = useState("");
  const [workdayText, setWorkdayText] = useState("");

  const holidays = useMemo(() => parseDateSet(holidayText), [holidayText]);
  const workdays = useMemo(() => parseDateSet(workdayText), [workdayText]);

  const shiftedDate = useMemo(() => {
    const parsedOffset = Number.parseInt(offsetDays, 10);
    if (!startDate || !Number.isInteger(parsedOffset)) {
      return "";
    }
    return addBusinessDays(startDate, parsedOffset, holidays, workdays);
  }, [holidays, offsetDays, startDate, workdays]);

  const rangeCount = useMemo(() => {
    if (!rangeStart || !rangeEnd) {
      return "";
    }
    return String(countBusinessDays(rangeStart, rangeEnd, holidays, workdays));
  }, [holidays, rangeEnd, rangeStart, workdays]);

  return (
    <ToolCard title={t(dict, "工作日偏移器", "Business day offset")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "工作日偏移", "Shift by business days")}
          description={t(
            dict,
            "默认排除周六周日，也可以额外补充假期和调休上班日。",
            "Weekends are excluded by default, and you can also add custom holidays or makeup workdays.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "起始日期", "Start date")}>
              <Input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            </Field>
            <Field label={t(dict, "偏移工作日", "Business day offset")}>
              <Input value={offsetDays} onChange={(event) => setOffsetDays(event.target.value)} inputMode="numeric" />
            </Field>
          </FormGrid>
          <FormGrid className="gap-5">
            <Field
              label={t(dict, "额外休息日", "Extra holidays")}
              description={t(dict, "一行一个日期，例如 2026-02-16。", "One date per line, for example 2026-02-16.")}
            >
              <Textarea value={holidayText} onChange={(event) => setHolidayText(event.target.value)} className="min-h-28" />
            </Field>
            <Field
              label={t(dict, "补班工作日", "Makeup workdays")}
              description={t(dict, "用于把周末指定为工作日。", "Use this to mark specific weekend days as working days.")}
            >
              <Textarea value={workdayText} onChange={(event) => setWorkdayText(event.target.value)} className="min-h-28" />
            </Field>
          </FormGrid>
          <Field label={t(dict, "结果日期", "Result date")}>
            <Input readOnly value={shiftedDate} />
          </Field>
        </WorkbenchPanel>

        <WorkbenchPanel
          title={t(dict, "区间工作日统计", "Count business days in a range")}
          description={t(
            dict,
            "统计起止日期之间的工作日数量，结果按区间包含首尾日期计算。",
            "Count business days between two dates, including both endpoints in the range.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "开始日期", "Range start")}>
              <Input type="date" value={rangeStart} onChange={(event) => setRangeStart(event.target.value)} />
            </Field>
            <Field label={t(dict, "结束日期", "Range end")}>
              <Input type="date" value={rangeEnd} onChange={(event) => setRangeEnd(event.target.value)} />
            </Field>
          </FormGrid>
          <Field label={t(dict, "工作日数量", "Business day count")}>
            <Input readOnly value={rangeCount} />
          </Field>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function BatchTimestampTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [mode, setMode] = useState("auto");
  const [formatValue, setFormatValue] = useState("YYYY-MM-DD HH:mm:ss");
  const [input, setInput] = useState(`1704067200\n1704067200000\n2026-03-13 09:30:00`);

  const output = useMemo(() => {
    const lines = input.split(/\r?\n/);
    return lines
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return "";
        }

        if (mode === "auto") {
          if (/^-?\d{10,13}$/.test(trimmed)) {
            const milliseconds = trimmed.length === 13 ? Number(trimmed) : Number(trimmed) * 1000;
            return `${trimmed} => ${dayjs(milliseconds).format(formatValue)}`;
          }

          const parsed = parseFlexibleDate(trimmed);
          if (!parsed) {
            return `${trimmed} => ${t(dict, "无法识别", "Invalid")}`;
          }
          return `${trimmed} => ${Math.floor(parsed.valueOf() / 1000)} | ${parsed.valueOf()}`;
        }

        if (mode === "to-date") {
          if (!/^-?\d{10,13}$/.test(trimmed)) {
            return `${trimmed} => ${t(dict, "需要 10 或 13 位时间戳", "Expected a 10- or 13-digit timestamp")}`;
          }
          const milliseconds = trimmed.length === 13 ? Number(trimmed) : Number(trimmed) * 1000;
          return dayjs(milliseconds).format(formatValue);
        }

        const parsed = parseFlexibleDate(trimmed);
        if (!parsed) {
          return `${trimmed} => ${t(dict, "无法识别", "Invalid")}`;
        }
        return mode === "to-seconds" ? String(Math.floor(parsed.valueOf() / 1000)) : String(parsed.valueOf());
      })
      .join("\n");
  }, [dict, formatValue, input, mode]);

  return (
    <ToolCard title={t(dict, "多行时间格式转换", "Multi-line time converter")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "转换设置", "Conversion settings")}
          description={t(
            dict,
            "支持自动识别或强制指定转换方向，适合逐行批量处理日志时间。",
            "Use auto-detection or force a direction for line-by-line timestamp conversions.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "模式", "Mode")}>
              <NativeSelect
                value={mode}
                onChange={setMode}
                options={[
                  { label: t(dict, "自动识别", "Auto detect"), value: "auto" },
                  { label: t(dict, "时间戳 → 日期", "Timestamp → Date"), value: "to-date" },
                  { label: t(dict, "日期 → 秒时间戳", "Date → Seconds"), value: "to-seconds" },
                  { label: t(dict, "日期 → 毫秒时间戳", "Date → Milliseconds"), value: "to-milliseconds" },
                ]}
              />
            </Field>
            <Field label={t(dict, "日期格式", "Date format")}>
              <Input value={formatValue} onChange={(event) => setFormatValue(event.target.value)} />
            </Field>
          </FormGrid>
          <FormGrid className="gap-5">
            <Field label={dict.input}>
              <Textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-64 font-mono" />
            </Field>
            <OutputArea label={dict.output} value={output} dict={dict} fileName="batch-timestamp.txt" />
          </FormGrid>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function UnitConverterTool({
  dict,
  locale,
}: {
  dict: ReturnType<typeof getDictionary>;
  locale: Locale;
}) {
  const [groupValue, setGroupValue] = useState(unitGroups[0]?.value ?? "length");
  const selectedGroup = useMemo(
    () => unitGroups.find((item) => item.value === groupValue) ?? unitGroups[0],
    [groupValue],
  );
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState(selectedGroup.units[0]?.value ?? "");
  const [toUnit, setToUnit] = useState(selectedGroup.units[1]?.value ?? selectedGroup.units[0]?.value ?? "");

  function onGroupChange(nextGroupValue: string) {
    const nextGroup = unitGroups.find((item) => item.value === nextGroupValue) ?? unitGroups[0];
    setGroupValue(nextGroup.value);
    setFromUnit(nextGroup.units[0]?.value ?? "");
    setToUnit(nextGroup.units[1]?.value ?? nextGroup.units[0]?.value ?? "");
  }

  const parsedInput = Number(inputValue);
  const convertedValue = useMemo(() => {
    if (!Number.isFinite(parsedInput)) {
      return "";
    }
    return formatDisplayNumber(convertUnitValue(parsedInput, selectedGroup, fromUnit, toUnit));
  }, [fromUnit, parsedInput, selectedGroup, toUnit]);

  const rows = useMemo(() => {
    if (!Number.isFinite(parsedInput)) {
      return [];
    }
    return selectedGroup.units.map((unit) => ({
      unit,
      value: formatDisplayNumber(convertUnitValue(parsedInput, selectedGroup, fromUnit, unit.value)),
    }));
  }, [fromUnit, parsedInput, selectedGroup]);

  return (
    <ToolCard title={t(dict, "多单位换算台", "Unit switchboard")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "换算设置", "Conversion settings")}
          description={t(
            dict,
            "一个工作台覆盖长度、面积、重量、体积、温度、压强、密度、字节和时间跨度。",
            "One workbench for length, area, weight, volume, temperature, pressure, density, bytes, and time spans.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "单位组", "Unit group")}>
              <NativeSelect
                value={groupValue}
                onChange={onGroupChange}
                options={unitGroups.map((group) => ({
                  label: group.label[locale],
                  value: group.value,
                }))}
              />
            </Field>
            <Field label={t(dict, "数值", "Value")}>
              <Input value={inputValue} onChange={(event) => setInputValue(event.target.value)} inputMode="decimal" />
            </Field>
            <Field label={t(dict, "从", "From")}>
              <NativeSelect
                value={fromUnit}
                onChange={setFromUnit}
                options={selectedGroup.units.map((unit) => ({
                  label: `${unit.label[locale]} (${unit.symbol})`,
                  value: unit.value,
                }))}
              />
            </Field>
            <Field label={t(dict, "到", "To")}>
              <NativeSelect
                value={toUnit}
                onChange={setToUnit}
                options={selectedGroup.units.map((unit) => ({
                  label: `${unit.label[locale]} (${unit.symbol})`,
                  value: unit.value,
                }))}
              />
            </Field>
          </FormGrid>
          <Field label={t(dict, "换算结果", "Converted result")}>
            <Input readOnly value={convertedValue} />
          </Field>
        </WorkbenchPanel>
        <WorkbenchPanel
          title={t(dict, "全部结果", "All results")}
          description={t(dict, "基于当前输入值列出该单位组中的全部换算结果。", "List every conversion in the current unit group from the same input value.")}
        >
          {rows.length ? (
            <div className="overflow-hidden rounded-xl border border-border">
              <Table aria-label={t(dict, "单位换算结果", "Unit conversion result")}>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t(dict, "单位", "Unit")}</TableHead>
                    <TableHead>{t(dict, "结果", "Value")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.unit.value}>
                      <TableCell>{`${row.unit.label[locale]} (${row.unit.symbol})`}</TableCell>
                      <TableCell className="font-mono">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Alert
              color="warning"
              title={t(dict, "请输入有效数字。", "Enter a valid number.")}
              description={t(dict, "输入值有效后，这里会展示同组单位的全部换算结果。", "Once the input is valid, all conversions in the same group will appear here.")}
            />
          )}
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function EnglishAmountTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [amount, setAmount] = useState("1234.56");
  const wording = useMemo(() => toEnglishAmount(amount), [amount]);

  return (
    <ToolCard title={t(dict, "英文票据金额", "English amount draft")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "金额输入", "Amount input")}
          description={t(
            dict,
            "适合票据、合同和英文报价场景，结果完全在本地生成。",
            "Built for invoices, contracts, and English quotations with local-only processing.",
          )}
        >
          <Field label={t(dict, "金额", "Amount")}>
            <Input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" />
          </Field>
        </WorkbenchPanel>
        <WorkbenchPanel title={dict.output}>
          <FormStack className="gap-5">
            <Field label={t(dict, "标准写法", "Sentence case")}>
              <Textarea readOnly value={wording.normal} className="min-h-28" />
            </Field>
            <Field label={t(dict, "大写写法", "Uppercase")}>
              <Textarea readOnly value={wording.upper} className="min-h-28" />
            </Field>
            <ResultActions
              value={wording.upper}
              copyText={dict.copy}
              copiedText={dict.copied}
              downloadText={dict.download}
              fileName="amount-in-english.txt"
            />
          </FormStack>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function SumListTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [input, setInput] = useState("100\n250.5\n399\n100");
  const stats = useMemo(() => parseNumericList(input), [input]);

  return (
    <ToolCard title={t(dict, "数字清单汇总", "Number sheet summary")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "数字列表", "Number list")}
          description={t(
            dict,
            "支持按换行、逗号、空格混合分隔，适合整理报销、订单和预算清单。",
            "Parse values separated by lines, commas, or spaces for expenses, orders, or budgets.",
          )}
        >
          <Field label={dict.input}>
            <Textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-52 font-mono" />
          </Field>
        </WorkbenchPanel>
        <WorkbenchPanel title={t(dict, "统计结果", "Summary")}>
          <FormGrid className="gap-5">
            <Field label={t(dict, "有效数量", "Valid count")}>
              <Input readOnly value={String(stats.values.length)} />
            </Field>
            <Field label={t(dict, "无效片段", "Invalid tokens")}>
              <Input readOnly value={String(stats.invalid.length)} />
            </Field>
            <Field label={t(dict, "总和", "Sum")}>
              <Input readOnly value={formatDisplayNumber(stats.sum)} />
            </Field>
            <Field label={t(dict, "平均值", "Average")}>
              <Input readOnly value={formatDisplayNumber(stats.average)} />
            </Field>
            <Field label={t(dict, "最小值", "Minimum")}>
              <Input readOnly value={formatDisplayNumber(stats.min)} />
            </Field>
            <Field label={t(dict, "最大值", "Maximum")}>
              <Input readOnly value={formatDisplayNumber(stats.max)} />
            </Field>
          </FormGrid>
          {stats.invalid.length ? (
            <Alert
              color="warning"
              title={t(dict, "发现未识别内容", "Some tokens were ignored")}
              description={stats.invalid.slice(0, 8).join(", ")}
            />
          ) : null}
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function LoanTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [principal, setPrincipal] = useState("500000");
  const [annualRate, setAnnualRate] = useState("3.65");
  const [years, setYears] = useState("30");

  const summary = useMemo(() => {
    const principalValue = Number(principal);
    const annualRateValue = Number(annualRate);
    const yearsValue = Number(years);
    return calculateLoan(principalValue, annualRateValue, yearsValue);
  }, [annualRate, principal, years]);

  return (
    <ToolCard title={t(dict, "月供测算台", "Loan payment planner")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "贷款参数", "Loan inputs")}
          description={t(
            dict,
            "采用等额本息模型估算月供、总利息和总还款额。",
            "Estimate monthly payments, total interest, and total repayment with a standard amortized loan model.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "贷款本金", "Principal")}>
              <Input value={principal} onChange={(event) => setPrincipal(event.target.value)} inputMode="decimal" />
            </Field>
            <Field label={t(dict, "年利率 (%)", "Annual rate (%)")}>
              <Input value={annualRate} onChange={(event) => setAnnualRate(event.target.value)} inputMode="decimal" />
            </Field>
            <Field label={t(dict, "期限（年）", "Years")}>
              <Input value={years} onChange={(event) => setYears(event.target.value)} inputMode="numeric" />
            </Field>
          </FormGrid>
        </WorkbenchPanel>
        <WorkbenchPanel title={t(dict, "测算结果", "Estimate")}>
          {summary ? (
            <>
              <FormGrid className="gap-5">
                <Field label={t(dict, "月供", "Monthly payment")}>
                  <Input readOnly value={formatCurrency(summary.monthlyPayment)} />
                </Field>
                <Field label={t(dict, "总还款", "Total repayment")}>
                  <Input readOnly value={formatCurrency(summary.totalPayment)} />
                </Field>
                <Field label={t(dict, "总利息", "Total interest")}>
                  <Input readOnly value={formatCurrency(summary.totalInterest)} />
                </Field>
                <Field label={t(dict, "总期数", "Total months")}>
                  <Input readOnly value={String(summary.months)} />
                </Field>
              </FormGrid>
              <div className="overflow-hidden rounded-xl border border-border">
                <Table aria-label={t(dict, "前 12 期还款概览", "First 12 repayments")}>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t(dict, "期数", "Month")}</TableHead>
                      <TableHead>{t(dict, "本金", "Principal")}</TableHead>
                      <TableHead>{t(dict, "利息", "Interest")}</TableHead>
                      <TableHead>{t(dict, "剩余本金", "Balance")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {summary.schedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell>{formatCurrency(row.principal)}</TableCell>
                        <TableCell>{formatCurrency(row.interest)}</TableCell>
                        <TableCell>{formatCurrency(row.balance)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <Alert
              color="warning"
              title={t(dict, "请输入有效的本金、利率和期限。", "Enter a valid principal, rate, and term.")}
            />
          )}
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function TextDedupeTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [input, setInput] = useState("Apple\nbanana\napple\nBANANA\norange");
  const [delimiter, setDelimiter] = useState("line");
  const [trimLines, setTrimLines] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [sortResult, setSortResult] = useState(false);

  const result = useMemo(
    () => dedupeText(input, { delimiter, ignoreCase, sortResult, trimLines }),
    [delimiter, ignoreCase, input, sortResult, trimLines],
  );

  return (
    <ToolCard title={t(dict, "列表去重整理", "List cleanup")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "去重设置", "Dedupe settings")}
          description={t(
            dict,
            "支持按行、逗号或空白分隔去重，并保留统计信息。",
            "Deduplicate by line, comma, or whitespace and keep useful summary statistics.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "分隔方式", "Delimiter")}>
              <NativeSelect
                value={delimiter}
                onChange={setDelimiter}
                options={[
                  { label: t(dict, "按行", "Line breaks"), value: "line" },
                  { label: t(dict, "按逗号", "Comma"), value: "comma" },
                  { label: t(dict, "按空白", "Whitespace"), value: "space" },
                ]}
              />
            </Field>
          </FormGrid>
          <FormGrid className="gap-5">
            <FieldShell label={t(dict, "去首尾空格", "Trim each item")}>
              <div className="flex items-center justify-end rounded-md border border-border px-4 py-3">
                <Switch checked={trimLines} onCheckedChange={setTrimLines} />
              </div>
            </FieldShell>
            <FieldShell label={t(dict, "忽略大小写", "Ignore case")}>
              <div className="flex items-center justify-end rounded-md border border-border px-4 py-3">
                <Switch checked={ignoreCase} onCheckedChange={setIgnoreCase} />
              </div>
            </FieldShell>
            <FieldShell label={t(dict, "输出排序", "Sort result")}>
              <div className="flex items-center justify-end rounded-md border border-border px-4 py-3">
                <Switch checked={sortResult} onCheckedChange={setSortResult} />
              </div>
            </FieldShell>
          </FormGrid>
          <FormGrid className="gap-5">
            <Field label={dict.input}>
              <Textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-64 font-mono" />
            </Field>
            <OutputArea label={dict.output} value={result.output} dict={dict} fileName="deduped-text.txt" />
          </FormGrid>
          <Alert
            color="success"
            title={t(dict, "去重完成", "Dedupe complete")}
            description={
              isZh(dict)
                ? `原始 ${result.total} 项，保留 ${result.unique} 项，移除 ${result.removed} 项。`
                : `${result.total} items in, ${result.unique} kept, ${result.removed} removed.`
            }
          />
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function EmojiCleanerTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const siteConfig = useSiteConfig();
  const [input, setInput] = useState(
    () => `Hi 👋 欢迎使用 ${siteConfig.title} 🎉`,
  );
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const result = useMemo(() => stripEmoji(input, collapseSpaces), [collapseSpaces, input]);

  return (
    <ToolCard title={t(dict, "Emoji 清理器", "Emoji cleaner")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "清理设置", "Cleanup settings")}
          description={t(
            dict,
            "适合把社媒文案、昵称或聊天内容整理成更适合表单和系统字段的纯文本。",
            "Useful for turning social copy, nicknames, or chat text into cleaner plain text for forms and systems.",
          )}
        >
          <FieldShell label={t(dict, "压缩多余空格", "Collapse extra spaces")}>
            <div className="flex items-center justify-end rounded-md border border-border px-4 py-3">
              <Switch checked={collapseSpaces} onCheckedChange={setCollapseSpaces} />
            </div>
          </FieldShell>
          <FormGrid className="gap-5">
            <Field label={dict.input}>
              <Textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-64" />
            </Field>
            <OutputArea label={dict.output} value={result.output} dict={dict} fileName="emoji-cleaned.txt" />
          </FormGrid>
          <Alert
            color="success"
            title={
              isZh(dict)
                ? `已移除 ${result.removed} 个 Emoji / 表情符号。`
                : `Removed ${result.removed} emoji or pictographic symbols.`
            }
          />
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function CnIdTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [input, setInput] = useState("11010519491231002X");
  const result = useMemo(() => parseCnIdCard(input, dict), [dict, input]);

  return (
    <ToolCard title={t(dict, "身份证核验卡", "CN ID check")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "身份证号校验", "ID validation")}
          description={t(
            dict,
            "校验 18 位大陆身份证号，并提取生日、年龄、性别与地区前缀信息。",
            "Validate a Mainland China 18-digit ID number and extract birthday, age, gender, and region prefix info.",
          )}
        >
          <Field label={t(dict, "身份证号", "ID number")}>
            <Input value={input} onChange={(event) => setInput(event.target.value.trim())} />
          </Field>
          {result.valid ? (
            <>
              <Alert
                color="success"
                title={t(dict, "校验通过", "Validation passed")}
                description={t(dict, "号码结构、出生日期与校验位均有效。", "The structure, birth date, and checksum are all valid.")}
              />
              <FormGrid className="gap-5">
                <Field label={t(dict, "地区", "Region")}>
                  <Input readOnly value={result.region} />
                </Field>
                <Field label={t(dict, "出生日期", "Birthday")}>
                  <Input readOnly value={result.birthday} />
                </Field>
                <Field label={t(dict, "年龄", "Age")}>
                  <Input readOnly value={String(result.age)} />
                </Field>
                <Field label={t(dict, "性别", "Gender")}>
                  <Input readOnly value={result.gender} />
                </Field>
                <Field label={t(dict, "校验位", "Checksum")}>
                  <Input readOnly value={result.checkDigit} />
                </Field>
              </FormGrid>
            </>
          ) : (
            <Alert color="warning" title={result.message} />
          )}
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function SimplifiedTraditionalTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [direction, setDirection] = useState("cn-to-tw");
  const [input, setInput] = useState("汉字转换工具支持本地完成，不上传文本内容。");
  const output = useMemo(
    () => (direction === "cn-to-tw" ? cnToTwConverter(input) : twToCnConverter(input)),
    [direction, input],
  );

  return (
    <ToolCard title={t(dict, "中文简繁切换", "Chinese script switch")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "转换设置", "Conversion settings")}
          description={t(
            dict,
            "使用本地字典完成中文简繁转换，适合文章、文案和产品文档。",
            "Convert Chinese text locally with dictionary-based mappings for articles, copy, or product docs.",
          )}
        >
          <Field label={t(dict, "方向", "Direction")}>
            <NativeSelect
              value={direction}
              onChange={setDirection}
              options={[
                { label: t(dict, "简体 → 繁体", "Simplified → Traditional"), value: "cn-to-tw" },
                { label: t(dict, "繁体 → 简体", "Traditional → Simplified"), value: "tw-to-cn" },
              ]}
            />
          </Field>
          <FormGrid className="gap-5">
            <Field label={dict.input}>
              <Textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-64" />
            </Field>
            <OutputArea label={dict.output} value={output} dict={dict} fileName="converted-chinese.txt" />
          </FormGrid>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function PinyinTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [input, setInput] = useState("汉语拼音转换工具");
  const [toneType, setToneType] = useState("mark");

  const output = useMemo(() => {
    if (!input.trim()) {
      return "";
    }

    const pinyinOutput =
      toneType === "mark"
        ? pinyin(input)
        : pinyin(input, {
            toneType: toneType as "none" | "num",
          });

    const initials = pinyin(input, {
      pattern: "first",
      toneType: "none",
    });

    return `${t(dict, "拼音", "Pinyin")}: ${pinyinOutput}\n${t(dict, "首字母", "Initials")}: ${initials}`;
  }, [dict, input, toneType]);

  return (
    <ToolCard title={t(dict, "拼音转写台", "Pinyin transcriber")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "拼音格式", "Pinyin format")}
          description={t(
            dict,
            "输出带音调、无音调或数字声调，同时给出首字母缩写。",
            "Output tone marks, tone-less pinyin, or numeric tones, plus initials.",
          )}
        >
          <Field label={t(dict, "声调样式", "Tone style")}>
            <NativeSelect
              value={toneType}
              onChange={setToneType}
              options={[
                { label: t(dict, "带音调", "Tone marks"), value: "mark" },
                { label: t(dict, "无音调", "No tones"), value: "none" },
                { label: t(dict, "数字声调", "Numeric tones"), value: "num" },
              ]}
            />
          </Field>
          <FormGrid className="gap-5">
            <Field label={dict.input}>
              <Textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-64" />
            </Field>
            <OutputArea label={dict.output} value={output} dict={dict} fileName="pinyin.txt" />
          </FormGrid>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function JsonToTypesTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const siteConfig = useSiteConfig();
  const [rootName, setRootName] = useState("RootObject");
  const [input, setInput] = useState(() =>
    JSON.stringify(
      {
        name: siteConfig.title,
        tools: [{ slug: "json", enabled: true }],
      },
      null,
      0,
    ),
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const parsed = JSON.parse(input) as unknown;
      const next = JsonToTS(parsed, { rootName }).join("\n\n");
      startTransition(() => {
        setOutput(next);
        setError("");
      });
    } catch (error) {
      startTransition(() => {
        setOutput("");
        setError(error instanceof Error ? error.message : t(dict, "转换失败", "Conversion failed"));
      });
    }
  }, [dict, input, rootName]);

  return (
    <ToolCard title={t(dict, "JSON 类型草稿", "JSON type sketch")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "推导设置", "Inference settings")}
          description={t(dict, "从 JSON 示例自动推导 TypeScript 接口。", "Infer TypeScript interfaces directly from a JSON sample.")}
        >
          <Field label={t(dict, "根接口名", "Root interface name")}>
            <Input value={rootName} onChange={(event) => setRootName(event.target.value)} />
          </Field>
          {error ? <Alert color="warning" title={error} /> : null}
          <FormStack>
            <Field label="JSON">
              <CodeEditor height={360} language="json" value={input} onChange={setInput} />
            </Field>
            <Field label="TypeScript">
              <CodeEditor height={360} language="typescript" value={output} readOnly />
            </Field>
            <ResultActions
              value={output}
              copyText={dict.copy}
              copiedText={dict.copied}
              downloadText={dict.download}
              fileName="types.ts"
            />
          </FormStack>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function NamingConverterTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [input, setInput] = useState("utils fun tool");
  const words = useMemo(() => splitNamingWords(input), [input]);
  const output = useMemo(() => buildNamingVariants(words), [words]);

  return (
    <ToolCard title={t(dict, "变量命名换挡", "Naming gearbox")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "输入内容", "Input")}
          description={t(
            dict,
            "可输入自然语言、现有变量名或混合分隔符文本，自动拆词后转换成常见命名风格。",
            "Paste natural language, an existing variable name, or mixed separators to convert between naming styles.",
          )}
        >
          <Field label={dict.input}>
            <Input value={input} onChange={(event) => setInput(event.target.value)} />
          </Field>
          <FormGrid className="gap-5">
            <Field label="camelCase">
              <Input readOnly value={output.camelCase} />
            </Field>
            <Field label="PascalCase">
              <Input readOnly value={output.pascalCase} />
            </Field>
            <Field label="snake_case">
              <Input readOnly value={output.snakeCase} />
            </Field>
            <Field label="kebab-case">
              <Input readOnly value={output.kebabCase} />
            </Field>
            <Field label="CONSTANT_CASE">
              <Input readOnly value={output.constantCase} />
            </Field>
            <Field label={t(dict, "标题格式", "Title Case")}>
              <Input readOnly value={output.titleCase} />
            </Field>
          </FormGrid>
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function ColorConverterTool({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const [input, setInput] = useState("#22c55e");
  const parsed = useMemo(() => parseColorInput(input), [input]);

  return (
    <ToolCard title={t(dict, "颜色格式桥", "Color format bridge")}>
      <FormStack>
        <WorkbenchPanel
          title={t(dict, "颜色输入", "Color input")}
          description={t(
            dict,
            "支持输入 HEX、RGB 或 HSL，自动计算其他格式并显示颜色预览。",
            "Enter HEX, RGB, or HSL to derive the other formats and preview the color instantly.",
          )}
        >
          <FormGrid className="gap-5">
            <Field label={t(dict, "输入颜色", "Color value")}>
              <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="#22c55e / rgb(34,197,94) / hsl(142, 71%, 45%)" />
            </Field>
            <Field label={t(dict, "选择器", "Picker")}>
              <Input
                type="color"
                value={parsed?.hex ?? "#22c55e"}
                onChange={(event) => setInput(event.target.value)}
              />
            </Field>
          </FormGrid>
          {parsed ? (
            <>
              <div className="h-28 rounded-xl border border-border/70" style={{ backgroundColor: parsed.hex }} />
              <FormGrid className="gap-5">
                <Field label="HEX">
                  <Input readOnly value={parsed.hex} />
                </Field>
                <Field label="RGB">
                  <Input readOnly value={parsed.rgb} />
                </Field>
                <Field label="HSL">
                  <Input readOnly value={parsed.hsl} />
                </Field>
              </FormGrid>
            </>
          ) : (
            <Alert
              color="warning"
              title={t(dict, "请输入有效的 HEX、RGB 或 HSL 颜色值。", "Enter a valid HEX, RGB, or HSL color value.")}
            />
          )}
        </WorkbenchPanel>
      </FormStack>
    </ToolCard>
  );
}

function encodeUnicodeBase64(input: string) {
  return btoa(String.fromCharCode(...new TextEncoder().encode(input)));
}

function decodeUnicodeBase64(input: string) {
  try {
    const binary = atob(input);
    return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
  } catch (error) {
    return error instanceof Error ? error.message : "Decode failed";
  }
}

function textToUnicode(input: string) {
  return Array.from(input)
    .map((char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`)
    .join("");
}

function unicodeToText(input: string) {
  return input.replace(/\\u([\dA-Fa-f]{4})/g, (_, code) =>
    String.fromCharCode(Number.parseInt(code, 16)),
  );
}

function decodeURIComponentSafe(value: string) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return error instanceof Error ? error.message : "Decode failed";
  }
}

function optimizeMixedSpacing(input: string) {
  return input
    .replace(/([\u4e00-\u9fa5])([A-Za-z0-9@&=])/g, "$1 $2")
    .replace(/([A-Za-z0-9!?,.%])([\u4e00-\u9fa5])/g, "$1 $2")
    .replace(/\s{2,}/g, " ");
}

function parseRegex(pattern: string) {
  const match = pattern.match(/^\/(.+)\/([gimsuy]*)$/);
  if (match) {
    return new RegExp(match[1], match[2]);
  }
  return new RegExp(pattern);
}

function toRmbUppercase(value: string) {
  const num = Number(value);
  if (Number.isNaN(num)) {
    return "";
  }
  const digits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const units = ["", "拾", "佰", "仟"];
  const sections = ["", "万", "亿", "兆"];
  const fractionUnits = ["角", "分"];
  let integer = Math.floor(Math.abs(num));
  const decimal = Math.round((Math.abs(num) - integer) * 100);

  function sectionToChinese(section: number) {
    let output = "";
    let zero = true;
    for (let i = 0; i < 4; i += 1) {
      const digit = section % 10;
      if (digit === 0) {
        if (!zero && output) {
          output = digits[0] + output;
        }
        zero = true;
      } else {
        zero = false;
        output = digits[digit] + units[i] + output;
      }
      section = Math.floor(section / 10);
    }
    return output.replace(/零+/g, "零").replace(/零$/g, "");
  }

  let output = "";
  let sectionIndex = 0;
  while (integer > 0) {
    const section = integer % 10000;
    if (section) {
      output = `${sectionToChinese(section)}${sections[sectionIndex]}${output}`;
    }
    sectionIndex += 1;
    integer = Math.floor(integer / 10000);
  }
  output = output || "零";
  output += "元";

  if (decimal === 0) {
    return `${output}整`;
  }

  const jiao = Math.floor(decimal / 10);
  const fen = decimal % 10;
  if (jiao) {
    output += digits[jiao] + fractionUnits[0];
  }
  if (fen) {
    output += digits[fen] + fractionUnits[1];
  }
  return output.replace(/零+/g, "零");
}

function getFormatterSample(type: "json" | "css" | "js" | "html", siteTitle: string) {
  switch (type) {
    case "json":
      return JSON.stringify({
        name: siteTitle,
        category: "tools",
        items: ["json", "time", "image"],
      });
    case "css":
      return ".card{padding:16px;color:#111111}";
    case "html":
      return `<div><h1>${siteTitle}</h1><p>Online tools for everyday tasks</p></div>`;
    default:
      return `const app = { name: ${JSON.stringify(siteTitle)}, tools: 36 };\nconsole.log(app);`;
  }
}

async function formatWithPrettier(type: "css" | "js" | "html", input: string) {
  const prettier = await import("prettier/standalone");
  if (type === "css") {
    const [postcssPlugin] = await Promise.all([import("prettier/plugins/postcss")]);
    return prettier.format(input, {
      parser: "css",
      plugins: [postcssPlugin],
    });
  }
  if (type === "html") {
    const [htmlPlugin] = await Promise.all([import("prettier/plugins/html")]);
    return prettier.format(input, {
      parser: "html",
      plugins: [htmlPlugin],
    });
  }
  const [babelPlugin, estreePlugin] = await Promise.all([
    import("prettier/plugins/babel"),
    import("prettier/plugins/estree"),
  ]);
  return prettier.format(input, {
    parser: "babel",
    plugins: [babelPlugin, estreePlugin],
  });
}

function jsonToGoStruct(jsonText: string) {
  const json = JSON.parse(jsonText) as Record<string, unknown>;
  return buildGoStruct("UtilsFun", json);
}

function buildGoStruct(name: string, value: Record<string, unknown>) {
  const lines = [`type ${name} struct {`];
  const children: string[] = [];

  for (const [key, raw] of Object.entries(value)) {
    const fieldName = upperFirst(key);
    if (typeof raw === "string") {
      lines.push(`  ${fieldName} string \`json:"${key}"\``);
    } else if (typeof raw === "number") {
      lines.push(`  ${fieldName} ${Number.isInteger(raw) ? "int" : "float64"} \`json:"${key}"\``);
    } else if (typeof raw === "boolean") {
      lines.push(`  ${fieldName} bool \`json:"${key}"\``);
    } else if (Array.isArray(raw)) {
      const first = raw[0];
      if (typeof first === "string") {
        lines.push(`  ${fieldName} []string \`json:"${key}"\``);
      } else if (typeof first === "number") {
        lines.push(`  ${fieldName} []${Number.isInteger(first) ? "int" : "float64"} \`json:"${key}"\``);
      } else if (typeof first === "boolean") {
        lines.push(`  ${fieldName} []bool \`json:"${key}"\``);
      } else if (first && typeof first === "object" && !Array.isArray(first)) {
        const childName = `${name}${upperFirst(key)}`;
        children.push(buildGoStruct(childName, first as Record<string, unknown>));
        lines.push(`  ${fieldName} []${childName} \`json:"${key}"\``);
      } else {
        lines.push(`  ${fieldName} []interface{} \`json:"${key}"\``);
      }
    } else if (raw && typeof raw === "object") {
      const childName = `${name}${upperFirst(key)}`;
      children.push(buildGoStruct(childName, raw as Record<string, unknown>));
      lines.push(`  ${fieldName} ${childName} \`json:"${key}"\``);
    } else {
      lines.push(`  ${fieldName} interface{} \`json:"${key}"\``);
    }
  }

  lines.push("}");
  return [lines.join("\n"), ...children].join("\n\n");
}

function goStructToJson(goText: string) {
  const lines = goText.split("\n");
  const root: Record<string, unknown> = {};
  const stack: Array<Record<string, unknown>> = [root];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("type ") || line === "{" || line === "}") {
      continue;
    }
    if (line.startsWith("//")) {
      continue;
    }
    const matched = line.match(/^(\w+)\s+([^\s`]+)(?:\s+`json:"([^"]*)"`)?/);
    if (!matched) {
      continue;
    }
    const [, name, type, tag] = matched;
    const key = tag && tag !== "-" ? tag : lowerFirst(name);
    stack[stack.length - 1][key] = guessJsonValueByGoType(type);
    if (type === "struct") {
      const child: Record<string, unknown> = {};
      stack[stack.length - 1][key] = child;
      stack.push(child);
    }
  }

  return JSON.stringify(root, null, 2);
}

function guessJsonValueByGoType(type: string): unknown {
  if (type.startsWith("[]")) {
    return [guessJsonValueByGoType(type.slice(2))];
  }
  if (type === "string") {
    return "";
  }
  if (["int", "int64", "uint", "uint64"].includes(type)) {
    return 0;
  }
  if (["float32", "float64"].includes(type)) {
    return 0.1;
  }
  if (type === "bool") {
    return false;
  }
  return null;
}

function upperFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function lowerFirst(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function loadImageElement(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image load failed"));
    image.src = src;
  });
}

function parseFlexibleDate(input: string) {
  const normalized = input.trim().replace("T", " ");
  const parsed = dayjs(normalized);
  if (parsed.isValid()) {
    return parsed;
  }

  const native = new Date(normalized);
  if (Number.isNaN(native.valueOf())) {
    return null;
  }

  const fallback = dayjs(native);
  return fallback.isValid() ? fallback : null;
}

function parseDateSet(input: string) {
  return new Set(
    input
      .split(/[\s,，]+/)
      .map((item) => item.trim())
      .filter((item) => /^\d{4}-\d{2}-\d{2}$/.test(item)),
  );
}

function isBusinessDay(date: dayjs.Dayjs, holidays: Set<string>, workdays: Set<string>) {
  const key = date.format("YYYY-MM-DD");
  if (workdays.has(key)) {
    return true;
  }
  if (holidays.has(key)) {
    return false;
  }
  const weekday = date.day();
  return weekday !== 0 && weekday !== 6;
}

function addBusinessDays(startDate: string, offset: number, holidays: Set<string>, workdays: Set<string>) {
  const start = dayjs(startDate);
  if (!start.isValid()) {
    return "";
  }
  if (offset === 0) {
    return start.format("YYYY-MM-DD");
  }

  const direction = offset > 0 ? 1 : -1;
  let remaining = Math.abs(offset);
  let cursor = start;

  while (remaining > 0) {
    cursor = cursor.add(direction, "day");
    if (isBusinessDay(cursor, holidays, workdays)) {
      remaining -= 1;
    }
  }

  return cursor.format("YYYY-MM-DD");
}

function countBusinessDays(startDate: string, endDate: string, holidays: Set<string>, workdays: Set<string>) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (!start.isValid() || !end.isValid()) {
    return 0;
  }

  const [rangeStart, rangeEnd] = start.isBefore(end) ? [start, end] : [end, start];
  let cursor = rangeStart;
  let count = 0;

  while (cursor.isBefore(rangeEnd) || cursor.isSame(rangeEnd, "day")) {
    if (isBusinessDay(cursor, holidays, workdays)) {
      count += 1;
    }
    cursor = cursor.add(1, "day");
  }

  return count;
}

function convertUnitValue(value: number, group: UnitGroup, fromUnit: string, toUnit: string) {
  if (group.kind === "temperature") {
    const celsius = toCelsius(value, fromUnit as TemperatureUnit["value"]);
    return fromCelsius(celsius, toUnit as TemperatureUnit["value"]);
  }

  const from = group.units.find((unit) => unit.value === fromUnit);
  const to = group.units.find((unit) => unit.value === toUnit);
  if (!from || !to) {
    return value;
  }

  return (value * from.factor) / to.factor;
}

function toCelsius(value: number, unit: TemperatureUnit["value"]) {
  switch (unit) {
    case "f":
      return ((value - 32) * 5) / 9;
    case "k":
      return value - 273.15;
    default:
      return value;
  }
}

function fromCelsius(value: number, unit: TemperatureUnit["value"]) {
  switch (unit) {
    case "f":
      return (value * 9) / 5 + 32;
    case "k":
      return value + 273.15;
    default:
      return value;
  }
}

function formatDisplayNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "";
  }
  if (Math.abs(value) >= 1_000_000_000 || (Math.abs(value) > 0 && Math.abs(value) < 0.000001)) {
    return value.toExponential(6);
  }
  return Number(value.toFixed(6)).toString();
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return "";
  }
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function toEnglishAmount(value: string) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return { normal: "", upper: "" };
  }

  const absolute = Math.abs(amount);
  const dollars = Math.floor(absolute);
  const cents = Math.round((absolute - dollars) * 100);
  const dollarWords = `${numberToEnglishWords(dollars)} ${dollars === 1 ? "dollar" : "dollars"}`;
  const centWords = cents ? ` and ${numberToEnglishWords(cents)} ${cents === 1 ? "cent" : "cents"}` : " only";
  const sign = amount < 0 ? "minus " : "";
  const normal = `${sign}${dollarWords}${centWords}`.replace(/\s+/g, " ").trim();
  return {
    normal,
    upper: normal.toUpperCase(),
  };
}

function numberToEnglishWords(value: number): string {
  const units = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const scales = [
    { value: 1_000_000_000_000, label: "trillion" },
    { value: 1_000_000_000, label: "billion" },
    { value: 1_000_000, label: "million" },
    { value: 1_000, label: "thousand" },
  ];

  if (value < 20) {
    return units[value] ?? "";
  }

  if (value < 100) {
    const tenValue = Math.floor(value / 10);
    const remainder = value % 10;
    return remainder ? `${tens[tenValue]}-${units[remainder]}` : tens[tenValue];
  }

  if (value < 1000) {
    const hundredValue = Math.floor(value / 100);
    const remainder = value % 100;
    return remainder
      ? `${units[hundredValue]} hundred ${numberToEnglishWords(remainder)}`
      : `${units[hundredValue]} hundred`;
  }

  for (const scale of scales) {
    if (value >= scale.value) {
      const lead = Math.floor(value / scale.value);
      const remainder = value % scale.value;
      return remainder
        ? `${numberToEnglishWords(lead)} ${scale.label} ${numberToEnglishWords(remainder)}`
        : `${numberToEnglishWords(lead)} ${scale.label}`;
    }
  }

  return String(value);
}

function parseNumericList(input: string) {
  const tokens = input
    .split(/[\s,，]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const values: number[] = [];
  const invalid: string[] = [];

  for (const token of tokens) {
    const next = Number(token);
    if (Number.isFinite(next)) {
      values.push(next);
    } else {
      invalid.push(token);
    }
  }

  const sum = values.reduce((total, value) => total + value, 0);
  return {
    values,
    invalid,
    sum,
    average: values.length ? sum / values.length : 0,
    min: values.length ? Math.min(...values) : 0,
    max: values.length ? Math.max(...values) : 0,
  };
}

function getBarcodeValidationError(format: string, value: string, dict: Dictionary) {
  const normalized = value.trim();
  if (!normalized) {
    return t(dict, "请输入条形码内容。", "Enter a barcode value.");
  }

  const validators: Record<string, RegExp> = {
    CODE39: /^[0-9A-Z \-.$/+%]+$/,
    EAN13: /^\d{13}$/,
    EAN8: /^\d{8}$/,
    UPC: /^\d{12}$/,
    ITF14: /^\d{14}$/,
  };

  const matched = validators[format];
  if (!matched) {
    return "";
  }

  return matched.test(normalized)
    ? ""
    : t(dict, "当前内容不符合所选条形码格式要求。", "The current value does not match the selected barcode format.");
}

function calculateLoan(principal: number, annualRate: number, years: number) {
  if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(years) || principal <= 0 || years <= 0) {
    return null;
  }

  const months = Math.round(years * 12);
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);

  let balance = principal;
  const schedule = Array.from({ length: Math.min(months, 12) }, (_, index) => {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPart = monthlyPayment - interest;
    balance = Math.max(balance - principalPart, 0);
    return {
      month: index + 1,
      principal: principalPart,
      interest,
      balance,
    };
  });

  const totalPayment = monthlyPayment * months;
  return {
    months,
    monthlyPayment,
    totalPayment,
    totalInterest: totalPayment - principal,
    schedule,
  };
}

function dedupeText(
  input: string,
  options: {
    delimiter: string;
    trimLines: boolean;
    ignoreCase: boolean;
    sortResult: boolean;
  },
) {
  const items = splitTextByMode(input, options.delimiter).map((item) => (options.trimLines ? item.trim() : item));
  const filtered = items.filter((item) => item.length > 0);
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of filtered) {
    const key = options.ignoreCase ? item.toLowerCase() : item;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(item);
  }

  if (options.sortResult) {
    result.sort((left, right) => left.localeCompare(right));
  }

  return {
    total: filtered.length,
    unique: result.length,
    removed: filtered.length - result.length,
    output: result.join("\n"),
  };
}

function splitTextByMode(input: string, delimiter: string) {
  switch (delimiter) {
    case "comma":
      return input.split(/[，,]+/);
    case "space":
      return input.split(/\s+/);
    default:
      return input.split(/\r?\n/);
  }
}

function splitNamingWords(input: string) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_\-./]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((item) => item.toLowerCase());
}

function buildNamingVariants(words: string[]) {
  if (!words.length) {
    return {
      camelCase: "",
      pascalCase: "",
      snakeCase: "",
      kebabCase: "",
      constantCase: "",
      titleCase: "",
    };
  }

  const capitalized = words.map((item) => upperFirst(item));
  return {
    camelCase: `${words[0]}${capitalized.slice(1).join("")}`,
    pascalCase: capitalized.join(""),
    snakeCase: words.join("_"),
    kebabCase: words.join("-"),
    constantCase: words.join("_").toUpperCase(),
    titleCase: capitalized.join(" "),
  };
}

function parseColorInput(input: string) {
  const value = input.trim();
  if (!value) {
    return null;
  }

  let rgb: { r: number; g: number; b: number } | null = null;

  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
    const hex = normalizeHex(value);
    rgb = hexToRgb(hex);
  } else {
    const rgbMatch = value.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
    const hslMatch = value.match(/^hsl\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)$/i);

    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      rgb = {
        r: clampColor(Number(r)),
        g: clampColor(Number(g)),
        b: clampColor(Number(b)),
      };
    } else if (hslMatch) {
      const [, h, s, l] = hslMatch;
      rgb = hslToRgb(Number(h), Number(s), Number(l));
    }
  }

  if (!rgb) {
    return null;
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  return {
    hex,
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
  };
}

function normalizeHex(input: string) {
  if (input.length === 4) {
    return `#${input[1]}${input[1]}${input[2]}${input[2]}${input[3]}${input[3]}`.toLowerCase();
  }
  return input.toLowerCase();
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex).slice(1);
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((item) => clampColor(item).toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;

  if (delta === 0) {
    return { h: 0, s: 0, l: lightness * 100 };
  }

  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let hue = 0;
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      hue = (red - green) / delta + 4;
      break;
  }

  return {
    h: hue * 60,
    s: saturation * 100,
    l: lightness * 100,
  };
}

function hslToRgb(h: number, s: number, l: number) {
  const hue = ((h % 360) + 360) % 360;
  const saturation = Math.max(0, Math.min(100, s)) / 100;
  const lightness = Math.max(0, Math.min(100, l)) / 100;

  if (saturation === 0) {
    const gray = Math.round(lightness * 255);
    return { r: gray, g: gray, b: gray };
  }

  const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;

  const convert = (channel: number) => {
    let value = channel;
    if (value < 0) {
      value += 1;
    }
    if (value > 1) {
      value -= 1;
    }
    if (value < 1 / 6) {
      return p + (q - p) * 6 * value;
    }
    if (value < 1 / 2) {
      return q;
    }
    if (value < 2 / 3) {
      return p + (q - p) * (2 / 3 - value) * 6;
    }
    return p;
  };

  const r = convert(hue / 360 + 1 / 3);
  const g = convert(hue / 360);
  const b = convert(hue / 360 - 1 / 3);
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function clampColor(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function parseListTokens(input: string, delimiter: string, dedupe = false) {
  const raw = splitTextByMode(input, delimiter)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!dedupe) {
    return raw;
  }

  return raw.filter((item, index) => raw.indexOf(item) === index);
}

function shuffleList<T>(items: T[]) {
  const output = [...items];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const ratio = crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff;
    const swapIndex = Math.floor(ratio * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
}

function splitByGroupCount(items: string[], groupCount: number) {
  const safeCount = Math.max(groupCount, 1);
  const groups = Array.from({ length: safeCount }, () => [] as string[]);
  items.forEach((item, index) => {
    groups[index % safeCount].push(item);
  });
  return groups.filter((group) => group.length > 0);
}

function splitByGroupSize(items: string[], groupSize: number) {
  const safeSize = Math.max(groupSize, 1);
  const groups: string[][] = [];
  for (let index = 0; index < items.length; index += safeSize) {
    groups.push(items.slice(index, index + safeSize));
  }
  return groups;
}

function localeGroupIndex(index: number, dict: Dictionary) {
  return isZh(dict) ? String(index) : `${index}`;
}

function stripEmoji(input: string, collapseSpaces: boolean) {
  const matches = Array.from(
    input.matchAll(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F]/gu),
  );
  const output = input.replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F]/gu, "");
  return {
    removed: matches.length,
    output: collapseSpaces ? output.replace(/[ \t]{2,}/g, " ").trim() : output,
  };
}

const cnIdRegionMap: Record<string, LocalizedText> = {
  "11": { zh: "北京", en: "Beijing" },
  "12": { zh: "天津", en: "Tianjin" },
  "13": { zh: "河北", en: "Hebei" },
  "14": { zh: "山西", en: "Shanxi" },
  "15": { zh: "内蒙古", en: "Inner Mongolia" },
  "21": { zh: "辽宁", en: "Liaoning" },
  "22": { zh: "吉林", en: "Jilin" },
  "23": { zh: "黑龙江", en: "Heilongjiang" },
  "31": { zh: "上海", en: "Shanghai" },
  "32": { zh: "江苏", en: "Jiangsu" },
  "33": { zh: "浙江", en: "Zhejiang" },
  "34": { zh: "安徽", en: "Anhui" },
  "35": { zh: "福建", en: "Fujian" },
  "36": { zh: "江西", en: "Jiangxi" },
  "37": { zh: "山东", en: "Shandong" },
  "41": { zh: "河南", en: "Henan" },
  "42": { zh: "湖北", en: "Hubei" },
  "43": { zh: "湖南", en: "Hunan" },
  "44": { zh: "广东", en: "Guangdong" },
  "45": { zh: "广西", en: "Guangxi" },
  "46": { zh: "海南", en: "Hainan" },
  "50": { zh: "重庆", en: "Chongqing" },
  "51": { zh: "四川", en: "Sichuan" },
  "52": { zh: "贵州", en: "Guizhou" },
  "53": { zh: "云南", en: "Yunnan" },
  "54": { zh: "西藏", en: "Tibet" },
  "61": { zh: "陕西", en: "Shaanxi" },
  "62": { zh: "甘肃", en: "Gansu" },
  "63": { zh: "青海", en: "Qinghai" },
  "64": { zh: "宁夏", en: "Ningxia" },
  "65": { zh: "新疆", en: "Xinjiang" },
  "71": { zh: "台湾", en: "Taiwan" },
  "81": { zh: "香港", en: "Hong Kong" },
  "82": { zh: "澳门", en: "Macau" },
};

function parseCnIdCard(input: string, dict: Dictionary) {
  const value = input.trim().toUpperCase();
  if (!value) {
    return {
      valid: false,
      message: t(dict, "请输入 18 位身份证号。", "Enter an 18-digit ID number."),
    } as const;
  }

  if (!/^\d{17}[\dX]$/.test(value)) {
    return {
      valid: false,
      message: t(
        dict,
        "身份证号需要 18 位，最后一位只能是数字或 X。",
        "ID numbers must use 18 characters with the last digit as 0-9 or X.",
      ),
    } as const;
  }

  const birthday = `${value.slice(6, 10)}-${value.slice(10, 12)}-${value.slice(12, 14)}`;
  if (!isValidCalendarDate(birthday)) {
    return {
      valid: false,
      message: t(dict, "出生日期片段无效。", "The birth date segment is invalid."),
    } as const;
  }

  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodes = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  const sum = value
    .slice(0, 17)
    .split("")
    .reduce((total, digit, index) => total + Number(digit) * weights[index], 0);
  const expected = checkCodes[sum % 11];

  if (expected !== value[17]) {
    return {
      valid: false,
      message: t(dict, `校验位不匹配，应为 ${expected}。`, `Checksum mismatch. Expected ${expected}.`),
    } as const;
  }

  const birthDate = dayjs(birthday);
  const today = dayjs();
  let age = today.year() - birthDate.year();
  if (today.format("MMDD") < birthDate.format("MMDD")) {
    age -= 1;
  }

  return {
    valid: true,
    region: cnIdRegionMap[value.slice(0, 2)]?.[dict.locale] ?? t(dict, "未知地区", "Unknown region"),
    birthday,
    age,
    gender: Number(value[16]) % 2 === 0 ? t(dict, "女", "Female") : t(dict, "男", "Male"),
    checkDigit: expected,
  } as const;
}

function isValidCalendarDate(input: string) {
  const matched = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!matched) {
    return false;
  }
  const [, year, month, day] = matched;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return (
    date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day)
  );
}
