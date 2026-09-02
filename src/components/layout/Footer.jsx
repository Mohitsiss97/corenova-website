import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

import Logo from './Logo';
import { Button, Container, cx } from '../ui';
import { site, footerNav, legalNav, certifications } from '../../data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-line bg-surface">
      {/* Newsletter / final CTA band */}
      <Container>
        <div className="ring-gradient relative -mt-px overflow-hidden rounded-3xl border border-line bg-surface-2 px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-gradient-to-br from-primary-500/25 to-transparent blur-3xl"
          />
          <div className="relative max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Get the field notes, once a month
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
              Implementation post-mortems, architecture write-ups and release notes. No product pitches — you can tell from the archive.
            </p>
          </div>
          <form
            className="relative mt-6 flex w-full max-w-md flex-col gap-2.5 sm:flex-row lg:mt-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">Work email</label>
            <input
              id="footer-email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
              className="h-11 flex-1 rounded-xl border border-line bg-surface px-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-primary-500"
            />
            <Button type="submit" size="md" icon={ArrowRight}>Subscribe</Button>
          </form>
        </div>
      </Container>

      <Container className="pb-10 pt-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2.4fr)]">
          {/* Brand column */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {site.description}
            </p>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-fg-muted transition-colors hover:text-fg">
                  <Mail className="h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 text-fg-muted transition-colors hover:text-fg">
                  <Phone className="h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-fg-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                <span>{site.offices[0].address}</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <p className="mb-3.5 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-sm text-fg-muted transition-colors hover:text-fg">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Certifications */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
          <span className="flex items-center gap-2 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Certified
          </span>
          {certifications.map((c) => (
            <span key={c} className="text-xs font-semibold text-fg-muted">{c}</span>
          ))}
        </div>

        {/* Legal row */}
        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-xs text-fg-subtle transition-colors hover:text-fg-muted">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

/** Reusable pre-footer CTA band, dropped at the end of most pages. */
export function CtaBand({
  title = 'Tell us what you are trying to fix',
  lead = 'A 30-minute call with an engineer, not a sales script. You leave with a straight answer on fit, effort and cost.',
  primary = { label: 'Book a demo', to: '/demo' },
  secondary = { label: 'Talk to sales', to: '/contact' },
  className,
}) {
  return (
    <Container className={cx('py-16 sm:py-20', className)}>
      <div className="ring-gradient relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35] mask-fade-b" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-t from-primary-500/25 via-accent-500/10 to-transparent blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-display-sm text-balance sm:text-[2.75rem] sm:leading-[1.08]">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-fg-muted text-pretty">{lead}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to={primary.to} size="lg" icon={ArrowRight}>{primary.label}</Button>
            <Button to={secondary.to} size="lg" variant="secondary">{secondary.label}</Button>
          </div>
          <p className="mt-5 text-xs text-fg-subtle">
            Average first response: 3 working hours · No obligation, no sales sequence
          </p>
        </div>
      </div>
    </Container>
  );
}
