import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, LayoutGrid, Rows3 } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import { ProductCard, CategoryCard } from '../components/Cards';
import { Button, Container, Section, Badge, cx } from '../components/ui';

import { categories, categoryGroups, products, deployments, pricingModels } from '../data/products';
import { industries } from '../data/industries';
import useSeo from '../hooks/useSeo';

/** Multi-select facet — the filter pattern the catalog research calls for. */
function FacetGroup({ title, options, selected, onToggle, labelOf = (o) => o, valueFor = (o) => o }) {
  return (
    <div className="border-b border-line pb-5 last:border-0 last:pb-0">
      <p className="mb-3 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{title}</p>
      <ul className="space-y-1">
        {options.map((o) => {
          const value = valueFor(o);
          const on = selected.includes(value);
          return (
            <li key={value}>
              <label
                className={cx(
                  'flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] transition-colors',
                  on ? 'bg-primary-500/10 text-fg' : 'text-fg-muted hover:bg-surface-2',
                )}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onToggle(value)}
                  className="h-3.5 w-3.5 shrink-0 cursor-pointer accent-primary-500"
                />
                <span className="min-w-0 flex-1 truncate">{labelOf(o)}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Products() {
  useSeo({
    title: `All products — ${products.length} across ${categories.length} categories`,
    description: `Browse ${products.length} production-ready enterprise products across ${categories.length} categories. Filter by category, industry, deployment mode and pricing model.`,
  });

  const [query, setQuery] = useState('');
  const [cats, setCats] = useState([]);
  const [inds, setInds] = useState([]);
  const [deps, setDeps] = useState([]);
  const [prices, setPrices] = useState([]);
  const [sort, setSort] = useState('popular');
  const [dense, setDense] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (setter) => (v) =>
    setter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const activeCount = cats.length + inds.length + deps.length + prices.length;

  const clearAll = () => { setCats([]); setInds([]); setDeps([]); setPrices([]); setQuery(''); };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (inds.length && !p.industries.some((i) => inds.includes(i))) return false;
      if (deps.length && !p.deployment.some((d) => deps.includes(d))) return false;
      if (prices.length && !prices.includes(p.pricing)) return false;
      if (q) {
        const hay = `${p.name} ${p.tagline} ${p.highlights.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list];
    if (sort === 'popular') list.sort((a, b) => b.reviews - a.reviews);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'price') list.sort((a, b) => a.from - b.from);
    return list;
  }, [query, cats, inds, deps, prices, sort]);

  const facets = (
    <div className="space-y-5">
      <FacetGroup
        title={`Category (${categories.length})`}
        options={categories}
        selected={cats}
        onToggle={toggle(setCats)}
        labelOf={(c) => `${c.short} — ${c.count}`}
        valueFor={(c) => c.slug}
      />
      <FacetGroup
        title="Industry"
        options={industries}
        selected={inds}
        onToggle={toggle(setInds)}
        labelOf={(i) => i.name}
        valueFor={(i) => i.slug}
      />
      <FacetGroup title="Deployment" options={deployments} selected={deps} onToggle={toggle(setDeps)} />
      <FacetGroup title="Pricing model" options={pricingModels} selected={prices} onToggle={toggle(setPrices)} />
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow="Product catalog"
        crumbs={[{ label: 'Products' }]}
        title={`${products.length} products across ${categories.length} categories`}
        lead="Every product here runs in production today, ships with open APIs, and deploys to cloud, private cloud or your own servers. Filter by what you need to fix."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{products.length} products</Badge>
          <Badge tone="accent">{categories.length} categories</Badge>
          <Badge>4 deployment modes</Badge>
          <Badge>Free 14-day trial</Badge>
        </div>
      </PageHeader>

      {/* category overview */}
      <Section tight>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-fg">Browse by category</h2>
              <p className="mt-1 text-sm text-fg-muted">Grouped the way buying committees think about them.</p>
            </div>
          </div>

          {categoryGroups.map((group) => (
            <div key={group.id} className="mt-8">
              <p className="mb-3 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{group.label}</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {categories.filter((c) => c.group === group.id).map((c) => (
                  <CategoryCard key={c.slug} category={c} compact />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>

      {/* catalog with filters */}
      <Section id="catalog" tight className="border-t border-line bg-surface/50">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[248px_minmax(0,1fr)]">
            {/* filter rail */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center justify-between gap-3 lg:mb-4">
                <h2 className="font-display text-base font-bold text-fg">Filters</h2>
                <div className="flex items-center gap-2">
                  {activeCount > 0 && (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="cursor-pointer text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400"
                    >
                      Clear ({activeCount})
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setFiltersOpen((v) => !v)}
                    aria-expanded={filtersOpen}
                    className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface px-3 text-xs font-semibold text-fg-muted lg:hidden"
                  >
                    {filtersOpen ? <X className="h-3.5 w-3.5" /> : <SlidersHorizontal className="h-3.5 w-3.5" />}
                    {filtersOpen ? 'Close' : 'Filter'}
                  </button>
                </div>
              </div>

              <div className={cx('rounded-2xl border border-line bg-surface p-5', !filtersOpen && 'hidden lg:block')}>
                {facets}
              </div>
            </aside>

            {/* results */}
            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
                  <label htmlFor="catalog-search" className="sr-only">Search products</label>
                  <input
                    id="catalog-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${products.length} products — try “payroll”, “warehouse”, “offline”…`}
                    className="h-11 w-full rounded-xl border border-line bg-surface pl-10 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-primary-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="catalog-sort" className="sr-only">Sort products</label>
                  <select
                    id="catalog-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-11 cursor-pointer rounded-xl border border-line bg-surface px-3 text-sm font-medium text-fg-muted outline-none focus:border-primary-500"
                  >
                    <option value="popular">Most reviewed</option>
                    <option value="rating">Highest rated</option>
                    <option value="price">Lowest price</option>
                    <option value="name">A–Z</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setDense((v) => !v)}
                    aria-label={dense ? 'Switch to comfortable grid' : 'Switch to dense grid'}
                    className="hidden h-11 w-11 cursor-pointer place-items-center rounded-xl border border-line bg-surface text-fg-muted transition-colors hover:text-fg xl:grid"
                  >
                    {dense ? <LayoutGrid className="h-4 w-4" /> : <Rows3 className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* active chips */}
              {activeCount > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {cats.map((c) => (
                    <FilterChip key={c} label={categories.find((x) => x.slug === c)?.short} onClear={() => toggle(setCats)(c)} />
                  ))}
                  {inds.map((i) => (
                    <FilterChip key={i} label={industries.find((x) => x.slug === i)?.name} onClear={() => toggle(setInds)(i)} />
                  ))}
                  {deps.map((d) => <FilterChip key={d} label={d} onClear={() => toggle(setDeps)(d)} />)}
                  {prices.map((p) => <FilterChip key={p} label={p} onClear={() => toggle(setPrices)(p)} />)}
                </div>
              )}

              <p className="mt-5 text-sm text-fg-muted" aria-live="polite">
                <strong className="font-semibold text-fg tnum">{results.length}</strong>{' '}
                {results.length === 1 ? 'product' : 'products'}
                {activeCount > 0 || query ? ' match your filters' : ''}
              </p>

              {results.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface p-12 text-center">
                  <p className="font-display text-base font-bold text-fg">Nothing matches that combination</p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
                    Try removing a filter, or tell us what you are looking for — if we do not have it off the shelf, we build it.
                  </p>
                  <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
                    <Button onClick={clearAll} variant="secondary" size="md">Clear all filters</Button>
                    <Button to="/contact" size="md">Ask us to build it</Button>
                  </div>
                </div>
              ) : (
                <div className={cx('mt-6 grid gap-4', dense ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-2 xl:grid-cols-3')}>
                  {results.map((p) => <ProductCard key={p.slug} product={p} />)}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Not sure which product fits?"
        lead={`Describe the process you are trying to fix. We will tell you which of the ${products.length} covers it — or say honestly that none does.`}
        primary={{ label: 'Get a recommendation', to: '/contact' }}
        secondary={{ label: 'Compare pricing', to: '/pricing' }}
      />
    </>
  );
}

function FilterChip({ label, onClear }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-2xs font-semibold text-primary-700 transition-colors hover:bg-primary-500/20 dark:text-primary-300"
    >
      {label}
      <X className="h-3 w-3" aria-hidden="true" />
      <span className="sr-only">Remove filter</span>
    </button>
  );
}
