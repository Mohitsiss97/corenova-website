import {
  Rocket, CreditCard, Key, Plug, Boxes, Gauge, Users, ShieldCheck,
} from 'lucide-react';

/* Help centre content. Categories and articles drive both the tile grid and the
   search, so an article cannot exist outside a category. */

export const supportCategories = [
  { slug: 'getting-started', name: 'Getting started', icon: Rocket, blurb: 'First login, inviting your team and configuring a product.' },
  { slug: 'billing', name: 'Billing & plans', icon: CreditCard, blurb: 'Invoices, seat counts, upgrades and purchase orders.' },
  { slug: 'accounts', name: 'Accounts & access', icon: Key, blurb: 'SSO, roles, permission keys and locked-out users.' },
  { slug: 'integrations', name: 'Integrations', icon: Plug, blurb: 'Connectors, webhooks and the things that break in between.' },
  { slug: 'data', name: 'Data & migration', icon: Boxes, blurb: 'Imports, exports, dry runs and reconciliation.' },
  { slug: 'performance', name: 'Performance', icon: Gauge, blurb: 'Slow reports, timeouts and what to send us.' },
  { slug: 'admin', name: 'Administration', icon: Users, blurb: 'Org structure, approval chains and notification rules.' },
  { slug: 'security', name: 'Security & compliance', icon: ShieldCheck, blurb: 'Audit logs, certifications and security reviews.' },
];

export const helpArticles = [
  { id: 'invite-your-team', category: 'getting-started', title: 'Invite your team and assign roles', summary: 'Bulk invite by CSV or directory sync, and why you should map roles before enforcing SSO.', updated: '2026-08-14', popular: true, minutes: 4 },
  { id: 'first-week-checklist', category: 'getting-started', title: 'Your first week: a configuration checklist', summary: 'The eleven settings worth deciding deliberately before your team starts entering real data.', updated: '2026-07-30', popular: true, minutes: 7 },
  { id: 'sandbox-vs-production', category: 'getting-started', title: 'Using the sandbox environment', summary: 'What sandbox shares with production, what it does not, and how to reset it safely.', updated: '2026-06-11', popular: false, minutes: 3 },

  { id: 'understand-your-invoice', category: 'billing', title: 'Understanding your invoice', summary: 'How seats are counted, when proration applies, and what a mid-cycle upgrade actually costs.', updated: '2026-08-02', popular: true, minutes: 5 },
  { id: 'purchase-orders', category: 'billing', title: 'Paying by purchase order', summary: 'PO numbers on invoices, annual prepayment and multi-entity billing splits.', updated: '2026-05-20', popular: false, minutes: 3 },
  { id: 'change-plan', category: 'billing', title: 'Upgrading, downgrading and cancelling', summary: 'What happens to your data on downgrade, and the export you should take first.', updated: '2026-07-08', popular: false, minutes: 4 },

  { id: 'locked-out', category: 'accounts', title: 'Locked out after an SSO change', summary: 'Recovering access with the break-glass account when the identity provider rejects everyone.', updated: '2026-08-26', popular: true, minutes: 4 },
  { id: 'permission-keys-explained', category: 'accounts', title: 'Roles versus permission keys', summary: 'Why a role is just a named set of keys, and how to build a role for an awkward org shape.', updated: '2026-08-19', popular: true, minutes: 6 },
  { id: 'scim-troubleshooting', category: 'accounts', title: 'SCIM provisioning is not syncing', summary: 'The four causes behind almost every stalled SCIM sync, in the order worth checking.', updated: '2026-07-22', popular: false, minutes: 6 },

  { id: 'webhook-not-received', category: 'integrations', title: 'A webhook was not received', summary: 'Checking delivery attempts, replaying events and the signature mistake that causes most 401s.', updated: '2026-08-21', popular: true, minutes: 5 },
  { id: 'connector-auth-expired', category: 'integrations', title: 'A connector stopped with an auth error', summary: 'Refresh-token expiry across OAuth connectors and how to reconnect without losing mappings.', updated: '2026-06-28', popular: false, minutes: 4 },
  { id: 'rate-limits', category: 'integrations', title: 'Handling rate limits correctly', summary: 'Reading RateLimit headers, backing off properly and when to ask for a higher ceiling.', updated: '2026-05-30', popular: false, minutes: 4 },

  { id: 'import-failed-validation', category: 'data', title: 'My import failed validation', summary: 'Reading the validation report, the five most common column problems and how to fix them in place.', updated: '2026-08-09', popular: true, minutes: 8 },
  { id: 'reconciliation-report', category: 'data', title: 'Reading the reconciliation report', summary: 'What each section means and which numbers must match exactly before you commit.', updated: '2026-07-15', popular: false, minutes: 6 },
  { id: 'request-full-export', category: 'data', title: 'Requesting a full data export', summary: 'Ordering an export from the dashboard or the API, and what the data dictionary contains.', updated: '2026-06-04', popular: false, minutes: 3 },

  { id: 'report-is-slow', category: 'performance', title: 'A report is slow or times out', summary: 'Narrowing the date range, checking the query plan and the diagnostics we need from you.', updated: '2026-08-17', popular: true, minutes: 5 },
  { id: 'bulk-operations', category: 'performance', title: 'Running large bulk operations', summary: 'Batch sizes, off-peak scheduling and how to monitor a long-running job.', updated: '2026-06-19', popular: false, minutes: 4 },

  { id: 'approval-chains', category: 'admin', title: 'Building approval chains', summary: 'Value thresholds, delegation during leave and what happens when an approver leaves the company.', updated: '2026-08-05', popular: false, minutes: 7 },
  { id: 'notification-rules', category: 'admin', title: 'Notification rules without the noise', summary: 'Routing by rule rather than by role, and the digest options people actually keep switched on.', updated: '2026-07-01', popular: false, minutes: 5 },

  { id: 'export-audit-log', category: 'security', title: 'Exporting the audit log for an auditor', summary: 'Filtering by actor, entity or window, and streaming continuously to your SIEM.', updated: '2026-08-23', popular: true, minutes: 4 },
  { id: 'security-questionnaire', category: 'security', title: 'Requesting compliance documents', summary: 'SOC 2 report, ISO certificate and penetration test summary — what needs an NDA and what does not.', updated: '2026-07-11', popular: false, minutes: 3 },
];

