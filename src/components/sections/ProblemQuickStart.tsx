import Link from "next/link";
import {
  CircuitBoard,
  Droplets,
  Drill,
  Snowflake,
  SprayCan,
  ThermometerSnowflake,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/whatsapp";

const issues = [
  {
    title: "AC not cooling",
    text: "Running but the room stays warm",
    href: "/booking?service=ac-repair",
    icon: ThermometerSnowflake,
  },
  {
    title: "Water leaking",
    text: "Dripping from the indoor unit",
    href: "/booking?service=ac-repair",
    icon: Droplets,
  },
  {
    title: "Needs gas",
    text: "Weak cooling after a refill before",
    href: "/booking?service=gas-charging",
    icon: Snowflake,
  },
  {
    title: "Card / PCB fault",
    text: "Error codes or unit won't start",
    href: "/booking?service=inverter-ac-card-repair",
    icon: CircuitBoard,
  },
  {
    title: "Deep cleaning",
    text: "Dusty airflow or musty smell",
    href: "/booking?service=foamjet-deep-cleaning",
    icon: SprayCan,
  },
  {
    title: "New installation",
    text: "Mount and set up a split AC",
    href: "/booking?service=ac-installation",
    icon: Drill,
  },
] as const;

export function ProblemQuickStart() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue/30 to-transparent"
      />
      <Container>
        <SectionHeading
          eyebrow="Start here"
          title="What's wrong with your AC?"
          description="Tap the issue that matches — we'll take you straight to a booking request."
        />

        <ul className="stagger mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map(({ title, text, href, icon: Icon }) => (
            <li key={title} className="reveal">
              <Link
                href={href}
                className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-page p-5 transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-1.5 hover:border-blue/40 hover:bg-white hover:shadow-lift"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-blue shadow-soft ring-1 ring-line transition-colors duration-200 group-hover:bg-blue group-hover:text-white group-hover:ring-blue">
                  <Icon aria-hidden className="size-5 transition-transform duration-200 group-hover:scale-110" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-display text-base font-bold text-navy">{title}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-muted">
          Not sure which service you need?{" "}
          <a
            href={whatsappUrl("Hello AirFixPro, my AC has a problem and I am not sure which service I need. Can you help?")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-whatsapp hover:underline"
          >
            <WhatsAppIcon className="size-4" /> Describe it on WhatsApp
          </a>
        </p>
      </Container>
    </section>
  );
}
