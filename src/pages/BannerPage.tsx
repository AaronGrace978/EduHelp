import { type FormEvent, useState } from "react";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { openExternal } from "@/lib/openExternal";
import type { BannerTerm } from "@/types";

const BANNER_CHECKLIST = [
  "Clear registration / advising holds in Banner",
  "Check registration time ticket / appointment",
  "Add / drop classes for the active term",
  "Confirm class schedule & waitlists",
  "Review midterm / final grades",
  "Pull unofficial transcript if needed",
  "Check student account balance / payments",
  "Review Degree Works / program evaluation",
];

export function BannerPage() {
  const {
    state,
    setBannerPortalUrl,
    setBannerStudentId,
    addBannerTerm,
    updateBannerTerm,
    removeBannerTerm,
    addBannerHold,
    updateBannerHold,
    removeBannerHold,
    logHistory,
  } = useApp();

  const [portalDraft, setPortalDraft] = useState(state.bannerPortalUrl);
  const [studentDraft, setStudentDraft] = useState(state.bannerStudentId);
  const [term, setTerm] = useState("Fall 2026");
  const [termStatus, setTermStatus] =
    useState<BannerTerm["status"]>("registering");
  const [credits, setCredits] = useState("");
  const [holdLabel, setHoldLabel] = useState("");
  const [holdOffice, setHoldOffice] = useState("");

  const openHolds = state.bannerHolds.filter((h) => !h.resolved).length;

  function onSavePortal(e: FormEvent) {
    e.preventDefault();
    setBannerPortalUrl(portalDraft.trim());
    setBannerStudentId(studentDraft.trim());
    logHistory({
      kind: "banner",
      title: "Ellucian Banner portal saved",
      detail: studentDraft.trim()
        ? `Student ID on file · ${portalDraft.trim() || "no URL"}`
        : portalDraft.trim() || "cleared",
      url: portalDraft.trim() || undefined,
      collegeName: state.selectedCollege?.name,
    });
  }

  function onAddTerm(e: FormEvent) {
    e.preventDefault();
    if (!term.trim()) return;
    const n = credits.trim() ? Number(credits) : undefined;
    addBannerTerm({
      term: term.trim(),
      status: termStatus,
      credits: n != null && Number.isFinite(n) ? n : undefined,
    });
    setCredits("");
  }

  function onAddHold(e: FormEvent) {
    e.preventDefault();
    if (!holdLabel.trim()) return;
    addBannerHold({
      label: holdLabel.trim(),
      office: holdOffice.trim() || undefined,
      resolved: false,
    });
    setHoldLabel("");
    setHoldOffice("");
  }

  return (
    <div>
      <p className="section-kicker">Student information system</p>
      <h1 className="display-title mt-2">Ellucian Banner</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Open Banner Self-Service for{" "}
        {state.selectedCollege?.name ?? "your campus"}, track terms, clear
        holds, and keep registration history next to PowerFAIDS.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form onSubmit={onSavePortal} className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Banner Self-Service
          </h2>
          <p className="text-sm text-ink-500">
            Paste your school&apos;s Banner / SSB student portal URL. Aaron
            Grace opens it in your system browser.
          </p>
          <label>
            <span className="label">Portal URL</span>
            <input
              className="field"
              placeholder="https://banner.your-school.edu"
              value={portalDraft}
              onChange={(e) => setPortalDraft(e.target.value)}
            />
          </label>
          <label>
            <span className="label">Student ID (local note)</span>
            <input
              className="field"
              placeholder="Stored only on this device"
              value={studentDraft}
              onChange={(e) => setStudentDraft(e.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="btn-primary">
              Save Banner access
            </button>
            <button
              type="button"
              className="btn-secondary"
              disabled={!state.bannerPortalUrl}
              onClick={() => {
                void openExternal(state.bannerPortalUrl);
                logHistory({
                  kind: "banner",
                  title: "Opened Ellucian Banner",
                  url: state.bannerPortalUrl,
                  collegeName: state.selectedCollege?.name,
                });
              }}
            >
              Open Banner
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Term checklist
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            {openHolds > 0
              ? `${openHolds} open hold${openHolds === 1 ? "" : "s"} on file — clear before registration.`
              : "No open holds tracked — still verify inside Banner."}
          </p>
          <ul className="mt-4 space-y-2">
            {BANNER_CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-ink-100 px-1 py-2.5 text-sm text-ink-700 last:border-0"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pine-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-ink-950">
          Term tracker
        </h2>
        <form
          onSubmit={onAddTerm}
          className="mt-4 grid gap-3 md:grid-cols-4"
        >
          <label>
            <span className="label">Term</span>
            <input
              className="field"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Fall 2026"
            />
          </label>
          <label>
            <span className="label">Status</span>
            <select
              className="field"
              value={termStatus}
              onChange={(e) =>
                setTermStatus(e.target.value as BannerTerm["status"])
              }
            >
              <option value="upcoming">Upcoming</option>
              <option value="registering">Registering</option>
              <option value="enrolled">Enrolled</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <label>
            <span className="label">Credits</span>
            <input
              className="field"
              inputMode="decimal"
              placeholder="15"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
            />
          </label>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full">
              <Plus className="h-4 w-4" />
              Add term
            </button>
          </div>
        </form>

        <div className="mt-4 space-y-2">
          {state.bannerTerms.length === 0 && (
            <p className="text-sm text-ink-500">
              No terms yet — add the term you are registering for in Banner.
            </p>
          )}
          {state.bannerTerms.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 py-3"
            >
              <div>
                <p className="font-semibold text-ink-950">{row.term}</p>
                <p className="text-xs text-ink-500">
                  {row.credits != null ? `${row.credits} credits` : "Credits TBD"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="field w-auto py-1.5"
                  value={row.status}
                  onChange={(e) =>
                    updateBannerTerm(row.id, {
                      status: e.target.value as BannerTerm["status"],
                    })
                  }
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="registering">Registering</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  type="button"
                  className="btn-ghost text-red-600"
                  onClick={() => removeBannerTerm(row.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-ink-950">
          Holds &amp; stops
        </h2>
        <form
          onSubmit={onAddHold}
          className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]"
        >
          <label>
            <span className="label">Hold</span>
            <input
              className="field"
              value={holdLabel}
              onChange={(e) => setHoldLabel(e.target.value)}
              placeholder="Advising hold, balance due…"
            />
          </label>
          <label>
            <span className="label">Office</span>
            <input
              className="field"
              value={holdOffice}
              onChange={(e) => setHoldOffice(e.target.value)}
              placeholder="Registrar, Bursar, Advising…"
            />
          </label>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full md:w-auto">
              <Plus className="h-4 w-4" />
              Log hold
            </button>
          </div>
        </form>

        <div className="mt-4 space-y-2">
          {state.bannerHolds.length === 0 && (
            <p className="text-sm text-ink-500">
              No holds logged — add any Banner stops you are working to clear.
            </p>
          )}
          {state.bannerHolds.map((hold) => (
            <div
              key={hold.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 py-3"
            >
              <div>
                <p className="font-semibold text-ink-950">{hold.label}</p>
                <p className="text-xs text-ink-500">
                  {hold.office || "Office TBD"}
                  {hold.resolved ? " · resolved" : " · open"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() =>
                    updateBannerHold(hold.id, { resolved: !hold.resolved })
                  }
                >
                  {hold.resolved ? "Reopen" : "Mark resolved"}
                </button>
                <button
                  type="button"
                  className="btn-ghost text-red-600"
                  onClick={() => removeBannerHold(hold.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
