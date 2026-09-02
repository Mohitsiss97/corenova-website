/* ------------------------------------------------------------------
   Pricing page data. `plans` itself lives in content.js because the home
   page teaser uses it too; everything only the pricing page needs is here.
------------------------------------------------------------------ */

/** Rows of the full comparison matrix, grouped as buyers evaluate them. */
export const featureMatrix = [
  {
    group: 'Scope',
    rows: [
      { label: 'Products included', starter: '1', growth: 'Up to 3', enterprise: 'Unlimited' },
      { label: 'Users', starter: 'Up to 25', growth: 'Unlimited', enterprise: 'Unlimited' },
      { label: 'Environments', starter: 'Production', growth: 'Production + staging', enterprise: 'Production, staging, sandbox' },
      { label: 'Custom fields & layouts', starter: false, growth: true, enterprise: true },
      { label: 'Custom modules', starter: false, growth: false, enterprise: true },
    ],
  },
  {
    group: 'Deployment',
    rows: [
      { label: 'Cloud (SaaS)', starter: true, growth: true, enterprise: true },
      { label: 'Private cloud (your tenant)', starter: false, growth: true, enterprise: true },
      { label: 'On-premise', starter: false, growth: false, enterprise: true },
      { label: 'Hybrid', starter: false, growth: false, enterprise: true },
      { label: 'Data residency choice', starter: false, growth: 'Region', enterprise: 'Region or your DC' },
    ],
  },
  {
    group: 'Integration',
    rows: [
      { label: 'REST & GraphQL APIs', starter: true, growth: true, enterprise: true },
      { label: 'Webhooks', starter: false, growth: true, enterprise: true },
      { label: 'Sandbox keys', starter: false, growth: true, enterprise: true },
      { label: 'Pre-built connectors', starter: '5', growth: 'All', enterprise: 'All + custom' },
      { label: 'Custom integration build', starter: false, growth: false, enterprise: true },
    ],
  },
  {
    group: 'Security & compliance',
    rows: [
      { label: 'Encryption at rest and in transit', starter: true, growth: true, enterprise: true },
      { label: 'Role-based permissions', starter: true, growth: true, enterprise: true },
      { label: 'SSO (SAML / OIDC)', starter: false, growth: true, enterprise: true },
      { label: 'SCIM provisioning', starter: false, growth: false, enterprise: true },
      { label: 'Audit log', starter: '90 days', growth: '2 years', enterprise: 'Unlimited + SIEM export' },
      { label: 'Penetration test summary', starter: false, growth: false, enterprise: true },
    ],
  },
  {
    group: 'Support',
    rows: [
      { label: 'Response time', starter: 'Next business day', growth: '4 hours', enterprise: '1 hour (P1), 24×7' },
      { label: 'Channel', starter: 'Email', growth: 'Email + chat', enterprise: 'Email, chat, phone' },
      { label: 'Named onboarding manager', starter: false, growth: true, enterprise: true },
      { label: 'Named solution architect', starter: false, growth: false, enterprise: true },
      { label: 'Quarterly roadmap review', starter: false, growth: false, enterprise: true },
      { label: 'Uptime SLA', starter: '99.9%', growth: '99.95%', enterprise: '99.99%' },
    ],
  },
  {
    group: 'Migration & exit',
    rows: [
      { label: 'Import tooling', starter: true, growth: true, enterprise: true },
      { label: 'Assisted migration', starter: false, growth: true, enterprise: true },
      { label: 'Dry runs on production copy', starter: '1', growth: '2', enterprise: 'Unlimited' },
      { label: 'Full data export (CSV / JSON / API)', starter: true, growth: true, enterprise: true },
      { label: 'Exit fee', starter: 'None', growth: 'None', enterprise: 'None' },
    ],
  },
];

/** Starting assumptions for the ROI calculator — every one is user-editable. */
export const roiDefaults = {
  teamSize: 120,
  hoursPerWeek: 6,
  hourlyCost: 22,
  reductionPct: 35,
  seatPrice: 35,
};

export const roiBounds = {
  teamSize: { min: 10, max: 2000, step: 10, label: 'People doing this work', suffix: '' },
  hoursPerWeek: { min: 1, max: 20, step: 1, label: 'Hours each, per week, on manual admin', suffix: ' hrs' },
  hourlyCost: { min: 5, max: 120, step: 1, label: 'Loaded hourly cost', prefix: '$' },
  reductionPct: { min: 10, max: 70, step: 5, label: 'Share of that time the software removes', suffix: '%' },
};

export const pricingFaqs = [
  {
    q: 'Is the price per user or per company?',
    a: 'Starter and Growth are per user, per month, billed annually or monthly. Some products — POS, hotel PMS, hospital systems — are priced per site instead, because seat counts do not describe how they are used. Each product page states which applies.',
  },
  {
    q: 'What counts as a user?',
    a: 'Anyone who signs in. Read-only viewers on Growth and Enterprise are free and uncapped, so dashboards can be shared with your leadership team without adding licences.',
  },
  {
    q: 'Do we pay more to run it on our own servers?',
    a: 'On-premise and hybrid are Enterprise-tier, and pricing there reflects the support model rather than a licence surcharge. You get the same codebase and the same upgrade cadence as cloud customers.',
  },
  {
    q: 'Are upgrades included?',
    a: 'Yes, on every tier. Product upgrades, security patches and new modules within a product you already licence cost nothing extra. Major version migrations that change how you work are scoped separately and quoted before starting.',
  },
  {
    q: 'What happens if we grow past our plan?',
    a: 'You move to the next tier at the anniversary, or immediately with the difference prorated. Nothing gets switched off mid-term and there is no overage penalty.',
  },
  {
    q: 'Is there a discount for multiple products?',
    a: 'Growth already bundles up to three. Beyond that, Enterprise is priced as a portfolio rather than per product — most multi-product customers pay less per seat than they would on three separate Growth plans.',
  },
  {
    q: 'Can we trial before paying?',
    a: 'A 14-day trial on any single product, with your own data imported by us rather than a demo dataset. No card required, and the trial environment converts to production if you proceed.',
  },
  {
    q: 'What if we want to leave?',
    a: 'Full export in open formats on demand and via API, no exit fee, and no notice period beyond your contract term. We also hand over schema documentation so another vendor can pick it up.',
  },
];

/** What the plan price does not cover, stated plainly rather than buried. */
export const notIncluded = [
  { label: 'Implementation', detail: 'Configuration, data migration and training are quoted per project. Typical single-product cloud rollouts run $4k–$15k.' },
  { label: 'Custom development', detail: 'New modules or bespoke integrations are separate engagements, priced after a written scope.' },
  { label: 'Third-party licences', detail: 'Payment gateways, SMS and mapping providers bill you directly at their own rates.' },
  { label: 'On-premise infrastructure', detail: 'Your servers, your cloud account. We size it and hand you the spec before you buy anything.' },
];
