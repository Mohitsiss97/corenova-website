import { ArrowRight, ShieldCheck, Check } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import { IndustryCard, CaseStudyCard } from '../components/Cards';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge,
} from '../components/ui';

import { industries, industryCount, complianceCoverage } from '../data/industries';
import { platformFeatures, caseStudies } from '../data/content';
import { productCount } from '../data/products';
import useSeo from '../hooks/useSeo';

/** Case studies that map onto one of the nine verticals, most recent first. */
const industrySlugs = new Set(industries.map((i) => i.slug));
const featuredStudies = caseStudies
  .filter((c) => industrySlugs.has(c.industry))
  .slice(0, 3);

export default function Industries() {
  useSeo({
    title: 'Industries',
    description: `${industryCount} verticals with measured outcomes — manufacturing, retail, banking, healthcare, education, logistics, construction, hospitality and professional services.`,
  });

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        crumbs={[{ label: 'Industries' }]}
        title={`${industryCount} industries, and the numbers we actually moved`}
        lead="Every vertical below lists the problems we hear on the first call and the outcomes we have measured on real deployments. Where a number came from one client, the case study is linked."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{industryCount} verticals</Badge>
          <Badge tone="accent">{productCount} products behind them</Badge>
          <Badge icon={ShieldCheck}>ISO 27001 · SOC 2 Type II</Badge>
        </div>
      </PageHeader>

      {/* the grid */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Where we work"
            title="Pick the one that sounds like your week"
            lead="Each card shows two measured outcomes. Open one and you get the workflow, the recommended stack and the regulatory load that shapes the build."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.04}>
            {industries.map((i) => <IndustryCard key={i.slug} industry={i} />)}
          </RevealGroup>
        </Container>
      </Section>

      {/* cross-industry platform */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="What every industry gets"
            title="The platform underneath all nine"
            lead="Vertical depth sits on top of one platform. These capabilities are not per-industry features — they are the floor, in every product and at every price point."
            action={<Button to="/products" variant="secondary" icon={ArrowRight}>See the catalog</Button>}
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {platformFeatures.map((f) => (
              <div key={f.title} className="flex h-full gap-3.5 rounded-2xl border border-line bg-surface p-6">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-[15px] font-bold leading-snug text-fg">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
                </div>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* compliance */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Regulatory coverage"
                title="The controls that apply everywhere"
                lead="Industry-specific regulation is covered on each vertical page. This is the baseline that ships regardless of which one you are in."
              />
              <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface p-6">
                <p className="text-sm leading-relaxed text-fg-muted">
                  Security is not a pricing tier here. SSO, MFA, granular RBAC, encryption at rest and
                  immutable audit logging ship in every product on every plan — regulated customers do not
                  get a special edition and small customers do not get a weakened one.
                </p>
                <Button to="/security" variant="secondary" size="md" className="mt-5" icon={ArrowRight}>
                  Security and compliance detail
                </Button>
              </div>
            </div>

            <RevealGroup className="grid gap-3 sm:grid-cols-2" step={0.05}>
              {complianceCoverage.map((c) => (
                <div key={c.name} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                    <h3 className="font-display text-[15px] font-bold text-fg">{c.name}</h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{c.detail}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* proof */}
      <Section className="border-t border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Proof"
            title="Named clients, measured outcomes"
            lead="The numbers on the cards above come from deployments like these. Reference calls are available on request."
            action={<Button to="/case-studies" variant="secondary" icon={ArrowRight}>All case studies</Button>}
          />
          <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3" step={0.07}>
            {featuredStudies.map((c) => <CaseStudyCard key={c.slug} study={c} />)}
          </RevealGroup>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line-strong bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm text-fg-muted">
                Not seeing your industry? The platform is the same underneath. Tell us the workflow and we
                will say honestly whether we have done it before or would be learning on your budget.
              </p>
              <Button to="/contact" variant="secondary" size="md" icon={ArrowRight} className="shrink-0">
                Describe your workflow
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Bring us your industry problem"
        lead="Thirty minutes with an engineer who has built in your vertical. You leave with an approach, an effort range and the regulatory constraints we can already see."
        primary={{ label: 'Talk to an engineer', to: '/contact' }}
        secondary={{ label: 'Browse the products', to: '/products' }}
      />
    </>
  );
}
