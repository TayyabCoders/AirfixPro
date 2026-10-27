import { officePlans } from "../data/office-plans.ts";
import { services } from "../data/services.ts";
import { optionLabel, type FieldDef, type FieldValues } from "./validation.ts";
import { whatsappMessages } from "./whatsapp.ts";

export type FormId = "booking" | "office" | "contact";

type FormDef = {
  subject: (v: FieldValues) => string;
  whatsappIntro: string;
  submitLabel: string;
  successTitle: string;
  successText: string;
  fields: FieldDef[];
};

const nameField: FieldDef = { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name", maxLength: 80 };
const phoneField: FieldDef = {
  name: "phone",
  label: "Phone / WhatsApp",
  type: "tel",
  required: true,
  autoComplete: "tel",
  placeholder: "03XX-XXXXXXX",
};
const emailField: FieldDef = { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "Optional" };

export const forms: Record<FormId, FormDef> = {
  booking: {
    subject: (v) => `Booking request: ${v.service} — ${v.name}`,
    whatsappIntro: whatsappMessages.booking,
    submitLabel: "Send booking request",
    successTitle: "Booking request received",
    successText:
      "Thank you. This is a request, not yet a confirmed appointment. AirFixPro will contact you to confirm the date and time.",
    fields: [
      nameField,
      phoneField,
      {
        name: "service",
        label: "Service needed",
        type: "select",
        required: true,
        options: [...services.map((s) => ({ value: s.slug, label: s.title })), { value: "other", label: "Not sure / Other" }],
      },
      { name: "date", label: "Preferred date", type: "date", required: true },
      {
        name: "address",
        label: "Service address",
        type: "text",
        required: true,
        autoComplete: "street-address",
        placeholder: "House / flat, street, area, Karachi",
        maxLength: 250,
        wide: true,
      },
      { name: "time", label: "Preferred time", type: "select", options: ["Morning", "Afternoon", "Evening", "Any time"] },
      emailField,
      { name: "acType", label: "AC type / tonnage", type: "text", placeholder: "e.g. 1.5 ton inverter split", maxLength: 80, wide: true },
      { name: "problem", label: "Describe the problem", type: "textarea", placeholder: "What is the AC doing (or not doing)?", wide: true },
      { name: "notes", label: "Additional notes", type: "textarea", maxLength: 500, wide: true },
    ],
  },
  office: {
    subject: (v) => `Office AC Care inquiry: ${v.company} (${v.units} ACs)`,
    whatsappIntro: whatsappMessages.office,
    submitLabel: "Request a quotation",
    successTitle: "Quotation request received",
    successText:
      "Thank you. AirFixPro will contact you to discuss your requirements. A contract is only confirmed once both parties sign the written agreement.",
    fields: [
      { ...nameField, label: "Contact person" },
      { name: "company", label: "Company / office name", type: "text", required: true, autoComplete: "organization", maxLength: 120 },
      phoneField,
      emailField,
      { name: "location", label: "Office location", type: "text", required: true, placeholder: "Area, Karachi", maxLength: 250, wide: true },
      { name: "units", label: "Number of AC units", type: "number", required: true, min: 1, max: 500 },
      {
        name: "plan",
        label: "Preferred plan",
        type: "select",
        options: [...officePlans.map((p) => ({ value: p.id, label: p.name })), { value: "advise", label: "Not sure, please advise" }],
      },
      { name: "message", label: "Message", type: "textarea", placeholder: "AC types, current issues, timing…", wide: true },
    ],
  },
  contact: {
    subject: (v) => `Website inquiry from ${v.name}`,
    whatsappIntro: whatsappMessages.general,
    submitLabel: "Send message",
    successTitle: "Message received",
    successText: "Thank you for contacting AirFixPro. We will get back to you as soon as possible.",
    fields: [
      nameField,
      phoneField,
      { ...emailField, wide: true },
      { name: "message", label: "Message", type: "textarea", required: true, wide: true },
    ],
  },
};

export function isFormId(value: unknown): value is FormId {
  return typeof value === "string" && Object.hasOwn(forms, value);
}

/** "Label: value" lines for filled fields, with select values shown as their labels. */
export function summarize(formId: FormId, values: FieldValues): string {
  return forms[formId].fields
    .filter((f) => values[f.name])
    .map((f) => {
      const value = values[f.name] ?? "";
      const option = f.options?.find((o) => (typeof o === "string" ? o : o.value) === value);
      return `${f.label}: ${option ? optionLabel(option) : value}`;
    })
    .join("\n");
}

export function buildWhatsAppMessage(formId: FormId, values: FieldValues): string {
  const details = summarize(formId, values);
  return details ? `${forms[formId].whatsappIntro}\n\n${details}` : forms[formId].whatsappIntro;
}
