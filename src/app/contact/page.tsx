import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { fullAddress, mapsUrl, site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact AirFixPro",
  description: `Contact AirFixPro for AC services in Karachi. Call or WhatsApp ${site.phone.display}, email ${site.email}, or visit our Gulistan-e-Jauhar office.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  { icon: Phone, label: "Call us", value: site.phone.display, href: site.phone.href },
  { icon: WhatsAppIcon, label: "WhatsApp", value: site.phone.display, href: whatsappUrl() },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Office", value: fullAddress, href: mapsUrl },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's get your AC sorted"
        description="Reach AirFixPro by phone, WhatsApp or email, or send us a message below."
        crumbs={[{ label: "Contact" }]}
      >
        <ButtonLink href={whatsappUrl()} variant="whatsapp">
          <WhatsAppIcon /> WhatsApp Us
        </ButtonLink>
        <ButtonLink href="/booking" variant="outline">
          Request a service
        </ButtonLink>
      </PageHero>

      <section className="bg-page py-20 sm:py-24">
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-10">
          <aside className="space-y-4">
            <ul className="space-y-4">
              {channels.map(({ icon: Icon, label, value, href }) => {
                const external = href.startsWith("http");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lift"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ice text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-muted">{label}</span>
                        <span className="mt-0.5 block font-semibold break-words text-navy">{value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="flex gap-3 rounded-2xl bg-ice p-5 text-sm leading-relaxed text-navy">
              <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
              Please contact us to confirm availability for your preferred day and time.
            </p>
          </aside>

          <div className="min-w-0 rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-10">
            <h2 className="text-2xl font-bold text-navy">Send us a message</h2>
            <p className="mt-2 mb-8 text-muted">For service visits, the booking form collects everything we need in one go.</p>
            <InquiryForm formId="contact" />
          </div>
        </Container>
      </section>
    </>
  );
}
