import { useMemo, useState } from 'react';
import { Check, ArrowRight, Handshake, Globe2 } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup,
  Badge, Accordion, cx,
} from '../components/ui';
import useSeo from '../hooks/useSeo';

import {
  partnerTracks, partnerTiers, partnerSteps, partnerDirectory, partnerFaqs,
} from '../data/partners';
import { brand } from '../data/brand';

export default function Partners() {
  useSeo({
    title: 'Partners',
    description: 'Reseller, implementation, technology and referral tracks — with deal registration, certification and margin that improves as you deliver.',
  });

  const [track, setTrack] = useState(null);

  const tracks = useMemo(
    () => [...new Set(partnerDirectory.map((p) => p.track))],
    [],
  );

  const directory = useMemo(
    () => (track ? partnerDirectory.filter((p) => p.track === track) : partnerDirectory),
    [track],
  );

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        crumbs={[{ label: 'Partners' }]}
        title="Sell it, implement it, or build alongside it"
        lead="Four tracks depending on what you actually want to do. Deal registration protects what you source, certification is free, and there is no joining fee."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{partnerTracks.length} tracks</Badge>
          <Badge tone="accent">{partnerDirectory.length} active partners</Badge>
          <Badge>No joining fee</Badge>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/contact" size="lg" icon={ArrowRight}>Apply to the programme</Button>
          <Button to="/products" size="lg" variant="secondary">See what you would sell</Button>
        </div>
      </PageHeader>

      {/* tracks */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Tracks"
            title="Pick the one that matches your business"
            lead="You can hold more than one. Most consultancies start on implementation and add reselling once their team is certified."
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2" step={0.06}>
            {partnerTracks.map((t) => (
              <div key={t.name} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-primary-500">
                  <t.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-bold text-fg">{t.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{t.blurb}</p>
                <p className="mt-5 border-t border-line pt-4 text-xs text-fg-subtle">
                  <span className="font-semibold text-fg-muted">Best fit:</span> {t.fit}
                </p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* tiers */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Tiers"
            title="Margin improves as you deliver, not as you commit"
            lead="No annual purchase minimum buys you a tier here. You move up by certifying people and closing work."
          />
          <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" step={0.07}>
            {partnerTiers.map((tier) => (
              <div
                key={tier.name}
                className={cx(
                  'relative flex h-full flex-col rounded-2xl border p-7',
                  tier.highlight
                    ? 'ring-gradient border-primary-500/30 bg-surface shadow-lift lg:-mt-3 lg:mb-3'
                    : 'border-line bg-surface',
                )}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-2xs font-bold uppercase tracking-wider text-white shadow-soft">
                    Most partners
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-fg">{tier.name}</h3>
                <p className="mt-1.5 text-xs text-fg-subtle">{tier.requirement}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-fg-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* process */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Getting started"
            title="Four steps, about six weeks"
            lead="We shadow your first opportunity end to end so the second one is genuinely yours to run."
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
            {partnerSteps.map((s) => (
              <div key={s.step} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <span className="font-display text-3xl font-extrabold tracking-tight text-primary-500/25">{s.step}</span>
                <h3 className="mt-3 font-display text-[17px] font-bold text-fg">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.detail}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* directory */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Directory"
            title="Partners you can work with today"
            lead={`Looking for local delivery? These teams are certified and actively running ${brand.name} implementations.`}
          />

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Track</span>
            <button
              type="button"
              onClick={() => setTrack(null)}
              aria-pressed={track === null}
              className={cx(
                'cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                track === null
                  ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                  : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
              )}
            >
              All
            </button>
            {tracks.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrack(track === t ? null : t)}
                aria-pressed={track === t}
                className={cx(
                  'cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  track === t
                    ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                    : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
                )}
              >
                {t}
                <span className="ml-1.5 font-normal text-fg-subtle tnum">
                  {partnerDirectory.filter((p) => p.track === t).length}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm text-fg-muted" aria-live="polite">
            <strong className="font-semibold text-fg tnum">{directory.length}</strong>{' '}
            {directory.length === 1 ? 'partner' : 'partners'}
          </p>

          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.04}>
            {directory.map((p) => (
              <div key={p.name} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft font-display text-xs font-extrabold text-primary-600 dark:text-primary-400">
                    {p.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </span>
                  <Badge tone={p.tier === 'Strategic' ? 'primary' : p.tier === 'Certified' ? 'accent' : 'neutral'}>
                    {p.tier}
                  </Badge>
                </div>
                <h3 className="mt-4 font-display text-[15px] font-bold text-fg">{p.name}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-2xs text-fg-subtle">
                  <Globe2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {p.region}
                </p>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-fg-muted">{p.focus}</p>
                <p className="mt-4 border-t border-line pt-3 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">
                  {p.track}
                </p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* faq */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Questions"
                title="What partners ask before signing"
                lead="Including the uncomfortable one about whether we compete with you."
              />
              <Button to="/contact" variant="secondary" size="md" className="mt-7" icon={ArrowRight}>
                Ask a question
              </Button>
            </div>
            <Reveal><Accordion items={partnerFaqs} /></Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Apply to the partner programme"
        lead="Tell us what you sell today and where we would fit. You get a reply within three working days — including when the honest answer is that we are not a fit."
        primary={{ label: 'Apply now', to: '/contact' }}
        secondary={{ label: 'Book a fit call', to: '/demo' }}
      />
    </>
  );
}
