/**
 * Tampa Bay hurricane-prep copy. Safety claims in this file are paraphrases of
 * the official pages listed on each route. Do not add a figure that is not
 * already on one of those pages.
 */

export const HURRICANE_UPDATED = "2026-10-09";

export const hurricaneDisclaimer =
  "General information, not professional, insurance, or legal advice. Always follow official evacuation orders from your county.";

export type SourceLink = { name: string; href: string };

export const official = {
  fdemZone: {
    name: "Florida Division of Emergency Management — Know Your Zone",
    href: "https://www.floridadisaster.org/knowyourzone/",
  },
  fdemPlan: {
    name: "Florida Division of Emergency Management — Plan & Prepare",
    href: "https://www.floridadisaster.org/planprepare/",
  },
  fdemHome: {
    name: "Florida Division of Emergency Management — Planning for Your Home",
    href: "https://www.floridadisaster.org/planprepare/home/",
  },
  fdemGuide: {
    name: "Florida Division of Emergency Management — 2024 Hurricane Guide (PDF)",
    href: "https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf",
  },
  pinellasZone: {
    name: "Pinellas County — Know Your Zone",
    href: "https://pinellas.gov/evacuation-zone/",
  },
  pinellasFinder: {
    name: "Pinellas County — Know Your Zone address lookup",
    href: "https://kyz.pinellas.gov/",
  },
  pinellasEvac: {
    name: "Pinellas County — Evacuation",
    href: "https://pinellas.gov/evacuation/",
  },
  pinellasPlan: {
    name: "Pinellas County Emergency Management — Make a Plan",
    href: "https://pinellas.gov/make-a-plan/",
  },
  pinellasHome: {
    name: "Pinellas County — Secure Your Home",
    href: "https://pinellas.gov/plan-home-preparation/",
  },
  pascoFinder: {
    name: "Pasco County — Evacuation zone finder",
    href: "https://pascogis.pascocountyfl.net/evaczone/finder.html",
  },
  hillsboroughEm: {
    name: "Hillsborough County — Emergency Management",
    href: "https://hcfl.gov/residents/public-safety/emergency-management",
  },
  hillsboroughHeat: {
    name: "Hillsborough County — Hurricane Evacuation Assessment Tool (HEAT)",
    href: "https://hcfl.gov/HEAT",
  },
  hillsboroughProtect: {
    name: "Hillsborough County — Protect your home during severe weather",
    href: "https://hcfl.gov/residents/stay-safe/plan/protect-your-home-business-and-valuables-during-severe-weather",
  },
  nhc: {
    name: "National Hurricane Center",
    href: "https://www.nhc.noaa.gov/",
  },
  nwsTbw: {
    name: "National Weather Service Tampa Bay",
    href: "https://www.weather.gov/tbw/",
  },
  readyHurricanes: {
    name: "Ready.gov — Hurricanes",
    href: "https://www.ready.gov/hurricanes",
  },
  readyKit: {
    name: "Ready.gov — Build a kit",
    href: "https://www.ready.gov/kit",
  },
  readyGenerators: {
    name: "Ready.gov — Power outages and generator safety",
    href: "https://www.ready.gov/generators",
  },
  cfoStorm: {
    name: "Florida Department of Financial Services — Hurricane ready",
    href: "https://www.myfloridacfo.com/division/consumers/storm",
  },
  floir: {
    name: "Florida Office of Insurance Regulation",
    href: "https://floir.gov/",
  },
  cpscRelease: {
    name: "CPSC — Generator, carbon monoxide, and fire hazards ahead of the 2026 hurricane season",
    href: "https://www.cpsc.gov/Newsroom/News-Releases/2026/CPSC-Warns-of-Generator-Carbon-Monoxide-and-Fire-Hazards-Ahead-of-Hurricane-Season",
  },
  cpscHazards: {
    name: "CPSC — Portable generator hazards",
    href: "https://www.cpsc.gov/safety-education/safety-guides/carbon-monoxide/portable-generator-hazards",
  },
} as const satisfies Record<string, SourceLink>;

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type GuideSection = {
  id: string;
  heading: string;
  blocks: Block[];
};

export type HowToStep = { name: string; text: string };

export type GuidePost = {
  slug: string;
  path: string;
  title: string;
  ogTitle: string;
  description: string;
  dek: string;
  sections: GuideSection[];
  howTo: { name: string; description: string; steps: HowToStep[] };
  related: { href: string; label: string }[];
  sources: SourceLink[];
};

export type PrintGroup = { title: string; items: string[] };

export type Printable = {
  slug: string;
  path: string;
  pdfPath: string;
  title: string;
  ogTitle: string;
  description: string;
  dek: string;
  groups: PrintGroup[];
  sources: SourceLink[];
};

const post = (
  slug: string,
  data: Omit<GuidePost, "slug" | "path">,
): GuidePost => ({
  slug,
  path: `/hurricane/${slug}`,
  ...data,
});

