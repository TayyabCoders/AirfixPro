"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { NavLink } from "@/components/layout/NavLink";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { mainNav, secondaryNav, site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-xl border border-line bg-white text-navy transition-colors hover:border-blue hover:text-blue"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto border-t border-line bg-white"
      >
        <nav aria-label="Mobile" className="mx-auto flex max-w-lg flex-col gap-1 px-4 py-6">
          {[...mainNav, ...secondaryNav].map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-xl px-4 py-3.5 text-base font-semibold text-navy transition-colors hover:bg-ice"
              activeClassName="bg-ice text-blue"
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-4 grid gap-3 border-t border-line pt-6">
            <ButtonLink href={whatsappUrl()} variant="whatsapp" size="lg" onClick={close}>
              <WhatsAppIcon /> WhatsApp Us
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outline" size="lg" onClick={close}>
              <Phone aria-hidden className="size-5" /> Call {site.phone.display}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
