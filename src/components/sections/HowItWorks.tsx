import { CalendarCheck, MessageSquareText, ThumbsUp } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { icon: MessageSquareText, title: "Contact Us", text: "Tell us about your AC issue by WhatsApp, phone or the booking form." },
  { icon: CalendarCheck, title: "Schedule a Visit", text: "We confirm a suitable appointment time with you." },
  { icon: ThumbsUp, title: "Get Your Service", text: "The technician performs the agreed work and checks the result." },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Simple process" title="How It Works" description="Three easy steps from first message to a cooler room." />
        <div className="relative mt-14">
          <div aria-hidden className="absolute top-[4.25rem] right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent md:block" />
          <ol className="stagger relative grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="reveal relative flex flex-col items-center rounded-2xl border border-line bg-page p-7 text-center transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-blue/30 hover:shadow-soft">
              <span className="relative grid size-20 place-items-center rounded-full bg-white shadow-soft ring-1 ring-line">
                <Icon aria-hidden className="size-8 text-blue" />
                <span className="absolute -top-1 -right-1 grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 max-w-xs leading-relaxed text-muted">{text}</p>
            </li>
          ))}
          </ol>
        </div>
        <p className="mt-8 text-center text-sm text-muted">Appointment requests are subject to confirmation and technician availability.</p>
      </Container>
    </section>
  );
}