/* ------------------------------------------------------------------ SLA */
export const slaTiers = [
  {
    tier: 'Standard',
    plans: 'Starter',
    hours: 'Business hours, Mon–Fri',
    channels: ['Email', 'Knowledge base'],
    responses: [
      { priority: 'P1 — Service down', time: 'Next business day' },
      { priority: 'P2 — Major impairment', time: 'Next business day' },
      { priority: 'P3 — Minor issue', time: '2 business days' },
      { priority: 'P4 — Question', time: '3 business days' },
    ],
  },
  {
    tier: 'Priority',
    plans: 'Growth',
    hours: 'Extended hours, Mon–Sat',
    channels: ['Email', 'Shared Slack or Teams channel', 'Named onboarding manager'],
    highlight: true,
    responses: [
      { priority: 'P1 — Service down', time: '4 hours' },
      { priority: 'P2 — Major impairment', time: '4 hours' },
      { priority: 'P3 — Minor issue', time: '1 business day' },
      { priority: 'P4 — Question', time: '2 business days' },
    ],
  },
  {
    tier: 'Enterprise',
    plans: 'Enterprise',
    hours: '24×7, every day',
    channels: ['Email', 'Shared channel', 'Phone escalation', 'Named solution architect'],
    responses: [
      { priority: 'P1 — Service down', time: '1 hour' },
      { priority: 'P2 — Major impairment', time: '2 hours' },
      { priority: 'P3 — Minor issue', time: '1 business day' },
      { priority: 'P4 — Question', time: '1 business day' },
    ],
  },
];

export const escalationPath = [
  { step: '01', title: 'Raise it in your channel', detail: 'Support inbox or your shared Slack or Teams channel. Include the tenant, environment and the time the behaviour started.' },
  { step: '02', title: 'Ask for escalation explicitly', detail: 'Saying "please escalate" moves the ticket to the duty lead. You do not need to justify it or wait for a response window to expire.' },
  { step: '03', title: 'Duty lead takes ownership', detail: 'A named engineer owns it end to end with updates on a fixed cadence — every 30 minutes for P1 — whether or not there is news.' },
  { step: '04', title: 'Account escalation', detail: 'For Enterprise, your solution architect and the VP Customer Success join. Contact details are in your onboarding pack, not behind a form.' },
];

export const statusNote = {
  title: 'Live status and incident history',
  body: 'Every incident gets a public timeline and a written post-mortem within five working days, including the ones only one customer noticed.',
};

export const popularArticles = helpArticles.filter((a) => a.popular);
export const articlesInCategory = (slug) => helpArticles.filter((a) => a.category === slug);
export const getSupportCategory = (slug) => supportCategories.find((c) => c.slug === slug);
