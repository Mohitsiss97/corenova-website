import { productCount, categoryCount } from './products.js';

export const site = {
  name: 'CoreNova',
  legalName: 'CoreNova Technologies Pvt. Ltd.',
  tagline: 'Software that runs your business',
  description:
    `CoreNova builds and ships enterprise software — ${productCount} ready-to-deploy products across ${categoryCount} categories, plus custom engineering teams for everything in between.`,
  email: 'hello@corenova.tech',
  sales: 'sales@corenova.tech',
  phone: '+91 120 458 9000',
  phoneUS: '+1 (415) 555 0142',
  founded: 2014,
  offices: [
    { city: 'Noida', country: 'India', label: 'HQ', address: 'Tower B, Sector 62, Noida 201309', tz: 'IST (UTC+5:30)' },
    { city: 'Bengaluru', country: 'India', label: 'Engineering', address: 'Indiranagar, Bengaluru 560038', tz: 'IST (UTC+5:30)' },
    { city: 'Austin', country: 'USA', label: 'Americas', address: '600 Congress Ave, Austin, TX 78701', tz: 'CST (UTC-6)' },
    { city: 'Dubai', country: 'UAE', label: 'Middle East', address: 'Business Bay, Dubai', tz: 'GST (UTC+4)' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'X', href: 'https://x.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ],
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
