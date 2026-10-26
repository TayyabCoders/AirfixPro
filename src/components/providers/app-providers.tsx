"use client";

import type { ReactNode } from "react";

export type AppProvidersProps = {
  children: ReactNode;
};

/**
 * Client boundary for app-wide providers (theme, auth, query, etc.).
 * Add providers here so the root layout stays a Server Component.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <>{children}</>;
}
