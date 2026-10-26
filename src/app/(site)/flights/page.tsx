import { Container, Heading, Section, Text } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flights",
};

export default function FlightsPage() {
  return (
    <Section className="bg-surface">
      <Container className="space-y-4">
        <Heading level={1}>Flights</Heading>
        <Text tone="muted">
          Placeholder route for search and results. Wire data fetching and
          feature components here when you are ready.
        </Text>
        <div className="rounded-2xl border border-border bg-ice p-5 sm:p-6">
          <Text tone="muted" size="sm">
            Tip: keep flight search UI in{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-navy">
              src/features/flights
            </code>{" "}
            and compose it from this page.
          </Text>
        </div>
      </Container>
    </Section>
  );
}
