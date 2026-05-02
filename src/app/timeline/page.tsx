"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Sparkles, Download, Info } from "lucide-react";
import {
  STATE_NAMES,
  SUPPORTED_STATES,
  type StateCode,
} from "@/lib/eligibility/types";

interface Milestone {
  label: string;
  daysFromConsent: number;
  /** "school" days vs "calendar" days */
  unit: "school" | "calendar";
  description: string;
  citation: string;
}

const STATE_CITATIONS: Record<StateCode, string> = {
  CO: "Colorado ECEA Rules § 4.02",
  CA: "Cal. Ed. Code § 56344(a)",
  TX: "19 TAC § 89.1011(c)",
  NY: "8 NYCRR § 200.4",
  FL: "Rule 6A-6.0331, F.A.C.",
  IL: "23 IAC § 226.110(d)",
  MA: "603 CMR 28.04(1)(c)",
};

const COMMON_BASE: Milestone[] = [
  {
    label: "Submit written evaluation request",
    daysFromConsent: 0,
    unit: "calendar",
    description:
      "Day 0 — start the clock by emailing a written request to the principal AND special education director. Keep dated copies.",
    citation: "34 C.F.R. § 300.301",
  },
  {
    label: "School responds with consent forms (or refusal)",
    daysFromConsent: 15,
    unit: "calendar",
    description:
      "Schools must respond reasonably promptly — typically within 15 calendar days — with either an Assessment Plan / Consent or a Prior Written Notice of refusal.",
    citation: "34 C.F.R. § 300.503",
  },
];

const STATE_MILESTONES: Record<StateCode, Milestone[]> = {
  CO: [
    {
      label: "Evaluation complete + eligibility determination",
      daysFromConsent: 60,
      unit: "calendar",
      description:
        "From the date you sign consent, Colorado schools have 60 calendar days to complete the evaluation and convene the eligibility meeting.",
      citation: "Colorado ECEA Rules § 4.02(3)",
    },
    {
      label: "IEP in place (if eligible)",
      daysFromConsent: 90,
      unit: "calendar",
      description:
        "Once eligible, the IEP must be developed and implemented as soon as possible and no later than 30 calendar days after the eligibility determination.",
      citation: "34 C.F.R. § 300.323(c)",
    },
  ],
  CA: [
    {
      label: "Evaluation complete + IEP meeting held",
      daysFromConsent: 60,
      unit: "calendar",
      description:
        "California schools have 60 calendar days from receipt of the signed Assessment Plan to complete the assessment and hold the IEP meeting (excluding school breaks of 5+ days).",
      citation: "Cal. Ed. Code § 56344(a)",
    },
    {
      label: "Services begin",
      daysFromConsent: 75,
      unit: "calendar",
      description:
        "Services described in the IEP must begin as soon as possible after the IEP meeting, typically within 15 days of parent consent to the IEP.",
      citation: "34 C.F.R. § 300.323",
    },
  ],
  TX: [
    {
      label: "Evaluation complete (Full and Individual Evaluation report)",
      daysFromConsent: 45,
      unit: "school",
      description:
        "Texas requires the evaluation be completed within 45 school days of consent (with adjustments for holidays / breaks).",
      citation: "19 TAC § 89.1011(c)",
    },
    {
      label: "ARD committee meets to determine eligibility",
      daysFromConsent: 75,
      unit: "school",
      description:
        "An Admission, Review, and Dismissal (ARD) committee meeting must be held within 30 calendar days after the FIE report is completed.",
      citation: "19 TAC § 89.1011(d)",
    },
  ],
  NY: [
    {
      label: "Evaluation complete",
      daysFromConsent: 60,
      unit: "calendar",
      description:
        "The Committee on Special Education (CSE) has 60 calendar days from consent to evaluate.",
      citation: "8 NYCRR § 200.4(b)(7)",
    },
    {
      label: "CSE meeting + recommendation",
      daysFromConsent: 60,
      unit: "calendar",
      description:
        "The CSE must hold a meeting and provide its recommendation within 60 days of consent.",
      citation: "8 NYCRR § 200.4(c)",
    },
    {
      label: "Services begin",
      daysFromConsent: 90,
      unit: "calendar",
      description:
        "Recommended services must be implemented within 60 school days of receipt of consent or 30 school days of CSE recommendation, whichever is sooner.",
      citation: "8 NYCRR § 200.4(e)",
    },
  ],
  FL: [
    {
      label: "Evaluation complete + ESE eligibility staffing",
      daysFromConsent: 60,
      unit: "calendar",
      description:
        "Florida districts must complete the evaluation and hold an ESE eligibility staffing within 60 calendar days of consent.",
      citation: "Rule 6A-6.0331(3)(j), F.A.C.",
    },
    {
      label: "IEP in place",
      daysFromConsent: 90,
      unit: "calendar",
      description:
        "An IEP must be developed within 30 calendar days of the eligibility determination.",
      citation: "34 C.F.R. § 300.323(c)",
    },
  ],
  IL: [
    {
      label: "Evaluation complete + eligibility conference",
      daysFromConsent: 60,
      unit: "school",
      description:
        "Illinois requires evaluation and the eligibility conference to be completed within 60 school days of consent.",
      citation: "23 IAC § 226.110(d)",
    },
    {
      label: "IEP meeting (if eligible)",
      daysFromConsent: 60,
      unit: "school",
      description:
        "If eligible, the IEP must be developed within 30 days of eligibility determination.",
      citation: "23 IAC § 226.220(b)",
    },
  ],
  MA: [
    {
      label: "Eligibility determination + proposed IEP (if eligible)",
      daysFromConsent: 45,
      unit: "school",
      description:
        "Massachusetts requires the district, after receiving signed consent, to determine eligibility and, if the student is eligible, to propose an IEP and services within 45 school days.",
      citation: "603 CMR 28.04(1)(c)",
    },
    {
      label: "IEP implementation (after Team accepts)",
      daysFromConsent: 45,
      unit: "school",
      description:
        "Once the Team reaches agreement (including parent consent to the IEP), services should start without undue delay — confirm the start date in writing.",
      citation: "34 C.F.R. § 300.323(c); 603 CMR 28.06",
    },
  ],
};

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="container-page py-16">Loading…</div>}>
      <TimelineInner />
    </Suspense>
  );
}

