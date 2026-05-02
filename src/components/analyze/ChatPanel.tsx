"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Loader2, MessageCircle, Send } from "lucide-react";
import { loadSettings, settingsToHeaders, hasAnyKey } from "@/lib/client-settings";
import type { StateCode } from "@/lib/eligibility/types";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "Did the evaluator test for dyslexia?",
  "What does FSIQ {fsiq} mean for my child?",
  "Were there any 'clinically significant' BASC scores?",
  "Does the report rule out language as the cause?",
  "Which IDEA category does this evaluation best support?",
];

export function ChatPanel({
  state,
  excerpt,
  reportSummary,
  hint,
}: {
  state: StateCode;
  excerpt: string;
  reportSummary?: string;
  hint?: string;
}) {
  const [history, setHistory] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasKey(hasAnyKey(loadSettings()));
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  async function send(prompt?: string) {
    const text = (prompt ?? draft).trim();
    if (!text || loading) return;
    setError(null);
    const next: Msg[] = [...history, { role: "user", content: text }];
    setHistory(next);
    setDraft("");
    setLoading(true);
    try {
      const settings = loadSettings();
      const headers = {
        "Content-Type": "application/json",
        ...settingsToHeaders(settings),
      };
      const res = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          state,
          documentExcerpt: excerpt,
          reportSummary,
          history: next,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json?.error ?? `Server returned ${res.status}.`);
      }
      setHistory((h) => [...h, { role: "assistant", content: json.message }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-brand-600" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Ask the document
          </h3>
        </div>
        {!hasKey && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
            AI provider required
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Follow-up questions about the eval / IEP / letter you uploaded.
        Answers come only from the document text — never invented.
      </p>

      {!hasKey ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          Configure an AI provider on{" "}
          <a className="font-semibold underline" href="/settings">
            /settings
          </a>{" "}
          to enable document Q&amp;A. The deterministic eligibility report
          above always works without a key.
        </div>
      ) : (
        <>
          <div
            ref={scroller}
            className="mt-4 max-h-80 space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3"
          >
            {history.length === 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Try one of these
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(hint ? s.replace("{fsiq}", hint) : s)}
                      className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 transition hover:border-brand-300 hover:bg-brand-50"
                    >
                      {hint ? s.replace("{fsiq}", hint) : s.replace(" {fsiq}", "")}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {history.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl bg-brand-600 px-3 py-2 text-sm text-white"
                    : "mr-auto max-w-[85%] rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                }
              >
                {m.role === "assistant" && (
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-700">
                    <Brain className="h-3 w-3" /> EduHelp
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mr-auto inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
              </div>
            )}
          </div>

          {error && (
            <p className="mt-2 text-xs text-rose-600">{error}</p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="mt-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask anything about this document…"
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
            <button
              type="submit"
              disabled={loading || !draft.trim()}
              className="btn-primary px-3 py-2 text-xs"
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </>
      )}
    </section>
  );
}
