/**
 * Local calendar days for the dispatch board.
 *
 * `calendarDate`, `weekRange`, and `daysInRange` are adapted from
 * OpenFieldService `src/client/calendar.ts`:
 * https://github.com/clawnify/OpenFieldService
 * Copyright (c) 2026 Clawnify. MIT License — see ../LICENSE and ../NOTICE.
 *
 * Scheduled dates are local calendar days, not UTC instants.
 */

export function calendarDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function weekRange(today = new Date()): [string, string] {
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return [calendarDate(monday), calendarDate(sunday)];
}

export function daysInRange(start: string, end: string): string[] {
  const days: string[] = [];
  const date = new Date(start + "T00:00:00");
  const last = new Date(end + "T00:00:00");
  while (date <= last) {
    days.push(calendarDate(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

/** Monday is 1, Sunday is 7. Returns the matching day in `today`'s week. */
export function dateInWeek(today: Date, weekday: number): string {
  const [start] = weekRange(today);
  const monday = new Date(start + "T00:00:00");
  monday.setDate(monday.getDate() + (weekday - 1));
  return calendarDate(monday);
}

/** Most recent month/day on or before `today`. `monthIndex` is 0-based. */
export function lastOccurrence(
  today: Date,
  monthIndex: number,
  day: number,
): string {
  const today0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let year = today.getFullYear();
  const candidate = new Date(year, monthIndex, day);
  if (candidate > today0) year -= 1;
  return calendarDate(new Date(year, monthIndex, day));
}

export function shiftDays(iso: string, days: number): string {
  const date = new Date(iso + "T00:00:00");
  date.setDate(date.getDate() + days);
  return calendarDate(date);
}

export function parseDay(value: string | undefined): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(value + "T00:00:00");
  if (Number.isNaN(date.getTime())) return null;
  if (calendarDate(date) !== value) return null;
  return date;
}
