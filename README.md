# CoreNova — software company website

Multi-page marketing site for a software product + services company.
React (Vite) · Tailwind CSS v3 · React Router v6 · Framer Motion · Lucide icons.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Deployment

`npm run build` runs Vite and then `scripts/static-routes.mjs`, which writes a
real `index.html` at every route (`dist/pricing/index.html`, and so on) plus
`404.html`.

GitHub Pages serves static files with no SPA rewrite, so without those files a
deep link like `/pricing` would return HTTP **404** — the page rendered, because
`404.html` is the app shell, but the status code was wrong and that breaks
crawlers, link checkers and uptime monitors. With them every real route answers
**200**, and only genuinely unknown URLs 404.

The generator cross-checks itself against the `<Route>` declarations in
`App.jsx` and **fails the build** if a route is declared but not covered, so a
new page cannot silently ship as a 404.

## Brand — change identity in one place

`src/data/brand.js` is the single source of truth for company identity: name,
wordmark, legal name, tagline, domain, email addresses, host names, phone
numbers, offices, the product suite prefix and the logo glyph. Nothing else in
`src/` hardcodes any of it — `site.js` is a thin view over `brand.js`, and every
page interpolates from there.

Renaming the company, moving the head office or changing the product suite name
is a single edit to that file. Two files must be updated alongside it because
they cannot import JS:

- `public/favicon.svg` — carries the same path data as `brand.logo.glyph`
- `vite.config.js` — substitutes the brand values into `index.html` at build
  time through the small `brandHtml` plugin (index.html uses `%BRAND_NAME%`
  style placeholders)

`brand.slug` also drives the theme's localStorage key and the cookie names
documented on the cookie policy page, so those stay consistent automatically.

## Theming

`src/index.css` is the **single source of truth** for colour. Light values live on
`:root`, dark values on `.dark`, both as space-separated RGB channels so Tailwind
can apply opacity (`bg-primary-500/10`). Re-skin the entire site by editing those
two blocks — no component changes needed.

Theme state lives in `src/theme/ThemeProvider.jsx`: it follows the OS preference
until the user picks explicitly, then persists the choice to `localStorage`.

## Structure

```
src/
  index.css                THEME TOKENS — edit here to re-skin
  App.jsx                  Router; `queued` array lists pages not yet built
  theme/ThemeProvider.jsx  light / dark, OS-aware, persisted
  data/                    all content lives here, no copy hardcoded in components
    site.js                brand, offices, stats, footer nav, certifications
    products.js            18 categories + 45 products (counts derive from data).
                           Categories carry modules, integrations and faqs;
                           products carry an overview, highlights, deployment,
                           pricing and industries — the fields the category and
                           product templates render
    services.js            11 service lines (.NET leads). Each carries outcomes,
                           approach, stack, caseStudies and faqs — the fields the
                           /services/:slug template renders. 7 engagement models,
                           3 flagged `primary` for the Services page comparison
    industries.js          9 verticals: pains, measured outcomes, the product
                           stack, the operational workflow the software has to
                           survive, and the per-vertical regulatory load.
                           `complianceCoverage` holds the controls that apply
                           everywhere, so vertical pages stay specific
    technologies.js        10 stack groups, 89 technologies with depth levels.
                           `.NET & Microsoft Stack` is flagged `featured` and is
                           exported separately as `featuredGroup` so pages can
                           lead with it; the rest come through `otherGroups`.
                           Also holds the brand-mark map for /public/logos
    content.js             buyer paths, case studies, testimonials, plans, FAQs
    company.js             About: story, mission, values, timeline, leadership
    method.js              Process: the six stages expanded, ceremonies,
                           quality gates, tooling, handover standards
    careers.js             10 jobs plus culture, benefits, hiring stages and
                           stories. Job-board facets derive from the records,
                           so a new job cannot fall out of the filters
    blog.js                8 posts. `body` is a block list (p/h2/ul/quote/
                           code/note) so the article template renders without
                           parsing markdown, and the contents list is derived
                           from the h2 blocks
    resources.js           12 resources; `gated` keeps the gating policy in
                           one place instead of spread across the page
    docs.js                docs sections, quickstarts, endpoint and webhook
                           tables. `docsIndex` is flattened from the sections,
                           so search and sidebar cannot drift apart
    support.js             8 categories, 21 articles, SLA tiers, escalation
    integrations.js        26 connectors in 10 categories; the category holds
                           the icon so card, chip and detail page agree
  hooks/useSeo.js          per-route <title>, meta description and OG tags
  components/
    ui/index.jsx           primitives: Button, Badge, Reveal, Counter, Marquee,
                           Accordion, Section, SectionHeading, Container
    Cards.jsx              Product / Category / Service / Industry / CaseStudy cards
    TechLogo.jsx           theme-aware brand mark, with an aligned placeholder
                           for technologies that have none
    PageHeader.jsx         breadcrumb + title block for inner pages
    layout/                Navbar (mega menu), Footer + CtaBand, CommandPalette, Layout
    sections/Hero.jsx      home hero with the code-drawn app preview
  pages/                   one file per route
    CategoryPage.jsx       template for all 18 /products/:category pages
    ProductDetail.jsx      template for all 45 /products/:category/:slug pages
    ServiceDetail.jsx      template for all 11 /services/:slug pages
    CaseStudyDetail.jsx    template for all 5 /case-studies/:slug pages
    JobDetail.jsx          template for all 10 /careers/:jobId pages
    ArticleDetail.jsx      template for all 8 /blog/:slug pages; renders the
                           block list and derives the on-this-page contents
    IntegrationDetail.jsx  template for all 26 /integrations/:slug pages
    IndustryDetail.jsx     template for all 9 /industries/:slug pages
    Docs.jsx               single-page docs shell: sticky sidebar, search over
                           `docsIndex`, endpoint and webhook tables
    Support.jsx            help centre: search, category browse, SLA, escalation
```

