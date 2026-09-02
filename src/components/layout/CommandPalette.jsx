import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Search, CornerDownLeft, ArrowUp, ArrowDown, X } from 'lucide-react';

import { cx } from '../ui';
import { categories, products } from '../../data/products';
import { services } from '../../data/services';
import { industries } from '../../data/industries';
import { techGroups } from '../../data/technologies';

/** Flattened, searchable index of everything the site can navigate to. */
function buildIndex() {
  const entries = [];
  const push = (group, label, to, hint) => entries.push({ group, label, to, hint });

  push('Pages', 'Home', '/', 'Start here');
  push('Pages', 'All products', '/products', `${products.length} products, ${categories.length} categories`);
  push('Pages', 'All services', '/services', '10 service lines');
  push('Pages', 'Technologies', '/technologies', 'Our full stack');
  push('Pages', 'Case studies', '/case-studies', 'Proof with numbers');
  push('Pages', 'Pricing', '/pricing', 'Plans and calculator');
  push('Pages', 'About us', '/about', 'Story, team, offices');
  push('Pages', 'How we work', '/process', 'Six-stage delivery');
  push('Pages', 'Careers', '/careers', 'Open roles');
  push('Pages', 'Contact', '/contact', 'Offices and enquiry form');
  push('Pages', 'Book a demo', '/demo', 'Pick a slot');

  categories.forEach((c) => push('Categories', c.name, `/products/${c.slug}`, `${c.count} products · ${c.short}`));
  products.forEach((p) => push('Products', p.name, `/products/${p.category}/${p.slug}`, p.tagline));
  services.forEach((s) => push('Services', s.name, `/services/${s.slug}`, s.tagline));
  industries.forEach((i) => push('Industries', i.name, `/industries/${i.slug}`, i.tagline));
  techGroups.forEach((g) =>
    g.items.forEach((t) => push('Technologies', t.name, `/technologies#${g.id}`, `${g.name} · ${t.level}`)),
  );

  return entries;
}

const INDEX = buildIndex();
const GROUP_ORDER = ['Pages', 'Products', 'Categories', 'Services', 'Industries', 'Technologies'];

function score(entry, q) {
  const label = entry.label.toLowerCase();
  if (label === q) return 0;
  if (label.startsWith(q)) return 1;
  if (label.includes(q)) return 2;
  if ((entry.hint ?? '').toLowerCase().includes(q)) return 3;
  return -1;
}

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return INDEX.filter((e) => e.group === 'Pages').slice(0, 8);
    }
    return INDEX
      .map((e) => ({ e, s: score(e, q) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => a.s - b.s || GROUP_ORDER.indexOf(a.e.group) - GROUP_ORDER.indexOf(b.e.group))
      .slice(0, 24)
      .map((r) => r.e);
  }, [query]);

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    if (!open) { setQuery(''); return; }
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Keep the highlighted row in view while arrowing through.
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (entry) => { if (!entry) return; onClose(); navigate(entry.to); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (i + 1) % Math.max(results.length, 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Site search">
          <motion.button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 h-full w-full cursor-default bg-slate-950/55 backdrop-blur-sm"
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-[10vh] w-[92%] max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4.5 w-4.5 shrink-0 text-fg-subtle" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search products, services, industries, tech…"
                aria-label="Search"
                className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-subtle"
              />
              <button
                type="button" onClick={onClose} aria-label="Close"
                className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md text-fg-subtle hover:bg-surface-2 hover:text-fg"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-10 text-center text-sm text-fg-subtle">
                  No matches for “{query}”. Try “ERP”, “payroll”, “Kubernetes” or “retail”.
                </p>
              )}
              {results.map((entry, i) => {
                const showGroup = entry.group !== lastGroup;
                lastGroup = entry.group;
                return (
                  <div key={`${entry.to}-${entry.label}-${i}`}>
                    {showGroup && (
                      <p className="px-3 pb-1.5 pt-3 text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                        {entry.group}
                      </p>
                    )}
                    <button
                      type="button"
                      data-active={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(entry)}
                      className={cx(
                        'flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors',
                        i === active ? 'bg-primary-500/10' : 'hover:bg-surface-2',
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-fg">{entry.label}</span>
                        {entry.hint && <span className="block truncate text-xs text-fg-subtle">{entry.hint}</span>}
                      </span>
                      {i === active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-line bg-surface-2 px-4 py-2.5 text-2xs text-fg-subtle">
              <span className="flex items-center gap-1"><ArrowUp className="h-3 w-3" aria-hidden="true" /><ArrowDown className="h-3 w-3" aria-hidden="true" /> navigate</span>
              <span className="flex items-center gap-1"><CornerDownLeft className="h-3 w-3" aria-hidden="true" /> open</span>
              <span className="ml-auto">{INDEX.length} entries indexed</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
