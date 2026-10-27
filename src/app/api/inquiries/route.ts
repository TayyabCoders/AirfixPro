import { sendEmail } from "@/lib/email";
import { forms, isFormId, summarize } from "@/lib/forms";
import { validateFields } from "@/lib/validation";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// ponytail: per-instance in-memory limiter; resets on cold start and isn't shared across
// serverless instances. Move to a shared store (e.g. Upstash/Redis) if abuse appears.
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status: number) => Response.json(body, { status });

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 10_000) return json({ error: "too_large" }, 413);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  const formId = body.form;
  if (!isFormId(formId)) return json({ error: "invalid_request" }, 400);
  // Honeypot: real visitors never see or fill this field.
  if (body.website) return json({ error: "invalid_request" }, 400);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return json({ error: "rate_limited" }, 429);

  const form = forms[formId];
  const { values, errors } = validateFields(form.fields, body);
  if (Object.keys(errors).length) return json({ error: "validation", errors }, 400);

  const result = await sendEmail({
    subject: form.subject(values),
    text: `${summarize(formId, values)}\n\nSent from the ${formId} form on the AirFixPro website.`,
    replyTo: values.email || undefined,
  });

  switch (result) {
    case "sent":
      return json({ ok: true }, 200);
    case "not_configured":
      return json({ error: "not_configured" }, 503);
    case "failed":
      return json({ error: "delivery_failed" }, 502);
    default: {
      const unreachable: never = result;
      return json({ error: String(unreachable) }, 500);
    }
  }
}
