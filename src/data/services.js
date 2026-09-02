import {
  Code2, Smartphone, Globe, CloudCog, BrainCircuit, Database,
  TestTube2, PenTool, Headset, UsersRound, Hexagon,
} from 'lucide-react';

/* ------------------------------------------------------------------
   Every service line. Fields beyond the card summary — outcomes,
   approach, stack, caseStudies, faqs — drive the detail template at
   /services/:slug, so a new service needs no new component.
   `stack` entries that match a name in technologies.js pick up a brand
   mark automatically; the rest render as plain chips.
------------------------------------------------------------------ */
export const services = [
  {
    slug: 'dotnet-engineering',
    icon: Hexagon,
    name: 'Enterprise .NET Engineering',
    tagline: 'ASP.NET Core, MVC and Blazor — plus the way off .NET Framework.',
    description:
      'Our largest practice. We build ASP.NET Core services and Blazor front-ends, and we move legacy ASP.NET MVC and WebForms estates onto .NET 10 LTS incrementally — with the old system still serving traffic throughout.',
    deliverables: [
      'Portability & dependency assessment',
      'Incremental migration plan (strangler pattern)',
      'ASP.NET Core / Minimal API services',
      'Blazor or React front-end',
      'EF Core data layer & migrations',
      'Azure landing zone + CI/CD',
      'xUnit regression suite',
    ],
    engagements: ['Fixed scope', 'Time & material', 'Dedicated team'],
    typical: '10–26 weeks',
    outcomes: [
      { metric: '3.4×', label: 'faster median API response after migration' },
      { metric: '0 hrs', label: 'planned downtime across a route-by-route cutover' },
      { metric: '−38%', label: 'cloud compute spend on the same workload' },
    ],
    approach: [
      { title: 'Assess the estate', detail: 'We run .NET Upgrade Assistant and our own dependency audit across every project, then hand you a written report: what ports cleanly, what needs replacing, and what should simply be retired.' },
      { title: 'Put a proxy in front', detail: 'A YARP reverse proxy sits ahead of the legacy app. Nothing changes for users, but from that point we can move one route at a time without a big-bang release.' },
      { title: 'Strangle route by route', detail: 'Each route is rebuilt on ASP.NET Core — MVC controllers, Minimal APIs or Blazor components as appropriate — and the proxy switches traffic when its tests pass. The old code is deleted only once the new route has run clean in production.' },
      { title: 'Move the data layer', detail: 'ADO.NET and legacy ORM code moves to EF Core with generated migrations, run against a copy of production at least twice before anything touches live data.' },
      { title: 'Land it on Azure', detail: 'App Service or container apps, GitHub Actions pipelines, health checks and OpenTelemetry traces — so the team can see what the new services are doing from day one.' },
    ],
    stack: [
      'C#', 'ASP.NET Core', 'ASP.NET MVC', 'Web API & Minimal APIs', 'Entity Framework Core',
      'Blazor (Server & WASM)', 'SignalR', '.NET Framework 4.8', 'SQL Server',
      'Azure App Service', 'GitHub Actions', 'xUnit / NUnit', 'Visual Studio & Rider',
    ],
    caseStudies: ['northwind-dotnet-modernisation'],
    faqs: [
      { q: 'Do we have to stop feature work during the migration?', a: 'No — that is the point of the strangler pattern. The legacy app keeps serving traffic and your team keeps shipping to it while we move routes across. Most clients run both for six to twelve months.' },
      { q: 'What if parts of our code cannot be ported?', a: 'Some things genuinely will not move — WCF services, WebForms controls with no Core equivalent, third-party libraries that were abandoned. The assessment names each one up front with a recommended replacement, and you decide what is worth rewriting versus retiring.' },
      { q: 'Can you work on .NET Framework if we are not ready to migrate?', a: 'Yes. We still maintain and extend .NET Framework 4.8 estates. We will tell you honestly when staying put is the right call — usually when an application is scheduled for retirement inside two years.' },
    ],
  },
  {
    slug: 'custom-software',
    icon: Code2,
    name: 'Custom Software Development',
    tagline: 'Systems built to your workflow, not the other way round.',
    description:
      'When no off-the-shelf product fits, we design and build the system end to end — discovery, architecture, delivery and the handover documentation your team will actually use.',
    deliverables: ['Product discovery workshop', 'Architecture & tech blueprint', 'Sprint delivery with demos', 'Automated test suite', 'Runbooks & handover'],
    engagements: ['Fixed scope', 'Time & material', 'Dedicated team'],
    typical: '12–28 weeks',
    outcomes: [
      { metric: 'Week 5', label: 'first working software you can click' },
      { metric: '60%', label: 'of the build starts from proven modules' },
      { metric: '100%', label: 'IP assigned to you from the first commit' },
    ],
    approach: [
      { title: 'Discovery, written down', detail: 'Stakeholder interviews and a current-state audit produce a problem statement everyone signs off on. If we disagree with the brief, this is where we say so.' },
      { title: 'Blueprint before build', detail: 'Architecture, data model, integration map and non-functional targets — reviewed with your engineers, not presented to them.' },
      { title: 'Two-week sprints, real demos', detail: 'Every sprint ends with working software in a shared environment. Progress is visible in the product, not in a status deck.' },
      { title: 'Handover you can act on', detail: 'Runbooks, architecture decision records and a walkthrough with your team. The goal is that you could take it forward without us.' },
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'C#', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    caseStudies: ['atlas-manufacturing-mes'],
    faqs: [
      { q: 'How do you price a build before the scope is clear?', a: 'We do not. A paid discovery of one to two weeks produces the scope, architecture and estimate. That document is yours whether or not you award us the build.' },
      { q: 'Who owns the code?', a: 'You do, from the first commit, in your own repository. The contract assigns all IP with no licence-back clause.' },
      { q: 'What happens if requirements change mid-build?', a: 'On time-and-material we re-prioritise at the sprint boundary. On fixed scope, changes are priced as a written change request before any work starts — no surprise invoices.' },
    ],
  },
  {
    slug: 'mobile-apps',
    icon: Smartphone,
    name: 'Mobile App Development',
    tagline: 'iOS, Android and cross-platform apps that survive real networks.',
    description:
      'Native and React Native / Flutter apps with offline-first data, background sync, push, and store release pipelines we run for you.',
    deliverables: ['UX prototype', 'Native or cross-platform build', 'Offline sync layer', 'Store submission & release', 'Crash & performance monitoring'],
    engagements: ['Fixed scope', 'Dedicated team'],
    typical: '10–20 weeks',
    outcomes: [
      { metric: '0 min', label: 'billing lost to connectivity drops (Solaris)' },
      { metric: '< 2s', label: 'cold start on mid-range Android' },
      { metric: '99.7%', label: 'crash-free session rate at launch' },
    ],
    approach: [
      { title: 'Prototype before code', detail: 'A clickable prototype tested with real users on real devices. Cheaper to change a flow here than in week fourteen.' },
      { title: 'Offline-first data layer', detail: 'Local store, conflict resolution and background sync designed before the first screen — retrofitting offline support is where mobile projects die.' },
      { title: 'Build and instrument', detail: 'Native or cross-platform depending on what the app actually does, with crash and performance monitoring wired in from the first build.' },
      { title: 'Release pipeline we operate', detail: 'Signing, store submission, phased rollout and rollback — we run it until your team wants it.' },
    ],
    stack: ['React Native', 'Flutter', 'Swift / SwiftUI', 'Kotlin / Compose', '.NET MAUI', 'Firebase', 'TypeScript'],
    caseStudies: ['solaris-retail-pos'],
    faqs: [
      { q: 'Native or cross-platform — how do you choose?', a: 'By what the app does. Heavy device integration, background processing or demanding graphics push us to native. Form-driven business apps with shared logic across platforms are usually better served by React Native or Flutter, at roughly 60% of the cost.' },
      { q: 'Do you handle app store submission?', a: 'Yes, including store listings, review responses and phased rollouts. We can publish under your developer account or ours during a pilot.' },
      { q: 'What about existing apps you did not build?', a: 'We take those on regularly. It starts with a codebase audit and a stabilisation sprint before any feature work.' },
    ],
  },
  {
    slug: 'web-platforms',
    icon: Globe,
    name: 'Web Apps & Portals',
    tagline: 'Dashboards, portals and marketplaces that scale past launch day.',
    description:
      'React and Next.js front-ends over well-modelled APIs — role-based access, audit trails, exports and a component library your future teams can extend.',
    deliverables: ['Design system & components', 'Role & permission model', 'API integration layer', 'Accessibility (WCAG AA) pass', 'Performance budget'],
    engagements: ['Fixed scope', 'Time & material'],
    typical: '8–24 weeks',
    outcomes: [
      { metric: 'WCAG AA', label: 'verified before launch, not after' },
      { metric: '< 2s', label: 'largest contentful paint budget, enforced in CI' },
      { metric: '1 system', label: 'tokens and components, so screens stop drifting' },
    ],
    approach: [
      { title: 'Model the permissions first', detail: 'Who can see and do what, down to individual buttons. Bolting a permission model onto a finished portal is a rewrite.' },
      { title: 'Build the design system', detail: 'Tokens, primitives and patterns before pages, so every screen after the tenth costs a fraction of the first.' },
      { title: 'Compose the screens', detail: 'Pages assembled from the system, reviewed against real data volumes rather than three tidy rows of fixtures.' },
      { title: 'Budget and verify', detail: 'Performance and accessibility budgets run in CI, so a regression fails the build rather than reaching production.' },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'ASP.NET Core', 'GraphQL', 'PostgreSQL', 'Storybook'],
    caseStudies: ['meridian-bank-iam'],
    faqs: [
      { q: 'Can you work with our existing backend?', a: 'Usually yes. We start by reading your API contracts; where they are thin we propose an integration layer rather than asking you to rewrite the backend.' },
      { q: 'Do you do accessibility properly or as a checkbox?', a: 'Keyboard navigation, focus management, contrast and screen-reader flow are part of component review, and an audit runs before launch. We report what fails rather than claiming blanket compliance.' },
      { q: 'What if we already have a design system?', a: 'Better. We build to yours, and where it has gaps we extend it in your conventions rather than introducing a second one.' },
    ],
  },
  {
    slug: 'cloud-devops',
    icon: CloudCog,
    name: 'Cloud & DevOps',
    tagline: 'Migrate, containerise, automate — then sleep at night.',
    description:
      'AWS, Azure and GCP landing zones, Kubernetes platforms, infrastructure as code and CI/CD pipelines with cost guardrails and observability wired in.',
    deliverables: ['Cloud landing zone', 'Terraform IaC modules', 'Kubernetes platform', 'CI/CD pipelines', 'Observability & alerting', 'FinOps cost review'],
    engagements: ['Time & material', 'Managed service'],
    typical: '6–16 weeks',
    outcomes: [
      { metric: '−38%', label: 'compute spend after right-sizing and autoscaling' },
      { metric: 'Minutes', label: 'from merge to production, not days' },
      { metric: '100%', label: 'infrastructure defined in version control' },
    ],
    approach: [
      { title: 'Landing zone first', detail: 'Accounts, networking, identity and guardrails before any workload moves. Retrofitting a network design is the expensive kind of rework.' },
      { title: 'Everything as code', detail: 'Terraform modules reviewed like application code. No console clicks that nobody can reproduce six months later.' },
      { title: 'Pipelines with gates', detail: 'Build, test, scan, deploy — with quality gates that actually block, and a rollback path that has been rehearsed.' },
      { title: 'Observe and tune', detail: 'Metrics, traces and logs with alerts that page a human only when a human is needed, plus a monthly cost review.' },
    ],
    stack: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus / Grafana'],
    caseStudies: ['meridian-bank-iam', 'northwind-dotnet-modernisation'],
    faqs: [
      { q: 'Do we have to move to Kubernetes?', a: 'No, and often you should not. For a handful of services, App Service, ECS or Cloud Run is simpler and cheaper to run. We recommend Kubernetes when the workload count and team size justify the operational overhead.' },
      { q: 'Can you work inside our existing cloud account?', a: 'Yes, under your IAM with scoped roles and full audit logging. We do not require ownership of your account.' },
      { q: 'What does the FinOps review cover?', a: 'Right-sizing, reserved and spot coverage, orphaned resources, storage tiering and per-team cost attribution — with a written list of changes ranked by saving versus risk.' },
    ],
  },
  {
    slug: 'ai-ml',
    icon: BrainCircuit,
    name: 'AI & Machine Learning',
    tagline: 'From RAG assistants to forecasting that moves a P&L.',
    description:
      'We ship AI that survives production — retrieval pipelines, evaluation harnesses, guardrails, and a cost model you can defend to finance.',
    deliverables: ['Use-case & ROI assessment', 'RAG / fine-tune pipeline', 'Evaluation harness', 'Guardrails & PII handling', 'Inference cost model'],
    engagements: ['Pilot', 'Time & material', 'Dedicated team'],
    typical: '6–18 weeks',
    outcomes: [
      { metric: 'Week 3', label: 'evaluated pilot, before any platform commitment' },
      { metric: 'Per-query', label: 'inference cost modelled before rollout' },
      { metric: 'Written', label: 'eval suite, so quality changes are measurable' },
    ],
    approach: [
      { title: 'Qualify the use case', detail: 'Some problems do not need a model. We say so early rather than billing for a pilot that was never going to clear its own cost.' },
      { title: 'Build the eval first', detail: 'A labelled evaluation set before the pipeline, so "it feels better" is replaced by a number you can track across changes.' },
      { title: 'Retrieval and guardrails', detail: 'Chunking, embeddings and reranking tuned against the eval, with PII handling and refusal behaviour designed rather than hoped for.' },
      { title: 'Cost and rollout', detail: 'A per-query cost model, caching strategy and a staged rollout with a kill switch.' },
    ],
    stack: ['Claude API', 'Python / FastAPI', 'PyTorch', 'TensorFlow', 'LangChain', 'Vector DBs (pgvector, Pinecone)', 'Hugging Face'],
    caseStudies: [],
    faqs: [
      { q: 'Will our data be used to train someone else’s model?', a: 'Not under the configurations we deploy. We use enterprise API tiers with training disabled, or self-hosted models where the data cannot leave your tenancy at all.' },
      { q: 'How do you stop it making things up?', a: 'Retrieval grounding with citations, refusal behaviour when confidence is low, and an eval suite that measures hallucination rate as a tracked metric rather than an anecdote.' },
      { q: 'What does this cost to run?', a: 'We model it before rollout: tokens per query, cache hit rate, expected volume. You get a monthly figure with the assumptions written down, not a shrug.' },
    ],
  },
  {
    slug: 'data-analytics',
    icon: Database,
    name: 'Data Engineering & Analytics',
    tagline: 'Warehouses, pipelines and a semantic layer people trust.',
    description:
      'Ingestion to insight — ELT pipelines, dimensional models, governed metrics and dashboards that finally agree with each other.',
    deliverables: ['Source audit & lineage', 'ELT pipelines', 'Warehouse / lakehouse model', 'Semantic metric layer', 'Dashboard suite'],
    engagements: ['Fixed scope', 'Time & material'],
    typical: '8–20 weeks',
    outcomes: [
      { metric: '1 definition', label: 'per metric, governed and documented' },
      { metric: '4 days', label: 'off month-end close (Atlas)' },
      { metric: 'Lineage', label: 'you can show an auditor, source to dashboard' },
    ],
    approach: [
      { title: 'Audit the sources', detail: 'What exists, who owns it, how often it is wrong. Most dashboard disagreements turn out to be source problems, not BI problems.' },
      { title: 'Model deliberately', detail: 'Dimensional models built for the questions the business actually asks, not a copy of the transactional schema.' },
      { title: 'Govern the metrics', detail: 'One semantic layer where "revenue" is defined once. Every dashboard reads from it, so two reports cannot disagree.' },
      { title: 'Ship dashboards people open', detail: 'Built with the people who will use them, then measured — a dashboard nobody opens is a failed deliverable.' },
    ],
    stack: ['Apache Kafka', 'Airflow', 'dbt', 'Apache Spark', 'Snowflake', 'PostgreSQL', 'Power BI'],
    caseStudies: ['atlas-manufacturing-mes'],
    faqs: [
      { q: 'Do we need a warehouse, or is our database enough?', a: 'If reporting queries are not hurting your transactional database and you have one source of truth, you may not need one yet. We will tell you that rather than selling a platform.' },
      { q: 'Can you work with Power BI / Tableau / Metabase?', a: 'Yes. The semantic layer is the important part; the visualisation tool is a preference we build to.' },
      { q: 'How do you handle historical data quality?', a: 'We profile it, quantify what is wrong, and agree a cutoff — some history gets cleaned, some gets flagged as unreliable rather than silently loaded.' },
    ],
  },
  {
    slug: 'qa-testing',
    icon: TestTube2,
    name: 'QA & Test Automation',
    tagline: 'Regression suites that let you release on Friday.',
    description:
      'Test strategy, automation frameworks, performance and security testing — plugged into your pipeline with quality gates that actually block bad builds.',
    deliverables: ['Test strategy & coverage map', 'E2E automation suite', 'Load & stress testing', 'Security testing (OWASP)', 'CI quality gates'],
    engagements: ['Time & material', 'Managed service'],
    typical: '4–12 weeks',
    outcomes: [
      { metric: 'Blocking', label: 'quality gates — a red build cannot ship' },
      { metric: 'Minutes', label: 'regression run time, not an overnight job' },
      { metric: 'OWASP', label: 'top-ten coverage in the pipeline' },
    ],
    approach: [
      { title: 'Map the risk', detail: 'Coverage follows business risk, not code coverage percentage. We test the flows where failure costs money first.' },
      { title: 'Build a suite that stays green', detail: 'Deterministic tests with proper waits and seeded data. A flaky suite gets ignored, which is worse than no suite.' },
      { title: 'Load and security', detail: 'Realistic load profiles and OWASP-aligned scanning, run against an environment that resembles production.' },
      { title: 'Gate the pipeline', detail: 'Quality gates wired into CI so failures block the merge, plus a dashboard your leads actually look at.' },
    ],
    stack: ['xUnit / NUnit', 'TypeScript', 'Docker', 'GitHub Actions', 'GitLab CI'],
    caseStudies: [],
    faqs: [
      { q: 'Our test suite is flaky and everyone ignores it. Can you fix that?', a: 'That is the most common brief we get. It usually means fixing waits, test data isolation and shared state — we quarantine the worst offenders first so the suite goes green, then repair them.' },
      { q: 'Do you replace our QA team?', a: 'No. We build the framework and coach your team to own it. Managed QA is available if you want us to run it, but that is a choice, not the default.' },
      { q: 'Is security testing a penetration test?', a: 'No — this is automated OWASP-aligned scanning in the pipeline. A full penetration test is a separate engagement with a specialist partner, and we will say when you need one.' },
    ],
  },
  {
    slug: 'ux-design',
    icon: PenTool,
    name: 'UI/UX & Design Systems',
    tagline: 'Research, flows and a component library that ends the drift.',
    description:
      'User research, information architecture, high-fidelity design and a coded design system with tokens, so every future screen stays on-brand.',
    deliverables: ['User research & personas', 'IA and user flows', 'Hi-fi prototypes', 'Token-based design system', 'Accessibility audit'],
    engagements: ['Fixed scope', 'Retainer'],
    typical: '4–10 weeks',
    outcomes: [
      { metric: 'Coded', label: 'design system, not just a Figma file' },
      { metric: 'Tokens', label: 'one place to re-skin the whole product' },
      { metric: 'AA', label: 'contrast and keyboard flow verified' },
    ],
    approach: [
      { title: 'Talk to actual users', detail: 'Interviews and task observation with the people who use the product daily — usually the fastest way to find the three things everyone hates.' },
      { title: 'Fix the structure', detail: 'Information architecture and flows before visual design. A beautiful screen in the wrong place is still the wrong place.' },
      { title: 'Design the system, not screens', detail: 'Tokens, primitives and states — including empty, loading and error, which is where most design files stop.' },
      { title: 'Hand over code', detail: 'The system ships as working components in your stack, documented, so it survives contact with engineering.' },
    ],
    stack: ['React', 'Tailwind CSS', 'Storybook', 'TypeScript'],
    caseStudies: [],
    faqs: [
      { q: 'Do you deliver Figma or code?', a: 'Both, but the code is the deliverable that matters. A design system that lives only in Figma drifts from the product within two releases.' },
      { q: 'Can you work on an existing product without a redesign?', a: 'Yes — that is often the better path. We audit, fix the highest-friction flows and introduce tokens incrementally rather than proposing a big-bang restyle.' },
      { q: 'What does the accessibility audit cover?', a: 'Contrast, keyboard navigation, focus order, screen-reader labelling and motion preferences, reported per issue with severity — not a pass/fail badge.' },
    ],
  },
  {
    slug: 'support-maintenance',
    icon: Headset,
    name: 'Support & Managed Services',
    tagline: '24×7 cover with an SLA that has teeth.',
    description:
      'L1–L3 application support, monitoring, patching and enhancement sprints — with published response times and a monthly service review.',
    deliverables: ['L1–L3 support desk', '24×7 monitoring', 'Patch & upgrade calendar', 'Enhancement sprints', 'Monthly service review'],
    engagements: ['Retainer', 'Managed service'],
    typical: 'Ongoing',
    outcomes: [
      { metric: '1 hr', label: 'P1 response on the enterprise tier' },
      { metric: '99.98%', label: 'platform uptime, trailing 12 months' },
      { metric: 'Monthly', label: 'service review with the engineers, not an account manager' },
    ],
    approach: [
      { title: 'Take on the system properly', detail: 'A transition period where we read the code, document what is undocumented and rehearse the runbooks before we hold the pager.' },
      { title: 'Monitor what matters', detail: 'Alerts tied to user-visible symptoms rather than every CPU spike, so on-call responds to real problems.' },
      { title: 'Patch on a calendar', detail: 'A published upgrade schedule for dependencies and platforms, so security patching is routine rather than an emergency.' },
      { title: 'Improve, not just maintain', detail: 'Enhancement sprints included in the retainer, prioritised with you each month.' },
    ],
    stack: ['Prometheus / Grafana', 'OpenTelemetry', 'Docker', 'Kubernetes', 'Azure App Service'],
    caseStudies: ['kepler-health-his'],
    faqs: [
      { q: 'Will you support software you did not build?', a: 'Yes, after a transition period to read the code and write the runbooks. We will be honest if the codebase needs stabilisation work before an SLA is realistic.' },
      { q: 'What counts as a P1?', a: 'A defined list agreed in the contract — typically a full outage, data loss risk, or a security incident. Response times are contractual, not aspirational.' },
      { q: 'Are upgrades included?', a: 'Product upgrades and dependency patching are included in every tier. Major version migrations that change functionality are scoped separately.' },
    ],
  },
  {
    slug: 'dedicated-teams',
    icon: UsersRound,
    name: 'Dedicated Teams & Staffing',
    tagline: 'Vetted engineers embedded in your process within 3 weeks.',
    description:
      'Extend your team with engineers, QA and DevOps who work your hours, in your tools, reporting to your leads — with a no-questions swap policy.',
    deliverables: ['Role scoping & profiles', 'Vetted shortlist in 10 days', 'Embedded onboarding', 'Monthly performance review', 'Swap guarantee'],
    engagements: ['Dedicated team', 'Build-operate-transfer'],
    typical: 'From 3 months',
    outcomes: [
      { metric: '10 days', label: 'to a vetted shortlist' },
      { metric: '3 weeks', label: 'to embedded and contributing' },
      { metric: '2 weeks', label: 'to swap anyone, no justification needed' },
    ],
    approach: [
      { title: 'Scope the role honestly', detail: 'What the person needs to do in month one, and what your team is missing. Vague briefs produce mis-hires.' },
      { title: 'Shortlist and you decide', detail: 'You interview. We do not place anyone your leads have not chosen.' },
      { title: 'Embed, do not silo', detail: 'Your standups, your board, your repo, your review process. A separate vendor team with its own process is how integration debt starts.' },
      { title: 'Review monthly', detail: 'A short written review each month with your lead. Problems surface in week four, not month six.' },
    ],
    stack: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'Node.js', 'Python / FastAPI', 'Kubernetes'],
    caseStudies: [],
    faqs: [
      { q: 'What if someone is not working out?', a: 'Tell us and we replace them within two weeks at no cost, with a paid handover overlap. No justification required and no contractual argument.' },
      { q: 'Do they work our hours?', a: 'A minimum four-hour overlap with your working day is standard. For US and EU clients we run shifted rosters so standups land in your morning.' },
      { q: 'What is build-operate-transfer?', a: 'We hire and run the team, then transfer the employment contracts to your entity at an agreed date. Useful when you want an offshore team you eventually own outright.' },
    ],
  },
];

