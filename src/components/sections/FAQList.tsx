import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";

/** Native <details> disclosure: keyboard accessible with zero JavaScript. */
export function FAQList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left font-semibold text-navy transition-colors hover:bg-page sm:px-7">
            <h3 className="font-sans text-base sm:text-lg">{item.q}</h3>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ice text-blue transition-transform duration-300 group-open:rotate-45">
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p className="px-5 pb-6 leading-relaxed text-muted sm:px-7">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
