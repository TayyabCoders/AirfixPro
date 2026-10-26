import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const spacing = {
  sm: "py-10 sm:py-12",
  md: "py-14 sm:py-16",
  lg: "py-20 sm:py-24",
} as const;

export type SectionSpacing = keyof typeof spacing;

export type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: SectionSpacing;
  as?: "section" | "div" | "main";
};

export function Section({
  className,
  spacing: space = "md",
  as: Comp = "section",
  ...props
}: SectionProps) {
  return <Comp className={cn(spacing[space], className)} {...props} />;
}
