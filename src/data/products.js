import {
  Boxes, Users, UserCog, Wallet, BarChart3, Warehouse, Truck, Wrench,
  Store, ShoppingCart, LifeBuoy, Megaphone, HeartPulse, GraduationCap,
  Building2, ShieldCheck, FileStack,
} from 'lucide-react';

/* ------------------------------------------------------------------
   18 software categories — the spine of the catalog.
   `group` drives the mega-menu columns and the catalog filter rail.
------------------------------------------------------------------ */
export const categoryGroups = [
  { id: 'core', label: 'Business Core' },
  { id: 'ops', label: 'Operations' },
  { id: 'customer', label: 'Customer Facing' },
  { id: 'vertical', label: 'Industry Verticals' },
  { id: 'platform', label: 'Platform & Governance' },
];

export const categories = [
  {
    slug: 'erp', group: 'core', icon: Boxes, name: 'ERP & Business Management',
    short: 'ERP', accent: 'primary',
    tagline: 'One ledger for finance, inventory, production and procurement.',
    description:
      'Modular ERP that replaces the spreadsheet sprawl. Finance, purchase, stores, production and compliance share a single source of truth, with role-based approvals across every document.',
    modules: ['General ledger', 'Procure to pay', 'Order to cash', 'Production planning', 'Fixed assets', 'Statutory compliance'],
    integrations: ["Tally", "SAP", "Salesforce", "Microsoft 365", "DocuSign", "Power BI"],
    faqs: [
      { q: "How long does an ERP rollout take?", a: "A single-entity cloud rollout with standard configuration goes live in 8-12 weeks. Multi-entity with data migration and custom workflows typically runs 4-7 months. You get a dated plan before signing." },
      { q: "Can we run only the modules we need?", a: "Yes. Every module is licensed and enabled independently - most clients start with finance and stores, then add production or projects later without a re-implementation." },
      { q: "What happens to our legacy ERP data?", a: "Masters, opening balances and at least two years of transactions are migrated with importers we build for your source. We run two dry runs on a production copy before cutover." },
    ],
  },
  {
    slug: 'crm', group: 'core', icon: Users, name: 'CRM & Sales',
    short: 'CRM', accent: 'accent',
    tagline: 'Pipeline, quotes and renewals without the busywork.',
    description:
      'Lead-to-cash CRM with configurable pipelines, quote approvals, territory rules and revenue forecasting that finance actually trusts.',
    modules: ['Lead scoring', 'Pipeline & forecasting', 'Quotes & CPQ', 'Territory management', 'Renewals', 'Field sales app'],
    integrations: ["Gmail & Outlook", "Twilio", "WhatsApp Business", "LinkedIn Sales Navigator", "Zoom", "Stripe"],
    faqs: [
      { q: "Will it sync with our email and calendar?", a: "Yes - two-way sync with Google Workspace and Microsoft 365, including calendar, contacts and threaded email against each deal." },
      { q: "Can we keep our own sales stages?", a: "Pipelines, stages, required fields and approval rules are all configurable per team without code." },
      { q: "How does forecasting work?", a: "Weighted by stage probability, with a manual commit override per rep. Finance gets a locked snapshot each period so forecast history cannot be rewritten." },
    ],
  },
  {
    slug: 'hrms', group: 'core', icon: UserCog, name: 'HRMS & Payroll',
    short: 'HRMS', accent: 'cyan',
    tagline: 'Hire to retire, with payroll that closes on time.',
    description:
      'Complete people platform — recruitment, onboarding, attendance, leave, payroll, appraisals and exit — with statutory filings built in for 14 countries.',
    modules: ['Recruitment & ATS', 'Attendance & shifts', 'Leave & policy engine', 'Payroll & statutory', 'Appraisals & OKRs', 'Employee self-service'],
    integrations: ["Biometric devices (ZKTeco, eSSL)", "Microsoft 365", "Slack", "Razorpay", "Bank payment files", "Power BI"],
    faqs: [
      { q: "Which countries is payroll supported in?", a: "Statutory payroll runs in 14 countries including India, UAE, Singapore, the UK and the US. Other geographies are supported as gross-to-net with local filing handled by your provider." },
      { q: "Does it work with our attendance hardware?", a: "We integrate with standard biometric and face-recognition devices over their SDKs, plus mobile punch with geofencing for field staff." },
      { q: "Can employees access it themselves?", a: "Yes - self-service web and mobile for payslips, leave, claims, documents and declarations, gated by the same permission model as the admin side." },
    ],
  },
  {
    slug: 'finance', group: 'core', icon: Wallet, name: 'Accounting & Billing',
    short: 'Finance', accent: 'primary',
    tagline: 'Invoicing, subscriptions and reconciliation on autopilot.',
    description:
      'Double-entry accounting with recurring billing, multi-currency, tax engines and bank reconciliation — audit-ready from day one.',
    modules: ['Invoicing & e-invoicing', 'Subscription billing', 'Expense management', 'Bank reconciliation', 'Multi-currency', 'Audit trail'],
    integrations: ["Bank feeds", "Stripe", "Razorpay", "e-invoice portals", "Excel", "Auditor portals"],
    faqs: [
      { q: "Is it compliant for e-invoicing?", a: "Yes - e-invoice and e-way bill generation with IRN handling, plus VAT filing formats for the GCC and UK MTD." },
      { q: "Can our auditor get access?", a: "A read-only auditor role with full drill-down and export, time-boxed to the audit period." },
      { q: "Does it handle multiple currencies and entities?", a: "Multi-currency with automatic revaluation, and consolidated reporting across entities with intercompany elimination." },
    ],
  },
  {
    slug: 'bi-analytics', group: 'core', icon: BarChart3, name: 'BI & Analytics',
    short: 'BI', accent: 'accent',
    tagline: 'Governed dashboards your leadership team opens daily.',
    description:
      'Self-service analytics on top of a governed semantic layer. Model once, publish everywhere — dashboards, scheduled reports and embedded views.',
    modules: ['Semantic layer', 'Drag-drop dashboards', 'Scheduled reports', 'Embedded analytics', 'Anomaly alerts', 'Row-level security'],
    integrations: ["Snowflake", "BigQuery", "PostgreSQL", "SQL Server", "Power BI", "Slack & Teams"],
    faqs: [
      { q: "Do we need a data warehouse first?", a: "Not necessarily. For a single well-modelled source we can read directly. Beyond three sources a warehouse usually pays for itself in query performance and consistency." },
      { q: "How is row-level security handled?", a: "Rules are defined once in the semantic layer against user attributes, so every dashboard and export inherits them - including embedded views." },
      { q: "Can we embed dashboards in our own app?", a: "Yes, through a signed-token embed SDK that carries the viewing user's permissions." },
    ],
  },
  {
    slug: 'inventory', group: 'ops', icon: Warehouse, name: 'Inventory & Warehouse',
    short: 'WMS', accent: 'cyan',
    tagline: 'Barcode-accurate stock across every bin and branch.',
    description:
      'Warehouse management with putaway strategies, cycle counting, batch and serial traceability, and mobile scanning that works offline.',
    modules: ['Bin & zone mapping', 'Barcode / RFID', 'Batch & serial tracking', 'Cycle counting', 'Pick-pack-ship', 'Multi-warehouse transfers'],
    integrations: ["Barcode scanners", "Zebra & Honeywell handhelds", "Shopify", "Amazon", "Courier APIs", "Nova ERP"],
    faqs: [
      { q: "Does the handheld app work without internet?", a: "Yes. Scanning, picking and counting run fully offline and sync when the device reconnects, with conflict resolution on the server." },
      { q: "Can we track batches and expiry?", a: "Batch, serial and expiry tracking with FEFO picking rules and full forward and backward traceability for recalls." },
      { q: "How does it handle multiple warehouses?", a: "Each warehouse has its own bin structure and stock ledger, with transfer orders and in-transit visibility between them." },
    ],
  },
  {
    slug: 'scm', group: 'ops', icon: Truck, name: 'Supply Chain & Procurement',
    short: 'SCM', accent: 'primary',
    tagline: 'Vendors, RFQs and demand plans in one control tower.',
    description:
      'Demand forecasting, supplier scorecards and e-tendering that shorten cycle times and surface risk before it becomes a stockout.',
    modules: ['Demand planning', 'Vendor portal', 'RFQ & e-tendering', 'Supplier scorecards', 'Contract management', 'Landed cost'],
    integrations: ["Vendor portals", "Nova ERP", "DocuSign", "Email & WhatsApp", "Excel", "Power BI"],
    faqs: [
      { q: "Do our vendors need a licence?", a: "No. The vendor portal is free for suppliers - they log in to see POs, submit quotes and upload invoices." },
      { q: "Can we run sealed-bid tenders?", a: "Yes, with sealed quotes, a defined opening time and a full audit trail of who saw what and when." },
      { q: "How is the demand forecast produced?", a: "Statistical baselines from your own sales history, adjusted for seasonality and promotions, with a manual override tracked separately from the model output." },
    ],
  },
  {
    slug: 'fleet-logistics', group: 'ops', icon: Truck, name: 'Fleet & Logistics (TMS)',
    short: 'TMS', accent: 'accent',
    tagline: 'Live tracking, route plans and proof of delivery.',
    description:
      'Transport management with GPS telematics, dynamic route optimisation, driver apps and automated freight settlement.',
    modules: ['Live GPS tracking', 'Route optimisation', 'Driver mobile app', 'ePOD & signatures', 'Freight billing', 'Fuel & maintenance'],
    integrations: ["GPS & telematics devices", "Google Maps", "FASTag", "Fuel cards", "Courier APIs", "Nova ERP"],
    faqs: [
      { q: "Which GPS devices are supported?", a: "Standard protocol devices over TCP, plus the major Indian and GCC telematics vendors. Where a device is not supported we build the parser as part of implementation." },
      { q: "How accurate is route optimisation?", a: "Plans account for vehicle capacity, time windows, driver hours and live traffic. Most clients see a 12-19% reduction in cost per delivered kilometre." },
      { q: "Does the driver app work offline?", a: "Yes - trip details, ePOD capture and signatures work offline and upload when signal returns." },
    ],
  },
  {
    slug: 'asset-field', group: 'ops', icon: Wrench, name: 'Asset & Field Service',
    short: 'Assets', accent: 'cyan',
    tagline: 'Preventive maintenance that actually gets scheduled.',
    description:
      'Asset registry, work orders, AMC contracts and technician dispatch with mobile checklists and spare-part consumption tracking.',
    modules: ['Asset registry & QR', 'Preventive schedules', 'Work orders', 'Technician dispatch', 'AMC & warranty', 'Spare parts'],
    integrations: ["QR & RFID readers", "Nova ERP", "Google Maps", "WhatsApp", "Email", "Power BI"],
    faqs: [
      { q: "How are assets tagged?", a: "QR or RFID labels generated from the system, scannable with any phone camera for technicians and auditors alike." },
      { q: "Can we manage AMC contracts?", a: "Yes - contract periods, covered assets, entitlement checks at ticket creation and renewal reminders." },
      { q: "Does the technician app work offline?", a: "Checklists, readings, photos and signatures are captured offline and sync on reconnect." },
    ],
  },
  {
    slug: 'pos-retail', group: 'customer', icon: Store, name: 'POS & Retail',
    short: 'POS', accent: 'primary',
    tagline: 'Fast checkout, offline-first, loyalty included.',
    description:
      'Touch POS for stores and restaurants that keeps billing when the internet drops, then syncs everything the moment it returns.',
    modules: ['Offline-first billing', 'Multi-store & multi-till', 'Loyalty & coupons', 'KOT & table plans', 'Cash drawer & shifts', 'Hardware SDK'],
    integrations: ["Payment terminals", "Cash drawers & printers", "Shopify", "Swiggy & Zomato", "Loyalty wallets", "Nova Stock"],
    faqs: [
      { q: "What happens when the internet drops?", a: "Billing continues entirely offline against a local catalogue and price list, then syncs automatically. No transaction is lost and no cashier action is needed." },
      { q: "Which hardware is supported?", a: "Standard ESC/POS printers, cash drawers, barcode scanners, weighing scales and the major card terminals. A hardware SDK covers anything unusual." },
      { q: "Can we run promotions across stores?", a: "Yes - offers, coupons and loyalty rules are defined centrally and applied at every till, including offline." },
    ],
  },
  {
    slug: 'ecommerce', group: 'customer', icon: ShoppingCart, name: 'eCommerce & Marketplace',
    short: 'Commerce', accent: 'accent',
    tagline: 'Headless storefronts and multi-vendor marketplaces.',
    description:
      'Composable commerce — API-first catalog, pricing and checkout you can front with any storefront, plus vendor onboarding and payouts.',
    modules: ['Headless catalog API', 'Cart & checkout', 'Multi-vendor payouts', 'Promotions engine', 'Returns & RMA', 'Storefront themes'],
    integrations: ["Stripe", "Razorpay", "Shopify", "Courier APIs", "Nova Stock", "Google Analytics"],
    faqs: [
      { q: "Is it headless?", a: "Yes - REST and GraphQL APIs for catalogue, cart, checkout and orders. Use our storefront themes or front it with your own Next.js build." },
      { q: "How do marketplace payouts work?", a: "Commission rules per vendor or category, automated settlement runs, and payout files or gateway transfers with a full reconciliation trail." },
      { q: "Can it handle our catalogue size?", a: "The catalogue API is edge-cached and tested to several million SKUs, with faceted search backed by Elasticsearch." },
    ],
  },
  {
    slug: 'helpdesk', group: 'customer', icon: LifeBuoy, name: 'Helpdesk & ITSM',
    short: 'ITSM', accent: 'cyan',
    tagline: 'Tickets, SLAs and change management in one desk.',
    description:
      'Omnichannel service desk with SLA clocks, approval workflows, CMDB and a knowledge base that deflects the repeat questions.',
    modules: ['Omnichannel inbox', 'SLA & escalation', 'Knowledge base', 'Change & problem mgmt', 'CMDB', 'CSAT surveys'],
    integrations: ["Email", "WhatsApp", "Slack & Teams", "Jira", "Twilio", "Nova ID"],
    faqs: [
      { q: "Which channels are supported?", a: "Email, web portal, live chat, WhatsApp and voice, all threaded into one ticket with a single SLA clock." },
      { q: "How are SLAs calculated?", a: "Against business calendars per customer, with pause states for pending-customer and automatic escalation paths." },
      { q: "Is it ITIL-aligned?", a: "Nova ITSM covers incident, problem, change and release with a CMDB and CAB approvals. Nova Desk is the lighter customer-facing desk." },
    ],
  },
  {
    slug: 'marketing-cms', group: 'customer', icon: Megaphone, name: 'Marketing & CMS',
    short: 'Marketing', accent: 'primary',
    tagline: 'Campaigns, journeys and content from one console.',
    description:
      'Headless CMS plus lifecycle marketing — segments, journeys, email/SMS/WhatsApp and attribution reporting that ties back to revenue.',
    modules: ['Headless CMS', 'Journey builder', 'Email / SMS / WhatsApp', 'Segmentation', 'Landing pages', 'Attribution'],
    integrations: ["Mailgun & SES", "Twilio", "WhatsApp Business", "Google Analytics", "Meta Ads", "Nova CRM"],
    faqs: [
      { q: "Can non-technical staff edit content?", a: "Yes - a visual editor over structured content, with preview and scheduled publishing. Developers keep control of the schema." },
      { q: "How is attribution calculated?", a: "First-touch, last-touch and linear models side by side, joined to closed revenue from Nova CRM rather than to form fills." },
      { q: "Does it support multiple languages?", a: "30+ locales with a per-field translation workflow and fallback rules." },
    ],
  },
  {
    slug: 'healthcare', group: 'vertical', icon: HeartPulse, name: 'Healthcare (HIS/EMR)',
    short: 'Health', accent: 'accent',
    tagline: 'OPD to discharge, coded and compliant.',
    description:
      'Hospital information system covering registration, EMR, OT, pharmacy, lab and claims — HIPAA-aligned with full audit logging.',
    modules: ['Registration & OPD', 'EMR & prescriptions', 'IPD & OT scheduling', 'Lab (LIS) & radiology', 'Pharmacy & stores', 'Insurance claims'],
    integrations: ["HL7 & FHIR", "Lab analysers", "PACS / DICOM", "TPA & insurer portals", "ABDM", "Payment gateways"],
    faqs: [
      { q: "Is it HIPAA compliant?", a: "The platform provides HIPAA-aligned controls - encryption, access control, immutable audit logging and BAA support. Compliance also depends on how you operate it, and we document what falls to you." },
      { q: "Does it integrate with lab analysers?", a: "Yes, over HL7 and vendor protocols, with auto-population of results and rule-based release." },
      { q: "Can it run fully on-premise?", a: "Yes. Many hospital clients run entirely on-premise for data residency, on the same codebase and upgrade path as cloud." },
    ],
  },
  {
    slug: 'edtech', group: 'vertical', icon: GraduationCap, name: 'LMS & EdTech',
    short: 'LMS', accent: 'cyan',
    tagline: 'Courses, cohorts, assessments and certificates.',
    description:
      'Learning platform for institutions and corporates — SCORM support, live classes, proctored assessments and skill-gap analytics.',
    modules: ['Course authoring', 'Live classes', 'Assessments & proctoring', 'Certificates', 'Skill analytics', 'Parent / manager portal'],
    integrations: ["Zoom", "Google Meet", "SCORM & xAPI content", "Payment gateways", "Microsoft 365", "WhatsApp"],
    faqs: [
      { q: "Does it support SCORM content we already own?", a: "SCORM 1.2, SCORM 2004 and xAPI packages import directly, with progress and scores tracked against the learner record." },
      { q: "How many concurrent users can live classes handle?", a: "Live sessions are delivered through Zoom or Meet integration, so concurrency follows your provider plan. We have run cohorts of 11,000 concurrent learners." },
      { q: "Can parents see progress?", a: "A parent and manager portal shows attendance, assessment results and fee status, scoped to their own learners." },
    ],
  },
  {
    slug: 'realestate-hospitality', group: 'vertical', icon: Building2, name: 'Real Estate & Hospitality',
    short: 'PMS', accent: 'primary',
    tagline: 'Bookings, units, leases and housekeeping.',
    description:
      'Property management for hotels and real-estate portfolios — inventory, rate plans, channel manager, leases and facility upkeep.',
    modules: ['Reservations & rates', 'Channel manager', 'Housekeeping', 'Lease & rent roll', 'Facility maintenance', 'Owner statements'],
    integrations: ["Booking.com", "Expedia", "Airbnb", "Payment gateways", "Door lock systems", "Nova Books"],
    faqs: [
      { q: "Which OTA channels are supported?", a: "Booking.com, Expedia, Airbnb, Agoda and MakeMyTrip through the channel manager, with two-way rate and inventory sync." },
      { q: "Can it handle multiple properties?", a: "Yes - a single console across properties with per-property rate plans, staff permissions and consolidated owner reporting." },
      { q: "Does it manage leases as well as stays?", a: "Nova Estate covers long-term leases, escalations and rent roll; Nova Stay covers nightly reservations. They share the same unit inventory." },
    ],
  },
  {
    slug: 'security-iam', group: 'platform', icon: ShieldCheck, name: 'Cybersecurity & IAM',
    short: 'Security', accent: 'accent',
    tagline: 'Single sign-on, least privilege, provable audit.',
    description:
      'Identity and access management with SSO, MFA, adaptive risk policies, privileged access vaulting and continuous access reviews.',
    modules: ['SSO (SAML / OIDC)', 'MFA & passkeys', 'Adaptive risk policy', 'Privileged access', 'Access reviews', 'Audit & SIEM export'],
    integrations: ["Active Directory & Entra ID", "Okta", "SAML & OIDC apps", "SCIM", "Splunk & SIEM", "Nova ITSM"],
    faqs: [
      { q: "Will it work with our existing identity provider?", a: "Yes - it can federate to Entra ID, Okta or any SAML/OIDC provider, or act as the primary directory itself." },
      { q: "Do you support passkeys?", a: "Passkeys, TOTP, push and hardware keys, with policy deciding which factors are acceptable for which application and risk level." },
      { q: "How are access reviews handled?", a: "Scheduled certification campaigns with reviewer reminders, bulk actions and an exportable evidence pack for auditors." },
    ],
  },
  {
    slug: 'dms-workflow', group: 'platform', icon: FileStack, name: 'Documents & Workflow',
    short: 'DMS', accent: 'cyan',
    tagline: 'Versioned documents with approvals that hold up in audit.',
    description:
      'Document management plus a no-code workflow engine — versioning, OCR search, e-signature and routing rules across departments.',
    modules: ['Version control', 'OCR full-text search', 'e-Signature', 'No-code workflow', 'Retention policies', 'Audit trail'],
    integrations: ["Microsoft 365", "Google Drive", "DocuSign", "Nova ERP", "Email", "Scanners"],
    faqs: [
      { q: "Can we search inside scanned documents?", a: "Yes - OCR runs on upload and the extracted text is fully searchable, including handwriting in printed forms at reduced accuracy." },
      { q: "How are approvals configured?", a: "A drag-and-drop designer with conditional routing, parallel approvers, delegation and SLA reminders - no code." },
      { q: "Are retention policies enforced?", a: "Yes, per document class, with legal hold that overrides deletion and a complete audit trail of every retention action." },
    ],
  },
];

