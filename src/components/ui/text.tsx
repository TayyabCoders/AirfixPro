import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const tones = {
  default: "text-foreground",
  muted: "text-muted",
  brand: "text-brand",
} as const;

const sizes = {
  sm: "text-sm leading-6",
  md: "text-base leading-7",
  lg: "text-lg leading-8",
} as const;

export type TextTone = keyof typeof tones;
export type TextSize = keyof typeof sizes;

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  tone?: TextTone;
  size?: TextSize;
  as?: "p" | "span" | "div";
};

export function Text({
  className,
  tone = "default",
  size = "md",
  as: Comp = "p",
  ...props
}: TextProps) {
  return (
    <Comp
      className={cn("text-pretty", tones[tone], sizes[size], className)}
      {...props}
    />
  );
}
