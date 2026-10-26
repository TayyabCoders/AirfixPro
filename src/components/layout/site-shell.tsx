import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import type { ReactNode } from "react";

export type SiteShellProps = {
  children: ReactNode;
};

/** Shared chrome for marketing / public pages. */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
