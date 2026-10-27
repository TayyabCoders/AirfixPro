import { Container } from "@/components/layout/Container";
import { ServicePriceCard } from "@/components/pricing/ServicePriceCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { featuredPriceIds, getPrices, pricingNote } from "@/data/pricing";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function PricingSection() {
  return (
    <section className="bg-page py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Clear rates"
          title="See the price before you book"
          description="Published rates in Pakistani rupees. Final scope is confirmed with you before any work begins."
        />
        <ul className="stagger mt-14 grid gap-5 md:grid-cols-3">
          {getPrices(featuredPriceIds).map((price) => (
            <li key={price.id} className="reveal">
              <ServicePriceCard price={price} />
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">{pricingNote}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/pricing">View All Service Prices</ButtonLink>
          <ButtonLink href={whatsappUrl(whatsappMessages.pricing)} variant="outline">
            <WhatsAppIcon className="size-5 text-whatsapp" /> Confirm a price
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
