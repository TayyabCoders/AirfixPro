import { Logo } from "@/components/brand";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import Link from "next/link";

export type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md",
        className,
      )}
    >
      <Container className="relative flex h-14 items-center justify-between gap-4 sm:h-16 sm:gap-6">
        <Logo size="md" priority />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-ice hover:text-brand"
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/flights"
            className="ml-2 inline-flex h-10 items-center justify-center rounded-lg bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
          >
            Book flights
          </Link>
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
