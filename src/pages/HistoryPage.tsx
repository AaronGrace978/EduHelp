import { ExternalLink, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { openExternal } from "@/lib/openExternal";
import { formatDate } from "@/lib/utils";
import type { HistoryKind } from "@/types";

const LABELS: Record<HistoryKind, string> = {
  college: "College",
  powerfaids: "PowerFAIDS",
  disability: "Disability",
  books: "Books",
  rmp: "RMP",
  general: "General",
};

export function HistoryPage() {
  const { state, clearHistory } = useApp();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Activity</p>
          <h1 className="display-title mt-2">Histories</h1>
          <p className="mt-3 max-w-2xl text-ink-500">
            Everything you lock in — campus picks, aid lines, DSS drafts, book
            orders, and professor notes — lives in one timeline.
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={clearHistory}
          disabled={state.history.length === 0}
        >
          <Trash2 className="h-4 w-4" />
          Clear history
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {state.history.length === 0 && (
          <p className="text-sm text-ink-500">
            History is empty. Select a college or use a tool to start logging.
          </p>
        )}
        {state.history.map((entry) => (
          <article
            key={entry.id}
            className="rounded-2xl border border-ink-200/80 bg-white/75 px-4 py-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-pine-600">
                  {LABELS[entry.kind]}
                  {entry.collegeName ? ` · ${entry.collegeName}` : ""}
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold text-ink-950">
                  {entry.title}
                </h2>
                {entry.detail && (
                  <p className="mt-1 text-sm text-ink-500">{entry.detail}</p>
                )}
                <p className="mt-2 text-xs text-ink-400">
                  {formatDate(entry.createdAt)}
                </p>
              </div>
              {entry.url && (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => openExternal(entry.url!)}
                >
                  Open
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
