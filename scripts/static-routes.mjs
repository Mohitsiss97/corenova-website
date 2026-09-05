/**
 * Writes a real HTML file for every route in the app.
 *
 * GitHub Pages serves static files and has no SPA rewrite rule, so a request
 * for /products with only dist/index.html on disk returns HTTP 404 — the page
 * still renders (because 404.html is the app shell) but the status code is
 * wrong, which breaks crawlers, link checkers and uptime monitors.
 *
 * Creating dist/products/index.html makes Pages answer 200 for that path. The
 * app itself is unchanged; React Router resolves the URL exactly as before.
 *
 * 404.html stays as the shell too, so genuinely unknown URLs still reach the
 * router and render the in-app NotFound page — those *should* be 404.
 */
import { mkdir, copyFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const shell = path.join(dist, 'index.html');

if (!existsSync(shell)) {
  console.error('static-routes: dist/index.html is missing — run vite build first.');
  process.exit(1);
}

const { categories, products } = await import('../src/data/products.js');
const { services } = await import('../src/data/services.js');
const { industries } = await import('../src/data/industries.js');
const { caseStudies } = await import('../src/data/content.js');
const { legalDocList } = await import('../src/data/legal.js');
const { jobs } = await import('../src/data/careers.js');
const { posts } = await import('../src/data/blog.js');
const { integrations } = await import('../src/data/integrations.js');

/** Routes with no parameters, mirroring App.jsx. */
const staticRoutes = [
  '/products', '/services', '/technologies', '/contact', '/case-studies',
  '/pricing', '/demo', '/industries', '/about', '/process', '/careers',
  '/blog', '/resources', '/docs', '/support', '/integrations',
  '/partners', '/newsroom',
  ...legalDocList.map((d) => `/${d.slug}`),
];

/** Expansions for every parameterised route in App.jsx. */
const dynamicRoutes = {
  '/products/:categorySlug': categories.map((c) => `/products/${c.slug}`),
  '/products/:categorySlug/:productSlug': products.map((p) => `/products/${p.category}/${p.slug}`),
  '/services/:serviceSlug': services.map((s) => `/services/${s.slug}`),
  '/case-studies/:slug': caseStudies.map((c) => `/case-studies/${c.slug}`),
  '/industries/:industrySlug': industries.map((i) => `/industries/${i.slug}`),
  '/careers/:jobId': jobs.map((j) => `/careers/${j.id}`),
  '/blog/:slug': posts.map((p) => `/blog/${p.slug}`),
  '/integrations/:integrationSlug': integrations.map((i) => `/integrations/${i.slug}`),
};

/* ------------------------------------------------------------------
   Guard: if someone adds a <Route> to App.jsx and forgets this file,
   fail the build rather than silently shipping a route that 404s.
------------------------------------------------------------------ */
const appSource = await readFile(path.join(root, 'src/App.jsx'), 'utf8');
const declared = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== '*');

const covered = new Set([...staticRoutes, ...Object.keys(dynamicRoutes)]);
const missing = declared.filter((p) => !covered.has(p));

if (missing.length) {
  console.error(
    'static-routes: these routes are declared in App.jsx but not covered here,\n' +
    'so they would return 404 on GitHub Pages:\n  ' + missing.join('\n  '),
  );
  process.exit(1);
}

/* ------------------------------------------------------------------ write */
const all = [...staticRoutes, ...Object.values(dynamicRoutes).flat()];

let written = 0;
for (const route of all) {
  const dir = path.join(dist, route.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await copyFile(shell, path.join(dir, 'index.html'));
  written += 1;
}

// Unknown URLs still need the shell so the router can show its own 404 page.
await copyFile(shell, path.join(dist, '404.html'));

console.log(
  `static-routes: wrote ${written} route files (+ 404.html). ` +
  `${declared.length} routes declared in App.jsx, all covered.`,
);
