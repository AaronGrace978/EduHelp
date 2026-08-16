import { useDeferredValue, useEffect, useState } from "react";
import { Check, ExternalLink, Globe2, Search } from "lucide-react";
import { loadColleges, loadCountries, searchColleges } from "@/lib/colleges";
import { openExternal } from "@/lib/openExternal";
import { useApp } from "@/context/AppContext";
import type { College } from "@/types";
import { cn } from "@/lib/utils";

export function CollegesPage() {
  const { state, setSelectedCollege } = useApp();
  const [colleges, setColleges] = useState<College[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [c, countriesList] = await Promise.all([
          loadColleges(),
          loadCountries(),
        ]);
        if (!alive) return;
        setColleges(c);
        setCountries(countriesList);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "Load failed");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const results = searchColleges(colleges, deferredQuery, country, 100);

  return (
    <div>
      <p className="section-kicker">World directory</p>
      <h1 className="display-title mt-2">Every college. One selection.</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Browse {loading ? "…" : colleges.length.toLocaleString()} institutions
        across {loading ? "…" : countries.length} countries. Selecting a campus
        personalizes Banner, PowerFAIDS, books, Rate My Professor, and disability
        letters.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_220px]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            className="field pl-10"
            placeholder="Search by name, city/state, country, or domain…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          className="field"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="All">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {state.selectedCollege && (
        <div className="panel mt-6 flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-pine-600">
              Locked in
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-ink-950">
              {state.selectedCollege.name}
            </p>
          </div>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setSelectedCollege(null)}
          >
            Clear selection
          </button>
        </div>
      )}

      {error && (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-2">
        {loading && (
          <p className="text-sm text-ink-500">Loading world college directory…</p>
        )}
        {!loading && results.length === 0 && (
          <p className="text-sm text-ink-500">No colleges match that search.</p>
        )}
        {results.map((college) => {
          const active = state.selectedCollege?.id === college.id;
          return (
            <div
              key={college.id}
              className={cn(
                "flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition",
                active
                  ? "border-pine-400 bg-pine-50"
                  : "border-ink-200/80 bg-white/70 hover:border-pine-200",
              )}
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink-950">
                  {college.name}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-500">
                  <Globe2 className="h-3.5 w-3.5" />
                  {[college.state, college.country].filter(Boolean).join(" · ")}
                  {college.domains[0] ? ` · ${college.domains[0]}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {college.website && (
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => openExternal(college.website!)}
                  >
                    Site
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  className={active ? "btn-secondary" : "btn-primary"}
                  onClick={() => setSelectedCollege(college)}
                >
                  {active ? (
                    <>
                      <Check className="h-4 w-4" /> Selected
                    </>
                  ) : (
                    "Select"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
