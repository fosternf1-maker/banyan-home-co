const EMAIL = "hello@banyanhomeco.com";
const TELEPHONE = "+18133300480";

export const neighborhoods = [
  "Hyde Park",
  "Palma Ceia",
  "Beach Park",
  "Davis Islands",
  "Harbour Island",
  "Bayshore",
  "Sunset Park",
  "Culbreath Isles",
] as const;

export const site = {
  name: "Banyan Home Co.",
  shortName: "Banyan",
  documentTitle: "Banyan Home Co. · South Tampa home management",
  description:
    "Banyan Home Co. is a private home management membership for Tampa homeowners. One number, a vetted network of licensed trades, and someone from our team at your home when they arrive.",
  url: "https://banyan-home-co.vercel.app",
  email: EMAIL,
  telephone: TELEPHONE,
  phoneDisplay: "(813) 330-0480",
  phoneHref: `tel:${TELEPHONE}`,
  auditMailto: `mailto:${EMAIL}?subject=Home%20Health%20Audit`,
  vendorMailto: `mailto:${EMAIL}?subject=Vendor%20network`,
  waitlistMailto: `mailto:${EMAIL}?subject=Waitlist`,
  keywords: [
    "South Tampa",
    "home maintenance membership",
    "home management",
    ...neighborhoods,
  ],
} as const;

export const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#membership", label: "Membership" },
  { href: "#questions", label: "Questions" },
] as const;

export const friction = [
  {
    title: "Nobody good calls back",
    body: "The plumber with the four-star reviews bought that placement. The one your neighbor swears by hasn't answered in a week. You're choosing between a stranger and waiting.",
  },
  {
    title: "Someone has to be home",
    body: "Every appointment costs a half-day. Either you burn it, or you let someone into your house with nobody there who knows what the job was supposed to be.",
  },
  {
    title: "You can't tell if the quote is fair",
    body: "Nine thousand dollars for a condenser. Maybe that's right. You have no way to know, and no time to get two more quotes to find out.",
  },
  {
    title: "The small things become the big things",
    body: "The water heater nobody flushed. The dryer vent nobody cleaned. Deferred maintenance is the most expensive kind, and it's invisible until it isn't.",
  },
] as const;

export const steps = [
  {
    title: "We learn the house",
    body: "Your membership opens with a Home Health Audit — a full walkthrough, a written report on every system, and a maintenance calendar built for your specific house.",
  },
  {
    title: "You call one number",
    body: "Something breaks, or something's due. You text or call. We triage it and dispatch the right trade from our vetted network — at the member rate we negotiated on your behalf.",
  },
  {
    title: "We're there if you want us",
    body: "A Banyan Home Manager meets the contractor, lets them in, confirms the scope, photographs the work, and secures the house. Or you handle it yourself. Your call, every time.",
  },
  {
    title: "It goes on the record",
    body: "Every visit, invoice, warranty and photo lands in your home's file. When you sell, you hand the buyer a documented maintenance history instead of a shrug.",
  },
] as const;

export const tiers = [
  { id: "essentials", name: "Essentials", price: "$149", featured: false },
  { id: "signature", name: "Signature", price: "$299", featured: true },
  { id: "platinum", name: "Platinum", price: "$499", featured: false },
] as const;

export type TierId = (typeof tiers)[number]["id"];

export const membershipRows: {
  feature: string;
  note?: string;
  values: Record<TierId, string>;
}[] = [
  {
    feature: "Vetted vendor network & member pricing",
    values: {
      essentials: "yes",
      signature: "yes",
      platinum: "yes",
    },
  },
  {
    feature: "Priority scheduling",
    values: {
      essentials: "Priority",
      signature: "Priority",
      platinum: "Front of queue",
    },
  },
  {
    feature: "Concierge line",
    values: {
      essentials: "Business hours",
      signature: "24 / 7",
      platinum: "24 / 7 dedicated",
    },
  },
  {
    feature: "Annual Home Health Audit",
    values: {
      essentials: "1 × year",
      signature: "1 × year",
      platinum: "2 × year",
    },
  },
  {
    feature: "Attended service visits",
    note: "we meet the contractor, if you'd like us to",
    values: {
      essentials: "2 / year",
      signature: "8 / year",
      platinum: "Unlimited (fair use)",
    },
  },
  {
    feature: "Scheduled HVAC filter service",
    values: {
      essentials: "—",
      signature: "2 × year · filters at cost",
      platinum: "2 × year · filters included",
    },
  },
  {
    feature: "Managed seasonal maintenance calendar",
    values: {
      essentials: "—",
      signature: "yes",
      platinum: "yes",
    },
  },
  {
    feature: "Hurricane readiness programme",
    values: {
      essentials: "—",
      signature: "Post-storm inspection",
      platinum: "Full programme",
    },
  },
  {
    feature: "Quote review & negotiation on major work",
    values: {
      essentials: "—",
      signature: "yes",
      platinum: "yes",
    },
  },
  {
    feature: "Away-from-home checks",
    values: {
      essentials: "—",
      signature: "—",
      platinum: "Monthly",
    },
  },
];

