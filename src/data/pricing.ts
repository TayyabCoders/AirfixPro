export type ServicePrice = {
  id: string;
  title: string;
  description: string;
  amount: number;
  startingFrom?: boolean;
  serviceSlug: string;
};

// Business-supplied rate list. Update prices here only; every page reads from this file.
export const servicePrices: ServicePrice[] = [
  {
    id: "leak-gas-1-ton",
    title: "1 Ton Leak Repair + Gas Charge",
    description: "Leak repair with refrigerant gas charging for a 1-ton AC.",
    amount: 9500,
    serviceSlug: "leak-detection-and-repair",
  },
  {
    id: "leak-gas-1-5-ton",
    title: "1.5 Ton Leak Repair + Gas Charge",
    description: "Leak repair with refrigerant gas charging for a 1.5-ton AC.",
    amount: 11500,
    serviceSlug: "leak-detection-and-repair",
  },
  {
    id: "inverter-card",
    title: "Inverter AC Card Repair",
    description: "PCB / card repair for inverter ACs. Final price depends on the fault.",
    amount: 6000,
    startingFrom: true,
    serviceSlug: "inverter-ac-card-repair",
  },
  {
    id: "master-service",
    title: "AC Master Service",
    description: "Complete service visit for a split AC.",
    amount: 2500,
    serviceSlug: "ac-master-service",
  },
  {
    id: "installation",
    title: "AC Installation",
    description: "Installation of a split AC unit.",
    amount: 3500,
    serviceSlug: "ac-installation",
  },
];

export const featuredPriceIds = ["master-service", "installation", "inverter-card"];

export const pricingNote =
  "Final repair scope and price are confirmed with you before any work begins. Parts or additional work outside the listed service are discussed and agreed first.";

export function getPrices(ids: readonly string[]): ServicePrice[] {
  return ids.flatMap((id) => servicePrices.find((p) => p.id === id) ?? []);
}
