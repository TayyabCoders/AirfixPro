import { Logo } from "@/components/brand";
import { Container, Text } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import Link from "next/link";

export type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("mt-auto bg-navy text-navy-foreground", className)}>
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
        <div className="flex flex-col gap-3 sm:max-w-sm">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-surface p-1.5">
              <Logo size="sm" href={false} className="h-8 w-8 sm:h-9 sm:w-9" />
            </span>
            <p className="text-lg font-semibold tracking-tight">{siteConfig.name}</p>
          </div>
          <Text size="sm" className="text-navy-foreground/75">
            {siteConfig.description}
          </Text>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-6 gap-y-3"
        >
          {siteConfig.footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-navy-foreground/80 transition-colors hover:text-navy-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-4">
          <Text size="sm" className="text-navy-foreground/60">
            © {siteConfig.name}. All rights reserved.
          </Text>
        </Container>
      </div>
    </footer>
  );
}
