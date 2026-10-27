import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-semibold";

/** Mobile bottom action bar + desktop floating WhatsApp button. */
export function QuickContact() {
  return (
    <>
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <a href={site.phone.href} className={`${item} text-navy`}>
          <Phone aria-hidden className="size-5 text-blue" /> Call
        </a>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${item} text-navy`}>
          <WhatsAppIcon className="size-5 text-whatsapp" /> WhatsApp
        </a>
        <Link href="/booking" className={`${item} m-1.5 rounded-xl bg-blue text-white`}>
          <CalendarCheck aria-hidden className="size-5" /> Book
        </Link>
      </nav>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AirFixPro on WhatsApp"
        className="group fixed right-6 bottom-6 z-40 hidden items-center gap-2 rounded-full bg-whatsapp p-4 text-white shadow-lift transition-colors hover:bg-whatsapp-hover md:flex"
      >
        <WhatsAppIcon className="size-6" />
        <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-focus-visible:max-w-40">
          WhatsApp us
        </span>
      </a>
    </>
  );
}
