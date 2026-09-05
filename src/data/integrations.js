import {
  CreditCard, Key, Landmark, MessageSquare, ShoppingCart, Truck,
  TrendingUp, Users, Database, Phone,
} from 'lucide-react';
import { brand } from './brand.js';

/* Integration directory. Categories carry the icon so a card, a filter chip and
   a detail page all render the same mark without repeating it per record. */
export const integrationCategories = [
  { slug: 'payments', name: 'Payments', icon: CreditCard, blurb: 'Take money, reconcile it, and refund it without leaving the ledger.' },
  { slug: 'identity', name: 'Identity & SSO', icon: Key, blurb: 'One sign-in across every product, provisioned from the directory you already run.' },
  { slug: 'finance', name: 'Accounting & Tax', icon: Landmark, blurb: 'Push journals and invoices into the books your accountants already close.' },
  { slug: 'communication', name: 'Communication', icon: MessageSquare, blurb: 'Approvals, alerts and escalations where your teams already are.' },
  { slug: 'commerce', name: 'E-commerce', icon: ShoppingCart, blurb: 'One catalog and one stock ledger across storefront, store and warehouse.' },
  { slug: 'logistics', name: 'Logistics & Shipping', icon: Truck, blurb: 'Rates, labels and tracking without a per-carrier integration project.' },
  { slug: 'analytics', name: 'Analytics & BI', icon: TrendingUp, blurb: 'Your warehouse, your models — we just keep it fed and documented.' },
  { slug: 'hr', name: 'HR & Payroll', icon: Users, blurb: 'Employee master data flowing one way, deliberately, with an owner.' },
  { slug: 'storage', name: 'Storage & Documents', icon: Database, blurb: 'Documents where your retention policy already applies.' },
  { slug: 'telephony', name: 'Telephony', icon: Phone, blurb: 'Click to dial, screen pops and recordings attached to the record.' },
];

