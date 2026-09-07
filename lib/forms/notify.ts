import { site } from "@/lib/site";
import type { TradeSubmission, WaitlistSubmission } from "@/lib/forms/schema";

const ENDPOINT = "https://api.resend.com/emails";

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function inboxAddress() {
  return process.env.WAITLIST_TO || site.email;
}

/** The from-address must sit on a Resend-verified domain, so it is derived from
 *  the site's own address rather than an env var someone can typo. */
function fromAddress() {
  return `${site.name} <${site.email}>`;
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
