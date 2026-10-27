import {
  Building2,
  CircuitBoard,
  ClipboardCheck,
  Droplets,
  Drill,
  Fan,
  Snowflake,
  SprayCan,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategoryId = "repair" | "cleaning" | "installation" | "maintenance";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategoryId;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  short: string;
  description: string;
  situations: string[];
  involves: string[];
  priceIds: string[];
  officePlans?: boolean;
};

export const serviceCategories: { id: ServiceCategoryId; title: string; description: string }[] = [
  { id: "repair", title: "Repair & Diagnostics", description: "Fault finding and repair for split and inverter ACs." },
  { id: "cleaning", title: "Cleaning & Servicing", description: "Deep cleaning and routine servicing to keep your AC cooling well." },
  { id: "installation", title: "Installation & Gas", description: "New installations, gas charging and leak repair." },
  { id: "maintenance", title: "Maintenance", description: "Ongoing care for homes, offices and businesses." },
];

const IMG = {
  technician: { image: "/images/hero-technician.jpg", imageAlt: "Technician repairing a wall-mounted split AC indoor unit" },
  cleaning: { image: "/images/deep-cleaning.jpg", imageAlt: "Foam jet cleaning of a split AC coil with a protective cover" },
  installation: { image: "/images/installation.jpg", imageAlt: "Technician checking refrigerant pressure on an AC outdoor unit" },
  office: { image: "/images/office-ac-care.jpg", imageAlt: "Technician inspecting wall-mounted ACs in a modern office" },
} as const;

