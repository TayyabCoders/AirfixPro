import { Building2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { paymentSchedule, type OfficePlan } from "@/data/office-plans";
import { cn, formatPKR } from "@/lib/utils";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function OfficePlanCard({ plan, detailed = false }: { plan: OfficePlan; detailed?: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 hover:border-blue/40 hover:shadow-lift",
        detailed ? "p-7" : "p-5",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-blue to-navy text-white">
          <Building2 aria-hidden className="size-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold">{plan.name}</h3>
          <p className="text-sm text-muted">Annual care for up to {plan.units} AC units</p>
        </div>
      </div>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{formatPKR(plan.annualPrice)}</span>
        <span className="text-sm font-medium text-muted">/year</span>
      </p>

      {detailed ? (
        <>
          <dl className="mt-6 space-y-3 rounded-xl bg-ice p-4 text-sm">
            {paymentSchedule.map((step) => (
              <div key={step.label} className="flex items-start justify-between gap-4">
                <dt className="text-muted">
                  {Math.round(step.share * 100)}% {step.label.toLowerCase()}
                </dt>
                <dd className="shrink-0 font-semibold text-navy">{formatPKR(plan.annualPrice * step.share)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 grid gap-3">
            <ButtonLink href={`#office-inquiry`} variant="secondary">
              Request a quotation
            </ButtonLink>
            <ButtonLink href={whatsappUrl(`${whatsappMessages.office} I would like details on the ${plan.name}.`)} variant="outline">
              <WhatsAppIcon className="size-5 text-whatsapp" /> Ask on WhatsApp
            </ButtonLink>
          </div>
        </>
      ) : null}
    </article>
  );
}
