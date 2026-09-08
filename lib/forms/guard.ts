import { headers } from "next/headers";

/**
 * A deliberately small in-memory limiter. It resets whenever the serverless
 * instance recycles, so it is a speed bump for casual abuse rather than a
 * guarantee — enough for a pre-launch brochure with no payment path. If the
 * founding list ever gets scraped seriously, move this to Upstash.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export async function clientKey() {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0].trim() || "unknown";
}

export function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) hits.clear();

  return recent.length > MAX_PER_WINDOW;
}

/**
 * Two cheap bot checks that cost a real person nothing: a field no human sees,
 * and the fact that nobody fills a nine-field form in under three seconds.
 */
export function looksAutomated(data: FormData) {
  const honeypot = data.get("company_website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  const raw = data.get("rendered_at");
  const renderedAt = typeof raw === "string" ? Number(raw) : NaN;
  if (!Number.isFinite(renderedAt)) return false;

  return Date.now() - renderedAt < 3000;
}