export const services: Service[] = [
  {
    slug: "ac-repair",
    title: "AC Repair",
    category: "repair",
    icon: Wrench,
    ...IMG.technician,
    short: "Diagnosis and repair for ACs that are not cooling, leaking, noisy or not turning on.",
    description:
      "When your AC stops working properly, a technician inspects the unit, identifies the likely cause, and explains the repair and its cost before any work begins.",
    situations: [
      "AC is running but not cooling",
      "Unit does not turn on or keeps tripping",
      "Water dripping from the indoor unit",
      "Unusual noise, smell or vibration",
      "Remote or display errors",
    ],
    involves: [
      "On-site inspection of indoor and outdoor units",
      "Fault diagnosis and explanation of the findings",
      "Repair quote agreed with you before work starts",
      "Repair and functional test after completion",
    ],
    priceIds: [],
  },
  {
    slug: "foamjet-deep-cleaning",
    title: "FoamJet Deep Cleaning",
    category: "cleaning",
    icon: SprayCan,
    ...IMG.cleaning,
    short: "Foam jet cleaning of the coil and indoor unit to remove built-up dust and dirt.",
    description:
      "FoamJet cleaning applies cleaning foam and a pressure jet to the indoor coil, with a protective cover to collect dirty water, helping your AC breathe freely again.",
    situations: [
      "Weak airflow or reduced cooling",
      "Dusty or musty smell when the AC runs",
      "AC has not been cleaned in a long time",
      "Before the start of summer",
    ],
    involves: [
      "Protective cover fitted around the indoor unit",
      "Foam application on the coil and fins",
      "Pressure jet rinse to wash out dust and dirt",
      "Filter cleaning and a cooling check afterwards",
    ],
    priceIds: [],
  },
  {
    slug: "ac-master-service",
    title: "AC Master Service",
    category: "cleaning",
    icon: ClipboardCheck,
    ...IMG.cleaning,
    short: "A complete service visit to clean, check and tune up your split AC.",
    description:
      "A master service is a thorough service visit for your split AC. The technician cleans the unit and checks its key components so you can head into the season with confidence.",
    situations: [
      "Seasonal service before or during summer",
      "Cooling has dropped over time",
      "You want a general health check of the AC",
    ],
    involves: [
      "Cleaning of indoor and outdoor units",
      "Filter and drain checks",
      "General inspection of electrical connections and operation",
      "Cooling performance check",
    ],
    priceIds: ["master-service"],
  },
  {
    slug: "ac-installation",
    title: "AC Installation",
    category: "installation",
    icon: Drill,
    ...IMG.installation,
    short: "Professional installation of split AC indoor and outdoor units.",
    description:
      "Correct installation matters for cooling, efficiency and the life of your AC. A technician mounts the units, connects the piping and checks that the system runs properly.",
    situations: ["New AC purchase", "Shifting to a new home or office", "Re-installing a relocated unit"],
    involves: [
      "Site check for indoor and outdoor unit placement",
      "Mounting of indoor unit and outdoor unit bracket",
      "Pipe, drain and electrical connections",
      "Test run and cooling check",
    ],
    priceIds: ["installation"],
  },
  {
    slug: "gas-charging",
    title: "Gas Charging",
    category: "installation",
    icon: Snowflake,
    ...IMG.installation,
    short: "Refrigerant gas charging with leak repair to restore cooling.",
    description:
      "Low refrigerant is usually caused by a leak. The technician checks pressures, repairs the leak, and charges gas so your AC can cool as intended.",
    situations: ["AC blows air that is not cold", "Ice forming on pipes", "Outdoor unit runs but cooling is weak"],
    involves: ["Pressure check with gauges", "Leak repair before charging", "Refrigerant gas charging", "Cooling performance check"],
    priceIds: ["leak-gas-1-ton", "leak-gas-1-5-ton"],
  },
  {
    slug: "leak-detection-and-repair",
    title: "Leak Detection & Repair",
    category: "installation",
    icon: Droplets,
    ...IMG.installation,
    short: "Finding and repairing refrigerant leaks, followed by gas charging.",
    description:
      "Refrigerant leaks reduce cooling and can return if not fixed properly. The technician locates the leak, repairs it, and recharges the system.",
    situations: ["Gas needs refilling repeatedly", "Oily marks around pipe joints", "Cooling drops after a recent gas refill"],
    involves: ["Leak search on joints, pipes and coils", "Repair of the leaking point", "Gas charging after repair", "Pressure and cooling check"],
    priceIds: ["leak-gas-1-ton", "leak-gas-1-5-ton"],
  },
  {
    slug: "inverter-ac-card-repair",
    title: "Inverter AC PCB / Card Repair",
    category: "repair",
    icon: CircuitBoard,
    ...IMG.technician,
    short: "Diagnosis and repair of inverter AC control boards (PCB / card).",
    description:
      "Inverter ACs depend on their control boards. The technician diagnoses the card fault and repairs it where possible, with the price confirmed after diagnosis.",
    situations: ["Error codes on the display", "AC starts then stops", "Outdoor unit does not start", "Unit dead after a power fluctuation"],
    involves: [
      "Error code and board diagnosis",
      "Card repair where repair is possible",
      "Price confirmed with you after diagnosis",
      "Reinstallation and test run",
    ],
    priceIds: ["inverter-card"],
  },
  {
    slug: "indoor-outdoor-unit-cleaning",
    title: "Indoor & Outdoor Unit Cleaning",
    category: "cleaning",
    icon: Fan,
    ...IMG.cleaning,
    short: "Cleaning of the indoor unit, filters and the outdoor condenser.",
    description:
      "Karachi dust builds up fast on filters and outdoor coils. Cleaning both units helps restore airflow and heat release.",
    situations: ["Visible dust on filters or vents", "Outdoor coil covered in dirt", "AC takes longer to cool the room"],
    involves: ["Filter and indoor unit cleaning", "Outdoor condenser coil cleaning", "Drain check", "Cooling check afterwards"],
    priceIds: [],
  },
  {
    slug: "ac-maintenance",
    title: "Residential & Commercial Maintenance",
    category: "maintenance",
    icon: Building2,
    ...IMG.office,
    short: "Ongoing AC maintenance for homes, offices and commercial spaces.",
    description:
      "Regular maintenance helps reduce breakdowns during peak summer. Offices with several units can choose an annual Office AC Care plan.",
    situations: ["Offices and shops with multiple ACs", "Homes wanting regular seasonal care", "Businesses that cannot afford AC downtime"],
    involves: [
      "Scheduled servicing as agreed",
      "Inspection and reporting of issues found",
      "Written records of services and visits for contracts",
      "Annual plans available for offices",
    ],
    priceIds: [],
    officePlans: true,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(service: Service, count = 3): Service[] {
  const others = services.filter((s) => s.slug !== service.slug);
  return [...others.filter((s) => s.category === service.category), ...others.filter((s) => s.category !== service.category)].slice(0, count);
}
