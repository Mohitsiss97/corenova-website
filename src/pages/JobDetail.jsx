import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Briefcase, Users, Banknote, Send } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import NotFound from './NotFound';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, RevealGroup, Badge,
} from '../components/ui';

import { site } from '../data/site';
import { jobs, getJob, hiringStages, hiringPromise } from '../data/careers';
import useSeo from '../hooks/useSeo';

const formatPosted = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });

export default function JobDetail() {
  const { jobId } = useParams();
  const job = getJob(jobId);

  // Hooks run on every render, so this sits above the early return.
  useSeo(job ? { title: `${job.title} — ${job.location}`, description: job.summary } : undefined);

  // An unknown role behaves like any other bad URL rather than an empty shell.
  if (!job) return <NotFound />;

  const others = jobs.filter((j) => j.id !== job.id && j.team === job.team).slice(0, 3);
  const fallbackOthers = jobs.filter((j) => j.id !== job.id).slice(0, 3);
  const related = others.length ? others : fallbackOthers;

  const applyHref = `mailto:${site.email}?subject=${encodeURIComponent(`Application: ${job.title} (${job.location})`)}`;

  return (
    <>
      <PageHeader
        eyebrow={`${job.team} · ${job.level}`}
        crumbs={[{ label: 'Careers', to: '/careers' }, { label: job.title }]}
        title={job.title}
        lead={job.summary}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary" icon={MapPin}>{job.location} · {job.remote}</Badge>
          <Badge icon={Briefcase}>{job.type}</Badge>
          <Badge tone="accent" icon={Banknote}>{job.band}</Badge>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={applyHref} size="lg" icon={Send} iconRight={false}>Apply for this role</Button>
          <Button to="/careers" size="lg" variant="secondary">All open roles</Button>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            {/* main column */}
            <div>
              <h2 className="font-display text-xl font-bold text-fg">What you will do</h2>
              <ul className="mt-5 space-y-3">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-fg-muted">{r}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 font-display text-xl font-bold text-fg">What we are looking for</h2>
              <ul className="mt-5 space-y-3">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-fg-muted">{r}</span>
                  </li>
                ))}
              </ul>

              {job.niceToHave?.length > 0 && (
                <>
                  <h2 className="mt-12 font-display text-xl font-bold text-fg">Useful, not required</h2>
                  <p className="mt-2 text-sm text-fg-muted">
                    None of these are filters. They are the things that would make your first months easier.
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {job.niceToHave.map((n) => (
                      <li key={n} className="rounded-xl border border-line bg-surface px-4 py-2 text-sm text-fg-muted">
                        {n}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <h2 className="font-display text-lg font-bold text-fg">Our commitments to you as a candidate</h2>
                <ul className="mt-5 space-y-2.5">
                  {hiringPromise.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-line bg-surface p-7">
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-fg-subtle">
                  Role at a glance
                </h2>
                <dl className="mt-6 space-y-5">
                  {[
                    { label: 'Team', value: job.team },
                    { label: 'Level', value: job.level },
                    { label: 'Salary band', value: job.band },
                    { label: 'Location', value: `${job.location} · ${job.remote}` },
                    { label: 'Reports to', value: job.reportsTo },
                    { label: 'Team size', value: job.teamSize },
                    { label: 'Posted', value: formatPosted(job.posted) },
                  ].map((row) => (
                    <div key={row.label}>
                      <dt className="text-2xs uppercase tracking-wider text-fg-subtle">{row.label}</dt>
                      <dd className="mt-1 text-sm font-semibold text-fg">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <Button href={applyHref} size="md" className="mt-7 w-full" icon={Send} iconRight={false}>
                  Apply for this role
                </Button>
                <p className="mt-3 text-center text-2xs text-fg-subtle">
                  Read by an engineer within 3 working days
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* process */}
      <Section className="border-y border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="What happens next"
            title="Six stages, about three weeks"
            lead="The same process for every role. You will know which stage you are at and what the next one involves."
          />
          <RevealGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {hiringStages.map((s) => (
              <div key={s.step} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5">
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xs font-extrabold tracking-[0.14em] text-primary-500 tnum">{s.step}</span>
                  <h3 className="font-display text-[15px] font-bold text-fg">{s.name}</h3>
                </div>
                <p className="mt-1 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{s.duration}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{s.detail}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* other roles */}
      <Section tight>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-xl font-bold text-fg">
              <Users className="mr-2 inline h-5 w-5 text-primary-500" aria-hidden="true" />
              Other open roles
            </h2>
            <Link to="/careers" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
              See all {jobs.length}
            </Link>
          </div>
          <RevealGroup className="mt-6 grid gap-3 lg:grid-cols-3" step={0.05}>
            {related.map((j) => (
              <Link
                key={j.id}
                to={`/careers/${j.id}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift"
              >
                <Badge tone="primary" className="w-fit">{j.team}</Badge>
                <h3 className="mt-3.5 font-display text-[16px] font-bold leading-snug text-fg">{j.title}</h3>
                <p className="mt-1.5 text-xs text-fg-subtle">{j.location} · {j.level}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-primary-600 dark:text-primary-400">
                  View role
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        title={`Interested in ${job.title}?`}
        lead="Send whatever represents you best — a repository, a write-up, a system you are proud of. A CV is fine but it is not the interesting part."
        primary={{ label: 'Apply now', to: '/contact' }}
        secondary={{ label: 'Read about the company', to: '/about' }}
      />
    </>
  );
}
