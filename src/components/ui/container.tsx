import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const widths = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
} as const;

export type ContainerWidth = keyof typeof widths;

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: ContainerWidth;
};

export function Container({
  className,
  width = "lg",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", widths[width], className)}
      {...props}
    />
  );
}
