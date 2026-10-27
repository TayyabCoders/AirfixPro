import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { OfficePlanCard } from "@/components/pricing/OfficePlanCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { officeInclusions, officePlans } from "@/data/office-plans";

export function OfficeCareSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-lift ring-1 ring-line">
            <Image
              src="/images/office-ac-care.jpg"
              alt="Technician inspecting wall-mounted ACs in a modern office"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="relative -mt-10 mr-4 ml-4 grid grid-cols-2 gap-2 rounded-2xl bg-white p-4 text-sm shadow-soft ring-1 ring-line sm:mr-10 sm:ml-10">
            {officeInclusions.slice(0, 6).map((item) => (
              <li key={item} className="flex items-center gap-2 text-navy">
                <Check aria-hidden className="size-4 shrink-0 text-blue" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="For offices & businesses"
            title="Office AC Care Plans"
            description="Annual maintenance plans for offices that need their ACs running reliably all year, with every visit documented in writing."
          />
          <ul className="mt-8 grid gap-3 lg:grid-cols-3">
            {officePlans.map((plan) => (
              <li key={plan.id}>
                <OfficePlanCard plan={plan} />
              </li>
            ))}
          </ul>
          <ButtonLink href="/office-ac-care" variant="secondary" className="mt-8 w-full sm:w-auto">
            Explore Office AC Care Plans
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
