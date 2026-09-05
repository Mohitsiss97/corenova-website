import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ChevronDown, Search, Menu, X, Sun, Moon, ArrowRight, Sparkles, Command,
} from 'lucide-react';

import Logo from './Logo';
import { Button, Badge, cx } from '../ui';
import { useTheme } from '../../theme/ThemeProvider';
import { categories, categoryGroups, productCount } from '../../data/products';
import { brand, hosts } from '../../data/brand';
import { services } from '../../data/services';
import { industries } from '../../data/industries';

/* Six top-level items — the ceiling the research recommends. */
const MENUS = ['products', 'services', 'industries'];

const simpleLinks = [
  { label: 'Technologies', to: '/technologies' },
  { label: 'Case studies', to: '/case-studies' },
  { label: 'Pricing', to: '/pricing' },
];

/* ---------------------------------------------------------------- panels */

function ProductsPanel({ close }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryGroups.map((group) => (
          <div key={group.id}>
            <p className="mb-3 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{group.label}</p>
            <ul className="space-y-0.5">
              {categories.filter((c) => c.group === group.id).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/products/${cat.slug}`}
                    onClick={close}
                    className="group flex items-start gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-surface-2"
                  >
                    <cat.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-semibold text-fg">{cat.name}</span>
                      <span className="block text-2xs text-fg-subtle">{cat.count} products</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ring-gradient flex flex-col justify-between rounded-2xl bg-surface-2 p-5">
        <div>
          <Badge tone="primary" icon={Sparkles}>Featured</Badge>
          <p className="mt-3 font-display text-[15px] font-bold text-fg">{brand.suiteName} Platform</p>
          <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
            Every product shares one identity layer, one data model and one audit log — so integration stops being a project.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <Button to="/products" size="sm" onClick={close} icon={ArrowRight}>Browse all {productCount}</Button>
          <Button to="/demo" size="sm" variant="secondary" onClick={close}>Book a demo</Button>
        </div>
      </div>
    </div>
  );
}

function ServicesPanel({ close }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
      <ul className="grid gap-1 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              to={`/services/${s.slug}`}
              onClick={close}
              className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface-2"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-primary-500 transition-colors group-hover:border-primary-500/40">
                <s.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-fg">{s.name}</span>
                <span className="mt-0.5 block text-xs leading-snug text-fg-subtle">{s.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl border border-line bg-surface-2 p-5">
        <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Engagement models</p>
        <ul className="mt-3 space-y-2.5">
          {['Fixed scope', 'Time & material', 'Dedicated team', 'Build-operate-transfer'].map((m) => (
            <li key={m} className="flex items-center gap-2 text-[13px] text-fg-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden="true" />
              {m}
            </li>
          ))}
        </ul>
        <Button to="/process" size="sm" variant="secondary" className="mt-5 w-full" onClick={close}>
          How we work
        </Button>
      </div>
    </div>
  );
}

function IndustriesPanel({ close }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind) => (
        <Link
          key={ind.slug}
          to={`/industries/${ind.slug}`}
          onClick={close}
          className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface-2"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent-500 transition-colors group-hover:border-accent-500/40">
            <ind.icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold text-fg">{ind.name}</span>
            <span className="mt-0.5 block text-xs leading-snug text-fg-subtle">{ind.tagline}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

const PANELS = { products: ProductsPanel, services: ServicesPanel, industries: IndustriesPanel };

/* ---------------------------------------------------------------- navbar */

export default function Navbar({ onOpenSearch }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();
  const reduce = useReducedMotion();
  const location = useLocation();
  const closeTimer = useRef(null);
  const navRef = useRef(null);

  // Close everything on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the mega menu; clicking outside does too.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpenMenu(null); setMobileOpen(false); } };
    const onClick = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openWith = (key) => { clearTimeout(closeTimer.current); setOpenMenu(key); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 140); };

  const Panel = openMenu ? PANELS[openMenu] : null;

  return (
    <header
      ref={navRef}
      className={cx(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled || openMenu
          ? 'border-b border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      {/* Announcement strip */}
      <div className="hidden border-b border-line/70 bg-surface-2/60 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2 text-fg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden="true" />
            {brand.productPrefix} Flow 2.0 is live — no-code approvals across every product.
            <Link to="/blog" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
              Read the release notes
            </Link>
          </p>
          <div className="flex items-center gap-5 text-fg-subtle">
            <Link to="/support" className="hover:text-fg">Support</Link>
            <Link to="/docs" className="hover:text-fg">Docs</Link>
            <a href={`https://${hosts.console}`} className="hover:text-fg">Customer login</a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[68px]">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {MENUS.map((key) => (
            <div key={key} onMouseEnter={() => openWith(key)} onMouseLeave={scheduleClose}>
              <button
                type="button"
                aria-expanded={openMenu === key}
                aria-haspopup="true"
                onClick={() => setOpenMenu(openMenu === key ? null : key)}
                className={cx(
                  'flex h-9 cursor-pointer items-center gap-1 rounded-lg px-3 text-sm font-semibold capitalize transition-colors',
                  openMenu === key ? 'bg-surface-2 text-fg' : 'text-fg-muted hover:text-fg',
                )}
              >
                {key}
                <ChevronDown
                  className={cx('h-3.5 w-3.5 transition-transform duration-200', openMenu === key && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>
            </div>
          ))}
          {simpleLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => cx(
                'flex h-9 items-center rounded-lg px-3 text-sm font-semibold transition-colors',
                isActive ? 'text-primary-600 dark:text-primary-400' : 'text-fg-muted hover:text-fg',
              )}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search the site"
            className="hidden h-9 cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface px-2.5 text-xs text-fg-subtle transition-colors hover:border-line-strong hover:text-fg-muted md:flex"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Search</span>
            <kbd className="ml-1 hidden items-center gap-0.5 rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle lg:inline-flex">
              <Command className="h-2.5 w-2.5" aria-hidden="true" />K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>

          <Button to="/demo" size="sm" className="hidden sm:inline-flex">Book a demo</Button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-line bg-surface text-fg lg:hidden"
          >
            {mobileOpen ? <X className="h-4.5 w-4.5" aria-hidden="true" /> : <Menu className="h-4.5 w-4.5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {Panel && (
          <motion.div
            key={openMenu}
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => openWith(openMenu)}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-bg/95 backdrop-blur-xl lg:block"
          >
            <div className="container-page py-8">
              <Panel close={() => setOpenMenu(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} onOpenSearch={onOpenSearch} />}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------------------------------------------------- mobile */

function MobileMenu({ onClose, onOpenSearch }) {
  const reduce = useReducedMotion();
  const [section, setSection] = useState(null);

  const groups = [
    { key: 'products', label: 'Products', items: categories.map((c) => ({ label: c.name, to: `/products/${c.slug}`, meta: `${c.count}` })) },
    { key: 'services', label: 'Services', items: services.map((s) => ({ label: s.name, to: `/services/${s.slug}` })) },
    { key: 'industries', label: 'Industries', items: industries.map((i) => ({ label: i.name, to: `/industries/${i.slug}` })) },
  ];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden"
    >
      <div className="container-page space-y-1 py-5">
        <button
          type="button"
          onClick={() => { onClose(); onOpenSearch(); }}
          className="mb-3 flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg-subtle"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search products, services, tech…
        </button>

        {groups.map((g) => (
          <div key={g.key} className="border-b border-line last:border-0">
            <button
              type="button"
              onClick={() => setSection(section === g.key ? null : g.key)}
              aria-expanded={section === g.key}
              className="flex w-full cursor-pointer items-center justify-between py-3.5 text-left font-display text-[15px] font-semibold text-fg"
            >
              {g.label}
              <ChevronDown className={cx('h-4 w-4 text-fg-subtle transition-transform', section === g.key && 'rotate-180')} aria-hidden="true" />
            </button>
            {section === g.key && (
              <ul className="space-y-0.5 pb-3">
                {g.items.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} onClick={onClose} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-fg-muted hover:bg-surface-2 hover:text-fg">
                      {it.label}
                      {it.meta && <span className="text-2xs text-fg-subtle">{it.meta}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {[...simpleLinks, { label: 'About', to: '/about' }, { label: 'Careers', to: '/careers' }, { label: 'Contact', to: '/contact' }].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={onClose}
            className="flex items-center justify-between border-b border-line py-3.5 font-display text-[15px] font-semibold text-fg last:border-0"
          >
            {l.label}
            <ArrowRight className="h-4 w-4 text-fg-subtle" aria-hidden="true" />
          </Link>
        ))}

        <div className="flex flex-col gap-2 pt-4">
          <Button to="/demo" size="lg" onClick={onClose}>Book a demo</Button>
          <Button to="/contact" size="lg" variant="secondary" onClick={onClose}>Talk to sales</Button>
        </div>
      </div>
    </motion.div>
  );
}
