export type OfficePlan = { id: string; name: string; units: number; annualPrice: number };

export const officePlans: OfficePlan[] = [
  { id: "5-acs", name: "5 ACs Plan", units: 5, annualPrice: 34999 },
  { id: "7-acs", name: "7 ACs Plan", units: 7, annualPrice: 49999 },
  { id: "8-acs", name: "8 ACs Plan", units: 8, annualPrice: 64999 },
];

// Advertised facilities. Coverage limits and scope are set by the written contract.
export const officeInclusions = [
  "AC Servicing",
  "Card Repair",
  "Leak Repair + Gas",
  "AC Installation & Dismantling",
  "Gas Leakage Check",
  "Emergency Visits",
  "Priority Service",
  "1-month warranty on every completed service",
];

export const paymentSchedule = [
  { label: "Advance at contract confirmation", share: 0.5 },
  { label: "At contract completion, as mutually agreed", share: 0.5 },
];

export const contractDocumentation = [
  "Every service, visit, included facility, and payment is documented.",
  "Work records are maintained in writing throughout the contract.",
  "Your written contract states the selected plan, services, terms and conditions, payment schedule, and work records.",
];

// TODO(business): confirm before launch. Not rendered; tracked here for the owner.
export const pendingConfirmation = [
  "Number of scheduled service visits per year for each plan",
  "Coverage limits for card repair, leak repair and gas (per visit / per year)",
  "Whether spare parts are included or billed separately",
  "Emergency visit response terms",
  "Written warranty policy and exclusions",
];
