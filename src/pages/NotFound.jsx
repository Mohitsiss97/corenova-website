import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';

import { Button, Container } from '../components/ui';
import { categories } from '../data/products';
import useSeo from '../hooks/useSeo';

export default function NotFound() {
  useSeo({ title: 'Page not found' });

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-40 mask-fade-b" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary-500/18 via-accent-500/10 to-transparent blur-3xl" />

      <Container className="relative flex min-h-[70dvh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-7xl font-extrabold tracking-tight text-gradient sm:text-8xl">404</p>
        <h1 className="mt-6 text-display-sm text-balance">This page moved, or never existed</h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
          Nothing lives at that address. Try the catalog, or hit{' '}
          <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-xs">⌘K</kbd> to search the whole site.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/" size="lg" icon={ArrowRight}>Back to home</Button>
          <Button to="/products" size="lg" variant="secondary" icon={Search} iconRight={false}>Browse products</Button>
        </div>

        <div className="mt-14 w-full max-w-3xl">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-fg-subtle">Popular categories</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {categories.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                to={`/products/${c.slug}`}
                className="rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-semibold text-fg-muted transition-colors hover:border-primary-500/40 hover:text-fg"
              >
                {c.short}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
