import Image from "next/image";
import { Building2, CalendarClock, Gauge, PackageCheck, Receipt, ShieldCheck, UserCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";

const reasons = [
  { icon: UserCheck, title: "Experienced technicians", text: "Professional technicians who explain the problem before fixing it." },
  { icon: Gauge, title: "Modern service equipment", text: "Pressure gauges, FoamJet cleaning kits and proper tools." },
  { icon: Receipt, title: "Transparent, fair pricing", text: "Published rates, with the final scope agreed upfront." },
  { icon: PackageCheck, title: "Genuine spare parts", text: "Genuine parts are used where a replacement is required." },
  { icon: Building2, title: "Homes & businesses", text: "Residential visits and commercial maintenance plans." },
  { icon: CalendarClock, title: "Scheduled visits", text: "Appointments arranged around your time, subject to availability." },
  { icon: ShieldCheck, title: "Service warranty", text: "1-month warranty on every service, as advertised." },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-24">
      <div aria-hidden className="absolute -top-40 -left-40 size-[32rem] rounded-full bg-blue/25 blur-3xl" />
      <div aria-hidden className="absolute -right-32 bottom-0 size-[28rem] rounded-full bg-blue/15 blur-3xl" />
      <Container className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            dark
            align="left"
            eyebrow={site.tagline}
            title="Why Choose AirFixPro?"
            description="Reliable AC care built on honest advice, clear pricing and work you can check."
          />
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/10">
            <Image
              src="/images/installation.jpg"
              alt="Technician checking refrigerant pressure on an AC outdoor unit"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
            <p className="absolute right-5 bottom-5 left-5 font-display text-xl font-bold text-white sm:text-2xl">
              {site.promise}
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, text }, i) => {
            const isLast = i === reasons.length - 1;
            return (
              <li
                key={title}
                className={`reveal rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-blue/60 hover:bg-white/[0.07] ${
                  isLast ? "flex items-start gap-4 sm:col-span-2" : ""
                }`}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue/15 text-cyan ring-1 ring-blue/30">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div className={isLast ? "min-w-0" : ""}>
                  <h3 className={`${isLast ? "mt-0" : "mt-4"} text-base font-bold text-white`}>{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cyan/75">{text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
