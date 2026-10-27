import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
};

/** Shared intro band for inner pages. */
export function PageHero({ eyebrow, title, description, crumbs = [], children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-white to-ice">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div aria-hidden className="absolute -top-24 right-0 size-[28rem] rounded-full bg-blue/10 blur-3xl" />
      <Container className="relative py-14 sm:py-20">
        {crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-blue">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  <ChevronRight aria-hidden className="size-4" />
                  {c.href && i < crumbs.length - 1 ? (
                    <Link href={c.href} className="hover:text-blue">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-navy">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="flex max-w-3xl animate-fade-up flex-col items-start gap-5">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          {description ? <p className="text-lg leading-relaxed text-muted">{description}</p> : null}
          {children ? <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
