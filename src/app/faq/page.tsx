import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { FAQList } from "@/components/sections/FAQList";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "AC Service FAQs",
  description: "Answers to common questions about AirFixPro AC repair, inverter AC repair, pricing, warranty, booking and office AC maintenance plans in Karachi.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Quick answers about our services, pricing and bookings. Can't find what you need? Message us."
        crumbs={[{ label: "FAQ" }]}
      />
      <section className="bg-page py-16 sm:py-20">
        <Container className="max-w-4xl">
          <FAQList items={faqs} />
        </Container>
      </section>
      <FinalCTA title="Still have a question?" text="Ask us directly on WhatsApp or give us a call." />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
