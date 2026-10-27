import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceIcons } from "@/components/services/serviceIcons";
import type { ServicePrice } from "@/data/pricing";
import { getService } from "@/data/services";
import { formatPKR } from "@/lib/utils";

export function ServicePriceCard({ price }: { price: ServicePrice }) {
  const service = getService(price.serviceSlug);
  const Icon = service ? serviceIcons[service.icon] : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1.5 hover:border-blue/30 hover:shadow-lift">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue to-cyan opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className="flex items-center gap-3">
        {Icon ? (
          <span className="grid size-10 place-items-center rounded-lg bg-ice text-blue">
            <Icon aria-hidden className="size-5" />
          </span>
        ) : null}
        <h3 className="text-base leading-snug font-bold">{price.title}</h3>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{price.description}</p>
      <div className="mt-6">
        {price.startingFrom ? (
          <p className="text-xs font-semibold tracking-wider text-muted uppercase">Starting from</p>
        ) : null}
        <p className="font-display text-3xl font-extrabold tracking-tight text-blue">{formatPKR(price.amount)}</p>
      </div>
      {service ? (
        <Link
          href={`/services/${service.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors duration-200 hover:text-blue"
        >
          About this service{" "}
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      ) : null}
    </article>
  );
}
