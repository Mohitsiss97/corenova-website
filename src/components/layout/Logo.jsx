import { Link } from 'react-router-dom';

import { brand } from '../../data/brand';

/**
 * Wordmark + glyph. Everything visible here — the name, the sub-label and the
 * mark itself — comes from `brand`, so a rebrand needs no change in this file.
 * Keep `public/favicon.svg` in step with `brand.logo.glyph`.
 */
export default function Logo({ className = '', compact = false }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 rounded-lg ${className}`}
      aria-label={`${brand.name} — home`}
    >
      <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-brand-gradient shadow-soft">
        <svg
          viewBox={brand.logo.viewBox}
          className="h-5 w-5"
          fill="none"
          stroke="white"
          strokeWidth={brand.logo.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={brand.logo.glyph} />
        </svg>
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[17px] font-extrabold tracking-tight text-fg">
            {brand.wordmark.lead}{' '}
            <span className="font-semibold text-fg-muted">{brand.wordmark.trail}</span>
          </span>
          {brand.wordmarkSub && (
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
              {brand.wordmarkSub}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
