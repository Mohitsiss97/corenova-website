import { useMemo, useState } from 'react';
import {
  Check, ArrowRight, ArrowLeft, Loader2, AlertCircle, Clock, Video, ShieldCheck, CalendarDays,
} from 'lucide-react';

import PageHeader from '../components/PageHeader';
import {
  Button, Container, Section, Reveal, Badge, cx,
} from '../components/ui';
import useSeo from '../hooks/useSeo';

import { site, certifications } from '../data/site';
import { categories } from '../data/products';
import { services } from '../data/services';

const GOALS = [
  { value: 'product', label: 'See a product running', hint: 'A walkthrough of one of the 45, on your kind of data' },
  { value: 'custom', label: 'Discuss a custom build', hint: 'Bring the problem — we will scope an approach' },
  { value: 'team', label: 'Hire a dedicated team', hint: 'Roles, rates and how embedding works' },
  { value: 'migrate', label: 'Migrate off something', hint: 'Legacy .NET, an old ERP, or a system nobody maintains' },
];

const SIZES = ['Under 50', '50–200', '200–1,000', '1,000+'];
const TIMES = ['09:30', '11:00', '13:30', '15:00', '16:30'];

/** The next `count` weekdays, starting tomorrow. */
function nextWeekdays(count) {
  const out = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(new Date(d));
  }
  return out;
}

const fmtDay = (d) => d.toLocaleDateString('en-GB', { weekday: 'short' });
const fmtDate = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const fmtFull = (d) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