export const deployments = ['Cloud (SaaS)', 'Private cloud', 'On-premise', 'Hybrid'];
export const pricingModels = ['Per user / month', 'Per site', 'Usage based'];

/* ------------------------------------------------------------------
   Product catalog. Every card is filterable by category, industry,
   deployment and pricing model — the four facets from the research.
------------------------------------------------------------------ */
export const products = [
  { slug: 'nova-erp', name: 'Nova ERP', category: 'erp', tagline: 'Modular ERP for mid-market manufacturers and distributors.', overview: "Nova ERP is the ledger everything else reconciles to. Finance, purchasing, stores, production and compliance run on one chart of accounts and one item master, so the monthly numbers stop depending on who exported which spreadsheet. Twenty-two modules are licensed independently, and most clients start with finance and stores before adding production.", deployment: ['Cloud (SaaS)', 'On-premise', 'Hybrid'], pricing: 'Per user / month', from: 34, industries: ['manufacturing', 'retail', 'logistics'], badge: 'Flagship', highlights: ['22 modules', 'GST / VAT ready', '14-country statutory'], rating: 4.8, reviews: 214 },
  { slug: 'nova-erp-lite', name: 'Nova ERP Lite', category: 'erp', tagline: 'Finance, stock and billing for teams under 50.', overview: "The same engine as Nova ERP with the enterprise configuration stripped out. Finance, stock and billing for teams under fifty, set up in three days from a guided import rather than a consulting engagement. When you outgrow it, you upgrade in place - there is no migration to the full edition.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 12, industries: ['retail', 'services'], highlights: ['Setup in 3 days', 'Guided migration', 'No consultant needed'], rating: 4.6, reviews: 138 },
  { slug: 'nova-manufacturing', name: 'Nova Manufacturing', category: 'erp', tagline: 'Shop-floor MES with BOM, routing and OEE tracking.', overview: "A shop-floor MES that sits on top of your ERP rather than replacing it. Work orders, BOM explosion, routing and quality gates are tracked at the station, with machine data ingested over OPC-UA or MQTT so OEE is measured rather than estimated.", deployment: ['On-premise', 'Hybrid'], pricing: 'Per site', from: 890, industries: ['manufacturing'], highlights: ['Machine IoT ingest', 'OEE dashboards', 'Quality gates'], rating: 4.7, reviews: 61 },
  { slug: 'nova-projects', name: 'Nova Projects', category: 'erp', tagline: 'Project accounting, timesheets and revenue recognition.', overview: "Project accounting for teams that bill by milestone or by hour. Timesheets, expenses and vendor costs roll into work-in-progress, revenue recognition follows your chosen policy, and margin by project is visible while the project is still running rather than at close.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 18, industries: ['services', 'construction'], highlights: ['WIP & milestone billing', 'Resource planning', 'Margin by project'], rating: 4.5, reviews: 92 },

  { slug: 'nova-crm', name: 'Nova CRM', category: 'crm', tagline: 'Lead-to-cash CRM with forecasting finance trusts.', overview: "Lead-to-cash CRM built around the forecast finance actually signs off on. Configurable pipelines, quote approvals and territory rules on the front end; weighted forecasting with locked period snapshots on the back. Sales cannot quietly rewrite last quarter's commit.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Per user / month', from: 22, industries: ['services', 'manufacturing', 'fintech'], badge: 'Popular', highlights: ['Custom pipelines', 'CPQ & approvals', 'Revenue forecasting'], rating: 4.7, reviews: 306 },
  { slug: 'nova-fieldsales', name: 'Nova FieldSales', category: 'crm', tagline: 'Offline-capable beat planning for distribution teams.', overview: "Beat planning and order capture for distribution teams who spend the day outside signal. Geo-fenced check-ins, route adherence and full order entry work offline, then sync in one pass when the rep is back on data.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 9, industries: ['retail', 'logistics'], highlights: ['Geo-fenced check-ins', 'Order capture offline', 'Route adherence'], rating: 4.5, reviews: 147 },
  { slug: 'nova-partner-portal', name: 'Nova Partner Portal', category: 'crm', tagline: 'Deal registration and co-selling for channel partners.', overview: "A self-service portal for channel partners: deal registration with conflict checking, MDF requests, tiering and co-selling collateral. Partners see their own pipeline without anyone in your team maintaining a shared spreadsheet.", deployment: ['Cloud (SaaS)'], pricing: 'Per site', from: 420, industries: ['services', 'manufacturing'], highlights: ['Deal registration', 'MDF tracking', 'Partner tiers'], rating: 4.4, reviews: 38 },

  { slug: 'nova-people', name: 'Nova People', category: 'hrms', tagline: 'Full HRMS — hire to retire, payroll included.', overview: "The full people platform - recruitment, onboarding, attendance, leave, payroll, appraisals and exit - on one employee record. Statutory payroll runs in fourteen countries, biometric and mobile attendance feed the same timesheet, and employees self-serve everything from payslips to declarations.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Per user / month', from: 4, industries: ['services', 'manufacturing', 'healthcare', 'retail'], badge: 'Flagship', highlights: ['Payroll in 14 countries', 'Shift & biometric sync', 'OKR appraisals'], rating: 4.8, reviews: 411 },
  { slug: 'nova-recruit', name: 'Nova Recruit', category: 'hrms', tagline: 'Applicant tracking with structured scorecards.', overview: "Applicant tracking built around structured hiring. Interview kits, scorecards and a career site you can edit without a developer, with offer approval workflows that route on grade and budget rather than on who happens to be in the room.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 15, industries: ['services', 'edtech'], highlights: ['Career site builder', 'Interview kits', 'Offer workflows'], rating: 4.6, reviews: 122 },
  { slug: 'nova-timetrack', name: 'Nova TimeTrack', category: 'hrms', tagline: 'Attendance, shifts and overtime across sites.', overview: "Attendance, shifts and overtime across sites with different rules. Biometric, face and mobile punch feed one timesheet, shift rosters handle rotation and relief, and the overtime policy engine applies each site's rules without manual adjustment.", deployment: ['Cloud (SaaS)', 'On-premise'], pricing: 'Per user / month', from: 2, industries: ['manufacturing', 'logistics', 'retail'], highlights: ['Biometric & face punch', 'Shift rosters', 'Overtime policy engine'], rating: 4.5, reviews: 176 },

  { slug: 'nova-books', name: 'Nova Books', category: 'finance', tagline: 'Double-entry accounting with e-invoicing built in.', overview: "Double-entry accounting for teams that would rather not run two systems. Invoicing with e-invoice and e-way bill generation, bank feeds with rule-based reconciliation, and a time-boxed read-only role so your auditor stops asking for exports.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 14, industries: ['retail', 'services'], highlights: ['e-Invoice & e-Way bill', 'Bank feeds', 'Auditor access'], rating: 4.7, reviews: 259 },
  { slug: 'nova-billing', name: 'Nova Billing', category: 'finance', tagline: 'Subscription and usage billing for SaaS businesses.', overview: "Subscription and usage billing for software businesses. Metered events, plan changes with proration, dunning with configurable retries, and revenue recognition that produces the schedule your accountant needs rather than a CSV they have to rework.", deployment: ['Cloud (SaaS)'], pricing: 'Usage based', from: 0, industries: ['fintech', 'services'], badge: 'New', highlights: ['Metered usage', 'Dunning & retries', 'Revenue recognition'], rating: 4.6, reviews: 74 },
  { slug: 'nova-expense', name: 'Nova Expense', category: 'finance', tagline: 'Receipt-scan expense claims with policy checks.', overview: "Expense claims that check themselves. Receipts are OCR'd on capture, policy violations are flagged before submission rather than at approval, and corporate card feeds reconcile against claims automatically.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 5, industries: ['services', 'logistics'], highlights: ['OCR receipts', 'Policy violations flagged', 'Corporate card sync'], rating: 4.4, reviews: 88 },

  { slug: 'nova-insight', name: 'Nova Insight', category: 'bi-analytics', tagline: 'Governed self-service BI on a semantic layer.', overview: "Self-service BI on a governed semantic layer. Metrics are modelled once with row-level security attached, then published to dashboards, scheduled reports and embedded views - so two reports cannot disagree about what revenue means.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Per user / month', from: 28, industries: ['fintech', 'retail', 'healthcare'], highlights: ['Semantic modelling', 'Row-level security', 'Embedded SDK'], rating: 4.7, reviews: 133 },
  { slug: 'nova-signal', name: 'Nova Signal', category: 'bi-analytics', tagline: 'Anomaly detection and alerting on business metrics.', overview: "Anomaly detection over your business metrics rather than your infrastructure. It learns each metric's normal shape, alerts when something breaks pattern, and points at the dimension most likely responsible instead of just raising a threshold.", deployment: ['Cloud (SaaS)'], pricing: 'Usage based', from: 0, industries: ['retail', 'fintech'], badge: 'AI', highlights: ['Auto-baselining', 'Root-cause hints', 'Slack / Teams alerts'], rating: 4.5, reviews: 46 },

  { slug: 'nova-wms', name: 'Nova WMS', category: 'inventory', tagline: 'Barcode warehouse management with offline scanning.', overview: "Warehouse management down to the bin. Directed putaway, wave and batch picking, cycle counting and full batch or serial traceability, with a handheld app that keeps scanning through a dead Wi-Fi zone and reconciles on reconnect.", deployment: ['Cloud (SaaS)', 'On-premise'], pricing: 'Per site', from: 640, industries: ['logistics', 'retail', 'manufacturing'], badge: 'Popular', highlights: ['Putaway strategies', 'Batch & serial', 'Offline handheld app'], rating: 4.7, reviews: 158 },
  { slug: 'nova-stock', name: 'Nova Stock', category: 'inventory', tagline: 'Multi-branch stock control for growing retailers.', overview: "Multi-branch stock control for retailers who have outgrown spreadsheets but do not need a full WMS. Branch transfers, reorder points, stock ageing and a single ledger shared with your POS and online store.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 11, industries: ['retail'], highlights: ['Branch transfers', 'Reorder points', 'Stock ageing'], rating: 4.5, reviews: 121 },
  { slug: 'nova-trace', name: 'Nova Trace', category: 'inventory', tagline: 'Lot genealogy and recall readiness for regulated goods.', overview: "Lot genealogy for regulated goods. Forward and backward traceability from raw material to despatched batch, recall simulation that tells you exactly which customers are affected, and the regulatory report formats to go with it.", deployment: ['On-premise', 'Hybrid'], pricing: 'Per site', from: 980, industries: ['manufacturing', 'healthcare'], highlights: ['Forward / backward trace', 'Recall simulation', 'Regulatory reports'], rating: 4.6, reviews: 34 },

  { slug: 'nova-procure', name: 'Nova Procure', category: 'scm', tagline: 'Source-to-pay with a self-service vendor portal.', overview: "Source-to-pay with the vendor doing their share of the data entry. Suppliers submit quotes and invoices through a free portal, sealed-bid tendering keeps the audit trail intact, and three-way match blocks payment on anything that does not reconcile.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Per user / month', from: 26, industries: ['manufacturing', 'construction'], highlights: ['e-Tendering', 'Vendor scorecards', '3-way match'], rating: 4.6, reviews: 97 },
  { slug: 'nova-plan', name: 'Nova Plan', category: 'scm', tagline: 'Demand forecasting and replenishment planning.', overview: "Demand forecasting and replenishment planning on your own sales history. Statistical baselines adjusted for seasonality and promotions, safety-stock optimisation against your service-level target, and scenario planning you can run before committing to a purchase.", deployment: ['Cloud (SaaS)'], pricing: 'Usage based', from: 0, industries: ['retail', 'manufacturing'], badge: 'AI', highlights: ['ML forecasting', 'Safety stock optimiser', 'Scenario planning'], rating: 4.5, reviews: 52 },

  { slug: 'nova-fleet', name: 'Nova Fleet', category: 'fleet-logistics', tagline: 'Telematics, routing and proof of delivery.', overview: "Live visibility over every vehicle and consignment. GPS telematics with geofencing, dynamic route optimisation against capacity and time windows, a driver app that captures proof of delivery offline, and fuel and maintenance tracking against each vehicle.", deployment: ['Cloud (SaaS)'], pricing: 'Usage based', from: 0, industries: ['logistics'], highlights: ['Live GPS + geofence', 'Dynamic routing', 'ePOD capture'], rating: 4.7, reviews: 189 },
  { slug: 'nova-freight', name: 'Nova Freight', category: 'fleet-logistics', tagline: 'Rate contracts, dispatch and freight settlement.', overview: "Freight operations from rate contract to settlement. Contracted and spot rates are held per lane and carrier, dispatch assigns loads against them, and freight bills are generated and reconciled automatically instead of being checked by hand.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Per site', from: 750, industries: ['logistics'], highlights: ['Rate contract engine', 'Auto freight billing', 'Carrier scorecards'], rating: 4.4, reviews: 41 },

  { slug: 'nova-assets', name: 'Nova Assets', category: 'asset-field', tagline: 'Asset registry with QR tagging and PM schedules.', overview: "An asset register that stays current because updating it is a phone camera away. QR or RFID tagging, preventive maintenance schedules that generate work orders, warranty and AMC entitlement, and depreciation that syncs back to finance.", deployment: ['Cloud (SaaS)', 'On-premise'], pricing: 'Per user / month', from: 16, industries: ['manufacturing', 'healthcare', 'construction'], highlights: ['QR / RFID tagging', 'Preventive schedules', 'Depreciation sync'], rating: 4.5, reviews: 78 },
  { slug: 'nova-fieldops', name: 'Nova FieldOps', category: 'asset-field', tagline: 'Technician dispatch with mobile checklists.', overview: "Technician dispatch for teams working across sites. Smart scheduling by skill, location and SLA, mobile checklists that work offline, spare-part consumption booked at the job, and contract entitlement checked before the visit is even scheduled.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 19, industries: ['services', 'manufacturing'], highlights: ['Smart dispatch', 'Offline checklists', 'AMC contracts'], rating: 4.6, reviews: 66 },

  { slug: 'nova-pos', name: 'Nova POS', category: 'pos-retail', tagline: 'Offline-first checkout for multi-store retail.', overview: "Checkout that does not stop when the connection does. Nova POS bills entirely offline against a local catalogue and price list, then syncs without a cashier touching anything. Loyalty, promotions and multi-store stock are shared centrally.", deployment: ['Cloud (SaaS)', 'Hybrid'], pricing: 'Per site', from: 39, industries: ['retail'], badge: 'Popular', highlights: ['Works fully offline', 'Loyalty & coupons', 'Any POS hardware'], rating: 4.8, reviews: 342 },
  { slug: 'nova-resto', name: 'Nova Resto', category: 'pos-retail', tagline: 'Restaurant POS with KOT, tables and delivery apps.', overview: "Restaurant POS covering the floor and the kitchen. Table plans, KOT routing to the right station, split and merged bills, recipe costing against live ingredient prices, and aggregator orders landing in the same queue as walk-ins.", deployment: ['Cloud (SaaS)', 'Hybrid'], pricing: 'Per site', from: 45, industries: ['hospitality'], highlights: ['KOT & table plans', 'Aggregator sync', 'Recipe costing'], rating: 4.7, reviews: 201 },
  { slug: 'nova-loyalty', name: 'Nova Loyalty', category: 'pos-retail', tagline: 'Points, tiers and targeted offers across channels.', overview: "Points, tiers and targeted offers that work across store, web and app on one customer profile. Rules are defined centrally and enforced at the till even when the till is offline.", deployment: ['Cloud (SaaS)'], pricing: 'Usage based', from: 0, industries: ['retail', 'hospitality'], highlights: ['Tiered programs', 'Offer targeting', 'Wallet & vouchers'], rating: 4.4, reviews: 59 },

  { slug: 'nova-commerce', name: 'Nova Commerce', category: 'ecommerce', tagline: 'Headless, API-first commerce engine.', overview: "An API-first commerce engine you can front with anything. Catalogue, pricing, cart, checkout and orders over REST and GraphQL, an edge-cached catalogue tested to several million SKUs, and a promotions engine that does not require a deployment to change an offer.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Usage based', from: 0, industries: ['retail'], badge: 'Flagship', highlights: ['GraphQL + REST APIs', 'Promotions engine', 'Edge-cached catalog'], rating: 4.7, reviews: 168 },
  { slug: 'nova-market', name: 'Nova Market', category: 'ecommerce', tagline: 'Multi-vendor marketplace with automated payouts.', overview: "Multi-vendor marketplace infrastructure. Vendor onboarding with KYC, commission rules per vendor or category, automated settlement runs and payouts with a reconciliation trail your finance team can audit.", deployment: ['Cloud (SaaS)'], pricing: 'Usage based', from: 0, industries: ['retail'], highlights: ['Vendor onboarding & KYC', 'Split payouts', 'Commission rules'], rating: 4.5, reviews: 63 },
  { slug: 'nova-pim', name: 'Nova PIM', category: 'ecommerce', tagline: 'Product information management and syndication.', overview: "Product information management for catalogues that feed more than one channel. Attribute governance, completeness scoring, a digital asset library and syndication to marketplaces in each channel's required format.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 24, industries: ['retail', 'manufacturing'], highlights: ['Attribute governance', 'Channel syndication', 'Digital asset library'], rating: 4.4, reviews: 44 },

  { slug: 'nova-desk', name: 'Nova Desk', category: 'helpdesk', tagline: 'Omnichannel service desk with SLA clocks.', overview: "An omnichannel service desk with one SLA clock. Email, portal, chat, WhatsApp and voice thread into a single ticket, SLAs run against per-customer business calendars, and a knowledge base deflects the questions your agents answer twenty times a week.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Per user / month', from: 17, industries: ['services', 'fintech', 'retail'], highlights: ['Email / chat / WhatsApp', 'SLA & escalation', 'Knowledge base'], rating: 4.6, reviews: 227 },
  { slug: 'nova-itsm', name: 'Nova ITSM', category: 'helpdesk', tagline: 'ITIL-aligned incident, change and problem management.', overview: "ITIL-aligned service management for internal IT. Incident, problem, change and release with a CMDB that discovers rather than relies on manual updates, CAB approvals, and major incident rooms that assemble the right people automatically.", deployment: ['Private cloud', 'On-premise'], pricing: 'Per user / month', from: 31, industries: ['fintech', 'services'], highlights: ['CMDB & discovery', 'CAB approvals', 'Major incident rooms'], rating: 4.5, reviews: 71 },

  { slug: 'nova-engage', name: 'Nova Engage', category: 'marketing-cms', tagline: 'Lifecycle journeys across email, SMS and WhatsApp.', overview: "Lifecycle marketing across email, SMS and WhatsApp from one journey builder. Behavioural segments update continuously, journeys branch on real events, and attribution reports join back to closed revenue rather than to form fills.", deployment: ['Cloud (SaaS)'], pricing: 'Usage based', from: 0, industries: ['retail', 'fintech', 'edtech'], highlights: ['Visual journey builder', 'Behavioural segments', 'Revenue attribution'], rating: 4.6, reviews: 114 },
  { slug: 'nova-content', name: 'Nova Content', category: 'marketing-cms', tagline: 'Headless CMS with visual editing and localisation.', overview: "A headless CMS your marketing team can actually use. Structured content behind an API, a visual editor with preview and scheduled publishing, and a per-field translation workflow across thirty locales - with developers keeping control of the schema.", deployment: ['Cloud (SaaS)'], pricing: 'Per user / month', from: 20, industries: ['retail', 'services', 'edtech'], highlights: ['Structured content API', 'Visual editor', '30+ locales'], rating: 4.5, reviews: 87 },

  { slug: 'nova-care-his', name: 'Nova Care HIS', category: 'healthcare', tagline: 'Hospital information system, OPD to discharge.', overview: "A hospital information system covering registration through discharge and claim. EMR with e-prescription, OT and IPD scheduling, pharmacy, stores and integrated lab, with HIPAA-aligned audit logging throughout. Runs fully on-premise where data residency requires it.", deployment: ['On-premise', 'Private cloud'], pricing: 'Per site', from: 1450, industries: ['healthcare'], badge: 'Flagship', highlights: ['EMR & e-prescription', 'OT & IPD scheduling', 'Claims & TPA'], rating: 4.7, reviews: 96 },
  { slug: 'nova-clinic', name: 'Nova Clinic', category: 'healthcare', tagline: 'Appointments, records and billing for clinics.', overview: "Clinic management for single sites and small chains. Online booking, teleconsultation, digital prescriptions and billing on one patient timeline, without the configuration weight of a hospital system.", deployment: ['Cloud (SaaS)'], pricing: 'Per site', from: 79, industries: ['healthcare'], highlights: ['Online booking', 'Teleconsult', 'Digital prescriptions'], rating: 4.6, reviews: 154 },
  { slug: 'nova-lis', name: 'Nova LIS', category: 'healthcare', tagline: 'Lab information system with analyser integration.', overview: "A laboratory information system wired into your analysers. Sample barcoding from collection, results auto-populated over HL7, rule-based release for normal values, and turnaround-time reporting per test and technician.", deployment: ['On-premise', 'Hybrid'], pricing: 'Per site', from: 520, industries: ['healthcare'], highlights: ['Analyser interfacing', 'Sample barcoding', 'Auto report release'], rating: 4.5, reviews: 48 },

  { slug: 'nova-learn', name: 'Nova Learn', category: 'edtech', tagline: 'LMS for institutions and corporate academies.', overview: "A learning platform for institutions and corporate academies. SCORM and xAPI content imports directly, live classes run through your Zoom or Meet plan, assessments support proctoring, and skill-gap analytics show who is ready for what.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Per user / month', from: 3, industries: ['edtech'], highlights: ['SCORM & xAPI', 'Live classes', 'Proctored assessments'], rating: 4.6, reviews: 183 },
  { slug: 'nova-campus', name: 'Nova Campus', category: 'edtech', tagline: 'Admissions, fees, exams and hostel management.', overview: "Institution management from enquiry to alumni. Admissions funnel, fee and scholarship handling with online collection, exam and result processing, hostel and transport - with a parent portal so the office stops fielding phone calls.", deployment: ['Cloud (SaaS)', 'On-premise'], pricing: 'Per site', from: 310, industries: ['edtech'], highlights: ['Admissions funnel', 'Fee & scholarship', 'Exam & result engine'], rating: 4.4, reviews: 69 },

  { slug: 'nova-stay', name: 'Nova Stay', category: 'realestate-hospitality', tagline: 'Hotel PMS with channel manager and housekeeping.', overview: "Hotel property management with the channel manager built in. Rates and inventory sync two-way with the major OTAs, housekeeping runs off a live board rather than paper, and the guest folio follows the guest across stays.", deployment: ['Cloud (SaaS)'], pricing: 'Per site', from: 95, industries: ['hospitality'], highlights: ['Rate & inventory sync', 'Housekeeping board', 'Guest folio'], rating: 4.6, reviews: 108 },
  { slug: 'nova-estate', name: 'Nova Estate', category: 'realestate-hospitality', tagline: 'Leases, rent roll and facility upkeep for portfolios.', overview: "Lease and portfolio management for property owners. Lease lifecycle with escalation schedules, rent roll, maintenance requests against units, and owner statements generated rather than assembled.", deployment: ['Cloud (SaaS)'], pricing: 'Per site', from: 140, industries: ['construction', 'services'], highlights: ['Lease lifecycle', 'Rent escalation', 'Owner statements'], rating: 4.4, reviews: 37 },

  { slug: 'nova-id', name: 'Nova ID', category: 'security-iam', tagline: 'SSO, MFA and adaptive access for your whole stack.', overview: "One identity across every application you run. SAML, OIDC and SCIM provisioning, passkeys and MFA, and adaptive policies that step up authentication on risk rather than on every login. Access reviews become a scheduled campaign instead of a six-week spreadsheet exercise.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Per user / month', from: 3, industries: ['fintech', 'healthcare', 'services'], badge: 'Popular', highlights: ['SAML / OIDC / SCIM', 'Passkeys & MFA', 'Risk-based policies'], rating: 4.8, reviews: 195 },
  { slug: 'nova-vault', name: 'Nova Vault', category: 'security-iam', tagline: 'Privileged access with session recording.', overview: "Privileged access management with proof. Credentials are vaulted rather than shared, sessions are recorded, and standing admin rights are replaced by just-in-time elevation with an approval trail.", deployment: ['Private cloud', 'On-premise'], pricing: 'Per user / month', from: 12, industries: ['fintech', 'healthcare'], highlights: ['Credential vaulting', 'Session recording', 'Just-in-time access'], rating: 4.6, reviews: 43 },

  { slug: 'nova-docs', name: 'Nova Docs', category: 'dms-workflow', tagline: 'Versioned document management with OCR search.', overview: "Document management with search that reaches inside the documents. OCR on upload makes scanned files fully searchable, versioning keeps the history intact, e-signature is built in, and retention policies enforce themselves with legal hold override.", deployment: ['Cloud (SaaS)', 'On-premise'], pricing: 'Per user / month', from: 8, industries: ['services', 'healthcare', 'construction'], highlights: ['OCR full-text search', 'Retention policies', 'e-Signature'], rating: 4.5, reviews: 112 },
  { slug: 'nova-flow', name: 'Nova Flow', category: 'dms-workflow', tagline: 'No-code workflow engine for internal approvals.', overview: "A no-code workflow engine for the approvals that currently live in email. Drag-and-drop design, conditional routing, parallel approvers, delegation and SLA reminders - with an audit trail that stands up in a compliance review.", deployment: ['Cloud (SaaS)', 'Private cloud'], pricing: 'Per user / month', from: 10, industries: ['services', 'manufacturing', 'fintech'], badge: 'New', highlights: ['Drag-drop designer', 'Conditional routing', 'SLA reminders'], rating: 4.6, reviews: 81 },
];

/* Live counts, so the UI never drifts from the data */
categories.forEach((c) => {
  c.count = products.filter((p) => p.category === c.slug).length;
});

/** Single source of truth for the numbers quoted across the site. */
export const productCount = products.length;
export const categoryCount = categories.length;

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const productsByCategory = (slug) => products.filter((p) => p.category === slug);
export const categoryName = (slug) => getCategory(slug)?.name ?? slug;
