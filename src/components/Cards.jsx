import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Star, Quote, Check } from 'lucide-react';

import { Badge, cx } from './ui';
import { getCategory } from '../data/products';

const badgeTone = { Flagship: 'primary', Popular: 'accent', New: 'success', AI: 'warning' };

/* ---------------------------------------------------------------- product */
export function ProductCard({ product, showCategory = true }) {
  const cat = getCategory(product.category);
  return (
    <Link
      to={`/products/${product.category}/${product.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-primary-500 transition-colors group-hover:border-primary-500/40 group-hover:bg-primary-500/10">
          {cat?.icon ? <cat.icon className="h-5 w-5" aria-hidden="true" /> : null}
        </span>
        {product.badge && <Badge tone={badgeTone[product.badge] ?? 'neutral'}>{product.badge}</Badge>}
      </div>

      <h3 className="mt-4 font-display text-[17px] font-bold text-fg">{product.name}</h3>
      {showCategory && <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{cat?.short}</p>}
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{product.tagline}</p>

      <ul className="mt-4 space-y-1.5">
        {product.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs text-fg-muted">
            <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary-500" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4 [margin-block-start:1.25rem]">
        <div>
          <p className="text-2xs text-fg-subtle">
            {product.from === 0 ? 'Usage based' : `From $${product.from}`}
          </p>
          <p className="text-2xs text-fg-subtle">{product.from === 0 ? 'Pay for what you use' : product.pricing}</p>
        </div>
        <div className="flex items-center gap-1 text-2xs font-semibold text-fg-muted">
          <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
          {product.rating}
          <span className="font-normal text-fg-subtle">({product.reviews})</span>
        </div>
      </div>

      <ArrowUpRight
        className="absolute right-4 top-4 h-4 w-4 -translate-y-1 text-fg-subtle opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
}

/* ---------------------------------------------------------------- category */
export function CategoryCard({ category, compact = false }) {
  return (
    <Link
      to={`/products/${category.slug}`}
      className={cx(
        'group flex h-full flex-col rounded-2xl border border-line bg-surface transition-all duration-300 ease-spring',
        'hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift',
        compact ? 'p-4' : 'p-5',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft text-primary-600 transition-transform duration-300 group-hover:scale-105 dark:text-primary-400">
          <category.icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="rounded-full border border-line bg-surface-2 px-2 py-0.5 text-2xs font-semibold text-fg-subtle">
          {category.count}
        </span>
      </div>
      <h3 className="mt-4 font-display text-[15px] font-bold leading-snug text-fg">{category.name}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">{category.tagline}</p>
      {!compact && (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400">
          Explore
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      )}
    </Link>
  );
}

/* ---------------------------------------------------------------- service */
export function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-lift"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-accent-500 transition-colors group-hover:border-accent-500/40 group-hover:bg-accent-500/10">
        <service.icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-[17px] font-bold text-fg">{service.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{service.tagline}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{service.typical}</span>
        <ArrowRight className="h-4 w-4 text-fg-subtle transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-500" aria-hidden="true" />
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------------- industry */
export function IndustryCard({ industry }) {
  return (
    <Link
      to={`/industries/${industry.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-primary-500/12 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-primary-500">
        <industry.icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="relative mt-5 font-display text-[17px] font-bold text-fg">{industry.name}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-fg-muted">{industry.tagline}</p>
      <div className="relative mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
        {industry.outcomes.slice(0, 2).map((o) => (
          <div key={o.label}>
            <p className="font-display text-lg font-extrabold tracking-tight text-fg tnum">{o.metric}</p>
            <p className="text-2xs text-fg-subtle">{o.label}</p>
          </div>
        ))}
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------------- case study */
export function CaseStudyCard({ study, featured = false }) {
  return (
    <Link
      to={`/case-studies/${study.slug}`}
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 ease-spring',
        'hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-lift',
        featured ? 'p-7 sm:p-8' : 'p-6',
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-[0.25] mask-fade-b" />
      <div className="relative flex items-center gap-2">
        <Badge tone="primary">{study.client}</Badge>
        <span className="text-2xs uppercase tracking-wider text-fg-subtle">{study.industry}</span>
      </div>
      <h3 className={cx('relative mt-4 font-display font-bold leading-snug text-fg', featured ? 'text-2xl' : 'text-lg')}>
        {study.title}
      </h3>
      <p className="relative mt-2.5 text-sm leading-relaxed text-fg-muted">{study.summary}</p>

      <div className={cx('relative mt-6 grid gap-4 border-t border-line pt-5', featured ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2')}>
        {study.results.slice(0, featured ? 4 : 2).map((r) => (
          <div key={r.label}>
            <p className="font-display text-xl font-extrabold tracking-tight text-gradient tnum">{r.metric}</p>
            <p className="mt-0.5 text-2xs leading-snug text-fg-subtle">{r.label}</p>
          </div>
        ))}
      </div>

      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-primary-600 dark:text-primary-400">
        Read the case study
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

/* ---------------------------------------------------------------- testimonial */
export function TestimonialCard({ t }) {
  return (
    <figure className="flex h-full w-[19rem] shrink-0 flex-col rounded-2xl border border-line bg-surface p-6 sm:w-[22rem]">
      <Quote className="h-6 w-6 text-primary-500/40" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
          {t.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs font-bold text-fg">{t.author}</span>
          <span className="block truncate text-2xs text-fg-subtle">{t.role}, {t.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}