export default function Demo() {
  useSeo({
    title: 'Book a demo',
    description: 'A 30-minute walkthrough with a solutions engineer, not a sales script. Pick a slot and tell us what you want to see.',
  });

  const days = useMemo(() => nextWeekdays(6), []);

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle'); // idle | submitting | booked
  const [errors, setErrors] = useState({});
  const [v, setV] = useState({
    goal: '', interest: '', size: '',
    name: '', email: '', company: '', notes: '',
    day: null, time: '',
  });

  const set = (k, val) => setV((s) => ({ ...s, [k]: val }));

  const step1Valid = v.goal && v.size;
  const step2Valid = v.day !== null && v.time;

  const validateStep3 = () => {
    const e = {};
    if (!v.name.trim()) e.name = 'Tell us who to expect.';
    if (!v.email.trim()) e.email = 'We send the invite here.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'That does not look like a valid email.';
    if (!v.company.trim()) e.company = 'Which company are you with?';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validateStep3();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`demo-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setStatus('submitting');
    // No backend wired yet — this is where the booking POST goes.
    await new Promise((r) => setTimeout(r, 900));
    setStatus('booked');
  };

  /* ------------------------------------------------------------ confirmed */
  if (status === 'booked') {
    return (
      <>
        <PageHeader eyebrow="Booked" crumbs={[{ label: 'Book a demo' }]} title="You are booked in" align="center" />
        <Section>
          <Container>
            <div className="ring-gradient mx-auto max-w-lg rounded-3xl border border-line bg-surface p-10 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                <Check className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-2xl font-extrabold tracking-tight">
                {fmtFull(days[v.day])}, {v.time}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                A calendar invite with a video link is on its way to <strong className="text-fg">{v.email}</strong>.
                The engineer taking the call will have read your notes before joining.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
                <Button to="/case-studies" size="md" icon={ArrowRight}>Read a case study meanwhile</Button>
                <Button to="/products" size="md" variant="secondary">Browse the catalog</Button>
              </div>
            </div>
          </Container>
        </Section>
      </>
    );
  }

  const steps = ['What you need', 'Pick a slot', 'Your details'];

  return (
    <>
      <PageHeader
        eyebrow="Book a demo"
        crumbs={[{ label: 'Book a demo' }]}
        title="Thirty minutes with an engineer"
        lead="Not a slide deck and not an SDR. Tell us what you want to see, pick a time, and the person who joins will be someone who has built it."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="success" icon={Clock}>30 minutes</Badge>
          <Badge icon={Video}>Video call</Badge>
          <Badge icon={ShieldCheck}>NDA on request</Badge>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:gap-14">
            {/* ---------------------------------------------------- form */}
            <Reveal>
              <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
                {/* progress */}
                <ol className="flex items-center gap-2" aria-label="Booking steps">
                  {steps.map((label, i) => {
                    const n = i + 1;
                    const done = step > n;
                    const current = step === n;
                    return (
                      <li key={label} className="flex flex-1 items-center gap-2">
                        <span
                          aria-current={current ? 'step' : undefined}
                          className={cx(
                            'grid h-7 w-7 shrink-0 place-items-center rounded-full text-2xs font-bold transition-colors',
                            done && 'bg-success/15 text-success',
                            current && 'bg-brand-gradient text-white',
                            !done && !current && 'border border-line bg-surface-2 text-fg-subtle',
                          )}
                        >
                          {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : n}
                        </span>
                        <span className={cx('hidden text-xs font-semibold sm:block', current ? 'text-fg' : 'text-fg-subtle')}>
                          {label}
                        </span>
                        {n < steps.length && <span className="h-px flex-1 bg-line" aria-hidden="true" />}
                      </li>
                    );
                  })}
                </ol>

                {/* ------------------------------------------------ step 1 */}
                {step === 1 && (
                  <div className="mt-8">
                    <h2 className="font-display text-xl font-bold text-fg">What do you want out of the call?</h2>
                    <p className="mt-1.5 text-sm text-fg-muted">This decides who joins from our side.</p>

                    <fieldset className="mt-6">
                      <legend className="sr-only">Goal for the call</legend>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {GOALS.map((g) => (
                          <label
                            key={g.value}
                            className={cx(
                              'flex cursor-pointer flex-col rounded-xl border p-4 transition-colors',
                              v.goal === g.value
                                ? 'border-primary-500/50 bg-primary-500/10'
                                : 'border-line bg-surface-2 hover:border-line-strong',
                            )}
                          >
                            <span className="flex items-center gap-2.5">
                              <input
                                type="radio"
                                name="goal"
                                value={g.value}
                                checked={v.goal === g.value}
                                onChange={() => set('goal', g.value)}
                                className="h-3.5 w-3.5 cursor-pointer accent-primary-500"
                              />
                              <span className="text-sm font-semibold text-fg">{g.label}</span>
                            </span>
                            <span className="mt-1.5 pl-6 text-xs leading-snug text-fg-subtle">{g.hint}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="mt-6">
                      <label htmlFor="demo-interest" className="text-xs font-semibold text-fg">
                        Anything specific? <span className="font-normal text-fg-subtle">(optional)</span>
                      </label>
                      <select
                        id="demo-interest"
                        value={v.interest}
                        onChange={(e) => set('interest', e.target.value)}
                        className="mt-1.5 h-11 w-full cursor-pointer rounded-xl border border-line bg-surface px-3.5 text-sm text-fg outline-none focus:border-primary-500"
                      >
                        <option value="">No particular product or service</option>
                        <optgroup label="Products">
                          {categories.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                        </optgroup>
                        <optgroup label="Services">
                          {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                        </optgroup>
                      </select>
                    </div>

                    <fieldset className="mt-6">
                      <legend className="text-xs font-semibold text-fg">How many people would use it?</legend>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {SIZES.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => set('size', s)}
                            aria-pressed={v.size === s}
                            className={cx(
                              'cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-colors',
                              v.size === s
                                ? 'border-primary-500/40 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                                : 'border-line bg-surface-2 text-fg-muted hover:border-line-strong hover:text-fg',
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <Button
                      type="button"
                      size="lg"
                      className="mt-8"
                      icon={ArrowRight}
                      disabled={!step1Valid}
                      onClick={() => setStep(2)}
                    >
                      Pick a time
                    </Button>
                    {!step1Valid && (
                      <p className="mt-2.5 text-2xs text-fg-subtle">Choose a goal and a rough size to continue.</p>
                    )}
                  </div>
                )}

                {/* ------------------------------------------------ step 2 */}
                {step === 2 && (
                  <div className="mt-8">
                    <h2 className="font-display text-xl font-bold text-fg">Pick a slot</h2>
                    <p className="mt-1.5 text-sm text-fg-muted">
                      Times shown in {site.offices[0].tz}. We will adjust to your timezone on the invite.
                    </p>

                    <fieldset className="mt-6">
                      <legend className="text-xs font-semibold text-fg">Day</legend>
                      <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {days.map((d, i) => (
                          <button
                            key={d.toISOString()}
                            type="button"
                            onClick={() => set('day', i)}
                            aria-pressed={v.day === i}
                            className={cx(
                              'cursor-pointer rounded-xl border px-2 py-3 text-center transition-colors',
                              v.day === i
                                ? 'border-primary-500/50 bg-primary-500/10'
                                : 'border-line bg-surface-2 hover:border-line-strong',
                            )}
                          >
                            <span className="block text-2xs font-semibold uppercase tracking-wider text-fg-subtle">{fmtDay(d)}</span>
                            <span className="mt-0.5 block text-sm font-bold text-fg">{fmtDate(d)}</span>
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="mt-6">
                      <legend className="text-xs font-semibold text-fg">Time</legend>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {TIMES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            disabled={v.day === null}
                            onClick={() => set('time', t)}
                            aria-pressed={v.time === t}
                            className={cx(
                              'cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-semibold tnum transition-colors',
                              'disabled:cursor-not-allowed disabled:opacity-40',
                              v.time === t
                                ? 'border-primary-500/50 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                                : 'border-line bg-surface-2 text-fg-muted hover:border-line-strong hover:text-fg',
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {v.day === null && (
                        <p className="mt-2.5 text-2xs text-fg-subtle">Choose a day first.</p>
                      )}
                    </fieldset>

                    <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                      <Button type="button" variant="secondary" size="lg" icon={ArrowLeft} iconRight={false} onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="button" size="lg" icon={ArrowRight} disabled={!step2Valid} onClick={() => setStep(3)}>
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------ step 3 */}
                {step === 3 && (
                  <div className="mt-8">
                    <h2 className="font-display text-xl font-bold text-fg">Where do we send the invite?</h2>
                    <p className="mt-1.5 text-sm text-fg-muted">
                      {fmtFull(days[v.day])} at {v.time} — {site.offices[0].tz}
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      {[
                        { k: 'name', label: 'Your name', type: 'text', ac: 'name', ph: 'Priya Raghavan' },
                        { k: 'email', label: 'Work email', type: 'email', ac: 'email', ph: 'you@company.com' },
                        { k: 'company', label: 'Company', type: 'text', ac: 'organization', ph: 'Northwind Group' },
                      ].map((f) => (
                        <div key={f.k} className={cx('flex flex-col gap-1.5', f.k === 'company' && 'sm:col-span-2')}>
                          <label htmlFor={`demo-${f.k}`} className="text-xs font-semibold text-fg">
                            {f.label}<span className="ml-0.5 text-danger" aria-hidden="true">*</span>
                          </label>
                          <input
                            id={`demo-${f.k}`}
                            type={f.type}
                            autoComplete={f.ac}
                            value={v[f.k]}
                            onChange={(e) => set(f.k, e.target.value)}
                            onBlur={() => setErrors(validateStep3())}
                            aria-invalid={!!errors[f.k]}
                            placeholder={f.ph}
                            className={cx(
                              'h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle',
                              errors[f.k] ? 'border-danger' : 'border-line focus:border-primary-500',
                            )}
                          />
                          {errors[f.k] && (
                            <p role="alert" className="flex items-center gap-1.5 text-2xs font-medium text-danger">
                              <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                              {errors[f.k]}
                            </p>
                          )}
                        </div>
                      ))}

                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label htmlFor="demo-notes" className="text-xs font-semibold text-fg">
                          What should we prepare? <span className="font-normal text-fg-subtle">(optional)</span>
                        </label>
                        <textarea
                          id="demo-notes"
                          rows={4}
                          value={v.notes}
                          onChange={(e) => set('notes', e.target.value)}
                          placeholder="We run four warehouses on spreadsheets and want to see barcode picking with our SKU structure…"
                          className="w-full rounded-xl border border-line bg-surface p-3.5 text-sm leading-relaxed text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-primary-500"
                        />
                        <p className="text-2xs text-fg-subtle">
                          The more specific this is, the less of the call is spent on discovery.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                      <Button type="button" variant="secondary" size="lg" icon={ArrowLeft} iconRight={false} onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button type="submit" size="lg" disabled={status === 'submitting'}>
                        {status === 'submitting' ? (
                          <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Booking…</>
                        ) : 'Confirm booking'}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Reveal>

            {/* ---------------------------------------------------- sidebar */}
            <div className="space-y-4">
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <div className="flex items-center gap-2.5">
                    <CalendarDays className="h-4 w-4 text-primary-500" aria-hidden="true" />
                    <h2 className="font-display text-base font-bold text-fg">What happens on the call</h2>
                  </div>
                  <ol className="mt-5 space-y-4">
                    {[
                      ['5 min', 'You describe the process you are trying to fix. We ask questions rather than present.'],
                      ['20 min', 'We show the relevant product or approach against your kind of data — live, not a recording.'],
                      ['5 min', 'A straight answer on fit, rough effort and rough cost. Including "this is not for you" where that is true.'],
                    ].map(([time, text]) => (
                      <li key={text} className="flex gap-3">
                        <span className="shrink-0 rounded-md border border-line bg-surface-2 px-2 py-0.5 text-2xs font-bold text-fg-muted tnum">
                          {time}
                        </span>
                        <span className="text-xs leading-relaxed text-fg-muted">{text}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <h2 className="font-display text-base font-bold text-fg">No sales sequence</h2>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      'No follow-up drip unless you ask for one',
                      'No pricing gate before the demo',
                      'NDA signed before the call on request',
                      'A written summary within one working day',
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2 text-xs text-fg-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="ring-gradient rounded-2xl border border-line bg-surface-2 p-6">
                  <h2 className="font-display text-base font-bold text-fg">Would rather just email?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    Send the brief instead and an engineer replies within three working hours.
                  </p>
                  <Button to="/contact" variant="secondary" size="md" className="mt-4 w-full">Send a brief</Button>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4">
                    {certifications.slice(0, 4).map((c) => (
                      <span key={c} className="text-2xs font-semibold text-fg-subtle">{c}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
