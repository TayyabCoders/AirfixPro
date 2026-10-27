import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { officePlans } from "@/data/office-plans";
import { pricingNote, servicePrices } from "@/data/pricing";
import { getService } from "@/data/services";
import { formatPKR } from "@/lib/utils";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "AC Service Rate List",
  description:
    "AirFixPro AC service prices in Karachi: leak repair + gas charge, inverter AC card repair, master service and installation, in Pakistani rupees.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Rate list"
        title="AC Service Pricing"
        description="Clear prices in Pakistani rupees. Final repair scope and price are always confirmed with you before work begins."
        crumbs={[{ label: "Pricing" }]}
      >
        <ButtonLink href={whatsappUrl(whatsappMessages.pricing)} variant="whatsapp">
          <WhatsAppIcon /> Confirm a price on WhatsApp
        </ButtonLink>
        <ButtonLink href="/booking" variant="outline">
          Book a Service
        </ButtonLink>
      </PageHero>

      <section className="bg-page py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
            <div className="hidden grid-cols-[1fr_auto] gap-6 border-b border-line bg-ice px-7 py-4 text-xs font-semibold tracking-wider text-muted uppercase md:grid">
              <span>Service</span>
              <span>Price</span>
            </div>
            <ul className="divide-y divide-line">
              {servicePrices.map((price) => {
                const service = getService(price.serviceSlug);
                const Icon = service?.icon;
                return (
                  <li key={price.id} className="flex flex-col gap-4 px-5 py-6 transition-colors hover:bg-page sm:px-7 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      {Icon ? (
                        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ice text-blue">
                          <Icon aria-hidden className="size-6" />
                        </span>
                      ) : null}
                      <div>
                        <h2 className="font-sans text-lg font-bold">{price.title}</h2>
                        <p className="mt-1 text-sm text-muted">{price.description}</p>
                        {service ? (
                          <Link
                            href={`/services/${service.slug}`}
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
                          >
                            About {service.title} <ArrowRight aria-hidden className="size-3.5" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                    <div className="pl-16 md:pl-0 md:text-right">
                      {price.startingFrom ? (
                        <p className="text-xs font-semibold tracking-wider text-muted uppercase">Starting from</p>
                      ) : null}
                      <p className="font-display text-2xl font-extrabold whitespace-nowrap text-blue sm:text-3xl">{formatPKR(price.amount)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6 flex gap-3 rounded-2xl bg-ice p-5 text-sm leading-relaxed text-navy">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
            <p>
              {pricingNote} Need a price for a service not listed here? Message us on WhatsApp for a quotation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 rounded-3xl bg-navy p-8 text-white sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Running an office?</h2>
              <p className="mt-2 text-cyan/80">
                Annual Office AC Care plans start at {formatPKR(Math.min(...officePlans.map((p) => p.annualPrice)))} per year.
              </p>
            </div>
            <ButtonLink href="/office-ac-care" variant="white">
              View office plans
            </ButtonLink>
          </div>
        </Container>
      </section>

      <FinalCTA
        title="Want to confirm a price?"
        text="Tell us your AC type and the issue, and we will confirm the expected cost before the visit."
        whatsappMessage={whatsappMessages.pricing}
      />
    </>
  );
}
