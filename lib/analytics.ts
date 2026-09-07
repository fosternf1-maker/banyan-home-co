/**
 * Plausible, or nothing. Cookieless by design, so the brief's "no consent
 * banner unless it is cookieless" rule holds without a cookie dialog.
 *
 * Every call is a no-op until NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set and the
 * script has loaded, so the site works identically with analytics switched
 * off — which is how it ships until someone provisions an account.
 */
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

export type GoalName =
  | "Founding list submit"
  | "Trade form submit"
  | "Click to call"
  | "Click to email";

export function track(
  goal: GoalName,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;

  if (typeof window.plausible === "function") {
    window.plausible(goal, props ? { props } : undefined);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics] %s", goal, props ?? {});
  }
}