export const posts: GuidePost[] = [
  post("72-hour-home-checklist", {
    title: "72-hour pre-storm home checklist",
    ogTitle: "The 72 hours before a Tampa Bay storm.",
    description:
      "A three-day action list for a Tampa Bay house when a storm is in the forecast: zone, supplies, openings, and leaving if your county orders it.",
    dek: "Three days of tasks. Supplies that last longer than three days. Leave when your county says leave.",
    sections: [
      {
        id: "clock",
        heading: "A clock, not a three-day pantry",
        blocks: [
          {
            type: "p",
            text: "Use this when a storm is aimed at Tampa Bay and you still have a few days. It is the work of those days. It is not a claim that three days of food is enough. [Florida's Division of Emergency Management](https://www.floridadisaster.org/planprepare/) asks households to keep a disaster supply kit for at least seven days. [Ready.gov](https://www.ready.gov/kit) starts from one gallon of water per person per day for several days, for drinking and sanitation.",
          },
          {
            type: "p",
            text: "Watch the [National Hurricane Center](https://www.nhc.noaa.gov/) and [NWS Tampa Bay](https://www.weather.gov/tbw/). Your county, not a forecast graphic, decides whether you leave.",
          },
        ],
      },
      {
        id: "three-days",
        heading: "About three days out",
        blocks: [
          {
            type: "ol",
            items: [
              "Look up your evacuation zone and write it where the household can see it. Hillsborough uses [HEAT](https://hcfl.gov/HEAT). Pinellas uses the [Know Your Zone lookup](https://kyz.pinellas.gov/). Pasco uses the [zone finder](https://pascogis.pascocountyfl.net/evaczone/finder.html). The statewide map is [Know Your Zone](https://www.floridadisaster.org/knowyourzone/).",
              "Decide where you would go if that zone is ordered out, and who out of the area you will call. [FDEM](https://www.floridadisaster.org/knowyourzone/) says friends or family outside the zone are often the easier option. Shelters are published by the county when they open.",
              "Refill prescriptions toward a minimum two-week supply, and keep a written list of names and doses with the medicine. That figure is from the [state hurricane guide](https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf).",
              "Buy water and food for at least seven days. One gallon of water per person per day is the [Ready.gov](https://www.ready.gov/kit) drinking-and-sanitation figure. The [shopping list](/hurricane/shopping-list) is the store run.",
              "During hurricane season, [FDEM](https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf) says to keep a gas tank at least half full so you are not in the last-day line. Follow the vehicle manual for an electric car, and read Hillsborough's separate note on flooded EV batteries on the [protect-the-house](/hurricane/protect-the-house) page.",
            ],
          },
        ],
      },
      {
        id: "day-before",
        heading: "The day before expected impacts",
        blocks: [
          {
            type: "ul",
            items: [
              "When a hurricane warning is issued, [Pinellas County](https://pinellas.gov/make-a-plan/) says to bring in yard items such as furniture, toys, bird baths, and barbecue grills. If you can pick it up, put it up — that is [FDEM's](https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf) line for anything that can become a missile.",
              "Clear gutters and downspouts. [Ready.gov](https://www.ready.gov/hurricanes) lists that with bringing furniture in and considering hurricane shutters.",
              "Openings: [FDEM](https://www.floridadisaster.org/planprepare/home/) says windows, doors, and garage doors should be impact resistant or have a protective covering — rated hurricane shutters, or properly secured 5/8-inch plywood. Ask the local building official what your city requires before you fasten anything.",
              "Charge phones and put a backup battery in the go-bag. [Ready.gov](https://www.ready.gov/hurricanes) says you may not be able to buy these things for days or weeks afterward.",
              "Set the go-bag by the door. The [evacuation list](/hurricane/checklists/go-bag) is the short version.",
            ],
          },
        ],
      },
      {
        id: "ordered",
        heading: "If your zone is ordered out",
        blocks: [
          {
            type: "p",
            text: "[Ready.gov](https://www.ready.gov/hurricanes) says if you live in a mandatory evacuation zone and local officials tell you to evacuate, do so immediately. Do not wait to see the water. [FDEM](https://www.floridadisaster.org/knowyourzone/) says the greatest threat to life from a hurricane is storm surge flooding, and that you should follow every evacuation order if you are in an ordered zone, a low-lying flood area, or a mobile home.",
          },
          {
            type: "p",
            text: "[Pinellas County](https://pinellas.gov/evacuation/) says residents of mobile homes and manufactured homes must evacuate because of the wind, even when a surge zone is not called for the rest of the street.",
          },
        ],
      },
      {
        id: "staying",
        heading: "If you are not ordered to leave",
        blocks: [
          {
            type: "p",
            text: "That is still the county's call, and it can change. [FDEM](https://www.floridadisaster.org/knowyourzone/) says that if you are not in an ordered zone, a low-lying flood area, a mobile home, or an unsafe structure, it may be safer to stay — and that knowing whether the house can take wind and rain is the homeowner's responsibility. Homes built after 2002 generally include stronger features, their page says, only if the roof, straps, windows, doors, and garage door are in proper condition.",
          },
          {
            type: "p",
            text: "If you stay, [Ready.gov](https://www.ready.gov/hurricanes) says to take refuge in a designated shelter or an interior room for high winds. If flood water traps you, go to the highest level. Do not climb into a closed attic. You can be trapped by rising water.",
          },
        ],
      },
    ],
    howTo: {
      name: "72-hour pre-storm home checklist for Tampa Bay",
      description:
        "What to do in the three days before expected hurricane impacts in Hillsborough, Pinellas, or Pasco.",
      steps: [
        {
          name: "Confirm the forecast and your zone",
          text: "Check the National Hurricane Center and NWS Tampa Bay, then look up your county evacuation zone and write it down.",
        },
        {
          name: "Set a place to go",
          text: "Choose where the household will go if that zone is ordered to evacuate, and name an out-of-area contact.",
        },
        {
          name: "Refill medicines",
          text: "Move prescriptions toward a two-week supply and keep a written list with the bottles.",
        },
        {
          name: "Stock at least seven days",
          text: "Water and food for at least seven days, using one gallon of water per person per day for drinking and sanitation as the Ready.gov baseline.",
        },
        {
          name: "Fuel the car",
          text: "Keep a gas tank at least half full during hurricane season. Follow the manual for an electric vehicle.",
        },
        {
          name: "Secure the yard and openings",
          text: "Bring in anything that can fly, clear gutters, and cover windows, doors, and the garage door with rated shutters or properly secured 5/8-inch plywood after checking with the local building official.",
        },
        {
          name: "Stage the go-bag and charge phones",
          text: "Charge phones, pack a backup battery, and put the go-bag by the door.",
        },
        {
          name: "Leave if ordered",
          text: "If local officials order your zone to evacuate, leave immediately. Do not wait on the water.",
        },
      ],
    },
    related: [
      { href: "/hurricane/checklists/home-prep", label: "Printable home-prep list" },
      { href: "/hurricane/checklists/go-bag", label: "Evacuation go-bag" },
      { href: "/hurricane/protect-the-house", label: "Windows, doors, garage, pool, and yard" },
      { href: "/hurricane/shopping-list", label: "Get your stuff" },
    ],
    sources: [
      official.readyHurricanes,
      official.readyKit,
      official.fdemPlan,
      official.fdemZone,
      official.fdemHome,
      official.fdemGuide,
      official.hillsboroughHeat,
      official.pinellasFinder,
      official.pinellasEvac,
      official.pinellasPlan,
      official.pascoFinder,
      official.nhc,
      official.nwsTbw,
    ],
  }),
  post("florida-supply-kit", {
    title: "Hurricane supply kit for Florida families",
    ogTitle: "A supply kit for a Florida household.",
    description:
      "What Florida and Ready.gov say to put in a hurricane kit: seven days of supplies, one gallon of water per person per day, and the extras families actually use.",
    dek: "Build it before a name is on the map. Store it where you can carry it.",
    sections: [
      {
        id: "how-long",
        heading: "How many days",
        blocks: [
          {
            type: "p",
            text: "Two official numbers, and they are not the same sentence. [Ready.gov](https://www.ready.gov/kit) says that after an emergency you may need to get by for several days, and that water is one gallon per person per day for several days, for drinking and sanitation. [FDEM's Plan & Prepare page](https://www.floridadisaster.org/planprepare/) says a Florida kit should last at least seven days. The [state hurricane guide](https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf) repeats that seven-day figure for every person in the home, and elsewhere describes a kit that lets you live on your own for three to seven days. [Pinellas County](https://pinellas.gov/make-a-plan/) tells households to think about what each person needs for two weeks, and lists a one-week supply of non-perishable food alongside one gallon of water per person per day.",
          },
          {
            type: "p",
            text: "For a Tampa Bay house, pack to the Florida seven-day floor, and longer if someone in the home cannot easily replace medicine or food. The [printable kit list](/hurricane/checklists/supply-kit) is the box. The [shopping list](/hurricane/shopping-list) is the cart.",
          },
        ],
      },
      {
        id: "basic",
        heading: "The basic kit",
        blocks: [
          {
            type: "p",
            text: "[Ready.gov](https://www.ready.gov/kit) says to bag items and keep the kit in one or two containers you can carry, such as a bin or a duffel. Its basic list:",
          },
          {
            type: "ul",
            items: [
              "Water, one gallon per person per day for several days, for drinking and sanitation",
              "Non-perishable food for at least several days",
              "Battery-powered or hand-crank radio, and a NOAA Weather Radio with tone alert",
              "Flashlight and extra batteries",
              "First aid kit",
              "Whistle",
              "Dust mask",
              "Plastic sheeting, scissors, and duct tape, listed for sheltering in place — not as a window covering",
              "Moist towelettes, garbage bags, and plastic ties",
              "Wrench or pliers to turn off utilities",
              "Manual can opener",
              "Local maps",
              "Cell phone, chargers, and a backup battery",
            ],
          },
        ],
      },
      {
        id: "household",
        heading: "What your household adds",
        blocks: [
          {
            type: "p",
            text: "Ready.gov's additional list is the one that makes a kit fit a family. Pull only what applies.",
          },
          {
            type: "ul",
            items: [
              "Prescription medicine. The state guide recommends a minimum two-week supply, kept current, plus a written list of doses.",
              "Non-prescription medicine you already use, such as pain relievers, plus glasses and contact-lens solution",
              "Infant formula, bottles, diapers, wipes, and rash cream",
              "Pet food and extra water. [Pinellas](https://pinellas.gov/make-a-plan/) says if you evacuate, take pets with you, on a leash or in a carrier, to a place that allows them.",
              "Cash, copies of ID and insurance policies, and a waterproof container. [The Department of Financial Services](https://www.myfloridacfo.com/division/consumers/storm) says to take copies of legal, financial, and medical papers if you leave.",
              "A change of clothes, sturdy shoes, a sleeping bag or blanket, soap, sanitizer, and hygiene supplies",
              "Paper, a pencil, and something quiet for children",
            ],
          },
        ],
      },
      {
        id: "keep",
        heading: "Where it lives, and when you refresh it",
        blocks: [
          {
            type: "p",
            text: "[Ready.gov](https://www.ready.gov/kit) says to keep a home kit where everyone can find it, a smaller kit at work for at least 24 hours, and a kit in the car in case you are stranded. Keep canned food cool and dry. Store boxed food in closed plastic or metal containers. Replace what expires. Look at the kit again each year, because the people in the house change.",
          },
          {
            type: "p",
            text: "Plastic sheeting and duct tape are on the Ready.gov list for sheltering in place. They are not a substitute for shutters. Window and door coverings are on the [house page](/hurricane/protect-the-house).",
          },
        ],
      },
    ],
    howTo: {
      name: "Build a Florida hurricane supply kit",
      description:
        "Assemble a household hurricane kit using Ready.gov's basic list and Florida's at-least-seven-day supply guidance.",
      steps: [
        {
          name: "Count people and days",
          text: "Plan at least seven days for every person in the home. Use one gallon of water per person per day for drinking and sanitation.",
        },
        {
          name: "Pack the basic items",
          text: "Water, non-perishable food, a weather radio, flashlight, batteries, first aid, whistle, sanitation supplies, a manual can opener, maps, and a phone charger with a backup battery.",
        },
        {
          name: "Add what only your household needs",
          text: "Prescriptions toward a two-week supply, infant supplies, pet food and water, copies of documents, cash, clothes, and comfort items for children.",
        },
        {
          name: "Store it so you can leave with it",
          text: "Keep the home kit in one or two containers you can carry, and put smaller kits at work and in the car.",
        },
        {
          name: "Refresh it",
          text: "Replace expired food and medicine, and review the kit once a year.",
        },
      ],
    },
    related: [
      { href: "/hurricane/checklists/supply-kit", label: "Printable supply-kit list" },
      { href: "/hurricane/shopping-list", label: "Shopping list" },
      { href: "/hurricane/checklists/go-bag", label: "Go-bag" },
      { href: "/hurricane/72-hour-home-checklist", label: "72-hour home checklist" },
    ],
    sources: [
      official.readyKit,
      official.fdemPlan,
      official.fdemGuide,
      official.pinellasPlan,
      official.cfoStorm,
    ],
  }),
  post("protect-the-house", {
    title: "Protect windows, doors, the garage, the pool, and the yard",
    ogTitle: "Windows, doors, garage, pool, and yard.",
    description:
      "What Florida and Tampa Bay counties say about covering openings, the garage door, the pool, and loose objects in the yard before a hurricane.",
    dek: "Wind gets in through openings. Loose things in the yard become the things that hit them.",
    sections: [
      {
        id: "openings",
        heading: "Windows and doors",
        blocks: [
          {
            type: "p",
            text: "[FDEM](https://www.floridadisaster.org/planprepare/home/) says the most important precaution for reducing damage is to protect the places wind can enter: roof, straps, windows, doors, and garage doors. The same page says windows, doors, and garage doors should be impact resistant or have a protective covering — rated hurricane shutters, or properly secured 5/8-inch plywood — secured to the opening.",
          },
          {
            type: "p",
            text: "It also says to contact the local building code official about what a home improvement requires. Do that before you drill. A sheet of plywood that is not fastened the way your city expects is not the covering FDEM describes. [Ready.gov](https://www.ready.gov/hurricanes) puts it more shortly: clear drains and gutters, bring in outside furniture, and consider hurricane shutters.",
          },
          {
            type: "p",
            text: "[Pinellas County's Secure Your Home page](https://pinellas.gov/plan-home-preparation/) says to shutter windows and doors, lower or remove awnings, and shut doors. None of this is a guarantee the house will be spared. It is the work those agencies publish.",
          },
        ],
      },
      {
        id: "garage",
        heading: "The garage door",
        blocks: [
          {
            type: "p",
            text: "The [state hurricane guide](https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf) says more than 90 percent of damage to homes during hurricanes begins when garage doors fail, because the door is typically the largest and weakest opening. It says wind-rated doors are good and impact-rated doors are better, that a rating is usually a sticker listing pounds per square foot, and that if there is no sticker you ask the builder or manufacturer.",
          },
          {
            type: "p",
            text: "On a door you already have, that guide says to check that mounting screws are tight and the track is not loose, to replace rusted pins or worn rollers, and to consider a bracing kit if the door is weak. [Pinellas](https://pinellas.gov/plan-home-preparation/) says to reinforce the door with a brace kit or long steel or aluminum bars, and to lock it. [Hillsborough County](https://hcfl.gov/residents/stay-safe/plan/protect-your-home-business-and-valuables-during-severe-weather) says to cover garage windows the way you cover the house, and to pull vehicles farther inside so a door pushed inward is less likely to reach them.",
          },
          {
            type: "p",
            text: "Electric vehicles are a separate Hillsborough note on that same page. If you evacuate and flooding is expected, the county says not to leave an EV in the garage, to park it in an elevated spot, to leave the battery at only a 30 percent charge, to park it 50 feet from structures and other vehicles, and not to leave it plugged in. Read that page before you treat every car the same.",
          },
        ],
      },
      {
        id: "yard",
        heading: "Pool and yard",
        blocks: [
          {
            type: "p",
            text: "[Pinellas County](https://pinellas.gov/make-a-plan/) says high winds can turn even heavy objects into projectiles that break windows, doors, and walls. Before storms threaten: prune trees and shrubs and do not leave piles of branches, keep gutters and downspouts clear, and consider replacing rock mulch with shredded bark. When a hurricane warning is issued, bring in furniture, toys, bird baths, and grills.",
          },
          {
            type: "p",
            text: "On the pool, Pinellas says do not drain it. Super-chlorinate the water and turn off electricity to the pool for the storm. The county's [Secure Your Home](https://pinellas.gov/plan-home-preparation/) list adds: take yard items inside, clear balconies, steps, and porches, pick up loose debris, and clear nearby storm drains if you can. The [state guide](https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf) says if you can pick it up, put it up, and to hire someone when the job needs a chainsaw or equipment you do not know.",
          },
        ],
      },
    ],
    howTo: {
      name: "Prepare a Tampa Bay house's openings, garage, pool, and yard",
      description:
        "Official steps for windows, doors, the garage door, the pool, and loose yard objects before a hurricane.",
      steps: [
        {
          name: "Cover openings the way your city allows",
          text: "Use impact-resistant windows and doors, rated hurricane shutters, or properly secured 5/8-inch plywood. Ask the local building official before you install anything.",
        },
        {
          name: "Check the garage door",
          text: "Confirm whether it is wind-rated or impact-rated, tighten loose track hardware, and lock the door. A bracing kit is what FDEM and Pinellas describe for a weak door.",
        },
        {
          name: "Place vehicles with the county's distinction",
          text: "Hillsborough says to pull vehicles toward the back wall of the garage, and gives separate rules for electric vehicles if flooding is expected.",
        },
        {
          name: "Clear the yard",
          text: "Bring in furniture, toys, and grills when a warning is issued. Clear gutters and loose debris. Do not leave branch piles.",
        },
        {
          name: "Leave water in the pool",
          text: "Pinellas says do not drain the pool. Super-chlorinate it and turn off pool power for the storm.",
        },
      ],
    },
    related: [
      { href: "/hurricane/checklists/home-prep", label: "Printable home-prep list" },
      { href: "/hurricane/72-hour-home-checklist", label: "72-hour checklist" },
      { href: "/hurricane/generator-safety", label: "Generator safety" },
      { href: "/hurricane", label: "Hurricane prep hub" },
    ],
    sources: [
      official.fdemHome,
      official.fdemGuide,
      official.readyHurricanes,
      official.pinellasPlan,
      official.pinellasHome,
      official.hillsboroughProtect,
    ],
  }),
  post("after-the-storm", {
    title: "After the storm: safety, then a record of the damage",
    ogTitle: "After the storm: safety, then the record.",
    description:
      "What to avoid after a Tampa Bay hurricane, and how Florida's CFO says to photograph and list damage. Not insurance advice.",
    dek: "Stay out of the water. Then, if it is safe to be there, make a record. This page does not read your policy.",
    sections: [
      {
        id: "wait",
        heading: "Wait until they say the storm is over",
        blocks: [
          {
            type: "p",
            text: "[FDEM's hurricane guide](https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf) says not to go outside until the winds have calmed and local officials say the threat has passed. There is more debris, and the next band can still be dangerous. [Ready.gov](https://www.ready.gov/hurricanes) says to pay attention to local officials for special instructions.",
          },
        ],
      },
      {
        id: "water",
        heading: "Flood water and power",
        blocks: [
          {
            type: "p",
            text: "[Ready.gov](https://www.ready.gov/hurricanes) says do not walk, swim, or drive through flood water. Turn around. Its page states that six inches of fast-moving water can knock you down, and one foot of moving water can sweep a vehicle away. Flood water can hold debris, chemicals, waste, and wildlife, and downed lines can charge it.",
          },
          {
            type: "ul",
            items: [
              "Do not touch electrical equipment if it is wet or if you are standing in water. If it is safe to do so, turn off electricity at the main breaker. That is Ready.gov.",
              "[FDEM](https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf) says never use a wet electrical device, and to wait for an electrician to check it. Stay clear of fallen power lines and call the electric company.",
              "Do not enter a damaged building until local authorities say it is safe. Leave if you hear shifting or unusual noises.",
              "[Ready.gov](https://www.ready.gov/hurricanes) says children should not help with disaster cleanup, and that people with asthma, other lung conditions, or immune suppression should not enter buildings with indoor water leaks or mold you can see or smell.",
              "If the power is out, [Ready.gov's outage page](https://www.ready.gov/generators) says a refrigerator keeps food cold for about four hours and a full freezer for about 48 hours if the door stays shut. Throw food out if it has been at 40 degrees or higher for two hours or more.",
            ],
          },
          {
            type: "p",
            text: "Generators are a separate hazard. The short version is outdoors, never in the garage, at least 20 feet from the house. The [generator page](/hurricane/generator-safety) has the CPSC wording.",
          },
        ],
      },
      {
        id: "record",
        heading: "A record, not a claim strategy",
        blocks: [
          {
            type: "p",
            text: "Banyan does not interpret a policy, tell you what is covered, or handle a claim. The notes below are what the [Florida Department of Financial Services](https://www.myfloridacfo.com/division/consumers/storm) and [Ready.gov](https://www.ready.gov/hurricanes) publish. Questions about your policy belong with your insurer, with DFS, or with the [Office of Insurance Regulation](https://floir.gov/).",
          },
          {
            type: "ul",
            items: [
              "Ready.gov says to document property damage with photographs and to contact your insurance company for assistance.",
              "DFS says to make an itemized list of belongings, including costs, purchase dates, and serial numbers, and to attach receipts, especially for expensive items. Dated photographs or video are on that list too.",
              "DFS says to keep receipts for cash purchases and for additional living expenses if you are out of the house. It also says standard homeowners policies usually do not cover flood, and tells you not to assume — check the policy. That is their statement, not a reading of yours.",
              "The banner on the DFS storm page says: following storm damage, don't sign anything — call the Insurance Consumer Helpline first, 1-877-693-5236 (1-877-MY-FL-CFO), weekdays 8 a.m. to 5 p.m. Eastern.",
            ],
          },
          {
            type: "p",
            text: "Photograph only when it is safe to be in the space. The [post-storm checklist](/hurricane/checklists/post-storm) puts safety first and the camera second.",
          },
        ],
      },
    ],
    howTo: {
      name: "Stay safer after a hurricane and record the damage",
      description:
        "Safety steps after a Tampa Bay hurricane, then the documentation steps published by Ready.gov and the Florida Department of Financial Services.",
      steps: [
        {
          name: "Wait for local officials",
          text: "Stay inside until officials say the threat has passed.",
        },
        {
          name: "Stay out of flood water",
          text: "Do not walk, swim, or drive through flood water. Six inches of fast-moving water can knock you down, and one foot can sweep a vehicle.",
        },
        {
          name: "Treat power as live",
          text: "Do not touch wet electrical equipment. Stay away from downed lines. Do not enter a damaged building until authorities say it is safe.",
        },
        {
          name: "Photograph damage when it is safe",
          text: "Ready.gov says to document property damage with photographs. DFS says dated photos and an itemized list with receipts help show what you had.",
        },
        {
          name: "Call before you sign",
          text: "DFS says not to sign anything after storm damage, and to call 1-877-693-5236 first. This page does not tell you what a policy pays.",
        },
      ],
    },
    related: [
      { href: "/hurricane/checklists/post-storm", label: "Printable post-storm list" },
      { href: "/hurricane/generator-safety", label: "Generator safety" },
      { href: "/hurricane/72-hour-home-checklist", label: "72-hour checklist" },
      { href: "/hurricane", label: "Hurricane prep hub" },
    ],
    sources: [
      official.readyHurricanes,
      official.readyGenerators,
      official.fdemGuide,
      official.cfoStorm,
      official.floir,
    ],
  }),
  post("generator-safety", {
    title: "Generator safety",
    ogTitle: "A generator stays outside.",
    description:
      "CPSC and Ready.gov rules for a portable generator after a Florida storm: never indoors or in the garage, at least 20 feet from the house, exhaust pointed away.",
    dek: "Carbon monoxide does not smell like anything. The garage counts as indoors.",
    sections: [
      {
        id: "where",
        heading: "Where it can run",
        blocks: [
          {
            type: "p",
            text: "The [U.S. Consumer Product Safety Commission](https://www.cpsc.gov/Newsroom/News-Releases/2026/CPSC-Warns-of-Generator-Carbon-Monoxide-and-Fire-Hazards-Ahead-of-Hurricane-Season) says portable generators are one of the leading causes of post-storm carbon monoxide deaths. Carbon monoxide is colorless and odorless and can kill within minutes, often before symptoms are obvious.",
          },
          {
            type: "ul",
            items: [
              "Never use a portable generator inside a home, garage, basement, crawlspace, shed, or other enclosed area, even if doors or windows are open.",
              "Operate it outdoors only, at least 20 feet from homes and buildings, with the exhaust directed away from windows, doors, and vents.",
              "[Ready.gov](https://www.ready.gov/generators) says the same distance from windows, doors, and attached garages, and says to use a generator only outdoors and away from windows.",
              "[FDEM](https://www.floridadisaster.org/globalassets/fdem-hurricane-guide-2024.pdf) says never use portable gasoline or coal-burning equipment or camp stoves inside the home, basement, or garage, and to keep them at least 20 feet from any window, door, or vent.",
            ],
          },
        ],
      },
      {
        id: "alarms",
        heading: "Alarms, fuel, and rain",
        blocks: [
          {
            type: "ul",
            items: [
              "CPSC says to install working carbon monoxide and smoke alarms, battery-operated or with battery backup, on every level and outside sleeping areas. Test them monthly. If an alarm sounds, get outside and call 911.",
              "Ready.gov says to let the generator cool before refueling. Fuel spilled on hot parts can ignite. Follow the manufacturer's instructions.",
              "Ready.gov says to keep the generator dry. Touching a wet generator, or a device plugged into one, can shock you. CPSC says to follow the manufacturer instructions for shock hazards in wet weather.",
              "Ready.gov says to connect appliances with heavy-duty extension cords.",
              "CPSC says never burn charcoal indoors, including in a garage with the door open.",
            ],
          },
          {
            type: "p",
            text: "CPSC also says to look for a carbon monoxide shut-off feature, and that models certified to PGMA G300-2023 or UL 2201 include that kind of technology. That is a shopping note from them, not a brand recommendation. This site does not name products.",
          },
        ],
      },
    ],
    howTo: {
      name: "Run a portable generator without poisoning the house",
      description:
        "CPSC, Ready.gov, and FDEM rules for where a portable generator may operate after a storm.",
      steps: [
        {
          name: "Keep it out of every enclosed space",
          text: "Never run a portable generator in a home, garage, basement, crawlspace, or shed, even with doors or windows open.",
        },
        {
          name: "Set it 20 feet away",
          text: "Run it outdoors, at least 20 feet from homes and buildings, exhaust pointed away from windows, doors, and vents.",
        },
        {
          name: "Use alarms",
          text: "Install battery-backup carbon monoxide and smoke alarms on every level and outside sleeping areas, and test them.",
        },
        {
          name: "Refuel only after it cools",
          text: "Let the generator cool before adding fuel, keep it dry, and use a heavy-duty extension cord.",
        },
        {
          name: "Leave if an alarm sounds",
          text: "Get outside immediately and call 911. Do not air the house out and stay inside.",
        },
      ],
    },
    related: [
      { href: "/hurricane/after-the-storm", label: "After the storm" },
      { href: "/hurricane/shopping-list", label: "Shopping list" },
      { href: "/hurricane/checklists/supply-kit", label: "Supply kit" },
      { href: "/hurricane", label: "Hurricane prep hub" },
    ],
    sources: [
      official.cpscRelease,
      official.cpscHazards,
      official.readyGenerators,
      official.fdemGuide,
    ],
  }),
];

