import { useParams, Link, Navigate } from 'react-router-dom';
import { Check, ArrowRight, Star, Plug, Server, Shield } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import NotFound from './NotFound';
import { CtaBand } from '../components/layout/Footer';
import { ProductCard } from '../components/Cards';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup,
  Badge, Accordion, cx,
} from '../components/ui';
import useSeo from '../hooks/useSeo';

import { getCategory, getProduct, productsByCategory } from '../data/products';
import { industries } from '../data/industries';
import { caseStudies } from '../data/content';
import { brand, hosts } from '../data/brand';

const badgeTone = { Flagship: 'primary', Popular: 'accent', New: 'success', AI: 'warning' };

/* A code-drawn console mock — themes cleanly and needs no image assets. */
function ProductPreview({ product, category }) {
  const rows = product.highlights;
  return (
    <div className="ring-gradient relative overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </span>
        <span className="ml-2 truncate rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[10px] text-fg-subtle">
          {hosts.console}/{product.slug.replace(`${brand.productPrefix.toLowerCase()}-`, '')}
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 p-4">
          {category?.icon && (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-gradient text-white">
              <category.icon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-fg">{product.name}</p>
            <p className="truncate text-2xs text-fg-subtle">{category?.short} · v10.4 · all systems healthy</p>
          </div>
          <span className="ml-auto shrink-0 rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-2xs font-semibold text-success">
            Live
          </span>
        </div>

        <ul className="space-y-1.5">
          {rows.map((h, i) => (
            <li key={h} className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2.5">
              <Check className="h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate text-xs font-medium text-fg">{h}</span>
              <span className="shrink-0 font-mono text-2xs text-fg-subtle tnum">
                {['enabled', 'enabled', 'configured'][i] ?? 'enabled'}
              </span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-3 gap-2">
          {[
            ['Uptime', '99.98%'],
            ['Rating', `${product.rating}/5`],
            ['Reviews', product.reviews],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-line bg-surface-2 px-3 py-2.5">
              <p className="text-2xs text-fg-subtle">{label}</p>
              <p className="mt-0.5 font-display text-sm font-bold text-fg tnum">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { categorySlug, productSlug } = useParams();
  const product = getProduct(productSlug);
  const category = product ? getCategory(product.category) : null;

  useSeo(product ? {
    title: product.name,
    description: product.tagline,
  } : undefined);

  if (!product) return <NotFound />;

  // A product reached under the wrong category redirects to its canonical URL
  // rather than rendering a page with a misleading breadcrumb.
  if (categorySlug !== product.category) {
    return <Navigate to={`/products/${product.category}/${product.slug}`} replace />;
  }

  const siblings = productsByCategory(product.category).filter((p) => p.slug !== product.slug);
  const served = industries.filter((i) => product.industries.includes(i.slug));
  const proof = caseStudies.filter((c) => c.stack?.some((s) => s === product.name));

  return (
    <>
      <PageHeader
        eyebrow={`${category.short} · Product`}
        crumbs={[
          { label: 'Products', to: '/products' },
          { label: category.name, to: `/products/${category.slug}` },
          { label: product.name },
        ]}
        title={product.name}
        lead={product.tagline}
      >
        <div className="flex flex-wrap items-center gap-2">
          {product.badge && <Badge tone={badgeTone[product.badge] ?? 'neutral'}>{product.badge}</Badge>}
          <Badge tone="primary">
            {product.from === 0 ? 'Usage based' : `From $${product.from} · ${product.pricing}`}
          </Badge>
          <span className="flex items-center gap-1 text-xs font-semibold text-fg-muted">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden="true" />
            {product.rating}
            <span className="font-normal text-fg-subtle">({product.reviews} reviews)</span>
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/demo" size="lg" icon={ArrowRight}>Start free trial</Button>
          <Button to="/contact" size="lg" variant="secondary">Book a walkthrough</Button>
        </div>
      </PageHeader>

      {/* overview + preview */}
      <Section tight>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 className="font-display text-xl font-bold text-fg">What it is</h2>
              <p className="mt-4 text-base leading-relaxed text-fg-muted text-pretty">{product.overview}</p>

              <ul className="mt-7 space-y-2.5">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                    <span className="text-sm font-medium text-fg">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {served.map((i) => (
                  <Link
                    key={i.slug}
                    to={`/industries/${i.slug}`}
                    className="rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-xs font-semibold text-fg-muted transition-colors hover:border-primary-500/40 hover:text-fg"
                  >
                    {i.name}
                  </Link>
                ))}
              </div>
            </div>

            <Reveal><ProductPreview product={product} category={category} /></Reveal>
          </div>
        </Container>
      </Section>

      {/* modules */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Modules"
            title="What is included"
            lead={`Shared across the ${category.short} range. Modules are licensed independently — you enable what you need.`}
            action={<Button to={`/products/${category.slug}`} variant="secondary" icon={ArrowRight}>Compare the range</Button>}
          />
          <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" step={0.04}>
            {category.modules.map((m) => (
              <div key={m} className="flex items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                <span className="text-sm font-medium text-fg">{m}</span>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* deployment + security + pricing */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Running it"
            title="Deployment, security and what it costs"
            lead="The same codebase and the same upgrade path in every deployment mode. Regulated customers do not get a reduced edition."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-primary-500">
                  <Server className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-bold text-fg">Deployment</h3>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {product.deployment.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-fg-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-accent-500">
                  <Shield className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-bold text-fg">Security, by default</h3>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {['SSO (SAML / OIDC) & MFA', 'Granular role permissions', 'Encryption at rest and in transit', 'Exportable audit log', 'ISO 27001 · SOC 2 Type II'].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="ring-gradient flex h-full flex-col rounded-2xl border border-primary-500/30 bg-surface p-7">
                <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Pricing</p>
                <p className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-fg tnum">
                    {product.from === 0 ? 'Usage' : `$${product.from}`}
                  </span>
                  {product.from > 0 && <span className="text-xs text-fg-subtle">{product.pricing.toLowerCase()}</span>}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                  {product.from === 0
                    ? 'Billed on what you actually consume, with a monthly cap you set. No seat minimum.'
                    : 'Billed annually or monthly. Upgrades, migration tooling and security controls are included in every tier.'}
                </p>
                <Button to="/pricing" variant="secondary" size="md" className="mt-6 w-full" icon={ArrowRight}>
                  Compare plans
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* integrations */}
      <Section tight className="border-y border-line bg-surface/50">
        <Container>
          <div className="rounded-2xl border border-line bg-surface p-7 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient-soft text-primary-600 dark:text-primary-400">
                <Plug className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-lg font-bold text-fg">Integrations</h2>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {category.integrations.map((i) => (
                <li key={i} className="rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-[13px] font-medium text-fg-muted">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-fg-muted">
              REST and GraphQL APIs with webhooks and sandbox keys on every plan — no feature is UI-only.
            </p>
          </div>
        </Container>
      </Section>

      {/* proof */}
      {proof.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Proof"
              title={`${product.name} in production`}
              lead="Named clients running this product, with the numbers they measured."
            />
            <RevealGroup className="mt-10 grid gap-4 lg:grid-cols-2" step={0.07}>
              {proof.map((c) => (
                <Link
                  key={c.slug}
                  to={`/case-studies/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift"
                >
                  <Badge tone="primary" className="w-fit">{c.client}</Badge>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-fg">{c.title}</h3>
                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4">
                    {c.results.slice(0, 2).map((r) => (
                      <div key={r.label}>
                        <p className="font-display text-xl font-extrabold tracking-tight text-gradient tnum">{r.metric}</p>
                        <p className="mt-0.5 text-2xs leading-snug text-fg-subtle">{r.label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-primary-600 dark:text-primary-400">
                    Read the case study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      {/* faq */}
      <Section className={cx(proof.length > 0 && 'border-t border-line bg-surface/50')}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Questions"
                title="Before you trial it"
                lead={`Common questions across the ${category.short} range. Anything specific to ${product.name}, just ask.`}
              />
              <Button to="/contact" variant="secondary" size="md" className="mt-7" icon={ArrowRight}>
                Ask a question
              </Button>
            </div>
            <Reveal><Accordion items={category.faqs} /></Reveal>
          </div>
        </Container>
      </Section>

      {/* siblings */}
      {siblings.length > 0 && (
        <Section tight className="border-t border-line bg-surface/50">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-fg">Others in {category.short}</h2>
                <p className="mt-1 text-sm text-fg-muted">Same category, different size of problem.</p>
              </div>
              <Link
                to={`/products/${category.slug}`}
                className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400"
              >
                Compare the range
              </Link>
            </div>
            <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" step={0.05}>
              {siblings.map((p) => <ProductCard key={p.slug} product={p} showCategory={false} />)}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <CtaBand
        title={`Try ${product.name} on your own data`}
        lead="A 14-day trial with your data imported, or a 30-minute walkthrough with an engineer. Whichever tells you faster whether it fits."
        primary={{ label: 'Start free trial', to: '/demo' }}
        secondary={{ label: 'Talk to sales', to: '/contact' }}
      />
    </>
  );
}
