"use client";

import { AlertCircle, ChevronDown } from "lucide-react";
import type { FieldConfig } from "@/lib/forms";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  field: FieldConfig;
  value: string;
  error?: string;
  formId: string;
  disabled?: boolean;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
};

const control =
  "w-full rounded-field border bg-white px-4 text-[0.98rem] text-ink placeholder:text-muted/60 transition-[border-color,box-shadow] duration-200 outline-none disabled:cursor-not-allowed disabled:bg-cream disabled:opacity-70";
const controlOk = "border-line hover:border-forest/25 focus:border-brand focus:ring-4 focus:ring-brand/20";
const controlErr = "border-danger bg-danger-soft/40 focus:border-danger focus:ring-4 focus:ring-danger/15";

const inputType: Record<string, string> = { email: "email", tel: "tel", postal: "text", number: "text", text: "text" };
const inputMode: Record<string, "email" | "tel" | "numeric" | undefined> = {
  email: "email",
  tel: "tel",
  postal: "numeric",
  number: "numeric",
};

export function FormField({ field, value, error, formId, disabled, onChange, onBlur }: FormFieldProps) {
  const id = `${formId}-${field.name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [field.hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name: field.name,
    disabled,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "aria-required": field.required || undefined,
  } as const;

  const label = (
    <>
      {field.label}
      {field.required ? (
        <span aria-hidden className="ml-0.5 text-brand-strong">
          *
        </span>
      ) : (
        <span className="ml-1.5 text-xs font-medium text-muted">(facultatif)</span>
      )}
    </>
  );

  const errorMessage = error && (
    <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-danger">
      <AlertCircle aria-hidden className="size-4 shrink-0" />
      {error}
    </p>
  );

  const hint = field.hint && (
    <p id={hintId} className="mt-2 text-sm text-muted">
      {field.hint}
    </p>
  );

  if (field.type === "radio") {
    return (
      <fieldset className="sm:col-span-2" aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
        <legend className="mb-3 text-sm font-semibold text-forest">{label}</legend>
        <div className="flex flex-wrap gap-3">
          {field.options?.map((opt) => {
            const optId = `${id}-${opt.value}`;
            const checked = value === opt.value;
            return (
              <label
                key={opt.value}
                htmlFor={optId}
                className={cn(
                  "relative inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full border px-5 text-[0.95rem] font-medium transition-colors",
                  "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/25",
                  checked ? "border-brand bg-sage text-forest" : "border-line bg-white text-muted hover:border-forest/25",
                  error && !checked && "border-danger/60",
                  disabled && "pointer-events-none opacity-70",
                )}
              >
                <input
                  id={optId}
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onChange(field.name, opt.value)}
                  onBlur={() => onBlur(field.name)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                    checked ? "border-brand-strong" : "border-line",
                  )}
                >
                  <span className={cn("size-2.5 rounded-full bg-brand-strong transition-transform", checked ? "scale-100" : "scale-0")} />
                </span>
                {opt.label}
              </label>
            );
          })}
        </div>
        {hint}
        {errorMessage}
      </fieldset>
    );
  }

  const full = field.full ?? field.type === "textarea";

  return (
    <div className={cn(full && "sm:col-span-2")}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-forest">
        {label}
      </label>

      {field.type === "textarea" ? (
        <textarea
          {...common}
          rows={5}
          value={value}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          onBlur={() => onBlur(field.name)}
          className={cn(control, "min-h-36 resize-y py-3.5 leading-relaxed", error ? controlErr : controlOk)}
        />
      ) : field.type === "select" ? (
        <div className="relative">
          <select
            {...common}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            className={cn(control, "h-13 appearance-none pr-11", !value && "text-muted/70", error ? controlErr : controlOk)}
          >
            <option value="" disabled>
              {field.placeholder ?? "Sélectionnez une option"}
            </option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4.5 -translate-y-1/2 text-muted" />
        </div>
      ) : (
        <input
          {...common}
          type={inputType[field.type]}
          inputMode={inputMode[field.type]}
          autoComplete={field.autoComplete}
          value={value}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          onBlur={() => onBlur(field.name)}
          className={cn(control, "h-13", error ? controlErr : controlOk)}
        />
      )}
      {hint}
      {errorMessage}
    </div>
  );
}
