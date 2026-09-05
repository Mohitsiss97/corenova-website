import { brand, cities, emails } from './brand.js';

/* Press releases, media coverage and brand assets. */

export const pressReleases = [
  {
    slug: 'nova-flow-2',
    date: '2026-08-19',
    tag: 'Product',
    title: `${brand.name} ships ${brand.productPrefix} Flow 2.0, bringing no-code approvals to every product`,
    body: 'The release makes the workflow designer available across the full ${brand.suiteName} range, so an approval chain defined once applies to purchase orders, leave requests and document sign-off without separate configuration in each product.',
  },
  {
    slug: 'dotnet-10-migration-practice',
    date: '2026-06-03',
    tag: 'Company',
    title: `${brand.name} formalises its .NET modernisation practice as .NET 10 LTS lands`,
    body: 'The practice consolidates work the company has been doing case by case since 2019, with a published assessment method and a strangler-pattern migration path for ASP.NET MVC and WebForms estates.',
  },
  {
    slug: 'northwind-migration-complete',
    date: '2026-04-22',
    tag: 'Customer',
    title: 'Northwind Group completes 640,000-line migration to .NET 10 with zero planned downtime',
    body: 'Three business-critical applications moved route by route behind a reverse proxy over thirteen months, with median API response improving 3.4× and Azure compute spend falling 38%.',
  },
  {
    slug: 'iso-27001-2022',
    date: '2026-02-11',
    tag: 'Compliance',
    title: `${brand.name} recertifies to ISO 27001:2022 and completes its fourth SOC 2 Type II`,
    body: 'Both audits covered all four deployment modes, including on-premise customer environments, with no major non-conformities raised.',
  },
  {
    slug: 'dubai-office',
    date: '2025-11-06',
    tag: 'Company',
    title: `${brand.name} opens a Middle East office in Dubai`,
    body: `The office serves GCC customers with local implementation and support cover, following three years of delivering into the region from ${cities.hq}.`,
  },
  {
    slug: 'kepler-health-his',
    date: '2025-09-30',
    tag: 'Customer',
    title: 'Kepler Health cuts OPD waiting times 41% across six hospitals',
    body: `${brand.productPrefix} Care HIS replaced paper records and three legacy systems across a 1,400-bed group, migrating 1.2 million patient records over eleven months.`,
  },
];

export const coverage = [
  { outlet: 'CIO Review', date: '2026-07-28', title: 'The vendors quietly rebuilding the mid-market ERP stack', kind: 'Feature' },
  { outlet: 'Enterprise Tech Weekly', date: '2026-05-14', title: 'Why the .NET Framework deadline is finally forcing hands', kind: 'Interview' },
  { outlet: 'Retail Systems', date: '2026-03-09', title: 'Offline-first POS: what 210 stores learned the hard way', kind: 'Case feature' },
  { outlet: 'Healthcare IT News', date: '2025-12-02', title: 'Hospital groups are choosing on-premise again — and vendors are adapting', kind: 'Analysis' },
  { outlet: 'The Software Report', date: '2025-10-17', title: 'Top 10 enterprise software providers, Asia Pacific', kind: 'Listing' },
];

export const brandAssets = [
  { name: 'Logo pack', detail: 'SVG and PNG, light and dark, with clear-space guidance', size: 'ZIP · 340 KB' },
  { name: 'Brand guidelines', detail: 'Colour tokens, typography and usage rules', size: 'PDF · 1.8 MB' },
  { name: 'Product screenshots', detail: `High-resolution captures of the ${brand.suiteName} console`, size: 'ZIP · 12 MB' },
  { name: 'Leadership headshots', detail: 'Print-resolution portraits with credits', size: 'ZIP · 8 MB' },
];

export const pressContact = {
  name: 'Press office',
  email: `${emails.press}`,
  note: 'We answer press enquiries within one working day. For anything under embargo, say so in the subject line.',
};

export const formatPressDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  });

export const pressTags = [...new Set(pressReleases.map((r) => r.tag))];