export const integrations = [
  {
    slug: 'stripe', name: 'Stripe', category: 'payments',
    tagline: 'Cards, wallets and subscriptions, reconciled to the invoice.',
    direction: 'Bidirectional', auth: 'API key + webhook signing secret', setup: '~30 min',
    products: [`${brand.productPrefix} Billing`, `${brand.productPrefix} ERP`, `${brand.productPrefix} POS`],
    description:
      'Charges, refunds, disputes and payout reconciliation. Webhooks land as ledger events, so a payout in Stripe matches a bank line in the ERP without a spreadsheet in between.',
    capabilities: ['Card, wallet and bank debit charges', 'Subscription and metered billing sync', 'Automatic payout reconciliation', 'Dispute and chargeback events', 'Refunds initiated from either side'],
  },
  {
    slug: 'razorpay', name: 'Razorpay', category: 'payments',
    tagline: 'UPI, cards and netbanking for Indian collections.',
    direction: 'Bidirectional', auth: 'API key pair + webhook secret', setup: '~30 min',
    products: [`${brand.productPrefix} Billing`, `${brand.productPrefix} ERP`, `${brand.productPrefix} POS`],
    description:
      'Full UPI support including collect requests and autopay mandates, with settlement files parsed into the ledger and GST-compliant invoice references carried on every charge.',
    capabilities: ['UPI collect and intent flows', 'Autopay mandates for subscriptions', 'Settlement file reconciliation', 'Payment links from any invoice', 'Instant refunds where supported'],
  },
  {
    slug: 'adyen', name: 'Adyen', category: 'payments',
    tagline: 'Multi-region acquiring for groups selling across borders.',
    direction: 'Bidirectional', auth: 'API key + HMAC webhook', setup: '~1 day',
    products: [`${brand.productPrefix} Billing`, `${brand.productPrefix} POS`],
    description:
      'For retailers operating in several markets under one group. Local payment methods per market, one reconciliation model, and terminal integration for in-store capture.',
    capabilities: ['Local payment methods per market', 'In-store terminal capture', 'Multi-currency settlement', 'Unified reporting across channels'],
  },
  {
    slug: 'microsoft-entra-id', name: 'Microsoft Entra ID', category: 'identity',
    tagline: 'SAML or OIDC sign-in with SCIM provisioning.',
    direction: 'Inbound', auth: 'SAML 2.0 / OIDC + SCIM token', setup: '~45 min',
    products: ['All products'],
    description:
      'The most common identity integration we deploy. Users, groups and deactivations flow in over SCIM, so a leaver in Entra loses access everywhere within the sync window rather than at the next access review.',
    capabilities: ['SAML 2.0 and OIDC single sign-on', 'SCIM 2.0 user and group provisioning', 'Group-to-role mapping', 'Immediate deprovisioning on deactivation', 'Conditional access pass-through'],
  },
  {
    slug: 'okta', name: 'Okta', category: 'identity',
    tagline: 'SSO, lifecycle management and step-up authentication.',
    direction: 'Inbound', auth: 'OIDC + SCIM token', setup: '~45 min',
    products: ['All products'],
    description:
      'Standard OIDC federation plus SCIM lifecycle. Risk signals from Okta can trigger step-up authentication on privileged actions such as payroll approval or vendor bank-detail changes.',
    capabilities: ['OIDC single sign-on', 'SCIM lifecycle management', 'Step-up auth on privileged actions', 'Group-to-permission mapping'],
  },
  {
    slug: 'google-workspace', name: 'Google Workspace', category: 'identity',
    tagline: 'Sign in with Google and sync the directory.',
    direction: 'Inbound', auth: 'OIDC + service account', setup: '~30 min',
    products: ['All products'],
    description:
      'OIDC sign-in with directory sync for organisations running Workspace as their source of truth for people. Calendar availability can be surfaced in scheduling modules where relevant.',
    capabilities: ['Google sign-in (OIDC)', 'Directory user and org-unit sync', 'Calendar availability lookup', 'Domain-restricted access'],
  },
  {
    slug: 'quickbooks', name: 'QuickBooks Online', category: 'finance',
    tagline: 'Journals, invoices and payments into the books.',
    direction: 'Outbound', auth: 'OAuth 2.0', setup: '~2 hrs',
    products: [`${brand.productPrefix} ERP`, `${brand.productPrefix} Billing`],
    description:
      'Summary or detail-level journal posting on a schedule you choose, with a reconciliation report per run listing anything that failed to post and why. Nothing posts silently.',
    capabilities: ['Journal entry posting', 'Invoice and credit note sync', 'Customer and vendor master sync', 'Chart of accounts mapping UI', 'Per-run reconciliation report'],
  },
  {
    slug: 'xero', name: 'Xero', category: 'finance',
    tagline: 'Small-business accounting sync with mapped tax codes.',
    direction: 'Outbound', auth: 'OAuth 2.0', setup: '~2 hrs',
    products: [`${brand.productPrefix} ERP`, `${brand.productPrefix} Billing`],
    description:
      'Invoices, bills and payments pushed to Xero with an explicit tax-code mapping step during setup, because inferring tax treatment is the fastest way to create work for an accountant.',
    capabilities: ['Invoice and bill sync', 'Payment allocation', 'Explicit tax code mapping', 'Contact master sync'],
  },
  {
    slug: 'tally', name: 'Tally Prime', category: 'finance',
    tagline: 'The books most Indian mid-market finance teams still close in.',
    direction: 'Outbound', auth: 'Local connector + shared secret', setup: '~1 day',
    products: [`${brand.productPrefix} ERP`, `${brand.productPrefix} Billing`],
    description:
      'A local connector service posts vouchers into Tally over XML, including GST fields, and reads back voucher numbers so both systems reference the same document.',
    capabilities: ['Sales, purchase and journal vouchers', 'GST field mapping', 'Voucher number write-back', 'Runs on-premise beside Tally'],
  },
  {
    slug: 'slack', name: 'Slack', category: 'communication',
    tagline: 'Approvals and alerts where the decision actually happens.',
    direction: 'Bidirectional', auth: 'OAuth 2.0 app install', setup: '~20 min',
    products: ['All products'],
    description:
      'Approve a purchase order or a leave request from the message itself, with the approval written back to the record complete with actor and timestamp for the audit log.',
    capabilities: ['Interactive approvals from a message', 'Threaded alerts per channel and rule', 'Slash commands for record lookup', 'Audit-logged actions with actor identity'],
  },
  {
    slug: 'microsoft-teams', name: 'Microsoft Teams', category: 'communication',
    tagline: 'Adaptive-card approvals inside the tool people already have open.',
    direction: 'Bidirectional', auth: 'Azure app registration', setup: '~30 min',
    products: ['All products'],
    description:
      'Adaptive cards for approvals and escalations, channel notifications per rule, and a tab that embeds a filtered view of the record list for the team that owns it.',
    capabilities: ['Adaptive card approvals', 'Channel and chat notifications', 'Embedded record tabs', 'Meeting-time escalation routing'],
  },
  {
    slug: 'twilio', name: 'Twilio', category: 'communication',
    tagline: 'Transactional SMS and WhatsApp with delivery receipts.',
    direction: 'Outbound', auth: 'Account SID + auth token', setup: '~20 min',
    products: [`${brand.productPrefix} CRM`, `${brand.productPrefix} Care HIS`, `${brand.productPrefix} POS`],
    description:
      'Templated SMS and WhatsApp messaging with per-message delivery status written back to the record, so a failed appointment reminder is visible to the person who needs to act on it.',
    capabilities: ['Templated SMS and WhatsApp', 'Delivery receipts on the record', 'Per-country sender configuration', 'Opt-out list enforcement'],
  },
  {
    slug: 'shopify', name: 'Shopify', category: 'commerce',
    tagline: 'One stock ledger across storefront, stores and warehouse.',
    direction: 'Bidirectional', auth: 'OAuth 2.0 private app', setup: '~half day',
    products: [`${brand.productPrefix} Stock`, `${brand.productPrefix} ERP`, `${brand.productPrefix} POS`],
    description:
      'Orders flow in, fulfilment and stock levels flow out. The stock ledger stays in one place so the storefront cannot sell what the warehouse has already committed.',
    capabilities: ['Order and refund ingest', 'Stock level publishing', 'Product and variant sync', 'Fulfilment and tracking write-back', 'Multi-location inventory'],
  },
  {
    slug: 'woocommerce', name: 'WooCommerce', category: 'commerce',
    tagline: 'WordPress storefronts on the same ledger as everything else.',
    direction: 'Bidirectional', auth: 'REST API key pair', setup: '~half day',
    products: [`${brand.productPrefix} Stock`, `${brand.productPrefix} ERP`],
    description:
      'The same order and inventory contract as the Shopify connector, over the WooCommerce REST API, including tax and shipping line handling for orders that span both channels.',
    capabilities: ['Order ingest with tax and shipping lines', 'Stock and price publishing', 'Product sync with variations', 'Refund handling'],
  },
  {
    slug: 'amazon-marketplace', name: 'Amazon Marketplace', category: 'commerce',
    tagline: 'Marketplace orders in the same queue as everything else.',
    direction: 'Bidirectional', auth: 'SP-API LWA credentials', setup: '~1 day',
    products: [`${brand.productPrefix} Stock`, `${brand.productPrefix} ERP`],
    description:
      'Selling Partner API integration for order ingest, inventory publishing and settlement report parsing, so marketplace fees land in the ledger rather than as an unexplained variance.',
    capabilities: ['Order ingest via SP-API', 'Inventory feed publishing', 'Settlement report reconciliation', 'Fee breakdown into the ledger'],
  },
  {
    slug: 'delhivery', name: 'Delhivery', category: 'logistics',
    tagline: 'Domestic Indian shipping with label generation.',
    direction: 'Bidirectional', auth: 'API token', setup: '~2 hrs',
    products: [`${brand.productPrefix} WMS`, `${brand.productPrefix} Stock`, `${brand.productPrefix} ERP`],
    description:
      'Rate lookup, manifest and label generation, and tracking webhooks that update the order without anyone pasting an AWB number into a form.',
    capabilities: ['Rate lookup at checkout', 'Label and manifest generation', 'Tracking webhooks on the order', 'Return pickup scheduling', 'COD remittance reconciliation'],
  },
  {
    slug: 'dhl-express', name: 'DHL Express', category: 'logistics',
    tagline: 'Cross-border shipping with customs documentation.',
    direction: 'Bidirectional', auth: 'API credentials', setup: '~half day',
    products: [`${brand.productPrefix} WMS`, `${brand.productPrefix} ERP`],
    description:
      'International rates, commercial invoice and customs paperwork generated from the order, plus duty estimates surfaced before the customer commits rather than after.',
    capabilities: ['International rate quotes', 'Commercial invoice generation', 'Customs documentation', 'Landed-cost estimation', 'Tracking events on the order'],
  },
  {
    slug: 'shiprocket', name: 'Shiprocket', category: 'logistics',
    tagline: 'Multi-carrier aggregation without per-carrier work.',
    direction: 'Bidirectional', auth: 'API token', setup: '~2 hrs',
    products: [`${brand.productPrefix} Stock`, `${brand.productPrefix} ERP`],
    description:
      'One connector across many Indian carriers, with courier selection rules you control — cheapest, fastest, or best serviceability for the destination pincode.',
    capabilities: ['Multi-carrier rate comparison', 'Rule-based courier selection', 'Unified tracking events', 'NDR and RTO handling'],
  },
  {
    slug: 'power-bi', name: 'Microsoft Power BI', category: 'analytics',
    tagline: 'A documented semantic layer, not a raw table dump.',
    direction: 'Outbound', auth: 'Service principal', setup: '~half day',
    products: ['All products'],
    description:
      'We publish a governed dataset with named measures and a data dictionary rather than exposing production tables, so a report written this year still works after next year schema change.',
    capabilities: ['Governed semantic model', 'Incremental refresh', 'Row-level security mapped to permissions', 'Starter report pack', 'Published data dictionary'],
  },
  {
    slug: 'snowflake', name: 'Snowflake', category: 'analytics',
    tagline: 'Change-data-capture into your warehouse.',
    direction: 'Outbound', auth: 'Key-pair auth', setup: '~1 day',
    products: ['All products'],
    description:
      'CDC streams into staging tables you own, with schema-change notifications ahead of deployment so your models break in a pull request rather than in production.',
    capabilities: ['Change data capture streams', 'Schema-change notifications ahead of release', 'Historical backfill', 'Column-level lineage documentation'],
  },
  {
    slug: 'metabase', name: 'Metabase', category: 'analytics',
    tagline: 'Read replica plus curated models for self-serve reporting.',
    direction: 'Outbound', auth: 'Database credentials', setup: '~2 hrs',
    products: ['All products'],
    description:
      'A read replica with curated views and permission-aware row filtering, for teams who want analysts querying directly without pointing them at production.',
    capabilities: ['Read replica provisioning', 'Curated reporting views', 'Permission-aware row filtering', 'Starter dashboard collection'],
  },
  {
    slug: 'darwinbox', name: 'Darwinbox', category: 'hr',
    tagline: 'Employee master data with one clear owner.',
    direction: 'Inbound', auth: 'API key', setup: '~half day',
    products: [`${brand.productPrefix} HRMS`, `${brand.productPrefix} ERP`],
    description:
      'Employee, org unit and cost centre data flows one way by design. Two systems that both believe they own the employee record is the most expensive integration mistake we see.',
    capabilities: ['Employee and org-unit sync', 'Cost centre mapping', 'Joiner, mover and leaver events', 'Conflict reporting rather than silent overwrite'],
  },
  {
    slug: 'workday', name: 'Workday', category: 'hr',
    tagline: 'Enterprise HCM as the system of record for people.',
    direction: 'Inbound', auth: 'OAuth 2.0 / SOAP', setup: '~1 week',
    products: [`${brand.productPrefix} HRMS`, `${brand.productPrefix} ERP`],
    description:
      'Scheduled worker and organisation extracts with position-level detail, mapped into permissions and approval hierarchies so an org change updates who can approve what.',
    capabilities: ['Worker and position extracts', 'Organisation hierarchy sync', 'Approval chain derivation', 'Termination-driven deprovisioning'],
  },
  {
    slug: 'sharepoint', name: 'SharePoint & OneDrive', category: 'storage',
    tagline: 'Documents where your retention policy already applies.',
    direction: 'Bidirectional', auth: 'Azure app registration', setup: '~2 hrs',
    products: [`${brand.productPrefix} Docs`, `${brand.productPrefix} ERP`, `${brand.productPrefix} HRMS`],
    description:
      'Attachments live in your tenant rather than ours, with links from the record. Your existing retention, DLP and eDiscovery policies keep applying without a second policy to maintain.',
    capabilities: ['Attachment storage in your tenant', 'Folder templates per record type', 'Permission inheritance from the record', 'Retention and DLP policy pass-through'],
  },
  {
    slug: 'aws-s3', name: 'Amazon S3', category: 'storage',
    tagline: 'Object storage in your account, in your region.',
    direction: 'Bidirectional', auth: 'IAM role assumption', setup: '~1 hr',
    products: ['All products'],
    description:
      'Bring your own bucket, in the region your data-residency requirement names. We assume a role rather than holding long-lived keys, and lifecycle policies stay yours.',
    capabilities: ['Bring-your-own bucket and region', 'IAM role assumption, no stored keys', 'Server-side encryption with your KMS key', 'Lifecycle and versioning under your control'],
  },
  {
    slug: 'exotel', name: 'Exotel', category: 'telephony',
    tagline: 'Click to dial and recordings attached to the record.',
    direction: 'Bidirectional', auth: 'API key + webhook', setup: '~2 hrs',
    products: [`${brand.productPrefix} CRM`, `${brand.productPrefix} Care HIS`],
    description:
      'Cloud telephony with screen pop on inbound calls, click-to-dial from any contact, and call recordings linked to the customer record under the same retention rules as everything else.',
    capabilities: ['Click to dial from any record', 'Inbound screen pop with caller match', 'Call recording linked to the record', 'IVR routing by account owner'],
  },
];

export const integrationCount = integrations.length;
export const getIntegration = (slug) => integrations.find((i) => i.slug === slug);
export const getIntegrationCategory = (slug) => integrationCategories.find((c) => c.slug === slug);
export const integrationsInCategory = (slug) => integrations.filter((i) => i.category === slug);
