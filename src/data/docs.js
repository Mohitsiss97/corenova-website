import { Rocket, Key, Webhook, Boxes, Terminal, ShieldCheck } from 'lucide-react';
import { brand, hosts } from './brand.js';

/* Documentation content for the /docs shell. Sections drive the sidebar, the
   search index and the rendered body, so nothing can appear in the nav without
   existing on the page. */

export const quickstarts = [
  {
    title: 'Call your first endpoint',
    time: '5 min',
    audience: 'Developers',
    steps: [
      'Create a sandbox key in Settings → Developers → API keys',
      'Send a GET to /v1/ping with the key as a Bearer token',
      'Confirm the response contains your tenant id and API version',
      'Switch the base URL to production when you are ready — the contract is identical',
    ],
  },
  {
    title: 'Receive your first webhook',
    time: '15 min',
    audience: 'Developers',
    steps: [
      'Register an endpoint under Settings → Developers → Webhooks',
      'Subscribe to invoice.paid and copy the signing secret',
      'Verify the X-${brand.productPrefix}-Signature header before trusting any payload',
      'Replay the last 24 hours of events from the dashboard to test your handler',
    ],
  },
  {
    title: 'Connect your identity provider',
    time: '45 min',
    audience: 'Administrators',
    steps: [
      'Choose SAML 2.0 or OIDC under Settings → Authentication',
      `Map directory groups to ${brand.name} roles before enabling enforcement`,
      'Enable SCIM provisioning so leavers deprovision automatically',
      'Keep one break-glass local admin account with MFA enforced',
    ],
  },
  {
    title: 'Run an on-premise upgrade',
    time: '2 hrs',
    audience: 'Operators',
    steps: [
      'Read the release notes for breaking changes and required migration steps',
      'Take a verified backup and confirm you can restore it into staging',
      'Run the upgrade in staging and execute the smoke-test checklist',
      'Apply to production during your window; roll back with the documented path if a gate fails',
    ],
  },
];

