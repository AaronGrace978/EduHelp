"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Sparkles, Target, Brain } from "lucide-react";
import { StateToggle } from "@/components/analyze/StateToggle";
import {
  loadSettings,
  settingsToHeaders,
  hasAnyKey,
  type ClientAISettings,
} from "@/lib/client-settings";
import type { StateCode } from "@/lib/eligibility/types";

const SAMPLE = `Reading: By the end of the IEP year, given grade-level text, [Student] will improve reading comprehension.

Math: [Student] will work on math facts and improve calculation accuracy.

Behavior: [Student] will reduce disruptive classroom behaviors.`;

export default function GoalsPage() {
  const [state, setState] = useState<StateCode>("CO");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<ClientAISettings | null>(null);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setReview(null);
    if (!goals.trim()) {
      setError("Paste at least one goal to review.");
      return;
    }
    if (!settings || !hasAnyKey(settings)) {
      setError(
        "An AI provider is required for goal review. Add a key on /settings.",
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...settingsToHeaders(settings) },
        body: JSON.stringify({ goals, state }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json?.error ?? `Server returned ${res.status}.`);
      }
      setReview(json.review);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="pill-brand">
          <Sparkles className="h-3.5 w-3.5" /> IEP goal SMART review
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Are these goals actually measurable?
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Paste one or more IEP goals from your child's plan. EduHelp will
          score each on the SMART rubric (Specific, Measurable, Attainable,
          Relevant, Time-bound) and suggest a stronger rewrite.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-12">
        <form onSubmit={onSubmit} className="card lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-base font-semibold text-slate-900">State</h2>
          <div className="mt-3">
            <StateToggle value={state} onChange={setState} />
          </div>

          <h2 className="mt-6 text-base font-semibold text-slate-900">
            Paste your goals
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            One goal per paragraph is best. Include current goal, baseline,
            and target if you have them.
          </p>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            rows={14}
            placeholder={SAMPLE}
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-xs leading-relaxed text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />

          {error && (
            <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary mt-4 w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Reviewing…
              </>
            ) : (
              <>
                <Target className="h-4 w-4" /> Review goals
              </>
            )}
          </button>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Brain className="h-3 w-3" /> Uses your AI provider
            </span>
            <Link href="/settings" className="font-semibold text-brand-700 hover:underline">
              Configure →
            </Link>
          </div>
        </form>

        <div className="lg:col-span-7">
          {!review && !loading && (
            <div className="card border-dashed">
              <h3 className="text-base font-semibold text-slate-900">
                What you'll get back
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <strong className="block text-slate-900">SMART grade per goal</strong>
                  <span className="text-xs text-slate-600">
                    A 5-column ✓/✗ table for Specific, Measurable, Attainable, Relevant, Time-bound.
                  </span>
                </li>
                <li className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <strong className="block text-slate-900">A 1-sentence diagnosis</strong>
                  <span className="text-xs text-slate-600">
                    What's the weakest link — usually "no baseline" or "no metric".
                  </span>
                </li>
                <li className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <strong className="block text-slate-900">A suggested rewrite</strong>
                  <span className="text-xs text-slate-600">
                    A proper SMART version you can paste into the next IEP draft.
                  </span>
                </li>
              </ul>
            </div>
          )}
          {loading && (
            <div className="card">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                <Loader2 className="h-4 w-4 animate-spin" /> Reviewing goals…
              </div>
            </div>
          )}
          {review && (
            <article className="card">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                <Target className="h-4 w-4" /> SMART review
              </h3>
              <div className="prose-eligibility mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                {review}
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
