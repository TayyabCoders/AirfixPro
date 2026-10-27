"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { buildWhatsAppMessage, forms, type FormId } from "@/lib/forms";
import { cn } from "@/lib/utils";
import {
  karachiToday,
  optionLabel,
  optionValue,
  validateFields,
  type FieldDef,
  type FieldErrors,
  type FieldValues,
} from "@/lib/validation";
import { whatsappUrl } from "@/lib/whatsapp";

type Status = "idle" | "submitting" | "success" | "unavailable" | "error";

type InquiryFormProps = {
  formId: FormId;
  /** Maps URL query keys to select fields, e.g. { service: "service" } for /booking?service=ac-repair. */
  prefillFromQuery?: Record<string, string>;
};

const inputClass =
  "block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-navy shadow-sm transition-colors placeholder:text-muted/60 hover:border-blue/50 focus:border-blue focus:ring-4 focus:ring-blue/15 focus:outline-none aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/15";

const statusMessages: Partial<Record<Status, string>> = {
  unavailable:
    "Online requests are not connected yet, so your details were not sent. Please send them to us on WhatsApp instead — your message is prepared below.",
  error: "We could not send your request right now. Please try again, or send your details on WhatsApp.",
};

function readForm(form: HTMLFormElement): Record<string, string> {
  return Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, typeof v === "string" ? v : ""]));
}

export function InquiryForm({ formId, prefillFromQuery }: InquiryFormProps) {
  const def = forms[formId];
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [sentValues, setSentValues] = useState<FieldValues>({});

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    form.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach((el) => (el.min = karachiToday()));
    if (!prefillFromQuery) return;
    const params = new URLSearchParams(window.location.search);
    for (const [key, fieldName] of Object.entries(prefillFromQuery)) {
      const value = params.get(key);
      const field = def.fields.find((f) => f.name === fieldName);
      const el = form.elements.namedItem(fieldName);
      if (value && el instanceof HTMLSelectElement && field?.options?.some((o) => optionValue(o) === value)) el.value = value;
    }
  }, [def, prefillFromQuery]);

  const fieldId = (name: string) => `${uid}-${name}`;

  function focusFirstError(errs: FieldErrors) {
    const first = def.fields.find((f) => errs[f.name]);
    if (first) document.getElementById(fieldId(first.name))?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const raw = readForm(e.currentTarget);
    const { values, errors: clientErrors } = validateFields(def.fields, raw);
    setErrors(clientErrors);
    setNotice(null);
    setSentValues(values);
    if (Object.keys(clientErrors).length) {
      focusFirstError(clientErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: formId, website: raw.website ?? "", ...values }),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: FieldErrors };
      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        focusFirstError(data.errors);
      } else if (res.status === 503) {
        setStatus("unavailable");
      } else if (res.status === 429) {
        setStatus("error");
        setNotice("Too many requests from this connection. Please wait a few minutes, or contact us on WhatsApp.");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function openWhatsApp() {
    const form = formRef.current;
    const values = form ? validateFields(def.fields, readForm(form)).values : sentValues;
    window.open(whatsappUrl(buildWhatsAppMessage(formId, values)), "_blank", "noopener,noreferrer");
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-2xl border border-success/30 bg-white p-7 sm:p-9">
        <span className="grid size-14 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 aria-hidden className="size-7" />
        </span>
        <h3 className="text-2xl font-bold">{def.successTitle}</h3>
        <p className="leading-relaxed text-muted">{def.successText}</p>
        <p className="text-sm text-muted">
          Need a faster reply? Call{" "}
          <a href={site.phone.href} className="font-semibold text-blue hover:underline">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const fallback = statusMessages[status] ?? null;
  const submitting = status === "submitting";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={submitting} className="relative space-y-6">
      {errorCount > 0 ? (
        <div role="alert" className="flex gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>
            Please fix {errorCount === 1 ? "1 field" : `${errorCount} fields`} highlighted below.
          </p>
        </div>
      ) : null}

      {fallback || notice ? (
        <div role="alert" className="space-y-4 rounded-xl border border-blue/30 bg-ice p-5 text-sm text-navy">
          <p className="flex gap-3">
            <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
            {notice ?? fallback}
          </p>
          <a
            href={whatsappUrl(buildWhatsAppMessage(formId, sentValues))}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass({ variant: "whatsapp", size: "sm" })}
          >
            <WhatsAppIcon className="size-4" /> Open WhatsApp with my details
          </a>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {def.fields.map((field) => (
          <Field key={field.name} field={field} id={fieldId(field.name)} error={errors[field.name]} />
        ))}
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>Leave this field empty</label>
        <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className={buttonClass({ size: "lg", className: "sm:min-w-56" })}>
          {submitting ? <Loader2 aria-hidden className="size-5 animate-spin" /> : <Send aria-hidden className="size-5" />}
          {submitting ? "Sending…" : def.submitLabel}
        </button>
        <button type="button" onClick={openWhatsApp} className={buttonClass({ variant: "outline", size: "lg" })}>
          <WhatsAppIcon className="size-5 text-whatsapp" /> Send via WhatsApp instead
        </button>
      </div>
      <p className="text-xs leading-relaxed text-muted">
        Fields marked <span className="text-danger">*</span> are required. We only use your details to respond to this request. Never share
        passwords or card numbers.
      </p>
    </form>
  );
}

function Field({ field, id, error }: { field: FieldDef; id: string; error?: string }) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const common = {
    id,
    name: field.name,
    required: field.required,
    placeholder: field.placeholder,
    autoComplete: field.autoComplete,
    maxLength: field.maxLength,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": cn(error && errorId, field.hint && hintId) || undefined,
    className: inputClass,
  };

  return (
    <div className={cn("flex flex-col gap-2", field.wide && "sm:col-span-2")}>
      <label htmlFor={id} className="text-sm font-semibold text-navy">
        {field.label}
        {field.required ? (
          <span aria-hidden className="ml-0.5 text-danger">
            *
          </span>
        ) : null}
      </label>
      {field.type === "textarea" ? (
        <textarea {...common} rows={4} className={cn(inputClass, "resize-y")} />
      ) : field.type === "select" ? (
        <div className="relative">
          <select {...common} defaultValue="" className={cn(inputClass, "appearance-none pr-11")}>
            <option value="" disabled>
              Select…
            </option>
            {field.options?.map((o) => (
              <option key={optionValue(o)} value={optionValue(o)}>
                {optionLabel(o)}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted" />
        </div>
      ) : (
        <input
          {...common}
          type={field.type}
          inputMode={field.type === "tel" ? "tel" : field.type === "number" ? "numeric" : undefined}
          min={field.type === "number" ? field.min : undefined}
          max={field.type === "number" ? field.max : undefined}
        />
      )}
      {field.hint ? (
        <p id={hintId} className="text-xs text-muted">
          {field.hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-sm font-medium text-danger">
          <AlertCircle aria-hidden className="size-4 shrink-0" /> {error}
        </p>
      ) : null}
    </div>
  );
}
