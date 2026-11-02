import { createDemoStore } from "./seed.ts";
import {
  VISIT_STATUSES,
  type Store,
  type VisitStatus,
} from "./types.ts";

const KEY = Symbol.for("banyan.field.demo");

type Bucket = { store?: Store };

function bucket(): Bucket {
  const g = globalThis as typeof globalThis & { [KEY]?: Bucket };
  if (!g[KEY]) g[KEY] = {};
  return g[KEY];
}

export function getStore(): Store {
  const held = bucket();
  if (!held.store) held.store = createDemoStore();
  return held.store;
}

export function resetStore(now = new Date()): Store {
  const store = createDemoStore(now);
  bucket().store = store;
  return store;
}

export function toggleChecklistItem(
  store: Store,
  visitId: string,
  itemId: string,
): boolean {
  const item = store.checklist.find(
    (entry) => entry.id === itemId && entry.visitId === visitId,
  );
  if (!item) return false;
  item.checked = !item.checked;
  return true;
}

export function setVisitStatus(
  store: Store,
  visitId: string,
  status: string,
): boolean {
  if (!(VISIT_STATUSES as readonly string[]).includes(status)) return false;
  const visit = store.visits.find((entry) => entry.id === visitId);
  if (!visit) return false;
  visit.status = status as VisitStatus;
  return true;
}

export function addServiceNote(
  store: Store,
  visitId: string,
  equipmentId: string,
  content: string,
  now = new Date(),
): string | null {
  const text = content.trim().replace(/\s+/g, " ");
  if (!text) return "Write the note before saving it.";
  if (text.length > 800) return "Keep the note under 800 characters.";
  const visit = store.visits.find((entry) => entry.id === visitId);
  if (!visit) return "That visit is not on the demo record.";
  const equipment = store.equipment.find((entry) => entry.id === equipmentId);
  if (!equipment || equipment.homeId !== visit.homeId) {
    return "Choose a system that belongs to this house.";
  }
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const id = `note-${visitId}-${store.notes.length + 1}`;
  store.notes.push({ id, visitId, date, content: text });
  const seq = store.history.reduce((max, event) => Math.max(max, event.seq), 0) + 1;
  store.history.push({
    id: `${equipmentId}-note-${seq}`,
    equipmentId,
    visitId,
    date,
    summary: "Service note",
    detail: text,
    seq,
  });
  return null;
}