/* The three `primary` models are the ones the Services page compares.
   The rest exist so every service's `engagements` resolves to a real card
   on its detail page. */
export const engagementModels = [
  {
    primary: true,
    name: 'Fixed Scope',
    best: 'Well-defined projects with a signed-off spec',
    bullets: ['Fixed price and timeline', 'Milestone-based payments', 'Change requests priced upfront', 'Best for v1 launches and migrations'],
  },
  {
    primary: true,
    name: 'Time & Material',
    best: 'Evolving scope where priorities shift sprint to sprint',
    bullets: ['Pay for actual effort', 'Re-prioritise every sprint', 'Full backlog transparency', 'Best for platform and R&D work'],
  },
  {
    primary: true,
    name: 'Dedicated Team',
    best: 'Long-running product work needing continuity',
    bullets: ['Named, full-time engineers', 'Your process and tooling', 'Monthly flat cost', 'Swap any member within 2 weeks'],
  },
  {
    name: 'Retainer',
    best: 'Ongoing capacity you draw on month to month',
    bullets: ['Fixed monthly hours', 'Unused hours roll over one month', 'Priority queue over ad-hoc work', 'Best for design and support cover'],
  },
  {
    name: 'Managed Service',
    best: 'Handing over the running of a system entirely',
    bullets: ['Contractual SLA and response times', 'We hold the pager', 'Monthly service review', 'Patching and upgrades included'],
  },
  {
    name: 'Pilot',
    best: 'Proving a use case before committing to a platform',
    bullets: ['Fixed fee, fixed end date', 'Written go / no-go criteria agreed upfront', 'Findings are yours either way', 'Best for AI and R&D work'],
  },
  {
    name: 'Build-Operate-Transfer',
    best: 'An offshore team you eventually want to own',
    bullets: ['We hire and run the team', 'You approve every hire', 'Employment transfers on an agreed date', 'No transfer or placement fee'],
  },
];

