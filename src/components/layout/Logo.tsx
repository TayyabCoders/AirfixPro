import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className={cn("group inline-flex shrink-0 items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid size-11 place-items-center rounded-full bg-white sm:size-12",
          dark ? "ring-2 ring-white/20" : "ring-1 ring-line",
        )}
      >
        <Image src={site.logo} alt="" width={44} height={44} priority className="size-10 object-contain sm:size-11" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-xl font-extrabold tracking-tight", dark ? "text-white" : "text-navy")}>
          AirFix<span className={dark ? "text-cyan" : "text-blue"}>Pro</span>
        </span>
        <span className={cn("mt-1 text-[10px] font-semibold tracking-[0.22em] uppercase", dark ? "text-cyan/70" : "text-muted")}>
          AC Services
        </span>
      </span>
    </Link>
  );
}
