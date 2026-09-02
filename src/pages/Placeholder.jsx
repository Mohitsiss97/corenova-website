import { useLocation } from 'react-router-dom';
import { Hammer, Check, ArrowRight } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import { Button, Container, Section, Badge } from '../components/ui';
import useSeo from '../hooks/useSeo';

/**
 * Temporary stand-in for pages still in the build queue.
 * It states exactly what the finished page will contain, so nothing links to a dead end.
 */
export default function Placeholder({ title, phase = 'Next phase', sections = [] }) {
  useSeo({ title });
  const { pathname } = useLocation();

  return (
    <>
      <PageHeader
        eyebrow={phase}
        crumbs={[{ label: title }]}
        title={title}
        lead="This page is scheduled but not built yet. Here is exactly what it will contain — so you can review the plan before we write it."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="warning" icon={Hammer}>In the build queue</Badge>
          <Badge><span className="font-mono">{pathname}</span></Badge>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-surface p-8 sm:p-10">
            <h2 className="font-display text-xl font-bold text-fg">Planned sections</h2>
            <ul className="mt-6 space-y-3">
              {(sections.length ? sections : ['Section list to be confirmed']).map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                  <span className="text-sm text-fg-muted">{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Button to="/" size="md" icon={ArrowRight}>Back to home</Button>
              <Button to="/products" size="md" variant="secondary">Browse the catalog</Button>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
