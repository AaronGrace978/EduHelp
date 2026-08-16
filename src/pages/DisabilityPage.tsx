import { type FormEvent, useMemo, useState } from "react";
import { Copy, Save } from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  buildAccommodationLetter,
  COLLEGE_ACCOMMODATION_PACKS,
  matchAccommodationPacks,
} from "@/lib/disability";
import { cn } from "@/lib/utils";

export function DisabilityPage() {
  const { state, addDisabilityRequest, updateDisabilityRequest } = useApp();
  const [studentName, setStudentName] = useState("");
  const [condition, setCondition] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const suggested = useMemo(
    () => matchAccommodationPacks(condition),
    [condition],
  );

  const letter = useMemo(
    () =>
      buildAccommodationLetter({
        studentName,
        collegeName: state.selectedCollege?.name ?? "",
        condition,
        accommodations: selected,
      }),
    [studentName, state.selectedCollege?.name, condition, selected],
  );

  function toggleItem(item: string) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  }

  function applyPack(items: string[]) {
    setSelected((prev) => Array.from(new Set([...prev, ...items])));
  }

  async function copyLetter() {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function onSave(e: FormEvent) {
    e.preventDefault();
    if (!condition.trim() || selected.length === 0) return;
    addDisabilityRequest({
      condition: condition.trim(),
      accommodations: selected,
      letterDraft: letter,
      status: "draft",
    });
  }

  return (
    <div>
      <p className="section-kicker">Access & advocacy</p>
      <h1 className="display-title mt-2">Disability support tools</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        College-level ADA / Section 504 toolkit for{" "}
        {state.selectedCollege?.name ?? "your campus"} — match accommodations,
        draft a DSS letter, and keep request history.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form onSubmit={onSave} className="panel space-y-4 p-5">
          <label>
            <span className="label">Student name</span>
            <input
              className="field"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            <span className="label">Condition / functional limitation</span>
            <textarea
              className="field min-h-[96px] resize-y"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g. ADHD affecting timed exams and note-taking…"
            />
          </label>

          <div>
            <p className="label">Suggested packs</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(suggested.length ? suggested : COLLEGE_ACCOMMODATION_PACKS).map(
                (pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    className="btn-secondary py-1.5 text-xs"
                    onClick={() => applyPack(pack.items)}
                  >
                    {pack.label}
                  </button>
                ),
              )}
            </div>
            {suggested[0] && (
              <p className="mt-3 text-sm text-ink-500">{suggested[0].guidance}</p>
            )}
          </div>

          <div>
            <p className="label">Accommodations</p>
            <div className="mt-2 max-h-64 space-y-1 overflow-y-auto pr-1">
              {COLLEGE_ACCOMMODATION_PACKS.flatMap((p) => p.items).map(
                (item) => {
                  const on = selected.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleItem(item)}
                      className={cn(
                        "block w-full rounded-xl border px-3 py-2 text-left text-sm transition",
                        on
                          ? "border-pine-400 bg-pine-50 text-pine-900"
                          : "border-ink-200 bg-white text-ink-700 hover:border-pine-200",
                      )}
                    >
                      {item}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary">
            <Save className="h-4 w-4" />
            Save request to history
          </button>
        </form>

        <div className="panel p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-ink-950">
              DSS letter draft
            </h2>
            <button type="button" className="btn-secondary" onClick={copyLetter}>
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-ink-950 p-4 font-sans text-sm leading-relaxed text-ink-100">
            {letter}
          </pre>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-xl font-semibold text-ink-950">
          Saved requests
        </h2>
        <div className="mt-3 space-y-2">
          {state.disabilityRequests.length === 0 && (
            <p className="text-sm text-ink-500">No disability requests saved yet.</p>
          )}
          {state.disabilityRequests.map((req) => (
            <div
              key={req.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-200 bg-white/75 px-4 py-3"
            >
              <div>
                <p className="font-semibold text-ink-950">{req.condition}</p>
                <p className="text-xs text-ink-500">
                  {req.accommodations.length} accommodations
                </p>
              </div>
              <select
                className="field w-auto"
                value={req.status}
                onChange={(e) =>
                  updateDisabilityRequest(req.id, {
                    status: e.target.value as typeof req.status,
                  })
                }
              >
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="needs-docs">Needs docs</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
