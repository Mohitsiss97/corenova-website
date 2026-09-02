import { Package, Hammer, UsersRound } from 'lucide-react';

import { productCount, categoryCount } from './products.js';
import { serviceCount } from './services.js';

/* The "routing layer" the research calls for: three distinct buyer paths,
   visible within the first scroll. */
export const buyerPaths = [
  {
    icon: Package,
    key: 'buy',
    title: 'I need software that already works',
    body: `Pick from ${productCount} production products across ${categoryCount} categories. Trial in a day, deploy in weeks — cloud, private cloud or on-premise.`,
    cta: { label: 'Browse the catalog', to: '/products' },
    meta: `${productCount} products · ${categoryCount} categories`,
  },
  {
    icon: Hammer,
    key: 'build',
    title: 'I need something built for us',
    body: 'Discovery, architecture and delivery by a team that has shipped this before. Fixed scope or sprint-by-sprint, your call.',
    cta: { label: 'See our services', to: '/services' },
    meta: `${serviceCount} service lines · 12–28 weeks typical`,
  },
  {
    icon: UsersRound,
    key: 'hire',
    title: 'I need engineers on my team',
    body: 'Vetted engineers, QA and DevOps embedded in your process within three weeks — your tools, your hours, your leads.',
    cta: { label: 'Hire a team', to: '/services/dedicated-teams' },
    meta: 'Shortlist in 10 days · swap guarantee',
  },
];

export const differentiators = [
  {
    title: 'Products, not just people',
    body: `We run ${productCount} of our own products in production. That means our custom work starts from proven modules — auth, audit, billing, RBAC — instead of a blank repo.`,
    stat: String(productCount),
    statLabel: 'shipped products',
    span: 'lg',
  },
  {
    title: 'Deploy where your data must live',
    body: 'Cloud, private cloud, on-premise or hybrid — same product, same upgrade path. Regulated customers do not get a downgraded edition.',
    stat: '4',
    statLabel: 'deployment modes',
  },
  {
    title: 'Security is a default, not a tier',
    body: 'SSO, MFA, RBAC, encryption at rest and full audit logging ship in every product. ISO 27001 and SOC 2 Type II audited annually.',
    stat: 'SOC 2',
    statLabel: 'Type II',
  },
  {
    title: 'One team, discovery to hypercare',
    body: 'The engineers who design your system are the ones who launch it and support it. No handover to a delivery pool you have never met.',
    stat: '11 yrs',
    statLabel: 'avg client tenure',
    span: 'lg',
  },
];

export const platformFeatures = [
  { title: 'Single sign-on everywhere', body: 'One identity across every CoreNova product and your existing IdP — SAML, OIDC and SCIM provisioning.' },
  { title: 'Open APIs on every product', body: 'REST and GraphQL with webhooks, sandbox keys and versioned contracts. No feature is UI-only.' },
  { title: 'Audit log you can export', body: 'Every state change is recorded with actor, before/after and reason — streamable to your SIEM.' },
  { title: 'Same data model across apps', body: 'Customer, item, employee and location are shared entities. Integrations stop being a project.' },
  { title: 'Granular role permissions', body: 'Permission keys gate menus, routes and individual buttons — not just page-level access.' },
  { title: 'Migration tooling included', body: 'Importers, dry-run validation and rollback for every product. Your legacy data comes with you.' },
];

