# Banyan field record

A local demo of the member-visit record for [Banyan Home Co.](https://www.banyanhomeco.com). It is the first slice of a ServiceTitan-style field app: a dispatch board, a visit with a seasonal checklist, and the equipment history of a single house.

It is not the public marketing site. It does not take payments, talk to ServiceTitan, or hold real member data. The four houses are fictional, and every street says Demo.

Membership, in the language of the site, is a house. A job in the upstream app is a member visit. A technician is a Home Manager. The thing you are looking at is one record per home over time.

## Setup

From the repository root:

```bash
npm install --prefix apps/field
npm run dev:field
```

Or from this directory:

```bash
npm install
npm run dev
```

Open [http://localhost:3010](http://localhost:3010). The marketing site, if you start it, stays on port 3000 and is a different package.

```bash
npm test
npm run lint
npm run build
```

The dev server keeps the demo record in memory. Checking a box, changing a status, or adding a service note sticks until you restart the process. Restarting rebuilds the week around today. Nothing is written to disk, and nothing leaves the machine.

## What you can click

- **Dispatch** is the open week. Home Manager color marks the card. Open a visit.
- **A visit** has the seasonal checklist, a status, and a service note. The note lands on the system you pick and on that house’s history.
- **A home** is the record: equipment (install date, model, serial, standing, latest note) and every visit, newest first.
- **A system** is the chronological history for that piece of equipment, with a link back to the visit.

Seeded seasons match the membership the site already describes: hurricane prep, AC / summer filter service, rainy-season drainage, plus the Home Health Audit, a water heater flush, a dryer vent cleaning, and a Platinum away check. Standings use the sample audit’s words: good, monitor, act.

## What came from OpenFieldService

This directory starts from [OpenFieldService](https://github.com/clawnify/OpenFieldService) (MIT, Copyright © 2026 Clawnify). The license and that copyright notice are in `LICENSE`. `NOTICE` says where they apply.

Kept, and adapted to Banyan:

- A week dispatch board. Days are local calendar days. `lib/calendar.ts` adapts `calendarDate`, `weekRange`, and `daysInRange` from upstream `src/client/calendar.ts`.
- A visit (their job) with a status workflow: scheduled, confirmed, in progress, completed, cancelled.
- A checklist copied onto the visit, not a shared template row that every visit would toggle together.
- Equipment on a house (their asset on a customer site): manufacturer, model, serial, install date, and a history that survives as its own notes.
- Home Managers (their technicians) shown by color on the board.
- A human label (`VISIT-112`) kept separate from the record id.

Left behind on purpose:

- Invoices, prices, and materials. Banyan does not mark up repairs, and this slice must not look like checkout.
- The offline service worker, agent mode, and customer CRM screens.
- Cloudflare Workers, Wrangler, and D1. Upstream’s database calls are `export { initDB, query, get, run } from "@clawnify/db"`, and the API is built with `@clawnify/app`. Running that here would add a second toolchain and a Cloudflare-shaped dev server to a Vercel marketing repo.
- Their Preact UI and Clawnify tokens. This app uses the site’s paper, canopy, sage, and brass, and Newsreader and Source Sans 3.

## Why a port, not a vendored copy

OpenFieldService is a Preact + Vite frontend and a Hono API that expects Cloudflare D1 through those Clawnify packages. Vendoring it would mean a second package manager, Node’s Wrangler dev server, and a UI that is not Banyan’s. A git subtree would keep that runtime in the tree.

The marketing site is Next.js App Router, React, and Tailwind, and its `vercel.json` is the production site. This package is a sibling so that file, the root `app/` routes, and the domain redirects stay untouched. `next.config.ts` in here pins Turbopack to this directory so the parent lockfile is not treated as this app’s root.

The domain model is ported. The calendar helpers are adapted under the upstream MIT license. The screens are new, in the site’s voice.

## Next

- Replace the in-memory store with a database the Home Managers actually share. The shape in `lib/types.ts` is the starting point: home, visit, checklist, equipment, history.
- Put it behind a login. This demo is only safe because the data is fake and the app is not the production deploy.
- Photos on the visit, the way the site describes an attended visit.
- Creating and moving visits from the board. Upstream can; this slice only reads a seeded week and lets you work the visit in front of you.
- Trade introductions stay out until there is a real roster. Banyan is not the repair company.
- Do not connect payments, Vercel settings, or the production domain from this package. Membership is not for sale from this screen.
