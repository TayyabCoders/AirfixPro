import { Container, Heading, Section, Text } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Section className="bg-surface">
      <Container className="max-w-2xl space-y-4">
        <Heading level={1}>About the stack</Heading>
        <Text tone="muted">
          This starter uses the App Router, route groups for shared shells,
          config-driven navigation, and reusable UI primitives under{" "}
          <code className="rounded bg-ice px-1.5 py-0.5 font-mono text-sm text-navy">
            src/components/ui
          </code>
          . Add feature folders as the product grows.
        </Text>
      </Container>
    </Section>
  );
}
