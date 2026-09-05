import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Check, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { Button, Container, Section, SectionHeading, Reveal, RevealGroup, Badge, cx } from '../components/ui';
import { site } from '../data/site';
import { categories } from '../data/products';
import { services } from '../data/services';
import useSeo from '../hooks/useSeo';
import { offices, hq } from '../data/brand';

/** Distinct timezones across the offices, so the copy cannot drift from data. */
const timezoneCount = new Set(offices.map((o) => o.tz)).size;

const interests = [
  'Buying a product',
  'Custom development',
  'Hiring a dedicated team',
  'Support for an existing system',
  'Partnership',
  'Something else',
];

const budgets = ['Under $25k', '$25k – $75k', '$75k – $200k', '$200k+', 'Not decided yet'];

const initial = {
  name: '', email: '', company: '', phone: '',
  interest: '', product: '', budget: '', message: '',
};

/* Inline field validation, checked on blur — the pattern the UX rules recommend. */
function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Tell us who to reply to.';
  if (!values.email.trim()) errors.email = 'We need an email to respond.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = 'That does not look like a valid email.';
  if (!values.company.trim()) errors.company = 'Which company are you with?';
  if (!values.interest) errors.interest = 'Pick the closest option.';
  if (!values.message.trim()) errors.message = 'A sentence or two is enough.';
  else if (values.message.trim().length < 20) errors.message = 'A little more detail helps us route this properly.';
  return errors;
}

function Field({ label, htmlFor, error, hint, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-semibold text-fg">
        {label}
        {required && <span className="ml-0.5 text-danger" aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? (
        <p role="alert" className="flex items-center gap-1.5 text-2xs font-medium text-danger">
          <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-2xs text-fg-subtle">{hint}</p>
      ) : null}
    </div>
  );
}

const inputCls = (bad) =>
  cx(
    'h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-fg outline-none transition-colors',
    'placeholder:text-fg-subtle',
    bad ? 'border-danger focus:border-danger' : 'border-line focus:border-primary-500',
  );

