import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

import Hero from '../components/sections/Hero';
import { CtaBand } from '../components/layout/Footer';
import { CategoryCard, ServiceCard, IndustryCard, CaseStudyCard, TestimonialCard } from '../components/Cards';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup,
  Marquee, Accordion, ArrowLink, Badge, cx,
} from '../components/ui';

import { clientLogos } from '../data/site';
import { categories, productCount, categoryCount } from '../data/products';
import { services, process, serviceCount } from '../data/services';
import { industries } from '../data/industries';
import { techCount, featuredGroup, otherGroups } from '../data/technologies';
import { brand } from '../data/brand';
import TechLogo from '../components/TechLogo';
import useSeo from '../hooks/useSeo';
import { buyerPaths, differentiators, platformFeatures, caseStudies, testimonials, plans, faqs } from '../data/content';

export default function Home() {
  useSeo();

  return (
    <>
      <Hero />

      {/* ---------------------------------------------------- trust bar */}
      <section className="border-y border-line bg-surface/60 py-10">
        <Container>
          <p className="text-center text-2xs font-bold uppercase tracking-[0.16em] text-fg-subtle">
            Trusted by 620+ teams — from 40-person distributors to 12,000-seat hospital groups
          </p>
        </Container>
        <Marquee
          className="mt-7"
          duration={48}
          items={clientLogos}
          render={(name) => (
            <span className="flex h-11 items-center rounded-xl border border-line bg-surface px-6 font-display text-sm font-bold tracking-tight text-fg-subtle transition-colors hover:text-fg">
              {name}
            </span>
          )}
        />
      </section>

      {/* ---------------------------------------------------- buyer routing */}
      <Section>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Start where you are"
            title="Three ways in. Pick the one that sounds like you."
            lead="Most companies arrive needing one of these three things. Each path leads somewhere concrete — not a contact form."
          />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {buyerPaths.map((p) => (
              <div key={p.key} className="ring-gradient group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 ease-spring hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white shadow-soft">
                  <p.icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-fg">{p.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted">{p.body}</p>
                <p className="mt-5 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{p.meta}</p>
                <Button to={p.cta.to} variant="secondary" size="md" icon={ArrowRight} className="mt-4 w-full">
                  {p.cta.label}
                </Button>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------------------------------------------- categories */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="The catalog"
            title={`${categoryCount} software categories. ${productCount} products in production.`}
            lead="Every category below is a shipped, supported product line — not a capability slide. Browse by what you need to fix."
            action={<Button to="/products" variant="secondary" icon={ArrowRight}>See all products</Button>}
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.035}>
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------------------------------------------- bento: why us */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={`Why ${brand.name}`}
            title="A product company that also builds custom — which is rarer than it sounds."
            lead="Most vendors are one or the other. Running both is why our custom work starts at 60% complete."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06} className={cx(d.span === 'lg' ? 'lg:col-span-2' : 'lg:col-span-1')}>
                <div className="ring-gradient relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-primary-500/12 to-transparent blur-2xl"
                  />
                  <p className="relative font-display text-3xl font-extrabold tracking-tight text-gradient">{d.stat}</p>
                  <p className="relative text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{d.statLabel}</p>
                  <h3 className="relative mt-5 font-display text-[17px] font-bold text-fg">{d.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-fg-muted">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* platform strip */}
          <Reveal delay={0.1}>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface-2">
              <div className="flex flex-wrap items-center gap-3 border-b border-line px-7 py-5">
                <Badge tone="primary" icon={Sparkles}>One platform</Badge>
                <p className="text-sm font-semibold text-fg">Every product shares the same spine</p>
              </div>
              <ul className="grid divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
                {platformFeatures.map((f) => (
                  <li key={f.title} className="border-b border-line p-6 last:border-0 sm:[&:nth-last-child(-n+1)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0">
                    <div className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-bold text-fg">{f.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-fg-muted">{f.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------- services */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title={`${serviceCount} service lines, one delivery team`}
            lead="From a two-week discovery to a 30-person embedded squad. Same engineers, same standards, whichever you pick."
            action={<Button to="/services" variant="secondary" icon={ArrowRight}>All services</Button>}
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" step={0.04}>
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------------------------------------------- industries */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="We speak your industry's vocabulary"
            lead="Nine verticals where we have shipped repeatedly — with the regulatory, workflow and integration realities already handled."
            action={<Button to="/industries" variant="secondary" icon={ArrowRight}>All industries</Button>}
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {industries.map((i) => <IndustryCard key={i.slug} industry={i} />)}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------------------------------------------- case studies */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Proof"
            title="Numbers from real rollouts"
            lead="Every case study names the client, the starting problem and the measured outcome. Reference calls available on request."
            action={<Button to="/case-studies" variant="secondary" icon={ArrowRight}>All case studies</Button>}
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <CaseStudyCard study={caseStudies[0]} featured />
            </Reveal>
            <div className="grid gap-4">
              <Reveal delay={0.08}><CaseStudyCard study={caseStudies[1]} /></Reveal>
              <Reveal delay={0.14}><CaseStudyCard study={caseStudies[2]} /></Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------- technologies */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Technology"
            title={`${techCount}+ technologies we run in production`}
            lead="Every mark below has a named practice lead and at least one live production system behind it — not an aspirational list."
            action={<Button to="/technologies" variant="secondary" icon={ArrowRight}>Full stack breakdown</Button>}
          />
          {/* Lead practice gets its own band above the rest of the stack. */}
          <Reveal className="mt-12">
            <Link
              to="/technologies#dotnet"
              className="group ring-gradient relative block overflow-hidden rounded-2xl border-2 border-primary-500/30 bg-surface p-7 transition-all duration-300 ease-spring hover:-translate-y-1 hover:shadow-lift sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-[#512BD4]/25 to-transparent blur-3xl"
              />
              <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-10">
                <div>
                  <div className="flex items-center gap-3">
                    <img src={`${import.meta.env.BASE_URL}logos/dotnet.svg`} alt="" aria-hidden="true" width={36} height={36} className="rounded-lg" />
                    <Badge tone="primary">Lead practice</Badge>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-fg">{featuredGroup.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{featuredGroup.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400">
                    See the full .NET stack
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {featuredGroup.items.map((t) => (
                    <span
                      key={t.name}
                      className="flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-2xs text-fg-muted"
                    >
                      <TechLogo name={t.name} size={13} fallback={false} />
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>

          <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.04}>
            {otherGroups.map((g) => (
              <Link
                key={g.id}
                to={`/technologies#${g.id}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-lift"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-cyan-500">
                    <g.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-[15px] font-bold text-fg">{g.name}</h3>
                </div>
                <p className="mt-3.5 text-xs leading-relaxed text-fg-muted">{g.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.slice(0, 6).map((t) => (
                    <span
                      key={t.name}
                      className="flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-2xs text-fg-muted"
                    >
                      <TechLogo name={t.name} size={13} fallback={false} />
                      {t.name}
                    </span>
                  ))}
                  {g.items.length > 6 && (
                    <span className="rounded-md border border-dashed border-line px-2 py-1 font-mono text-2xs text-fg-subtle">
                      +{g.items.length - 6}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------------------------------------------- process */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Six stages, and you see working software from week five"
            lead="No 12-week requirements phase. Discovery is written down, design is prototyped, and every sprint ends in a demo you can click."
            action={<Button to="/process" variant="secondary" icon={ArrowRight}>The full method</Button>}
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {process.map((p) => (
              <div key={p.step} className="relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-primary-500/25">{p.step}</span>
                  <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-2xs font-semibold text-fg-subtle">
                    {p.duration}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[17px] font-bold text-fg">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.detail}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------------------------------------------- testimonials */}
      <Section>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="In their words"
            title="What buyers say after go-live"
            lead="Collected at the 6-month mark, when the honeymoon is over and the real opinion has formed."
          />
        </Container>
        <div className="mt-12 space-y-4">
          <Marquee duration={70} items={testimonials} render={(t) => <TestimonialCard t={t} />} />
          <Marquee duration={86} items={[...testimonials].reverse()} render={(t) => <TestimonialCard t={t} />} />
        </div>
      </Section>

      {/* ---------------------------------------------------- pricing teaser */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title="Published prices. No 'contact us' for the first two tiers."
            lead="Annual billing shown. Every plan includes upgrades, migration tooling and the same security controls."
          />
          <RevealGroup className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3" step={0.07}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cx(
                  'relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300',
                  plan.highlight
                    ? 'ring-gradient border-primary-500/30 bg-surface shadow-lift lg:-mt-3 lg:mb-3'
                    : 'border-line bg-surface',
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-2xs font-bold uppercase tracking-wider text-white shadow-soft">
                    Most chosen
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-fg">{plan.name}</h3>
                <p className="mt-1 text-xs text-fg-muted">{plan.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  {plan.annual != null ? (
                    <>
                      <span className="font-display text-4xl font-extrabold tracking-tight text-fg tnum">${plan.annual}</span>
                      <span className="text-xs text-fg-subtle">{plan.unit}</span>
                    </>
                  ) : (
                    <span className="font-display text-3xl font-extrabold tracking-tight text-fg">Custom</span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.slice(0, 6).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-fg-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  to={plan.annual != null ? '/demo' : '/contact'}
                  variant={plan.highlight ? 'primary' : 'secondary'}
                  size="md"
                  className="mt-7 w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </RevealGroup>
          <div className="mt-8 text-center">
            <ArrowLink to="/pricing">Compare all features and run the ROI calculator</ArrowLink>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------- faq */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Questions"
                title="The things buyers actually ask"
                lead="Straight answers. If yours is not here, ask us directly — you will get a reply from an engineer."
              />
              <Button to="/contact" variant="secondary" size="md" className="mt-7" icon={ArrowRight}>
                Ask a question
              </Button>
            </div>
            <Reveal><Accordion items={faqs} /></Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
