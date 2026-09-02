import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock, Quote, Info, Share2 } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import NotFound from './NotFound';
import { CtaBand } from '../components/layout/Footer';
import {
  Button, Container, Section, Reveal, RevealGroup, Badge,
} from '../components/ui';

import { getPost, relatedPosts, formatPostDate } from '../data/blog';
import useSeo from '../hooks/useSeo';

/** Stable anchor id for a heading, so the contents list and the body agree. */
const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Renders one content block. Unknown types are skipped rather than crashing. */
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 id={slugify(block.text)} className="mt-12 scroll-mt-28 font-display text-2xl font-bold text-fg first:mt-0">
          {block.text}
        </h2>
      );

    case 'p':
      return <p className="mt-5 text-base leading-relaxed text-fg-muted text-pretty">{block.text}</p>;

    case 'ul':
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-fg-muted">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'quote':
      return (
        <figure className="mt-8 rounded-2xl border-l-2 border-primary-500 bg-surface px-6 py-5">
          <Quote className="h-5 w-5 text-primary-500/40" aria-hidden="true" />
          <blockquote className="mt-3 font-display text-lg font-semibold leading-snug text-fg text-balance">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
              {block.cite}
            </figcaption>
          )}
        </figure>
      );

    case 'code':
      return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface-2">
          {block.lang && (
            <div className="border-b border-line px-4 py-2">
              <span className="font-mono text-2xs font-semibold uppercase tracking-wider text-fg-subtle">
                {block.lang}
              </span>
            </div>
          )}
          <pre className="overflow-x-auto p-4">
            <code className="font-mono text-[13px] leading-relaxed text-fg">{block.text}</code>
          </pre>
        </div>
      );

    case 'note':
      return (
        <aside className="mt-6 flex gap-3 rounded-2xl border border-accent-500/25 bg-accent-500/10 px-5 py-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-fg-muted">{block.text}</p>
        </aside>
      );

    default:
      return null;
  }
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const post = getPost(slug);

  // Hooks must run on every render, so this sits above the early return.
  useSeo(post ? { title: post.title, description: post.excerpt } : undefined);

  // An unknown slug behaves exactly like any other bad URL.
  if (!post) return <NotFound />;

  const headings = post.body.filter((b) => b.type === 'h2');
  const related = relatedPosts(post);

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        crumbs={[{ label: 'Blog', to: '/blog' }, { label: post.title }]}
        title={post.title}
        lead={post.excerpt}
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
            {post.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </span>
          <span>
            <span className="block text-sm font-semibold text-fg">{post.author}</span>
            <span className="block text-2xs text-fg-subtle">{post.authorRole}</span>
          </span>
          <span className="h-8 w-px bg-line" aria-hidden="true" />
          <span className="text-xs text-fg-subtle">{formatPostDate(post.date)}</span>
          <Badge icon={Clock}>{post.readingTime} min read</Badge>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] lg:gap-16">
            {/* contents */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <nav aria-label="On this page">
                <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">On this page</p>
                <ol className="mt-4 space-y-2.5 border-l border-line">
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a
                        href={`#${slugify(h.text)}`}
                        className="-ml-px block border-l-2 border-transparent pl-4 text-sm text-fg-muted transition-colors hover:border-primary-500 hover:text-fg"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {post.tags?.length > 0 && (
                <div className="mt-8">
                  <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Tagged</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <li key={t}>
                        <Badge>{t}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 border-t border-line pt-6">
                <Button to="/contact" variant="secondary" size="sm" icon={Share2} iconRight={false}>
                  Discuss this with us
                </Button>
              </div>
            </aside>

            {/* body */}
            <article className="max-w-3xl">
              {post.body.map((block, i) => <Block key={i} block={block} />)}

              <div className="mt-14 rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                    {post.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-bold text-fg">{post.author}</p>
                    <p className="text-xs text-fg-subtle">{post.authorRole}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                  Questions about anything in this article get answered by the person who wrote it, not by a
                  sales sequence. Reply to the monthly digest or send it straight to the team.
                </p>
                <Button to="/contact" variant="secondary" size="sm" className="mt-5" icon={ArrowRight}>
                  Ask a question
                </Button>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* related */}
      <Section className="border-t border-line bg-surface/50">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-xl font-bold text-fg">Related reading</h2>
            <Link to="/blog" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
              All articles
            </Link>
          </div>
          <RevealGroup className="mt-6 grid gap-4 lg:grid-cols-3" step={0.06}>
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="primary">{p.category}</Badge>
                  <span className="text-2xs text-fg-subtle">{p.readingTime} min</span>
                </div>
                <h3 className="mt-4 font-display text-[16px] font-bold leading-snug text-fg">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{p.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-primary-600 dark:text-primary-400">
                  Read
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line-strong bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm text-fg-muted">
                One email a month with whatever we published. No product pitches — you can check the archive
                before subscribing.
              </p>
              <Button to="/resources" variant="secondary" size="md" icon={ArrowRight} className="shrink-0">
                Browse resources
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
