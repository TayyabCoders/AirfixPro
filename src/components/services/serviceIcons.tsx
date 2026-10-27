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
import type { ServiceIconId } from "@/data/services";

export const serviceIcons: Record<ServiceIconId, LucideIcon> = {
  wrench: Wrench,
  sprayCan: SprayCan,
  clipboardCheck: ClipboardCheck,
  drill: Drill,
  snowflake: Snowflake,
  droplets: Droplets,
  circuitBoard: CircuitBoard,
  fan: Fan,
  building2: Building2,
};
