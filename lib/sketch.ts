export type SketchLayerId =
  | "roof"
  | "hvac"
  | "dryer"
  | "heater"
  | "irrigation"
  | "gutters"
  | "shutters";

export type SketchLayer = {
  id: SketchLayerId;
  index: string;
  name: string;
  title: string;
  body: string;
  detail: string;
  explode: { x: number; y: number };
};

export const sketchLayers: SketchLayer[] = [
  {
    id: "roof",
    index: "01",
    name: "Roof & tree line",
    title: "The May punch list",
    body: "Before the season starts asking, we walk the roof, the openings, the drainage, and the tree line. You get a written list in May, while the work can still be quiet.",
    detail: "Pre-season. South Tampa lots, not a generic checklist.",
    explode: { x: 0, y: -78 },
  },
  {
    id: "hvac",
    index: "02",
    name: "HVAC",
    title: "Filters, twice a year",
    body: "Whole-home filter service, on a calendar, so it is not another thing you keep in your head. Signature includes the visit. Platinum includes the filters.",
    detail: "$89 + filters as a scheduled service.",
    explode: { x: 56, y: 10 },
  },
  {
    id: "dryer",
    index: "03",
    name: "Dryer vent",
    title: "The job that waits",
    body: "Dryer vents get cleaned when someone remembers. Membership puts it on the same calendar as the rest of the house, with our own technicians.",
    detail: "$149, scheduled.",
    explode: { x: -52, y: 8 },
  },
  {
    id: "heater",
    index: "04",
    name: "Water heater",
    title: "Flush and inspect",
    body: "A yearly flush and inspection. Not a replacement speech. Just the maintenance a Tampa water heater is owed and almost never gets.",
    detail: "$179, on the calendar.",
    explode: { x: 42, y: 48 },
  },
  {
    id: "irrigation",
    index: "05",
    name: "Irrigation",
    title: "Zones after a wet June",
    body: "The timer you set in March is rarely still right in August. We check the zones, adjust them, and leave the lawn on a schedule that matches this coast.",
    detail: "$129, zone check and adjust.",
    explode: { x: 0, y: 62 },
  },
  {
    id: "gutters",
    index: "06",
    name: "Gutters & drainage",
    title: "Water has to go somewhere",
    body: "A Tampa afternoon storm is ordinary. Standing water against the house is not. Gutters and grade are checked with the rest of the openings, not as an afterthought.",
    detail: "Read with the roof and the tree line.",
    explode: { x: 8, y: -46 },
  },
  {
    id: "shutters",
    index: "07",
    name: "Shutters & openings",
    title: "Booked before the rush",
    body: "Shutter, generator, and sump service on the calendar in spring. We do not wait for the cone to be on television.",
    detail: "Attendance at the house is yours to ask for, or not.",
    explode: { x: 0, y: -18 },
  },
];

export const sketchIntro = {
  eyebrow: "Sketch",
  titleStart: "The house, taken apart into the",
  titleEm: "work.",
  lede: "Membership is not a repair company. It is the remembering — the calendar, the punch list, the person who can be there so the whole house does not have to live in your head.",
  scrollHint: "Scroll to separate the house. The part in front of you is the job.",
  simpleHint: "Choose a system. The house stays apart so you can read it.",
  staticHint:
    "Motion is off, so the house is shown already apart. Read any system below.",
} as const;
