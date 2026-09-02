import { useState, useMemo } from 'react';
import { Search, Check, ArrowRight } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, Marquee, cx,
} from '../components/ui';
import TechLogo from '../components/TechLogo';

import { techGroups, levelMeta, techCount, loggedTech, featuredGroup } from '../data/technologies';
import useSeo from '../hooks/useSeo';

const levelStyles = {
  Core: 'border-primary-500/30 bg-primary-500/10 text-primary-700 dark:text-primary-300',
  Strong: 'border-accent-500/30 bg-accent-500/10 text-accent-600 dark:text-accent-400',
  Working: 'border-line bg-surface-2 text-fg-subtle',
};

const principles = [
  { title: 'Boring where it counts', body: 'PostgreSQL, Kubernetes and a well-modelled REST API will outlive whatever is trending. We save novelty for the parts that genuinely need it.' },
  { title: 'One stack per project', body: 'We do not mix four frontend frameworks in one codebase because different teams joined at different times. Consistency is a feature.' },
  { title: 'Everything as code', body: 'Infrastructure, pipelines, dashboards and policies live in version control and go through review — same as application code.' },
  { title: 'An exit path from day one', body: 'No proprietary lock-in we cannot unwind. Open formats, standard protocols, and documented schemas you could hand to another vendor.' },
];

