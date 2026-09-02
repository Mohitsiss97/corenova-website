import { useEffect } from 'react';

import { site } from '../data/site';

const DEFAULT_TITLE = `${site.name} — ${site.tagline}`;

/** Creates the tag on first use, then reuses it for every later route. */
function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  return el;
}

/**
 * Sets the document title and social/description tags for the current route.
 * Every page calls this once; on unmount it restores the site defaults so a
 * route without SEO never inherits the previous page's title.
 */
export default function useSeo({ title, description } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${site.name}` : DEFAULT_TITLE;
    const desc = description ?? site.description;

    document.title = fullTitle;
    upsertMeta('meta[name="description"]', { name: 'description' }).setAttribute('content', desc);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', fullTitle);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', desc);

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description]);
}
