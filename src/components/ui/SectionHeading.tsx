import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold tracking-[0.14em] uppercase",
        dark ? "bg-white/10 text-cyan ring-1 ring-white/15" : "bg-ice text-blue ring-1 ring-blue/15",
        className,
      )}
    >
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <Heading className={cn("text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[2.6rem]", dark && "text-white")}>
        {title}
      </Heading>
      {description ? (
        <p className={cn("text-base leading-relaxed sm:text-lg", dark ? "text-cyan/80" : "text-muted")}>{description}</p>
      ) : null}
    </div>
  );
}
