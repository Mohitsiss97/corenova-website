import {
  Compass, PenTool, Code, ShieldCheck, Rocket, RefreshCw,
  Calendar, Presentation, Users, ListChecks, Bug, Gauge, Lock, Accessibility,
} from 'lucide-react';

/* The six delivery stages, expanded. `process` in services.js is the short
   version used on the Services page; this is the same spine with the
   deliverables, entry and exit criteria the /process page renders. */
export const stages = [
  {
    step: '01',
    icon: Compass,
    name: 'Discover',
    duration: '1–2 weeks',
    summary: 'Establish what is actually broken before anyone proposes a fix.',
    detail:
      'Stakeholder interviews across the people who use the system and the people who pay for it, a current-state audit of what already runs, and a written problem statement everyone signs before a line of code exists.',
    deliverables: ['Written problem statement', 'Current-state system map', 'Prioritised requirement list', 'Effort range and risk register'],
    weNeed: 'Access to the people doing the work today, and read access to the systems being replaced.',
    exit: 'You can hand the problem statement to another vendor and get a comparable quote. It is yours either way.',
  },
  {
    step: '02',
    icon: PenTool,
    name: 'Design',
    duration: '2–4 weeks',
    summary: 'Decide the shape of the thing while changing it is still cheap.',
    detail:
      'Information architecture and hi-fi prototypes for the screens that matter, plus the technical blueprint — architecture, data model, integration contracts and non-functional targets written as numbers, not adjectives.',
    deliverables: ['Clickable prototype of the core flows', 'Architecture decision records', 'Data model and migration plan', 'Non-functional targets (latency, uptime, RPO/RTO)'],
    weNeed: 'One decision-maker who can settle scope disagreements inside 48 hours.',
    exit: 'Nothing in the build stage should surprise you. If it does, that is a Design failure, not a Build one.',
  },
  {
    step: '03',
    icon: Code,
    name: 'Build',
    duration: '6–20 weeks',
    summary: 'Two-week sprints, each ending in something you can click.',
    detail:
      'Working software from week five onward, deployed to a real environment every sprint. Progress is demonstrated in the product, never in a percentage on a status deck. Scope changes are priced and re-planned in the open.',
    deliverables: ['Deployed increment every two weeks', 'Sprint demo and written notes', 'Updated burn-up and scope ledger', 'Test suite growing with the code'],
    weNeed: 'Two hours per sprint from your product owner: one for the demo, one for the next plan.',
    exit: 'Every accepted story is running in a staging environment you control.',
  },
  {
    step: '04',
    icon: ShieldCheck,
    name: 'Harden',
    duration: '2–3 weeks',
    summary: 'Break it deliberately before your users find the same edges.',
    detail:
      'Performance, security and accessibility passes against the targets set in Design. User acceptance testing with your actual staff, and a cutover plan rehearsed on a copy of production with a documented rollback.',
    deliverables: ['Load test report against agreed targets', 'Security review and remediation log', 'WCAG 2.2 AA accessibility audit', 'Cutover runbook with rollback steps'],
    weNeed: 'A UAT group of real users, not just their managers.',
    exit: 'Two dry-run migrations completed on production-shaped data.',
  },
  {
    step: '05',
    icon: Rocket,
    name: 'Launch',
    duration: '1 week',
    summary: 'Phased rollout with the build team on call, not a support queue.',
    detail:
      'Go-live in waves rather than a single switch, with live monitoring, hypercare staffed by the engineers who wrote the code, and training delivered separately for administrators and end users.',
    deliverables: ['Phased rollout schedule', 'Live dashboards and alerting', 'Admin and end-user training', 'Two weeks of hypercare with the build team'],
    weNeed: 'A named internal champion per site or department.',
    exit: 'Month-two ticket volume lower than month one. That is the number we are judged on.',
  },
  {
    step: '06',
    icon: RefreshCw,
    name: 'Evolve',
    duration: 'Ongoing',
    summary: 'The team that built it keeps improving it.',
    detail:
      'A support SLA with named responders, quarterly roadmap reviews against your business plan rather than ours, and enhancement sprints booked in advance so improvement is a habit rather than an escalation.',
    deliverables: ['Support SLA with named responders', 'Quarterly roadmap review', 'Enhancement sprints on a standing cadence', 'Annual architecture health check'],
    weNeed: 'One quarterly hour from the business owner, not only from IT.',
    exit: 'There is no exit. This is the part that lasts eleven years.',
  },
];

