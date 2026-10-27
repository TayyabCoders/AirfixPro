import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { Logo } from "@/components/layout/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { fullAddress, mainNav, mapsUrl, secondaryNav, site } from "@/config/site";
import { services } from "@/data/services";
import { whatsappUrl } from "@/lib/whatsapp";

const linkClass = "text-sm text-cyan/75 transition-colors hover:text-white";
const contactClass = "flex items-start gap-3 text-cyan/75 hover:text-white";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-blue/20 blur-3xl" />
      <Container className="relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10">
        <div className="flex flex-col gap-5">
          <Logo dark />
          <p className="font-display text-lg font-semibold text-white">{site.tagline}</p>
          <p className="max-w-sm text-sm leading-relaxed text-cyan/75">
            AC repair, deep cleaning, installation, gas charging and maintenance for homes and offices in Karachi.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">Services</h2>
          <ul className="space-y-2.5">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={linkClass}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">Company</h2>
          <ul className="space-y-2.5">
            {[...mainNav.slice(1), ...secondaryNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">Get in touch</h2>
          <ul className="space-y-4 text-sm">
            <li>
              <a href={site.phone.href} className={contactClass}>
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" />
                <span>
                  <span className="block text-white">Call</span>
                  {site.phone.display}
                </span>
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={contactClass}>
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-blue" />
                <span>
                  <span className="block text-white">WhatsApp</span>
                  {site.phone.display}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${contactClass} break-all`}>
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={contactClass}>
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" />
                <address className="not-italic">{fullAddress}</address>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-cyan/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <p>{site.promise}</p>
        </Container>
      </div>
    </footer>
  );
}
