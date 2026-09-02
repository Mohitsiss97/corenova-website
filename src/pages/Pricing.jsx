import { Fragment, useMemo, useState } from 'react';
import { Check, X, Minus, ArrowRight, Info } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup,
  Badge, Accordion, Counter, cx,
} from '../components/ui';
import useSeo from '../hooks/useSeo';

import { plans } from '../data/content';
import { featureMatrix, roiDefaults, roiBounds, pricingFaqs, notIncluded } from '../data/pricing';

const KEYS = ['starter', 'growth', 'enterprise'];

/**
 * Renders a matrix value: boolean becomes an icon, string stays as text.
 * The icon carries its own label — an `sr-only` span here would be
 * absolutely positioned, escape the table's horizontal scroll container and
 * widen the whole document on narrow screens.
 */
function Cell({ value }) {
  if (value === true) {
    return <Check className="mx-auto h-4 w-4 text-success" role="img" aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className="mx-auto h-4 w-4 text-fg-subtle/50" role="img" aria-label="Not included" />;
  }
  return <span className="text-fg-muted">{value}</span>;
}

function Slider({ id, bound, value, onChange }) {
  const display = `${bound.prefix ?? ''}${value.toLocaleString('en-US')}${bound.suffix ?? ''}`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-xs font-semibold text-fg">{bound.label}</label>
        <span className="font-display text-sm font-bold text-fg tnum">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={bound.min}
        max={bound.max}
        step={bound.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-primary-500"
      />
      <div className="mt-1 flex justify-between text-2xs text-fg-subtle tnum">
        <span>{bound.prefix ?? ''}{bound.min}{bound.suffix ?? ''}</span>
        <span>{bound.prefix ?? ''}{bound.max.toLocaleString('en-US')}{bound.suffix ?? ''}</span>
      </div>
    </div>
  );
}

