import { Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { NavLink } from "@/components/layout/NavLink";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav, site } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-xl">
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
          <a href={site.phone.href} className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-navy hover:text-blue">
            <span className="grid size-9 place-items-center rounded-full bg-ice text-blue">
              <Phone aria-hidden className="size-4" />
            </span>
            {site.phone.display}
          </a>
          <ButtonLink href="/booking" size="sm" className="h-11 px-5">
            Book a Service
          </ButtonLink>
        </div>

        <MobileNavigation />
      </Container>
    </header>
  );
}
