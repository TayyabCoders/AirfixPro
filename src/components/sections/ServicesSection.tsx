import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="bg-page py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Our AC Services"
          description="Complete AC care for your home and workplace."
        />
        <ul className="stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="reveal">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/services" variant="outline">
            View all services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