export const primaryEngagementModels = engagementModels.filter((m) => m.primary);

export const process = [
  { step: '01', name: 'Discover', duration: '1–2 weeks', detail: 'Stakeholder interviews, current-state audit and a written problem statement everyone signs off on before a line of code exists.' },
  { step: '02', name: 'Design', duration: '2–4 weeks', detail: 'Information architecture, hi-fi prototypes and the technical blueprint — architecture, data model, integrations and non-functional targets.' },
  { step: '03', name: 'Build', duration: '6–20 weeks', detail: 'Two-week sprints with a working demo at the end of each. You see progress in the product, not in a status deck.' },
  { step: '04', name: 'Harden', duration: '2–3 weeks', detail: 'Performance, security and accessibility passes, UAT with your users, and a documented cutover plan with rollback.' },
  { step: '05', name: 'Launch', duration: '1 week', detail: 'Phased rollout, live monitoring, hypercare with the build team on call, and training for admins and end users.' },
  { step: '06', name: 'Evolve', duration: 'Ongoing', detail: 'Support SLA, quarterly roadmap reviews and enhancement sprints — the same team that built it keeps improving it.' },
];

/** Single source of truth for the service count quoted across the site. */
export const serviceCount = services.length;

export const getService = (slug) => services.find((s) => s.slug === slug);
