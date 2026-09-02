import {
  Factory, ShoppingBag, Landmark, Stethoscope, GraduationCap,
  Truck, HardHat, Hotel, Briefcase,
} from 'lucide-react';

export const industries = [
  {
    slug: 'manufacturing', icon: Factory, name: 'Manufacturing',
    tagline: 'Shop floor to balance sheet, on one number.',
    pains: ['Production plans that ignore real machine capacity', 'Stock accuracy below 90%', 'Quality issues found after despatch'],
    outcomes: [
      { metric: '18%', label: 'higher OEE after MES rollout' },
      { metric: '31%', label: 'less unplanned downtime' },
      { metric: '4 days', label: 'faster month-end close' },
    ],
    products: ['nova-erp', 'nova-manufacturing', 'nova-wms', 'nova-assets'],
  },
  {
    slug: 'retail', icon: ShoppingBag, name: 'Retail & Distribution',
    tagline: 'Every store, channel and warehouse on one stock ledger.',
    pains: ['Online and store inventory disagree', 'Billing stops when the internet drops', 'No view of margin by SKU per store'],
    outcomes: [
      { metric: '99.4%', label: 'stock accuracy across branches' },
      { metric: '2.1s', label: 'average checkout time' },
      { metric: '+23%', label: 'repeat purchase with loyalty' },
    ],
    products: ['nova-pos', 'nova-stock', 'nova-commerce', 'nova-loyalty'],
  },
  {
    slug: 'fintech', icon: Landmark, name: 'Banking & Fintech',
    tagline: 'Regulated-grade software with the audit trail to prove it.',
    pains: ['Access reviews done in spreadsheets', 'Reconciliation breaks found weeks later', 'Every audit is a fire drill'],
    outcomes: [
      { metric: '100%', label: 'access reviews automated' },
      { metric: '92%', label: 'auto-reconciled transactions' },
      { metric: '0', label: 'critical audit findings, 3 years' },
    ],
    products: ['nova-id', 'nova-vault', 'nova-insight', 'nova-billing'],
  },
  {
    slug: 'healthcare', icon: Stethoscope, name: 'Healthcare',
    tagline: 'Clinical, administrative and financial records in one chart.',
    pains: ['Paper records slow down OPD', 'Claim rejections from coding errors', 'No single patient timeline'],
    outcomes: [
      { metric: '41%', label: 'shorter OPD wait times' },
      { metric: '−28%', label: 'claim rejection rate' },
      { metric: 'HIPAA', label: 'aligned audit logging' },
    ],
    products: ['nova-care-his', 'nova-clinic', 'nova-lis', 'nova-docs'],
  },
  {
    slug: 'edtech', icon: GraduationCap, name: 'Education',
    tagline: 'Admissions to alumni, without the parallel spreadsheets.',
    pains: ['Fee collection tracked outside the system', 'Attendance and results in separate tools', 'No visibility for parents'],
    outcomes: [
      { metric: '+34%', label: 'course completion rate' },
      { metric: '96%', label: 'fee collection on time' },
      { metric: '11k', label: 'concurrent live-class users' },
    ],
    products: ['nova-learn', 'nova-campus', 'nova-content'],
  },
  {
    slug: 'logistics', icon: Truck, name: 'Logistics & Transport',
    tagline: 'Know where every consignment is — and what it costs.',
    pains: ['Proof of delivery arrives days late', 'Route planning done manually', 'Freight bills reconciled by hand'],
    outcomes: [
      { metric: '−19%', label: 'cost per delivered km' },
      { metric: '98.6%', label: 'on-time delivery' },
      { metric: 'Same day', label: 'ePOD availability' },
    ],
    products: ['nova-fleet', 'nova-freight', 'nova-wms', 'nova-fieldsales'],
  },
  {
    slug: 'construction', icon: HardHat, name: 'Construction & Real Estate',
    tagline: 'Project margin visible while the project is still running.',
    pains: ['Cost overruns discovered at handover', 'Vendor bills without 3-way match', 'Lease and rent data scattered'],
    outcomes: [
      { metric: '−12%', label: 'project cost variance' },
      { metric: '3-way', label: 'match on every vendor bill' },
      { metric: '100%', label: 'lease renewals tracked' },
    ],
    products: ['nova-projects', 'nova-procure', 'nova-estate', 'nova-docs'],
  },
  {
    slug: 'hospitality', icon: Hotel, name: 'Hospitality',
    tagline: 'Rooms, covers and guests managed from one console.',
    pains: ['Rates out of sync across OTAs', 'Housekeeping status on paper', 'No single guest history'],
    outcomes: [
      { metric: '+16%', label: 'RevPAR after rate automation' },
      { metric: '−22 min', label: 'room turnaround time' },
      { metric: '4.6★', label: 'average guest rating' },
    ],
    products: ['nova-stay', 'nova-resto', 'nova-loyalty'],
  },
  {
    slug: 'services', icon: Briefcase, name: 'Professional Services',
    tagline: 'Utilisation, billing and delivery finally in the same view.',
    pains: ['Timesheets chased at month end', 'Project margin unknown until close', 'Renewals slip through'],
    outcomes: [
      { metric: '+9 pts', label: 'billable utilisation' },
      { metric: '−6 days', label: 'invoice cycle time' },
      { metric: '94%', label: 'renewal rate' },
    ],
    products: ['nova-projects', 'nova-crm', 'nova-people', 'nova-desk'],
  },
];

export const getIndustry = (slug) => industries.find((i) => i.slug === slug);
