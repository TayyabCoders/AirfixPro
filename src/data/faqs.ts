import { site } from "@/config/site";
import { formatPKR } from "@/lib/utils";
import { getPrices } from "@/data/pricing";
import { officePlans } from "@/data/office-plans";

export type Faq = { q: string; a: string; featured?: boolean };

const [gas1, gas15] = getPrices(["leak-gas-1-ton", "leak-gas-1-5-ton"]);
const [master, card] = getPrices(["master-service", "inverter-card"]);

// TODO(business): confirm the written warranty policy and exclusions before launch.
export const faqs: Faq[] = [
  {
    q: "What AC services does AirFixPro provide?",
    a: "AC repair, FoamJet deep cleaning, master service, installation, gas charging, leak detection and repair, inverter AC card (PCB) repair, indoor and outdoor unit cleaning, and maintenance for homes and offices in Karachi.",
    featured: true,
  },
  {
    q: "Do you repair inverter ACs?",
    a: `Yes. We diagnose and repair inverter AC control boards (cards). Card repair starts from ${card ? formatPKR(card.amount) : "our listed rate"}; the final price is confirmed after diagnosis and before work begins.`,
    featured: true,
  },
  {
    q: "Do you offer AC installation?",
    a: "Yes. We install split AC indoor and outdoor units, including piping, drain and electrical connections, followed by a test run.",
  },
  {
    q: "What is included in a master service?",
    a: `A master service is a complete service visit: cleaning of the indoor and outdoor units, filter and drain checks, a general inspection, and a cooling check. It is listed at ${master ? formatPKR(master.amount) : "our current rate"}.`,
  },
  {
    q: "How much does gas charging cost?",
    a: `Gas charging is done together with leak repair: ${gas1 ? formatPKR(gas1.amount) : ""} for a 1-ton AC and ${gas15 ? formatPKR(gas15.amount) : ""} for a 1.5-ton AC. The technician confirms the work needed before starting.`,
  },
  {
    q: "How do I book a technician?",
    a: `Send a booking request on our website, message us on WhatsApp, or call ${site.phone.display}. We will contact you to confirm a suitable appointment.`,
    featured: true,
  },
  {
    q: "Is the one-month warranty applicable to every service?",
    a: "AirFixPro advertises a one-month warranty on every service. Please confirm the warranty coverage for your specific repair with us before work begins.",
    featured: true,
  },
  {
    q: "Do you offer annual office AC maintenance plans?",
    a: `Yes. Office AC Care plans are available for ${officePlans.map((p) => p.units).join(", ")} AC units, with final scope and terms set out in a written contract.`,
    featured: true,
  },
  {
    q: "How does the office contract payment schedule work?",
    a: "50% of the plan price is paid in advance when the contract is confirmed, and the remaining 50% at the end of the contract, as mutually agreed. No payment is collected online.",
  },
  {
    q: "Are appointments available on the same day?",
    a: "Same-day visits may be possible depending on technician availability. All appointments are subject to confirmation, so please contact us to check the earliest available slot.",
    featured: true,
  },
];