const sheet = (
  slug: string,
  path: string,
  data: Omit<Printable, "slug" | "path" | "pdfPath">,
): Printable => ({
  slug,
  path,
  pdfPath: `/hurricane/${slug}.pdf`,
  ...data,
});

export const checklists: Printable[] = [
  sheet("supply-kit", "/hurricane/checklists/supply-kit", {
    title: "Supply kit checklist",
    ogTitle: "Printable hurricane supply kit.",
    description:
      "A printable hurricane supply kit for a Florida household, drawn from Ready.gov and the Florida Division of Emergency Management.",
    dek: "Pack to at least seven days. Water is one gallon per person per day.",
    groups: [
      {
        title: "Water and food",
        items: [
          "Drinking water: one gallon per person per day, enough for at least seven days",
          "Extra water for pets",
          "Non-perishable food for at least seven days, including food people will actually eat",
          "Manual can opener",
          "Infant formula and bottles, if you need them",
        ],
      },
      {
        title: "Light, news, and power",
        items: [
          "Flashlight for each person",
          "Extra batteries",
          "Battery or hand-crank radio, and a NOAA Weather Radio with tone alert",
          "Phone chargers and a backup battery",
          "Whistle",
        ],
      },
      {
        title: "Health",
        items: [
          "First aid kit",
          "Prescription medicine toward a two-week supply, plus a written dose list",
          "Non-prescription medicine the household already uses",
          "Glasses and contact-lens solution, if you use them",
          "Dust masks",
        ],
      },
      {
        title: "Sanitation and comfort",
        items: [
          "Moist towelettes, garbage bags, and plastic ties",
          "Soap, hand sanitizer, and hygiene supplies",
          "Change of clothes and sturdy shoes",
          "Sleeping bag or blanket for each person",
          "Diapers and wipes, if you need them",
          "Books, games, or other quiet things for children",
        ],
      },
      {
        title: "Tools and papers",
        items: [
          "Wrench or pliers for utility shutoffs",
          "Local maps on paper",
          "Plastic sheeting, scissors, and duct tape (Ready.gov lists these for sheltering in place, not as shutters)",
          "Copies of ID, insurance policies, and medical papers in a waterproof container",
          "Cash",
          "Pet leash, carrier, food, and a photo of you with the pet",
        ],
      },
    ],
    sources: [official.readyKit, official.fdemPlan, official.fdemGuide, official.pinellasPlan],
  }),
  sheet("home-prep", "/hurricane/checklists/home-prep", {
    title: "Home prep checklist",
    ogTitle: "Printable home prep checklist.",
    description:
      "A printable pre-storm checklist for a Tampa Bay house: zone, supplies, openings, garage, pool, and yard.",
    dek: "Do this while the roads are still ordinary. Leave if your zone is ordered out.",
    groups: [
      {
        title: "Know the order",
        items: [
          "Look up the evacuation zone and write it down",
          "Check the National Hurricane Center and NWS Tampa Bay",
          "Name where you will go, and an out-of-area contact",
          "If officials order your zone to evacuate, leave immediately",
        ],
      },
      {
        title: "Supplies and the car",
        items: [
          "Water and food for at least seven days, at one gallon of water per person per day",
          "Prescriptions toward a two-week supply, with a written list",
          "Gas tank at least half full, or the charge your vehicle manual calls for",
          "Go-bag staged by the door",
          "Phones charged, backup battery packed",
        ],
      },
      {
        title: "Openings and garage",
        items: [
          "Rated shutters or properly secured 5/8-inch plywood, after checking with the local building official",
          "Garage door hardware tight, door locked, brace kit if the door is weak",
          "Garage windows covered the way the house windows are",
          "Vehicles pulled toward the back wall — and Hillsborough's separate EV rules read if flooding is expected",
        ],
      },
      {
        title: "Yard and pool",
        items: [
          "Gutters and downspouts clear",
          "Furniture, toys, grills, and other loose objects inside when a warning is issued",
          "No piles of branches left in the yard",
          "Pool not drained; water super-chlorinated; pool power off",
        ],
      },
    ],
    sources: [
      official.fdemHome,
      official.fdemGuide,
      official.fdemZone,
      official.readyHurricanes,
      official.pinellasPlan,
      official.pinellasHome,
      official.hillsboroughProtect,
      official.nhc,
      official.nwsTbw,
    ],
  }),
  sheet("go-bag", "/hurricane/checklists/go-bag", {
    title: "Evacuation go-bag",
    ogTitle: "Printable evacuation go-bag.",
    description:
      "A printable go-bag list for leaving a Tampa Bay evacuation zone: papers, medicine, water, and what the county told you to do.",
    dek: "What leaves with you. The rest of the kit can stay if you cannot carry it.",
    groups: [
      {
        title: "Before you lock the door",
        items: [
          "Evacuation zone written down, and the address you are going to",
          "Phones charged, backup battery in the bag",
          "Gas tank at least half full, or the charge the manual calls for",
          "House locked, and pool power off if you have a pool",
        ],
      },
      {
        title: "In the bag",
        items: [
          "Water and a small amount of non-perishable food for the drive and the first night",
          "Prescription medicine and the written dose list",
          "First aid kit",
          "Copies of ID, insurance policies, and medical papers",
          "Cash",
          "Clothes, sturdy shoes, and a flashlight",
          "Charger and paper maps",
          "Infant supplies, if you need them",
          "Something familiar for each child",
        ],
      },
      {
        title: "Pets",
        items: [
          "Leash or carrier",
          "Food and water",
          "A photo of you with the pet, on paper and on the phone",
          "A destination that allows animals — Pinellas says take pets with you",
        ],
      },
    ],
    sources: [
      official.readyKit,
      official.readyHurricanes,
      official.fdemGuide,
      official.pinellasPlan,
      official.pinellasEvac,
      official.cfoStorm,
    ],
  }),
  sheet("post-storm", "/hurricane/checklists/post-storm", {
    title: "Post-storm checklist",
    ogTitle: "Printable post-storm checklist.",
    description:
      "A printable after-the-storm list: flood water, power lines, generators, then photos, lists, and receipts. Not insurance advice.",
    dek: "Safety first. The camera comes out only when the space is safe. This is not a claim guide.",
    groups: [
      {
        title: "Do not do these",
        items: [
          "Do not go out until local officials say the threat has passed",
          "Do not walk, swim, or drive through flood water",
          "Do not touch wet electrical equipment or downed lines",
          "Do not enter a damaged building until authorities say it is safe",
          "Do not run a generator indoors, in the garage, or within 20 feet of the house",
          "Do not have children do cleanup",
        ],
      },
      {
        title: "If you are documenting damage",
        items: [
          "Photograph damage before you move things, only if it is safe to be there",
          "Write an itemized list: item, cost, purchase date, serial number if you have it",
          "Keep receipts, including cash purchases",
          "Ready.gov says to contact your insurance company for assistance",
          "DFS says: don't sign anything — call 1-877-693-5236 first",
          "Policy questions go to your insurer, DFS, or floir.gov. This list does not answer them",
        ],
      },
    ],
    sources: [
      official.readyHurricanes,
      official.readyGenerators,
      official.fdemGuide,
      official.cpscRelease,
      official.cfoStorm,
      official.floir,
    ],
  }),
];

