import assert from "node:assert/strict";
import test from "node:test";
import { dateInWeek, lastOccurrence, weekRange } from "./calendar.ts";
import { getEquipment, getHome, getVisit, visitsBetween } from "./queries.ts";
import { createDemoStore } from "./seed.ts";
import { addServiceNote, setVisitStatus, toggleChecklistItem } from "./store.ts";

const today = new Date(2026, 10, 2);

test("the open week is the current Monday through Sunday", () => {
  const [start, end] = weekRange(today);
  assert.equal(start, "2026-11-02");
  assert.equal(end, "2026-11-08");
  assert.equal(dateInWeek(today, 1), "2026-11-02");
  assert.equal(dateInWeek(today, 5), "2026-11-06");
  assert.equal(lastOccurrence(today, 4, 12), "2026-05-12");
});

test("demo homes carry a seasonal record and this week's visits", () => {
  const store = createDemoStore(today);
  assert.equal(store.homes.length, 4);
  const [start, end] = weekRange(today);
  const week = visitsBetween(store, start, end);
  assert.ok(week.length >= 4);

  for (const home of store.homes) {
    const record = getHome(store, home.id);
    assert.ok(record);
    assert.ok(record.equipment.length >= 3);
    const months = new Set(record.visits.map((visit) => visit.date.slice(0, 7)));
    assert.ok(months.size >= 2, `${home.name} should span more than one month`);
    for (const item of record.equipment) {
      assert.ok(item.model);
      assert.ok(item.serial);
      assert.match(item.installed, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(item.latest);
    }
  }

  const seasons = new Set(store.kinds.map((kind) => kind.id));
  for (const id of ["hurricane", "filter", "rainy"]) {
    assert.ok(seasons.has(id));
    const visit = store.visits.find((entry) => entry.kindId === id);
    assert.ok(visit);
    const items = store.checklist.filter((item) => item.visitId === visit.id);
    assert.ok(items.length >= 5);
  }

  const heater = getVisit(store, "visit-calder-heater");
  assert.equal(heater?.visit.date, "2026-11-02");
  assert.equal(heater?.checklist.every((item) => !item.checked), true);
  const inProgress = getVisit(store, "visit-okonkwo-filter");
  assert.equal(inProgress?.visit.status, "in_progress");
  assert.equal(inProgress?.checklist.filter((item) => item.checked).length, 3);
});

test("checklist, status, and equipment notes stay on the same house", () => {
  const store = createDemoStore(today);
  assert.equal(toggleChecklistItem(store, "visit-calder-heater", "visit-calder-heater-1"), true);
  assert.equal(
    store.checklist.find((item) => item.id === "visit-calder-heater-1")?.checked,
    true,
  );
  assert.equal(toggleChecklistItem(store, "visit-pell-dryer", "visit-calder-heater-1"), false);

  assert.equal(setVisitStatus(store, "visit-calder-heater", "confirmed"), true);
  assert.equal(store.visits.find((visit) => visit.id === "visit-calder-heater")?.status, "confirmed");
  assert.equal(setVisitStatus(store, "visit-calder-heater", "nope"), false);

  const before = store.history.filter((event) => event.equipmentId === "calder-heater").length;
  const error = addServiceNote(
    store,
    "visit-calder-heater",
    "pell-dryer",
    "This note must not cross houses.",
    today,
  );
  assert.ok(error);
  assert.equal(addServiceNote(store, "visit-calder-heater", "calder-heater", "   ", today), "Write the note before saving it.");
  assert.equal(
    addServiceNote(store, "visit-calder-heater", "calder-heater", "Anode looks original.", today),
    null,
  );
  const equipment = getEquipment(store, "calder", "calder-heater");
  assert.equal(equipment?.history[0]?.summary, "Service note");
  assert.match(equipment?.history[0]?.detail ?? "", /Anode looks original/);
  assert.equal(
    store.history.filter((event) => event.equipmentId === "calder-heater").length,
    before + 1,
  );
});
