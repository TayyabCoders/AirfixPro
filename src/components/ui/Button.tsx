import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-gradient-to-r from-blue to-blue-hover text-white shadow-[0_8px_20px_-8px_rgb(7_137_209/0.7)] hover:from-blue-hover hover:to-blue-hover hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgb(7_137_209/0.85)]",
  secondary: "bg-navy text-white hover:bg-navy-800 hover:-translate-y-0.5 hover:shadow-lift",
  outline: "border border-line bg-surface text-navy hover:border-blue hover:text-blue hover:-translate-y-0.5 hover:shadow-soft",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-hover hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgb(11_122_69/0.55)]",
  white: "bg-white text-navy hover:bg-ice hover:-translate-y-0.5",
  ghostLight: "border border-white/25 text-white hover:bg-white/10",
  link: "px-0! h-auto! text-blue underline-offset-4 hover:underline",
} as const;

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export type ButtonStyleProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string };

export function buttonClass({ variant = "primary", size = "md", className }: ButtonStyleProps = {}): string {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 rounded-xl font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out",
    "active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = ButtonStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & { href: string; children: ReactNode };

/** Internal routes use next/link; tel:, mailto: and external URLs use a plain anchor. */
export function ButtonLink({ href, variant, size, className, children, ...props }: ButtonLinkProps) {
  const classes = buttonClass({ variant, size, className });

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      {children}
    </a>
  );
}
