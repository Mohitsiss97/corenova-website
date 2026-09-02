import { useMemo, useState } from 'react';
import { Search, Info, ArrowRight, Terminal, Webhook, X } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx,
} from '../components/ui';

import { docsSections, docsIndex, quickstarts, apiEndpoints, webhookEvents } from '../data/docs';
import useSeo from '../hooks/useSeo';

const methodTone = {
  GET: 'bg-success/10 text-success border-success/25',
  POST: 'bg-primary-500/10 text-primary-700 dark:text-primary-300 border-primary-500/25',
  PATCH: 'bg-warning/10 text-warning border-warning/25',
  DELETE: 'bg-danger/10 text-danger border-danger/25',
};

/** One documentation block. Unknown types are skipped rather than crashing. */
function DocBlock({ block }) {
  switch (block.type) {
    case 'p':
      return <p className="mt-4 text-sm leading-relaxed text-fg-muted">{block.text}</p>;

    case 'ul':
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'code':
      return (
        <div className="mt-4 overflow-hidden rounded-xl border border-line bg-surface-2">
          {block.lang && (
            <div className="border-b border-line px-4 py-2">
              <span className="font-mono text-2xs font-semibold uppercase tracking-wider text-fg-subtle">
                {block.lang}
              </span>
            </div>
          )}
          <pre className="overflow-x-auto p-4">
            <code className="font-mono text-[13px] leading-relaxed text-fg">{block.text}</code>
          </pre>
        </div>
      );

    case 'note':
      return (
        <aside className="mt-4 flex gap-3 rounded-xl border border-accent-500/25 bg-accent-500/10 px-4 py-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-fg-muted">{block.text}</p>
        </aside>
      );

    default:
      return null;
  }
}

