import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import CommandPalette from './CommandPalette';
import { cx } from '../ui';

/** Resets scroll on route change, honouring hash targets. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);
  return null;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={cx(
        'fixed bottom-6 right-6 z-40 grid h-11 w-11 cursor-pointer place-items-center rounded-full',
        'border border-line bg-surface/90 text-fg-muted shadow-soft backdrop-blur transition-all duration-300',
        'hover:text-fg hover:shadow-lift',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp className="h-4.5 w-4.5" aria-hidden="true" />
    </button>
  );
}

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Global ⌘K / Ctrl+K shortcut.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:shadow-lift"
      >
        Skip to main content
      </a>

      <ScrollManager />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <BackToTop />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
