import { site } from "../config/site.ts";

export const whatsappMessages = {
  general: "Hello AirFixPro, I would like to inquire about your AC services.",
  booking: "Hello AirFixPro, I would like to request an AC service appointment.",
  pricing: "Hello AirFixPro, I would like to confirm your AC service pricing.",
  office: "Hello AirFixPro, I am interested in your annual office AC care plans.",
} as const;

/** Opens a prefilled chat. It never sends anything by itself. */
export function whatsappUrl(message: string = whatsappMessages.general): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function serviceMessage(serviceTitle: string): string {
  return `Hello AirFixPro, I would like to request ${serviceTitle}. Please share availability.`;
}
