import { type FormEvent, useMemo, useState } from "react";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { openExternal } from "@/lib/openExternal";
import { formatMoney } from "@/lib/utils";
import type { PowerFaidsAward } from "@/types";

const CHECKLIST = [
  "Complete FAFSA / renewal for the aid year",
  "Submit verification documents if flagged",
  "Accept / decline awards in PowerFAIDS / NetPartner",
  "Confirm Satisfactory Academic Progress (SAP)",
  "Set up refund / direct deposit preferences",
  "Watch disbursement calendar before tuition due date",
];

export function PowerFaidsPage() {
  const {
    state,
    setPowerFaidsPortalUrl,
    addAward,
    updateAward,
    removeAward,
    logHistory,
  } = useApp();
  const [source, setSource] = useState("");
  const [year, setYear] = useState("2025-26");
  const [amount, setAmount] = useState("");
  const [status, setStatus] =
    useState<PowerFaidsAward["status"]>("pending");
  const [portalDraft, setPortalDraft] = useState(state.powerFaidsPortalUrl);

  const total = useMemo(
    () =>
      state.awards
        .filter((a) => a.status === "accepted" || a.status === "disbursed")
        .reduce((sum, a) => sum + a.amount, 0),
    [state.awards],
  );

  function onSavePortal(e: FormEvent) {
    e.preventDefault();
    setPowerFaidsPortalUrl(portalDraft.trim());
    logHistory({
      kind: "powerfaids",
      title: "PowerFAIDS portal saved",
      detail: portalDraft.trim() || "cleared",
      url: portalDraft.trim() || undefined,
      collegeName: state.selectedCollege?.name,
    });
  }

  function onAddAward(e: FormEvent) {
    e.preventDefault();
    const n = Number(amount);
    if (!source.trim() || !Number.isFinite(n) || n < 0) return;
    addAward({ source: source.trim(), year, amount: n, status });
    setSource("");
    setAmount("");
    setStatus("pending");
  }

  return (
    <div>
      <p className="section-kicker">Financial aid</p>
      <h1 className="display-title mt-2">PowerFAIDS workspace</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Connect your campus PowerFAIDS / student aid portal, track award lines,
        and keep verification history next to{" "}
        {state.selectedCollege?.name ?? "your selected college"}.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form onSubmit={onSavePortal} className="panel p-5">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Portal access
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Paste your school&apos;s PowerFAIDS, NetPartner, or financial-aid
            student URL. Aaron Grace opens it in your browser.
          </p>
          <label className="mt-4 block">
            <span className="label">Portal URL</span>
            <input
              className="field"
              placeholder="https://your-school.edu/powerfaids"
              value={portalDraft}
              onChange={(e) => setPortalDraft(e.target.value)}
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="submit" className="btn-primary">
              Save portal
            </button>
            <button
              type="button"
              className="btn-secondary"
              disabled={!state.powerFaidsPortalUrl}
              onClick={() => {
                void openExternal(state.powerFaidsPortalUrl);
                logHistory({
                  kind: "powerfaids",
                  title: "Opened PowerFAIDS portal",
                  url: state.powerFaidsPortalUrl,
                  collegeName: state.selectedCollege?.name,
                });
              }}
            >
              Open portal
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="panel p-5">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Aid-year checklist
          </h2>
          <ul className="mt-4 space-y-2">
            {CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl bg-pine-50/70 px-3 py-2.5 text-sm text-ink-700"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pine-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel mt-6 p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink-950">
              Award tracker
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Accepted / disbursed total:{" "}
              <span className="font-semibold text-pine-700">
                {formatMoney(total)}
              </span>
            </p>
          </div>
        </div>

        <form
          onSubmit={onAddAward}
          className="mt-4 grid gap-3 md:grid-cols-4"
        >
          <label>
            <span className="label">Source</span>
            <input
              className="field"
              placeholder="Pell, SEOG, scholarship…"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </label>
          <label>
            <span className="label">Aid year</span>
            <input
              className="field"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label>
            <span className="label">Amount</span>
            <input
              className="field"
              inputMode="decimal"
              placeholder="3500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label>
            <span className="label">Status</span>
            <select
              className="field"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as PowerFaidsAward["status"])
              }
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
              <option value="disbursed">Disbursed</option>
            </select>
          </label>
          <button type="submit" className="btn-primary md:col-span-4">
            <Plus className="h-4 w-4" />
            Add award line
          </button>
        </form>

        <div className="mt-5 space-y-2">
          {state.awards.length === 0 && (
            <p className="text-sm text-ink-500">
              No awards yet — add lines as they appear in PowerFAIDS.
            </p>
          )}
          {state.awards.map((award) => (
            <div
              key={award.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white/80 px-4 py-3"
            >
              <div>
                <p className="font-semibold text-ink-950">{award.source}</p>
                <p className="text-xs text-ink-500">
                  {award.year} · {formatMoney(award.amount)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="field w-auto py-1.5"
                  value={award.status}
                  onChange={(e) =>
                    updateAward(award.id, {
                      status: e.target.value as PowerFaidsAward["status"],
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                  <option value="disbursed">Disbursed</option>
                </select>
                <button
                  type="button"
                  className="btn-ghost text-red-600"
                  onClick={() => removeAward(award.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