export const scheduledServices = [
  { name: "HVAC filter service, whole home", price: "$89 + filters" },
  { name: "Dryer vent cleaning", price: "$149" },
  { name: "Irrigation zone check & adjust", price: "$129" },
  { name: "Water heater flush & inspection", price: "$179" },
  { name: "Whole-home plumbing inspection", price: "$199" },
  { name: "Hurricane pre-season readiness", price: "$349" },
  { name: "Post-storm documented inspection", price: "$249" },
  { name: "Handyman hours", price: "$95 / hr" },
] as const;

export const coastItems = [
  "Pre-season inspection of roof, openings, drainage and tree line, with a written punch list in May",
  "Shutter, generator and sump service booked before the rush, not during it",
  "Pre-landfall securing for members who are out of town",
  "Post-storm inspection with photo documentation formatted for an insurance claim",
  "Standing relationships with mitigation contractors — the ones who are unreachable in October unless you already know them",
] as const;

export const vettingItems = [
  "Active Florida state licence, verified through DBPR and re-checked every quarter",
  "General liability and workers' compensation on file, with Banyan named as additional insured",
  "Background check on every individual who enters a member's home",
  "Three verified references minimum, at least one from a Banyan member",
  "Written flat-rate or not-to-exceed pricing, agreed in advance",
  "A signed response-time commitment — and removal from the network if it slips",
] as const;

export const faqs = [
  {
    q: "Is this a home warranty?",
    a: [
      "No — and the distinction matters. Banyan is not a warranty, a service contract, or insurance. We do not cover the cost of repairs and we do not promise to replace anything when it fails.",
      "What your membership buys is coordination, vetting, scheduled maintenance services, pricing we negotiated on your behalf, and our people at your house. When something needs fixing, a licensed contractor quotes it and bills you directly.",
    ],
  },
  {
    q: "So who am I actually paying?",
    a: [
      "Two separate things. You pay Banyan a membership fee for the service above. You pay the contractor directly for their work, at the member rate, on their invoice.",
      "We never mark up contractor work and we never hold your repair funds. That keeps the incentives clean: we have no reason to want the job to be bigger than it is.",
    ],
  },
  {
    q: 'What does "attended service visit" mean, exactly?',
    a: [
      "A Banyan Home Manager comes to your house at the appointment window, lets the contractor in, confirms the scope matches what was quoted, stays through the work, photographs the result, and locks up.",
      "It's entirely your choice. Plenty of members prefer to be there themselves, and that's fine — attendance is something you request, not something we impose. Nothing about your membership changes if you never use it.",
    ],
  },
  {
    q: "How do you handle keys and alarm codes?",
    a: [
      "We prefer temporary smart-lock codes that expire after the appointment. Where a physical key is necessary, it lives in a numbered lockbox with no address on it, and every issue and return is logged.",
      "Our employees are background-checked, bonded, and W-2 — not contractors we found last week. We hold this to a higher standard than most people hold their own spare key, because we have to.",
    ],
  },
  {
    q: "What if a contractor you sent does bad work?",
    a: [
      "You call us, not them. We handle the remediation conversation, and we hold the leverage in that conversation because they want to stay in the network.",
      "Every vendor carries their own liability insurance with Banyan named as additional insured, and a vendor who produces a bad outcome twice is removed. Our recommendation is only worth something if it costs us something.",
    ],
  },
  {
    q: "Can I cancel?",
    a: [
      "Any time, with 30 days' notice. Monthly memberships are month to month — there's no term, no early-termination fee, and no clause you'll find later.",
      "Annual members who cancel mid-term are refunded the unused months less the two-month prepay discount.",
    ],
  },
  {
    q: "Where in Tampa do you work?",
    a: [
      "Year 1 is South Tampa only: Hyde Park, Palma Ceia, Beach Park, Davis Islands, Harbour Island, Bayshore, Sunset Park, and Culbreath Isles. We stay inside that radius on purpose. We are not taking members outside it yet.",
    ],
  },
  {
    q: "Do you repair the house yourselves?",
    a: [
      "No. Banyan is a membership, not a repair company and not a warranty. Licensed trades do the work and invoice you directly. We coordinate, vet, and attend if you want us there.",
    ],
  },
  {
    q: "How does hurricane season work?",
    a: [
      "We are not an insurer and we do not handle claims. Signature and Platinum include hurricane readiness, scheduled before the season. After a storm we can document the house. Claims stay with your carrier.",
    ],
  },
] as const;

export const legalDisclaimer =
  "Banyan Home Co. is a home management and coordination service. It is not a home warranty association, service warranty association, or insurer, and it does not provide, underwrite, or pay for repair or replacement of any home system, appliance, or component. Contractor services are performed by independent, appropriately licensed third parties who contract with and invoice the homeowner directly. Banyan Home Co. receives no compensation from any vendor in its network.";
