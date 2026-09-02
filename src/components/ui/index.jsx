import { forwardRef, useEffect, useRef, useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export const cx = (...parts) => parts.filter(Boolean).join(' ');

/* ------------------------------------------------------------------ Container */
export function Container({ className, children, as: As = 'div' }) {
  return <As className={cx('container-page', className)}>{children}</As>;
}

/* ------------------------------------------------------------------ Section */
export function Section({ id, className, children, tight, as: As = 'section' }) {
  return (
    <As id={id} className={cx(tight ? 'py-12 sm:py-14' : 'py-16 sm:py-20 lg:py-24', className)}>
      {children}
    </As>
  );
}

/* ------------------------------------------------------------------ Eyebrow */
export function Eyebrow({ children, className }) {
  return (
    <span
      className={cx(
        'inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1',
        'text-2xs font-semibold uppercase tracking-[0.14em] text-fg-muted backdrop-blur',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ SectionHeading */
export function SectionHeading({ eyebrow, title, lead, align = 'left', className, action }) {
  const centered = align === 'center';
  return (
    <div
      className={cx(
        'flex flex-col gap-4',
        centered && 'items-center text-center',
        !centered && action && 'md:flex-row md:items-end md:justify-between md:gap-10',
        className,
      )}
    >
      <div className={cx('flex flex-col gap-4', centered ? 'max-w-3xl items-center' : 'max-w-2xl')}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-display-sm sm:text-[2.6rem] sm:leading-[1.1] text-balance">{title}</h2>
        {lead && <p className="text-base sm:text-lg leading-relaxed text-fg-muted text-pretty">{lead}</p>}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ Button */
const variants = {
  primary:
    'bg-brand-gradient text-white shadow-soft hover:shadow-glow hover:-translate-y-px active:translate-y-0 border-transparent',
  secondary:
    'bg-surface text-fg border-line hover:border-line-strong hover:bg-surface-2 shadow-xs',
  outline:
    'bg-transparent text-fg border-line-strong hover:bg-surface-2 hover:border-primary-400',
  ghost:
    'bg-transparent text-fg-muted border-transparent hover:text-fg hover:bg-surface-2',
  invert:
    'bg-fg text-bg border-transparent hover:opacity-90 shadow-soft',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-[52px] px-7 text-base gap-2.5 rounded-xl',
};

export const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', className, children, icon: Icon, iconRight = true, ...rest },
  ref,
) {
  const classes = cx(
    'inline-flex items-center justify-center border font-semibold font-display cursor-pointer select-none',
    'transition-all duration-200 ease-spring whitespace-nowrap',
    'disabled:opacity-50 disabled:pointer-events-none',
    variants[variant], sizes[size], className,
  );

  const content = (
    <>
      {Icon && !iconRight && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      {children}
      {Icon && iconRight && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
    </>
  );

  if (to) return <Link ref={ref} to={to} className={classes} {...rest}>{content}</Link>;
  if (href) return <a ref={ref} href={href} className={classes} {...rest}>{content}</a>;
  const As = as || 'button';
  return <As ref={ref} className={classes} {...rest}>{content}</As>;
});

/** Text link with an arrow that slides on hover. */
export function ArrowLink({ to, href, children, className }) {
  const cls = cx(
    'group inline-flex items-center gap-1.5 text-sm font-semibold font-display text-primary-600 dark:text-primary-400',
    'hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-pointer',
    className,
  );
  const inner = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-spring group-hover:translate-x-1" aria-hidden="true" />
    </>
  );
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <Link to={to} className={cls}>{inner}</Link>;
}

/* ------------------------------------------------------------------ Badge */
const badgeTones = {
  neutral: 'bg-surface-2 text-fg-muted border-line',
  primary: 'bg-primary-500/10 text-primary-700 dark:text-primary-300 border-primary-500/25',
  accent: 'bg-accent-500/10 text-accent-600 dark:text-accent-400 border-accent-500/25',
  success: 'bg-success/10 text-success border-success/25',
  warning: 'bg-warning/10 text-warning border-warning/25',
};

export function Badge({ children, tone = 'neutral', className, icon: Icon }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-2xs font-semibold',
        badgeTones[tone] ?? badgeTones.neutral,
        className,
      )}
    >
      {Icon && <Icon className="h-3 w-3" aria-hidden="true" />}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ Reveal */
/** Scroll-triggered entrance. Falls back to no motion when the user asks for it. */
export function Reveal({ children, delay = 0, y = 18, className, once = true }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-12% 0px -8% 0px' });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children of a grid/list. */
export function RevealGroup({ children, className, step = 0.06, y = 18 }) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal key={child?.key ?? i} delay={Math.min(i * step, 0.45)} y={y}>
              {child}
            </Reveal>
          ))
        : children}
    </div>
  );
}

/* ------------------------------------------------------------------ Counter */
export function Counter({ value, decimals = 0, suffix = '', prefix = '', className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  // No inset: the ref sits on the inner span, so any inset delays the count
  // until the number itself is well inside the viewport.
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 0.8 });
  const text = useTransform(spring, (v) =>
    v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
  );
  const [display, setDisplay] = useState(reduce ? value.toFixed(decimals) : '0');

  useEffect(() => {
    if (reduce) { setDisplay(value.toFixed(decimals)); return; }
    if (inView) mv.set(value);
    return text.on('change', (v) => setDisplay(v));
  }, [inView, value, mv, text, reduce, decimals]);

  return (
    <span ref={ref} className={cx('tnum', className)}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ Marquee */
export function Marquee({ items, duration = 42, className, render }) {
  return (
    <div className={cx('relative overflow-hidden mask-fade-x', className)}>
      <div
        className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 gap-4" aria-hidden={pass === 1}>
            {items.map((item, i) => (
              <div key={`${pass}-${i}`}>{render(item, i)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Accordion */
export function Accordion({ items, allowMultiple = false, className }) {
  const [open, setOpen] = useState(() => new Set());
  const baseId = useId();

  const toggle = (i) =>
    setOpen((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set();
      if (prev.has(i)) next.delete(i); else next.add(i);
      return next;
    });

  return (
    <div className={cx('divide-y divide-line rounded-2xl border border-line bg-surface', className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${i}`}
                id={`${baseId}-trigger-${i}`}
                className="flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-surface-2 sm:px-6"
              >
                <span className="font-display text-[15px] font-semibold text-fg sm:text-base">{item.q}</span>
                <ChevronDown
                  className={cx(
                    'h-5 w-5 shrink-0 text-fg-subtle transition-transform duration-200',
                    isOpen && 'rotate-180 text-primary-500',
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`${baseId}-panel-${i}`}
              role="region"
              aria-labelledby={`${baseId}-trigger-${i}`}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6"
            >
              <p className="max-w-3xl text-sm leading-relaxed text-fg-muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ Decorative glow */
export function Glow({ className, from = 'primary' }) {
  const tint = from === 'accent'
    ? 'from-accent-500/25 via-primary-500/10'
    : 'from-primary-500/25 via-accent-500/10';
  return (
    <div
      aria-hidden="true"
      className={cx('pointer-events-none absolute rounded-full bg-gradient-to-br to-transparent blur-3xl', tint, className)}
    />
  );
}

/* ------------------------------------------------------------------ Stat */
export function Stat({ value, suffix, decimals, label, hint }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
        <Counter value={value} suffix={suffix} decimals={decimals} />
      </div>
      <div className="text-sm font-semibold text-fg">{label}</div>
      {hint && <div className="text-xs text-fg-subtle">{hint}</div>}
    </div>
  );
}
