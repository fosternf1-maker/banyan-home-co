import { dateInWeek, lastOccurrence } from "./calendar.ts";
import type {
  ChecklistItem,
  Equipment,
  HistoryEvent,
  Home,
  Manager,
  ServiceNote,
  Store,
  Visit,
  VisitKind,
  VisitStatus,
} from "./types.ts";

const CHECKLISTS: Record<string, string[]> = {
  hurricane: [
    "Walk the roof for lifted tabs, exposed fasteners, and debris",
    "Check windows, doors, and the garage door for daylight",
    "Confirm downspouts, splash blocks, and positive fall",
    "Note limbs over the roof and along the tree line",
    "Test the generator, if the house has one",
    "Photograph anything that belongs on the punch list",
    "Write the punch list into the home record",
  ],
  filter: [
    "Read the filter size off the door, not from memory",
    "Inspect the filter and replace it if it is due",
    "Confirm the condensate drain is clear",
    "Listen for short-cycling at the air handler",
    "Note supply and return air at the nearest registers",
    "Photograph the data plate",
    "Record the next filter date on the equipment",
  ],
  rainy: [
    "Run water at each downspout and watch where it goes",
    "Check the known low spot, including the north bed",
    "Confirm irrigation is not adding to standing water",
    "Look at thresholds and window wells for moisture",
    "Note any interior staining since the last visit",
    "Photograph the grade that still holds water",
  ],
  audit: [
    "Walk every system already on the home record",
    "Confirm model and serial still match the plate",
    "Update standing: good, monitor, or act",
    "Write the punch list in priority order",
    "Set the next seasonal dates",
    "Photograph anything that changed since last time",
  ],
  heater: [
    "Confirm the shutoff and the TPR discharge line",
    "Flush until the water runs clear",
    "Inspect the anode if the valve allows it",
    "Look for corrosion at the nipples and the pan",
    "Note the age against the install date on the record",
    "Photograph the data plate and the pan",
  ],
  dryer: [
    "Measure the run and note every elbow",
    "Clean the duct to the exterior termination",
    "Confirm the exterior flap moves freely",
    "Photograph the elbow where lint collects",
    "Note the next cleaning on the equipment",
  ],
  away: [
    "Walk the exterior for openings or storm damage",
    "Confirm the HVAC is holding the setback",
    "Check for leaks under the sinks and at the water heater",
    "Bring in anything the member asked us to",
    "Lock up and let the temporary code expire",
    "Write what you saw, even if the house was quiet",
  ],
};

type Draft = {
  id: string;
  label: string;
  homeId: string;
  managerId: string;
  kindId: string;
  status: VisitStatus;
  date: string;
  time: string;
  durationMin: number;
  priority?: "normal" | "high";
  notes: string;
  completionNotes?: string;
  equipmentIds: string[];
  checkedThrough?: number;
};

/**
 * Fictional South Tampa houses. Street names include "Demo" on purpose.
 * Dates are computed from `now` so the open week is always the current week,
 * and earlier seasonal visits stay in the past on the home record.
 */
