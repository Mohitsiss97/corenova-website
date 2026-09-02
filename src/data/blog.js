/* Blog posts. `body` is a block list so the article template can render
   headings, prose, lists, quotes and code without parsing markdown at runtime —
   and so the table of contents can be derived from the h2 blocks. */

export const postCategories = [
  'Engineering',
  'Architecture',
  'Delivery',
  'Security',
  'Product',
];

export const posts = [
  {
    slug: 'strangler-pattern-dotnet-migration',
    title: 'How we moved 640k lines of C# to .NET 10 without a freeze',
    category: 'Architecture',
    author: 'Rahul Menon',
    authorRole: 'Co-founder & CTO',
    date: '2026-08-21',
    readingTime: 11,
    featured: true,
    excerpt:
      'A strangler migration is mostly a routing problem, not a rewriting problem. Here is the exact sequence we used on the Northwind estate, including the two things we got wrong.',
    tags: ['.NET', 'Migration', 'YARP'],
    body: [
      { type: 'p', text: 'Northwind came to us after an eleven-month rewrite attempt had been abandoned. Three business-critical applications on .NET Framework 4.6, two of them ASP.NET WebForms, 640,000 lines of C#, and a board that had lost its appetite for the word "modernisation".' },
      { type: 'p', text: 'The constraint that shaped everything: no code freeze. The business shipped features every month and would not stop for a migration. That single requirement rules out the big-bang rewrite, which is fortunate, because the big-bang rewrite is what failed the first time.' },
      { type: 'h2', text: 'Put a proxy in front before you change anything' },
      { type: 'p', text: 'The first four weeks produced no migrated code at all. We put YARP in front of the existing estate and routed 100% of traffic through it, unchanged. Nothing improved. That was the point — we now had a seam we could move one route at a time.' },
      { type: 'quote', text: 'They shipped the first migrated route in week five. After the failed rewrite, seeing something real that early is what got the board back on side.', cite: 'Director of Engineering, Northwind Group' },
      { type: 'h2', text: 'Migrate by route, not by layer' },
      { type: 'p', text: 'The instinct is to migrate horizontally: do the data layer everywhere, then the services, then the UI. It feels tidy and it is a trap — you carry months of half-migrated system with nothing shippable in it.' },
      { type: 'p', text: 'We went vertically instead. One route, all the way through: new ASP.NET Core controller, EF Core against the same database, same HTML contract. Flip that route in the proxy. Watch it for a week. Take the next one.' },
      { type: 'ul', items: [
        'Highest-traffic read-only routes first — the cheapest place to be wrong',
        'Then writes that touch one aggregate',
        'Then the reporting surface, where the query plans needed real work',
        'WebForms postback screens last, rebuilt in Blazor Server rather than translated',
      ] },
      { type: 'h2', text: 'What we got wrong' },
      { type: 'p', text: 'Two things. First, we shared the EF Core DbContext lifetime across a request boundary in the reporting module and spent a fortnight chasing intermittent tracking bugs that only appeared under load. Second, we underestimated how much business logic lived in the WebForms code-behind — roughly 40,000 lines that no one had documented and that the original authors had left years earlier.' },
      { type: 'p', text: 'The fix for the second one was unglamorous: we wrote characterisation tests against the old screens before touching them, capturing real inputs and outputs from production traffic. Those tests found nine behaviours the business had come to rely on that nobody could explain.' },
      { type: 'h2', text: 'The numbers' },
      { type: 'p', text: 'Thirteen months, zero hours of planned downtime, 3.4× faster median API response, and a 38% reduction in Azure compute spend — mostly from finally being able to run on modern container sizing rather than oversized VMs.' },
      { type: 'p', text: 'The migration is not the interesting part. The interesting part is that they shipped fourteen business features during it.' },
    ],
  },
  {
    slug: 'permission-keys-not-roles',
    title: 'Roles are a UI concept. Permission keys are the real model',
    category: 'Engineering',
    author: 'Grace Adeyemi',
    authorRole: 'VP Engineering',
    date: '2026-08-07',
    readingTime: 8,
    featured: false,
    excerpt:
      'Every access-control system we have inherited started with roles and ended in a mess of role-per-customer. The fix is to make roles a bag of keys and gate everything on the keys.',
    tags: ['RBAC', 'Architecture', 'Platform'],
    body: [
      { type: 'p', text: 'Here is the pattern we see in almost every system we take over. It starts with three roles: Admin, Manager, User. Within a year there is a Regional Manager (No Payroll) role, and within two there is one role per large customer, and nobody can safely delete any of them.' },
      { type: 'h2', text: 'The mistake is checking the role' },
      { type: 'p', text: 'The failure begins the first time someone writes a check against the role name rather than against what the role is allowed to do. That single line couples every future permission decision to a label, and labels do not subdivide gracefully.' },
      { type: 'code', lang: 'csharp', text: 'if (user.Role == "Manager") { ShowPayrollTab(); }   // the beginning of the end' },
      { type: 'h2', text: 'Gate on capability instead' },
      { type: 'p', text: 'A permission key names one capability: payroll.view, payroll.approve, employee.terminate. A role is nothing but a named set of keys. Every gate in the system — menu item, route, button, API endpoint — checks a key, never a role.' },
      { type: 'code', lang: 'csharp', text: 'if (user.Can("payroll.view")) { ShowPayrollTab(); }  // survives the next org change' },
      { type: 'p', text: 'Now a new customer requirement is a new role composed of existing keys, which is a data change rather than a deployment. Roles become disposable, which is exactly what you want from something the business keeps redefining.' },
      { type: 'h2', text: 'Three rules that keep it honest' },
      { type: 'ul', items: [
        'The same key gates the UI and the API. A hidden button with an open endpoint is not access control.',
        'Keys are additive only. No negative permissions — "Manager except payroll" is a different role, not a subtraction.',
        'Every key appears in an exportable matrix. If an auditor cannot see who has payroll.approve in one query, the model has failed.',
      ] },
      { type: 'p', text: 'The cost is real: you will have several hundred keys instead of six roles, and naming them well matters. In exchange, the last four systems we built on this model have not needed an access-control refactor. The ones we inherited all did.' },
    ],
  },
  {
    slug: 'offline-first-pos-conflict-resolution',
    title: 'Offline-first is a data modelling problem, not a caching problem',
    category: 'Engineering',
    author: 'Farhan Qureshi',
    authorRole: 'Principal Engineer',
    date: '2026-07-24',
    readingTime: 9,
    featured: false,
    excerpt:
      'Two hundred and ten stores that keep billing when the internet dies. The hard part was never the offline cache — it was deciding what a conflict actually means to a retailer.',
    tags: ['Retail', 'Sync', 'Mobile'],
    body: [
      { type: 'p', text: 'Solaris Retail was losing 40 to 90 minutes of billing a week per tier-3 store to connectivity drops. The brief sounded like a caching problem. It was not.' },
      { type: 'h2', text: 'Conflicts are a business decision' },
      { type: 'p', text: 'When two stores sell the last unit of an item while both are offline, no algorithm can tell you the right answer. Last-write-wins is a decision. So is rejecting both. So is allowing the oversell and flagging it. The engineering question is trivial; the retail question is not.' },
      { type: 'p', text: 'We spent more time in the operations room than in the codebase for the first three weeks, working out which entities could tolerate divergence and which absolutely could not.' },
      { type: 'ul', items: [
        'Sales are append-only facts — they never conflict, they only merge',
        'Stock levels are derived, never authored, so they reconcile rather than conflict',
        'Price changes are last-write-wins by head office timestamp, always',
        'Loyalty point redemption is the one operation that requires connectivity, and the terminal says so plainly',
      ] },
      { type: 'h2', text: 'Make the offline state visible, not invisible' },
      { type: 'p', text: 'The temptation is to hide the network state so the cashier never worries. We did the opposite: a small persistent indicator showing when the terminal last synced, and an explicit banner for the one operation that needs the network.' },
      { type: 'p', text: 'Cashiers trusted the system more, not less. Hiding degradation means every unexplained oddity gets attributed to the software.' },
      { type: 'h2', text: 'Result' },
      { type: 'p', text: 'Zero minutes of billing lost to outages across 210 stores, 2.1 second average checkout, and a rollout that trained 900 cashiers in six weeks. Month-two support tickets came in lower than month one, which is the number we actually watch.' },
    ],
  },
  {
    slug: 'what-a-two-week-demo-actually-costs',
    title: 'What a demo every two weeks actually costs you',
    category: 'Delivery',
    author: 'Grace Adeyemi',
    authorRole: 'VP Engineering',
    date: '2026-07-10',
    readingTime: 6,
    featured: false,
    excerpt:
      'Everyone agrees with fortnightly demos in principle. Fewer people are comfortable with what they expose. Here is the honest accounting.',
    tags: ['Process', 'Agile'],
    body: [
      { type: 'p', text: 'We demo live software to the client every second Friday on every engagement. No slides, no recorded happy paths, no "this bit is mocked for today". It is the single practice most responsible for our delivery record, and it is genuinely uncomfortable.' },
      { type: 'h2', text: 'It makes bad weeks visible immediately' },
      { type: 'p', text: 'A status report can absorb a bad sprint. A demo cannot. If the team spent two weeks on something that does not work, the client watches that fact happen in real time.' },
      { type: 'p', text: 'This is the cost, and it is the whole value. The alternative is not "fewer bad sprints" — it is bad sprints that stay hidden until they compound.' },
      { type: 'h2', text: 'It forces vertical slices' },
      { type: 'p', text: 'You cannot demo a data layer. Committing to a fortnightly demo forces work to be sliced so that something is end-to-end usable every two weeks, which is a better architecture discipline than any diagram review.' },
      { type: 'h2', text: 'It changes who attends' },
      { type: 'p', text: 'Within about three sprints, the people who actually use the software start showing up instead of only their managers. That is when the feedback becomes worth having, and it is also when scope tends to shrink — operators are far more willing to cut a feature than their sponsors are.' },
      { type: 'quote', text: 'The clients who cancel the demo when the sprint went badly are the clients whose projects go badly. It is the most reliable early signal we have.', cite: 'Internal delivery retrospective, 2025' },
    ],
  },
  {
    slug: 'security-questionnaires-that-are-true',
    title: 'Answering security questionnaires with things that are actually true',
    category: 'Security',
    author: 'Vikram Shah',
    authorRole: 'Chief Information Security Officer',
    date: '2026-06-19',
    readingTime: 7,
    featured: false,
    excerpt:
      'Most vendor security questionnaires are answered aspirationally. That works until an auditor asks for evidence. Building the controls as product defaults is cheaper than maintaining the fiction.',
    tags: ['Compliance', 'SOC 2', 'ISO 27001'],
    body: [
      { type: 'p', text: 'A bank sent us a 340-question security questionnaire last year. We answered it in four days, which surprised them, because the honest answer to most of it was already sitting in the product.' },
      { type: 'h2', text: 'The tiering trap' },
      { type: 'p', text: 'The common commercial move is to put SSO, audit logging and granular permissions behind an Enterprise tier. It is good for pricing and terrible for engineering: you now maintain two security postures, and the weaker one is where most of your customers live.' },
      { type: 'p', text: 'We ship the same controls at every price point. It costs us the upsell. It saves us from having to remember which customers have which posture during an incident.' },
      { type: 'h2', text: 'Evidence has to be exportable' },
      { type: 'p', text: 'The difference between a control and a claim is whether you can produce evidence on demand. Every state change in our products records actor, before, after and reason, and that log exports to the customer SIEM.' },
      { type: 'quote', text: 'Our auditors asked for evidence and we exported it in four minutes. That had never happened before.', cite: 'Head of Information Security, Meridian Bank' },
      { type: 'h2', text: 'Say no in the questionnaire' },
      { type: 'p', text: 'We answer "no" to roughly thirty questions in a typical enterprise questionnaire, with a note on what we do instead. Nobody has ever lost us a deal for it. Being caught overclaiming during the audit would have.' },
    ],
  },
  {
    slug: 'when-fixed-scope-is-the-wrong-contract',
    title: 'When fixed scope is the wrong contract — and we tell you so',
    category: 'Delivery',
    author: 'Ananya Deshmukh',
    authorRole: 'Co-founder & Chief Executive',
    date: '2026-06-02',
    readingTime: 6,
    featured: false,
    excerpt:
      'Fixed scope is the easier contract to sign and often the more expensive one to live with. Three signals that tell us to advise against it, even when it costs us the deal.',
    tags: ['Commercials', 'Process'],
    body: [
      { type: 'p', text: 'Procurement likes fixed scope because it looks like risk transfer. Frequently it is risk conversion: you swap the risk of overspending for the risk of building the wrong thing precisely on budget.' },
      { type: 'h2', text: 'Signal one: the requirements are a wish list, not a workflow' },
      { type: 'p', text: 'If the brief is a bulleted feature list with no description of how work moves through the business, a fixed price can only be an estimate wrapped in confidence. We will quote discovery instead, and give you the written scope whether or not you award us the build.' },
      { type: 'h2', text: 'Signal two: more than two stakeholder groups disagree' },
      { type: 'p', text: 'Fixed scope requires a settled definition of done. Where finance, operations and IT still want different systems, the contract will not resolve that — it will just make each change request a negotiation instead of a conversation.' },
      { type: 'h2', text: 'Signal three: it touches a system nobody fully understands' },
      { type: 'p', text: 'Integrations with undocumented legacy systems are the single most common source of fixed-price overrun. We will happily fix-price the parts we can see and run the integration on time and materials, with a cap.' },
      { type: 'p', text: 'The uncomfortable version of this: saying it costs us deals to vendors who agree faster. We have made peace with that, mostly by watching what happens to those projects eighteen months later.' },
    ],
  },
  {
    slug: 'migrating-data-nobody-documented',
    title: 'Migrating data that nobody documented',
    category: 'Engineering',
    author: 'Riya Sethi',
    authorRole: 'Engineering Manager, Platform',
    date: '2026-05-15',
    readingTime: 8,
    featured: false,
    excerpt:
      'Every migration meets the same moment: a column called flag2 that controls something important. A practical method for profiling data whose authors have left.',
    tags: ['Migration', 'Data'],
    body: [
      { type: 'p', text: 'On the Kepler Health engagement we migrated 1.2 million patient records out of three systems, one of which had last been meaningfully documented in 2011. This is the method that got us there without a data-loss incident.' },
      { type: 'h2', text: 'Profile before you map' },
      { type: 'p', text: 'Before writing a single mapping rule, run distribution queries over every column in the source: null rate, distinct count, min and max, top twenty values. A column that is 98% null and has four distinct values in the remainder is telling you something the schema is not.' },
      { type: 'ul', items: [
        'Null rate reveals which fields were optional in practice, whatever the schema says',
        'Distinct counts find enums hiding in varchar columns',
        'Value frequency finds the sentinel values — 1900-01-01, 999999, "N/A"',
        'Cross-tab against a known-good field to find columns that only apply to some record types',
      ] },
      { type: 'h2', text: 'Dry run on production-shaped data, twice' },
      { type: 'p', text: 'Not sample data. A full copy, restored and migrated end to end, with row counts and checksums compared at every stage. The first dry run always fails; the value is in the second one, which tells you whether your fixes generalised.' },
      { type: 'h2', text: 'Reconciliation is the deliverable' },
      { type: 'p', text: 'The migration script is not what the client should be reviewing. The reconciliation report is: counts by entity, financial totals matched to the cent, and an explicit list of records that were deliberately not migrated with the reason for each.' },
      { type: 'p', text: 'That last list is the one that builds trust. A migration claiming to have moved everything is either lying or has not looked hard enough.' },
    ],
  },
  {
    slug: 'why-we-publish-what-we-refuse-to-build',
    title: 'Why we publish the list of things we refuse to build',
    category: 'Product',
    author: 'Lena Fischer',
    authorRole: 'VP Product',
    date: '2026-04-28',
    readingTime: 5,
    featured: false,
    excerpt:
      'A roadmap tells customers what is coming. An anti-roadmap tells them what never will be, which turns out to be the more useful document during evaluation.',
    tags: ['Product', 'Roadmap'],
    body: [
      { type: 'p', text: 'We keep a public list of capabilities we have decided not to build. It is shorter than the roadmap and considerably more useful to anyone evaluating us.' },
      { type: 'h2', text: 'Evaluation is mostly about elimination' },
      { type: 'p', text: 'Buyers are not trying to find the product with the most features; they are trying to eliminate the ones that will fail them in eighteen months. A clear "we will never do this" is worth more to that process than another item marked "planned".' },
      { type: 'h2', text: 'It stops the roadmap becoming a sales instrument' },
      { type: 'p', text: 'Once "it is on the roadmap" is available as an answer in a sales call, the roadmap stops being a plan. Writing the refusals down publicly makes it costly to quietly promise something in a room.' },
      { type: 'quote', text: 'They pushed back on two features we asked for and explained why. Both times they were right. I trust their roadmap advice now.', cite: 'Chief Product Officer, Lumen Edu' },
      { type: 'h2', text: 'What is on it' },
      { type: 'p', text: 'Currently: a built-in general ledger for markets we do not have statutory expertise in, a low-code workflow designer for end users, and native clients for platforms where our web app is genuinely good enough. Each one has a paragraph explaining the reasoning, and each has been argued about internally more than once.' },
    ],
  },
];

export const postCount = posts.length;
export const getPost = (slug) => posts.find((p) => p.slug === slug);
export const featuredPost = posts.find((p) => p.featured) ?? posts[0];

/** Posts sharing a category, excluding the one being read. */
export const relatedPosts = (post, limit = 3) => {
  const sameCategory = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
};

/** Long-form date used in listings and article headers. */
export const formatPostDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
