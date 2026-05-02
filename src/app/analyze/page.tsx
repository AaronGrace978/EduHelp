"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, Sparkles, Lock, Brain } from "lucide-react";
import { StateToggle } from "@/components/analyze/StateToggle";
import { Dropzone } from "@/components/analyze/Dropzone";
import { ResultView } from "@/components/analyze/ResultView";
import {
  loadSettings,
  settingsToHeaders,
  hasAnyKey,
  type ClientAISettings,
} from "@/lib/client-settings";
import type {
  EligibilityResult,
  StateCode,
} from "@/lib/eligibility/types";

interface AnalyzeResponse {
  ok: true;
  result: EligibilityResult;
  ai: { provider: string | null; model: string | null };
  files: { name: string; size: number; type: string; chars: number }[];
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={<AnalyzePageFallback />}>
      <AnalyzePageInner />
    </Suspense>
  );
}

function AnalyzePageFallback() {
  return (
    <div className="container-page py-16">
      <div className="card mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading analyzer…
        </div>
      </div>
    </div>
  );
}

function AnalyzePageInner() {
  const params = useSearchParams();
  const initialState = (params.get("state") ?? "CO").toUpperCase() as StateCode;

  const [state, setState] = useState<StateCode>(
    initialState === "CA" ? "CA" : "CO",
  );
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [settings, setSettings] = useState<ClientAISettings | null>(null);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    setData(null);
    setError(null);
  }, [state]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (files.length === 0 && !notes.trim()) {
      setError(
        "Add at least one file, or paste some text into the parent notes box.",
      );
      return;
    }
    setLoading(true);
    setData(null);
    try {
      const fd = new FormData();
      fd.append("state", state);
      fd.append("notes", notes);
      for (const f of files) fd.append("files", f);
      const headers = settings ? settingsToHeaders(settings) : {};
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: fd,
        headers,
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json?.error ?? `Server returned ${res.status}.`);
      }
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="pill-brand">
          <Sparkles className="h-3.5 w-3.5" /> Eligibility analyzer
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Tell us about your child — get a full plain-English report.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Upload evaluations, doctor's letters, school reports, or test
          results. Pick your state. EduHelp does the rest.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <form
          onSubmit={onSubmit}
          className="card lg:col-span-5 lg:sticky lg:top-24 lg:self-start"
        >
          <h2 className="text-base font-semibold text-slate-900">
            1. Choose your state
          </h2>
          <div className="mt-3">
            <StateToggle value={state} onChange={setState} />
          </div>

          <h2 className="mt-6 text-base font-semibold text-slate-900">
            2. Upload documents
          </h2>
          <div className="mt-3">
            <Dropzone files={files} onFilesChange={setFiles} />
          </div>

          <h2 className="mt-6 text-base font-semibold text-slate-900">
            3. Anything else we should know?{" "}
            <span className="text-xs font-normal text-slate-500">
              (optional)
            </span>
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. teacher reports my daughter is reading 2 grades behind; pediatrician suspects ADHD; we already requested a 504 last year and it was denied."
            rows={5}
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-6 w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Analyzing…
              </>
            ) : (
              <>Generate report</>
            )}
          </button>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <p className="flex items-center gap-1.5">
              <Lock className="h-3 w-3" /> Files processed in-memory · never
              stored.
            </p>
            <Link
              href="/settings"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 font-medium hover:border-brand-300 hover:text-brand-700"
            >
              <Brain className="h-3 w-3" />
              {settings && hasAnyKey(settings)
                ? `AI: ${settings.provider === "auto" ? "auto" : settings.provider} configured`
                : "Configure AI provider"}
            </Link>
          </div>
        </form>

        <div className="lg:col-span-7">
          {!data && !loading && <EmptyHero state={state} />}
          {loading && <LoadingShimmer />}
          {data && <ResultView result={data.result} ai={data.ai} />}
        </div>
      </div>
    </div>
  );
}

function EmptyHero({ state }: { state: StateCode }) {
  const stateName = state === "CO" ? "Colorado" : "California";
  return (
    <div className="card border-dashed">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
        <Sparkles className="h-3.5 w-3.5" /> Ready when you are
      </div>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">
        Your {stateName} eligibility report will appear here.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        EduHelp will pull out scores like FSIQ, Reading Comprehension, BASC
        T-scores, and adaptive behavior; identify diagnoses; map them to the
        IDEA categories that {stateName} schools actually use; and tell you
        what to ask for at your next meeting.
      </p>

      <ul className="mt-5 space-y-3 text-sm text-slate-700">
        <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
            ?
          </span>
          <span>
            <strong className="text-slate-900">Don't have an evaluation yet?</strong>{" "}
            Use the Templates page to send the school a request — that triggers
            the 60-day evaluation timeline.
          </span>
        </li>
        <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
            i
          </span>
          <span>
            <strong className="text-slate-900">PDF is a scan?</strong> Run it
            through any free OCR tool first (e.g. Adobe Acrobat or
            macOS Preview &gt; Export As PDF with text) so EduHelp can read the
            scores.
          </span>
        </li>
      </ul>
    </div>
  );
}

function LoadingShimmer() {
  return (
    <div className="card">
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
        <Loader2 className="h-4 w-4 animate-spin" />
        Reading documents and running the rules engine…
      </div>
      <div className="mt-5 space-y-3">
        {[80, 70, 60].map((w) => (
          <div
            key={w}
            className="h-4 animate-pulse rounded-full bg-slate-200"
            style={{ width: `${w}%` }}
          />
        ))}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
