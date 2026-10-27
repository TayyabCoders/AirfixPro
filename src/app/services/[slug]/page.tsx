import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, CircleAlert, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ServicePriceCard } from "@/components/pricing/ServicePriceCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { getPrices, pricingNote } from "@/data/pricing";
import { getRelatedServices, getService, services } from "@/data/services";
import { serviceMessage, whatsappUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} in Karachi`,
    description: `${service.short} Book ${service.title.toLowerCase()} with AirFixPro in Karachi.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { images: [{ url: service.image, alt: service.imageAlt }] },
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const prices = getPrices(service.priceIds);
  const related = getRelatedServices(service);
  const message = serviceMessage(service.title);

  return (
    <>
      <PageHero
        eyebrow="AC service"
        title={service.title}
        description={service.description}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      >
        <ButtonLink href={`/booking?service=${service.slug}`}>Book this service</ButtonLink>
        <ButtonLink href={whatsappUrl(message)} variant="outline">
          <WhatsAppIcon className="size-5 text-whatsapp" /> WhatsApp us
        </ButtonLink>
      </PageHero>

      <section className="bg-page py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-12">
          <div className="space-y-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-soft ring-1 ring-line">
              <Image src={service.image} alt={service.imageAlt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
                <h2 className="text-xl font-bold">When you may need it</h2>
                <ul className="mt-5 space-y-3">
                  {service.situations.map((item) => (
                    <li key={item} className="flex gap-3 text-muted">
                      <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
                <h2 className="text-xl font-bold">What the service generally involves</h2>
                <ul className="mt-5 space-y-3">
                  {service.involves.map((item) => (
                    <li key={item} className="flex gap-3 text-muted">
                      <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-success" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="rounded-2xl bg-ice p-5 text-sm leading-relaxed text-navy">
              Every AC is different. The technician inspects your unit, explains the findings and confirms the work and price with you
              before starting. Steps may vary depending on the condition of your AC.
            </p>

            {prices.length ? (
              <div>
                <h2 className="text-2xl font-bold">Pricing</h2>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                  {prices.map((price) => (
                    <li key={price.id}>
                      <ServicePriceCard price={price} />
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted">{pricingNote}</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
                <h2 className="text-xl font-bold">Pricing</h2>
                <p className="mt-3 text-muted">
                  {service.officePlans
                    ? "Offices can choose an annual Office AC Care plan. For homes, contact us for a quotation based on your units."
                    : "The price depends on your AC and the work required. Contact us for a quotation before the visit."}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  {service.officePlans ? (
                    <ButtonLink href="/office-ac-care" variant="secondary">
                      View Office AC Care plans
                    </ButtonLink>
                  ) : null}
                  <ButtonLink href="/pricing" variant="outline">
                    See listed prices
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-lift">
              <h2 className="text-xl font-bold text-white">Book {service.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-cyan/80">
                Send a request and we will contact you to confirm a suitable appointment.
              </p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href={`/booking?service=${service.slug}`} variant="white">
                  Request a booking
                </ButtonLink>
                <ButtonLink href={whatsappUrl(message)} variant="whatsapp">
                  <WhatsAppIcon /> WhatsApp
                </ButtonLink>
                <ButtonLink href={site.phone.href} variant="ghostLight">
                  <Phone aria-hidden className="size-4" /> {site.phone.display}
                </ButtonLink>
              </div>
              <p className="mt-6 border-t border-white/10 pt-5 text-xs text-cyan/70">{site.warranty} on every service, as advertised.</p>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold sm:text-3xl">Related services</h2>
            <Link href="/services" className="hidden items-center gap-1 text-sm font-semibold text-blue hover:underline sm:inline-flex">
              All services <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCTA whatsappMessage={message} />
    </>
  );
}
