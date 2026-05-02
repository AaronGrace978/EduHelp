import Link from "next/link";
import {
  ArrowRight,
  FileSearch,
  Sparkles,
  ShieldCheck,
  ScrollText,
  Brain,
  Compass,
  CheckCircle2,
  MapPin,
} from "lucide-react";
// State-specific homepage cards are inlined below; old StateCard helper retired.

const FEATURES = [
  {
    icon: FileSearch,
    title: "Upload, get answers",
    body: "Drop in evaluations, doctor's letters, IEP / 504 reports, or test summaries. EduHelp pulls out scores, diagnoses, and the exact language schools care about.",
  },
  {
    icon: Brain,
    title: "Trained on real eligibility rules",
    body: "Built-in rules engine maps documents to the 13 IDEA categories using Colorado's ECEA and California's 5 CCR § 3030 — with citations for every finding.",
  },
  {
    icon: Sparkles,
    title: "Choose your AI",
    body: "Optionally add an OpenAI, Anthropic, OpenRouter, or Ollama Cloud key for plain-English narratives. Without one, EduHelp still gives you a full deterministic report.",
  },
  {
    icon: ScrollText,
    title: "Letters that actually get answered",
    body: "Ready-to-send letters for evaluation requests, IEE requests, prior written notice, and 504 plan asks — citing the right Colorado and California statutes.",
  },
  {
    icon: Compass,
    title: "Six states, one tool",
    body: "Colorado, California, Texas, New York, Florida, and Illinois rule sets — plus state-specific timeline calculator, escalation letters, and parent center directories.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-first",
    body: "Documents are processed in-memory on your own server. Nothing is stored, indexed, or shared. Bring your own AI key and you stay in control.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Pick your state",
    body: "Colorado or California — EduHelp uses the right rules and citations.",
  },
  {
    n: "02",
    title: "Upload documents",
    body: "Evaluations, doctor's notes, school records, or text snippets. PDFs and text files supported.",
  },
  {
    n: "03",
    title: "Read your report",
    body: "See likely IEP categories, 504 fit, evidence pulled from the document, and the exact next steps.",
  },
  {
    n: "04",
    title: "Send the letter",
    body: "Generate a parent-rights letter that requests evaluation, accommodations, or a meeting — with citations the school will recognize.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-grid-soft [background-size:32px_32px]">
      <section className="relative overflow-hidden bg-hero-radial">
        <div className="container-page relative pb-20 pt-16 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="pill-brand">
                <Sparkles className="h-3.5 w-3.5" /> AI-powered IEP &amp; 504 navigator
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Know what your child is{" "}
                <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
                  actually eligible for
                </span>{" "}
                — in plain English.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                EduHelp reads your child's evaluations, IQ tests, medical
                records, and school reports — then tells you which special
                education categories, IEP services, or 504 accommodations they
                may qualify for under <strong>Colorado</strong>,{" "}
                <strong>California</strong>, <strong>Texas</strong>,{" "}
                <strong>New York</strong>, <strong>Florida</strong>, and{" "}
                <strong>Illinois</strong> law.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/analyze" className="btn-primary">
                  Analyze documents <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/templates" className="btn-secondary">
                  Get a request letter
                </Link>
              </div>
              <ul className="mt-8 grid max-w-xl grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
                {[
                  "13 IDEA categories · 6 state rule sets",
                  "OCR for scanned PDFs / phone photos",
                  "Ask-the-document chat & SMART goal review",
                  "Escalation kit: IEE, mediation, OCR, due process",
                  "Bring your own AI · always free, open source",
                  "Spanish report output toggle",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <HeroCard />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="pill-accent">Built for families</span>
          <h2 className="section-title mt-4">
            What used to take 20 hours of research takes 5 minutes.
          </h2>
          <p className="section-subtitle mx-auto">
            EduHelp gives parents, caregivers, and advocates the same
            interpretation a seasoned special-ed advocate would give — without
            the $250/hour invoice.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="pill-brand">How it works</span>
              <h2 className="section-title mt-4">
                Four steps from confused to confident.
              </h2>
              <p className="section-subtitle">
                EduHelp doesn't replace your IEP team — it makes sure you walk
                into that meeting knowing exactly what to ask for.
              </p>
              <Link href="/analyze" className="btn-primary mt-6">
                Try it now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {STEPS.map(({ n, title, body }) => (
                <li key={n} className="card">
                  <div className="text-xs font-semibold tracking-widest text-brand-600">
                    STEP {n}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="pill-brand">Six states · more on the way</span>
          <h2 className="section-title mt-4">
            State rules and timelines, baked in.
          </h2>
          <p className="section-subtitle mx-auto">
            Citations to the actual administrative code your district has to
            follow — in every finding, every letter, every deadline.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { code: "CO", title: "Colorado", cite: "1 CCR 301-8 § 2.08" },
            { code: "CA", title: "California", cite: "5 CCR § 3030" },
            { code: "TX", title: "Texas", cite: "19 TAC § 89.1040" },
            { code: "NY", title: "New York", cite: "8 NYCRR § 200.1(zz)" },
            { code: "FL", title: "Florida", cite: "Rule 6A-6.030xx" },
            { code: "IL", title: "Illinois", cite: "23 IAC § 226.75" },
          ].map((s) => (
            <Link
              key={s.code}
              href={`/analyze?state=${s.code}`}
              className="group card transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-base font-bold text-white shadow-soft">
                  {s.code}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-700">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500">{s.cite}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-accent-50 p-10 shadow-soft sm:p-14">
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                Ready to find out what your child qualifies for?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Free, no account required. Your documents stay on your machine.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Link href="/analyze" className="btn-primary">
                Start an analysis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/resources" className="btn-secondary">
                Browse state resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/40 via-white to-accent-200/40 blur-2xl" />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="pill">
            <span className="h-2 w-2 rounded-full bg-accent-500" />
            Sample report · Colorado
          </span>
          <span className="pill">
            <Brain className="h-3.5 w-3.5" /> Claude Sonnet 4.6
          </span>
        </div>
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Likely category
            </p>
            <p className="mt-1 text-base font-semibold text-slate-900">
              Specific Learning Disability — Reading (SLD)
            </p>
            <p className="mt-2 text-sm text-slate-600">
              FSIQ 104, Reading Comprehension 78. Pattern of strengths &amp;
              weaknesses consistent with dyslexia under CO ECEA 2.08(8).
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="pill-accent">Likely · 78%</span>
              <span className="pill">FSIQ 104</span>
              <span className="pill">Reading 78</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Backup pathway
            </p>
            <p className="mt-1 text-base font-semibold text-slate-900">
              Section 504 Plan
            </p>
            <p className="mt-2 text-sm text-slate-600">
              If the IEP team declines, request a 504 plan for accommodations
              (extended time, audiobooks, decoding supports).
            </p>
          </div>
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-brand-700" />
              <div>
                <p className="text-sm font-semibold text-brand-900">
                  Next step for you
                </p>
                <p className="mt-1 text-sm text-brand-900/80">
                  Send the school a written evaluation request — EduHelp can
                  generate one in your name in 30 seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

