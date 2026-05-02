"use client";

import { useMemo, useState } from "react";
import { BookMarked, Search, Sparkles } from "lucide-react";
import { GLOSSARY, type GlossaryEntry } from "@/lib/glossary";
import { cn } from "@/lib/cn";

const CATEGORY_LABELS: Record<GlossaryEntry["category"], string> = {
  law: "Laws",
  process: "Process",
  assessment: "Assessments",
  team: "Team",
  service: "Services",
  discipline: "Discipline",
  rights: "Parent rights",
};

export default function GlossaryPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<GlossaryEntry["category"] | "all">(
    "all",
  );

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return GLOSSARY.filter((g) => {
      if (category !== "all" && g.category !== category) return false;
      if (!ql) return true;
      const haystack = [
        g.term,
        ...(g.aliases ?? []),
        g.short,
        g.long,
        g.source ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(ql);
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [q, category]);

  const categoryOptions = ["all", ...Object.keys(CATEGORY_LABELS)] as const;

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="pill-brand">
          <Sparkles className="h-3.5 w-3.5" /> Glossary
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Special-education jargon, in plain English.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Every acronym in your child's IEP, eval, or 504 plan — defined like
          a friend would explain it, with the legal citation if you want to
          go deeper.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[14rem]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 'FAPE', 'BASC', 'manifestation'…"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value === "all"
                  ? "all"
                  : (e.target.value as GlossaryEntry["category"]),
              )
            }
            className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c === "all"
                  ? "All categories"
                  : CATEGORY_LABELS[c as GlossaryEntry["category"]]}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {filtered.length} of {GLOSSARY.length} entries
        </p>
      </div>

      <div className="mx-auto mt-6 grid max-w-3xl gap-3">
        {filtered.map((g) => (
          <article
            key={g.term}
            id={g.term}
            className="card scroll-mt-24"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <BookMarked className="h-4 w-4 text-brand-600" />
                  {g.term}
                </h2>
                {g.aliases && g.aliases.length > 0 && (
                  <p className="mt-1 text-xs text-slate-500">
                    Also called: {g.aliases.join(", ")}
                  </p>
                )}
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                  "bg-brand-100 text-brand-700",
                )}
              >
                {CATEGORY_LABELS[g.category]}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-800">
              {g.short}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {g.long}
            </p>
            {g.source && (
              <p className="mt-2 text-[11px] text-slate-400">{g.source}</p>
            )}
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="card text-sm text-slate-500">
            No matching terms. Try a shorter query or pick a different
            category.
          </div>
        )}
      </div>
    </div>
  );
}
