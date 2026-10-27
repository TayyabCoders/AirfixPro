import type { Metadata } from "next";
import { CalendarCheck, MessageSquareText, Phone, ShieldCheck } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Book an AC Service",
  description: "Request an AC repair, service, cleaning or installation visit in Karachi. AirFixPro will contact you to confirm the appointment.",
  alternates: { canonical: "/booking" },
};

const nextSteps = [
  { icon: MessageSquareText, title: "We review your request", text: "Our team checks the service and location you shared." },
  { icon: Phone, title: "We contact you", text: `We call or WhatsApp you on the number you provide.` },
  { icon: CalendarCheck, title: "Appointment confirmed", text: "Your visit is booked only once we confirm a time together." },
];

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a service"
        title="Request an AC service visit"
        description="Fill in a few details and we will get back to you to confirm a suitable appointment. Prefer to chat? WhatsApp works too."
        crumbs={[{ label: "Book a Service" }]}
      />

      <section className="bg-ice py-14 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-10">
            <h2 className="text-2xl font-bold">Your booking details</h2>
            <p className="mt-2 mb-8 text-muted">A booking request is not a confirmed appointment until AirFixPro confirms it with you.</p>
            <InquiryForm formId="booking" prefillFromQuery={{ service: "service" }} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="rounded-3xl bg-navy p-7 text-white">
              <h2 className="text-lg font-bold text-white">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {nextSteps.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue/20 text-cyan">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-white">{title}</span>
                      <span className="text-sm text-cyan/75">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-line bg-white p-7">
              <h2 className="text-lg font-bold">Prefer to talk?</h2>
              <div className="mt-5 grid gap-3">
                <ButtonLink href={whatsappUrl(whatsappMessages.booking)} variant="whatsapp">
                  <WhatsAppIcon /> WhatsApp us
                </ButtonLink>
                <ButtonLink href={site.phone.href} variant="outline">
                  <Phone aria-hidden className="size-4" /> {site.phone.display}
                </ButtonLink>
              </div>
              <p className="mt-5 flex gap-2 text-sm text-muted">
                <ShieldCheck aria-hidden className="size-5 shrink-0 text-blue" /> {site.warranty} on every service, as advertised.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