export default function Pricing() {
  useSeo({
    title: 'Pricing',
    description: 'Published prices for the first two tiers, a full feature comparison and an ROI calculator you can argue with. Upgrades, migration tooling and security controls are included in every plan.',
  });

  const [annual, setAnnual] = useState(true);
  const [roi, setRoi] = useState(roiDefaults);
  const set = (k) => (v) => setRoi((r) => ({ ...r, [k]: v }));

  const result = useMemo(() => {
    const { teamSize, hoursPerWeek, hourlyCost, reductionPct, seatPrice } = roi;
    const hoursSaved = teamSize * hoursPerWeek * 46 * (reductionPct / 100); // 46 working weeks
    const valueRecovered = hoursSaved * hourlyCost;
    const platformCost = teamSize * seatPrice * 12;
    const net = valueRecovered - platformCost;
    const paybackMonths = net > 0 ? Math.max(1, Math.round((platformCost / valueRecovered) * 12)) : null;
    return {
      hoursSaved: Math.round(hoursSaved),
      valueRecovered: Math.round(valueRecovered),
      platformCost: Math.round(platformCost),
      net: Math.round(net),
      paybackMonths,
    };
  }, [roi]);

  const money = (n) => `$${Math.abs(n).toLocaleString('en-US')}`;

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        crumbs={[{ label: 'Pricing' }]}
        title="Published prices. No “contact us” for the first two tiers."
        lead="Every plan includes product upgrades, migration tooling and the same security controls. What changes between tiers is scale, deployment choice and how fast we answer."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="success">14-day trial, no card</Badge>
          <Badge>Upgrades included</Badge>
          <Badge>No exit fee</Badge>
        </div>
      </PageHeader>

      {/* plans */}
      <Section tight>
        <Container>
          {/* billing toggle */}
          <div className="flex justify-center">
            <div
              role="group"
              aria-label="Billing period"
              className="inline-flex items-center gap-1 rounded-xl border border-line bg-surface p-1"
            >
              {[['Monthly', false], ['Annual', true]].map(([label, val]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAnnual(val)}
                  aria-pressed={annual === val}
                  className={cx(
                    'h-9 cursor-pointer rounded-lg px-4 text-xs font-semibold transition-colors',
                    annual === val ? 'bg-brand-gradient text-white shadow-xs' : 'text-fg-muted hover:bg-surface-2 hover:text-fg',
                  )}
                >
                  {label}
                </button>
              ))}
              <span className="ml-1.5 mr-2 rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-2xs font-semibold text-success">
                Save 20%
              </span>
            </div>
          </div>

          <RevealGroup className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3" step={0.07}>
            {plans.map((plan) => {
              const price = annual ? plan.annual : plan.monthly;
              return (
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
                  <h2 className="font-display text-lg font-bold text-fg">{plan.name}</h2>
                  <p className="mt-1 text-xs text-fg-muted">{plan.tagline}</p>

                  <div className="mt-5 flex min-h-[3.25rem] items-baseline gap-1.5">
                    {price != null ? (
                      <>
                        <span className="font-display text-4xl font-extrabold tracking-tight text-fg tnum">${price}</span>
                        <span className="text-xs text-fg-subtle">{plan.unit}</span>
                      </>
                    ) : (
                      <span className="font-display text-3xl font-extrabold tracking-tight text-fg">Custom</span>
                    )}
                  </div>
                  {price != null && (
                    <p className="text-2xs text-fg-subtle">
                      {annual ? `Billed annually — $${plan.monthly} if billed monthly` : `$${plan.annual} if billed annually`}
                    </p>
                  )}

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-fg-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    to={price != null ? '/demo' : '/contact'}
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    size="md"
                    className="mt-7 w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* comparison matrix */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Full comparison"
            title="Everything, side by side"
            lead="Including the rows most vendors leave off — audit retention, data residency, dry runs and what leaving costs."
          />
          <Reveal className="mt-10">
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                <caption className="sr-only">Feature comparison across Starter, Growth and Enterprise plans</caption>
                <thead>
                  <tr className="bg-surface-2">
                    <th scope="col" className="w-[34%] px-5 py-4 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                      Feature
                    </th>
                    {plans.map((p) => (
                      <th key={p.name} scope="col" className="px-5 py-4 text-center">
                        <span className="font-display text-sm font-bold text-fg">{p.name}</span>
                        <span className="mt-0.5 block text-2xs font-normal text-fg-subtle">
                          {p.annual != null ? `$${p.annual} ${p.unit}` : p.unit}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureMatrix.map((group) => (
                    <Fragment key={group.group}>
                      <tr>
                        <th
                          scope="colgroup"
                          colSpan={4}
                          className="border-y border-line bg-surface-2/60 px-5 py-2.5 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle"
                        >
                          {group.group}
                        </th>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={row.label} className="border-b border-line bg-surface transition-colors hover:bg-surface-2/50">
                          <th scope="row" className="px-5 py-3.5 text-left text-[13px] font-medium text-fg">
                            {row.label}
                          </th>
                          {KEYS.map((k) => (
                            <td key={k} className="px-5 py-3.5 text-center text-[13px]">
                              <Cell value={row[k]} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ROI calculator */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Business case"
            title="Work out whether it pays for itself"
            lead="Adjust every assumption, including ours. The numbers below are arithmetic on your inputs — no vendor multipliers hidden in the middle."
          />

          <Reveal className="mt-10">
            <div className="grid gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
              {/* inputs */}
              <div className="space-y-7">
                {Object.entries(roiBounds).map(([key, bound]) => (
                  <Slider
                    key={key}
                    id={`roi-${key}`}
                    bound={bound}
                    value={roi[key]}
                    onChange={set(key)}
                  />
                ))}
                <div className="flex items-start gap-2.5 rounded-xl border border-line bg-surface-2 px-4 py-3">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fg-subtle" aria-hidden="true" />
                  <p className="text-2xs leading-relaxed text-fg-subtle">
                    Assumes 46 working weeks a year and the Growth seat price of ${roi.seatPrice}/user/month billed annually.
                    The reduction share is the one assumption we cannot verify for you — start low.
                  </p>
                </div>
              </div>

              {/* output */}
              <div className="ring-gradient flex flex-col rounded-2xl border border-line bg-surface-2 p-6 sm:p-7">
                <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Estimated first year</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="font-display text-2xl font-extrabold tracking-tight text-fg tnum">
                      <Counter value={result.hoursSaved} />
                    </p>
                    <p className="mt-0.5 text-2xs text-fg-subtle">hours recovered</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-extrabold tracking-tight text-fg tnum">{money(result.valueRecovered)}</p>
                    <p className="mt-0.5 text-2xs text-fg-subtle">value of that time</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-extrabold tracking-tight text-fg tnum">{money(result.platformCost)}</p>
                    <p className="mt-0.5 text-2xs text-fg-subtle">platform cost, 12 months</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-extrabold tracking-tight text-fg tnum">
                      {result.paybackMonths ? `${result.paybackMonths} mo` : '—'}
                    </p>
                    <p className="mt-0.5 text-2xs text-fg-subtle">payback period</p>
                  </div>
                </div>

                <div
                  className={cx(
                    'mt-6 rounded-xl border p-5',
                    result.net >= 0 ? 'border-success/30 bg-success/10' : 'border-warning/30 bg-warning/10',
                  )}
                  aria-live="polite"
                >
                  <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                    {result.net >= 0 ? 'Net benefit, year one' : 'Net cost, year one'}
                  </p>
                  <p className={cx(
                    'mt-1 font-display text-3xl font-extrabold tracking-tight tnum',
                    result.net >= 0 ? 'text-success' : 'text-warning',
                  )}>
                    {result.net >= 0 ? '' : '−'}{money(result.net)}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                    {result.net >= 0
                      ? 'On these assumptions it pays for itself inside the first year. Bring this to us and we will pressure-test it against comparable rollouts.'
                      : 'On these assumptions it does not pay back in year one. That is worth knowing before a sales call, not after — tell us and we will say whether the assumptions or the fit is wrong.'}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <Button to="/contact" size="md" className="flex-1" icon={ArrowRight}>Pressure-test this</Button>
                  <Button
                    onClick={() => setRoi(roiDefaults)}
                    variant="secondary"
                    size="md"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* what is not included */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Straight answers"
            title="What the plan price does not cover"
            lead="Stated here rather than discovered at contract stage."
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2" step={0.06}>
            {notIncluded.map((n) => (
              <div key={n.label} className="flex h-full gap-3.5 rounded-2xl border border-line bg-surface p-6">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-[15px] font-bold text-fg">{n.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{n.detail}</p>
                </div>
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
                title="What procurement asks"
                lead="If your question is not here, ask — you will get a number, not a range."
              />
              <Button to="/contact" variant="secondary" size="md" className="mt-7" icon={ArrowRight}>
                Ask about pricing
              </Button>
            </div>
            <Reveal><Accordion items={pricingFaqs} /></Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Get a quote with your actual numbers"
        lead="Send us your user count, the products you need and where the data must live. You get a written quote, not a discovery call about your budget."
        primary={{ label: 'Request a quote', to: '/contact' }}
        secondary={{ label: 'Start a trial', to: '/demo' }}
      />
    </>
  );
}
