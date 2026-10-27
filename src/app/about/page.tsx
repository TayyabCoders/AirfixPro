import type { Metadata } from "next";
import Image from "next/image";
import { Building2, FileText, House, Receipt } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About AirFixPro",
  description: "AirFixPro provides AC repair, servicing, installation and maintenance for homes and businesses in Karachi. Quality Work, Honest Service.",
  alternates: { canonical: "/about" },
};

const pillars = [
  { icon: House, title: "Homes", text: "Repairs, deep cleaning, gas charging and installations for households across our service area." },
  { icon: Building2, title: "Businesses", text: "Maintenance for offices and commercial spaces, including annual Office AC Care plans." },
  { icon: Receipt, title: "Transparent pricing", text: "A published rate list, with the scope and price confirmed before work starts." },
  { icon: FileText, title: "Written records", text: "Office contracts document every visit, service and payment in writing." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title={site.tagline} description={`${site.name} is a Karachi-based AC service business focused on doing the job properly and being straightforward with customers.`} crumbs={[{ label: "About" }]} />

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift ring-1 ring-line">
            <Image src="/images/deep-cleaning.jpg" alt="Foam jet cleaning of a split AC coil with a protective cover" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">AC care for homes and workplaces</h2>
            <p>
              AirFixPro repairs, services, cleans and installs air conditioners for homes and businesses in Karachi. Our work covers
              everything from FoamJet deep cleaning and master servicing to gas charging, leak repair and inverter AC card repair.
            </p>
            <p>
              We believe customers should understand what is wrong with their AC and what it will cost before any work begins. That is
              why we publish our rates, explain our findings, and keep written records for office maintenance contracts.
            </p>
            <p className="font-display font-semibold text-navy">{site.promise}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <ButtonLink href="/services">Our services</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-page py-16 sm:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal rounded-2xl border border-line bg-white p-6 shadow-soft">
                <span className="grid size-12 place-items-center rounded-xl bg-ice text-blue">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <WhyChooseUs />
      <FinalCTA />
    </>
  );
}
