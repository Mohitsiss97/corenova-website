import { useParams, Link } from 'react-router-dom';
import { Check, ArrowRight, Clock, Handshake } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import NotFound from './NotFound';
import { CtaBand } from '../components/layout/Footer';
import { CaseStudyCard, ServiceCard } from '../components/Cards';
import TechLogo from '../components/TechLogo';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup,
  Badge, Accordion, cx,
} from '../components/ui';

import { services, getService, engagementModels } from '../data/services';
import { caseStudiesForService } from '../data/content';
import useSeo from '../hooks/useSeo';

export default function ServiceDetail() {
  const { serviceSlug } = useParams();
  const service = getService(serviceSlug);

  // Hooks must run on every render, so this sits above the early return.
  useSeo(service ? { title: service.name, description: service.description } : undefined);

  // Unknown slug behaves exactly like any other bad URL.
  if (!service) return <NotFound />;

  const related = caseStudiesForService(service.slug);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  // service.engagements is written in sentence case while engagementModels uses
  // title case, so match on a normalised key rather than exact strings.
  const norm = (v) => v.toLowerCase().replace(/\s+/g, ' ').trim();
  const wanted = new Set(service.engagements.map(norm));
  const models = engagementModels.filter((m) => wanted.has(norm(m.name)));

  return (
    <>
      <PageHeader
        eyebrow="Service"
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.name }]}
        title={service.name}
        lead={service.description}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary" icon={Clock}>{service.typical}</Badge>
          {service.engagements.map((e) => (
            <Badge key={e} icon={Handshake}>{e}</Badge>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/contact" size="lg" icon={ArrowRight}>Brief our team</Button>
          <Button to="/demo" size="lg" variant="secondary">Book a call</Button>
        </div>
      </PageHeader>

      {/* outcomes */}
      <Section tight>
        <Container>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {service.outcomes.map((o) => (
              <div key={o.label} className="bg-surface px-6 py-7">
                <p className="font-display text-3xl font-extrabold tracking-tight text-gradient tnum">{o.metric}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{o.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* deliverables */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="What you receive"
            title="Deliverables, written into the statement of work"
            lead="If it is not on this list we have not promised it — and if it is, it ships."
          />
          <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" step={0.04}>
            {service.deliverables.map((d) => (
              <div key={d} className="flex items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                <span className="text-sm font-medium text-fg">{d}</span>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* approach */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How we run it"
            title="The approach, stage by stage"
            lead="Written down so you can hold us to it — and so you know what is happening in any given week."
          />
          <div className="relative mt-10">
            <div aria-hidden="true" className="absolute left-[19px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-line lg:block" />
            <ol className="space-y-3">
              {service.approach.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.05}>
                  <li className="relative flex gap-5 rounded-2xl border border-line bg-surface p-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface font-display text-xs font-extrabold text-primary-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1 sm:flex sm:items-start sm:gap-8">
                      <h3 className="font-display text-[17px] font-bold text-fg sm:w-56 sm:shrink-0">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:mt-0">{step.detail}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* stack */}
      {service.stack.length > 0 && (
        <Section className="border-y border-line bg-surface/50">
          <Container>
            <SectionHeading
              eyebrow="Technology"
              title="What we build this with"
              lead="The tools this practice uses day to day. We adapt to your stack where you already have one."
              action={<Button to="/technologies" variant="secondary" icon={ArrowRight}>Full stack</Button>}
            />
            <Reveal className="mt-10">
              <ul className="flex flex-wrap gap-2">
                {service.stack.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5"
                  >
                    <TechLogo name={name} size={18} fallback={false} />
                    <span className="font-mono text-[13px] font-medium text-fg">{name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* engagement models */}
      {models.length > 0 && (
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Commercials"
            title="How this work is usually contracted"
            lead="These are the models that fit this kind of work. We will tell you when the easy contract is the wrong one."
          />
          <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" step={0.07}>
            {models.map((m, i) => (
              <div
                key={m.name}
                className={cx(
                  'flex h-full flex-col rounded-2xl border p-7',
                  i === 0 ? 'ring-gradient border-primary-500/30 bg-surface shadow-soft' : 'border-line bg-surface',
                )}
              >
                <h3 className="font-display text-lg font-bold text-fg">{m.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-fg-subtle">
                  <span className="font-semibold text-fg-muted">Best for:</span> {m.best}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {m.bullets.map((b) => (
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
      )}

      {/* proof */}
      {related.length > 0 && (
        <Section className="border-y border-line bg-surface/50">
          <Container>
            <SectionHeading
              eyebrow="Proof"
              title="Where we have done this"
              lead="Named clients, measured outcomes. Reference calls available on request."
              action={<Button to="/case-studies" variant="secondary" icon={ArrowRight}>All case studies</Button>}
            />
            <RevealGroup className="mt-10 grid gap-4 lg:grid-cols-2" step={0.07}>
              {related.map((c) => <CaseStudyCard key={c.slug} study={c} />)}
            </RevealGroup>
          </Container>
        </Section>
      )}

      {/* faq */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Questions"
                title="What buyers ask about this service"
                lead="If yours is not here, ask — you get a reply from an engineer, not a sales sequence."
              />
              <Button to="/contact" variant="secondary" size="md" className="mt-7" icon={ArrowRight}>
                Ask a question
              </Button>
            </div>
            <Reveal><Accordion items={service.faqs} /></Reveal>
          </div>
        </Container>
      </Section>

      {/* other services */}
      <Section tight className="border-t border-line bg-surface/50">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-xl font-bold text-fg">Other service lines</h2>
            <Link to="/services" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
              See all {services.length}
            </Link>
          </div>
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {others.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        title={`Talk to the ${service.name} team`}
        lead="Bring the problem, not a spec. You get an approach, an effort range and the risks we can already see."
        primary={{ label: 'Brief our team', to: '/contact' }}
        secondary={{ label: 'Book a call', to: '/demo' }}
      />
    </>
  );
}
