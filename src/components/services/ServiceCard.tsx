import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import { getPrices } from "@/data/pricing";
import { formatPKR } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const prices = getPrices(service.priceIds);
  const from = prices.length ? Math.min(...prices.map((p) => p.amount)) : null;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-ice text-blue ring-1 ring-blue/10 transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
          <Icon aria-hidden className="size-6" />
        </span>
        {from !== null ? (
          <span className="rounded-full bg-ice px-3 py-1 text-xs font-semibold text-navy">From {formatPKR(from)}</span>
        ) : null}
      </div>
      <h3 className="mt-5 text-lg font-bold">
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{service.short}</p>
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm font-semibold">
        <span className="inline-flex items-center gap-1.5 text-blue">
          Learn more
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
        <Link
          href={`/booking?service=${service.slug}`}
          className="relative z-10 rounded-lg px-3 py-1.5 text-navy ring-1 ring-line transition-colors hover:bg-navy hover:text-white"
          aria-label={`Book ${service.title}`}
        >
          Book
        </Link>
      </div>
    </article>
  );
}
