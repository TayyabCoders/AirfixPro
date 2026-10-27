import Image from "next/image";
import { House, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-ice">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_65%)]" />
      <div aria-hidden className="absolute -top-32 -right-24 size-[36rem] rounded-full bg-cyan blur-3xl" />
      <div aria-hidden className="absolute bottom-0 -left-40 size-[24rem] rounded-full bg-blue/10 blur-3xl" />

      <Container className="relative grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-24">
        <div className="animate-fade-up">
          <Eyebrow>Professional AC services in Karachi</Eyebrow>
          <h1 className="mt-6 text-[2.4rem] leading-[1.04] font-extrabold tracking-tight sm:text-6xl lg:text-[4rem]">
            Stay Cool.
            <br />
            <span className="text-gradient">Live Comfortably.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{site.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/booking" size="lg">
              Book a Service
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline">
              Explore Our Services
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a href={site.phone.href} className="group flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-navy text-white transition-colors group-hover:bg-blue">
                <Phone aria-hidden className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-medium text-muted">Call or WhatsApp</span>
                <span className="font-display text-lg font-bold text-navy">{site.phone.display}</span>
              </span>
            </a>
            <a
              href={whatsappUrl(whatsappMessages.booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-whatsapp ring-1 ring-line transition-colors hover:ring-whatsapp"
            >
              <WhatsAppIcon className="size-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="relative rounded-[2rem] bg-gradient-to-br from-cyan via-ice to-white p-2.5 shadow-lift ring-1 ring-blue/10 sm:p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem]">
              <Image
                src="/images/hero-technician.jpg"
                alt="AC technician servicing a wall-mounted split air conditioner"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 576px, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute -bottom-6 left-3 flex animate-float items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift ring-1 ring-line backdrop-blur sm:-left-6">
            <span className="grid size-11 place-items-center rounded-xl bg-blue text-white">
              <ShieldCheck aria-hidden className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-navy">1-Month Warranty</span>
              <span className="text-xs text-muted">On every service</span>
            </span>
          </div>

          <div className="absolute top-5 right-3 hidden animate-float items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift ring-1 ring-line backdrop-blur [animation-delay:1.5s] sm:-right-5 sm:flex">
            <span className="grid size-11 place-items-center rounded-xl bg-ice text-blue">
              <House aria-hidden className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-navy">Homes & Offices</span>
              <span className="text-xs text-muted">Serving Karachi</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
