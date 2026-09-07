import { neighborhoods, year1Zips } from "@/lib/site";

export type FieldErrors = Record<string, string>;

export type AreaVerdict = "year-one" | "expansion" | "out-of-area";

export type FormState =
  | { status: "idle" }
  | { status: "error"; errors: FieldErrors; message?: string }
  | { status: "sent"; area: AreaVerdict }
  | { status: "sent-unconfigured" };

export const idleState: FormState = { status: "idle" };

/**
 * Year-one ZIPs are the four South Tampa codes. Everything else in Hillsborough
 * and Pinellas (335xx / 336xx) is somewhere we might plausibly reach by
 * expanding a neighbourhood at a time, so those names are worth keeping.
 * Anything further away gets told the truth rather than a soft maybe.
 */
export function classifyZip(zip: string): AreaVerdict {
  if ((year1Zips as readonly string[]).includes(zip)) return "year-one";
  if (/^33[56]\d{2}$/.test(zip)) return "expansion";
  return "out-of-area";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(data: FormData, key: string) {
  const raw = data.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export const homeTypes = [
  "Single-family",
  "Condo or townhome",
  "Other",
] as const;

export const contactRoles = [
  "Me",
  "A household manager",
  "Someone else",
] as const;

export type WaitlistSubmission = {
  name: string;
  email: string;
  mobile: string;
  zip: string;
  neighborhood: string;
  homeType: string;
  note: string;
  contactRole: string;
  tier: string;
  area: AreaVerdict;
};

export function parseWaitlist(
  data: FormData,
): { ok: true; value: WaitlistSubmission } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const name = text(data, "name");
  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > 120) errors.name = "That name is longer than we can store.";

  const email = text(data, "email");
  if (!email) errors.email = "We need an email to write to you in January.";
  else if (!EMAIL_RE.test(email)) errors.email = "That address doesn't look right.";

  const mobileRaw = text(data, "mobile");
  const mobile = digitsOnly(mobileRaw);
  if (!mobile) errors.mobile = "We need a mobile number for the launch text.";
  else if (mobile.length < 10 || mobile.length > 11)
    errors.mobile = "Enter a 10-digit US mobile number.";

  const zip = text(data, "zip");
  if (!zip) errors.zip = "Your ZIP tells us whether we can reach you in year one.";
  else if (!/^\d{5}$/.test(zip)) errors.zip = "Enter a 5-digit ZIP code.";

  const neighborhood = text(data, "neighborhood");
  const allowedHoods: string[] = [...neighborhoods, "Other", ""];
  if (!allowedHoods.includes(neighborhood))
    errors.neighborhood = "Choose one of the listed neighbourhoods.";

  const homeType = text(data, "homeType");
  if (homeType && !(homeTypes as readonly string[]).includes(homeType))
    errors.homeType = "Choose one of the listed options.";

  const contactRole = text(data, "contactRole");
  if (contactRole && !(contactRoles as readonly string[]).includes(contactRole))
    errors.contactRole = "Choose one of the listed options.";

  const note = text(data, "note");
  if (note.length > 300) errors.note = "Please keep this under 300 characters.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      email,
      mobile,
      zip,
      neighborhood,
      homeType,
      note,
      contactRole,
      tier: text(data, "tier"),
      area: classifyZip(zip),
    },
  };
}

export type TradeSubmission = {
  company: string;
  license: string;
  trades: string;
  years: string;
  zips: string;
  generalLiability: string;
  workersComp: string;
  contact: string;
  email: string;
  phone: string;
  note: string;
};

export function parseTrade(
  data: FormData,
): { ok: true; value: TradeSubmission } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const company = text(data, "company");
  if (!company) errors.company = "Please give us the company name.";

  const license = text(data, "license");
  if (!license) errors.license = "We verify every licence through DBPR before we call.";

  const trades = text(data, "trades");
  if (!trades) errors.trades = "Tell us what you do.";

  const contact = text(data, "contact");
  if (!contact) errors.contact = "Who should we ask for?";

  const email = text(data, "email");
  if (!email) errors.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(email)) errors.email = "That address doesn't look right.";

  const phone = digitsOnly(text(data, "phone"));
  if (phone && (phone.length < 10 || phone.length > 11))
    errors.phone = "Enter a 10-digit US number.";

  const note = text(data, "note");
  if (note.length > 300) errors.note = "Please keep this under 300 characters.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      company,
      license,
      trades,
      years: text(data, "years"),
      zips: text(data, "zips"),
      generalLiability: text(data, "generalLiability") || "Not stated",
      workersComp: text(data, "workersComp") || "Not stated",
      contact,
      email,
      phone,
      note,
    },
  };
}
