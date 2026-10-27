import { Phone, Snowflake } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

type FinalCTAProps = { title?: string; text?: string; whatsappMessage?: string };

export function FinalCTA({
  title = "Need Professional AC Service?",
  text = "Get in touch with AirFixPro to discuss your AC issue or arrange a service visit.",
  whatsappMessage,
}: FinalCTAProps) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ice via-cyan to-ice px-6 py-14 text-center ring-1 ring-blue/15 sm:px-12 sm:py-16">
          <Snowflake aria-hidden className="absolute -top-10 -left-10 size-48 text-blue/10" />
          <Snowflake aria-hidden className="absolute -right-8 -bottom-12 size-56 text-blue/10" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-muted">{text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={whatsappUrl(whatsappMessage)} variant="whatsapp" size="lg">
                <WhatsAppIcon /> WhatsApp Us
              </ButtonLink>
              <ButtonLink href={site.phone.href} variant="secondary" size="lg">
                <Phone aria-hidden className="size-5" /> Call Now
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