export const shoppingList: Printable = sheet(
  "shopping-list",
  "/hurricane/shopping-list",
  {
    title: "Get your stuff",
    ogTitle: "A generic hurricane shopping list.",
    description:
      "A printable Tampa Bay hurricane shopping list: water, food, power, documents, first aid, home hardening, pets, and kids. No brands.",
    dek: "Generic items only. Grouped so the cart matches the kit. Nothing here is a product endorsement.",
    groups: [
      {
        title: "Water and food",
        items: [
          "Drinking water, one gallon per person per day, for at least seven days",
          "Non-perishable food for at least seven days",
          "Manual can opener",
          "Pet food",
          "Extra water for pets",
        ],
      },
      {
        title: "Power and light",
        items: [
          "Flashlights",
          "Extra batteries, sized to the lights and radio you own",
          "Battery-powered or hand-crank radio",
          "NOAA Weather Radio with tone alert",
          "Phone charger and a backup battery",
          "Cooler, if you need one for medicine that must stay cold",
        ],
      },
      {
        title: "Documents",
        items: [
          "Waterproof bag or container for papers",
          "Paper copies of IDs",
          "Paper copies of insurance policies",
          "Written medication list",
          "Cash in small bills",
          "Paper maps of the county",
        ],
      },
      {
        title: "First aid and medicine",
        items: [
          "First aid kit",
          "Refills that move prescriptions toward a two-week supply",
          "Pain reliever and other non-prescription items the household already uses",
          "Prescription glasses or contact-lens solution, if you use them",
          "Soap, hand sanitizer, and personal hygiene supplies",
          "Moist towelettes and garbage bags",
        ],
      },
      {
        title: "Home hardening",
        items: [
          "Rated hurricane shutters, or 5/8-inch exterior plywood — ask the local building official which fastening they require",
          "Work gloves",
          "Wrench or pliers for utility shutoffs",
          "Garage-door bracing hardware only if the manufacturer or a licensed installer specifies it for your door",
        ],
      },
      {
        title: "Pets and kids",
        items: [
          "Leash, carrier, and a spare collar tag",
          "Diapers, wipes, and formula, if you need them",
          "A change of clothes and sturdy shoes for each person",
          "Books, games, or a comfort item for each child",
          "Sleeping bag or blanket if you do not already have them",
        ],
      },
    ],
    sources: [
      official.readyKit,
      official.fdemPlan,
      official.fdemGuide,
      official.fdemHome,
      official.pinellasPlan,
      official.cfoStorm,
    ],
  },
);

