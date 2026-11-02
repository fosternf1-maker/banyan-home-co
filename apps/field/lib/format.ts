import type { Standing, Tier, VisitStatus } from "@/lib/types";

export const statusLabel: Record<VisitStatus, string> = {
  scheduled: "Scheduled",
  confirmed: "Confirmed",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const standingLabel: Record<Standing, string> = {
  good: "Good",
  monitor: "Monitor",
  act: "Act",
  retired: "Retired",
};

export const tierLabel: Record<Tier, string> = {
  essentials: "Essentials",
  signature: "Signature",
  platinum: "Platinum",
};

export function formatTime(hhmm: string): string {
  const [hourRaw, minuteRaw] = hhmm.split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return hhmm;
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function formatDay(iso: string, withWeekday = true): string {
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: withWeekday ? "short" : undefined,
    month: "short",
    day: "numeric",
  });
}

export function formatLong(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMonthYear(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatRange(start: string, end: string): string {
  const startDate = new Date(start + "T00:00:00");
  const endDate = new Date(end + "T00:00:00");
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const startText = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const endText = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (!sameYear) {
    return `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} – ${endText}`;
  }
  return `${startText} – ${endText}`;
}

export function formatInstalled(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
