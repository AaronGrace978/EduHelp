"use client";

import {
  AlertTriangle,
  BookMarked,
  CheckCircle2,
  ClipboardList,
  FileText,
  Sparkles,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type {
  EligibilityFinding,
  EligibilityResult,
  Likelihood,
} from "@/lib/eligibility/types";

interface Props {
  result: EligibilityResult;
  ai: { provider: string | null; model: string | null };
}

const LIKELIHOOD_STYLES: Record<Likelihood, string> = {
  Likely: "bg-accent-100 text-accent-800 border-accent-200",
  Possible: "bg-amber-100 text-amber-800 border-amber-200",
  Unlikely: "bg-slate-100 text-slate-700 border-slate-200",
  "Insufficient data": "bg-slate-100 text-slate-600 border-slate-200",
};

export function ResultView({ result, ai }: Props) {
  const stateName = result.state === "CO" ? "Colorado" : "California";

  return (
    <div className="space-y-6">
      <div className="card border-brand-200 bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                EduHelp Summary · {stateName}
              </p>
              <p className="text-sm text-slate-700">
                {result.findings.length} potential pathway
                {result.findings.length === 1 ? "" : "s"} identified
              </p>
            </div>
          </div>
          {ai.provider ? (
            <span className="pill">
              <Brain className="h-3.5 w-3.5" />
              {ai.provider} · {ai.model}
            </span>
          ) : (
            <span className="pill">Rules engine only</span>
          )}
        </div>
        <p
          className="mt-4 text-base leading-relaxed text-slate-800"
          dangerouslySetInnerHTML={{
            __html: renderInlineMarkdown(result.summary),
          }}
        />
      </div>

      {result.aiNarrative && (
        <div className="card">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-brand-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              AI narrative
            </h3>
          </div>
          <div className="prose-eligibility mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
            {result.aiNarrative}
          </div>
        </div>
      )}

      <section>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <ClipboardList className="h-5 w-5 text-brand-600" />
          Eligibility findings
        </h3>
        <div className="grid gap-4">
          {result.findings.length === 0 && (
            <div className="card border-amber-200 bg-amber-50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700" />
                <div>
                  <p className="font-semibold text-amber-900">
                    Not enough specific evaluation data yet.
                  </p>
                  <p className="mt-1 text-sm text-amber-900/80">
                    The most useful next step is to send a written request for
                    a full special education evaluation. The Templates tab has
                    a ready-to-send letter for {stateName}.
                  </p>
                </div>
              </div>
            </div>
          )}
          {result.findings.map((f) => (
            <FindingCard key={f.category.code + f.category.program} finding={f} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
            <BookMarked className="h-4 w-4" /> Recommended actions
          </h3>
          <ol className="mt-3 space-y-2">
            {result.recommendedActions.map((step, i) => (
              <li
                key={`${i}-${step}`}
                className="flex gap-3 text-sm leading-relaxed text-slate-700"
              >
                <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="card">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
            <FileText className="h-4 w-4" /> Extracted from your documents
          </h3>
          <div className="mt-3 space-y-4">
            <ExtractedBlock
              label="Standardized scores"
              items={result.extractedScores.map(
                (s) =>
                  `${s.label}: ${s.value}${
                    s.qualitativeBand ? ` (${s.qualitativeBand})` : ""
                  }`,
              )}
            />
            <ExtractedBlock
              label="Diagnoses & conditions"
              items={result.extractedConditions}
            />
            <ExtractedBlock
              label="Tests & instruments"
              items={result.extractedInstruments}
            />
            {result.childAgeYears !== undefined && (
              <ExtractedBlock
                label="Child age"
                items={[`${result.childAgeYears} years`]}
              />
            )}
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-slate-500" />
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Important reminders
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {result.disclaimers.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function FindingCard({ finding }: { finding: EligibilityFinding }) {
  return (
    <div className="card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            {finding.category.program === "IEP"
              ? "IEP category"
              : "504 Plan pathway"}{" "}
            · {finding.category.code}
          </p>
          <h4 className="mt-1 text-lg font-semibold text-slate-900">
            {finding.category.name}
          </h4>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-semibold",
              LIKELIHOOD_STYLES[finding.likelihood],
            )}
          >
            {finding.likelihood} · {finding.confidence}%
          </span>
          <span className="text-[11px] text-slate-400">
            {finding.category.citation}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {finding.category.description}
      </p>

      {finding.rationale.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Why we flagged this
          </p>
          <ul className="mt-2 space-y-2">
            {finding.rationale.map((r) => (
              <li
                key={r}
                className="flex items-start gap-2 text-sm leading-relaxed text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {finding.evidence.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Evidence found
          </p>
          <ul className="mt-2 space-y-1.5">
            {finding.evidence.map((e) => (
              <li
                key={e}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs italic text-slate-600"
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          What to do next
        </p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
          {finding.nextSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ExtractedBlock({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      {items.length === 0 ? (
        <p className="mt-1 text-sm italic text-slate-400">None detected.</p>
      ) : (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {items.map((it) => (
            <span key={it} className="pill">
              {it}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function renderInlineMarkdown(s: string): string {
  const escaped = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