export function createDemoStore(now = new Date()): Store {
  const on = (month: number, day: number) => lastOccurrence(now, month, day);
  const week = (weekday: number) => dateInWeek(now, weekday);

  const homes: Home[] = [
    {
      id: "calder",
      name: "Calder house",
      member: "A. Calder (demo)",
      tier: "signature",
      address: "1842 Demo Avenue",
      neighborhood: "Hyde Park",
      city: "Tampa",
      state: "FL",
      zip: "33629",
      access:
        "Temporary code on the side gate. It expires when the visit ends. Demo only — there is no lockbox and no real member.",
      memberSince: on(0, 20),
      phone: "(813) 555-0142",
    },
    {
      id: "okonkwo",
      name: "Okonkwo house",
      member: "Okonkwo household (demo)",
      tier: "platinum",
      address: "90 Demo Circle",
      neighborhood: "Davis Islands",
      city: "Tampa",
      state: "FL",
      zip: "33606",
      access:
        "Member is away this month. Use the temporary code, then let it expire. Demo only.",
      memberSince: on(0, 20),
      phone: "(813) 555-0168",
    },
    {
      id: "voss",
      name: "Voss house",
      member: "Voss household (demo)",
      tier: "signature",
      address: "712 Demo Place",
      neighborhood: "Palma Ceia",
      city: "Tampa",
      state: "FL",
      zip: "33609",
      access:
        "Someone will be home. Do not use a lockbox. The north bed is the one that holds water. Demo only.",
      memberSince: on(1, 2),
      phone: "(813) 555-0194",
    },
    {
      id: "pell",
      name: "Pell house",
      member: "R. Pell (demo)",
      tier: "essentials",
      address: "4410 Demo Lane",
      neighborhood: "Culbreath Isles",
      city: "Tampa",
      state: "FL",
      zip: "33629",
      access:
        "Call from the drive. The member lets the Home Manager in. Demo only.",
      memberSince: on(5, 1),
      phone: "(813) 555-0117",
    },
  ];

  const managers: Manager[] = [
    { id: "mara", name: "Mara Ellison", color: "#2c5145" },
    { id: "chris", name: "Chris Adel", color: "#8f6620" },
  ];

  const kinds: VisitKind[] = [
    {
      id: "audit",
      name: "Home Health Audit",
      season: "Opening the record",
      summary:
        "A full walkthrough. Every system gets a standing, and the maintenance calendar is built for this house.",
    },
    {
      id: "hurricane",
      name: "Hurricane prep",
      season: "Hurricane",
      summary:
        "Pre-season look at roof, openings, drainage, and the tree line, with a written punch list.",
    },
    {
      id: "filter",
      name: "AC / summer filter",
      season: "Summer",
      summary:
        "Filter, condensate drain, and a note of what the air handler is actually doing.",
    },
    {
      id: "rainy",
      name: "Rainy-season drainage",
      season: "Rainy season",
      summary:
        "Where the water goes after a hard rain, and whether irrigation is making it worse.",
    },
    {
      id: "heater",
      name: "Water heater flush",
      season: "Scheduled service",
      summary: "Flush, anode if the valve allows it, and a photograph of the pan.",
    },
    {
      id: "dryer",
      name: "Dryer vent cleaning",
      season: "Scheduled service",
      summary: "The lint one. Measure the run, clean to the termination, photograph the elbow.",
    },
    {
      id: "away",
      name: "Away-from-home check",
      season: "Platinum",
      summary:
        "A quiet walk while the member is gone. Lock up, expire the code, write what you saw.",
    },
  ];

  const equipment: Equipment[] = [
    {
      id: "calder-hvac",
      homeId: "calder",
      system: "HVAC",
      name: "Air handler and condenser",
      manufacturer: "Carrier",
      model: "24ACC636A003",
      serial: "C-DEMO-2019-441",
      installed: "2019-04-18",
      standing: "good",
      notes: "3 ton. Coil was clean at the June visit. Drain line was clear.",
    },
    {
      id: "calder-heater",
      homeId: "calder",
      system: "Water heater",
      name: "Gas water heater, 50 gal",
      manufacturer: "Rheem",
      model: "PROG50S-36N",
      serial: "WH-DEMO-2016-088",
      installed: "2016-03-02",
      standing: "act",
      notes: "No flush on the record until this week's visit. Anode not inspected.",
    },
    {
      id: "calder-roof",
      homeId: "calder",
      system: "Roof",
      name: "Architectural shingle",
      manufacturer: "GAF",
      model: "Timberline HDZ",
      serial: "LOT-DEMO-2020-SH",
      installed: "2020-02-11",
      standing: "monitor",
      notes: "Two lifted tabs on the south slope, photographed in May.",
    },
    {
      id: "okonkwo-hvac",
      homeId: "okonkwo",
      system: "HVAC",
      name: "Air handler and condenser",
      manufacturer: "Trane",
      model: "4TTR6036",
      serial: "T-DEMO-2021-773",
      installed: "2021-06-01",
      standing: "good",
      notes: "Filter size is on the door. This week's visit is mid-checklist.",
    },
    {
      id: "okonkwo-roof",
      homeId: "okonkwo",
      system: "Roof",
      name: "Standing seam",
      manufacturer: "Fabral",
      model: "1.5-inch seam",
      serial: "ROOF-DEMO-2018-12",
      installed: "2018-11-20",
      standing: "good",
      notes: "Clear at the May programme. No lifted panels.",
    },
    {
      id: "okonkwo-gen",
      homeId: "okonkwo",
      system: "Generator",
      name: "Standby generator",
      manufacturer: "Generac",
      model: "7228",
      serial: "G-DEMO-2022-019",
      installed: "2022-05-14",
      standing: "good",
      notes: "Exercised during the May hurricane programme. Transfer switch labeled.",
    },
    {
      id: "okonkwo-heater",
      homeId: "okonkwo",
      system: "Water heater",
      name: "Gas water heater, 50 gal",
      manufacturer: "Navien",
      model: "NPE-240A2",
      serial: "NV-DEMO-2020-552",
      installed: "2020-08-03",
      standing: "good",
      notes: "Tankless. Descaled at the August audit. No leaks at the away checks.",
    },
    {
      id: "voss-hvac",
      homeId: "voss",
      system: "HVAC",
      name: "Air handler and condenser",
      manufacturer: "Lennox",
      model: "XC21-036",
      serial: "L-DEMO-2017-220",
      installed: "2017-08-09",
      standing: "monitor",
      notes: "Filter was changed in June. The November change is not on this week's board.",
    },
    {
      id: "voss-irr",
      homeId: "voss",
      system: "Irrigation",
      name: "Six-zone controller",
      manufacturer: "Rain Bird",
      model: "ESP-ME3",
      serial: "RB-DEMO-2015-014",
      installed: "2015-02-11",
      standing: "monitor",
      notes: "Zone 3 head still sprays the drive.",
    },
    {
      id: "voss-drain",
      homeId: "voss",
      system: "Drainage",
      name: "Grade and beds",
      manufacturer: "Site",
      model: "Original grade",
      serial: "GRADE-DEMO-2004",
      installed: "2004-01-15",
      standing: "monitor",
      notes: "North bed holds water after a hard rain. September visit left it on the punch list.",
    },
    {
      id: "pell-heater",
      homeId: "pell",
      system: "Water heater",
      name: "Gas water heater, 40 gal",
      manufacturer: "A. O. Smith",
      model: "GCR-40",
      serial: "AO-DEMO-2014-333",
      installed: "2014-09-19",
      standing: "act",
      notes: "Eleven years without a flush on the record. Sediment is what ends these early.",
    },
    {
      id: "pell-dryer",
      homeId: "pell",
      system: "Dryer vent",
      name: "Rigid duct to soffit",
      manufacturer: "Builder duct",
      model: "4-inch rigid",
      serial: "DUCT-DEMO-2008",
      installed: "2008-05-01",
      standing: "act",
      notes: "About 14 feet, one elbow. Lint was sitting there at the August audit. This is the fire one.",
    },
    {
      id: "pell-panel",
      homeId: "pell",
      system: "Electrical",
      name: "Main panel",
      manufacturer: "Square D",
      model: "HOM2040M200PC",
      serial: "SD-DEMO-2018-900",
      installed: "2018-01-12",
      standing: "good",
      notes: "200A. Labeled. No double-taps seen at the audit.",
    },
  ];

  const drafts: Draft[] = [
    {
      id: "visit-calder-audit",
      label: "VISIT-101",
      homeId: "calder",
      managerId: "mara",
      kindId: "audit",
      status: "completed",
      date: on(1, 18),
      time: "09:00",
      durationMin: 150,
      notes: "Opening audit. Build the record before the seasonal calendar starts.",
      completionNotes:
        "Water heater has no flush on file. Two lifted tabs on the south slope, to be looked at before May. HVAC was otherwise quiet.",
      equipmentIds: ["calder-hvac", "calder-heater", "calder-roof"],
    },
    {
      id: "visit-calder-hurricane",
      label: "VISIT-102",
      homeId: "calder",
      managerId: "mara",
      kindId: "hurricane",
      status: "completed",
      date: on(4, 12),
      time: "08:30",
      durationMin: 120,
      notes: "Signature pre-season programme. Written punch list stays on the house.",
      completionNotes:
        "Tabs still lifted, south slope. Photographed. Cheap to reseat before the first band. Drainage fell away from the house.",
      equipmentIds: ["calder-roof"],
    },
    {
      id: "visit-calder-filter",
      label: "VISIT-103",
      homeId: "calder",
      managerId: "chris",
      kindId: "filter",
      status: "completed",
      date: on(5, 9),
      time: "10:00",
      durationMin: 60,
      notes: "June filter. Size is on the air-handler door.",
      completionNotes:
        "Filter was 20×25×1 and loaded. Coil clean, drain line clear. Next filter belongs in November.",
      equipmentIds: ["calder-hvac"],
    },
    {
      id: "visit-okonkwo-audit",
      label: "VISIT-104",
      homeId: "okonkwo",
      managerId: "chris",
      kindId: "audit",
      status: "completed",
      date: on(1, 24),
      time: "09:00",
      durationMin: 150,
      notes: "Platinum opening audit, including the generator.",
      completionNotes:
        "Generator started and transferred. Roof clear. Water heater is tankless and was not yet due for a descale.",
      equipmentIds: ["okonkwo-hvac", "okonkwo-roof", "okonkwo-gen", "okonkwo-heater"],
    },
    {
      id: "visit-voss-audit",
      label: "VISIT-105",
      homeId: "voss",
      managerId: "mara",
      kindId: "audit",
      status: "completed",
      date: on(2, 3),
      time: "09:30",
      durationMin: 150,
      notes: "Opening audit. Ask about the north bed.",
      completionNotes:
        "North bed holds water. Zone 3 sprays the drive. HVAC filter was dated and due in June.",
      equipmentIds: ["voss-hvac", "voss-irr", "voss-drain"],
    },
    {
      id: "visit-okonkwo-hurricane",
      label: "VISIT-106",
      homeId: "okonkwo",
      managerId: "mara",
      kindId: "hurricane",
      status: "completed",
      date: on(4, 18),
      time: "08:00",
      durationMin: 120,
      notes: "Full hurricane programme, not a post-storm inspection.",
      completionNotes:
        "Generator exercised. Shutters accounted for. Roof clear. Nothing for a mitigation trade this season.",
      equipmentIds: ["okonkwo-roof", "okonkwo-gen"],
    },
    {
      id: "visit-voss-filter",
      label: "VISIT-107",
      homeId: "voss",
      managerId: "chris",
      kindId: "filter",
      status: "completed",
      date: on(5, 16),
      time: "11:00",
      durationMin: 60,
      notes: "June filter service.",
      completionNotes:
        "Filter changed. Drain line clear. November is the second change on the calendar.",
      equipmentIds: ["voss-hvac"],
    },
    {
      id: "visit-pell-audit",
      label: "VISIT-108",
      homeId: "pell",
      managerId: "chris",
      kindId: "audit",
      status: "completed",
      date: on(7, 4),
      time: "09:00",
      durationMin: 150,
      notes: "Essentials annual audit. The house had no record before this visit.",
      completionNotes:
        "Dryer vent has lint at the elbow on a long run. Water heater has no flush on file. Panel was quiet.",
      equipmentIds: ["pell-heater", "pell-dryer", "pell-panel"],
    },
    {
      id: "visit-okonkwo-audit-2",
      label: "VISIT-109",
      homeId: "okonkwo",
      managerId: "mara",
      kindId: "audit",
      status: "completed",
      date: on(7, 20),
      time: "09:00",
      durationMin: 120,
      notes: "Second audit of the year. Platinum.",
      completionNotes:
        "Tankless water heater descaled. Generator hour meter noted. No change in standing.",
      equipmentIds: ["okonkwo-hvac", "okonkwo-roof", "okonkwo-gen", "okonkwo-heater"],
    },
    {
      id: "visit-okonkwo-rainy",
      label: "VISIT-110",
      homeId: "okonkwo",
      managerId: "chris",
      kindId: "rainy",
      status: "completed",
      date: on(8, 8),
      time: "08:30",
      durationMin: 75,
      notes: "After the first hard rain of the month.",
      completionNotes:
        "Water left the lot. No staining at the thresholds. Irrigation was off.",
      equipmentIds: ["okonkwo-roof"],
    },
    {
      id: "visit-voss-rainy",
      label: "VISIT-111",
      homeId: "voss",
      managerId: "mara",
      kindId: "rainy",
      status: "completed",
      date: on(8, 22),
      time: "08:30",
      durationMin: 75,
      notes: "The north bed is the reason for the visit.",
      completionNotes:
        "North bed still holds water. Zone 3 was running onto the drive. Follow-up is on the board.",
      equipmentIds: ["voss-drain", "voss-irr"],
    },
    {
      id: "visit-calder-heater",
      label: "VISIT-112",
      homeId: "calder",
      managerId: "mara",
      kindId: "heater",
      status: "scheduled",
      date: week(1),
      time: "09:00",
      durationMin: 75,
      priority: "high",
      notes:
        "The February audit flagged this. Nine years without a flush. Do the anode if the valve allows it.",
      equipmentIds: ["calder-heater"],
    },
    {
      id: "visit-okonkwo-filter",
      label: "VISIT-113",
      homeId: "okonkwo",
      managerId: "chris",
      kindId: "filter",
      status: "in_progress",
      date: week(2),
      time: "10:30",
      durationMin: 60,
      notes: "Member is away. Temporary code. Filter size is on the door.",
      equipmentIds: ["okonkwo-hvac"],
      checkedThrough: 3,
    },
    {
      id: "visit-voss-followup",
      label: "VISIT-114",
      homeId: "voss",
      managerId: "mara",
      kindId: "rainy",
      status: "confirmed",
      date: week(3),
      time: "08:30",
      durationMin: 75,
      notes:
        "Follow-up from September. Confirm whether the north bed still holds water, and whether zone 3 was adjusted.",
      equipmentIds: ["voss-drain", "voss-irr"],
    },
    {
      id: "visit-pell-dryer",
      label: "VISIT-115",
      homeId: "pell",
      managerId: "chris",
      kindId: "dryer",
      status: "scheduled",
      date: week(4),
      time: "13:00",
      durationMin: 60,
      priority: "high",
      notes:
        "From the August audit. Lint at the elbow on a 14-foot run. The member will be home.",
      equipmentIds: ["pell-dryer"],
    },
    {
      id: "visit-okonkwo-away",
      label: "VISIT-116",
      homeId: "okonkwo",
      managerId: "mara",
      kindId: "away",
      status: "scheduled",
      date: week(5),
      time: "11:00",
      durationMin: 45,
      notes:
        "Monthly away check. Expire the code when you leave. Write it down even if nothing moved.",
      equipmentIds: ["okonkwo-hvac", "okonkwo-heater", "okonkwo-gen"],
    },
  ];

  const visits: Visit[] = [];
  const checklist: ChecklistItem[] = [];
  for (const draft of drafts) {
    const { checkedThrough, priority, completionNotes, ...visit } = draft;
    visits.push({
      ...visit,
      priority: priority ?? "normal",
      completionNotes: completionNotes ?? "",
    });
    const labels = CHECKLISTS[draft.kindId] ?? [];
    const through =
      draft.status === "completed" ? labels.length : (checkedThrough ?? 0);
    labels.forEach((label, index) => {
      checklist.push({
        id: `${draft.id}-${index + 1}`,
        visitId: draft.id,
        label,
        checked: index < through,
        sort: index,
      });
    });
  }

  const notes: ServiceNote[] = [
    {
      id: "note-okonkwo-filter",
      visitId: "visit-okonkwo-filter",
      date: week(2),
      content:
        "Filter was loaded and is out. Drain line is clear. Data plate photo is still owed before this visit is closed.",
    },
  ];

  let seq = 1;
  const history: HistoryEvent[] = [];
  const push = (
    equipmentId: string,
    visitId: string | null,
    date: string,
    summary: string,
    detail: string,
  ) => {
    history.push({
      id: `${equipmentId}-${seq}`,
      equipmentId,
      visitId,
      date,
      summary,
      detail,
      seq: seq++,
    });
  };

  for (const item of equipment) {
    push(
      item.id,
      null,
      item.installed,
      "Installed",
      `${item.manufacturer} ${item.model}. Serial ${item.serial}.`,
    );
  }

  const visitNotes: Array<[string, string, string, string]> = [
    [
      "calder-hvac",
      "visit-calder-audit",
      "Opened on the record",
      "2019 Carrier, 3 ton. Quiet at the opening audit. Filter service set for June.",
    ],
    [
      "calder-heater",
      "visit-calder-audit",
      "Opened on the record",
      "2016 Rheem, 50 gal. No flush on file. Standing set to act.",
    ],
    [
      "calder-roof",
      "visit-calder-audit",
      "Opened on the record",
      "2020 architectural shingle. Two lifted tabs, south slope. Standing set to monitor.",
    ],
    [
      "calder-roof",
      "visit-calder-hurricane",
      "Hurricane prep",
      "Tabs still lifted. Photographed for the May punch list. Drainage fell away from the house.",
    ],
    [
      "calder-hvac",
      "visit-calder-filter",
      "Filter service",
      "20×25×1 replaced. Coil clean. Drain line clear. Next filter in November.",
    ],
    [
      "okonkwo-hvac",
      "visit-okonkwo-audit",
      "Opened on the record",
      "2021 Trane. Filter size confirmed on the door. Standing good.",
    ],
    [
      "okonkwo-roof",
      "visit-okonkwo-audit",
      "Opened on the record",
      "2018 standing seam. No lifted panels.",
    ],
    [
      "okonkwo-gen",
      "visit-okonkwo-audit",
      "Opened on the record",
      "2022 Generac. Started and transferred at the opening audit.",
    ],
    [
      "okonkwo-heater",
      "visit-okonkwo-audit",
      "Opened on the record",
      "2020 Navien tankless. Descale not yet due.",
    ],
    [
      "voss-hvac",
      "visit-voss-audit",
      "Opened on the record",
      "2017 Lennox. Filter dated. June service put on the calendar.",
    ],
    [
      "voss-irr",
      "visit-voss-audit",
      "Opened on the record",
      "Zone 3 head sprays the drive. Standing monitor.",
    ],
    [
      "voss-drain",
      "visit-voss-audit",
      "Opened on the record",
      "North bed holds water. Standing monitor.",
    ],
    [
      "okonkwo-gen",
      "visit-okonkwo-hurricane",
      "Hurricane programme",
      "Exercised under load. Transfer switch labeled. Shutters accounted for.",
    ],
    [
      "okonkwo-roof",
      "visit-okonkwo-hurricane",
      "Hurricane programme",
      "Panels seated. Nothing for a mitigation trade.",
    ],
    [
      "voss-hvac",
      "visit-voss-filter",
      "Filter service",
      "Filter changed. Drain line clear.",
    ],
    [
      "pell-heater",
      "visit-pell-audit",
      "Opened on the record",
      "2014 A. O. Smith, 40 gal. No flush on file. Standing act.",
    ],
    [
      "pell-dryer",
      "visit-pell-audit",
      "Opened on the record",
      "Rigid 4-inch, about 14 feet, lint at the elbow. Standing act.",
    ],
    [
      "pell-panel",
      "visit-pell-audit",
      "Opened on the record",
      "2018 Square D, 200A. Labeled. No double-taps seen.",
    ],
    [
      "okonkwo-heater",
      "visit-okonkwo-audit-2",
      "Second audit",
      "Descale completed. No leaks at the connections.",
    ],
    [
      "okonkwo-gen",
      "visit-okonkwo-audit-2",
      "Second audit",
      "Hour meter noted. No fault codes.",
    ],
    [
      "okonkwo-roof",
      "visit-okonkwo-rainy",
      "Rainy-season check",
      "Water left the lot. No staining at the thresholds.",
    ],
    [
      "voss-drain",
      "visit-voss-rainy",
      "Rainy-season check",
      "North bed still holds water after the downspout test. Follow-up scheduled.",
    ],
    [
      "voss-irr",
      "visit-voss-rainy",
      "Rainy-season check",
      "Zone 3 was running onto the drive during the visit.",
    ],
    [
      "okonkwo-hvac",
      "visit-okonkwo-filter",
      "Visit in progress",
      "Filter out. Drain line clear. Data plate photo still owed.",
    ],
  ];

  for (const [equipmentId, visitId, summary, detail] of visitNotes) {
    const visit = visits.find((item) => item.id === visitId);
    if (!visit) continue;
    push(equipmentId, visitId, visit.date, summary, detail);
  }

  return { homes, managers, kinds, visits, checklist, equipment, history, notes };
}
