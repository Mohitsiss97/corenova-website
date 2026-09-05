import { productCount, categoryCount } from './products.js';
import { brand, emails, phones, offices, social } from './brand.js';

/* `site` is a convenience view over brand.js — every value here comes from
   there. Add new identity values to brand.js, not to this object. */
export const site = {
  name: brand.name,
  shortName: brand.shortName,
  legalName: brand.legalName,
  tagline: brand.tagline,
  description:
    `${brand.name} builds and ships enterprise software — ${productCount} ready-to-deploy products across ${categoryCount} categories, plus custom engineering teams for everything in between.`,
  email: emails.general,
  sales: emails.sales,
  phone: phones[0].number,
  phoneLabel: phones[0].label,
  phoneAlt: phones[1].number,
  phoneAltLabel: phones[1].label,
  founded: brand.founded,
  offices,
  social,
};

export const stats = [
  { value: 40, suffix: '+', label: 'Software products shipped', hint: 'Across 18 categories' },
  { value: 620, suffix: '+', label: 'Enterprise deployments', hint: 'In 24 countries' },
  { value: 11, suffix: ' yrs', label: 'Average client tenure', hint: 'Top 20 accounts' },
  { value: 99.98, suffix: '%', label: 'Platform uptime', hint: 'Trailing 12 months', decimals: 2 },
];

export const certifications = [
  'ISO 27001:2022',
  'SOC 2 Type II',
  'GDPR Ready',
  'HIPAA Compliant',
  'ISO 9001:2015',
  'CMMI Level 5',
];

export const clientLogos = [
  'Northwind', 'Vertex Labs', 'Solaris Retail', 'Meridian Bank', 'Kepler Health',
  'Ironclad Logistics', 'Bluepeak', 'Atlas Manufacturing', 'Orbital Group', 'Lumen Edu',
  'Sandbar Hotels', 'Nimbus Energy',
];

export const footerNav = [
  {
    title: 'Products',
    links: [
      { label: 'All products', to: '/products' },
      { label: 'ERP & Business', to: '/products/erp' },
      { label: 'CRM & Sales', to: '/products/crm' },
      { label: 'HRMS & Payroll', to: '/products/hrms' },
      { label: 'POS & Retail', to: '/products/pos-retail' },
      { label: 'BI & Analytics', to: '/products/bi-analytics' },
      { label: 'Integrations', to: '/integrations' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Custom software', to: '/services/custom-software' },
      { label: 'Mobile apps', to: '/services/mobile-apps' },
      { label: 'Cloud & DevOps', to: '/services/cloud-devops' },
      { label: 'AI & machine learning', to: '/services/ai-ml' },
      { label: 'Data & analytics', to: '/services/data-analytics' },
      { label: 'Dedicated teams', to: '/services/dedicated-teams' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'How we work', to: '/process' },
      { label: 'Case studies', to: '/case-studies' },
      { label: 'Careers', to: '/careers' },
      { label: 'Partners', to: '/partners' },
      { label: 'Newsroom', to: '/newsroom' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Whitepapers', to: '/resources' },
      { label: 'Documentation', to: '/docs' },
      { label: 'Help center', to: '/support' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Book a demo', to: '/demo' },
    ],
  },
];

export const legalNav = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Security', to: '/security' },
  { label: 'Cookies', to: '/cookies' },
];
