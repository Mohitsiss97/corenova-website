import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ArrowUpRight, Webhook, X, Check } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx,
} from '../components/ui';

import {
  integrations, integrationCount, integrationCategories,
  integrationsInCategory, getIntegrationCategory,
} from '../data/integrations';
import useSeo from '../hooks/useSeo';

const ALL = 'All';

function IntegrationCard({ integration }) {
  const category = getIntegrationCategory(integration.category);
  return (
    <Link
      to={`/integrations/${integration.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-primary-500 transition-colors group-hover:border-primary-500/40 group-hover:bg-primary-500/10">
          {category?.icon ? <category.icon className="h-5 w-5" aria-hidden="true" /> : null}
        </span>
        <Badge>{integration.direction}</Badge>
      </div>

      <h3 className="mt-5 font-display text-[17px] font-bold text-fg">{integration.name}</h3>
      <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{category?.name}</p>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted">{integration.tagline}</p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-2xs text-fg-subtle">Setup {integration.setup}</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400">
          Details
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>

      <ArrowUpRight
        className="absolute right-4 top-4 h-4 w-4 -translate-y-1 text-fg-subtle opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
}

export default function Integrations() {
  useSeo({
    title: 'Integrations',
    description: `${integrationCount} pre-built connectors across payments, identity, accounting, commerce, logistics and analytics — plus open REST and GraphQL APIs for everything else.`,
  });

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return integrations.filter((i) => {
      if (category !== ALL && i.category !== category) return false;
      if (!q) return true;
      return `${i.name} ${i.tagline} ${i.description}`.toLowerCase().includes(q);
    });
  }, [query, category]);

  const isFiltered = query !== '' || category !== ALL;

  return (
    <>
      <PageHeader
        eyebrow="Integrations"
        crumbs={[{ label: 'Integrations' }]}
        title={`${integrationCount} connectors, and an API for everything else`}
        lead="Pre-built connectors for the systems most of our customers already run. Where one does not exist, every product exposes REST and GraphQL with webhooks — there are no UI-only features to work around."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{integrationCount} connectors</Badge>
          <Badge tone="accent">{integrationCategories.length} categories</Badge>
          <Badge icon={Webhook}>Webhooks on every product</Badge>
        </div>
      </PageHeader>

      {/* categories */}
      <Section tight>
        <Container>
          <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" step={0.03}>
            {integrationCategories.map((c) => {
              const count = integrationsInCategory(c.slug).length;
              const active = category === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCategory(active ? ALL : c.slug)}
                  aria-pressed={active}
                  className={cx(
                    'flex h-full cursor-pointer flex-col rounded-2xl border p-5 text-left transition-all duration-300 ease-spring hover:-translate-y-1 hover:shadow-lift',
                    active
                      ? 'border-primary-500/40 bg-surface shadow-soft'
                      : 'border-line bg-surface hover:border-primary-500/40',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={cx(
                      'grid h-10 w-10 place-items-center rounded-xl border transition-colors',
                      active
                        ? 'border-primary-500/40 bg-primary-500/10 text-primary-500'
                        : 'border-line bg-surface-2 text-primary-500',
                    )}>
                      <c.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-line bg-surface-2 px-2 py-0.5 text-2xs font-semibold text-fg-subtle tnum">
                      {count}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[14px] font-bold leading-snug text-fg">{c.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">{c.blurb}</p>
                </button>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* directory */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Directory"
            title="Search the connectors"
            lead="Each one lists what it actually does, which products it touches and how long setup takes — because 'integrates with' on its own means nothing."
          />

          <Reveal className="mt-10">
            <label htmlFor="integration-search" className="sr-only">Search integrations</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
              <input
                id="integration-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or capability…"
                className="h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-primary-500"
              />
            </div>
          </Reveal>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-fg-muted" role="status">
              Showing <span className="font-semibold text-fg tnum">{filtered.length}</span> of {integrationCount}
              {category !== ALL && ` in ${getIntegrationCategory(category)?.name}`}
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={() => { setQuery(''); setCategory(ALL); }}
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
              <p className="font-display text-lg font-bold text-fg">No connector for that yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
                The API covers every entity in every product, so a custom connector is usually days rather
                than a project. Tell us what you need to connect.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
                <Button to="/docs" size="md" variant="secondary">Read the API docs</Button>
                <Button to="/contact" size="md">Request a connector</Button>
              </div>
            </div>
          ) : (
            <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.03}>
              {filtered.map((i) => <IntegrationCard key={i.slug} integration={i} />)}
            </RevealGroup>
          )}
        </Container>
      </Section>

      {/* build your own */}
      <Section className="border-t border-line bg-surface/50">
        <Container>
          <div className="ring-gradient relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-[0.3] mask-fade-b" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-gradient-to-br from-primary-500/20 to-transparent blur-3xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <Badge tone="accent">Build your own</Badge>
                <h2 className="mt-5 font-display text-2xl font-extrabold leading-tight text-fg text-balance sm:text-[2rem]">
                  If it is not on the list, the API already covers it
                </h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted text-pretty">
                  Every capability in the product has an API equivalent, so a connector we have not built is
                  a few days of work rather than a roadmap request. Sandbox keys are free and carry the
                  identical contract to production.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button to="/docs" size="lg" icon={ArrowRight}>Read the API docs</Button>
                  <Button to="/contact" size="lg" variant="secondary">Ask for a connector</Button>
                </div>
              </div>

              <ul className="grid gap-2.5 self-center">
                {[
                  'REST and GraphQL on every entity',
                  'Webhooks with signature verification and 24h retries',
                  'Idempotency keys on every write',
                  'Version pinned by header, supported for 24 months',
                  'Free sandbox with the production contract',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 rounded-xl border border-line bg-surface-2 px-4 py-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                    <span className="text-sm text-fg-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Tell us what you need to connect"
        lead="Bring the system and the workflow. We will tell you whether a connector exists, what it would take to build, and whether it is even the right approach."
        primary={{ label: 'Talk to an engineer', to: '/contact' }}
        secondary={{ label: 'Browse the products', to: '/products' }}
      />
    </>
  );
}
