import { site } from "@/lib/site";
import type { TradeSubmission, WaitlistSubmission } from "@/lib/forms/schema";

const ENDPOINT = "https://api.resend.com/emails";

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function inboxAddress() {
  return process.env.WAITLIST_TO || site.email;
}

/**
 * Resend will send from its own shared sender the moment you have an API key,
 * with no DNS at all. That is fine for a notification landing in our own
 * inbox, so the forms can go live before the domain is verified.
 *
 * It is NOT fine for the acknowledgement a prospective member receives — a
 * launch email from `onboarding@resend.dev` reads as spam and spends the
 * credibility the rest of the site is built on. So the member email only
 * sends once RESEND_FROM is set to an address on our own verified domain.
 */
const SHARED_SENDER = "onboarding@resend.dev";

function fromAddress() {
  return process.env.RESEND_FROM || `${site.name} <${SHARED_SENDER}>`;
}

export function ownDomainVerified() {
  const from = process.env.RESEND_FROM;
  return !!from && !from.includes(SHARED_SENDER);
}

async function send(payload: Record<string, unknown>) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Resend responded ${response.status}: ${await response.text()}`,
    );
  }
}

const areaLine = {
  "year-one": "IN YEAR-ONE AREA",
  expansion: "Outside year one — expansion list",
  "out-of-area": "Out of area — told plainly",
} as const;

export async function notifyWaitlist(entry: WaitlistSubmission) {
  const lines = [
    `${areaLine[entry.area]}`,
    "",
    `Name:          ${entry.name}`,
    `Email:         ${entry.email}`,
    `Mobile:        ${entry.mobile}`,
    `ZIP:           ${entry.zip}`,
    `Neighbourhood: ${entry.neighborhood || "—"}`,
    `Home type:     ${entry.homeType || "—"}`,
    `Contact:       ${entry.contactRole || "—"}`,
    `Tier asked:    ${entry.tier || "—"}`,
    "",
    "Note:",
    entry.note || "—",
  ].join("\n");

  await send({
    from: fromAddress(),
    to: [inboxAddress()],
    reply_to: entry.email,
    subject: `[Founding list] ${entry.name} · ${entry.zip}`,
    text: lines,
  });
}

/** Best-effort acknowledgement. A failure here must not tell the member their
 *  submission was lost — it wasn't; the inbox copy already went. */
export async function confirmToMember(entry: WaitlistSubmission) {
  if (!ownDomainVerified()) return;

  const opening =
    entry.area === "year-one"
      ? "You're on the founding list. We open mid-January 2027, and we will write before anyone can buy a membership."
      : entry.area === "expansion"
        ? "Year one is South Tampa only — 33606, 33609, 33611 and 33629. We have kept your name, and we expand by neighbourhood rather than by advertisement."
        : "We are not the right fit for that address yet, and we would rather say so than keep you waiting on something we cannot deliver.";

  await send({
    from: fromAddress(),
    to: [entry.email],
    subject: "Banyan Home Co. — we have your name",
    text: [
      `${entry.name},`,
      "",
      opening,
      "",
      "Nothing about this creates a membership or reserves a slot. There is no membership agreement in force, and pricing stays planned until membership is actually for sale.",
      "",
      `If you need something before January, the phone is the main door: ${site.phoneDisplay}.`,
      "",
      site.name,
      site.email,
    ].join("\n"),
  });
}

export async function notifyTrade(entry: TradeSubmission) {
  const lines = [
    `Company:        ${entry.company}`,
    `Licence:        ${entry.license}`,
    `Trades:         ${entry.trades}`,
    `Years (resi):   ${entry.years || "—"}`,
    `Service ZIPs:   ${entry.zips || "—"}`,
    `Gen. liability: ${entry.generalLiability}`,
    `Workers' comp:  ${entry.workersComp}`,
    "",
    `Contact:        ${entry.contact}`,
    `Email:          ${entry.email}`,
    `Phone:          ${entry.phone || "—"}`,
    "",
    "Note:",
    entry.note || "—",
  ].join("\n");

  await send({
    from: fromAddress(),
    to: [inboxAddress()],
    reply_to: entry.email,
    subject: `[Trade] ${entry.company}`,
    text: lines,
  });
}
