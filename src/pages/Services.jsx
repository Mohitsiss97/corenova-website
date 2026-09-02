import { Check, ArrowRight } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import { ServiceCard } from '../components/Cards';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, Accordion, cx,
} from '../components/ui';

import { services, primaryEngagementModels, process, serviceCount } from '../data/services';
import useSeo from '../hooks/useSeo';

const serviceFaqs = [
  { q: 'How quickly can a team start?', a: 'Discovery engagements start within 2 weeks. A dedicated team of 4–8 engineers is typically shortlisted in 10 working days and onboarded within 3 weeks of sign-off.' },
  { q: 'Who owns the code and IP?', a: 'You do, from the first commit. Code lives in your repository where you prefer it, and the contract assigns all IP to you with no licence-back clause.' },
  { q: 'Do you work in our timezone?', a: 'Yes. Teams commit to a minimum 4-hour overlap with your working day, and for US and EU clients we run shifted rosters so standups happen in your morning.' },
  { q: 'What if an engineer is not working out?', a: 'Tell us and we replace them within 2 weeks at no cost, with a paid handover overlap. No justification required and no contractual argument.' },
  { q: 'How do you price fixed-scope work?', a: 'After a paid discovery (1–2 weeks) that produces a written scope, architecture and estimate. If you take that document elsewhere, it is yours — the discovery fee is not conditional on awarding the build.' },
];

/** How many service lines get the expanded deliverables treatment. */
const DETAILED = 6;

export default function Services() {
  useSeo({
    title: `Services — ${serviceCount} lines, led by .NET`,
    description: 'Enterprise .NET engineering, custom software, mobile, cloud and DevOps, AI, data, QA, design, support and dedicated teams — staffed by standing practices.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Services"
        crumbs={[{ label: 'Services' }]}
        title={`${serviceCount} service lines. One team that has shipped this before.`}
        lead="Our largest practice is .NET — ASP.NET Core, MVC and Blazor, plus the migrations off .NET Framework that most estates still need. Around it sit nine more lines, all staffed by standing practices."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{serviceCount} service lines</Badge>
          <Badge tone="accent">3 engagement models</Badge>
          <Badge>You own the IP</Badge>
          <Badge>2-week swap guarantee</Badge>
        </div>
      </PageHeader>

      {/* service grid */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Pick the capability you are missing"
            lead="Each line below is staffed by a standing practice with a named lead — not assembled per project from whoever is on the bench."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.04}>
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </RevealGroup>
        </Container>
      </Section>

      {/* deliverables detail */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="What you actually receive"
            title="Deliverables, written into the statement of work"
            lead="Every engagement lists its artefacts up front. If it is not on this list, we have not promised it — and if it is, it ships."
          />
          <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-2" step={0.05}>
            {services.slice(0, DETAILED).map((s) => (
              <div key={s.slug} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent-500">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[15px] font-bold text-fg">{s.name}</h3>
                    <p className="mt-0.5 text-xs text-fg-subtle">{s.typical} · {s.engagements.join(' · ')}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">{s.description}</p>
                <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-fg-muted">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary-500" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealGroup>
          <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface p-6 text-center">
            <p className="text-sm text-fg-muted">
              {services.length - DETAILED} more lines — {services.slice(DETAILED).map((s) => s.name).join(', ')}.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {services.slice(DETAILED).map((s) => (
                <Button key={s.slug} to={`/services/${s.slug}`} variant="secondary" size="sm">{s.name}</Button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* engagement models */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Commercials"
            title="Three ways to engage — and honest guidance on which"
            lead="We will tell you when fixed-scope is wrong for your project, even though it is the easier contract to sign."
          />
          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3" step={0.07}>
            {primaryEngagementModels.map((m, i) => (
              <div
                key={m.name}
                className={cx(
                  'flex h-full flex-col rounded-2xl border p-7',
                  i === 1 ? 'ring-gradient border-primary-500/30 bg-surface shadow-soft' : 'border-line bg-surface',
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
                <Button to="/contact" variant={i === 1 ? 'primary' : 'secondary'} size="md" className="mt-7 w-full">
                  Discuss this model
                </Button>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* process timeline */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Delivery method"
            title="Six stages from first call to steady state"
            lead="Working software from week five, a demo every two weeks, and a documented cutover with a rollback plan you never hope to use."
            action={<Button to="/process" variant="secondary" icon={ArrowRight}>Full method</Button>}
          />

          <div className="relative mt-12">
            <div aria-hidden="true" className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line lg:block" />
            <ol className="space-y-4">
              {process.map((p, i) => (
                <Reveal key={p.step} delay={i * 0.05}>
                  <li className="relative flex gap-5 rounded-2xl border border-line bg-surface p-6 lg:ml-0">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface font-display text-xs font-extrabold text-primary-500">
                      {p.step}
                    </span>
                    <div className="min-w-0 flex-1 sm:flex sm:items-start sm:gap-8">
                      <div className="sm:w-44 sm:shrink-0">
                        <h3 className="font-display text-[17px] font-bold text-fg">{p.name}</h3>
                        <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{p.duration}</p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:mt-0">{p.detail}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* faq */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
            <SectionHeading
              eyebrow="Questions"
              title="Before you brief us"
              lead="The five things procurement and engineering leads ask on the first call."
            />
            <Reveal><Accordion items={serviceFaqs} /></Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Bring us the problem, not the spec"
        lead="Tell us what is broken and what good looks like. We will come back with an approach, an effort range and the risks we can see."
        primary={{ label: 'Brief our team', to: '/contact' }}
        secondary={{ label: 'See our work', to: '/case-studies' }}
      />
    </>
  );
}