export const caseStudies = [
  {
    slug: 'atlas-manufacturing-mes',
    year: '2025', duration: '9 months', team: '11 engineers, 2 analysts',
    services: ['custom-software', 'data-analytics'],
    client: 'Atlas Manufacturing',
    industry: 'manufacturing',
    title: 'From four disconnected plants to one live production view',
    summary: 'Replaced plant-level spreadsheets and a 12-year-old ERP with Nova ERP plus a shop-floor MES across four sites in 9 months.',
    challenge: 'Four plants ran separate production trackers. Group-level output was compiled manually every Monday, so decisions were always a week stale, and stock accuracy sat at 84%.',
    solution: 'Nova ERP as the single ledger, Nova Manufacturing on the shop floor with machine IoT ingest, and Nova WMS for barcode-accurate stores. Rolled out plant by plant with a two-week hypercare per site.',
    results: [
      { metric: '+18%', label: 'OEE across four plants' },
      { metric: '99.1%', label: 'stock accuracy, up from 84%' },
      { metric: '4 days', label: 'faster month-end close' },
      { metric: '9 mo', label: 'to full rollout' },
    ],
    quote: 'For the first time we can see all four plants on one screen, live. That changed how our Monday meeting works.',
    author: 'Group COO, Atlas Manufacturing',
    stack: ['Nova ERP', 'Nova Manufacturing', 'Nova WMS', 'Azure', 'Power BI'],
  },
  {
    slug: 'northwind-dotnet-modernisation',
    year: '2026', duration: '13 months', team: '9 engineers, 1 architect',
    services: ['dotnet-engineering', 'cloud-devops'],
    client: 'Northwind Group',
    industry: 'manufacturing',
    title: 'A 14-year-old ASP.NET estate moved to .NET 10 without a freeze',
    summary:
      'Migrated 3 ASP.NET MVC and WebForms applications and 640k lines of C# onto .NET 10 LTS, incrementally, with zero planned downtime.',
    challenge:
      'Three business-critical apps sat on .NET Framework 4.6 and ASP.NET WebForms. Security patching was becoming a board-level risk, hiring for WebForms had stalled, and a previous big-bang rewrite attempt had been abandoned after 11 months.',
    solution:
      'A strangler-pattern migration: a YARP reverse proxy in front of the estate, then route-by-route replacement with ASP.NET Core MVC and Minimal API services. Data access moved from hand-rolled ADO.NET to EF Core, the internal admin UI was rebuilt in Blazor Server, and everything landed on Azure App Service with GitHub Actions pipelines.',
    results: [
      { metric: '0 hrs', label: 'planned downtime across the cutover' },
      { metric: '640k', label: 'lines of C# migrated' },
      { metric: '3.4×', label: 'faster median API response' },
      { metric: '−38%', label: 'Azure compute spend' },
    ],
    quote: 'They shipped the first migrated route in week five. After the failed rewrite, seeing something real that early is what got the board back on side.',
    author: 'Director of Engineering, Northwind Group',
    stack: ['ASP.NET Core 10', 'Blazor Server', 'EF Core', 'YARP', 'Azure App Service', 'SQL Server'],
  },
  {
    slug: 'solaris-retail-pos',
    year: '2025', duration: '14 weeks', team: '8 engineers, 3 rollout leads',
    services: ['mobile-apps'],
    client: 'Solaris Retail',
    industry: 'retail',
    title: '210 stores that keep billing when the internet dies',
    summary: 'Offline-first POS rollout across 210 outlets in 6 states, with loyalty and a unified stock ledger behind it.',
    challenge: 'Tier-3 stores lost 40–90 minutes of billing a week to connectivity drops. Online and store stock disagreed constantly, causing oversells every festive season.',
    solution: 'Nova POS with a local-first data layer and conflict-free sync, Nova Stock as the single ledger across stores and warehouse, and Nova Loyalty for a unified customer profile.',
    results: [
      { metric: '0 min', label: 'billing lost to outages' },
      { metric: '2.1s', label: 'average checkout time' },
      { metric: '+23%', label: 'repeat purchase rate' },
      { metric: '210', label: 'stores live in 14 weeks' },
    ],
    quote: 'The rollout team trained 900 cashiers in six weeks. Support tickets in month two were lower than month one.',
    author: 'VP Retail Operations, Solaris',
    stack: ['Nova POS', 'Nova Stock', 'Nova Loyalty', 'AWS', 'React Native'],
  },
  {
    slug: 'meridian-bank-iam',
    year: '2024', duration: '7 months', team: '6 engineers, 1 security lead',
    services: ['cloud-devops', 'web-platforms'],
    client: 'Meridian Bank',
    industry: 'fintech',
    title: 'Access reviews that used to take six weeks now take two days',
    summary: 'Consolidated 31 applications behind Nova ID with adaptive access policies and automated quarterly certification.',
    challenge: 'Quarterly access certification was a six-week spreadsheet exercise across 31 apps and 4,200 staff. Two consecutive audits raised findings on orphaned accounts.',
    solution: 'Nova ID as the identity plane with SCIM provisioning into every app, risk-based step-up authentication, and Nova Vault for privileged sessions with full recording.',
    results: [
      { metric: '2 days', label: 'per certification cycle' },
      { metric: '100%', label: 'apps SSO-integrated' },
      { metric: '0', label: 'audit findings since' },
      { metric: '−64%', label: 'password reset tickets' },
    ],
    quote: 'Our auditors asked for evidence and we exported it in four minutes. That had never happened before.',
    author: 'Head of Information Security, Meridian Bank',
    stack: ['Nova ID', 'Nova Vault', 'Private cloud', 'Kubernetes'],
  },
  {
    slug: 'kepler-health-his',
    year: '2025', duration: '11 months', team: '14 engineers, 4 clinical analysts',
    services: ['custom-software', 'support-maintenance'],
    client: 'Kepler Health',
    industry: 'healthcare',
    title: 'Cutting OPD wait times by 41% across six hospitals',
    summary: 'Nova Care HIS replaced paper records and three legacy systems across a 1,400-bed hospital group.',
    challenge: 'Registration, EMR, pharmacy and billing lived in separate systems. Patients queued at three counters, and 19% of insurance claims were rejected for coding errors.',
    solution: 'Nova Care HIS end to end with integrated LIS, plus Nova Docs for scanned legacy records with OCR search. Phased by department with clinician champions in each.',
    results: [
      { metric: '−41%', label: 'average OPD wait time' },
      { metric: '−28%', label: 'claim rejection rate' },
      { metric: '1.2M', label: 'records migrated' },
      { metric: '6', label: 'hospitals in 11 months' },
    ],
    quote: 'The clinicians stopped asking to go back to paper in about three weeks. That is the fastest I have seen.',
    author: 'Chief Medical Information Officer, Kepler Health',
    stack: ['Nova Care HIS', 'Nova LIS', 'Nova Docs', 'On-premise', 'PostgreSQL'],
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
export const caseStudiesForService = (serviceSlug) =>
  caseStudies.filter((c) => c.services?.includes(serviceSlug));

export const testimonials = [
  {
    quote: 'We evaluated four vendors. CoreNova was the only one that showed us a running system in the first meeting instead of a slide deck, and the product we saw is the product we got.',
    author: 'Priya Raghavan', role: 'Chief Operating Officer', company: 'Northwind Group', industry: 'Manufacturing',
  },
  {
    quote: 'Their team embedded into our sprints within two weeks. Six months in, I genuinely cannot tell from the standup who is ours and who is theirs.',
    author: 'Daniel Okafor', role: 'VP Engineering', company: 'Bluepeak', industry: 'SaaS',
  },
  {
    quote: 'The migration was the part I was dreading. They ran three dry runs on real data and gave us a rollback plan we never needed to use.',
    author: 'Meera Kulkarni', role: 'Finance Director', company: 'Solaris Retail', industry: 'Retail',
  },
  {
    quote: 'Support answers in minutes, not days, and the person answering has actually read the code. That is worth more than the licence discount anyone else offered.',
    author: 'Thomas Lindgren', role: 'IT Director', company: 'Ironclad Logistics', industry: 'Logistics',
  },
  {
    quote: 'We needed on-premise because of regulation. Every other vendor offered a cut-down edition. CoreNova shipped the same product with the same upgrade path.',
    author: 'Ahmed Al-Rashid', role: 'Head of Technology', company: 'Meridian Bank', industry: 'Banking',
  },
  {
    quote: 'They pushed back on two features we asked for and explained why. Both times they were right. I trust their roadmap advice now.',
    author: 'Sarah Whitfield', role: 'Chief Product Officer', company: 'Lumen Edu', industry: 'Education',
  },
];

export const plans = [
  {
    name: 'Starter',
    tagline: 'For small teams getting off spreadsheets',
    monthly: 19, annual: 15,
    unit: 'per user / month',
    highlight: false,
    features: [
      'Any 1 product', 'Up to 25 users', 'Cloud (SaaS) deployment', 'Standard modules',
      'Email support, next business day', 'Community knowledge base', '99.9% uptime SLA',
    ],
    cta: 'Start free trial',
  },
  {
    name: 'Growth',
    tagline: 'For scaling companies running several products',
    monthly: 44, annual: 35,
    unit: 'per user / month',
    highlight: true,
    features: [
      'Up to 3 products', 'Unlimited users', 'Cloud or private cloud', 'All modules + custom fields',
      'Open API & webhooks', 'SSO (SAML / OIDC)', 'Priority support, 4h response',
      'Named onboarding manager', '99.95% uptime SLA',
    ],
    cta: 'Start free trial',
  },
  {
    name: 'Enterprise',
    tagline: 'For regulated and multi-entity organisations',
    monthly: null, annual: null,
    unit: 'custom pricing',
    highlight: false,
    features: [
      'Unlimited products', 'Cloud, on-premise or hybrid', 'Custom modules & integrations',
      'Dedicated environment', 'Advanced audit & SIEM export', '24×7 support, 1h P1 response',
      'Named solution architect', 'Quarterly roadmap review', '99.99% uptime SLA',
    ],
    cta: 'Talk to sales',
  },
];

export const faqs = [
  {
    q: 'Do you sell products, or do you build custom software?',
    a: `Both — and they reinforce each other. We run ${productCount} of our own products in production, so custom projects start from proven modules (authentication, audit logging, RBAC, billing) rather than an empty repository. Most clients start with a product and commission custom work around it.`,
  },
  {
    q: 'Can we run your software on our own servers?',
    a: 'Yes. Every product ships in four deployment modes — cloud SaaS, private cloud in your tenant, fully on-premise, or hybrid. It is the same codebase and the same upgrade path in all four; on-premise customers are not given a reduced edition.',
  },
  {
    q: 'How long does a typical implementation take?',
    a: 'A single product on cloud with standard configuration goes live in 2–6 weeks. A multi-product rollout with data migration and integrations typically runs 3–6 months. Custom builds are 12–28 weeks depending on scope. You get a written plan with dates before signing.',
  },
  {
    q: 'What happens to our existing data?',
    a: 'Migration tooling is part of every implementation. We profile your source data, build importers, and run at least two dry runs on a copy of production before cutover. Every cutover ships with a documented rollback plan.',
  },
  {
    q: 'How do you handle security and compliance?',
    a: 'We are ISO 27001:2022 certified and SOC 2 Type II audited annually, with GDPR and HIPAA-aligned controls. Encryption in transit and at rest, SSO, MFA, granular RBAC and immutable audit logs ship in every product. Penetration test summaries are available under NDA.',
  },
  {
    q: 'What does support actually cover?',
    a: 'Standard support is email with next-business-day response. Priority adds a 4-hour response and a named onboarding manager. Enterprise is 24×7 with a 1-hour P1 response, a named solution architect and a monthly service review. All tiers include product upgrades at no extra cost.',
  },
  {
    q: 'Can we integrate with systems we already run?',
    a: 'Every product exposes REST and GraphQL APIs plus webhooks — there are no UI-only features. We maintain pre-built connectors for common ERP, payment, telephony and identity platforms, and we build custom connectors as part of implementation where needed.',
  },
  {
    q: 'What if we want to leave?',
    a: 'Your data is yours. Every product has a full export in open formats (CSV, JSON) available on demand and via API, with no exit fee and no notice period beyond your contract term. We will also hand over schema documentation.',
  },
];

export const awards = [
  { year: '2026', title: 'Top 10 Enterprise Software Providers', body: 'CIO Review — Asia Pacific edition' },
  { year: '2025', title: 'Best Vertical SaaS — Healthcare', body: 'Enterprise Tech Awards' },
  { year: '2025', title: 'Great Place to Work Certified', body: 'Third consecutive year' },
  { year: '2024', title: 'Innovation in Retail Technology', body: 'Retail Systems Awards, finalist' },
];
