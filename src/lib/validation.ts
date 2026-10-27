// Pure helpers shared by the browser forms and the API route. Keep this file free of
// "@/..." imports so `node --test` can run its checks directly.

export type FieldType = "text" | "textarea" | "tel" | "email" | "date" | "number" | "select";

export type FieldOption = string | { value: string; label: string };

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: readonly FieldOption[];
  /** Grid span in the form layout. */
  wide?: boolean;
  hint?: string;
};

export type FieldValues = Record<string, string>;
export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** "0343-7894566" | "+92 343 7894566" | "0092..." -> "923437894566", or null if not a PK number. */
export function toPkInternational(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  let national: string;
  if (digits.startsWith("0092")) national = digits.slice(4);
  else if (digits.startsWith("92")) national = digits.slice(2);
  else if (digits.startsWith("0")) national = digits.slice(1);
  else return null;
  // Mobile (3XXXXXXXXX) and landline (e.g. 21XXXXXXXX) numbers are 10 digits nationally.
  return /^[1-9]\d{9}$/.test(national) ? `92${national}` : null;
}

/** Today's date in Karachi as YYYY-MM-DD, independent of server/browser timezone. */
export function karachiToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function optionValue(option: FieldOption): string {
  return typeof option === "string" ? option : option.value;
}

export function optionLabel(option: FieldOption): string {
  return typeof option === "string" ? option : option.label;
}

function fieldError(field: FieldDef, value: string, today: string): string | null {
  const { label } = field;
  const max = field.maxLength ?? (field.type === "textarea" ? 1000 : 160);
  if (value.length > max) return `${label} must be ${max} characters or fewer.`;

  switch (field.type) {
    case "tel":
      return toPkInternational(value) ? null : "Enter a valid Pakistan phone number, e.g. 0343-7894566.";
    case "email":
      return EMAIL_RE.test(value) ? null : "Enter a valid email address.";
    case "date":
      if (!DATE_RE.test(value) || Number.isNaN(Date.parse(value))) return "Choose a valid date.";
      return value < today ? "Choose today or a future date." : null;
    case "number": {
      const n = Number(value);
      const lo = field.min ?? 1;
      const hi = field.max ?? 1000;
      return Number.isInteger(n) && n >= lo && n <= hi ? null : `Enter a whole number between ${lo} and ${hi}.`;
    }
    case "select":
      return (field.options ?? []).some((o) => optionValue(o) === value)
        ? null
        : `Choose a valid ${label.toLowerCase()}.`;
    case "text":
    case "textarea":
      return null;
    default: {
      const unreachable: never = field.type;
      throw new Error(`Unknown field type: ${String(unreachable)}`);
    }
  }
}

/** Validates raw form data. Returns trimmed `values` and human-readable `errors` keyed by field name. */
export function validateFields(
  fields: readonly FieldDef[],
  data: Record<string, unknown>,
  { today = karachiToday() }: { today?: string } = {},
): { values: FieldValues; errors: FieldErrors } {
  const values: FieldValues = {};
  const errors: FieldErrors = {};

  for (const field of fields) {
    const raw = data[field.name];
    const value = typeof raw === "string" ? raw.trim() : raw == null ? "" : String(raw).trim();
    values[field.name] = value;

    if (!value) {
      if (field.required) errors[field.name] = `${field.label} is required.`;
      continue;
    }
    const error = fieldError(field, value, today);
    if (error) errors[field.name] = error;
  }

  return { values, errors };
}
