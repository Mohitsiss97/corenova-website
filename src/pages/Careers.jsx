import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, MapPin, Briefcase, Check, Quote, X } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx,
} from '../components/ui';

import { site } from '../data/site';
import {
  jobs, jobCount, jobTeams, jobLocations,
  culturePillars, benefits, hiringStages, hiringPromise, employeeStories,
} from '../data/careers';
import useSeo from '../hooks/useSeo';

const ALL = 'All';

/** Chip row used for both the team and location facets. */
function FilterRow({ label, options, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{label}</span>
      {[ALL, ...options].map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cx(
            'cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
            value === opt
              ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
              : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function Careers() {
  useSeo({
    title: 'Careers',
    description: `${jobCount} open roles at ${site.name}. Remote-first, salary bands stated on the first call, paid take-home exercises and written feedback after every onsite stage.`,
  });

  const [query, setQuery] = useState('');
  const [team, setTeam] = useState(ALL);
  const [location, setLocation] = useState(ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (team !== ALL && j.team !== team) return false;
      if (location !== ALL && j.location !== location) return false;
      if (!q) return true;
      return `${j.title} ${j.team} ${j.location} ${j.summary} ${j.level}`.toLowerCase().includes(q);
    });
  }, [query, team, location]);

  const isFiltered = query !== '' || team !== ALL || location !== ALL;
  const reset = () => { setQuery(''); setTeam(ALL); setLocation(ALL); };

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        crumbs={[{ label: 'Careers' }]}
        title="Ship in your first fortnight, own it after that"
        lead="Remote-first across four offices, with a hiring process that states the band before it asks about yours. We are hiring across engineering, design, security and delivery."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{jobCount} open roles</Badge>
          <Badge tone="accent">Remote-first</Badge>
          <Badge>Paid take-home exercises</Badge>
          <Badge>Bands published internally</Badge>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#open-roles" size="lg" icon={ArrowRight}>See open roles</Button>
          <Button to="/about" size="lg" variant="secondary">About the company</Button>
        </div>
      </PageHeader>

      {/* culture */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How it actually works here"
            title="Four things that are true on your first week"
            lead="Written so you can hold us to them in your first retro — and leave if they turn out not to be."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2" step={0.06}>
            {culturePillars.map((p, i) => (
              <div key={p.title} className="flex h-full gap-5 rounded-2xl border border-line bg-surface p-6">
                <span className="font-display text-2xl font-extrabold tracking-tight text-primary-500/30 tnum">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[17px] font-bold leading-snug text-fg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
                </div>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* benefits */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Benefits"
            title="The list, without the fruit-bowl entries"
            lead="Everything here costs the company real money. Nothing here is a table-tennis table."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.04}>
            {benefits.map((b) => (
              <div key={b.title} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-accent-500">
                  <b.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[15px] font-bold leading-snug text-fg">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{b.body}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* job board */}
      <Section id="open-roles">
        <Container>
          <SectionHeading
            eyebrow="Open roles"
            title={`${jobCount} roles open right now`}
            lead="Every posting states the band, the level and who you would report to. If a role is not listed, we are not hiring for it — there is no hidden pipeline."
          />

          <Reveal className="mt-10">
            <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <label htmlFor="job-search" className="sr-only">Search roles</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
                <input
                  id="job-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, team or location…"
                  className="h-11 w-full rounded-xl border border-line bg-surface-2 pl-11 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-primary-500"
                />
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <FilterRow label="Team" options={jobTeams} value={team} onChange={setTeam} />
                <FilterRow label="Location" options={jobLocations} value={location} onChange={setLocation} />
              </div>
            </div>
          </Reveal>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-fg-muted" role="status">
              Showing <span className="font-semibold text-fg tnum">{filtered.length}</span> of {jobCount} roles
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
              <p className="font-display text-lg font-bold text-fg">No roles match that</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
                We hire ahead of need for strong engineers. Send us what you have built and we will tell you
                honestly whether something is coming.
              </p>
              <Button href={`mailto:${site.email}`} variant="secondary" size="md" className="mt-6">
                Send a speculative application
              </Button>
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              {filtered.map((job, i) => (
                <Reveal key={job.id} delay={Math.min(i * 0.03, 0.2)}>
                  <li>
                    <Link
                      to={`/careers/${job.id}`}
                      className="group flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-primary-500/40 hover:shadow-lift sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone="primary">{job.team}</Badge>
                          <span className="text-2xs uppercase tracking-wider text-fg-subtle">{job.level}</span>
                        </div>
                        <h3 className="mt-2.5 font-display text-lg font-bold text-fg">{job.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{job.summary}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-fg-subtle">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {job.location} · {job.remote}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                            {job.type}
                          </span>
                          <span className="font-semibold text-fg-muted">{job.band}</span>
                        </div>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400">
                        View role
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      {/* hiring process */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Hiring process"
                title="Three weeks, six stages, no surprises"
                lead="The whole process is written down because a hiring process you cannot see is one you cannot prepare for."
              />
              <ul className="mt-8 space-y-3">
                {hiringPromise.map((p) => (
                  <li key={p} className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                    <span className="text-sm text-fg-muted">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div aria-hidden="true" className="absolute left-[19px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-line sm:block" />
              <ol className="space-y-3">
                {hiringStages.map((s, i) => (
                  <Reveal key={s.step} delay={i * 0.05}>
                    <li className="relative flex gap-5 rounded-2xl border border-line bg-surface p-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface font-display text-xs font-extrabold text-primary-500 tnum">
                        {s.step}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h3 className="font-display text-[16px] font-bold text-fg">{s.name}</h3>
                          <span className="text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{s.duration}</span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.detail}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* stories */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="From the team"
            title="Three people, three different paths"
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3" step={0.07}>
            {employeeStories.map((s) => (
              <figure key={s.name} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <Quote className="h-6 w-6 text-primary-500/40" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">“{s.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                    {s.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-bold text-fg">{s.name}</span>
                    <span className="block truncate text-2xs text-fg-subtle">{s.role} · {s.tenure}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        title="Nothing here fits, but you are interested?"
        lead="We hire ahead of need for engineers who are clearly strong. Send us something you have built and a paragraph on what you want next."
        primary={{ label: 'Send an application', to: '/contact' }}
        secondary={{ label: 'Read how we work', to: '/process' }}
      />
    </>
  );
}