## Brand marks

`public/logos/` holds 39 SVGs from the open [svgl.app](https://svgl.app) library,
served locally rather than hot-linked. `techLogos` in `src/data/technologies.js`
maps a technology name to its file, with separate `light` / `dark` entries where
the mark needs one, and `invert` for single-variant monochrome marks.

These appear only where the claim is true — the technology stack we work with.
They are deliberately **not** used as client logos: CoreNova is a placeholder
brand, and real company marks presented as customers would be a fabricated
endorsement.

## .NET as the lead practice

`.NET & Microsoft Stack` is the first tech group and carries `featured: true`.
That single flag drives its prominence in three places:

- **Technologies** — a spotlight block above the search, plus an accent-framed
  card and a "Lead practice" badge in the group list
- **Home** — a full-width band above the nine other stack groups
- **Services** — `Enterprise .NET Engineering` is the first of the 11 lines, and
  `Northwind Group` is the .NET migration case study (second, so it surfaces on
  the home page)

Version claims (.NET 10 LTS, supported to November 2028) are stated once, in the
Technologies spotlight. Update them there.

## SEO

`src/hooks/useSeo.js` sets `document.title`, the meta description and the Open
Graph pair per route, restoring the site defaults on unmount. Every page calls it;
a route that does not gets the defaults rather than the previous page's title.
All 130 built routes currently resolve to a unique title.

## Detail templates

`ServiceDetail.jsx` and `CaseStudyDetail.jsx` are data-driven templates — adding a
service or case study to `src/data/` creates a working page with no new component.
An unknown slug renders `NotFound`, so a bad URL behaves like any other 404. A
product reached under the wrong category (`/products/crm/nova-erp`) redirects to
its canonical URL rather than rendering a misleading breadcrumb.

Several sections are derived rather than authored: the industries on a category
page come from the products in it, a product's proof section matches case studies
whose `stack` names that product, and the comparison table is built from the
range itself.

Cross-links are resolved from the data: a case study's `services` array links to
service pages, and `caseStudiesForService()` pulls the matching proof onto each
service page. Engagement names are matched case-insensitively — `services` uses
sentence case (`'Fixed scope'`) while `engagementModels` uses title case.

## Legal pages are template copy

`src/data/legal.js` holds the privacy, terms, security and cookie documents,
rendered through `pages/LegalPage.jsx`. **The wording has not been reviewed by a
lawyer.** It exists so the site is complete and internally consistent. Before this
represents a real company, replace it with text your counsel has approved —
especially the sub-processor list, retention periods and governing-law clause.
There is a note to the same effect at the top of that file.

## Conventions

- Content never lives in components — add it to `src/data/*` and the UI follows.
  Category product counts are computed from `products`, so they cannot drift.
- Colour only via theme tokens (`bg-surface`, `text-fg-muted`, `border-line`,
  `bg-primary-500`). No raw hex in components.
- Every animation is wrapped so `prefers-reduced-motion` disables it
  (`Reveal`, `Counter`, and a global CSS override in `index.css`).
- Interactive elements: visible focus ring, `cursor-pointer`, ≥44px touch targets,
  `aria-*` on icon-only buttons.

## Built so far

130 routes across 22 page components:

- Home, Products (faceted catalog), Services, Technologies, Contact, 404
- 18 category pages and 45 product pages (`CategoryPage`, `ProductDetail`)
- 11 service pages (`ServiceDetail`) and 5 case studies (`CaseStudyDetail`)
- **Phase 3 — industries:** Industries and 9 vertical pages (`IndustryDetail`)
- **Phase 5 — company:** About, How we work, Careers (filterable board) and
  10 job pages (`JobDetail`)
- **Phase 6 — content & docs:** Blog and 8 articles (`ArticleDetail`),
  Resources, Documentation, Help centre, Integrations and 26 connector
  pages (`IntegrationDetail`)
- Shared shell: mega-menu nav, ⌘K search, footer, theme toggle

Every route in `src/App.jsx` now resolves to a real page — the placeholder
scaffolding has been removed. An unknown URL renders `NotFound`.
