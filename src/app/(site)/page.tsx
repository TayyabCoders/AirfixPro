import {
  buttonClassName,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Section
        spacing="lg"
        className="relative overflow-hidden bg-surface"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(7,137,209,0.14),_transparent_55%)]"
        />
        <Container className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
          <div className="space-y-6">
            <Text
              tone="brand"
              size="sm"
              className="font-semibold tracking-[0.14em] uppercase"
            >
              Project foundation
            </Text>
            <Heading level={1} className="text-navy">
              {siteConfig.name}
            </Heading>
            <Text tone="muted" size="lg" className="max-w-xl">
              Clean Next.js architecture with reusable UI primitives, a shared
              site shell, and room to grow — start building features on top of
              this base.
            </Text>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/flights"
                className={buttonClassName("primary", "lg", "w-full sm:w-auto")}
              >
                Explore flights
              </Link>
              <Link
                href="/about"
                className={buttonClassName("outline", "lg", "w-full sm:w-auto")}
              >
                About the stack
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-ice p-6 sm:p-8">
            <Heading level={3} className="mb-3 text-navy">
              Built to scale
            </Heading>
            <ul className="space-y-3 text-sm leading-6 text-muted sm:text-base">
              <li>Reusable UI tokens and components</li>
              <li>Responsive layout from phone to desktop</li>
              <li>Config-driven navigation and metadata</li>
              <li>Feature folders ready for product work</li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section spacing="md" className="bg-background">
        <Container>
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <Heading level={2}>Ready when you are</Heading>
            <Text tone="muted">
              Add routes under{" "}
              <code className="rounded bg-ice px-1.5 py-0.5 font-mono text-sm text-navy">
                src/app
              </code>{" "}
              and feature modules under{" "}
              <code className="rounded bg-ice px-1.5 py-0.5 font-mono text-sm text-navy">
                src/features
              </code>
              .
            </Text>
          </div>
        </Container>
      </Section>
    </>
  );
}