export const hubFaqs: { q: string; a: string[] }[] = [
  {
    q: "When is hurricane season on this coast?",
    a: [
      "Ready.gov lists the Atlantic hurricane season as June 1 through November 30. A storm can still form outside those dates. The National Hurricane Center and NWS Tampa Bay are the forecasts. Your county emergency management office is the evacuation order.",
    ],
  },
  {
    q: "How do I find my evacuation zone?",
    a: [
      "Look up the address. Hillsborough County's Hurricane Evacuation Assessment Tool (HEAT) is at hcfl.gov/HEAT, and the county describes zones A through E. Pinellas County's address lookup is at kyz.pinellas.gov. Pasco County's finder is on the county GIS site. Florida's statewide Know Your Zone map is at floridadisaster.org. A letter in one county is not an order. Leave when your county orders the zone you are actually in.",
    ],
  },
  {
    q: "How much water and food should we store?",
    a: [
      "Ready.gov says one gallon of water per person per day for several days, for drinking and sanitation, plus non-perishable food for several days. Florida's Division of Emergency Management says a disaster supply kit should last at least seven days. Pinellas County tells households to think about two weeks when they build the kit. Pack to the seven-day Florida floor, and longer if someone cannot easily replace medicine.",
    ],
  },
  {
    q: "Does a Banyan membership cover storm damage?",
    a: [
      "No. Banyan is not an insurer and does not pay for repairs. A pre-storm home check, when membership is open, is a scheduled look at the house. It does not prevent damage, does not guarantee anything about the storm, and is not a claim. Anything you file is between you and your carrier. The Florida Department of Financial Services and the Office of Insurance Regulation publish the official starting points.",
    ],
  },
  {
    q: "What if my zone is told to evacuate?",
    a: [
      "Leave. Ready.gov says if you are in a mandatory evacuation zone and local officials tell you to evacuate, do so immediately. FDEM says the greatest threat to life in a hurricane is storm surge flooding. Do not wait to see whether the order was cautious.",
    ],
  },
  {
    q: "Where can a portable generator run?",
    a: [
      "Outdoors only. CPSC says never inside a home, garage, basement, crawlspace, shed, or other enclosed space, even with doors or windows open, and at least 20 feet from homes and buildings with the exhaust pointed away from windows, doors, and vents. Ready.gov gives the same 20-foot distance from windows, doors, and attached garages.",
    ],
  },
];

