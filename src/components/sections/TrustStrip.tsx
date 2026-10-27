import { BadgeCheck, HardHat, Receipt, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";

const items = [
  { icon: BadgeCheck, title: "Professional Service", text: "Careful, tidy work in your home or office." },
  { icon: HardHat, title: "Skilled Technicians", text: "Skilled in split and inverter AC systems." },
  { icon: Receipt, title: "Transparent Pricing", text: "Published rates, scope agreed before work." },
  { icon: ShieldCheck, title: "Service Warranty", text: "1-month warranty on every service." },
];

export function TrustStrip() {
  return (
    <section aria-label="Why customers trust AirFixPro" className="relative z-10 bg-ice pb-6">
      <Container>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-4 bg-white p-5 sm:p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ice text-blue">
                <Icon aria-hidden className="size-5" />
              </span>
              <div>
                <p className="font-display font-bold text-navy">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
