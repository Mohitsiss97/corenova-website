/* ==================================================================
   BRAND — the single source of truth for company identity.

   Change the company name, domain, phone numbers, offices, product
   suite name or logo HERE and it updates everywhere on the site.
   Nothing else should hardcode any of these values.

   The only file that must be edited alongside this one is
   `public/favicon.svg`, because a static file cannot import JS. Its
   path data is the same `brand.logo.glyph` string below.
   ================================================================== */

export const brand = {
  /* Identity ------------------------------------------------------ */
  name: 'Solution Provider',
  /** Used where the full name is too long — nav on mobile, initials, etc. */
  shortName: 'Solution Provider',
  /** The wordmark is drawn in two weights; this is where it splits. */
  wordmark: { lead: 'Solution', trail: 'Provider' },
  /** Small caps line under the wordmark. Set to '' to hide it. */
  wordmarkSub: 'Technology',
  legalName: 'Solution Provider FZ-LLC',
  tagline: 'Software that runs your business',
  founded: 2014,

  /* Web ----------------------------------------------------------- */
  domain: 'solutionprovider.ae',

  /** Machine-safe slug — used for storage keys, cookie names and the repo. */
  slug: 'solution-provider',
  /** Prefix for cookies this site sets. */
  cookiePrefix: 'sp',

  /* Product suite -------------------------------------------------- */
  /** Every product is named `${productPrefix} ${base}` — see productName(). */
  productPrefix: 'Solva',
  suiteName: 'Solva',

  /* Logo ----------------------------------------------------------- */
  logo: {
    viewBox: '0 0 24 24',
    /** A stylised "S". Stroked, not filled, so it stays crisp at 16px. */
    glyph:
      'M16.6 7.4a4.4 4.4 0 0 0-4.4-3.4h-1.3a3.95 3.95 0 0 0 0 7.9h2.2a3.95 3.95 0 0 1 0 7.9h-1.3a4.4 4.4 0 0 1-4.4-3.4',
    strokeWidth: 2.4,
  },
};

/* Contact --------------------------------------------------------- */
export const emails = {
  general: `hello@${brand.domain}`,
  sales: `sales@${brand.domain}`,
  support: `support@${brand.domain}`,
  press: `press@${brand.domain}`,
  privacy: `privacy@${brand.domain}`,
  legal: `legal@${brand.domain}`,
};

export const hosts = {
  console: `app.${brand.domain}`,
  api: `api.${brand.domain}`,
  docs: `docs.${brand.domain}`,
  www: brand.domain,
};

export const phones = [
  { label: 'UAE', number: '+971 4 240 8600' },
  { label: 'Saudi Arabia', number: '+966 11 214 7300' },
];

/* Offices — the first entry is treated as headquarters everywhere. -- */
export const offices = [
  {
    city: 'Dubai', country: 'UAE', label: 'HQ',
    address: 'Dubai Internet City, Building 12, Dubai',
    tz: 'GST (UTC+4)',
  },
  {
    city: 'Abu Dhabi', country: 'UAE', label: 'Delivery',
    address: 'Al Maryah Island, Abu Dhabi',
    tz: 'GST (UTC+4)',
  },
  {
    city: 'Riyadh', country: 'Saudi Arabia', label: 'Client delivery',
    address: 'King Fahd Road, Riyadh 12212',
    tz: 'AST (UTC+3)',
  },
  {
    city: 'Bengaluru', country: 'India', label: 'Engineering',
    address: 'Indiranagar, Bengaluru 560038',
    tz: 'IST (UTC+5:30)',
  },
];

export const hq = offices[0];

/** Named lookups so prose and job listings never hardcode a city. */
export const cities = {
  hq: offices[0].city,
  delivery: offices[1].city,
  regional: offices[2].city,
  engineering: offices[3].city,
};

export const social = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
];

/* Helpers ---------------------------------------------------------- */

/** `productName('ERP')` -> `'Solva ERP'`. Use for every product name. */
export const productName = (base) => `${brand.productPrefix} ${base}`;

/** Initials for avatar-style marks. */
export const brandInitials = brand.name
  .split(' ')
  .map((w) => w[0])
  .slice(0, 2)
  .join('');
