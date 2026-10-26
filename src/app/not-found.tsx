import { SiteShell } from "@/components/layout";
import {
  buttonClassName,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <SiteShell>
      <Section className="bg-surface">
        <Container className="max-w-xl space-y-4 text-center">
          <Heading level={1}>Page not found</Heading>
          <Text tone="muted">
            That route does not exist yet. Head home or add a new page under{" "}
            <code className="rounded bg-ice px-1.5 py-0.5 font-mono text-sm text-navy">
              src/app
            </code>
            .
          </Text>
          <Link href="/" className={buttonClassName("primary")}>
            Back home
          </Link>
        </Container>
      </Section>
    </SiteShell>
  );
}