/* ------------------------------------------------------------------ rhythm */
export const ceremonies = [
  { icon: Calendar, name: 'Sprint planning', cadence: 'Every second Monday', duration: '90 min', who: 'Product owner, tech lead, whole team', detail: 'The team pulls what it believes it can finish. Nothing is assigned to anyone by a manager.' },
  { icon: Users, name: 'Daily standup', cadence: 'Daily', duration: '10 min', who: 'Delivery team, client optional', detail: 'Blockers only. Status lives in the board; if the standup runs long, something else is wrong.' },
  { icon: Presentation, name: 'Sprint demo', cadence: 'Every second Friday', duration: '45 min', who: 'Anyone on your side who wants in', detail: 'Live software in a real environment. No slides, no recordings of happy paths.' },
  { icon: ListChecks, name: 'Retro', cadence: 'Every second Friday', duration: '45 min', who: 'Delivery team', detail: 'One process change per retro, maximum. Changing five things at once teaches you nothing.' },
  { icon: Gauge, name: 'Scope review', cadence: 'Monthly', duration: '30 min', who: 'Sponsor and account lead', detail: 'The scope ledger, the burn-up and any change requests, priced. No surprises at invoice time.' },
  { icon: RefreshCw, name: 'Roadmap review', cadence: 'Quarterly', duration: '2 hrs', who: 'Business owner, product, architecture', detail: 'What changed in your business, and what that means for the next quarter of the system.' },
];

/* ------------------------------------------------------------------ gates */
/* Each gate blocks the merge or the release. They are listed with the number
   that has to be true, because a gate described in adjectives is not a gate. */
export const qualityGates = [
  { icon: ListChecks, name: 'Code review', rule: 'Two approvals', detail: 'Every change needs two reviewers, one of whom did not write any part of the feature. No self-merge, including for leads.' },
  { icon: Bug, name: 'Automated tests', rule: '80% line coverage floor', detail: 'Unit and integration suites run on every push. Coverage may not drop below the floor; a PR that lowers it fails the build.' },
  { icon: Lock, name: 'Security scan', rule: 'Zero high or critical', detail: 'Dependency, secret and static analysis on every pipeline run. High and critical findings block the merge outright.' },
  { icon: Gauge, name: 'Performance budget', rule: 'p95 under target', detail: 'Key transactions carry a p95 latency budget agreed in Design. Regressions fail the pipeline rather than being noted in a ticket.' },
  { icon: Accessibility, name: 'Accessibility', rule: 'WCAG 2.2 AA', detail: 'Automated axe checks per build, plus a manual keyboard and screen-reader pass before each release.' },
  { icon: ShieldCheck, name: 'Release sign-off', rule: 'Runbook and rollback', detail: 'No production release without a written runbook, a tested rollback path and a named owner on call.' },
];

/* ------------------------------------------------------------------ tooling */
export const toolingGroups = [
  { group: 'Planning', items: ['Jira or Linear — yours if you have one', 'Shared roadmap board', 'Public scope ledger'] },
  { group: 'Code', items: ['GitHub or Azure DevOps in your org', 'Trunk-based with short-lived branches', 'Conventional commits and generated changelogs'] },
  { group: 'Delivery', items: ['GitHub Actions or Azure Pipelines', 'Infrastructure as code (Terraform / Bicep)', 'Ephemeral preview environments per PR'] },
  { group: 'Communication', items: ['Your Slack or Teams, our engineers in it', 'Written decisions in ADRs, not DMs', 'Recorded demos for anyone who missed one'] },
  { group: 'Observability', items: ['Grafana dashboards handed over on day one', 'Alerting routed to your on-call as well as ours', 'Error budgets reviewed monthly'] },
  { group: 'Documentation', items: ['Docs in the repository, versioned with the code', 'ADRs for every irreversible decision', 'Runbooks written before the release, not after'] },
];

/* ------------------------------------------------------------------ handover */
export const handoverStandards = [
  { title: 'Code in your repository', body: 'From the first commit, not at the end. You own the IP with no licence-back clause, and the history comes with it.' },
  { title: 'Architecture decision records', body: 'Every irreversible decision written down with the alternatives considered and why they lost. The reasoning survives the people.' },
  { title: 'Runbooks per service', body: 'Deploy, roll back, restore from backup, rotate a secret. Written to be followed by someone who was not on the project.' },
  { title: 'Environment parity', body: 'Local, staging and production defined in code. A new engineer is productive on day two, not week two.' },
  { title: 'Data dictionary', body: 'Every table, every field, every enum, with the business meaning — not just the type. Exported whether you are leaving or staying.' },
  { title: 'A working handover, not a document', body: 'Your team runs a deploy and a rollback with ours watching. The handover is complete when you have done it, not when we have explained it.' },
];