export const docsSections = [
  {
    id: 'getting-started',
    title: 'Getting started',
    icon: Rocket,
    articles: [
      {
        id: 'platform-overview',
        title: 'Platform overview',
        summary: 'How products, tenants, environments and the shared data model fit together.',
        blocks: [
          { type: 'p', text: `Every ${brand.name} product runs on one platform. That means a single identity plane, one permission model and a shared set of core entities — customer, item, employee, location — that every product reads from rather than duplicating.` },
          { type: 'p', text: 'A tenant is your organisation. Within a tenant you have environments: at minimum production and sandbox, with additional staging environments available on Growth and Enterprise plans. Sandbox carries the same API contract as production and is free to call.' },
          { type: 'ul', items: [
            'Tenant — your organisation, billed as one account',
            'Environment — production, sandbox or staging, each with isolated data and its own keys',
            `Product — an application enabled for the tenant, such as ${brand.productPrefix} ERP or ${brand.productPrefix} HRMS`,
            'Module — a functional area within a product, gated by permission keys',
          ] },
        ],
      },
      {
        id: 'environments',
        title: 'Environments and deployment modes',
        summary: 'Cloud, private cloud, on-premise and hybrid — the same build in all four.',
        blocks: [
          { type: 'p', text: 'The four deployment modes run the same container images from the same release. There is no reduced on-premise edition, and no feature that exists only in the hosted product.' },
          { type: 'ul', items: [
            'Cloud — we operate it, multi-tenant, upgraded on our release train',
            'Private cloud — your cloud account, your region, operated by us or by you',
            'On-premise — your hardware, air-gapped supported, upgrades applied on your schedule',
            'Hybrid — data plane on-premise, control plane hosted, for teams with residency rules on data but not on metadata',
          ] },
          { type: 'note', text: 'On-premise customers may defer an upgrade for up to two minor versions. Beyond that, support moves to best-effort until you upgrade.' },
        ],
      },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    icon: Key,
    articles: [
      {
        id: 'api-keys',
        title: 'API keys and tokens',
        summary: 'Bearer tokens, scoping, rotation and what to do when a key leaks.',
        blocks: [
          { type: 'p', text: 'All API requests authenticate with a bearer token in the Authorization header. Keys are scoped to one environment and carry an explicit permission key set — a key can never do more than the role it was issued against.' },
          { type: 'code', lang: 'bash', text: `curl https://${hosts.api}/v1/customers \\\n  -H "Authorization: Bearer sk_live_..." \\\n  -H "X-${brand.productPrefix}-Version: 2026-06-01"` },
          { type: 'p', text: 'Rotate keys from the dashboard at any time. Rotation issues the new key immediately and keeps the old one valid for a grace window you choose, up to 72 hours, so a rotation never requires a deployment window.' },
          { type: 'note', text: 'If a key leaks, revoke it rather than rotating it. Revocation is immediate and has no grace window.' },
        ],
      },
      {
        id: 'sso',
        title: 'Single sign-on',
        summary: 'SAML 2.0 and OIDC federation, SCIM provisioning and group mapping.',
        blocks: [
          { type: 'p', text: 'SSO is available on every plan, including Starter. Configure SAML 2.0 or OIDC, map your directory groups to roles, then enable enforcement once the mapping is verified for at least one user per role.' },
          { type: 'p', text: 'SCIM 2.0 provisioning keeps the user list current in both directions of the employment lifecycle. A deactivation in your directory removes access within the sync window rather than at the next access review.' },
          { type: 'note', text: 'Always keep one break-glass local administrator with MFA enforced. If your IdP is unreachable, it is the only way back in.' },
        ],
      },
    ],
  },
  {
    id: 'api-reference',
    title: 'API reference',
    icon: Terminal,
    articles: [
      {
        id: 'conventions',
        title: 'Conventions',
        summary: 'Versioning, pagination, errors, idempotency and rate limits.',
        blocks: [
          { type: 'p', text: 'The API is REST over HTTPS with JSON bodies. A GraphQL endpoint covering the same entities is available at /graphql for read-heavy clients. Every capability in the UI has an API equivalent — there are no UI-only features.' },
          { type: 'ul', items: [
            'Versioning — pinned by the X-${brand.productPrefix}-Version date header; a version stays supported for 24 months',
            'Pagination — cursor based, via a starting_after parameter and a has_more flag',
            'Errors — RFC 9457 problem+json with a stable machine-readable type',
            'Idempotency — send an Idempotency-Key header on every POST; retries are safe for 24 hours',
            'Rate limits — 1,000 requests per minute per environment, returned in RateLimit headers',
          ] },
          { type: 'code', lang: 'json', text: `{\n  "type": "https://${hosts.docs}/errors/validation",\n  "title": "Validation failed",\n  "status": 422,\n  "errors": [{ "field": "email", "rule": "format" }]\n}` },
        ],
      },
    ],
  },
  {
    id: 'webhooks',
    title: 'Webhooks',
    icon: Webhook,
    articles: [
      {
        id: 'delivery',
        title: 'Delivery and retries',
        summary: 'At-least-once delivery, signature verification and replay.',
        blocks: [
          { type: 'p', text: 'Webhooks are delivered at least once. Your handler must be idempotent — deduplicate on the event id, which is stable across retries.' },
          { type: 'p', text: 'Failed deliveries retry with exponential backoff for 24 hours. After that the event stays available for manual replay from the dashboard for 30 days.' },
          { type: 'code', lang: 'csharp', text: 'var expected = Convert.ToHexString(\n    HMACSHA256.HashData(secret, Encoding.UTF8.GetBytes(rawBody)));\n\nif (!CryptographicOperations.FixedTimeEquals(expected, provided))\n    return Results.Unauthorized();' },
          { type: 'note', text: 'Verify the signature against the raw request body. Deserialising first and re-serialising will change the bytes and the signature will never match.' },
        ],
      },
    ],
  },
  {
    id: 'data',
    title: 'Data & migration',
    icon: Boxes,
    articles: [
      {
        id: 'imports',
        title: 'Imports and dry runs',
        summary: 'Validate, dry run, then commit — with a reconciliation report every time.',
        blocks: [
          { type: 'p', text: 'Every importer runs in three phases. Validate checks structure and references without writing. Dry run executes the full transformation into a shadow schema and produces a reconciliation report. Commit applies it.' },
          { type: 'p', text: 'The reconciliation report is the artefact to review, not the import file: counts by entity, financial totals to the cent, and an explicit list of rows not imported with a reason for each.' },
          { type: 'note', text: 'We require two successful dry runs on production-shaped data before any commit against a production environment.' },
        ],
      },
      {
        id: 'exports',
        title: 'Exports and leaving',
        summary: 'Full export in open formats, on demand and via API.',
        blocks: [
          { type: 'p', text: 'Every product supports a complete export in CSV and JSON, available from the dashboard and from /v1/exports. There is no exit fee and no notice period beyond your contract term.' },
          { type: 'p', text: 'Exports include the data dictionary describing every table, field and enum with its business meaning, so the extract is usable by a system that was not built to read it.' },
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: ShieldCheck,
    articles: [
      {
        id: 'audit-log',
        title: 'Audit log',
        summary: 'Every state change, with actor, before, after and reason.',
        blocks: [
          { type: 'p', text: 'The audit log records every state change with the actor, the before and after values, and where the interface captures one, the stated reason. Entries are append-only and cannot be deleted by any role, including tenant owner.' },
          { type: 'p', text: 'Stream the log to your SIEM over a webhook subscription or pull it from /v1/audit-events. Retention is 24 months on Growth and configurable up to 7 years on Enterprise.' },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ endpoints */
export const apiEndpoints = [
  { group: 'Core', method: 'GET', path: '/v1/ping', summary: 'Verify a key and return tenant, environment and API version.', scope: 'none' },
  { group: 'Customers', method: 'GET', path: '/v1/customers', summary: 'List customers with cursor pagination and filters.', scope: 'customer.view' },
  { group: 'Customers', method: 'POST', path: '/v1/customers', summary: 'Create a customer. Idempotency-Key required.', scope: 'customer.create' },
  { group: 'Customers', method: 'PATCH', path: '/v1/customers/{id}', summary: 'Update mutable fields on a customer record.', scope: 'customer.edit' },
  { group: 'Items', method: 'GET', path: '/v1/items', summary: 'List catalog items including variants and stock positions.', scope: 'item.view' },
  { group: 'Orders', method: 'POST', path: '/v1/orders', summary: 'Create an order and reserve stock atomically.', scope: 'order.create' },
  { group: 'Orders', method: 'POST', path: '/v1/orders/{id}/fulfil', summary: 'Record fulfilment and emit tracking events.', scope: 'order.fulfil' },
  { group: 'Invoices', method: 'GET', path: '/v1/invoices', summary: 'List invoices with status and payment allocation.', scope: 'invoice.view' },
  { group: 'Invoices', method: 'POST', path: '/v1/invoices/{id}/void', summary: 'Void an invoice with a required reason string.', scope: 'invoice.void' },
  { group: 'Employees', method: 'GET', path: '/v1/employees', summary: 'List employees, positions and reporting lines.', scope: 'employee.view' },
  { group: 'Audit', method: 'GET', path: '/v1/audit-events', summary: 'Query the immutable audit log by actor, entity or window.', scope: 'audit.view' },
  { group: 'Exports', method: 'POST', path: '/v1/exports', summary: 'Request a full data export in CSV or JSON.', scope: 'export.create' },
];

export const webhookEvents = [
  { name: 'invoice.paid', description: 'A payment has been allocated in full against an invoice.' },
  { name: 'invoice.overdue', description: 'An invoice has passed its due date without full allocation.' },
  { name: 'order.created', description: 'An order was accepted and stock reserved.' },
  { name: 'order.fulfilled', description: 'Fulfilment recorded, with carrier and tracking reference.' },
  { name: 'stock.low', description: 'An item crossed its reorder threshold at a location.' },
  { name: 'employee.terminated', description: 'A leaver was processed; downstream deprovisioning should follow.' },
  { name: 'user.permission_changed', description: 'A role or permission key assignment changed for a user.' },
  { name: 'export.ready', description: 'A requested export finished and is available to download.' },
];

/** Flat index so the docs page can search titles, summaries and section names. */
export const docsIndex = docsSections.flatMap((section) =>
  section.articles.map((article) => ({
    sectionId: section.id,
    sectionTitle: section.title,
    ...article,
  })),
);
