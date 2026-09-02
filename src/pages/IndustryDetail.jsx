import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, ShieldCheck, TriangleAlert, Check } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import NotFound from './NotFound';
import { CtaBand } from '../components/layout/Footer';
import { ProductCard, CaseStudyCard, IndustryCard } from '../components/Cards';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup,
} from '../components/ui';

import { industries, getIndustry, industryCount } from '../data/industries';
import { caseStudiesForIndustry } from '../data/content';
import { getProduct, products } from '../data/products';
import useSeo from '../hooks/useSeo';

export default function IndustryDetail() {
  const { industrySlug } = useParams();
  const industry = getIndustry(industrySlug);

  // Hooks must run on every render, so this sits above the early return.
  useSeo(industry
    ? { title: industry.name, description: industry.description }
    : undefined);

  // An unknown slug behaves exactly like any other bad URL.
  if (!industry) return <NotFound />;

  // The curated stack comes from the industry record; anything the product
  // catalog itself tags for this vertical is offered as a wider set.
  const stack = industry.products.map(getProduct).filter(Boolean);
  const stackSlugs = new Set(stack.map((p) => p.slug));
  const alsoUsed = products
    .filter((p) => p.industries?.includes(industry.slug) && !stackSlugs.has(p.slug))
    .slice(0, 4);

  const studies = caseStudiesForIndustry(industry.slug);
  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Industry"
        crumbs={[{ label: 'Industries', to: '/industries' }, { label: industry.name }]}
        title={industry.tagline}
        lead={industry.description}
      >
        <div>
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
            What we hear on the first call
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {industry.pains.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 rounded-xl border border-warning/25 bg-warning/10 px-3.5 py-2 text-xs font-medium text-fg-muted"
              >
                <TriangleAlert className="h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/contact" size="lg" icon={ArrowRight}>Talk to an engineer</Button>
          <Button to="/demo" size="lg" variant="secondary">Book a demo</Button>
        </div>
      </PageHeader>

      {/* outcomes */}
      <Section tight>
        <Container>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {industry.outcomes.map((o) => (
              <div key={o.label} className="bg-surface px-6 py-7">
                <p className="font-display text-3xl font-extrabold tracking-tight text-gradient tnum">{o.metric}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{o.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-fg-subtle">
            Measured on live deployments. Where a figure comes from a single client, that case study is
            linked further down this page.
          </p>
        </Container>
      </Section>

      {/* workflow */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="The workflow"
            title={`How work actually moves through ${industry.name.toLowerCase()}`}
            lead="Software that does not match this sequence gets worked around. Each stage below is a place where the data has to arrive intact, not a module name."
          />

          <ol className="mt-12 space-y-3">
            {industry.workflow.map((w, i) => (
              <Reveal key={w.stage} delay={Math.min(i * 0.05, 0.3)}>
                <li className="relative">
                  <div className="flex gap-5 rounded-2xl border border-line bg-surface p-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface font-display text-xs font-extrabold text-primary-500 tnum">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1 sm:flex sm:items-start sm:gap-8">
                      <h3 className="font-display text-[17px] font-bold text-fg sm:w-52 sm:shrink-0">{w.stage}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:mt-0">{w.detail}</p>
                    </div>
                  </div>
                  {i < industry.workflow.length - 1 && (
                    <div className="flex justify-center py-1" aria-hidden="true">
                      <ArrowDown className="h-4 w-4 text-fg-subtle" />
                    </div>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* recommended stack */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Recommended stack"
            title={`What we would put in front of a ${industry.name.toLowerCase()} client`}
            lead="A starting point, not a bundle. Products are licensed independently and most clients begin with one or two before adding the rest."
            action={<Button to="/products" variant="secondary" icon={ArrowRight}>All products</Button>}
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.05}>
            {stack.map((p) => <ProductCard key={p.slug} product={p} />)}
          </RevealGroup>

          {alsoUsed.length > 0 && (
            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface p-6">
                <p className="text-sm text-fg-muted">
                  Also commonly deployed in {industry.name.toLowerCase()}:
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {alsoUsed.map((p) => (
                    <Button key={p.slug} to={`/products/${p.category}/${p.slug}`} variant="secondary" size="sm">
                      {p.name}
                    </Button>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* compliance */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Regulatory load"
            title="What the regulation actually demands here"
            lead="Compliance shapes the architecture, not the marketing page. These are the constraints that change how the system is built for this vertical."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2" step={0.05}>
            {industry.compliance.map((c) => (
              <div key={c.name} className="flex h-full gap-3.5 rounded-2xl border border-line bg-surface p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-primary-500">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[15px] font-bold leading-snug text-fg">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.detail}</p>
                </div>
              </div>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm text-fg-muted">
                On top of this sits the baseline every product carries — ISO 27001, SOC 2 Type II, GDPR,
                immutable audit logging and your choice of data residency.
              </p>
              <Button to="/security" variant="secondary" size="md" icon={ArrowRight} className="shrink-0">
                Security detail
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* proof */}
      {studies.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Proof"
              title={`Where we have done this in ${industry.name.toLowerCase()}`}
              lead="Named clients and measured outcomes. We will give you the phone number of a reference in your vertical."
              action={<Button to="/case-studies" variant="secondary" icon={ArrowRight}>All case studies</Button>}
            />
            <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-2" step={0.07}>
              {studies.map((c) => <CaseStudyCard key={c.slug} study={c} />)}
            </RevealGroup>
          </Container>
        </Section>
      )}

      {/* what a rollout looks like */}
      <Section className="border-t border-line bg-surface/50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Getting started"
                title="What the first ninety days look like"
                lead="No vertical is a template, but the shape of a rollout is consistent enough to plan against."
              />
              <Button to="/process" variant="secondary" size="md" className="mt-7" icon={ArrowRight}>
                The full delivery method
              </Button>
            </div>
            <RevealGroup className="grid gap-3" step={0.06}>
              {[
                { title: 'Weeks 1–2 · Discovery', body: `Interviews with the people doing the work today, a current-state audit, and a written problem statement specific to ${industry.name.toLowerCase()}.` },
                { title: 'Weeks 3–6 · Design and first increment', body: 'Architecture, data model and migration plan agreed, with the first working slice deployed to an environment you control.' },
                { title: 'Weeks 7–12 · Build and dry runs', body: 'Fortnightly demos against real data, plus two full dry-run migrations before anything touches production.' },
                { title: 'Week 13 onward · Phased go-live', body: 'Rollout by site or department with the build team on call, then hypercare judged on month-two ticket volume.' },
              ].map((s) => (
                <div key={s.title} className="flex items-start gap-3.5 rounded-2xl border border-line bg-surface p-5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="font-display text-[15px] font-bold text-fg">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                  </div>
                </div>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* other industries */}
      <Section tight className="border-t border-line bg-surface/50">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-xl font-bold text-fg">Other industries</h2>
            <Link to="/industries" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
              See all {industryCount}
            </Link>
          </div>
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {others.map((i) => <IndustryCard key={i.slug} industry={i} />)}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        title={`Talk to someone who has built for ${industry.name.toLowerCase()}`}
        lead="Bring the workflow and the regulator, not a feature list. You get an approach, an effort range and the constraints we can already see."
        primary={{ label: 'Brief our team', to: '/contact' }}
        secondary={{ label: 'Book a demo', to: '/demo' }}
      />
    </>
  );
}
