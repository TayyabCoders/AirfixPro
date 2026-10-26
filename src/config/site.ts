import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "AirFixPro",
  description: "Flight booking foundation — scalable Next.js starter.",
  url: "https://airfixpro.com",
  nav: [
    { label: "Home", href: "/" },
    { label: "Flights", href: "/flights" },
    { label: "About", href: "/about" },
  ],
  footerNav: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};
