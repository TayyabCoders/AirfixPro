import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, FileText, Info, Wallet } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { OfficePlanCard } from "@/components/pricing/OfficePlanCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { contractDocumentation, officeInclusions, officePlans, paymentSchedule } from "@/data/office-plans";
import { formatPKR } from "@/lib/utils";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Office AC Maintenance Contracts in Karachi",
  description:
    "AirFixPro Office AC Care: annual AC maintenance plans for offices in Karachi with documented visits, written contracts and a 50/50 payment schedule.",
  alternates: { canonical: "/office-ac-care" },
};

export default function OfficeCarePage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial AC maintenance"
        title="AirFixPro Office AC Care"
        description="Keep your office AC systems running efficiently, reliably, and hassle-free with AirFixPro's professional annual AC care plans."
        crumbs={[{ label: "Office AC Care" }]}
      >
        <ButtonLink href="#office-inquiry">Request a quotation</ButtonLink>
        <ButtonLink href={whatsappUrl(whatsappMessages.office)} variant="outline">
          <WhatsAppIcon className="size-5 text-whatsapp" /> Discuss on WhatsApp
        </ButtonLink>
      </PageHero>

      <section className="bg-page py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Annual plans" title="Choose the plan that fits your office" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {officePlans.map((plan) => (
              <li key={plan.id} className="reveal">
                <OfficePlanCard plan={plan} detailed />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-muted">
            Have a different number of AC units? Request a quotation and we will discuss your requirements.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading align="left" eyebrow="Included facilities" title="What the plans cover" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {officeInclusions.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-page p-4 text-navy">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" /> {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex gap-3 rounded-2xl bg-ice p-5 text-sm leading-relaxed text-navy">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
              These are the facilities offered with Office AC Care. Visit frequency, coverage limits, parts and the exact scope are set
              out in your written contract before it is confirmed.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift ring-1 ring-line">
            <Image src="/images/office-ac-care.jpg" alt="Technician inspecting wall-mounted ACs in a modern office" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
        <div aria-hidden className="absolute -top-32 right-0 size-[30rem] rounded-full bg-blue/20 blur-3xl" />
        <Container className="relative grid gap-8 lg:grid-cols-2">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9">
            <span className="grid size-12 place-items-center rounded-xl bg-blue/20 text-cyan">
              <FileText aria-hidden className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-white">Documented in writing</h2>
            <ul className="mt-5 space-y-3">
              {contractDocumentation.map((item) => (
                <li key={item} className="flex gap-3 text-cyan/80">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9">
            <span className="grid size-12 place-items-center rounded-xl bg-blue/20 text-cyan">
              <Wallet aria-hidden className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-white">Payment method</h2>
            <ul className="mt-5 space-y-2 text-cyan/80">
              {paymentSchedule.map((step) => (
                <li key={step.label}>
                  <strong className="text-white">{Math.round(step.share * 100)}%</strong> {step.label.toLowerCase()}.
                </li>
              ))}
            </ul>
            <div className="mt-6 overflow-x-auto rounded-xl ring-1 ring-white/10">
              <table className="w-full min-w-[22rem] text-left text-sm">
                <caption className="sr-only">Payment amounts per plan</caption>
                <thead className="bg-white/5 text-xs tracking-wider text-cyan/70 uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Plan</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Advance</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {officePlans.map((plan) => (
                    <tr key={plan.id}>
                      <th scope="row" className="px-4 py-3 font-semibold text-white">{plan.name}</th>
                      {paymentSchedule.map((step) => (
                        <td key={step.label} className="px-4 py-3 whitespace-nowrap text-cyan/90">
                          {formatPKR(plan.annualPrice * step.share)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-cyan/60">No payment is collected online. Payments are arranged directly with AirFixPro.</p>
          </div>
        </Container>
      </section>

      <section id="office-inquiry" className="scroll-mt-24 bg-ice py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Get a quotation"
            title="Tell us about your office"
            description="Submitting this form is a quotation request. A contract is confirmed only after both parties agree to the written terms."
          />
          <div className="mt-10 rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-10">
            <InquiryForm formId="office" />
          </div>
        </Container>
      </section>

      <FinalCTA
        title="Questions about Office AC Care?"
        text="Talk to us about your office, the number of AC units and the plan that suits you."
        whatsappMessage={whatsappMessages.office}
      />
    </>
  );
}
