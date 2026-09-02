import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, Key, Clock, Package, Webhook } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import NotFound from './NotFound';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, RevealGroup, Badge,
} from '../components/ui';

import {
  getIntegration, getIntegrationCategory, integrationsInCategory, integrationCount,
} from '../data/integrations';
import useSeo from '../hooks/useSeo';

export default function IntegrationDetail() {
  const { integrationSlug } = useParams();
  const integration = getIntegration(integrationSlug);

  // Hooks must run on every render, so this sits above the early return.
  useSeo(integration
    ? { title: `${integration.name} integration`, description: integration.description }
    : undefined);

  // An unknown slug behaves exactly like any other bad URL.
  if (!integration) return <NotFound />;

  const category = getIntegrationCategory(integration.category);
  const siblings = integrationsInCategory(integration.category)
    .filter((i) => i.slug !== integration.slug)
    .slice(0, 3);

  const facts = [
    { icon: Key, label: 'Authentication', value: integration.auth },
    { icon: ArrowRight, label: 'Data direction', value: integration.direction },
    { icon: Clock, label: 'Typical setup', value: integration.setup },
    { icon: Package, label: 'Products', value: integration.products.join(', ') },
  ];

  return (
    <>
      <PageHeader
        eyebrow={category?.name ?? 'Integration'}
        crumbs={[{ label: 'Integrations', to: '/integrations' }, { label: integration.name }]}
        title={`${integration.name} integration`}
        lead={integration.tagline}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary">{integration.direction}</Badge>
          <Badge tone="accent" icon={Clock}>Setup {integration.setup}</Badge>
          <Badge icon={Key}>{integration.auth}</Badge>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/contact" size="lg" icon={ArrowRight}>Ask about this connector</Button>
          <Button to="/docs" size="lg" variant="secondary">Read the API docs</Button>
        </div>
      </PageHeader>

      {/* facts strip */}
      <Section tight>
        <Container>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-surface px-6 py-6">
                <div className="flex items-center gap-2">
                  <f.icon className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" />
                  <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{f.label}</p>
                </div>
                <p className="mt-2.5 text-sm font-semibold leading-snug text-fg">{f.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* what it does */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="What it does"
                title={`How ${integration.name} fits`}
              />
              <p className="mt-6 text-base leading-relaxed text-fg-muted text-pretty">
                {integration.description}
              </p>
              <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-center gap-2.5">
                  <Webhook className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  <h3 className="font-display text-[15px] font-bold text-fg">Events, not polling</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                  State changes arrive as signed webhooks with at-least-once delivery and 24 hours of
                  retries. Nothing in this connector depends on a scheduled poll you have to tune.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xs font-extrabold uppercase tracking-[0.14em] text-fg-subtle">
                Capabilities
              </h3>
              <RevealGroup className="mt-5 grid gap-3" step={0.05}>
                {integration.capabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                    <span className="text-sm font-medium text-fg">{c}</span>
                  </div>
                ))}
              </RevealGroup>

              <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface p-5">
                <p className="text-sm text-fg-muted">
                  Need something on this list that is not here? The API covers every entity, so extending a
                  connector is usually days rather than a roadmap request.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* products */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Where it applies"
            title="Products this connector serves"
            lead="Connectors are configured per environment, so you can prove one out in sandbox before it touches production data."
            action={<Button to="/products" variant="secondary" icon={ArrowRight}>All products</Button>}
          />
          <ul className="mt-10 flex flex-wrap gap-2">
            {integration.products.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5"
              >
                <Package className="h-4 w-4 text-primary-500" aria-hidden="true" />
                <span className="text-sm font-medium text-fg">{p}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* siblings */}
      {siblings.length > 0 && (
        <Section tight>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-fg">
                More in {category?.name}
              </h2>
              <Link to="/integrations" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
                See all {integrationCount}
              </Link>
            </div>
            <RevealGroup className="mt-6 grid gap-4 lg:grid-cols-3" step={0.05}>
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  to={`/integrations/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift"
                >
                  <h3 className="font-display text-[16px] font-bold text-fg">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{s.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-primary-600 dark:text-primary-400">
                    Details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <CtaBand
        title={`Connecting ${integration.name}?`}
        lead="Tell us the workflow you are trying to close, not just the system. Half the time the right answer is simpler than a full connector."
        primary={{ label: 'Talk to an engineer', to: '/contact' }}
        secondary={{ label: 'Browse integrations', to: '/integrations' }}
      />
    </>
  );
}
