import { useMemo, useState } from 'react';
import { Search, ArrowRight, Clock, Activity, X, Check } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx,
} from '../components/ui';

import { site } from '../data/site';
import {
  supportCategories, helpArticles, popularArticles, slaTiers, escalationPath,
  statusNote, articlesInCategory, getSupportCategory,
} from '../data/support';
import useSeo from '../hooks/useSeo';

const formatUpdated = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  });

/** Row used for both search results and the per-category list. */
function ArticleRow({ article }) {
  const category = getSupportCategory(article.category);
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-primary-500/40 hover:shadow-lift sm:flex-row sm:items-center sm:gap-6">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary">{category?.name}</Badge>
          <span className="inline-flex items-center gap-1.5 text-2xs text-fg-subtle">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {article.minutes} min read
          </span>
        </div>
        <h3 className="mt-2.5 font-display text-[16px] font-bold text-fg">{article.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{article.summary}</p>
      </div>
      <span className="shrink-0 text-2xs text-fg-subtle">Updated {formatUpdated(article.updated)}</span>
    </article>
  );
}

export default function Support() {
  useSeo({
    title: 'Help centre',
    description:
      'Searchable help articles, response-time commitments per plan, and an escalation path you can trigger by asking — no justification required.',
  });

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return helpArticles.filter((a) => `${a.title} ${a.summary}`.toLowerCase().includes(q));
  }, [query]);

  const categoryArticles = category ? articlesInCategory(category) : null;
  const activeCategory = category ? getSupportCategory(category) : null;

  return (
    <>
      <PageHeader
        eyebrow="Help centre"
        crumbs={[{ label: 'Help centre' }]}
        title="Answers first, and a person when that is not enough"
        lead="Search the articles below. If you would rather talk to someone, say so — escalation is a request, not a process you have to earn."
      >
        <Reveal className="w-full max-w-2xl">
          <label htmlFor="support-search" className="sr-only">Search help articles</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
            <input
              id="support-search"
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCategory(null); }}
              placeholder="Search for an answer…"
              className="h-13 w-full rounded-2xl border border-line bg-surface pl-12 pr-4 text-sm text-fg shadow-xs outline-none transition-colors placeholder:text-fg-subtle focus:border-primary-500"
            />
          </div>
        </Reveal>
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{helpArticles.length} articles</Badge>
          <Badge tone="accent">1h P1 response on Enterprise</Badge>
          <Badge>Public incident post-mortems</Badge>
        </div>
      </PageHeader>

      {/* results, or the browse experience */}
      <Section>
        <Container>
          {results ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-bold text-fg" role="status">
                  {results.length} result{results.length === 1 ? '' : 's'} for “{query}”
                </h2>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  Clear search
                </button>
              </div>

              {results.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
                  <p className="font-display text-lg font-bold text-fg">No article covers that yet</p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
                    That is a gap on our side. Send it to support and we will answer you directly, then write
                    the article so the next person finds it.
                  </p>
                  <Button href={`mailto:${site.email}`} size="md" className="mt-6" icon={ArrowRight}>
                    Ask support
                  </Button>
                </div>
              ) : (
                <RevealGroup className="mt-8 space-y-3" step={0.04}>
                  {results.map((a) => <ArticleRow key={a.id} article={a} />)}
                </RevealGroup>
              )}
            </>
          ) : (
            <>
              <SectionHeading
                eyebrow="Browse"
                title="Eight categories, everything indexed"
                lead="Pick a category or search above. Every article states when it was last checked against the product."
              />

              <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.04}>
                {supportCategories.map((c) => {
                  const count = articlesInCategory(c.slug).length;
                  const active = category === c.slug;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setCategory(active ? null : c.slug)}
                      aria-pressed={active}
                      className={cx(
                        'flex h-full cursor-pointer flex-col rounded-2xl border p-6 text-left transition-all duration-300 ease-spring hover:-translate-y-1 hover:shadow-lift',
                        active
                          ? 'border-primary-500/40 bg-surface shadow-soft'
                          : 'border-line bg-surface hover:border-primary-500/40',
                      )}
                    >
                      <span className={cx(
                        'grid h-11 w-11 place-items-center rounded-xl border transition-colors',
                        active
                          ? 'border-primary-500/40 bg-primary-500/10 text-primary-500'
                          : 'border-line bg-surface-2 text-primary-500',
                      )}>
                        <c.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 font-display text-[15px] font-bold text-fg">{c.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{c.blurb}</p>
                      <span className="mt-4 text-2xs font-semibold uppercase tracking-wider text-fg-subtle tnum">
                        {count} article{count === 1 ? '' : 's'}
                      </span>
                    </button>
                  );
                })}
              </RevealGroup>

              {categoryArticles ? (
                <div className="mt-12">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-fg">{activeCategory?.name}</h3>
                    <button
                      type="button"
                      onClick={() => setCategory(null)}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                      Show popular instead
                    </button>
                  </div>
                  <RevealGroup className="mt-6 space-y-3" step={0.04}>
                    {categoryArticles.map((a) => <ArticleRow key={a.id} article={a} />)}
                  </RevealGroup>
                </div>
              ) : (
                <div className="mt-12">
                  <h3 className="font-display text-xl font-bold text-fg">Most read this month</h3>
                  <RevealGroup className="mt-6 space-y-3" step={0.04}>
                    {popularArticles.map((a) => <ArticleRow key={a.id} article={a} />)}
                  </RevealGroup>
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      {/* SLA */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Response times"
            title="What each plan actually commits to"
            lead="These are contractual, measured from your first message rather than from when we open the ticket."
          />
          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3" step={0.07}>
            {slaTiers.map((t) => (
              <div
                key={t.tier}
                className={cx(
                  'flex h-full flex-col rounded-2xl border p-7',
                  t.highlight ? 'ring-gradient border-primary-500/30 bg-surface shadow-soft' : 'border-line bg-surface',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-fg">{t.tier}</h3>
                  <Badge tone={t.highlight ? 'primary' : 'neutral'}>{t.plans}</Badge>
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">{t.hours}</p>

                <dl className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {t.responses.map((r) => (
                    <div key={r.priority} className="flex items-baseline justify-between gap-4">
                      <dt className="text-xs text-fg-muted">{r.priority}</dt>
                      <dd className="shrink-0 font-display text-xs font-bold text-fg tnum">{r.time}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 flex-1 space-y-2 border-t border-line pt-5">
                  {t.channels.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-fg-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* escalation */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Escalation"
                title="Asking is the whole process"
                lead="You do not need to justify an escalation or wait for a response window to expire. Say the word and the ticket moves."
              />
              <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-center gap-2.5">
                  <Activity className="h-4 w-4 text-success" aria-hidden="true" />
                  <h3 className="font-display text-[15px] font-bold text-fg">{statusNote.title}</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{statusNote.body}</p>
              </div>
            </div>

            <div className="relative">
              <div aria-hidden="true" className="absolute left-[19px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-line sm:block" />
              <ol className="space-y-3">
                {escalationPath.map((s, i) => (
                  <Reveal key={s.step} delay={i * 0.06}>
                    <li className="relative flex gap-5 rounded-2xl border border-line bg-surface p-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface font-display text-xs font-extrabold text-primary-500 tnum">
                        {s.step}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-[16px] font-bold text-fg">{s.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.detail}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* contact */}
      <Section tight className="border-t border-line bg-surface/50">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Support email', value: site.email, href: `mailto:${site.email}`, hint: 'First response in 3 working hours on average' },
              { label: 'India & APAC', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}`, hint: 'IST business hours, P1 any time on Enterprise' },
              { label: site.phoneAltLabel, value: site.phoneAlt, href: `tel:${site.phoneAlt.replace(/[\s()]/g, '')}`, hint: 'Regional business hours, shifted roster' },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-primary-500/40"
              >
                <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{c.label}</p>
                <p className="mt-2 font-display text-[15px] font-bold text-fg transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {c.value}
                </p>
                <p className="mt-2 text-xs text-fg-subtle">{c.hint}</p>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Still stuck?"
        lead="Send it to support with your tenant, environment and when the behaviour started. It reaches an engineer who can read the code, not a script."
        primary={{ label: 'Contact support', to: '/contact' }}
        secondary={{ label: 'Read the docs', to: '/docs' }}
      />
    </>
  );
}
