type ClassValue = string | false | null | undefined | 0 | ClassValue[];

/**
 * Lightweight className merger. Prefer this over string concatenation
 * so variant helpers stay readable. Upgrade to `clsx` + `tailwind-merge`
 * if conflicting Tailwind utilities become a pain.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string") {
      out.push(input);
      continue;
    }
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    }
  }

  return out.join(" ");
}
