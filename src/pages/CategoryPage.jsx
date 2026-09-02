import { useParams, Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Plug } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import NotFound from './NotFound';
import { CtaBand } from '../components/layout/Footer';
import { ProductCard, CategoryCard, IndustryCard } from '../components/Cards';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup,
  Badge, Accordion, cx,
} from '../components/ui';
import useSeo from '../hooks/useSeo';

import { categories, getCategory, productsByCategory, deployments } from '../data/products';
import { industries } from '../data/industries';

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategory(categorySlug);

  useSeo(category ? {
    title: `${category.name} software`,
    description: `${category.tagline} ${category.count} production-ready products in the CoreNova ${category.short} range, deployable on cloud, private cloud or your own servers.`,
  } : undefined);

  if (!category) return <NotFound />;

  const items = productsByCategory(category.slug);
  const siblings = categories.filter((c) => c.group === category.group && c.slug !== category.slug);

  // Which industries these products actually serve, derived rather than declared.
  const servedSlugs = [...new Set(items.flatMap((p) => p.industries))];
  const served = industries.filter((i) => servedSlugs.includes(i.slug));

  // Deployment coverage across the range, for the comparison strip.
  const coveredDeployments = deployments.filter((d) => items.some((p) => p.deployment.includes(d)));
  const cheapest = items.filter((p) => p.from > 0).sort((a, b) => a.from - b.from)[0];
  const topRated = [...items].sort((a, b) => b.rating - a.rating)[0];

  return (
    <>
      <PageHeader
        eyebrow={`${category.short} · Product range`}
        crumbs={[{ label: 'Products', to: '/products' }, { label: category.name }]}
        title={category.name}
        lead={category.description}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{category.count} {category.count === 1 ? 'product' : 'products'}</Badge>
          {coveredDeployments.map((d) => <Badge key={d}>{d}</Badge>)}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/demo" size="lg" icon={ArrowRight}>Book a demo</Button>
          <Button to="/contact" size="lg" variant="secondary">Get a recommendation</Button>
        </div>
      </PageHeader>

      {/* at-a-glance */}
      <Section tight>
        <Container>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-surface px-6 py-6">
              <p className="font-display text-3xl font-extrabold tracking-tight text-gradient tnum">{category.count}</p>
              <p className="mt-1.5 text-sm text-fg-muted">products in this range</p>
            </div>
            <div className="bg-surface px-6 py-6">
              <p className="font-display text-3xl font-extrabold tracking-tight text-gradient tnum">
                {cheapest ? `$${cheapest.from}` : 'Usage'}
              </p>
              <p className="mt-1.5 text-sm text-fg-muted">
                {cheapest ? `entry price — ${cheapest.name}` : 'billed on what you use'}
              </p>
            </div>
            <div className="bg-surface px-6 py-6">
              <p className="flex items-baseline gap-1.5 font-display text-3xl font-extrabold tracking-tight text-gradient tnum">
                {topRated.rating}
                <Star className="h-4 w-4 self-center fill-warning text-warning" aria-hidden="true" />
              </p>
              <p className="mt-1.5 text-sm text-fg-muted">highest rated — {topRated.name}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* products */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="The range"
            title={category.count === 1 ? 'One product, built for this job' : `${category.count} products, different sizes of the same problem`}
            lead="Each runs in production today. If none is the right shape, we build on top of the closest one rather than starting from nothing."
            action={<Button to="/products" variant="secondary" icon={ArrowRight}>Full catalog</Button>}
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" step={0.05}>
            {items.map((p) => <ProductCard key={p.slug} product={p} showCategory={false} />)}
          </RevealGroup>
        </Container>
      </Section>

      {/* comparison table */}
      {items.length > 1 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Side by side"
              title="Which one fits"
              lead="The differences that actually change the decision — not a feature grid with ticks in every row."
            />
            <Reveal className="mt-10">
              <div className="overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[46rem] border-collapse text-left">
                  <caption className="sr-only">Comparison of {category.name} products</caption>
                  <thead>
                    <tr className="bg-surface-2">
                      <th scope="col" className="px-5 py-4 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Product</th>
                      <th scope="col" className="px-5 py-4 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Best for</th>
                      <th scope="col" className="px-5 py-4 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Deployment</th>
                      <th scope="col" className="px-5 py-4 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">From</th>
                      <th scope="col" className="px-5 py-4 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {items.map((p) => (
                      <tr key={p.slug} className="bg-surface transition-colors hover:bg-surface-2">
                        <th scope="row" className="px-5 py-4 align-top">
                          <Link
                            to={`/products/${category.slug}/${p.slug}`}
                            className="font-display text-sm font-bold text-fg hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {p.name}
                          </Link>
                          {p.badge && <Badge tone="primary" className="ml-2 align-middle">{p.badge}</Badge>}
                        </th>
                        <td className="px-5 py-4 align-top text-sm text-fg-muted">{p.tagline}</td>
                        <td className="px-5 py-4 align-top">
                          <span className="flex flex-wrap gap-1">
                            {p.deployment.map((d) => (
                              <span key={d} className="rounded border border-line bg-surface-2 px-1.5 py-0.5 text-2xs text-fg-subtle">{d}</span>
                            ))}
                          </span>
                        </td>
                        <td className="px-5 py-4 align-top text-sm text-fg-muted tnum">
                          {p.from === 0 ? 'Usage based' : `$${p.from}`}
                          <span className="block text-2xs text-fg-subtle">{p.pricing}</span>
                        </td>
                        <td className="px-5 py-4 align-top text-sm text-fg-muted tnum">
                          {p.rating}
                          <span className="block text-2xs text-fg-subtle">{p.reviews} reviews</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* modules */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="What this range covers"
            lead="Modules are licensed and enabled independently — start with what you need and add the rest without a re-implementation."
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

      {/* integrations */}
      <Section tight>
        <Container>
          <div className="rounded-2xl border border-line bg-surface p-7 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient-soft text-primary-600 dark:text-primary-400">
                <Plug className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-lg font-bold text-fg">Integrates with what you already run</h2>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {category.integrations.map((i) => (
                <li key={i} className="rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-[13px] font-medium text-fg-muted">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-fg-muted">
              Every product exposes REST and GraphQL APIs with webhooks, so anything not on this list is an integration
              rather than a blocker. <Link to="/contact" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">Ask about yours</Link>.
            </p>
          </div>
        </Container>
      </Section>

      {/* industries served */}
      {served.length > 0 && (
        <Section className="border-y border-line bg-surface/50">
          <Container>
            <SectionHeading
              eyebrow="Who runs it"
              title="Industries using this range"
              lead="Derived from the products above, not a list of everyone we would like to sell to."
            />
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
              {served.map((i) => <IndustryCard key={i.slug} industry={i} />)}
            </RevealGroup>
          </Container>
        </Section>
      )}

      {/* faq */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Questions"
                title={`What buyers ask about ${category.short}`}
                lead="If yours is not here, ask — you get a reply from an engineer who has implemented this."
              />
              <Button to="/contact" variant="secondary" size="md" className="mt-7" icon={ArrowRight}>
                Ask a question
              </Button>
            </div>
            <Reveal><Accordion items={category.faqs} /></Reveal>
          </div>
        </Container>
      </Section>

      {/* sibling categories */}
      {siblings.length > 0 && (
        <Section tight className="border-t border-line bg-surface/50">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-fg">Related categories</h2>
              <Link to="/products" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
                All {categories.length} categories
              </Link>
            </div>
            <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" step={0.05}>
              {siblings.map((c) => <CategoryCard key={c.slug} category={c} compact />)}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <CtaBand
        title={`See ${category.short} running on your data`}
        lead="A 30-minute walkthrough with an engineer, using a sample of your own process rather than a canned demo dataset."
        primary={{ label: 'Book a demo', to: '/demo' }}
        secondary={{ label: 'Talk to sales', to: '/contact' }}
      />
    </>
  );
}
