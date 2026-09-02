import {
  Banknote, HeartPulse, GraduationCap, Plane, Baby, Timer, Laptop, Trophy,
} from 'lucide-react';

/* ------------------------------------------------------------------ culture */
export const culturePillars = [
  {
    title: 'You will ship in your first fortnight',
    body: 'Onboarding is a real ticket on a real product, paired with a buddy. Nobody spends three weeks reading documentation before touching the codebase.',
  },
  {
    title: 'Written decisions, fewer meetings',
    body: 'Architecture decisions live in ADRs and proposals live in documents. Meetings are for disagreement, not for status you could have read.',
  },
  {
    title: 'The person who builds it, runs it',
    body: 'You will be on call for what you shipped — and you get the authority to fix the thing that woke you up, without asking a committee.',
  },
  {
    title: 'Seniority is scope, not tenure',
    body: 'Promotion is a written case against a public rubric, reviewed twice a year. Time served is not on the rubric.',
  },
];

export const benefits = [
  { icon: Banknote, title: 'Pay at the 75th percentile', body: 'Benchmarked annually against the local market, with bands published internally. No negotiation penalty for saying yes quickly.' },
  { icon: HeartPulse, title: 'Health cover for the family', body: 'Medical, dental and vision for you, a partner and children from day one — no waiting period, no probation exclusion.' },
  { icon: Timer, title: 'Four-day fortnight flexibility', body: 'Core hours are 11:00–16:00 local. Outside those, the calendar is yours; delivery is judged on output, not on presence.' },
  { icon: Laptop, title: 'Remote-first, offices optional', body: 'Four offices you may use and none you must. A home-office budget on joining and a refresh every three years.' },
  { icon: GraduationCap, title: 'Learning budget that gets spent', body: 'An annual budget plus conference travel, and one Friday a month blocked company-wide for learning rather than delivery.' },
  { icon: Plane, title: '30 days leave, actually taken', body: 'Thirty days plus public holidays, with a floor: anyone below ten days used by October gets a conversation with their lead.' },
  { icon: Baby, title: 'Parental leave without a career cost', body: 'Twenty-six weeks primary and twelve weeks secondary, fully paid, plus a phased four-week return at full pay.' },
  { icon: Trophy, title: 'Profit share for everyone', body: 'A single company-wide pool paid annually, on the same percentage basis from graduate to executive.' },
];

/* ------------------------------------------------------------------ hiring */
export const hiringStages = [
  { step: '01', name: 'Application review', duration: '3 working days', detail: 'Read by an engineer on the hiring team, not filtered by keyword matching. Everyone gets an answer either way.' },
  { step: '02', name: 'Intro call', duration: '30 min', detail: 'A conversation about what you want next and what the role actually involves. Salary band is stated on this call, by us, first.' },
  { step: '03', name: 'Technical conversation', duration: '75 min', detail: 'Your code or ours, discussed like colleagues. No whiteboard algorithms, no puzzles, nothing you would never do in the job.' },
  { step: '04', name: 'Practical exercise', duration: '3 hrs, paid', detail: 'A scoped, realistic problem done in your own time and paid at contractor rate. Or bring existing work and skip it entirely.' },
  { step: '05', name: 'Team and values', duration: '45 min', detail: 'Meet the people you would work with daily, plus one person from an unrelated team who can veto for values, not for taste.' },
  { step: '06', name: 'Offer', duration: '2 working days', detail: 'Written offer with the band, the level rubric and the promotion criteria attached. One week to decide, extendable on request.' },
];

export const hiringPromise = [
  'Salary band stated by us on the first call, before you are asked what you earn.',
  'Maximum three weeks from application to offer, or we tell you why not.',
  'Take-home exercises are paid at contractor rate and capped at three hours.',
  'Written feedback after any onsite stage, whatever the outcome.',
];

/* ------------------------------------------------------------------ stories */
export const employeeStories = [
  {
    name: 'Farhan Qureshi', role: 'Principal Engineer, .NET practice', tenure: '7 years',
    quote: 'I joined to maintain one product and now I own the module library every custom build starts from. Nobody handed me that — I wrote the proposal and it got argued with properly, then approved.',
  },
  {
    name: 'Riya Sethi', role: 'Engineering Manager, Platform', tenure: '5 years',
    quote: 'I moved from IC to management and back to IC for a year when management was making me worse at the job. It cost me nothing. That is rarer than it should be.',
  },
  {
    name: 'Marcus Bell', role: 'Staff SRE, Austin', tenure: '3 years',
    quote: 'The on-call rota is genuinely quiet because the people who get paged are the people who can change the design. That feedback loop fixes more than any process.',
  },
];

