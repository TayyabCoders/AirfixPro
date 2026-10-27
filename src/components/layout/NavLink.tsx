"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string; activeClassName?: string };

export function NavLink({ href, className, activeClassName, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn(className, active && activeClassName)} {...props}>
      {children}
    </Link>
  );
}
