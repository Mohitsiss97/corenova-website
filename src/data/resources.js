import { FileText, ListChecks, Video, FileSpreadsheet } from 'lucide-react';

/* Downloadable and recorded material. `gated` decides whether the card asks for
   an email — kept as data so the gating policy is visible in one place rather
   than scattered across the page. */

export const resourceTypes = [
  { slug: 'whitepaper', name: 'Whitepapers & ebooks', icon: FileText, blurb: 'Long-form analysis with the working shown.' },
  { slug: 'template', name: 'Templates & checklists', icon: ListChecks, blurb: 'The documents we use internally, cleaned up for reuse.' },
  { slug: 'webinar', name: 'Webinars', icon: Video, blurb: 'Recorded sessions with the Q&A left in.' },
  { slug: 'report', name: 'Benchmarks & reports', icon: FileSpreadsheet, blurb: 'Numbers from real deployments, anonymised.' },
];

export const resources = [
  {
    slug: 'dotnet-migration-playbook',
    type: 'whitepaper',
    title: 'The .NET Framework migration playbook',
    topic: 'Modernisation',
    description:
      'The full strangler-pattern method we used to move 640k lines of C# to .NET 10 with no code freeze — routing, sequencing, characterisation tests and the two mistakes we made.',
    format: 'PDF',
    length: '38 pages',
    updated: '2026-08-24',
    gated: true,
    featured: true,
  },
  {
    slug: 'erp-selection-checklist',
    type: 'template',
    title: 'ERP selection checklist',
    topic: 'Evaluation',
    description:
      'The 84 questions we would ask if we were buying rather than selling, including the eleven that vendors most dislike being asked in writing.',
    format: 'XLSX + PDF',
    length: '84 questions',
    updated: '2026-07-19',
    gated: false,
    featured: false,
  },
  {
    slug: 'data-migration-runbook',
    type: 'template',
    title: 'Data migration runbook template',
    topic: 'Migration',
    description:
      'Profiling queries, dry-run schedule, reconciliation report structure and a rollback checklist. The same template our delivery teams open on day one of a migration.',
    format: 'DOCX + Markdown',
    length: '22 pages',
    updated: '2026-06-30',
    gated: false,
    featured: false,
  },
  {
    slug: 'rfp-response-pack',
    type: 'template',
    title: 'Security questionnaire response pack',
    topic: 'Procurement',
    description:
      'Our standard answers to the 340 questions enterprise buyers ask most often, with the certifications and evidence each one maps to. Useful even if you never talk to us.',
    format: 'XLSX',
    length: '340 questions',
    updated: '2026-08-12',
    gated: true,
    featured: false,
  },
  {
    slug: 'on-premise-vs-cloud',
    type: 'whitepaper',
    title: 'On-premise, private cloud or SaaS: an honest comparison',
    topic: 'Architecture',
    description:
      'What each deployment mode actually costs over five years, including the operational load most vendor comparisons leave out because it lands on your team rather than theirs.',
    format: 'PDF',
    length: '26 pages',
    updated: '2026-05-28',
    gated: true,
    featured: false,
  },
  {
    slug: 'implementation-benchmarks-2026',
    type: 'report',
    title: 'Implementation benchmarks 2026',
    topic: 'Benchmarks',
    description:
      'Median time to go-live, cost per user and month-two ticket volume across 180 anonymised deployments, split by product, company size and deployment mode.',
    format: 'PDF + CSV',
    length: '41 pages',
    updated: '2026-08-01',
    gated: true,
    featured: true,
  },
  {
    slug: 'rbac-design-guide',
    type: 'whitepaper',
    title: 'Designing permissions that survive a reorg',
    topic: 'Architecture',
    description:
      'Permission keys instead of roles, with the naming conventions, the audit matrix and the three rules that keep an access model honest as the org chart changes underneath it.',
    format: 'PDF',
    length: '19 pages',
    updated: '2026-07-05',
    gated: false,
    featured: false,
  },
  {
    slug: 'go-live-readiness-checklist',
    type: 'template',
    title: 'Go-live readiness checklist',
    topic: 'Delivery',
    description:
      'The gate we run before every production cutover: 62 checks across data, access, monitoring, training, support and rollback, with an owner required against each.',
    format: 'PDF + XLSX',
    length: '62 checks',
    updated: '2026-08-16',
    gated: false,
    featured: false,
  },
  {
    slug: 'webinar-offline-first-retail',
    type: 'webinar',
    title: 'Offline-first retail: what 210 stores taught us',
    topic: 'Retail',
    description:
      'The Solaris rollout in detail — conflict policy per entity, why we made the offline state visible to cashiers, and the training model that got 900 people live in six weeks.',
    format: 'Recording',
    length: '48 min',
    updated: '2026-07-24',
    gated: false,
    featured: false,
  },
  {
    slug: 'webinar-audit-ready-systems',
    type: 'webinar',
    title: 'Building systems your auditor will accept',
    topic: 'Compliance',
    description:
      'With our CISO. Audit log design, evidence export, and answering a bank security questionnaire without overclaiming. The unedited Q&A runs 20 minutes.',
    format: 'Recording',
    length: '62 min',
    updated: '2026-06-12',
    gated: true,
    featured: false,
  },
  {
    slug: 'webinar-ai-in-erp',
    type: 'webinar',
    title: 'Where AI actually helps inside an ERP',
    topic: 'AI',
    description:
      'Three places machine learning earns its keep in operational software — demand forecasting, document extraction and anomaly detection — and four places it does not.',
    format: 'Recording',
    length: '55 min',
    updated: '2026-08-07',
    gated: false,
    featured: false,
  },
  {
    slug: 'total-cost-of-ownership-model',
    type: 'report',
    title: 'Five-year TCO model',
    topic: 'Evaluation',
    description:
      'An editable model covering licence, implementation, integration, internal effort and the upgrade cycle. Our assumptions are visible and you can replace all of them.',
    format: 'XLSX',
    length: 'Editable model',
    updated: '2026-06-21',
    gated: false,
    featured: false,
  },
];

export const resourceCount = resources.length;
export const featuredResources = resources.filter((r) => r.featured);
export const resourceTopics = [...new Set(resources.map((r) => r.topic))].sort();
export const getResourceType = (slug) => resourceTypes.find((t) => t.slug === slug);
