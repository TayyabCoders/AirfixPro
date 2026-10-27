import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { serviceCategories, services } from "@/data/services";
import { cn } from "@/lib/utils";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "AC Services in Karachi",
  description:
    "AC repair, FoamJet deep cleaning, master service, installation, gas charging, leak repair and inverter card repair for homes and offices in Karachi.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Complete AC care for homes and workplaces"
        description="From a quick repair to a full deep clean or a new installation, AirFixPro handles the AC work your home or office needs in Karachi."
        crumbs={[{ label: "Services" }]}
      >
        <ButtonLink href="/booking">Book a Service</ButtonLink>
        <ButtonLink href={whatsappUrl(whatsappMessages.general)} variant="outline">
          <WhatsAppIcon className="size-5 text-whatsapp" /> Ask on WhatsApp
        </ButtonLink>
      </PageHero>

      <div className="bg-page py-20 sm:py-24">
        <Container className="space-y-16 sm:space-y-20">
          {serviceCategories.map((category) => {
            const items = services.filter((s) => s.category === category.id);
            if (!items.length) return null;
            return (
              <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                <div className="flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                  <h2 id={`cat-${category.id}`} className="shrink-0 text-2xl font-bold sm:text-3xl">
                    {category.title}
                  </h2>
                  <p className="max-w-xl text-muted sm:max-w-sm sm:text-right md:max-w-md">{category.description}</p>
                </div>
                <ul
                  className={cn(
                    "stagger mt-8 grid gap-5",
                    items.length === 1 && "max-w-md sm:grid-cols-1",
                    items.length === 2 && "sm:grid-cols-2 lg:max-w-4xl",
                    items.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
                  )}
                >
                  {items.map((service) => (
                    <li key={service.slug} className="reveal h-full">
                      <ServiceCard service={service} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </Container>
      </div>

      <FinalCTA />
    </>
  );
}
