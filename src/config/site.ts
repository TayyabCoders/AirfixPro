import { toPkInternational } from "@/lib/validation";

export type NavItem = { label: string; href: string };

const phoneLocal = "0343-7894566";
const phoneDigits = toPkInternational(phoneLocal);
if (!phoneDigits) throw new Error(`Invalid business phone number: ${phoneLocal}`);

/**
 * Single source of truth for business details.
 * Only verified, business-supplied information belongs here.
 */
export const site = {
  name: "AirFixPro",
  tagline: "Quality Work, Honest Service.",
  marketingTagline: "Quick Repairs • Lasting Chill.",
  promise: "Your Comfort, Our Priority.",
  description:
    "Professional AC repair, deep cleaning, installation, and maintenance for homes and businesses in Karachi.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  phone: {
    display: phoneLocal,
    international: `+${phoneDigits.slice(0, 2)} ${phoneDigits.slice(2, 5)} ${phoneDigits.slice(5)}`,
    href: `tel:+${phoneDigits}`,
  },
  whatsappNumber: phoneDigits,
  email: "airfixpro16@gmail.com",
  address: {
    street: "Madina Luxury Apartment, Office No. 2, Block 4",
    area: "Gulistan-e-Jauhar",
    city: "Karachi",
    region: "Sindh",
    country: "Pakistan",
    countryCode: "PK",
  },
  warranty: "1-month service warranty",
  logo: "/logo/airfixpro-logo.png",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.area}, ${site.address.city}, ${site.address.country}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Office AC Care", href: "/office-ac-care" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const secondaryNav: NavItem[] = [
  { label: "Service Areas", href: "/service-areas" },
  { label: "FAQ", href: "/faq" },
  { label: "Book a Service", href: "/booking" },
];
