import { useTheme } from '../theme/ThemeProvider';
import { techLogos } from '../data/technologies';
import { cx } from './ui';

/**
 * Brand mark for a technology, picked for the active theme.
 * Renders nothing when we have no logo for that name — callers keep
 * their text label either way, so the layout never depends on this.
 */
export default function TechLogo({ name, size = 20, className, fallback = true }) {
  const { isDark } = useTheme();
  const entry = techLogos[name];

  // Not every technology has a brand mark. Where the caller lines logos up in
  // a column, hold the same width with a neutral dot so labels stay aligned.
  if (!entry) {
    if (!fallback) return null;
    return (
      <span
        aria-hidden="true"
        className={cx('grid shrink-0 place-items-center', className)}
        style={{ width: size, height: size }}
      >
        <span className="rounded-full bg-fg-subtle/35" style={{ width: size * 0.3, height: size * 0.3 }} />
      </span>
    );
  }

  const file = isDark && entry.dark ? entry.dark : entry.light;

  return (
    <img
      src={`${import.meta.env.BASE_URL}logos/${file}.svg`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={cx(
        'shrink-0 object-contain',
        // Single-variant monochrome marks need flipping on dark surfaces.
        entry.invert && isDark && 'invert',
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}

/** True when a name has a mark — lets callers reserve space only when needed. */
export const hasTechLogo = (name) => Boolean(techLogos[name]);
