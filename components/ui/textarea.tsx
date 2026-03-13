"use client";

import * as React from "react";
import { CircleX } from "lucide-react";

import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  clearable?: boolean;
  clearButtonClassName?: string;
};

function getTextareaValue(value: TextareaProps["value"] | TextareaProps["defaultValue"]) {
  if (value == null) {
    return "";
  }

  return String(value);
}

function setNativeTextareaValue(textarea: HTMLTextAreaElement, value: string) {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value");
  descriptor?.set?.call(textarea, value);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

function Textarea({
  className,
  isRequired,
  isInvalid,
  errorMessage: _errorMessage,
  clearable = true,
  clearButtonClassName,
  required,
  "aria-invalid": ariaInvalid,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState(() => getTextareaValue(value ?? defaultValue));

  React.useEffect(() => {
    if (isControlled) {
      setInnerValue(getTextareaValue(value));
    }
  }, [isControlled, value]);

  const currentValue = isControlled ? getTextareaValue(value) : innerValue;
  const canClear = clearable && !props.disabled && !props.readOnly && currentValue.length > 0;

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!isControlled) {
      setInnerValue(event.target.value);
    }
    onChange?.(event);
  }

  function handleClear() {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    if (!isControlled) {
      setInnerValue("");
    }

    setNativeTextareaValue(textarea, "");
    textarea.focus();
  }

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        data-slot="textarea"
        className={cn(
          "flex min-h-24 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          canClear && "pr-10",
          className,
        )}
        {...props}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        required={required ?? isRequired}
        aria-invalid={ariaInvalid ?? (isInvalid ? true : undefined)}
      />
      {canClear ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear text"
          title="Clear text"
          className={cn(
            "absolute top-3 right-3 z-10 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            clearButtonClassName,
          )}
        >
          <CircleX className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

export { Textarea };
