import { useMemo, useState } from 'react';
import { X, ArrowRight, Phone } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import { CaseStudyCard } from '../components/Cards';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx,
} from '../components/ui';
import useSeo from '../hooks/useSeo';

import { caseStudies } from '../data/content';
import { industries, getIndustry } from '../data/industries';
import { services, getService } from '../data/services';

function FilterRow({ label, options, active, onPick }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{label}</span>
      <button
        type="button"
        onClick={() => onPick(null)}
        aria-pressed={active === null}
        className={cx(
          'cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
          active === null
            ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
            : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
        )}
      >
        All
      </button>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onPick(active === o.value ? null : o.value)}
          aria-pressed={active === o.value}
          className={cx(
            'cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
            active === o.value
              ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
              : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
          )}
        >
          {o.label}
          <span className="ml-1.5 font-normal text-fg-subtle tnum">{o.count}</span>
        </button>
      ))}
    </div>
  );
}

export default function CaseStudies() {
  useSeo({
    title: 'Case studies',
    description: `${caseStudies.length} rollouts with named clients, the starting problem and the measured outcome. Reference calls available on request.`,
  });

  const [industry, setIndustry] = useState(null);
  const [service, setService] = useState(null);

  // Only offer filters that would actually return something.
  const industryOptions = useMemo(
    () => industries
      .map((i) => ({ value: i.slug, label: i.name, count: caseStudies.filter((c) => c.industry === i.slug).length }))
      .filter((o) => o.count > 0),
    [],
  );

  const serviceOptions = useMemo(
    () => services
      .map((s) => ({ value: s.slug, label: s.name, count: caseStudies.filter((c) => c.services?.includes(s.slug)).length }))
      .filter((o) => o.count > 0),
    [],
  );

  const results = useMemo(
    () => caseStudies.filter((c) => {
      if (industry && c.industry !== industry) return false;
      if (service && !c.services?.includes(service)) return false;
      return true;
    }),
    [industry, service],
  );

  const active = [industry, service].filter(Boolean).length;
  const clear = () => { setIndustry(null); setService(null); };

  const [featured, ...rest] = results;

  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        crumbs={[{ label: 'Case studies' }]}
        title="Named clients, measured outcomes"
        lead="Every study below names the company, the problem they started with and the numbers they measured afterwards. Where a client has agreed to it, we will put you on a call with them."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{caseStudies.length} rollouts</Badge>
          <Badge tone="accent">{industryOptions.length} industries</Badge>
          <Badge icon={Phone}>Reference calls on request</Badge>
        </div>
      </PageHeader>

      {/* filters */}
      <Section tight>
        <Container>
          <div className="space-y-4 rounded-2xl border border-line bg-surface p-6">
            <FilterRow label="Industry" options={industryOptions} active={industry} onPick={setIndustry} />
            <FilterRow label="Service" options={serviceOptions} active={service} onPick={setService} />
            {active > 0 && (
              <div className="flex items-center gap-3 border-t border-line pt-4">
                <p className="text-sm text-fg-muted" aria-live="polite">
                  <strong className="font-semibold text-fg tnum">{results.length}</strong>{' '}
                  {results.length === 1 ? 'study' : 'studies'} match
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* results */}
      <Section tight className="pb-20">
        <Container>
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-12 text-center">
              <p className="font-display text-base font-bold text-fg">No published study for that combination</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
                We have delivered work that is not written up — a lot of clients prefer not to be named. Ask and we will
                tell you what we have done in your sector.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
                <Button onClick={clear} variant="secondary" size="md">Clear filters</Button>
                <Button to="/contact" size="md">Ask about your sector</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Reveal><CaseStudyCard study={featured} featured /></Reveal>
              {rest.length > 0 && (
                <RevealGroup className="grid gap-4 lg:grid-cols-2" step={0.06}>
                  {rest.map((c) => <CaseStudyCard key={c.slug} study={c} />)}
                </RevealGroup>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* results summary */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Across every rollout"
            title="What these engagements have in common"
            lead="Different industries, same delivery method — and the same willingness to publish the number rather than an adjective."
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
            {[
              { metric: '0', label: 'rollouts that needed an unplanned freeze' },
              { metric: '100%', label: 'delivered with a rehearsed rollback plan' },
              { metric: '2+', label: 'migration dry runs before every cutover' },
              { metric: '11 yrs', label: 'average tenure of our top 20 clients' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-display text-3xl font-extrabold tracking-tight text-gradient tnum">{s.metric}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.label}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* which service */}
      <Section tight>
        <Container>
          <div className="rounded-2xl border border-line bg-surface p-7 sm:p-8">
            <h2 className="font-display text-lg font-bold text-fg">Looking for a specific capability?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
              Each service page carries the case studies relevant to it, plus the approach we take and what the
              engagement actually delivers.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {serviceOptions.map((o) => {
                const s = getService(o.value);
                return (
                  <Button key={o.value} to={`/services/${o.value}`} variant="secondary" size="sm">
                    {s.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Want to speak to one of them?"
        lead="We arrange reference calls with clients who have agreed to take them — including ones in your industry that are not written up here."
        primary={{ label: 'Request a reference', to: '/contact' }}
        secondary={{ label: 'See our services', to: '/services' }}
      />
    </>
  );
}