export default function Technologies() {
  useSeo({
    title: `Technologies — ${techCount} we run in production`,
    description: `Our stack across ${techCount} technologies, led by .NET — ASP.NET Core, MVC, Blazor and EF Core — plus frontend, mobile, cloud, DevOps, AI and data engineering.`,
  });

  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return techGroups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (t) => (level === 'all' || t.level === level) && (!q || t.name.toLowerCase().includes(q) || g.name.toLowerCase().includes(q)),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, level]);

  const shown = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <PageHeader
        eyebrow="Technology"
        crumbs={[{ label: 'Technologies' }]}
        title={`${techCount}+ technologies, each with a named practice lead`}
        lead="Every mark below is a technology we run in production — with at least one live system behind it and engineers on the bench who have operated it at scale."
      >
        <div className="flex flex-wrap gap-2">
          {Object.entries(levelMeta).map(([key, meta]) => (
            <span
              key={key}
              className={cx('rounded-full border px-3 py-1 text-2xs font-semibold', levelStyles[key])}
              title={meta.hint}
            >
              {meta.label} — {meta.hint}
            </span>
          ))}
        </div>
      </PageHeader>

      {/* brand marks for the stack we actually run */}
      <section className="border-b border-line bg-surface/50 py-8">
        <Marquee
          duration={56}
          items={loggedTech}
          render={(t) => (
            <span
              className="flex h-12 items-center gap-2.5 rounded-xl border border-line bg-surface px-4"
              title={`${t.name} — ${t.level}`}
            >
              <TechLogo name={t.name} size={20} />
              <span className="whitespace-nowrap font-mono text-xs font-medium text-fg-muted">{t.name}</span>
            </span>
          )}
        />
      </section>

      {/* .NET spotlight — our deepest practice, so it leads the page */}
      <Section tight>
        <Container>
          <Reveal>
            <div className="ring-gradient relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#512BD4]/25 to-transparent blur-3xl"
              />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
                <div>
                  <div className="flex items-center gap-3">
                    <img src={`${import.meta.env.BASE_URL}logos/dotnet.svg`} alt="" aria-hidden="true" width={40} height={40} className="rounded-lg" />
                    <Badge tone="primary">Our deepest practice</Badge>
                  </div>
                  <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                    .NET, end to end — including the legacy you inherited
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                    {featuredGroup.blurb}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                    We target <strong className="font-semibold text-fg">.NET 10 LTS</strong> (supported to November 2028) for
                    new work, and we still maintain .NET Framework 4.8 estates — because most migrations run for a year with
                    both alive at once.
                  </p>
                  <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                    <Button to="/services/dotnet-engineering" size="md" icon={ArrowRight}>
                      .NET engineering service
                    </Button>
                    <Button to="/case-studies/northwind-dotnet-modernisation" size="md" variant="secondary">
                      Read the migration case study
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                    What we work in daily
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {featuredGroup.items.map((t) => (
                      <li
                        key={t.name}
                        className="flex items-center justify-between gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2.5"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <TechLogo name={t.name} size={16} />
                          <span className="min-w-0 truncate font-mono text-2xs font-medium text-fg">{t.name}</span>
                        </span>
                        <span className={cx('shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold', levelStyles[t.level])}>
                          {t.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* search + filter */}
      <Section tight>
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
              <label htmlFor="tech-search" className="sr-only">Search technologies</label>
              <input
                id="tech-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the stack — try “Kubernetes”, “Flutter”, “Kafka”…"
                className="h-11 w-full rounded-xl border border-line bg-surface pl-10 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-primary-500"
              />
            </div>
            <div className="flex gap-1.5 rounded-xl border border-line bg-surface p-1">
              {['all', 'Core', 'Strong', 'Working'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  aria-pressed={level === l}
                  className={cx(
                    'h-9 cursor-pointer rounded-lg px-3.5 text-xs font-semibold capitalize transition-colors',
                    level === l ? 'bg-brand-gradient text-white shadow-xs' : 'text-fg-muted hover:bg-surface-2 hover:text-fg',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-fg-muted" aria-live="polite">
            <strong className="font-semibold text-fg tnum">{shown}</strong> of {techCount} technologies shown
          </p>
        </Container>
      </Section>

      {/* stack groups */}
      <Section tight className="pb-20">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-12 text-center">
              <p className="font-display text-base font-bold text-fg">We do not list “{query}”</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
                That does not always mean we cannot do it — ask, and we will tell you honestly whether we have the depth.
              </p>
              <Button to="/contact" size="md" className="mt-6">Ask about a technology</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((g, gi) => (
                <Reveal key={g.id} delay={Math.min(gi * 0.04, 0.3)}>
                  <section
                    id={g.id}
                    className={cx(
                      'scroll-mt-28 overflow-hidden rounded-2xl bg-surface',
                      g.featured ? 'border-2 border-primary-500/35' : 'border border-line',
                    )}
                  >
                    <div className="flex flex-col gap-3 border-b border-line bg-surface-2 px-6 py-5 sm:flex-row sm:items-center sm:gap-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-cyan-500">
                        <g.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-fg">
                          {g.name}
                          {g.featured && <Badge tone="primary">Lead practice</Badge>}
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-fg-muted">{g.blurb}</p>
                      </div>
                      <Badge tone="neutral" className="shrink-0">{g.items.length} tools</Badge>
                    </div>
                    <ul className="grid gap-2 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {g.items.map((t) => (
                        <li
                          key={t.name}
                          className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3 transition-colors hover:border-line-strong"
                        >
                          <span className="flex min-w-0 items-center gap-2.5">
                            <TechLogo name={t.name} size={18} />
                            <span className="min-w-0 truncate font-mono text-[13px] font-medium text-fg">{t.name}</span>
                          </span>
                          <span className={cx('shrink-0 rounded-full border px-2 py-0.5 text-2xs font-semibold', levelStyles[t.level])}>
                            {t.level}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* principles */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="How we choose"
            title="Our four rules for picking a stack"
            lead="Technology selection is a ten-year decision made in a two-week window. These are the rules we apply, including when it costs us the more exciting option."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2" step={0.06}>
            {principles.map((p, i) => (
              <div key={p.title} className="ring-gradient relative flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                <span className="font-display text-2xl font-extrabold tracking-tight text-primary-500/25">0{i + 1}</span>
                <h3 className="mt-3 font-display text-[17px] font-bold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* certifications / bench */}
      <Section>
        <Container>
          <div className="grid gap-8 rounded-3xl border border-line bg-surface p-8 sm:p-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Certified where it matters</h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Certifications are a floor, not a ceiling — but for cloud and security work, buyers are right to ask. Here is what our bench currently holds.
              </p>
              <Button to="/contact" size="md" className="mt-6">Request our capability deck</Button>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'AWS Solutions Architect — 24 engineers',
                'Azure Solutions Architect Expert — 17',
                'Google Professional Cloud Architect — 9',
                'Certified Kubernetes Administrator — 21',
                'HashiCorp Terraform Associate — 14',
                'ISTQB Advanced Test Manager — 8',
              ].map((c) => (
                <li key={c} className="flex items-start gap-2.5 rounded-xl border border-line bg-surface-2 px-4 py-3 text-xs text-fg-muted">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Need a stack decision reviewed?"
        lead="Send us the architecture you are considering. One of our practice leads will read it and come back with a written second opinion — free, and without a pitch attached."
        primary={{ label: 'Get an architecture review', to: '/contact' }}
        secondary={{ label: 'See our services', to: '/services' }}
      />
    </>
  );
}
