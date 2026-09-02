import { ArrowRight, Check, Clock } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx,
} from '../components/ui';

import { stages, ceremonies, qualityGates, toolingGroups, handoverStandards } from '../data/method';
import useSeo from '../hooks/useSeo';

export default function Process() {
  useSeo({
    title: 'How we work',
    description:
      'Six delivery stages, a fortnightly demo, six quality gates that block the merge, and a handover you perform rather than receive.',
  });

  return (
    <>
      <PageHeader
        eyebrow="How we work"
        crumbs={[{ label: 'How we work' }]}
        title="Working software from week five, then every second Friday"
        lead="Six stages, written down with what we owe you at each one and what we need from you. If a stage cannot state its exit criteria, it is not a stage — it is a hope."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">6 delivery stages</Badge>
          <Badge tone="accent">Demo every 2 weeks</Badge>
          <Badge>6 quality gates</Badge>
          <Badge>You own the IP</Badge>
        </div>
      </PageHeader>

      {/* stages */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Delivery method"
            title="The six stages, in full"
            lead="The short version appears on the services pages. This is the version we are actually held to, including what we need from you to make each stage work."
          />

          <div className="mt-12 space-y-4">
            {stages.map((s, i) => (
              <Reveal key={s.step} delay={Math.min(i * 0.05, 0.25)}>
                <article className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
                  <div className="flex flex-wrap items-start gap-4 sm:gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 text-primary-500">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-display text-2xs font-extrabold uppercase tracking-[0.14em] text-fg-subtle tnum">
                          Stage {s.step}
                        </span>
                        <Badge icon={Clock}>{s.duration}</Badge>
                      </div>
                      <h3 className="mt-1.5 font-display text-xl font-bold text-fg">{s.name}</h3>
                      <p className="mt-1 text-sm font-medium text-fg-muted">{s.summary}</p>
                    </div>
                  </div>

                  <p className="mt-6 max-w-3xl text-sm leading-relaxed text-fg-muted">{s.detail}</p>

                  <div className="mt-7 grid gap-6 border-t border-line pt-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
                    <div>
                      <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">What you receive</p>
                      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-xs text-fg-muted">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary-500" aria-hidden="true" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">What we need</p>
                        <p className="mt-2 text-xs leading-relaxed text-fg-muted">{s.weNeed}</p>
                      </div>
                      <div>
                        <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Done when</p>
                        <p className="mt-2 text-xs leading-relaxed text-fg-muted">{s.exit}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* rhythm */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Sprint rhythm"
            title="The ceremonies, and how long each one may take"
            lead="Six recurring meetings, capped. Anything not on this list is someone scheduling a meeting they could have written down instead."
          />
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {ceremonies.map((c) => (
              <div key={c.name} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent-500">
                    <c.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <Badge tone="accent">{c.duration}</Badge>
                </div>
                <h3 className="mt-5 font-display text-[16px] font-bold text-fg">{c.name}</h3>
                <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{c.cadence}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{c.detail}</p>
                <p className="mt-5 border-t border-line pt-4 text-xs text-fg-subtle">{c.who}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* quality gates */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Quality gates"
            title="Six gates that block the merge, not the retrospective"
            lead="Each one is a number rather than an adjective. A gate described as 'good test coverage' is not a gate — it is an opinion waiting for a deadline."
          />
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3" step={0.04}>
            {qualityGates.map((g) => (
              <div key={g.name} className="flex h-full flex-col bg-surface p-6">
                <div className="flex items-center gap-3">
                  <g.icon className="h-5 w-5 shrink-0 text-primary-500" aria-hidden="true" />
                  <h3 className="font-display text-[15px] font-bold text-fg">{g.name}</h3>
                </div>
                <p className="mt-3 font-mono text-xs font-semibold text-accent-600 dark:text-accent-400">{g.rule}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{g.detail}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* tooling */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Tooling"
            title="We work in your tools, in your accounts"
            lead="Code in your repository, tickets on your board, our engineers in your Slack. Nothing important lives in a system you cannot access after we leave."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {toolingGroups.map((t) => (
              <div key={t.group} className="h-full rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-2xs font-extrabold uppercase tracking-[0.14em] text-fg-subtle">{t.group}</h3>
                <ul className="mt-4 space-y-2.5">
                  {t.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* handover */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Handover"
            title="A handover you perform, not one you receive"
            lead="The engagement is complete when your team has run a deploy and a rollback with ours watching — not when we have finished explaining it."
          />
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {handoverStandards.map((h, i) => (
              <div
                key={h.title}
                className={cx(
                  'flex h-full flex-col rounded-2xl border p-6',
                  i === handoverStandards.length - 1
                    ? 'ring-gradient border-primary-500/30 bg-surface shadow-soft'
                    : 'border-line bg-surface',
                )}
              >
                <span className="font-display text-2xs font-extrabold tracking-[0.14em] text-fg-subtle tnum">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-fg">{h.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{h.body}</p>
              </div>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line-strong bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm text-fg-muted">
                Every one of these is contractual, not aspirational. Ask for the delivery schedule from a
                statement of work and you will find the same list.
              </p>
              <Button to="/contact" variant="secondary" size="md" icon={ArrowRight} className="shrink-0">
                Ask for a sample SOW
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Hold us to this"
        lead="Bring a project and we will map it onto these six stages with dates, deliverables and the risks we can already see — before you sign anything."
        primary={{ label: 'Brief our team', to: '/contact' }}
        secondary={{ label: 'See the services', to: '/services' }}
      />
    </>
  );
}
