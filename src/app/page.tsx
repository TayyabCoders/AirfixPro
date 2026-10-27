import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { FAQList } from "@/components/sections/FAQList";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HomeHero } from "@/components/sections/HomeHero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { OfficeCareSection } from "@/components/sections/OfficeCareSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: { absolute: "AirFixPro | AC Repair, Servicing & Installation in Karachi" },
  description:
    "AC repair, FoamJet deep cleaning, installation, gas charging and inverter card repair in Karachi. Clear pricing, 1-month service warranty. Call or WhatsApp 0343-7894566.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ServicesSection />
      <WhyChooseUs />
      <HowItWorks />
      <PricingSection />
      <OfficeCareSection />
      <ServiceAreaSection />
      <section className="bg-page py-20 sm:py-24">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="mt-12">
            <FAQList items={faqs.filter((f) => f.featured).slice(0, 6)} />
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/faq" variant="outline">
              View all FAQs
            </ButtonLink>
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
