import { useParams, Link } from 'react-router-dom';
import { Quote, ArrowRight, Calendar, Clock, Users, Building2 } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import NotFound from './NotFound';
import { CtaBand } from '../components/layout/Footer';
import { CaseStudyCard } from '../components/Cards';
import TechLogo from '../components/TechLogo';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge,
} from '../components/ui';

import { caseStudies, getCaseStudy } from '../data/content';
import { getService } from '../data/services';
import { getIndustry } from '../data/industries';
import useSeo from '../hooks/useSeo';

function MetaItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-fg">{value}</p>
      </div>
    </div>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  useSeo(study ? { title: `${study.client} case study`, description: study.summary } : undefined);

  if (!study) return <NotFound />;

  const industry = getIndustry(study.industry);
  const linkedServices = (study.services ?? []).map(getService).filter(Boolean);
  const related = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <>
      <PageHeader
        eyebrow={`Case study · ${study.client}`}
        crumbs={[{ label: 'Case studies', to: '/case-studies' }, { label: study.client }]}
        title={study.title}
        lead={study.summary}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{study.client}</Badge>
          {industry && <Badge tone="accent">{industry.name}</Badge>}
          <Badge>{study.year}</Badge>
        </div>
      </PageHeader>

      {/* results — the reason anyone opens a case study */}
      <Section tight>
        <Container>
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {study.results.map((r) => (
                <div key={r.label} className="bg-surface px-6 py-7">
                  <p className="font-display text-3xl font-extrabold tracking-tight text-gradient tnum">{r.metric}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{r.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* narrative + sidebar */}
      <Section tight>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] lg:gap-14">
            <div className="space-y-10">
              <Reveal>
                <section>
                  <h2 className="flex items-center gap-3 font-display text-xl font-bold text-fg">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-danger/10 text-xs font-extrabold text-danger">01</span>
                    The challenge
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-fg-muted text-pretty">{study.challenge}</p>
                </section>
              </Reveal>

              <Reveal delay={0.06}>
                <section>
                  <h2 className="flex items-center gap-3 font-display text-xl font-bold text-fg">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-500/10 text-xs font-extrabold text-primary-500">02</span>
                    What we did
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-fg-muted text-pretty">{study.solution}</p>
                </section>
              </Reveal>

              {/* The numbers already lead the page, so this section carries the
                  client's own account of the outcome rather than repeating them. */}
              <Reveal delay={0.12}>
                <section>
                  <h2 className="flex items-center gap-3 font-display text-xl font-bold text-fg">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-success/10 text-xs font-extrabold text-success">03</span>
                    The result, in their words
                  </h2>
                  <figure className="ring-gradient relative mt-4 overflow-hidden rounded-2xl border border-line bg-surface p-7 sm:p-8">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br from-primary-500/18 to-transparent blur-3xl"
                    />
                    <Quote className="relative h-7 w-7 text-primary-500/40" aria-hidden="true" />
                    <blockquote className="relative mt-4 font-display text-lg font-semibold leading-relaxed text-fg text-balance sm:text-xl">
                      “{study.quote}”
                    </blockquote>
                    <figcaption className="relative mt-5 text-sm text-fg-muted">— {study.author}</figcaption>
                  </figure>
                </section>
              </Reveal>
            </div>

            {/* sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <h2 className="font-display text-base font-bold text-fg">Engagement</h2>
                  <div className="mt-5 space-y-4">
                    <MetaItem icon={Building2} label="Client" value={study.client} />
                    {industry && <MetaItem icon={Building2} label="Industry" value={industry.name} />}
                    <MetaItem icon={Calendar} label="Delivered" value={study.year} />
                    <MetaItem icon={Clock} label="Duration" value={study.duration} />
                    <MetaItem icon={Users} label="Team" value={study.team} />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <h2 className="font-display text-base font-bold text-fg">Stack used</h2>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {study.stack.map((name) => (
                      <li
                        key={name}
                        className="flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-2xs text-fg-muted"
                      >
                        <TechLogo name={name} size={14} fallback={false} />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {linkedServices.length > 0 && (
                <Reveal delay={0.15}>
                  <div className="rounded-2xl border border-line bg-surface p-6">
                    <h2 className="font-display text-base font-bold text-fg">Services involved</h2>
                    <ul className="mt-4 space-y-2">
                      {linkedServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/services/${s.slug}`}
                            className="group flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3 transition-colors hover:border-primary-500/40"
                          >
                            <s.icon className="h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-fg">{s.name}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.2}>
                <div className="ring-gradient rounded-2xl border border-line bg-surface-2 p-6">
                  <h2 className="font-display text-base font-bold text-fg">Want to speak to them?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    We arrange reference calls with clients who have agreed to take them. Ask and we will make the introduction.
                  </p>
                  <Button to="/contact" size="md" className="mt-5 w-full" icon={ArrowRight}>Request a reference</Button>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      {/* related */}
      <Section className="border-t border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="More proof"
            title="Other rollouts worth reading"
            action={<Button to="/case-studies" variant="secondary" icon={ArrowRight}>All case studies</Button>}
          />
          <RevealGroup className="mt-10 grid gap-4 lg:grid-cols-2" step={0.07}>
            {related.map((c) => <CaseStudyCard key={c.slug} study={c} />)}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        title="Have a similar problem?"
        lead="Tell us where you are starting from. We will say honestly whether this pattern fits, and what it would take."
        primary={{ label: 'Talk to an engineer', to: '/contact' }}
        secondary={{ label: 'See our services', to: '/services' }}
      />
    </>
  );
}
