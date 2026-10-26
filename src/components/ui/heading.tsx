import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const levels = {
  1: "text-4xl sm:text-5xl font-semibold tracking-tight",
  2: "text-3xl sm:text-4xl font-semibold tracking-tight",
  3: "text-2xl sm:text-3xl font-semibold tracking-tight",
  4: "text-xl font-semibold tracking-tight",
} as const;

export type HeadingLevel = keyof typeof levels;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  as?: "h1" | "h2" | "h3" | "h4";
};

export function Heading({
  className,
  level = 1,
  as,
  ...props
}: HeadingProps) {
  const Comp = as ?? (`h${level}` as "h1" | "h2" | "h3" | "h4");

  return (
    <Comp
      className={cn("text-balance text-foreground", levels[level], className)}
      {...props}
    />
  );
}
