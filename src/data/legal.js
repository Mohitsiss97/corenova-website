import { brand, emails } from './brand.js';

/* ------------------------------------------------------------------
   Legal and trust documents.

   IMPORTANT: this is template copy written to make the site complete and
   internally consistent. It has NOT been reviewed by a lawyer. Before this
   site represents a real company, every document here needs replacing with
   text your counsel has approved — particularly the sub-processor list,
   retention periods and governing-law clause.

   Each document renders through pages/LegalPage.jsx, which builds the
   table of contents from `sections`.
------------------------------------------------------------------ */

export const legalDocs = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy policy',
    eyebrow: 'Legal',
    updated: '2026-07-14',
    summary:
      'What we collect, why we collect it, who else touches it and how to get it deleted. Written to be read rather than to be defensible.',
    intro:
      `This policy covers ${brand.domain} and the ${brand.name} products you access as a customer. Where you are our customer’s employee rather than our customer, your employer controls that data and we process it on their instructions — their policy governs, not this one.`,
    sections: [
      {
        id: 'what-we-collect',
        heading: 'What we collect',
        body: [
          'From website visitors: pages viewed, referrer, approximate location derived from IP, and whatever you type into a form. We do not run advertising trackers and we do not sell anything to data brokers.',
          'From customers: account details (name, work email, role, company), configuration you create, and the operational logs the product needs to work — who changed what, and when.',
          'From candidates: the CV and details you submit through the careers pages, kept for the role you applied to and, with your consent, for future openings.',
        ],
      },
      {
        id: 'why',
        heading: 'Why we process it',
        list: [
          'To provide the product you have contracted for — the legal basis is performance of that contract.',
          'To keep it secure and available: audit logs, abuse detection, backups. Our legitimate interest, and yours.',
          'To answer you when you contact us. Consent, which you give by writing to us.',
          'To meet tax, accounting and statutory obligations where the law requires records to be kept.',
        ],
      },
      {
        id: 'sharing',
        heading: 'Who else sees it',
        body: [
          'We use a small number of sub-processors: cloud hosting, transactional email, error monitoring and payment processing. The current list, with the region each operates in, is available on request and forms part of your data processing agreement.',
          'We do not sell personal data. We disclose it to authorities only where a valid legal order compels us, and we will tell you unless we are legally prohibited from doing so.',
        ],
      },
      {
        id: 'residency',
        heading: 'Where it lives',
        body: [
          'Cloud customers choose a hosting region at contract stage, and their data stays in it. Private cloud and on-premise customers hold their own data entirely — we never receive a copy, including for support, unless you send us one deliberately.',
          'International transfers, where they occur, rely on Standard Contractual Clauses.',
        ],
      },
      {
        id: 'retention',
        heading: 'How long we keep it',
        list: [
          'Customer product data: for the contract term, then 30 days for recovery, then deleted.',
          'Backups: rolling 35-day window, after which restores are no longer possible.',
          'Website analytics: 14 months, aggregated.',
          'Candidate data: 6 months after a decision, or 2 years with consent.',
          'Invoices and tax records: as long as the applicable law requires, typically 7 years.',
        ],
      },
      {
        id: 'your-rights',
        heading: 'Your rights',
        body: [
          'You can ask for a copy of your data, ask us to correct it, ask us to delete it, object to processing, or ask for it in a portable format. Write to the address below and we will respond within 30 days.',
          'If you are our customer’s employee, send the request to your employer — we will route it to them rather than acting on their data ourselves.',
          'You can also complain to your local supervisory authority. We would rather you told us first.',
        ],
      },
      {
        id: 'contact-dpo',
        heading: 'Contact',
        body: [
          `Data protection enquiries: ${emails.privacy}. Postal address is on the contact page. We aim to acknowledge within two working days.`,
        ],
      },
    ],
  },

  terms: {
    slug: 'terms',
    title: 'Terms of service',
    eyebrow: 'Legal',
    updated: '2026-07-14',
    summary:
      'The agreement that applies when you use our products or website. Your signed order form takes precedence wherever the two disagree.',
    intro:
      `These terms govern access to ${brand.name} products and this website. Where you have signed a master services agreement or order form with us, that document wins on any point these terms cover differently.`,
    sections: [
      {
        id: 'the-service',
        heading: 'What we provide',
        body: [
          'Access to the products named in your order form, for the term stated there, at the service level of your plan. We may improve and change the products; we will not remove a capability you are paying for without giving you notice and an alternative.',
        ],
      },
      {
        id: 'your-obligations',
        heading: 'What we ask of you',
        list: [
          'Keep credentials secure and tell us promptly if you think they are compromised.',
          'Do not attempt to break, overload or reverse-engineer the service, or use it to store unlawful content.',
          'Make sure you have the right to put into the product whatever data you put into it.',
          'Pay invoices within the agreed terms.',
        ],
      },
      {
        id: 'your-data',
        heading: 'Your data stays yours',
        body: [
          'You retain all rights to the data you put into the product. We claim no licence to it beyond what is needed to run the service for you. We do not use it to train models, and we do not mine it for our own analytics.',
          'On termination you can export everything in open formats, on demand and through the API, at no charge.',
        ],
      },
      {
        id: 'ip',
        heading: 'Intellectual property',
        body: [
          'We own the products and everything in them. Where we build custom software for you under a statement of work, that work is assigned to you on payment, with no licence-back — our pre-existing modules remain ours, licensed to you perpetually as part of the deliverable.',
        ],
      },
      {
        id: 'availability',
        heading: 'Availability and support',
        body: [
          'Uptime commitments and response times are set by your plan and stated on the pricing page. Where we miss a committed SLA, the remedy is a service credit calculated against the affected period.',
          'Planned maintenance is notified at least five working days ahead and scheduled outside your business hours where the time zones allow.',
        ],
      },
      {
        id: 'liability',
        heading: 'Liability',
        body: [
          'Neither party excludes liability for death, personal injury or fraud. Beyond that, our aggregate liability in any twelve-month period is capped at the fees you paid us in that period, and neither party is liable for indirect or consequential loss.',
        ],
      },
      {
        id: 'termination',
        heading: 'Ending the agreement',
        list: [
          'Either party may terminate at the end of the term with the notice stated in the order form.',
          'Either party may terminate immediately for material breach that is not fixed within 30 days of being told about it.',
          'There is no exit fee, and export access continues for 30 days after termination.',
        ],
      },
      {
        id: 'law',
        heading: 'Governing law',
        body: [
          `These terms are governed by the law named in your order form. Where none is named, the courts of the jurisdiction of the contracting ${brand.name} entity have exclusive jurisdiction.`,
        ],
      },
    ],
  },

  security: {
    slug: 'security',
    title: 'Security & compliance',
    eyebrow: 'Trust',
    updated: '2026-08-02',
    summary:
      'Certifications, how the platform is built and operated, and what we will hand your security team during a review.',
    intro:
      'Security controls are the same on every plan. What changes between tiers is retention, export and how much of the evidence pack we can share without an NDA.',
    sections: [
      {
        id: 'certifications',
        heading: 'Certifications',
        list: [
          'ISO 27001:2022 — certified, audited annually by an accredited body.',
          'SOC 2 Type II — report covering security, availability and confidentiality, refreshed each year.',
          'ISO 9001:2015 — quality management across delivery.',
          'GDPR — data processing agreement and Standard Contractual Clauses available.',
          'HIPAA — aligned controls and BAA support for healthcare deployments.',
          'CMMI Level 5 — appraised delivery process.',
        ],
      },
      {
        id: 'infrastructure',
        heading: 'Infrastructure security',
        list: [
          'Encryption in transit (TLS 1.3) and at rest (AES-256) on every deployment mode.',
          'Network segmentation with private subnets; no database is reachable from the internet.',
          'Infrastructure defined in Terraform and peer-reviewed — no console changes that cannot be reproduced.',
          'Least-privilege IAM with just-in-time elevation and no standing production admin.',
          'Backups every 6 hours with a 35-day window and quarterly restore rehearsals.',
        ],
      },
      {
        id: 'application',
        heading: 'Application security',
        list: [
          'SSO (SAML and OIDC), SCIM provisioning, MFA and passkeys.',
          'Role-based permissions down to individual actions, not just pages.',
          'Immutable audit logging of every state change, with actor, before and after.',
          'Dependency and container scanning on every build; a failing scan blocks the merge.',
          'Annual third-party penetration test; summary available under NDA.',
        ],
      },
      {
        id: 'people',
        heading: 'People and process',
        body: [
          'Background checks on hire, security training on induction and annually after, and access reviewed quarterly. Engineers get production access for a named reason and a fixed window, and everything they do there is recorded.',
        ],
      },
      {
        id: 'incidents',
        heading: 'Incident response',
        body: [
          'We run a documented incident process with severity levels, a named commander and a communication path agreed with you at onboarding. For incidents affecting your data we notify you within 24 hours of confirming impact, with a written post-mortem inside 10 working days.',
        ],
      },
      {
        id: 'request',
        heading: 'What we will send your security team',
        list: [
          'SOC 2 Type II report and ISO 27001 certificate.',
          'Penetration test summary and remediation status.',
          'Sub-processor list with hosting regions.',
          'Data processing agreement and Standard Contractual Clauses.',
          'Completed CAIQ or your own security questionnaire.',
        ],
        cta: { label: 'Request the evidence pack', to: '/contact' },
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    title: 'Cookie policy',
    eyebrow: 'Legal',
    updated: '2026-07-14',
    summary:
      'This site uses very few cookies, and none of them follow you anywhere else.',
    intro:
      'We do not run advertising or cross-site tracking cookies. What is set here is limited to making the site work and understanding, in aggregate, which pages are useful.',
    sections: [
      {
        id: 'categories',
        heading: 'What we set',
        table: {
          head: ['Cookie', 'Purpose', 'Type', 'Expires'],
          rows: [
            [`${brand.slug}-theme`, 'Remembers whether you chose light or dark. Stored in localStorage, not sent to us.', 'Strictly necessary', 'Until cleared'],
            [`${brand.cookiePrefix}_session`, 'Keeps you signed in to the customer console.', 'Strictly necessary', 'Session'],
            [`${brand.cookiePrefix}_csrf`, 'Protects form submissions against cross-site request forgery.', 'Strictly necessary', 'Session'],
            [`${brand.cookiePrefix}_analytics`, 'Counts page views in aggregate. No cross-site identifier.', 'Analytics', '14 months'],
          ],
        },
      },
      {
        id: 'consent',
        heading: 'Your choice',
        body: [
          'Strictly necessary cookies cannot be switched off — without them the site cannot keep you signed in or protect a form submission. Analytics is opt-in in regions where consent is required and can be withdrawn at any time from your browser settings or by writing to us.',
        ],
      },
      {
        id: 'third-party',
        heading: 'Third-party cookies',
        body: [
          'Embedded video and calendar booking, where used, may set their own cookies under their own policies. We keep these to a minimum and load them only on the pages that need them.',
        ],
      },
      {
        id: 'managing',
        heading: 'Managing cookies yourself',
        body: [
          'Every major browser lets you view, block and delete cookies for a specific site. Blocking the strictly necessary ones will sign you out of the console; everything on this marketing site will still work.',
        ],
      },
    ],
  },
};

export const getLegalDoc = (slug) => legalDocs[slug];
export const legalDocList = Object.values(legalDocs);

export const formatLegalDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