export const hubZones: {
  county: string;
  body: string;
  links: { href: string; label: string }[];
}[] = [
  {
    county: "Hillsborough",
    body: "The county's Hurricane Evacuation Assessment Tool, HEAT, looks up an address, owner name, or parcel. The county describes five zones, A through E. A is mapped in red on their legend, then B, C, D, and E.",
    links: [
      { href: official.hillsboroughHeat.href, label: "Open HEAT" },
      { href: official.hillsboroughEm.href, label: "Emergency Management" },
    ],
  },
  {
    county: "Pinellas",
    body: "Use the county's Know Your Zone lookup and type the address. Pinellas also says people in mobile homes and manufactured homes evacuate for wind, separate from a surge order. The older know-your-zone address on the county site currently redirects to a map image, so the links here go to the live lookup.",
    links: [
      { href: official.pinellasFinder.href, label: "Address lookup" },
      { href: official.pinellasZone.href, label: "Know Your Zone" },
    ],
  },
  {
    county: "Pasco",
    body: "Pasco County's GIS finder takes an address and returns the evacuation zone. Use that result, then follow Pasco's order for it. A zone letter from a neighboring county is not yours.",
    links: [{ href: official.pascoFinder.href, label: "Pasco zone finder" }],
  },
];

export function getPost(slug: string) {
  return posts.find((item) => item.slug === slug);
}

export function getChecklist(slug: string) {
  return checklists.find((item) => item.slug === slug);
}

export function hurricaneRoutes() {
  return [
    "/hurricane",
    ...posts.map((item) => item.path),
    ...checklists.map((item) => item.path),
    shoppingList.path,
  ];
}

export function howToFromPrintable(item: Printable) {
  return {
    name: item.title,
    description: item.description,
    path: item.path,
    steps: item.groups.flatMap((group) =>
      group.items.map((entry) => ({ name: entry, text: entry })),
    ),
    sections: item.groups.map((group) => ({
      name: group.title,
      steps: group.items.map((entry) => ({ name: entry, text: entry })),
    })),
  };
}