function TimelineInner() {
  const today = new Date().toISOString().slice(0, 10);
  const [state, setState] = useState<StateCode>("CO");
  const [consentDate, setConsentDate] = useState<string>(today);

  const items = useMemo(() => {
    const base = new Date(consentDate || today);
    if (Number.isNaN(base.getTime())) return [] as (Milestone & { date: string })[];
    const milestones = [...COMMON_BASE, ...STATE_MILESTONES[state]];
    return milestones.map((m) => {
      const d = new Date(base);
      const days = m.unit === "school" ? Math.round(m.daysFromConsent * 1.4) : m.daysFromConsent;
      d.setDate(d.getDate() + days);
      return {
        ...m,
        date: d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    });
  }, [state, consentDate, today]);

  function downloadIcs() {
    const lines: string[] = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//EduHelp//Timeline//EN",
    ];
    for (const item of items) {
      const dt = new Date(item.date);
      const stamp = dt.toISOString().replace(/[-:]/g, "").slice(0, 8);
      lines.push(
        "BEGIN:VEVENT",
        `UID:${stamp}-${slugify(item.label)}@eduhelp`,
        `DTSTAMP:${stamp}T120000Z`,
        `DTSTART;VALUE=DATE:${stamp}`,
        `DTEND;VALUE=DATE:${stamp}`,
        `SUMMARY:EduHelp · ${item.label}`,
        `DESCRIPTION:${item.description.replace(/\n/g, " ")} (${item.citation})`,
        "END:VEVENT",
      );
    }
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eduhelp-${state}-timeline.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="pill-brand">
          <Sparkles className="h-3.5 w-3.5" /> IDEA evaluation timeline
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Track every deadline from consent to IEP.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Pick your state, enter the date you signed consent, and EduHelp
          calculates the federal and state deadlines the school must meet.
          Export to your calendar so nothing slips.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-12">
        <div className="card lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-base font-semibold text-slate-900">State</h2>
          <div className="mt-3">
            <label
              htmlFor="timeline-state"
              className="text-[10px] font-semibold uppercase tracking-wider text-slate-500"
            >
              State
            </label>
            <select
              id="timeline-state"
              value={state}
              onChange={(e) => setState(e.target.value as StateCode)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            >
              {SUPPORTED_STATES.map((code) => (
                <option key={code} value={code}>
                  {STATE_NAMES[code]} ({code})
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-slate-500">
              Uses {STATE_CITATIONS[state]} for {STATE_NAMES[state]} timelines.
            </p>
          </div>

          <h2 className="mt-6 text-base font-semibold text-slate-900">
            Date consent was signed
          </h2>
          <input
            type="date"
            value={consentDate}
            onChange={(e) => setConsentDate(e.target.value)}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Use the date the school received your signed consent form.
          </p>

          <button
            type="button"
            onClick={downloadIcs}
            className="btn-secondary mt-4 w-full text-xs"
          >
            <Download className="h-3.5 w-3.5" /> Download as calendar (.ics)
          </button>

          <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            <span>
              "School days" are converted at ~1.4× calendar days for planning.
              Verify the exact calendar with your district — holidays vary.
            </span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ol className="relative space-y-6 border-l-2 border-slate-200 pl-6">
            {items.map((item, idx) => (
              <li key={idx} className="relative">
                <span className="absolute -left-[33px] top-0 grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                  {idx + 1}
                </span>
                <div className="card">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                        Day {item.daysFromConsent} ({item.unit})
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-slate-900">
                        {item.label}
                      </h3>
                    </div>
                    <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700">
                      <Calendar className="mr-1 inline h-3 w-3" />
                      {item.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-400">
                    {item.citation}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 card border-dashed text-sm text-slate-700">
            <p>
              <strong>Need a starting letter?</strong>{" "}
              <Link className="text-brand-700 underline" href={`/templates?state=${state}`}>
                Generate a {STATE_NAMES[state]} evaluation request →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
