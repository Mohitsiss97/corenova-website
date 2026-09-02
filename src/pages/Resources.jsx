import { useMemo, useState } from 'react';
import { ArrowRight, Download, Lock, Play, X } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx,
} from '../components/ui';

import {
  resources, resourceCount, resourceTypes, resourceTopics, featuredResources, getResourceType,
} from '../data/resources';
import useSeo from '../hooks/useSeo';

const ALL = 'All';

const formatUpdated = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    month: 'short', year: 'numeric', timeZone: 'UTC',
  });

/** One resource. Gated items say so on the card rather than after the click. */
function ResourceCard({ resource }) {
  const type = getResourceType(resource.type);
  const isWebinar = resource.type === 'webinar';

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-primary-500">
          {type?.icon ? <type.icon className="h-5 w-5" aria-hidden="true" /> : null}
        </span>
        {resource.gated
          ? <Badge tone="warning" icon={Lock}>Email required</Badge>
          : <Badge tone="success">Free, no form</Badge>}
      </div>

      <p className="mt-4 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{resource.topic}</p>
      <h3 className="mt-1 font-display text-[17px] font-bold leading-snug text-fg">{resource.title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted">{resource.description}</p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-2xs text-fg-subtle">
          {resource.format} · {resource.length} · {formatUpdated(resource.updated)}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400">
          {isWebinar ? 'Watch' : 'Get it'}
          {isWebinar
            ? <Play className="h-3.5 w-3.5" aria-hidden="true" />
            : <Download className="h-3.5 w-3.5" aria-hidden="true" />}
        </span>
      </div>
    </article>
  );
}

export default function Resources() {
  useSeo({
    title: 'Resources',
    description:
      'Whitepapers, checklists, benchmark reports and recorded sessions — including the templates our own delivery teams open on day one. Most of it is not gated.',
  });

  const [type, setType] = useState(ALL);
  const [topic, setTopic] = useState(ALL);

  const filtered = useMemo(
    () => resources.filter((r) => {
      if (type !== ALL && r.type !== type) return false;
      if (topic !== ALL && r.topic !== topic) return false;
      return true;
    }),
    [type, topic],
  );

  const isFiltered = type !== ALL || topic !== ALL;
  const ungatedCount = resources.filter((r) => !r.gated).length;

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        crumbs={[{ label: 'Resources' }]}
        title="The documents we use internally, cleaned up for you"
        lead="Selection checklists, migration runbooks, benchmark data and recorded sessions. Useful even if you never talk to us — which is rather the point."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{resourceCount} resources</Badge>
          <Badge tone="success">{ungatedCount} with no form</Badge>
          <Badge tone="accent">Updated quarterly</Badge>
        </div>
      </PageHeader>

      {/* featured */}
      <Section tight>
        <Container>
          <RevealGroup className="grid gap-4 lg:grid-cols-2" step={0.08}>
            {featuredResources.map((r) => {
              const type_ = getResourceType(r.type);
              return (
                <article
                  key={r.slug}
                  className="ring-gradient relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary-500/30 bg-surface p-7 shadow-soft sm:p-8"
                >
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-[0.25] mask-fade-b" />
                  <div className="relative flex items-center gap-2">
                    <Badge tone="accent">Most requested</Badge>
                    {type_ && <Badge>{type_.name}</Badge>}
                  </div>
                  <h2 className="relative mt-5 font-display text-xl font-extrabold leading-snug text-fg sm:text-2xl">
                    {r.title}
                  </h2>
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{r.description}</p>
                  <div className="relative mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                    <Button to="/contact" size="md" icon={Download} iconRight={false}>
                      {r.gated ? 'Request a copy' : 'Download'}
                    </Button>
                    <span className="text-2xs text-fg-subtle">
                      {r.format} · {r.length}
                    </span>
                  </div>
                </article>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* type overview */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="What is here"
            title="Four kinds of thing, one honest gating policy"
            lead="We ask for an email on material that costs us real research time to produce. Everything else is a direct download, because a form on a checklist is just friction."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
            {resourceTypes.map((t) => {
              const count = resources.filter((r) => r.type === t.slug).length;
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setType(t.slug)}
                  className="flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-surface p-6 text-left transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-accent-500">
                    <t.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-[15px] font-bold text-fg">{t.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{t.blurb}</p>
                  <span className="mt-4 text-2xs font-semibold uppercase tracking-wider text-fg-subtle tnum">
                    {count} available
                  </span>
                </button>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* library */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Library"
            title="Everything, filterable"
            lead="Filter by format or by the problem you are working on."
          />

          <Reveal className="mt-10">
            <div className="space-y-3 rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Format</span>
                {[{ slug: ALL, name: ALL }, ...resourceTypes].map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => setType(t.slug)}
                    aria-pressed={type === t.slug}
                    className={cx(
                      'cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
                      type === t.slug
                        ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                        : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
                    )}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Topic</span>
                {[ALL, ...resourceTopics].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={cx(
                      'cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
                      topic === t
                        ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                        : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-fg-muted" role="status">
              Showing <span className="font-semibold text-fg tnum">{filtered.length}</span> of {resourceCount}
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={() => { setType(ALL); setTopic(ALL); }}
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
              <p className="font-display text-lg font-bold text-fg">Nothing matches that combination</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
                Tell us what you were looking for and we will either send it or write it.
              </p>
              <Button to="/contact" variant="secondary" size="md" className="mt-6">Request a resource</Button>
            </div>
          ) : (
            <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.04}>
              {filtered.map((r) => <ResourceCard key={r.slug} resource={r} />)}
            </RevealGroup>
          )}
        </Container>
      </Section>

      {/* gating policy */}
      <Section tight className="border-t border-line bg-surface/50">
        <Container>
          <div className="rounded-3xl border border-line bg-surface p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
              <div>
                <h2 className="font-display text-xl font-bold text-fg sm:text-2xl">
                  What happens if you give us your email
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  You get the document and the monthly digest. You do not get a sales sequence, a call from
                  an SDR two days later, or your address in anyone else system. Unsubscribe is one click and
                  it works immediately.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <Button to="/contact" size="md" icon={ArrowRight}>Request a gated resource</Button>
                <Button to="/docs" size="md" variant="secondary">Read the docs instead</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Want the version of this for your business?"
        lead="These documents are general. Thirty minutes with an engineer gets you the specific answer for your systems, your data and your constraints."
        primary={{ label: 'Book a call', to: '/demo' }}
        secondary={{ label: 'Browse the blog', to: '/blog' }}
      />
    </>
  );
}
