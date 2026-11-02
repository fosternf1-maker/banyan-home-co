export const VISIT_STATUSES = [
  "scheduled",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
] as const;

export type VisitStatus = (typeof VISIT_STATUSES)[number];

export type Priority = "normal" | "high";

export type Tier = "essentials" | "signature" | "platinum";

export type Standing = "good" | "monitor" | "act" | "retired";

export type Home = {
  id: string;
  name: string;
  member: string;
  tier: Tier;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  access: string;
  memberSince: string;
  phone: string;
};

export type Manager = {
  id: string;
  name: string;
  color: string;
};

export type VisitKind = {
  id: string;
  name: string;
  season: string;
  summary: string;
};

export type Visit = {
  id: string;
  label: string;
  homeId: string;
  managerId: string | null;
  kindId: string;
  status: VisitStatus;
  priority: Priority;
  date: string;
  time: string;
  durationMin: number;
  notes: string;
  completionNotes: string;
  equipmentIds: string[];
};

export type ChecklistItem = {
  id: string;
  visitId: string;
  label: string;
  checked: boolean;
  sort: number;
};

export type Equipment = {
  id: string;
  homeId: string;
  system: string;
  name: string;
  manufacturer: string;
  model: string;
  serial: string;
  installed: string;
  standing: Standing;
  notes: string;
};

export type HistoryEvent = {
  id: string;
  equipmentId: string;
  visitId: string | null;
  date: string;
  summary: string;
  detail: string;
  seq: number;
};

export type ServiceNote = {
  id: string;
  visitId: string;
  date: string;
  content: string;
};

export type Store = {
  homes: Home[];
  managers: Manager[];
  kinds: VisitKind[];
  visits: Visit[];
  checklist: ChecklistItem[];
  equipment: Equipment[];
  history: HistoryEvent[];
  notes: ServiceNote[];
};
