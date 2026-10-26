import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";

const sizes = {
  sm: { className: "h-10 w-10", px: 40 },
  md: { className: "h-11 w-11 sm:h-12 sm:w-12", px: 48 },
  lg: { className: "h-14 w-14 sm:h-16 sm:w-16", px: 64 },
} as const;

export type LogoSize = keyof typeof sizes;

export type LogoProps = {
  className?: string;
  size?: LogoSize;
  href?: string | false;
  priority?: boolean;
};

export function Logo({
  className,
  size = "md",
  href = "/",
  priority = false,
}: LogoProps) {
  const dim = sizes[size];
  const mark = (
    <Image
      src="/brand/airfixpro-logo.png"
      alt={siteConfig.name}
      width={dim.px}
      height={dim.px}
      priority={priority}
      className={cn("object-contain", dim.className, className)}
    />
  );

  if (href === false) return mark;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      aria-label={`${siteConfig.name} home`}
    >
      {mark}
    </Link>
  );
}
