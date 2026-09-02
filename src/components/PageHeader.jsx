import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { Container, Eyebrow, cx } from './ui';

/** Breadcrumb + title block used at the top of every inner page. */
export default function PageHeader({ eyebrow, title, lead, crumbs = [], children, align = 'left', className }) {
  const centered = align === 'center';

  return (
    <section className={cx('relative overflow-hidden border-b border-line bg-surface/50', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-[0.3] mask-fade-b" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/3 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary-500/18 via-accent-500/10 to-transparent blur-3xl"
      />

      <Container className="relative py-12 sm:py-16 lg:py-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={cx('mb-6', centered && 'flex justify-center')}>
            <ol className="flex flex-wrap items-center gap-1 text-xs text-fg-subtle">
              <li><Link to="/" className="transition-colors hover:text-fg-muted">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={c.to ?? c.label} className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  {c.to && i < crumbs.length - 1
                    ? <Link to={c.to} className="transition-colors hover:text-fg-muted">{c.label}</Link>
                    : <span className="font-medium text-fg-muted" aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={cx('flex flex-col gap-5', centered ? 'items-center text-center' : 'max-w-3xl')}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-display-sm text-balance sm:text-display-md">{title}</h1>
          {lead && <p className="max-w-2xl text-base leading-relaxed text-fg-muted text-pretty sm:text-lg">{lead}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
