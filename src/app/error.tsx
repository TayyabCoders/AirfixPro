"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-gradient-to-b from-white to-ice">
      <Container className="flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Something went wrong</h1>
        <p className="max-w-md text-muted">
          This page could not be loaded. Please try again, or contact us directly on WhatsApp.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button type="button" onClick={() => retry()} className={buttonClass()}>
            Try again
          </button>
          <ButtonLink href={whatsappUrl()} variant="whatsapp">
            <WhatsAppIcon /> WhatsApp us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
