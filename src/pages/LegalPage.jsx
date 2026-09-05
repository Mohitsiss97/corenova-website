import { Link } from 'react-router-dom';
import { Check, ArrowRight, CalendarClock } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import NotFound from './NotFound';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, Reveal, Badge, cx,
} from '../components/ui';
import useSeo from '../hooks/useSeo';

import { getLegalDoc, legalDocList, formatLegalDate } from '../data/legal';
import { emails } from '../data/brand';

/**
 * Renders any document in data/legal.js. The table of contents is built from
 * `sections`, so adding a section needs no change here.
 */
export default function LegalPage({ slug }) {
  const doc = getLegalDoc(slug);

  useSeo(doc ? { title: doc.title, description: doc.summary } : undefined);

  if (!doc) return <NotFound />;

  const others = legalDocList.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <PageHeader
        eyebrow={doc.eyebrow}
        crumbs={[{ label: doc.title }]}
        title={doc.title}
        lead={doc.summary}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary" icon={CalendarClock}>Last updated {formatLegalDate(doc.updated)}</Badge>
        </div>
      </PageHeader>

      <Section tight>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)] lg:gap-14">
            {/* table of contents */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="On this page">
                <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">On this page</p>
                <ul className="mt-4 space-y-1">
                  {doc.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block rounded-lg px-3 py-2 text-[13px] text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 border-t border-line pt-6">
                <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Related</p>
                <ul className="mt-3 space-y-1">
                  {others.map((d) => (
                    <li key={d.slug}>
                      <Link
                        to={`/${d.slug}`}
                        className="block rounded-lg px-3 py-2 text-[13px] text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* document body */}
            <div className="min-w-0">
              <Reveal>
                <p className="rounded-2xl border border-line bg-surface-2 p-6 text-sm leading-relaxed text-fg-muted">
                  {doc.intro}
                </p>
              </Reveal>

              <div className="mt-10 space-y-12">
                {doc.sections.map((s, i) => (
                  <Reveal key={s.id} delay={Math.min(i * 0.04, 0.25)}>
                    <section id={s.id} className="scroll-mt-28">
                      <h2 className="font-display text-xl font-bold text-fg">{s.heading}</h2>

                      {s.body?.map((para) => (
                        <p key={para.slice(0, 40)} className="mt-4 text-[15px] leading-relaxed text-fg-muted text-pretty">
                          {para}
                        </p>
                      ))}

                      {s.list && (
                        <ul className="mt-4 space-y-2.5">
                          {s.list.map((item) => (
                            <li key={item.slice(0, 40)} className="flex items-start gap-3">
                              <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                              <span className="text-[15px] leading-relaxed text-fg-muted">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {s.table && (
                        <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
                          <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                            <thead>
                              <tr className="bg-surface-2">
                                {s.table.head.map((h) => (
                                  <th
                                    key={h}
                                    scope="col"
                                    className="px-5 py-3.5 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-line">
                              {s.table.rows.map((row) => (
                                <tr key={row[0]} className="bg-surface">
                                  <th scope="row" className="px-5 py-3.5 text-left font-mono text-[13px] font-medium text-fg">
                                    {row[0]}
                                  </th>
                                  {row.slice(1).map((cell, ci) => (
                                    <td key={ci} className="px-5 py-3.5 text-[13px] text-fg-muted">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {s.cta && (
                        <Button to={s.cta.to} size="md" className="mt-6" icon={ArrowRight}>
                          {s.cta.label}
                        </Button>
                      )}
                    </section>
                  </Reveal>
                ))}
              </div>

              <p className={cx('mt-12 rounded-xl border border-line bg-surface-2 px-5 py-4 text-xs leading-relaxed text-fg-subtle')}>
                Questions about this document? Write to{' '}
                <a href={`mailto:${emails.legal}`} className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
                  {emails.legal}
                </a>{' '}
                and a person will answer — we do not route legal enquiries to a bot.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Need this reviewed by your team?"
        lead="Send it to your counsel or security reviewer and copy us in. We answer questionnaires and redlines directly rather than routing them through sales."
        primary={{ label: 'Talk to us', to: '/contact' }}
        secondary={{ label: 'Security & compliance', to: '/security' }}
      />
    </>
  );
}
