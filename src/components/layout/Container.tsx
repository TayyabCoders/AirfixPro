import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  // Without tailwind-merge, a later max-w-* in className would lose to max-w-7xl in the cascade.
  const hasMaxWidth = typeof className === "string" && /\bmax-w-/.test(className);
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", !hasMaxWidth && "max-w-7xl", className)} {...props}>
      {children}
    </div>
  );
}
