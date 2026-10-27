"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { mainNav, secondaryNav, site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function Header() {
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
    <header className="sticky top-0 z-[100]">
      {/* Blur only on the bar — not on <header> — so the menu panel isn't trapped. */}
      <div className="border-b border-line/80 bg-white/85 backdrop-blur-xl">
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="relative rounded-lg px-3 py-2 text-[15px] font-medium text-muted transition-colors hover:text-navy"
                activeClassName="text-navy! after:absolute after:inset-x-3 after:-bottom-[3px] after:h-0.5 after:rounded-full after:bg-blue"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.phone.href}
              className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-navy hover:text-blue"
            >
              <span className="grid size-9 place-items-center rounded-full bg-ice text-blue">
                <Phone aria-hidden className="size-4" />
              </span>
              {site.phone.display}
            </a>
            <ButtonLink href="/booking" size="sm" className="h-11 px-5">
              Book a Service
            </ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-xl border border-line bg-white text-navy transition-colors hover:border-blue hover:text-blue lg:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </Container>
      </div>

      {open ? (
        <div
          id={panelId}
          className="lg:hidden"
          style={{
            position: "fixed",
            top: "var(--header-h)",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 200,
            overflowY: "auto",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #dce8f0",
          }}
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
      ) : null}
    </header>
  );
}
