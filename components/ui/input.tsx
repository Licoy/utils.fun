"use client";

import * as React from "react";
import { CircleX } from "lucide-react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  clearable?: boolean;
  clearButtonClassName?: string;
};

const nonClearableInputTypes = new Set([
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "file",
  "hidden",
  "image",
  "month",
  "radio",
  "range",
  "reset",
  "submit",
  "time",
  "week",
]);

function getInputValue(value: InputProps["value"] | InputProps["defaultValue"]) {
  if (value == null) {
    return "";
  }

  return Array.isArray(value) ? value.join(", ") : String(value);
}

function setNativeInputValue(input: HTMLInputElement, value: string) {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  descriptor?.set?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function Input({
  className,
  type,
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
}: InputProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState(() => getInputValue(value ?? defaultValue));

  React.useEffect(() => {
    if (isControlled) {
      setInnerValue(getInputValue(value));
    }
  }, [isControlled, value]);

  const currentValue = isControlled ? getInputValue(value) : innerValue;
  const canClear =
    clearable &&
    !props.disabled &&
    !props.readOnly &&
    currentValue.length > 0 &&
    !nonClearableInputTypes.has(type ?? "text");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) {
      setInnerValue(event.target.value);
    }
    onChange?.(event);
  }

  function handleClear() {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    if (!isControlled) {
      setInnerValue("");
    }

    setNativeInputValue(input, "");
    input.focus();
  }

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        data-slot="input"
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
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
          aria-label="Clear input"
          title="Clear input"
          className={cn(
            "absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            clearButtonClassName,
          )}
        >
          <CircleX className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

export { Input };
