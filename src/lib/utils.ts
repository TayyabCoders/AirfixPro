export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** 34999 -> "Rs. 34,999"; 17499.5 -> "Rs. 17,499.50". Never rounds money silently. */
export function formatPKR(amount: number): string {
  const fractional = !Number.isInteger(amount);
  return `Rs. ${amount.toLocaleString("en-US", {
    minimumFractionDigits: fractional ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}
