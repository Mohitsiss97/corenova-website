import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Rss } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx,
} from '../components/ui';

import { posts, postCount, postCategories, featuredPost, formatPostDate } from '../data/blog';
import useSeo from '../hooks/useSeo';

const ALL = 'All';

/** Compact card used for every post in the grid. */
function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift"
    >
      <div className="flex items-center justify-between gap-3">
        <Badge tone="primary">{post.category}</Badge>
        <span className="inline-flex items-center gap-1.5 text-2xs text-fg-subtle">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {post.readingTime} min
        </span>
      </div>
      <h3 className="mt-4 font-display text-[17px] font-bold leading-snug text-fg">{post.title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-gradient text-2xs font-bold text-white">
          {post.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs font-semibold text-fg">{post.author}</span>
          <span className="block truncate text-2xs text-fg-subtle">{formatPostDate(post.date)}</span>
        </span>
      </div>
    </Link>
  );
}

export default function Blog() {
  useSeo({
    title: 'Blog',
    description:
      'Implementation post-mortems, architecture write-ups and delivery notes from the engineers doing the work. No product pitches — you can tell from the archive.',
  });

  const [category, setCategory] = useState(ALL);

  const rest = useMemo(
    () => posts.filter((p) => p.slug !== featuredPost.slug),
    [],
  );

  const filtered = useMemo(
    () => (category === ALL ? rest : rest.filter((p) => p.category === category)),
    [category, rest],
  );

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        crumbs={[{ label: 'Blog' }]}
        title="Field notes from the people doing the work"
        lead="Post-mortems, architecture decisions and the mistakes we would rather you learn from than repeat. Written by engineers, published whether or not it flatters us."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{postCount} articles</Badge>
          <Badge tone="accent">Written by the delivery team</Badge>
          <Badge icon={Rss}>Monthly digest</Badge>
        </div>
      </PageHeader>

      {/* featured */}
      <Section tight>
        <Container>
          <Reveal>
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 ease-spring hover:border-primary-500/40 hover:shadow-lift sm:p-10"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-[0.25] mask-fade-b" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-primary-500/20 to-transparent blur-3xl"
              />
              <div className="relative max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="accent">Featured</Badge>
                  <Badge tone="primary">{featuredPost.category}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-2xs text-fg-subtle">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {featuredPost.readingTime} min read
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-extrabold leading-tight text-fg text-balance sm:text-[2.1rem] sm:leading-[1.15]">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted text-pretty">{featuredPost.excerpt}</p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                    {featuredPost.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-fg">{featuredPost.author}</span>
                    <span className="block text-2xs text-fg-subtle">
                      {featuredPost.authorRole} · {formatPostDate(featuredPost.date)}
                    </span>
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400">
                    Read the article
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* archive */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Archive"
            title="Everything else we have published"
            lead="Filter by what you are trying to solve. Nothing here is gated and nothing here is a press release."
          />

          <Reveal className="mt-10">
            <div className="flex flex-wrap items-center gap-2">
              {[ALL, ...postCategories].map((c) => {
                const count = c === ALL ? rest.length : rest.filter((p) => p.category === c).length;
                if (count === 0) return null;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={cx(
                      'cursor-pointer rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors',
                      category === c
                        ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                        : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
                    )}
                  >
                    {c}
                    <span className="ml-1.5 text-fg-subtle tnum">{count}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.05}>
            {filtered.map((p) => <PostCard key={p.slug} post={p} />)}
          </RevealGroup>
        </Container>
      </Section>

      {/* newsletter */}
      <Section tight className="border-t border-line bg-surface/50">
        <Container>
          <div className="rounded-3xl border border-line bg-surface p-7 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-xl">
              <h2 className="font-display text-xl font-bold text-fg sm:text-2xl">The field notes, once a month</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                One email a month with whatever we published, plus release notes worth reading. Unsubscribe
                in one click, and we do not use the list for anything else.
              </p>
            </div>
            <form
              className="mt-6 flex w-full max-w-md flex-col gap-2.5 sm:flex-row lg:mt-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="blog-email" className="sr-only">Work email</label>
              <input
                id="blog-email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                className="h-11 flex-1 rounded-xl border border-line bg-surface-2 px-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-primary-500"
              />
              <Button type="submit" size="md" icon={ArrowRight}>Subscribe</Button>
            </form>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Got a problem worth writing about?"
        lead="Most of these articles started as a client engagement that went sideways in an interesting way. Bring us yours."
        primary={{ label: 'Talk to an engineer', to: '/contact' }}
        secondary={{ label: 'See our services', to: '/services' }}
      />
    </>
  );
}
