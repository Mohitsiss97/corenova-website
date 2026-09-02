import { Compass, Layers, ShieldCheck, Handshake, Gauge, Users } from 'lucide-react';

import { site } from './site.js';
import { productCount } from './products.js';

/* ------------------------------------------------------------------ story */
/* The founding narrative, kept as separate paragraphs so the About page can
   pace them against the facts panel instead of running one long blob. */
export const story = [
  `${site.name} started in ${site.founded} with four engineers, one client and a problem that has not changed since: mid-market companies are asked to choose between software that fits and software that ships. Buy a product and spend a year bending the business to it. Commission a build and wait eighteen months to find out whether it works.`,
  'We took the third path. We built our own products, ran them in production for real customers, and used the modules underneath them — identity, audit, billing, permissions, reporting — as the starting point for custom work. A bespoke system that begins at 40% complete behaves very differently from one that begins at zero.',
  `Eleven years later that is still the whole idea. ${productCount} products in production, four offices, and an engineering group that would rather show you something running in week five than a slide deck in week one.`,
];

export const mission = {
  statement: 'Make enterprise software that fits the business it was bought for.',
  body:
    'Not a platform to be configured for a year. Not a rewrite that outlives the executive who sponsored it. Working software, in production, that the people who built it still answer for.',
};

/* ------------------------------------------------------------------ values */
/* Each value carries the cost of holding it. A value that never costs anything
   is a slogan, and the About page renders the cost line deliberately. */
export const values = [
  {
    icon: Compass,
    title: 'Say the inconvenient thing early',
    body: 'If fixed-scope is wrong for your project we say so before you sign, even though it is the easier contract for us. If a feature you asked for is a mistake, you hear it in the sprint review, not in the post-mortem.',
    cost: 'We lose deals to vendors who agree faster.',
  },
  {
    icon: Layers,
    title: 'Reuse before you write',
    body: 'Every engagement starts by asking which existing modules already solve this. Auth, audit, RBAC, billing and reporting are solved problems here — rewriting them on your budget would be indefensible.',
    cost: 'Our engineers read more code than they write.',
  },
  {
    icon: ShieldCheck,
    title: 'Security is not a tier',
    body: 'SSO, MFA, granular RBAC, encryption at rest and immutable audit logs ship in every product at every price point. Regulated customers do not get a special edition, and small customers do not get a weakened one.',
    cost: 'We cannot upsell what competitors put behind Enterprise.',
  },
  {
    icon: Handshake,
    title: 'The builders stay',
    body: 'The engineers who design your system launch it and support it. There is no delivery pool you have never met, and no handover meeting where everyone who understood it leaves the room.',
    cost: 'It caps how fast we can take on new work.',
  },
  {
    icon: Gauge,
    title: 'Working software beats status',
    body: 'A demo every two weeks against a real environment. Progress is measured in what runs, not in what percentage a plan claims to be complete.',
    cost: 'A bad sprint is visible to the client immediately.',
  },
  {
    icon: Users,
    title: 'Your data, your code, your exit',
    body: 'You own the IP from the first commit. Full export in open formats on demand, no exit fee, and schema documentation handed over whether you are leaving or staying.',
    cost: 'Nothing in our contracts makes it hard to leave.',
  },
];

/* ------------------------------------------------------------------ timeline */
export const timeline = [
  { year: '2014', title: 'Four engineers, one room', body: 'Founded in Noida as a .NET consultancy. The first client, a mid-size distributor, is still with us.' },
  { year: '2016', title: 'The first product', body: 'Nova ERP is extracted from three consecutive custom builds that kept solving the same ledger problem.' },
  { year: '2018', title: 'Bengaluru engineering office', body: 'The second office opens. Headcount passes 90 and the catalog reaches nine products.' },
  { year: '2020', title: 'Remote-first, permanently', body: 'Delivery goes fully distributed in eight weeks. It works well enough that we never moved back.' },
  { year: '2021', title: 'ISO 27001 and SOC 2', body: 'First external certification cycle. Security controls become product defaults rather than enterprise add-ons.' },
  { year: '2022', title: 'Austin opens', body: 'Americas delivery on shifted rosters, so US clients get their standup in the morning rather than at night.' },
  { year: '2023', title: '500th deployment', body: 'The catalog passes 30 products. On-premise and private cloud become first-class targets, not exceptions.' },
  { year: '2024', title: 'Dubai and the Middle East practice', body: 'Fourth office. Data-residency work becomes a standing capability instead of a project add-on.' },
  { year: '2025', title: 'The .NET modernisation practice', body: 'Migration work becomes a named practice after the Northwind cutover lands with zero planned downtime.' },
  { year: '2026', title: `${productCount} products, 24 countries`, body: 'Top 10 Enterprise Software Providers, CIO Review APAC. The Monday meeting still opens with a demo.' },
];

/* ------------------------------------------------------------------ leadership */
export const leadership = [
  {
    name: 'Ananya Deshmukh',
    role: 'Co-founder & Chief Executive',
    focus: 'Strategy, clients, the uncomfortable calls',
    bio: 'Wrote the first version of what became Nova ERP. Still reviews every statement of work over $250k, mostly to delete things from it.',
  },
  {
    name: 'Rahul Menon',
    role: 'Co-founder & Chief Technology Officer',
    focus: 'Architecture, the .NET practice, technical due diligence',
    bio: 'Fifteen years in .NET before founding the company. Owns the shared module library that every custom build starts from.',
  },
  {
    name: 'Grace Adeyemi',
    role: 'VP Engineering',
    focus: 'Delivery, hiring, the sprint rhythm',
    bio: 'Runs the delivery practices and the swap guarantee. Holds that a demo every two weeks solves most process problems without a process.',
  },
  {
    name: 'Vikram Shah',
    role: 'Chief Information Security Officer',
    focus: 'ISO 27001, SOC 2, customer security reviews',
    bio: 'Joined from banking in 2021 to run the first certification cycle. Signs off every on-premise and data-residency design personally.',
  },
  {
    name: 'Lena Fischer',
    role: 'VP Product',
    focus: 'The catalog, the roadmap, what we refuse to build',
    bio: 'Decides which custom work graduates into a product. Has killed more features than she has shipped, deliberately.',
  },
  {
    name: 'Daniel Okonkwo',
    role: 'VP Customer Success',
    focus: 'Onboarding, support SLAs, renewals',
    bio: 'Owns the hypercare model. Measures the team on month-two ticket volume rather than month-one satisfaction scores.',
  },
];

/* ------------------------------------------------------------------ facts */
export const companyFacts = [
  { label: 'Founded', value: String(site.founded) },
  { label: 'Engineers', value: '240+' },
  { label: 'Offices', value: String(site.offices.length) },
  { label: 'Countries served', value: '24' },
  { label: 'Products in production', value: String(productCount) },
  { label: 'Average client tenure', value: '11 yrs' },
];
