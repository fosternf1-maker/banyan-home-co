# Banyan Home Co.

Marketing site for Banyan Home Co., a private home-maintenance membership for Tampa homeowners. This is not a warranty, insurance product, or repair company.

## Local

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Field record

The member-visit demo lives in its own package, `apps/field`, and is not part of this marketing site or the Vercel project. Setup, the OpenFieldService credit, and the next steps are in `apps/field/README.md`.

```bash
npm install --prefix apps/field
npm run dev:field
```

That app is [http://localhost:3010](http://localhost:3010). It uses seeded fictional houses only.

```bash
npm run lint
npm run build
```

## Stack

Next.js App Router, TypeScript, Tailwind CSS. Deployable on Vercel as a static marketing site — no auth, checkout, or dashboard.
