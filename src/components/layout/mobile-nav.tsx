"use client";

import { buttonClassName } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-navy",
          "hover:bg-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close" : "Menu"}</span>
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-border bg-surface shadow-lg"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-4">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    active
                      ? "bg-ice text-brand"
                      : "text-navy hover:bg-ice hover:text-brand",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/flights"
              className={cn(buttonClassName("primary"), "mt-2 w-full")}
            >
              Book flights
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
