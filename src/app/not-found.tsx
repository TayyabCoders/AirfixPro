import type { Metadata } from "next";
import { Snowflake } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-white to-ice">
      <Container className="flex flex-col items-center gap-6 py-24 text-center sm:py-32">
        <span className="grid size-16 place-items-center rounded-2xl bg-white text-blue shadow-soft ring-1 ring-line">
          <Snowflake aria-hidden className="size-8" />
        </span>
        <p className="font-display text-sm font-semibold tracking-[0.2em] text-blue uppercase">Error 404</p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">This page has gone cold.</h1>
        <p className="max-w-md text-lg text-muted">The page you are looking for does not exist or has moved.</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/services" variant="outline">
            View services
          </ButtonLink>
          <ButtonLink href={whatsappUrl()} variant="whatsapp">
            <WhatsAppIcon /> WhatsApp us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