/* ------------------------------------------------------------------ jobs */
/* Filters on the careers page are derived from these records, so adding a job
   automatically adds its team and location to the filter set. */
export const jobs = [
  {
    id: 'senior-dotnet-engineer',
    title: 'Senior .NET Engineer',
    team: 'Engineering',
    location: 'Noida',
    remote: 'Hybrid or remote',
    type: 'Full-time',
    level: 'Senior (L4)',
    band: '₹38–52 LPA',
    posted: '2026-08-18',
    reportsTo: 'Principal Engineer, .NET practice',
    teamSize: '9 engineers, 1 architect',
    summary:
      'Lead migrations off .NET Framework and build new services on .NET 10 for enterprises that cannot afford a freeze. Our largest practice and the one clients ask for by name.',
    responsibilities: [
      'Design and deliver strangler-pattern migrations from ASP.NET MVC and WebForms to ASP.NET Core',
      'Build Minimal API and MVC services with EF Core against SQL Server and PostgreSQL',
      'Set the performance budgets for your services and defend them in review',
      'Pair with client engineers so the system survives our exit',
      'Review the shared module library and contribute back what generalises',
    ],
    requirements: [
      '6+ years professional C# with at least 2 on .NET 6 or newer',
      'Shipped a migration off .NET Framework in production, not a proof of concept',
      'Strong with EF Core, async patterns and the profiler when things are slow',
      'Comfortable owning cloud infrastructure for your own services (Azure or AWS)',
      'Can write a design document that a client architect will argue with productively',
    ],
    niceToHave: ['Blazor Server or WebAssembly in production', 'YARP or another reverse-proxy migration pattern', 'SQL Server query plan tuning', 'Public speaking or written technical work'],
  },
  {
    id: 'engineering-manager-platform',
    title: 'Engineering Manager, Platform',
    team: 'Engineering',
    location: 'Bengaluru',
    remote: 'Hybrid',
    type: 'Full-time',
    level: 'Manager (M2)',
    band: '₹55–70 LPA',
    posted: '2026-08-25',
    reportsTo: 'VP Engineering',
    teamSize: '11 across two squads',
    summary:
      'Run the two squads behind identity, audit, billing and permissions — the modules every product and every custom build depends on. High blast radius, high leverage.',
    responsibilities: [
      'Own delivery for two squads working on shared platform services',
      'Hold the quality gates: coverage floor, performance budgets, security findings',
      'Grow engineers against a public rubric and write the promotion cases',
      'Negotiate platform roadmap against product teams who all want their thing first',
      'Keep 20% of your time on code review so you stay credible',
    ],
    requirements: [
      '3+ years managing engineers, with a track record of people you promoted',
      'Was a strong senior engineer before management and can still read a design critically',
      'Have run a shared platform or internal service used by other teams',
      'Comfortable saying no to a product director with a reason they respect',
    ],
    niceToHave: ['Multi-tenant SaaS at scale', 'Experience with on-premise distribution constraints', 'Hiring at volume without lowering the bar'],
  },
  {
    id: 'staff-sre',
    title: 'Staff Site Reliability Engineer',
    team: 'Infrastructure',
    location: 'Austin',
    remote: 'Remote (US)',
    type: 'Full-time',
    level: 'Staff (L5)',
    band: '$185k–225k',
    posted: '2026-08-11',
    reportsTo: 'Director of Infrastructure',
    teamSize: '6 SREs across two timezones',
    summary:
      'Own the reliability of a fleet that runs in our cloud, our customers clouds and their server rooms. The on-premise constraint is the interesting part of this job.',
    responsibilities: [
      'Set and defend SLOs across the product fleet, including customer-operated deployments',
      'Build the deployment tooling that makes an on-premise upgrade as boring as a SaaS one',
      'Run incident command and write post-mortems that name causes, not people',
      'Drive the error-budget conversation with product teams when it runs out',
    ],
    requirements: [
      '8+ years in SRE, platform or infrastructure roles',
      'Deep Kubernetes and Terraform, including clusters you did not build',
      'Have carried a pager for a system with paying customers',
      'Can debug a system you have never seen with someone else watching',
    ],
    niceToHave: ['Air-gapped or regulated deployment experience', 'Grafana and Prometheus at scale', 'Go or C# for tooling'],
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    remote: 'Remote (IST ±3)',
    type: 'Full-time',
    level: 'Mid–Senior',
    band: '₹28–42 LPA',
    posted: '2026-08-28',
    reportsTo: 'Head of Design',
    teamSize: '5 designers embedded in squads',
    summary:
      'Design dense, high-frequency enterprise interfaces that people use for eight hours a day. Fewer landing pages, more data tables that have to stay legible at 200 rows.',
    responsibilities: [
      'Own end-to-end design for one or two products, from research to shipped UI',
      'Work directly with the engineers building it, in their sprint, not ahead of it',
      'Extend the shared design system rather than inventing per-product patterns',
      'Run usability sessions with real operators — warehouse staff, nurses, cashiers',
    ],
    requirements: [
      '4+ years designing complex software, ideally B2B or internal tools',
      'A portfolio with at least one dense, data-heavy interface you can talk through',
      'Fluent with design systems, tokens and component APIs',
      'Comfortable designing for accessibility as a requirement, not a review comment',
    ],
    niceToHave: ['Front-end code literacy (React, Tailwind)', 'Experience designing for on-premise or offline-first products'],
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    team: 'Security',
    location: 'Noida',
    remote: 'Hybrid',
    type: 'Full-time',
    level: 'Senior',
    band: '₹34–48 LPA',
    posted: '2026-07-30',
    reportsTo: 'Chief Information Security Officer',
    teamSize: '4, reporting into the CISO',
    summary:
      'Keep the controls that ship in every product honest — and answer the security questionnaires from banks and hospitals with things that are actually true.',
    responsibilities: [
      'Threat-model new services before they ship, with the team that is building them',
      'Own the security gates in CI and keep false positives low enough that people trust them',
      'Run the ISO 27001 and SOC 2 evidence cycles without turning them into theatre',
      'Support customer security reviews and penetration test remediation',
    ],
    requirements: [
      '5+ years in application or product security',
      'Can read C# and JavaScript well enough to review a pull request',
      'Have run or been audited under ISO 27001 or SOC 2',
      'Can explain a risk to a non-technical executive without either minimising or catastrophising it',
    ],
    niceToHave: ['OSCP, CISSP or equivalent', 'Experience with HIPAA or PCI DSS scope', 'Detection engineering'],
  },
  {
    id: 'qa-automation-engineer',
    title: 'QA Automation Engineer',
    team: 'Quality',
    location: 'Bengaluru',
    remote: 'Hybrid or remote',
    type: 'Full-time',
    level: 'Mid',
    band: '₹18–28 LPA',
    posted: '2026-08-20',
    reportsTo: 'QA Practice Lead',
    teamSize: '8 across product and delivery teams',
    summary:
      'Build the test suites that let us deploy every fortnight without a manual regression weekend. Embedded in a squad, not a separate gate at the end.',
    responsibilities: [
      'Own the automated suite for one product line, end to end',
      'Write the tests that protect the coverage floor, and delete the ones that only create noise',
      'Build test data tooling so suites run against realistic, non-production data',
      'Sit in refinement and argue about testability before the code exists',
    ],
    requirements: [
      '3+ years in test automation with a real programming language, not just a record-and-replay tool',
      'Playwright, Cypress or Selenium in a CI pipeline you maintained',
      'API testing and contract testing experience',
      'Can tell the difference between a flaky test and a genuine race condition',
    ],
    niceToHave: ['Performance testing (k6, JMeter)', 'C# or TypeScript', 'Accessibility testing with axe'],
  },
  {
    id: 'solutions-architect-mena',
    title: 'Solutions Architect, Middle East',
    team: 'Delivery',
    location: 'Dubai',
    remote: 'Hybrid',
    type: 'Full-time',
    level: 'Senior',
    band: 'AED 420k–540k',
    posted: '2026-08-05',
    reportsTo: 'Regional Delivery Director',
    teamSize: '2 architects, 14 delivery engineers',
    summary:
      'Sit between the client and the build team for regional enterprise deals — including the data-residency constraints that make this region its own discipline.',
    responsibilities: [
      'Run discovery workshops and write the problem statements clients sign',
      'Design deployment topologies that satisfy local data-residency law',
      'Own the technical narrative through procurement and security review',
      'Stay attached through delivery so the design survives contact with reality',
    ],
    requirements: [
      '8+ years building enterprise systems, at least 2 in a client-facing architecture role',
      'Fluent in cloud, private cloud and on-premise trade-offs — genuinely, not from a slide',
      'Have owned a data-residency or sovereignty requirement end to end',
      'Excellent written English; Arabic a strong advantage',
    ],
    niceToHave: ['Public-sector or banking procurement experience', 'Azure or AWS architecture certification'],
  },
  {
    id: 'technical-writer',
    title: 'Technical Writer',
    team: 'Product',
    location: 'Remote',
    remote: 'Remote (IST ±4)',
    type: 'Full-time',
    level: 'Mid',
    band: '₹16–26 LPA',
    posted: '2026-08-29',
    reportsTo: 'VP Product',
    teamSize: '2 writers, growing to 4',
    summary:
      'Own the documentation that ships with the products — API references, admin guides and the runbooks we hand to customers at go-live.',
    responsibilities: [
      'Write and maintain API reference and integration guides against real endpoints',
      'Turn engineer-written runbooks into something an on-call stranger can follow at 3am',
      'Keep documentation versioned in the repository alongside the code',
      'Audit docs against the product every release and file the gaps as bugs',
    ],
    requirements: [
      '3+ years documenting technical products for a developer or admin audience',
      'Can read code and call an API without needing an engineer to demo it',
      'Docs-as-code experience: Markdown, Git, review workflows',
      'A writing sample where you clearly made something complicated simple',
    ],
    niceToHave: ['OpenAPI tooling', 'Experience documenting on-premise installation'],
  },
  {
    id: 'enterprise-account-executive',
    title: 'Enterprise Account Executive',
    team: 'Sales',
    location: 'Austin',
    remote: 'Remote (US)',
    type: 'Full-time',
    level: 'Senior',
    band: '$140k base / $260k OTE',
    posted: '2026-08-14',
    reportsTo: 'VP Revenue, Americas',
    teamSize: '6 AEs, 3 solution engineers',
    summary:
      'Sell to mid-market and enterprise buyers who have been burned before. Our sales cycle involves showing running software early, so technical credibility matters more than a script.',
    responsibilities: [
      'Own the full cycle for accounts from $80k to $2M in first-year value',
      'Bring a solution engineer in early rather than defending a demo you cannot give',
      'Push back on deals that will fail in delivery, and be measured on retention, not just bookings',
      'Feed the product team the objections you keep losing to',
    ],
    requirements: [
      '5+ years closing enterprise software in a technical category',
      'Comfortable in a room with a CTO who wants to talk architecture',
      'Track record against quota you can walk through honestly, including the bad year',
    ],
    niceToHave: ['ERP, HRMS or vertical SaaS background', 'Experience selling on-premise or hybrid deployments'],
  },
  {
    id: 'customer-success-manager',
    title: 'Customer Success Manager',
    team: 'Customer Success',
    location: 'Noida',
    remote: 'Hybrid',
    type: 'Full-time',
    level: 'Mid–Senior',
    band: '₹20–32 LPA',
    posted: '2026-08-22',
    reportsTo: 'VP Customer Success',
    teamSize: '9 CSMs across three regions',
    summary:
      'Own a portfolio of accounts from go-live onward, with the mandate and the escalation path to actually fix what is annoying them.',
    responsibilities: [
      'Run onboarding and hypercare alongside the engineers who built the system',
      'Hold quarterly business reviews against the outcomes the client bought, not usage vanity metrics',
      'Escalate product problems with enough detail that engineering can act without a discovery call',
      'Own renewal and expansion for your portfolio',
    ],
    requirements: [
      '4+ years in customer success or account management for B2B software',
      'Technical enough to reproduce a customer issue before escalating it',
      'Have handled a genuinely angry enterprise customer and kept the account',
    ],
    niceToHave: ['ERP or HRMS domain knowledge', 'A second language used professionally'],
  },
];

export const jobCount = jobs.length;
export const getJob = (id) => jobs.find((j) => j.id === id);

/** Filter facets, derived so a new job cannot fall out of the filters. */
export const jobTeams = [...new Set(jobs.map((j) => j.team))].sort();
export const jobLocations = [...new Set(jobs.map((j) => j.location))].sort();
