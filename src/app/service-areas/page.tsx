import type { Metadata } from "next";
import { MapPin, Navigation } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";
import { fullAddress, mapsUrl } from "@/config/site";
import { confirmedAreas, serviceRegion } from "@/data/service-areas";

export const metadata: Metadata = {
  title: "AC Service Areas in Karachi",
  description: "AirFixPro provides AC services in Karachi from its office in Gulistan-e-Jauhar. Share your location when booking to confirm a visit.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title={`AC services in ${serviceRegion.city}`}
        description={`AirFixPro operates from ${serviceRegion.officeArea}, ${serviceRegion.city}. Tell us your location when you book and we will confirm whether we can arrange a visit.`}
        crumbs={[{ label: "Service Areas" }]}
      >
        <ButtonLink href="/booking">Check availability</ButtonLink>
      </PageHero>

      <section className="bg-page py-16 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-9">
            <span className="grid size-12 place-items-center rounded-xl bg-ice text-blue">
              <MapPin aria-hidden className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold">Our office</h2>
            <address className="mt-3 leading-relaxed text-muted not-italic">{fullAddress}</address>
            <ButtonLink href={mapsUrl} variant="secondary" className="mt-6">
              <Navigation aria-hidden className="size-4" /> Open in Google Maps
            </ButtonLink>
          </div>

          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-9">
            <h2 className="text-2xl font-bold">Areas we serve</h2>
            {confirmedAreas.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {confirmedAreas.map((area) => (
                  <li key={area} className="rounded-full bg-ice px-4 py-2 text-sm font-medium text-navy">
                    {area}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 leading-relaxed text-muted">
                We serve customers in {serviceRegion.city}. Coverage can depend on your exact location and technician availability, so please
                share your address when booking and we will confirm before scheduling the visit.
              </p>
            )}
          </div>
        </Container>
      </section>

      <FinalCTA title="Not sure if we cover your area?" text="Message us your location and we will let you know." />
    </>
  );
}
