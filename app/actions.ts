"use server";

import { clientKey, looksAutomated, rateLimited } from "@/lib/forms/guard";
import {
  confirmToMember,
  mailConfigured,
  notifyTrade,
  notifyWaitlist,
} from "@/lib/forms/notify";
import {
  parseTrade,
  parseWaitlist,
  type FormState,
} from "@/lib/forms/schema";

const BUSY: FormState = {
  status: "error",
  errors: {},
  message: "That was quick — give it a moment and try again.",
};

const FAILED: FormState = {
  status: "error",
  errors: {},
  message:
    "Something went wrong on our end and your details did not send. Please call (813) 330-0480 or write hello@banyanhomeco.com — that always reaches us.",
};

export async function joinFoundingList(
  _previous: FormState,
  data: FormData,
): Promise<FormState> {
  if (looksAutomated(data)) return { status: "sent", area: "year-one" };
  if (rateLimited(await clientKey())) return BUSY;

  const parsed = parseWaitlist(data);
  if (!parsed.ok) {
    return {
      status: "error",
      errors: parsed.errors,
      message: "Have a look at the highlighted fields.",
    };
  }

  if (!mailConfigured()) {
    console.error("[founding-list] RESEND_API_KEY unset. Submission:", parsed.value);
    return { status: "sent-unconfigured" };
  }

  try {
    await notifyWaitlist(parsed.value);
  } catch (error) {
    console.error("[founding-list] delivery failed", error, parsed.value);
    return FAILED;
  }

  try {
    await confirmToMember(parsed.value);
  } catch (error) {
    // The inbox copy is already sent; the member is on the list either way.
    console.error("[founding-list] acknowledgement failed", error);
  }

  return { status: "sent", area: parsed.value.area };
}

export async function applyAsTrade(
  _previous: FormState,
  data: FormData,
): Promise<FormState> {
  if (looksAutomated(data)) return { status: "sent", area: "year-one" };
  if (rateLimited(await clientKey())) return BUSY;

  const parsed = parseTrade(data);
  if (!parsed.ok) {
    return {
      status: "error",
      errors: parsed.errors,
      message: "Have a look at the highlighted fields.",
    };
  }

  if (!mailConfigured()) {
    console.error("[trade] RESEND_API_KEY unset. Submission:", parsed.value);
    return { status: "sent-unconfigured" };
  }

  try {
    await notifyTrade(parsed.value);
  } catch (error) {
    console.error("[trade] delivery failed", error, parsed.value);
    return FAILED;
  }

  return { status: "sent", area: "year-one" };
}
