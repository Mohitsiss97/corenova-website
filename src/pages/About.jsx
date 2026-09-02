import { ArrowRight, Building2, Award, Quote } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, Stat,
} from '../components/ui';

import { site, stats, certifications } from '../data/site';
import { awards, testimonials } from '../data/content';
import { story, mission, values, timeline, leadership, companyFacts } from '../data/company';
import useSeo from '../hooks/useSeo';

export default function About() {
  useSeo({
    title: 'About us',
    description: `${site.name} builds and runs its own enterprise software, then uses the same modules to build custom systems. Founded ${site.founded}, ${site.offices.length} offices, 240+ engineers.`,
  });

  return (
    <>
      <PageHeader
        eyebrow="About us"
        crumbs={[{ label: 'About us' }]}
        title="We build the software we sell, and run it ourselves"
        lead={mission.body}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">Founded {site.founded}</Badge>
          <Badge tone="accent">{site.offices.length} offices</Badge>
          <Badge>240+ engineers</Badge>
          <Badge>24 countries</Badge>
        </div>
      </PageHeader>

      {/* story + facts */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Our story" title="Eleven years of the same argument" />
              <div className="mt-8 space-y-5">
                {story.map((para, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className="text-base leading-relaxed text-fg-muted text-pretty">{para}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.2}>
                <blockquote className="mt-10 rounded-2xl border-l-2 border-primary-500 bg-surface px-6 py-5">
                  <p className="font-display text-lg font-bold leading-snug text-fg text-balance">
                    {mission.statement}
                  </p>
                  <footer className="mt-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                    Our mission, unchanged since {site.founded}
                  </footer>
                </blockquote>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="rounded-3xl border border-line bg-surface p-7 lg:sticky lg:top-24">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-fg-subtle">
                  By the numbers
                </h3>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                  {companyFacts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-2xs uppercase tracking-wider text-fg-subtle">{f.label}</dt>
                      <dd className="mt-1 font-display text-2xl font-extrabold tracking-tight text-fg tnum">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-7 border-t border-line pt-6">
                  <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Certified</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {certifications.map((c) => (
                      <li key={c} className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-2xs font-semibold text-fg-muted">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* the record */}
      <Section tight className="border-y border-line bg-surface/50">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Reveal key={s.label}><Stat {...s} /></Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* values */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we hold to"
            title="Six values, each with a price attached"
            lead="A value that never costs anything is a slogan. These are the ones we have actually paid for, so the cost is written next to each."
          />
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {values.map((v) => (
              <div key={v.title} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-primary-500">
                  <v.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-bold leading-snug text-fg">{v.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted">{v.body}</p>
                <p className="mt-5 border-t border-line pt-4 text-xs italic text-fg-subtle">
                  What it costs us: {v.cost}
                </p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* timeline */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Timeline"
            title={`From four engineers to ${companyFacts[1].value}`}
            lead="The milestones that changed how the company works — not every press release."
          />
          <div className="relative mt-12">
            <div aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-[9px]" />
            <ol className="space-y-6">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={Math.min(i * 0.04, 0.3)}>
                  <li className="relative flex gap-6 pl-8 sm:pl-10">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-primary-500 bg-bg sm:h-5 sm:w-5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                    </span>
                    <div className="min-w-0 sm:flex sm:gap-8">
                      <p className="font-display text-sm font-extrabold tracking-tight text-primary-600 dark:text-primary-400 sm:w-16 sm:shrink-0 tnum">
                        {t.year}
                      </p>
                      <div className="mt-1 sm:mt-0">
                        <h3 className="font-display text-[17px] font-bold text-fg">{t.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{t.body}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* leadership */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="The people who answer for this"
            lead="Six people, each with a stated focus. If something in your engagement goes wrong, one of these names owns it."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {leadership.map((p) => (
              <div key={p.name} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white">
                    {p.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[15px] font-bold text-fg">{p.name}</h3>
                    <p className="truncate text-xs text-fg-subtle">{p.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-fg-muted">{p.bio}</p>
                <p className="mt-auto pt-5 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">
                  Focus — {p.focus}
                </p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* offices */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Where we are"
            title={`${site.offices.length} offices, one delivery model`}
            lead="Remote-first since 2020. The offices are available, not compulsory — and rosters are shifted so clients get their standup in the morning."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
            {site.offices.map((o) => (
              <div key={o.city} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-center justify-between gap-3">
                  <Building2 className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  <Badge tone={o.label === 'HQ' ? 'primary' : 'neutral'}>{o.label}</Badge>
                </div>
                <h3 className="mt-4 font-display text-[17px] font-bold text-fg">{o.city}</h3>
                <p className="text-xs text-fg-subtle">{o.country}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{o.address}</p>
                <p className="mt-auto pt-4 font-mono text-2xs text-fg-subtle">{o.tz}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* awards */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Recognition"
                title="Awards, kept in proportion"
                lead="Useful signal, not a substitute for the reference call. We will give you the phone number of a client in your industry."
              />
              <Button to="/case-studies" variant="secondary" size="md" className="mt-7" icon={ArrowRight}>
                See the work instead
              </Button>
            </div>
            <RevealGroup className="grid gap-3" step={0.06}>
              {awards.map((a) => (
                <div key={a.title} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent-500">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-2xs font-extrabold uppercase tracking-wider text-fg-subtle tnum">{a.year}</p>
                    <h3 className="mt-0.5 font-display text-[15px] font-bold text-fg">{a.title}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{a.body}</p>
                  </div>
                </div>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* client voice */}
      <Section className="border-t border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="In their words"
            title="What clients say when we are not in the room"
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3" step={0.07}>
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.author} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <Quote className="h-6 w-6 text-primary-500/40" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <span className="block text-xs font-bold text-fg">{t.author}</span>
                  <span className="block text-2xs text-fg-subtle">{t.role}, {t.company}</span>
                </figcaption>
              </figure>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        title="Come and see how we work"
        lead="Thirty minutes with an engineer who has built this before. You leave with a straight answer on fit, effort and cost — or a recommendation to go elsewhere."
        primary={{ label: 'Talk to us', to: '/contact' }}
        secondary={{ label: 'Work with us', to: '/careers' }}
      />
    </>
  );
}
