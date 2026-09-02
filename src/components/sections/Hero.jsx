import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, Star, Check } from 'lucide-react';

import { Button, Container, Counter, cx } from '../ui';
import { stats } from '../../data/site';
import { productCount, categoryCount } from '../../data/products';

/* A code-drawn product preview. No image assets, scales crisply, themes cleanly. */
function AppPreview() {
  const rows = [
    { name: 'Nova ERP', env: 'Production', health: 99.98, tone: 'success' },
    { name: 'Nova People', env: 'Production', health: 99.96, tone: 'success' },
    { name: 'Nova WMS', env: 'Production', health: 99.91, tone: 'success' },
    { name: 'Nova Insight', env: 'Staging', health: 99.4, tone: 'warning' },
  ];
  const bars = [42, 58, 51, 73, 66, 88, 79, 95, 84, 100, 92, 97];

  return (
    <div className="ring-gradient relative overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </span>
        <span className="ml-2 truncate rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[10px] text-fg-subtle">
          app.corenova.tech/console
        </span>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-5 sm:p-5">
        {/* metric column */}
        <div className="flex flex-col gap-3 sm:col-span-2">
          <div className="rounded-xl border border-line bg-surface-2 p-4">
            <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Platform uptime</p>
            <p className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-fg tnum">99.98%</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div className="h-full w-[99%] rounded-full bg-brand-gradient" />
            </div>
          </div>
          <div className="rounded-xl border border-line bg-surface-2 p-4">
            <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Documents processed</p>
            <p className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-fg tnum">1.42M</p>
            <p className="mt-1 text-2xs font-semibold text-success">+12.4% vs last month</p>
          </div>
          <div className="hidden rounded-xl border border-line bg-surface-2 p-4 sm:block">
            <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Throughput</p>
            <div className="mt-3 flex h-14 items-end gap-1" aria-hidden="true">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={cx('flex-1 rounded-sm', i > 8 ? 'bg-brand-gradient' : 'bg-primary-500/25')}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* deployment table */}
        <div className="rounded-xl border border-line bg-surface-2 p-4 sm:col-span-3">
          <div className="flex items-center justify-between">
            <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Your deployments</p>
            <span className="rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-2xs font-semibold text-success">
              All healthy
            </span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {rows.map((r) => (
              <li key={r.name} className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5">
                <span className={cx('h-2 w-2 shrink-0 rounded-full', r.tone === 'success' ? 'bg-success' : 'bg-warning')} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-fg">{r.name}</span>
                  <span className="block text-2xs text-fg-subtle">{r.env}</span>
                </span>
                <span className="shrink-0 font-mono text-2xs text-fg-muted tnum">{r.health}%</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-primary-500/25 bg-primary-500/10 px-3 py-2.5">
            <Check className="h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
            <p className="text-2xs text-fg-muted">Single sign-on active across all 4 products</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      {/* backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-40 mask-fade-b" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary-500/20 via-accent-500/12 to-transparent blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-400/15 to-transparent blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          {/* copy */}
          <div className="max-w-2xl">
            <motion.div {...fade(0)}>
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 py-1 pl-1 pr-3 text-xs backdrop-blur transition-colors hover:border-line-strong"
              >
                <span className="rounded-full bg-brand-gradient px-2.5 py-1 text-2xs font-bold uppercase tracking-wider text-white">
                  New
                </span>
                <span className="font-medium text-fg-muted">Nova Flow 2.0 — no-code approvals</span>
                <ArrowRight className="h-3.5 w-3.5 text-fg-subtle transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.h1 {...fade(0.06)} className="mt-6 text-display-sm text-balance sm:text-[2.9rem] sm:leading-[1.08] lg:text-[3.4rem] lg:leading-[1.06]">
              Enterprise software,{' '}
              <span className="text-gradient">already built</span>{' '}
              — and the team to bend it to your business.
            </motion.h1>

            <motion.p {...fade(0.12)} className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted text-pretty sm:text-lg">
              {productCount} production-ready products across {categoryCount} categories — ERP, CRM, HRMS, POS,
              warehouse, healthcare and more. Deploy on cloud, private cloud or your own servers, and we customise the rest.
            </motion.p>

            <motion.div {...fade(0.18)} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/products" size="lg" icon={ArrowRight}>Browse {productCount} products</Button>
              <Button to="/demo" size="lg" variant="secondary" icon={Play} iconRight={false}>Watch a 4-min demo</Button>
            </motion.div>

            {/* Two deliberate rows rather than one wrapping row — a wrapped
                divider list strands a separator at the start of the next line. */}
            <motion.div {...fade(0.24)} className="mt-8 space-y-2 text-xs text-fg-subtle">
              <p className="flex items-center gap-1.5">
                <span className="flex" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
                  ))}
                </span>
                <strong className="font-semibold text-fg">4.7/5</strong> from 3,400+ reviews
              </p>
              <p>ISO 27001 · SOC 2 Type II · 620+ deployments in 24 countries</p>
            </motion.div>
          </div>

          {/* preview */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 26, scale: 0.97 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
                })}
            className="relative"
          >
            <AppPreview />
            {/* floating chip */}
            <div className="absolute -bottom-7 -left-7 hidden items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-lift lg:flex">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-white">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-bold text-fg">Live in 3 weeks</span>
                <span className="block text-2xs text-fg-subtle">Median cloud go-live</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* stat strip */}
        <motion.div
          {...fade(0.32)}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-5 py-6">
              <div className="font-display text-3xl font-extrabold tracking-tight text-fg">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <p className="mt-1 text-sm font-semibold text-fg">{s.label}</p>
              <p className="mt-0.5 text-xs text-fg-subtle">{s.hint}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
