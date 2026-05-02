"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Brain,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  hasAnyKey,
  loadSettings,
  settingsToHeaders,
} from "@/lib/client-settings";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "eduhelp.assistant.v1";
const MAX_HISTORY = 30;

const SUGGESTED = [
  "What's the difference between an IEP and a 504?",
  "How long does the school have to evaluate after I sign consent?",
  "What is an IEE and when should I request one?",
  "What does FAPE mean?",
  "How do I file a state special-education complaint?",
  "What accommodations work well for ADHD?",
  "What's a manifestation determination meeting?",
];

/**
 * Floating "Ask EduHelp" assistant — mounted globally in layout.tsx.
 * Conversation history persists in localStorage; API keys come from /settings.
 */
export function Chatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  const [unread, setUnread] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load history + key state on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    setHasKey(hasAnyKey(loadSettings()));
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        if (Array.isArray(parsed)) setHistory(parsed.slice(-MAX_HISTORY));
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist history (capped).
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history.slice(-MAX_HISTORY)),
      );
    } catch {
      // quota / private mode
    }
  }, [history]);

  // Refresh key state when the panel opens (user may have just configured it).
  useEffect(() => {
    if (open) {
      setHasKey(hasAnyKey(loadSettings()));
      setUnread(false);
      // tiny delay so animation finishes before we autofocus
      const t = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Auto-scroll to bottom on new messages.
  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history, open, loading]);

  // Esc closes the panel.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
      if (!hasAnyKey(settings)) {
        throw new Error(
          "No AI key configured. Open /settings, paste a key, and try again.",
        );
      }
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...settingsToHeaders(settings),
        },
        body: JSON.stringify({ history: next, currentPath: pathname }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json?.error ?? `Server returned ${res.status}.`);
      }
      setHistory((h) => [...h, { role: "assistant", content: json.message }]);
      if (!open) setUnread(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat failed.");
    } finally {
      setLoading(false);
    }
  }

  function clearHistory() {
    if (
      typeof window !== "undefined" &&
      !window.confirm("Clear assistant chat history on this device?")
    )
      return;
    setHistory([]);
    setError(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200 print:hidden"
          aria-label="Open EduHelp assistant"
        >
          <span className="relative grid h-5 w-5 place-items-center">
            <MessageCircle className="h-4 w-4" />
            {unread && (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent-500 ring-2 ring-brand-600" />
            )}
          </span>
          <span className="hidden sm:inline">Ask EduHelp</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="EduHelp assistant"
          className="fixed inset-x-2 bottom-2 z-50 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[420px] print:hidden"
        >
          <div className="flex h-[600px] max-h-[85vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <header className="flex items-center justify-between gap-2 border-b border-slate-200 bg-gradient-to-br from-brand-50 via-white to-accent-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-slate-900">
                    EduHelp Assistant
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    IEP &amp; 504 questions · 7 states
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={clearHistory}
                    aria-label="Clear chat history"
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div
              ref={scroller}
              className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-4"
            >
              {history.length === 0 && (
                <>
                  <div className="rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-relaxed text-slate-700">
                    Hi! I&apos;m the EduHelp assistant. Ask me anything about
                    IEPs, 504 plans, eligibility, evaluations, accommodations,
                    or your rights as a parent. I know the rules for{" "}
                    <strong>CO, CA, TX, NY, FL, IL, and MA</strong>.
                  </div>
                  {!hasKey && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                      <strong className="block">AI provider required.</strong>
                      Add a key on{" "}
                      <a
                        href="/settings"
                        className="font-semibold text-amber-900 underline"
                      >
                        /settings
                      </a>{" "}
                      to unlock the chatbot. The deterministic eligibility
                      report on <a href="/analyze" className="underline">/analyze</a>{" "}
                      always works without a key.
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Try one of these
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {SUGGESTED.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => send(s)}
                          disabled={!hasKey || loading}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs leading-relaxed text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {history.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[88%] rounded-2xl bg-brand-600 px-3 py-2 text-sm text-white shadow-sm"
                      : "mr-auto max-w-[88%] rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm"
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
                <div className="mr-auto inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
                  <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
                </div>
              )}

              {error && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs leading-relaxed text-rose-700">
                  {error}
                </p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={
                  hasKey
                    ? "Ask anything…"
                    : "Add an AI key on /settings to chat"
                }
                disabled={loading || !hasKey}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:bg-slate-50 disabled:text-slate-400"
              />
              <button
                type="submit"
                disabled={loading || !draft.trim() || !hasKey}
                className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <p className="border-t border-slate-100 px-4 py-1.5 text-center text-[10px] text-slate-400">
              EduHelp is informational only — not legal advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
