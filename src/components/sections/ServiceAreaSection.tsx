import { MapPin, Navigation } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fullAddress, mapsUrl } from "@/config/site";
import { serviceRegion } from "@/data/service-areas";

export function ServiceAreaSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="relative grid overflow-hidden rounded-3xl border border-line bg-page lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <SectionHeading
              align="left"
              eyebrow="Service area"
              title={`AC services in ${serviceRegion.city}`}
              description={`Our office is in ${serviceRegion.officeArea}. Share your location when you book and we will confirm whether a visit can be arranged.`}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/service-areas" variant="outline">
                Service areas
              </ButtonLink>
              <ButtonLink href={mapsUrl} variant="secondary">
                <Navigation aria-hidden className="size-4" /> Open in Google Maps
              </ButtonLink>
            </div>
          </div>
          <div className="relative grid min-h-64 place-items-center overflow-hidden bg-navy p-8">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
            <div aria-hidden className="absolute size-72 rounded-full bg-blue/30 blur-3xl" />
            <div className="relative flex max-w-sm flex-col items-center text-center">
              <span className="relative grid size-16 place-items-center rounded-full bg-blue text-white shadow-lift">
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-blue/40 [animation-duration:2.5s]" />
                <MapPin aria-hidden className="relative size-7" />
              </span>
              <p className="mt-5 font-display text-lg font-bold text-white">AirFixPro Office</p>
              <address className="mt-2 text-sm leading-relaxed text-cyan/80 not-italic">{fullAddress}</address>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
