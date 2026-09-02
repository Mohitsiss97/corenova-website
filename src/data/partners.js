import { Handshake, Store, Wrench, Cloud } from 'lucide-react';

/* Partner programme: tiers, tracks, directory and the joining process. */

export const partnerTracks = [
  {
    icon: Store,
    name: 'Reseller',
    blurb: 'You sell and invoice; we build, host and support. Margin on licence and renewal, with deal registration protecting what you source.',
    fit: 'IT resellers and system houses with an existing mid-market base',
  },
  {
    icon: Wrench,
    name: 'Implementation',
    blurb: 'You run configuration, migration and training on your own paper. We certify your consultants and stay behind you on escalations.',
    fit: 'Consultancies with delivery capacity in a vertical we serve',
  },
  {
    icon: Cloud,
    name: 'Technology',
    blurb: 'You build an integration against our APIs and we list it in the directory, with joint support paths for shared customers.',
    fit: 'Software vendors whose product sits next to ours in a stack',
  },
  {
    icon: Handshake,
    name: 'Referral',
    blurb: 'You introduce, we do everything else, you take a fee on closed revenue. No certification and no commitment.',
    fit: 'Advisors, accountants and industry consultants',
  },
];

export const partnerTiers = [
  {
    name: 'Registered',
    requirement: 'Signed agreement',
    highlight: false,
    benefits: [
      'Deal registration with 90-day protection',
      'Partner portal access',
      'Sales collateral and demo environment',
      'Standard referral fee',
    ],
  },
  {
    name: 'Certified',
    requirement: '2 certified consultants · 3 closed deals',
    highlight: true,
    benefits: [
      'Everything in Registered',
      'Higher margin on licence and renewal',
      'Named partner manager',
      'Co-branded marketing materials',
      'MDF requests up to $10k a year',
      'Early access to release candidates',
    ],
  },
  {
    name: 'Strategic',
    requirement: 'By invitation · sustained volume',
    highlight: false,
    benefits: [
      'Everything in Certified',
      'Best-in-programme commercial terms',
      'Joint account planning and co-selling',
      'Roadmap input and design partner slots',
      'Dedicated technical enablement',
      'Joint presence at industry events',
    ],
  },
];

export const partnerSteps = [
  { step: '01', name: 'Apply', detail: 'Tell us what you sell today and where we would fit. We reply within three working days, including when the answer is no.' },
  { step: '02', name: 'Fit call', detail: 'Thirty minutes on your customer base, your delivery capacity and which track makes sense. No pitch deck.' },
  { step: '03', name: 'Enable', detail: 'Product and sales enablement for your team, a demo tenant, and certification for consultants on the implementation track.' },
  { step: '04', name: 'First deal together', detail: 'We shadow your first opportunity end to end — pre-sales, scoping and delivery — so the second one is yours to run.' },
];

export const partnerDirectory = [
  { name: 'Meridian Systems', region: 'India · Middle East', track: 'Implementation', tier: 'Strategic', focus: 'ERP and manufacturing rollouts' },
  { name: 'Bluepeak Consulting', region: 'United Kingdom', track: 'Implementation', tier: 'Certified', focus: 'Retail and hospitality' },
  { name: 'Nordwerk GmbH', region: 'DACH', track: 'Reseller', tier: 'Certified', focus: 'Mid-market manufacturing' },
  { name: 'Lumen Cloud', region: 'North America', track: 'Technology', tier: 'Certified', focus: 'Identity and cloud infrastructure' },
  { name: 'Sandbar Digital', region: 'South-East Asia', track: 'Reseller', tier: 'Registered', focus: 'Hospitality and F&B' },
  { name: 'Ironclad Advisory', region: 'Australia', track: 'Referral', tier: 'Registered', focus: 'Logistics and supply chain' },
  { name: 'Kestrel Health IT', region: 'India', track: 'Implementation', tier: 'Certified', focus: 'Hospital and diagnostics systems' },
  { name: 'Atlas Data Partners', region: 'North America', track: 'Technology', tier: 'Registered', focus: 'Analytics and data engineering' },
];

export const partnerFaqs = [
  {
    q: 'Do you sell direct in partner territories?',
    a: 'Registered deals are protected for 90 days and renewable while the opportunity is genuinely progressing. Outside registered deals we do sell direct, and we will say so plainly rather than pretending otherwise.',
  },
  {
    q: 'What does certification involve?',
    a: 'Two days of product training per consultant followed by a practical assessment on a sandbox tenant. We run it monthly, remotely, at no cost to Certified and Strategic partners.',
  },
  {
    q: 'Who supports the end customer?',
    a: 'On the implementation track you hold the first line and we take L2 and L3 behind you, with a shared escalation channel and agreed response times. On reseller deals we can take the whole support relationship if you prefer.',
  },
  {
    q: 'Is there a fee to join?',
    a: 'No joining fee and no annual minimum on Registered. Certified requires the certification commitment rather than a payment.',
  },
];
