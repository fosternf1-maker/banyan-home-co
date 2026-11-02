import type {
  ChecklistItem,
  Equipment,
  HistoryEvent,
  Home,
  Manager,
  ServiceNote,
  Standing,
  Store,
  Visit,
  VisitKind,
  VisitStatus,
} from "./types.ts";

export type VisitCard = {
  id: string;
  label: string;
  date: string;
  time: string;
  status: VisitStatus;
  priority: Visit["priority"];
  homeId: string;
  homeName: string;
  neighborhood: string;
  kindName: string;
  season: string;
  managerName: string | null;
  managerColor: string;
  checklistDone: number;
  checklistTotal: number;
  equipmentNames: string[];
};

export type HomeSummary = {
  home: Home;
  visitCount: number;
  nextVisit: VisitCard | null;
  actCount: number;
  lastVisitDate: string | null;
};

export type HomeRecord = {
  home: Home;
  equipment: Array<Equipment & { latest: HistoryEvent | null }>;
  visits: VisitCard[];
  actCount: number;
};

export type VisitRecord = {
  visit: Visit;
  home: Home;
  manager: Manager | null;
  kind: VisitKind;
  checklist: ChecklistItem[];
  notes: ServiceNote[];
  equipment: Equipment[];
  prior: VisitCard | null;
  visitCount: number;
};

export type EquipmentRecord = {
  home: Home;
  equipment: Equipment;
  history: Array<HistoryEvent & { visitLabel: string | null }>;
};

function kindOf(store: Store, id: string): VisitKind | undefined {
  return store.kinds.find((kind) => kind.id === id);
}

function homeOf(store: Store, id: string): Home | undefined {
  return store.homes.find((home) => home.id === id);
}

function managerOf(store: Store, id: string | null): Manager | null {
  if (!id) return null;
  return store.managers.find((manager) => manager.id === id) ?? null;
}

export function toCard(store: Store, visit: Visit): VisitCard | null {
  const home = homeOf(store, visit.homeId);
  const kind = kindOf(store, visit.kindId);
  if (!home || !kind) return null;
  const manager = managerOf(store, visit.managerId);
  const items = store.checklist.filter((item) => item.visitId === visit.id);
  const equipmentNames = visit.equipmentIds
    .map((id) => store.equipment.find((item) => item.id === id)?.system)
    .filter((name): name is string => Boolean(name));
  return {
    id: visit.id,
    label: visit.label,
    date: visit.date,
    time: visit.time,
    status: visit.status,
    priority: visit.priority,
    homeId: home.id,
    homeName: home.name,
    neighborhood: home.neighborhood,
    kindName: kind.name,
    season: kind.season,
    managerName: manager?.name ?? null,
    managerColor: manager?.color ?? "#6b7c74",
    checklistDone: items.filter((item) => item.checked).length,
    checklistTotal: items.length,
    equipmentNames,
  };
}

export function visitsBetween(
  store: Store,
  start: string,
  end: string,
): VisitCard[] {
  return store.visits
    .filter((visit) => visit.date >= start && visit.date <= end)
    .map((visit) => toCard(store, visit))
    .filter((card): card is VisitCard => card !== null)
    .sort((a, b) => a.time.localeCompare(b.time) || a.label.localeCompare(b.label));
}

export function listHomes(store: Store): HomeSummary[] {
  return store.homes
    .map((home) => {
      const cards = store.visits
        .filter((visit) => visit.homeId === home.id)
        .map((visit) => toCard(store, visit))
        .filter((card): card is VisitCard => card !== null)
        .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
      const upcoming = cards.find(
        (card) => card.status !== "completed" && card.status !== "cancelled",
      );
      const last = [...cards].reverse().find((card) => card.status === "completed");
      const actCount = store.equipment.filter(
        (item) => item.homeId === home.id && item.standing === "act",
      ).length;
      return {
        home,
        visitCount: cards.length,
        nextVisit: upcoming ?? null,
        actCount,
        lastVisitDate: last?.date ?? null,
      };
    })
    .sort((a, b) => a.home.neighborhood.localeCompare(b.home.neighborhood));
}

export function getHome(store: Store, id: string): HomeRecord | null {
  const home = homeOf(store, id);
  if (!home) return null;
  const equipment = store.equipment
    .filter((item) => item.homeId === home.id)
    .map((item) => {
      const latest =
        store.history
          .filter((event) => event.equipmentId === item.id)
          .sort((a, b) => b.date.localeCompare(a.date) || b.seq - a.seq)[0] ??
        null;
      return { ...item, latest };
    })
    .sort((a, b) => a.system.localeCompare(b.system));
  const visits = store.visits
    .filter((visit) => visit.homeId === home.id)
    .map((visit) => toCard(store, visit))
    .filter((card): card is VisitCard => card !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
  return {
    home,
    equipment,
    visits,
    actCount: equipment.filter((item) => item.standing === "act").length,
  };
}

export function getVisit(store: Store, id: string): VisitRecord | null {
  const visit = store.visits.find((entry) => entry.id === id);
  if (!visit) return null;
  const home = homeOf(store, visit.homeId);
  const kind = kindOf(store, visit.kindId);
  if (!home || !kind) return null;
  const cards = store.visits
    .filter((entry) => entry.homeId === home.id && entry.status === "completed")
    .map((entry) => toCard(store, entry))
    .filter((card): card is VisitCard => card !== null)
    .filter((card) => card.date < visit.date || (card.date === visit.date && card.label < visit.label))
    .sort((a, b) => b.date.localeCompare(a.date) || b.label.localeCompare(a.label));
  return {
    visit,
    home,
    manager: managerOf(store, visit.managerId),
    kind,
    checklist: store.checklist
      .filter((item) => item.visitId === visit.id)
      .sort((a, b) => a.sort - b.sort),
    notes: store.notes
      .filter((note) => note.visitId === visit.id)
      .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id)),
    equipment: visit.equipmentIds
      .map((equipmentId) => store.equipment.find((item) => item.id === equipmentId))
      .filter((item): item is Equipment => Boolean(item)),
    prior: cards[0] ?? null,
    visitCount: store.visits.filter((entry) => entry.homeId === home.id).length,
  };
}

export function getEquipment(
  store: Store,
  homeId: string,
  equipmentId: string,
): EquipmentRecord | null {
  const home = homeOf(store, homeId);
  const equipment = store.equipment.find(
    (item) => item.id === equipmentId && item.homeId === homeId,
  );
  if (!home || !equipment) return null;
  const history = store.history
    .filter((event) => event.equipmentId === equipment.id)
    .sort((a, b) => b.date.localeCompare(a.date) || b.seq - a.seq)
    .map((event) => ({
      ...event,
      visitLabel: event.visitId
        ? (store.visits.find((visit) => visit.id === event.visitId)?.label ?? null)
        : null,
    }));
  return { home, equipment, history };
}

export function standingCount(store: Store, standing: Standing): number {
  return store.equipment.filter((item) => item.standing === standing).length;
}
