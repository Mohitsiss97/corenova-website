import {
  Factory, ShoppingBag, Landmark, Stethoscope, GraduationCap,
  Truck, HardHat, Hotel, Briefcase,
} from 'lucide-react';

/* Nine verticals. Each carries the pains we hear on the first call, the
   outcomes we have measured, the product stack we would recommend, the
   operational workflow the software has to survive, and the regulatory load
   that shapes the build. The detail template renders all five. */
export const industries = [
  {
    slug: 'manufacturing', icon: Factory, name: 'Manufacturing',
    tagline: 'Shop floor to balance sheet, on one number.',
    description:
      'Most manufacturers we meet run a capable ERP and a shop floor that does not talk to it. Production plans are built from last month numbers, stock is counted rather than known, and quality problems surface after despatch. The fix is rarely a bigger ERP — it is closing the loop between the machine and the ledger.',
    pains: ['Production plans that ignore real machine capacity', 'Stock accuracy below 90%', 'Quality issues found after despatch'],
    outcomes: [
      { metric: '18%', label: 'higher OEE after MES rollout' },
      { metric: '31%', label: 'less unplanned downtime' },
      { metric: '4 days', label: 'faster month-end close' },
    ],
    products: ['nova-erp', 'nova-manufacturing', 'nova-wms', 'nova-assets'],
    workflow: [
      { stage: 'Demand and planning', detail: 'Forecast and firm orders become a production plan constrained by real machine capacity, not an idealised routing.' },
      { stage: 'Procurement', detail: 'Shortages raise requisitions automatically, with three-way match on every vendor bill before it reaches finance.' },
      { stage: 'Production', detail: 'Work orders reach the floor with machine IoT ingest recording actual run, idle and changeover time as it happens.' },
      { stage: 'Quality', detail: 'In-process checks gate the next operation. A failed check holds the batch rather than flagging it after despatch.' },
      { stage: 'Despatch', detail: 'Barcode-accurate picking from stores, with lot traceability carried through to the delivery note.' },
      { stage: 'Financial close', detail: 'Production, stores and purchase post to one chart of accounts, so close is a review rather than a reconstruction.' },
    ],
    compliance: [
      { name: 'ISO 9001 traceability', detail: 'Lot and serial genealogy from raw material through to the customer despatch, exportable for a recall in minutes.' },
      { name: 'Statutory e-invoicing', detail: 'GST and VAT e-invoice generation with 14-country statutory packs maintained as regulation changes.' },
      { name: 'EHS incident logging', detail: 'Site incidents, near-misses and corrective actions recorded against the immutable audit log.' },
      { name: 'Batch recall readiness', detail: 'Reverse traceability from a customer complaint to every affected batch and the customers who received it.' },
    ],
  },
  {
    slug: 'retail', icon: ShoppingBag, name: 'Retail & Distribution',
    tagline: 'Every store, channel and warehouse on one stock ledger.',
    description:
      'Retail failures are almost always ledger failures. The storefront sells what the warehouse has already committed, tier-3 stores stop billing when connectivity drops, and nobody can say which SKU makes money in which store. One stock ledger, and offline that genuinely works, fixes most of it.',
    pains: ['Online and store inventory disagree', 'Billing stops when the internet drops', 'No view of margin by SKU per store'],
    outcomes: [
      { metric: '99.4%', label: 'stock accuracy across branches' },
      { metric: '2.1s', label: 'average checkout time' },
      { metric: '+23%', label: 'repeat purchase with loyalty' },
    ],
    products: ['nova-pos', 'nova-stock', 'nova-commerce', 'nova-loyalty'],
    workflow: [
      { stage: 'Assortment and pricing', detail: 'One catalog across storefront, store and marketplace, with price and promotion rules set centrally by channel.' },
      { stage: 'Replenishment', detail: 'Reorder thresholds per location, driven by actual sell-through rather than a monthly manual review.' },
      { stage: 'Selling', detail: 'Offline-first billing at the till. Sales are append-only facts, so a connectivity drop never blocks a queue.' },
      { stage: 'Fulfilment', detail: 'Ship from store or warehouse against the same committed-stock view, so the storefront cannot oversell.' },
      { stage: 'Returns', detail: 'Returns and exchanges reconcile back to the original transaction, including marketplace and cross-channel returns.' },
      { stage: 'Margin analysis', detail: 'Landed cost, markdown and shrinkage by SKU and location, available the next morning rather than at month end.' },
    ],
    compliance: [
      { name: 'PCI DSS scope reduction', detail: 'Card data never touches your systems — tokenised at the terminal, so the scope of your assessment stays small.' },
      { name: 'Statutory e-invoicing', detail: 'GST and VAT invoicing with sequential numbering that survives an offline period without duplicating.' },
      { name: 'Consumer returns law', detail: 'Return windows, refund timelines and receipt retention configured per market rather than hard-coded.' },
      { name: 'Weights and measures', detail: 'Certified scale integration with calibration records attached to the terminal for inspection.' },
    ],
  },
  {
    slug: 'fintech', icon: Landmark, name: 'Banking & Fintech',
    tagline: 'Regulated-grade software with the audit trail to prove it.',
    description:
      'In regulated finance, the software is only half the deliverable — the evidence is the other half. Access reviews run in spreadsheets across dozens of applications, reconciliation breaks surface weeks late, and every audit becomes a fire drill. The controls have to be defaults, not a project.',
    pains: ['Access reviews done in spreadsheets', 'Reconciliation breaks found weeks later', 'Every audit is a fire drill'],
    outcomes: [
      { metric: '100%', label: 'access reviews automated' },
      { metric: '92%', label: 'auto-reconciled transactions' },
      { metric: '0', label: 'critical audit findings, 3 years' },
    ],
    products: ['nova-id', 'nova-vault', 'nova-insight', 'nova-billing'],
    workflow: [
      { stage: 'Onboarding and KYC', detail: 'Identity, document and sanctions checks recorded with the evidence attached to the customer record permanently.' },
      { stage: 'Access provisioning', detail: 'SCIM from the directory into every application, so a leaver loses access everywhere within the sync window.' },
      { stage: 'Transaction processing', detail: 'Every state change writes actor, before, after and reason to an append-only log no role can delete.' },
      { stage: 'Reconciliation', detail: 'Automated matching with breaks raised the same day and routed to a named owner rather than a shared inbox.' },
      { stage: 'Certification', detail: 'Quarterly access certification generated from live entitlements, completed in days rather than weeks.' },
      { stage: 'Audit and evidence', detail: 'Auditor requests answered by export rather than by investigation — filtered by actor, entity or window.' },
    ],
    compliance: [
      { name: 'SOC 2 Type II', detail: 'Audited annually. Control evidence is generated by the platform rather than assembled before the audit.' },
      { name: 'PCI DSS alignment', detail: 'Tokenisation, key management and segregation designed to keep cardholder data out of scope.' },
      { name: 'Regulatory audit trail', detail: 'Immutable logs with configurable retention up to seven years, streamable to your SIEM.' },
      { name: 'AML and KYC retention', detail: 'Customer due-diligence records retained per jurisdiction with legal hold that survives deletion requests.' },
    ],
  },
  {
    slug: 'healthcare', icon: Stethoscope, name: 'Healthcare',
    tagline: 'Clinical, administrative and financial records in one chart.',
    description:
      'Hospitals rarely lack systems — they have registration in one, EMR in another, pharmacy in a third. Patients queue at three counters and claims get rejected for coding errors nobody sees until the money is late. Clinicians will only adopt what is faster than paper, which sets the bar for the whole build.',
    pains: ['Paper records slow down OPD', 'Claim rejections from coding errors', 'No single patient timeline'],
    outcomes: [
      { metric: '41%', label: 'shorter OPD wait times' },
      { metric: '−28%', label: 'claim rejection rate' },
      { metric: 'HIPAA', label: 'aligned audit logging' },
    ],
    products: ['nova-care-his', 'nova-clinic', 'nova-lis', 'nova-docs'],
    workflow: [
      { stage: 'Registration', detail: 'One patient identity across departments and visits, so the timeline follows the person rather than the counter.' },
      { stage: 'Consultation and orders', detail: 'Clinical notes and orders entered once, with the order reaching diagnostics and pharmacy without a paper chit.' },
      { stage: 'Diagnostics', detail: 'Integrated LIS results attach to the visit automatically, with abnormal values flagged to the ordering clinician.' },
      { stage: 'Pharmacy and billing', detail: 'Dispensing draws from the same item master as stores, so billing and stock cannot disagree.' },
      { stage: 'Claims', detail: 'Coding validated before submission, with rejection reasons fed back into the next claim rather than into a report.' },
      { stage: 'Records retention', detail: 'Scanned legacy records with OCR search, retained under the policy your regulator requires.' },
    ],
    compliance: [
      { name: 'HIPAA-aligned controls', detail: 'Access on a need-to-know basis, break-glass access logged with a required reason, and full disclosure accounting.' },
      { name: 'Clinical interoperability', detail: 'HL7 and FHIR interfaces for exchange with national health stacks and referring institutions.' },
      { name: 'Consent management', detail: 'Consent captured per purpose and withdrawable, with downstream processing honouring the withdrawal.' },
      { name: 'Medical record retention', detail: 'Retention schedules per record type and jurisdiction, with legal hold that overrides routine deletion.' },
    ],
  },
  {
    slug: 'edtech', icon: GraduationCap, name: 'Education',
    tagline: 'Admissions to alumni, without the parallel spreadsheets.',
    description:
      'Institutions run a student information system and then run a second, unofficial one in spreadsheets because the first cannot answer the questions administrators actually have. Fee collection, attendance and results end up in three places, and parents get none of it.',
    pains: ['Fee collection tracked outside the system', 'Attendance and results in separate tools', 'No visibility for parents'],
    outcomes: [
      { metric: '+34%', label: 'course completion rate' },
      { metric: '96%', label: 'fee collection on time' },
      { metric: '11k', label: 'concurrent live-class users' },
    ],
    products: ['nova-learn', 'nova-campus', 'nova-content'],
    workflow: [
      { stage: 'Admissions', detail: 'Application, document verification and offer tracked as one pipeline with a status the applicant can see.' },
      { stage: 'Enrolment and fees', detail: 'Fee schedules, instalments and concessions modelled properly, so collection never needs a parallel spreadsheet.' },
      { stage: 'Teaching and attendance', detail: 'Timetable, live classes and attendance in one record, including the students who joined remotely.' },
      { stage: 'Assessment', detail: 'Marks entry with moderation workflow and an audit trail on every change to a published grade.' },
      { stage: 'Results and transcripts', detail: 'Transcripts generated from the same data that produced the report card, with verification for third parties.' },
      { stage: 'Alumni', detail: 'The student record continues after graduation rather than being archived into a spreadsheet.' },
    ],
    compliance: [
      { name: 'Student data protection', detail: 'Purpose-limited processing with parental consent handling for minors, aligned to GDPR and equivalent local law.' },
      { name: 'Accessibility', detail: 'WCAG 2.2 AA across the student-facing surface, tested with keyboard and screen reader before each release.' },
      { name: 'Examination integrity', detail: 'Segregation of duties on marks entry and moderation, with every change attributable and reversible.' },
      { name: 'Statutory fee receipts', detail: 'Sequential receipting and statutory reporting formats maintained per education regulator.' },
    ],
  },
  {
    slug: 'logistics', icon: Truck, name: 'Logistics & Transport',
    tagline: 'Know where every consignment is — and what it costs.',
    description:
      'Operators can usually tell you where a consignment is. Far fewer can tell you what it cost to get there. Proof of delivery arrives days late, routes are planned by experience rather than data, and freight bills are reconciled by hand against contracts nobody has modelled.',
    pains: ['Proof of delivery arrives days late', 'Route planning done manually', 'Freight bills reconciled by hand'],
    outcomes: [
      { metric: '−19%', label: 'cost per delivered km' },
      { metric: '98.6%', label: 'on-time delivery' },
      { metric: 'Same day', label: 'ePOD availability' },
    ],
    products: ['nova-fleet', 'nova-freight', 'nova-wms', 'nova-fieldsales'],
    workflow: [
      { stage: 'Order capture', detail: 'Bookings from customers, marketplaces and field sales land in one queue with serviceability checked up front.' },
      { stage: 'Route and load planning', detail: 'Loads built against vehicle capacity and delivery windows rather than against the planner memory.' },
      { stage: 'Dispatch', detail: 'Driver app with the manifest, documentation and navigation, working offline through dead zones.' },
      { stage: 'In-transit tracking', detail: 'Carrier and telematics events on one timeline, with exceptions raised before the customer notices.' },
      { stage: 'Proof of delivery', detail: 'Signature, photograph and geotag captured at the door and available the same day, not at week end.' },
      { stage: 'Freight billing', detail: 'Contract rates modelled so carrier invoices are matched automatically and disputes are evidenced.' },
    ],
    compliance: [
      { name: 'E-way bill and transport documents', detail: 'Statutory transport documentation generated and reconciled against the consignment automatically.' },
      { name: 'Dangerous goods handling', detail: 'Classification, documentation and vehicle-compatibility checks enforced at booking rather than at the gate.' },
      { name: 'Driver hours and safety', detail: 'Duty-hour records and vehicle fitness certificates tracked with expiry alerting.' },
      { name: 'Customs documentation', detail: 'Commercial invoice and customs paperwork generated from the shipment, with landed-cost estimation.' },
    ],
  },
  {
    slug: 'construction', icon: HardHat, name: 'Construction & Real Estate',
    tagline: 'Project margin visible while the project is still running.',
    description:
      'On most projects the margin is known accurately exactly once — at handover, when it is too late to act. Vendor bills go through without a three-way match, variations are agreed verbally on site, and lease data lives in whichever spreadsheet the last analyst built.',
    pains: ['Cost overruns discovered at handover', 'Vendor bills without 3-way match', 'Lease and rent data scattered'],
    outcomes: [
      { metric: '−12%', label: 'project cost variance' },
      { metric: '3-way', label: 'match on every vendor bill' },
      { metric: '100%', label: 'lease renewals tracked' },
    ],
    products: ['nova-projects', 'nova-procure', 'nova-estate', 'nova-docs'],
    workflow: [
      { stage: 'Tender and estimation', detail: 'Estimates built from a rate library, so the budget and the winning bid share one set of assumptions.' },
      { stage: 'Budget and procurement', detail: 'Work packages issued against budget lines, with commitment tracked from purchase order rather than from invoice.' },
      { stage: 'Site execution', detail: 'Daily progress, labour and plant captured on site — including where there is no signal — against the same work packages.' },
      { stage: 'Progress billing', detail: 'Client billing and subcontractor certification from measured progress, with retention handled correctly.' },
      { stage: 'Cost variance', detail: 'Committed, incurred and forecast cost against budget, current this week rather than at the next steering meeting.' },
      { stage: 'Handover and facilities', detail: 'As-built documentation, warranties and asset register handed to the operator, not left in a shared drive.' },
    ],
    compliance: [
      { name: 'Project regulatory reporting', detail: 'RERA-style project registration and periodic reporting produced from live project data.' },
      { name: 'Site safety statutory records', detail: 'Inductions, permits to work, toolbox talks and incident reports retained against the immutable log.' },
      { name: 'Statutory retention and tax', detail: 'Retention money, withholding and tax on progress bills computed per contract and jurisdiction.' },
      { name: 'Lease accounting', detail: 'IFRS 16 lease classification and schedules generated from the lease record rather than maintained separately.' },
    ],
  },
  {
    slug: 'hospitality', icon: Hotel, name: 'Hospitality',
    tagline: 'Rooms, covers and guests managed from one console.',
    description:
      'A property can be full and still leaving money on the table if rates lag the market and rooms sit dirty an hour longer than they need to. The guest, meanwhile, is recognised as new at every touchpoint because the profile lives in four systems.',
    pains: ['Rates out of sync across OTAs', 'Housekeeping status on paper', 'No single guest history'],
    outcomes: [
      { metric: '+16%', label: 'RevPAR after rate automation' },
      { metric: '−22 min', label: 'room turnaround time' },
      { metric: '4.6★', label: 'average guest rating' },
    ],
    products: ['nova-stay', 'nova-resto', 'nova-loyalty'],
    workflow: [
      { stage: 'Rate and distribution', detail: 'Rates and availability pushed to every channel from one place, so an OTA can never sell a room twice.' },
      { stage: 'Reservation', detail: 'Direct, OTA and corporate bookings on one reservation record with the guest profile matched on arrival.' },
      { stage: 'Check-in', detail: 'Identity and registration captured digitally, with statutory guest reporting filed from the same record.' },
      { stage: 'In-stay service', detail: 'Housekeeping status live on the console, with restaurant and spa charges posting straight to the folio.' },
      { stage: 'Check-out and billing', detail: 'One folio across every outlet, split and settled by whatever combination the guest asks for.' },
      { stage: 'Guest history', detail: 'Preferences and stay history follow the guest across properties, so recognition is not a front-desk memory test.' },
    ],
    compliance: [
      { name: 'Guest registration reporting', detail: 'Statutory foreign-guest and local police reporting generated from check-in rather than re-keyed.' },
      { name: 'PCI DSS at the folio', detail: 'Card details tokenised on capture, so no outlet terminal holds cardholder data.' },
      { name: 'Food safety records', detail: 'HACCP-style temperature, batch and supplier records kept against the outlet for inspection.' },
      { name: 'Guest data protection', detail: 'Retention and erasure honoured across reservation, folio and loyalty rather than only in the CRM.' },
    ],
  },
  {
    slug: 'services', icon: Briefcase, name: 'Professional Services',
    tagline: 'Utilisation, billing and delivery finally in the same view.',
    description:
      'Firms sell time and rarely measure it well. Timesheets are chased at month end, project margin is unknown until close, and renewals slip because nobody owns the date. The data exists — it is just in three systems that disagree.',
    pains: ['Timesheets chased at month end', 'Project margin unknown until close', 'Renewals slip through'],
    outcomes: [
      { metric: '+9 pts', label: 'billable utilisation' },
      { metric: '−6 days', label: 'invoice cycle time' },
      { metric: '94%', label: 'renewal rate' },
    ],
    products: ['nova-projects', 'nova-crm', 'nova-people', 'nova-desk'],
    workflow: [
      { stage: 'Pipeline', detail: 'Opportunities carry the shape of the work, so resourcing sees what is coming before it is signed.' },
      { stage: 'Resourcing', detail: 'Staffing against real availability and skills, with bench and over-allocation visible in the same view.' },
      { stage: 'Delivery', detail: 'Project plan, tasks and client deliverables tracked where the time is booked, not in a separate tool.' },
      { stage: 'Timesheets', detail: 'Time captured daily with gentle enforcement, because a timesheet reconstructed at month end is fiction.' },
      { stage: 'Invoicing', detail: 'Fixed fee, time and materials or milestone billing generated from approved time and expense.' },
      { stage: 'Renewal', detail: 'Contract end dates owned by a named person with the margin history attached to the conversation.' },
    ],
    compliance: [
      { name: 'Revenue recognition', detail: 'IFRS 15 percentage-of-completion and milestone recognition derived from delivery data rather than journalled by hand.' },
      { name: 'Timesheet auditability', detail: 'Every edit to submitted time is attributable, with the original retained for audit and client dispute.' },
      { name: 'Client data segregation', detail: 'Per-client data residency and access boundaries, including for clients who require your staff to be geofenced.' },
      { name: 'SOC 2 for client data', detail: 'The controls your clients ask you to evidence, available as evidence you can export directly.' },
    ],
  },
];

/* Controls that apply everywhere, shown on the listing page so the per-industry
   sections can stay specific to that vertical rather than repeating the basics. */
export const complianceCoverage = [
  { name: 'ISO 27001:2022', detail: 'Certified information security management, audited annually against the full control set.' },
  { name: 'SOC 2 Type II', detail: 'Independently audited every year, with the report available under NDA before you sign.' },
  { name: 'GDPR', detail: 'Purpose limitation, subject access, erasure and processor terms implemented in the product rather than promised in a policy.' },
  { name: 'HIPAA alignment', detail: 'Access controls, disclosure accounting and break-glass logging for protected health information.' },
  { name: 'Data residency', detail: 'Cloud, private cloud, on-premise or hybrid — the same build, in the region or building your regulator requires.' },
  { name: 'Immutable audit log', detail: 'Actor, before, after and reason on every state change, exportable and streamable to your SIEM.' },
];

export const industryCount = industries.length;
export const getIndustry = (slug) => industries.find((i) => i.slug === slug);
