import { site } from "@/config/site";

export type DeliveryResult = "sent" | "not_configured" | "failed";

type Email = { subject: string; text: string; replyTo?: string };

/** Sends via the Resend REST API. Server-only: reads secrets from the environment. */
export async function sendEmail({ subject, text, replyTo }: Email): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !from) return "not_configured";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [process.env.INQUIRY_TO_EMAIL || site.email],
        subject: subject.replace(/[\r\n]+/g, " ").slice(0, 200),
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`Inquiry email failed with status ${res.status}`);
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error("Inquiry email request error:", error instanceof Error ? error.name : "unknown");
    return "failed";
  }
}