export default function Docs() {
  useSeo({
    title: 'Documentation',
    description:
      'API reference, authentication, webhooks, data migration and security. Every capability in the product has an API equivalent — there are no UI-only features.',
  });

  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return docsIndex.filter((a) =>
      `${a.title} ${a.summary} ${a.sectionTitle}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        crumbs={[{ label: 'Documentation' }]}
        title="Everything the product does, the API does too"
        lead="There are no UI-only features. If you can click it, you can call it — and the sandbox carries the identical contract to production."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">REST + GraphQL</Badge>
          <Badge tone="accent">24-month version support</Badge>
          <Badge>Free sandbox</Badge>
        </div>
      </PageHeader>

      {/* quickstarts */}
      <Section tight>
        <Container>
          <SectionHeading
            eyebrow="Getting started"
            title="Four things worth doing first"
            lead="Each one is a complete path from nothing to working, with the time it actually takes."
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.05}>
            {quickstarts.map((q) => (
              <div key={q.title} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="primary">{q.time}</Badge>
                  <span className="text-2xs uppercase tracking-wider text-fg-subtle">{q.audience}</span>
                </div>
                <h3 className="mt-4 font-display text-[15px] font-bold leading-snug text-fg">{q.title}</h3>
                <ol className="mt-4 space-y-2">
                  {q.steps.map((s, i) => (
                    <li key={s} className="flex items-start gap-2.5 text-xs leading-relaxed text-fg-muted">
                      <span className="mt-px font-display text-2xs font-extrabold text-primary-500 tnum">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* docs shell */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.6fr)] lg:gap-14">
            {/* sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <label htmlFor="docs-search" className="sr-only">Search documentation</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
                <input
                  id="docs-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the docs…"
                  className="h-11 w-full rounded-xl border border-line bg-surface pl-11 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-primary-500"
                />
              </div>

              <nav aria-label="Documentation" className="mt-6">
                <ul className="space-y-6">
                  {docsSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-center gap-2.5 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle transition-colors hover:text-fg"
                      >
                        <section.icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {section.title}
                      </a>
                      <ul className="mt-3 space-y-2 border-l border-line">
                        {section.articles.map((a) => (
                          <li key={a.id}>
                            <a
                              href={`#${a.id}`}
                              className="-ml-px block border-l-2 border-transparent pl-4 text-sm text-fg-muted transition-colors hover:border-primary-500 hover:text-fg"
                            >
                              {a.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* content */}
            <div className="min-w-0">
              {results ? (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-display text-lg font-bold text-fg" role="status">
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
                    <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
                      <p className="font-display text-lg font-bold text-fg">Nothing found</p>
                      <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
                        Search the help centre for operational questions, or ask support — a missing doc is
                        logged as a bug, not a ticket.
                      </p>
                      <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
                        <Button to="/support" variant="secondary" size="md">Help centre</Button>
                        <Button to="/contact" size="md">Ask support</Button>
                      </div>
                    </div>
                  ) : (
                    <ul className="mt-6 space-y-3">
                      {results.map((a) => (
                        <li key={a.id}>
                          <a
                            href={`#${a.id}`}
                            onClick={() => setQuery('')}
                            className="block rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-primary-500/40"
                          >
                            <p className="text-2xs font-semibold uppercase tracking-wider text-fg-subtle">
                              {a.sectionTitle}
                            </p>
                            <h3 className="mt-1 font-display text-[15px] font-bold text-fg">{a.title}</h3>
                            <p className="mt-1.5 text-sm text-fg-muted">{a.summary}</p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="space-y-16">
                  {docsSections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-28">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-surface text-primary-500">
                          <section.icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <h2 className="font-display text-2xl font-bold text-fg">{section.title}</h2>
                      </div>

                      <div className="mt-8 space-y-10">
                        {section.articles.map((a) => (
                          <article key={a.id} id={a.id} className="scroll-mt-28">
                            <h3 className="font-display text-lg font-bold text-fg">{a.title}</h3>
                            <p className="mt-1 text-sm italic text-fg-subtle">{a.summary}</p>
                            {a.blocks.map((b, i) => <DocBlock key={i} block={b} />)}
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* endpoints */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="API reference"
            title="A sample of the endpoint surface"
            lead="Every endpoint states the permission key it requires. A key can never do more than the role it was issued against."
            action={<Button to="/integrations" variant="secondary" icon={ArrowRight}>See integrations</Button>}
          />

          <Reveal className="mt-10">
            <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <caption className="sr-only">Selected API endpoints with method, path, purpose and required permission key</caption>
                <thead>
                  <tr className="border-b border-line">
                    {['Method', 'Path', 'Purpose', 'Permission key'].map((h) => (
                      <th key={h} scope="col" className="px-5 py-3.5 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {apiEndpoints.map((e) => (
                    <tr key={`${e.method}-${e.path}`} className="transition-colors hover:bg-surface-2">
                      <td className="px-5 py-3.5">
                        <span className={cx(
                          'inline-flex rounded-md border px-2 py-0.5 font-mono text-2xs font-bold',
                          methodTone[e.method] ?? 'border-line bg-surface-2 text-fg-muted',
                        )}>
                          {e.method}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs text-fg">{e.path}</td>
                      <td className="px-5 py-3.5 text-sm text-fg-muted">{e.summary}</td>
                      <td className="px-5 py-3.5 font-mono text-2xs text-fg-subtle">{e.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 text-xs text-fg-subtle">
              <Terminal className="mr-1.5 inline h-3.5 w-3.5" aria-hidden="true" />
              This is an excerpt. The full reference covers every entity in every product, generated from the
              same OpenAPI document the clients are built from.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* webhooks */}
      <Section className="border-t border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Webhooks"
            title="Events you can subscribe to"
            lead="Delivered at least once, retried with backoff for 24 hours, and replayable from the dashboard for 30 days. Deduplicate on the event id."
          />
          <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2" step={0.04}>
            {webhookEvents.map((e) => (
              <div key={e.name} className="flex items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                <Webhook className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-mono text-[13px] font-semibold text-fg">{e.name}</p>
                  <p className="mt-1 text-sm text-fg-muted">{e.description}</p>
                </div>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        title="Missing something in the docs?"
        lead="A gap in the documentation is filed as a bug against the product, not as a support ticket. Tell us what you could not find."
        primary={{ label: 'Report a docs gap', to: '/contact' }}
        secondary={{ label: 'Visit the help centre', to: '/support' }}
      />
    </>
  );
}
