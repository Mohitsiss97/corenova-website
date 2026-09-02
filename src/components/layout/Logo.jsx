import { Link } from 'react-router-dom';
import { site } from '../../data/site';

/** Wordmark + glyph. The glyph is a stylised "nova" burst inside a rounded tile. */
export default function Logo({ className = '', compact = false }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 rounded-lg ${className}`}
      aria-label={`${site.name} — home`}
    >
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-brand-gradient shadow-soft">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M12 2.5 14.4 9.6 21.5 12l-7.1 2.4L12 21.5 9.6 14.4 2.5 12l7.1-2.4L12 2.5Z"
            fill="white"
            fillOpacity="0.95"
          />
          <circle cx="12" cy="12" r="2.1" fill="white" fillOpacity="0.45" />
        </svg>
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[17px] font-extrabold tracking-tight text-fg">{site.name}</span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
            Technologies
          </span>
        </span>
      )}
    </Link>
  );
}