export default function Contact() {
  useSeo({
    title: 'Contact',
    description: `Talk to an engineer, not an SDR. Average first response is 3 working hours. Offices in ${offices.map((o) => o.city).join(', ')}.`,
  });

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | sent

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate({ ...values }));
  };
  const errorFor = (k) => (touched[k] || status === 'error' ? errors[k] : undefined);

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(initial).map((k) => [k, true])));

    if (Object.keys(found).length > 0) {
      // Move focus to the first field with a problem.
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus('submitting');
    // No backend wired yet — this is where the enquiry POST goes.
    await new Promise((r) => setTimeout(r, 900));
    setStatus('sent');
  };

  if (status === 'sent') {
    return (
      <>
        <PageHeader eyebrow="Contact" crumbs={[{ label: 'Contact' }]} title="Message received" align="center" />
        <Section>
          <Container>
            <div className="ring-gradient mx-auto max-w-lg rounded-3xl border border-line bg-surface p-10 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                <Check className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-2xl font-extrabold tracking-tight">Thanks, {values.name.split(' ')[0]}.</h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Your enquiry is routed to the {values.interest.toLowerCase()} desk. Our average first response is
                3 working hours, and it comes from an engineer — not an SDR sequence.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
                <Button to="/case-studies" size="md" icon={ArrowRight}>Read a case study meanwhile</Button>
                <Button onClick={() => { setValues(initial); setTouched({}); setStatus('idle'); }} variant="secondary" size="md">
                  Send another message
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        crumbs={[{ label: 'Contact' }]}
        title="Talk to someone who has built this before"
        lead="No gatekeeping form-fill before a human replies. Tell us what you are working on and the right engineer answers — usually within 3 working hours."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="success">Avg first response: 3 hrs</Badge>
          <Badge>{offices.length} offices · {timezoneCount} timezones</Badge>
          <Badge>NDA on request</Badge>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:gap-14">
            {/* form */}
            <Reveal>
              <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-fg">Send us a brief</h2>
                <p className="mt-1.5 text-sm text-fg-muted">Fields marked * are required. Everything else helps us route faster.</p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" htmlFor="name" required error={errorFor('name')}>
                    <input
                      id="name" name="name" type="text" autoComplete="name"
                      value={values.name} onChange={set('name')} onBlur={blur('name')}
                      aria-invalid={!!errorFor('name')} placeholder="Priya Raghavan"
                      className={inputCls(!!errorFor('name'))}
                    />
                  </Field>

                  <Field label="Work email" htmlFor="email" required error={errorFor('email')}>
                    <input
                      id="email" name="email" type="email" autoComplete="email" inputMode="email"
                      value={values.email} onChange={set('email')} onBlur={blur('email')}
                      aria-invalid={!!errorFor('email')} placeholder="you@company.com"
                      className={inputCls(!!errorFor('email'))}
                    />
                  </Field>

                  <Field label="Company" htmlFor="company" required error={errorFor('company')}>
                    <input
                      id="company" name="company" type="text" autoComplete="organization"
                      value={values.company} onChange={set('company')} onBlur={blur('company')}
                      aria-invalid={!!errorFor('company')} placeholder="Northwind Group"
                      className={inputCls(!!errorFor('company'))}
                    />
                  </Field>

                  <Field label="Phone" htmlFor="phone" hint="Optional — useful if you prefer a call back.">
                    <input
                      id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel"
                      value={values.phone} onChange={set('phone')}
                      placeholder="+91 98765 43210"
                      className={inputCls(false)}
                    />
                  </Field>

                  <Field label="What brings you here" htmlFor="interest" required error={errorFor('interest')}>
                    <select
                      id="interest" name="interest"
                      value={values.interest} onChange={set('interest')} onBlur={blur('interest')}
                      aria-invalid={!!errorFor('interest')}
                      className={cx(inputCls(!!errorFor('interest')), 'cursor-pointer')}
                    >
                      <option value="">Select one…</option>
                      {interests.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </Field>

                  <Field label="Area of interest" htmlFor="product" hint="Optional — helps us bring the right specialist.">
                    <select
                      id="product" name="product" value={values.product} onChange={set('product')}
                      className={cx(inputCls(false), 'cursor-pointer')}
                    >
                      <option value="">No particular one</option>
                      <optgroup label="Products">
                        {categories.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                      </optgroup>
                      <optgroup label="Services">
                        {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                      </optgroup>
                    </select>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Indicative budget" htmlFor="budget" hint="Optional. It only changes what we propose, never whether we reply.">
                      <div className="flex flex-wrap gap-2">
                        {budgets.map((b) => (
                          <button
                            key={b} type="button"
                            onClick={() => setValues((v) => ({ ...v, budget: v.budget === b ? '' : b }))}
                            aria-pressed={values.budget === b}
                            className={cx(
                              'cursor-pointer rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors',
                              values.budget === b
                                ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                                : 'border-line bg-surface-2 text-fg-muted hover:border-line-strong hover:text-fg',
                            )}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                      <input id="budget" type="hidden" value={values.budget} readOnly />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field
                      label="What are you trying to fix?"
                      htmlFor="message"
                      required
                      error={errorFor('message')}
                      hint="The current process, what breaks, and what good would look like."
                    >
                      <textarea
                        id="message" name="message" rows={5}
                        value={values.message} onChange={set('message')} onBlur={blur('message')}
                        aria-invalid={!!errorFor('message')}
                        placeholder="We run four warehouses on spreadsheets and stock accuracy is around 84%. We need barcode picking and one live stock view before the next peak season…"
                        className={cx(
                          'w-full rounded-xl border bg-surface p-3.5 text-sm leading-relaxed text-fg outline-none transition-colors placeholder:text-fg-subtle',
                          errorFor('message') ? 'border-danger' : 'border-line focus:border-primary-500',
                        )}
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" disabled={status === 'submitting'} className="sm:w-auto">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : 'Send enquiry'}
                  </Button>
                  <p className="text-2xs leading-relaxed text-fg-subtle sm:max-w-xs">
                    We reply from a named engineer. No sales sequence, no newsletter signup unless you ask.
                  </p>
                </div>
              </form>
            </Reveal>

            {/* sidebar */}
            <div className="space-y-4">
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <h2 className="font-display text-base font-bold text-fg">Reach us directly</h2>
                  <ul className="mt-4 space-y-3.5 text-sm">
                    <li>
                      <a href={`mailto:${site.sales}`} className="group flex items-start gap-3 text-fg-muted transition-colors hover:text-fg">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                        <span>
                          <span className="block text-2xs font-bold uppercase tracking-wider text-fg-subtle">Sales</span>
                          {site.sales}
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${site.email}`} className="group flex items-start gap-3 text-fg-muted transition-colors hover:text-fg">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                        <span>
                          <span className="block text-2xs font-bold uppercase tracking-wider text-fg-subtle">General</span>
                          {site.email}
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-start gap-3 text-fg-muted transition-colors hover:text-fg">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                        <span>
                          <span className="block text-2xs font-bold uppercase tracking-wider text-fg-subtle">India</span>
                          {site.phone}
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href={`tel:${site.phoneAlt.replace(/[\s()]/g, '')}`} className="flex items-start gap-3 text-fg-muted transition-colors hover:text-fg">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                        <span>
                          <span className="block text-2xs font-bold uppercase tracking-wider text-fg-subtle">Americas</span>
                          {site.phoneAlt}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="ring-gradient rounded-2xl border border-line bg-surface-2 p-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary-500" aria-hidden="true" />
                    <h2 className="font-display text-base font-bold text-fg">Prefer to skip the form?</h2>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                    Book a 30-minute slot directly with a solutions engineer. Bring your current process — we will tell you
                    on the call whether we are a fit.
                  </p>
                  <Button to="/demo" size="md" className="mt-5 w-full" icon={ArrowRight}>Book a slot</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* offices */}
      <Section className="border-t border-line bg-surface/50">
        <Container>
          <SectionHeading
            eyebrow="Where we are"
            title={`${offices.length} offices, ${timezoneCount} timezones`}
            lead={`Headquartered in ${hq.city}, with delivery teams in the region you operate in. Visitors are welcome — tell us a day ahead.`}
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
            {site.offices.map((o) => (
              <div key={o.city} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-center justify-between gap-2">
                  <MapPin className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  <Badge tone={o.label === 'HQ' ? 'primary' : 'neutral'}>{o.label}</Badge>
                </div>
                <h3 className="mt-4 font-display text-[17px] font-bold text-fg">{o.city}</h3>
                <p className="text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{o.country}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{o.address}</p>
                <p className="mt-auto pt-4 text-2xs text-fg-subtle">{o.tz}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
