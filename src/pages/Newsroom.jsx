import { useMemo, useState } from 'react';
import { ArrowRight, Download, Mail, ExternalLink } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx,
} from '../components/ui';
import useSeo from '../hooks/useSeo';

import {
  pressReleases, coverage, brandAssets, pressContact, pressTags, formatPressDate,
} from '../data/newsroom';

const tagTone = { Product: 'primary', Company: 'accent', Customer: 'success', Compliance: 'warning' };

export default function Newsroom() {
  useSeo({
    title: 'Newsroom',
    description: 'Press releases, media coverage and brand assets. Press enquiries answered within one working day.',
  });

  const [tag, setTag] = useState(null);

  const releases = useMemo(
    () => (tag ? pressReleases.filter((r) => r.tag === tag) : pressReleases),
    [tag],
  );

  const [latest, ...rest] = releases;

  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        crumbs={[{ label: 'Newsroom' }]}
        title="Announcements, coverage and assets"
        lead="Everything we have said publicly, in one place — plus the logo pack and screenshots, so nobody has to ask us for a PNG."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{pressReleases.length} releases</Badge>
          <Badge tone="accent">{coverage.length} press mentions</Badge>
          <Badge icon={Mail}>1 working day response</Badge>
        </div>
      </PageHeader>

      {/* releases */}
      <Section tight>
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Filter</span>
            <button
              type="button"
              onClick={() => setTag(null)}
              aria-pressed={tag === null}
              className={cx(
                'cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                tag === null
                  ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                  : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
              )}
            >
              All
            </button>
            {pressTags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(tag === t ? null : t)}
                aria-pressed={tag === t}
                className={cx(
                  'cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  tag === t
                    ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                    : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
                )}
              >
                {t}
                <span className="ml-1.5 font-normal text-fg-subtle tnum">
                  {pressReleases.filter((r) => r.tag === t).length}
                </span>
              </button>
            ))}
          </div>

          {/* latest, given room */}
          <Reveal className="mt-8">
            <article className="ring-gradient relative overflow-hidden rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-[0.25] mask-fade-b" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={tagTone[latest.tag] ?? 'neutral'}>{latest.tag}</Badge>
                  <time dateTime={latest.date} className="text-2xs font-semibold uppercase tracking-wider text-fg-subtle">
                    {formatPressDate(latest.date)}
                  </time>
                </div>
                <h2 className="mt-4 max-w-3xl font-display text-2xl font-bold leading-snug text-fg text-balance sm:text-3xl">
                  {latest.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-fg-muted text-pretty">{latest.body}</p>
              </div>
            </article>
          </Reveal>

          {/* the rest */}
          <RevealGroup className="mt-4 grid gap-4 lg:grid-cols-2" step={0.05}>
            {rest.map((r) => (
              <article key={r.slug} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={tagTone[r.tag] ?? 'neutral'}>{r.tag}</Badge>
                  <time dateTime={r.date} className="text-2xs font-semibold uppercase tracking-wider text-fg-subtle">
                    {formatPressDate(r.date)}
                  </time>
                </div>
                <h3 className="mt-4 font-display text-[17px] font-bold leading-snug text-fg">{r.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{r.body}</p>
              </article>
            ))}
          </RevealGroup>

          {releases.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface p-12 text-center">
              <p className="font-display text-base font-bold text-fg">Nothing under that tag yet</p>
              <Button onClick={() => setTag(null)} variant="secondary" size="md" className="mt-5">Show all releases</Button>
            </div>
          )}
        </Container>
      </Section>

      {/* coverage */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="In the press"
            title="Where we have been written about"
            lead="Independent coverage, not placed content. Links go to the original publication."
          />
          <Reveal className="mt-10">
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <caption className="sr-only">Media coverage of CoreNova</caption>
                <thead>
                  <tr className="bg-surface-2">
                    {['Publication', 'Headline', 'Type', 'Date'].map((h) => (
                      <th key={h} scope="col" className="px-5 py-4 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {coverage.map((c) => (
                    <tr key={c.title} className="bg-surface transition-colors hover:bg-surface-2">
                      <th scope="row" className="px-5 py-4 text-left font-display text-[13px] font-bold text-fg">
                        {c.outlet}
                      </th>
                      <td className="px-5 py-4 text-[13px] text-fg-muted">
                        <span className="inline-flex items-center gap-1.5">
                          {c.title}
                          <ExternalLink className="h-3 w-3 shrink-0 text-fg-subtle" aria-hidden="true" />
                        </span>
                      </td>
                      <td className="px-5 py-4 text-2xs text-fg-subtle">{c.kind}</td>
                      <td className="px-5 py-4 text-2xs text-fg-subtle tnum">{formatPressDate(c.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* brand assets */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Brand assets"
            title="Take what you need"
            lead="Please use the official files rather than screenshotting the site. Clear-space and colour rules are in the guidelines."
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.05}>
            {brandAssets.map((a) => (
              <div key={a.name} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-primary-500">
                  <Download className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-[15px] font-bold text-fg">{a.name}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-fg-muted">{a.detail}</p>
                <p className="mt-4 border-t border-line pt-3 font-mono text-2xs text-fg-subtle">{a.size}</p>
              </div>
            ))}
          </RevealGroup>
          <p className="mt-6 text-sm text-fg-muted">
            Need something not listed — a specific screenshot, a founder quote, or an executive for comment?{' '}
            <a href={`mailto:${pressContact.email}`} className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
              Ask the press office
            </a>.
          </p>
        </Container>
      </Section>

      {/* press contact */}
      <Section tight className="border-t border-line bg-surface/50">
        <Container>
          <div className="ring-gradient rounded-2xl border border-line bg-surface p-7 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient-soft text-primary-600 dark:text-primary-400">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-lg font-bold text-fg">{pressContact.name}</h2>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-muted">{pressContact.note}</p>
            <Button href={`mailto:${pressContact.email}`} size="md" className="mt-5" icon={ArrowRight}>
              {pressContact.email}
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Writing about enterprise software?"
        lead="We will put you on a call with an engineer rather than a spokesperson, and we are happy to talk about the things that did not work."
        primary={{ label: 'Contact the press office', to: '/contact' }}
        secondary={{ label: 'Read our case studies', to: '/case-studies' }}
      />
    </>
  );
}
