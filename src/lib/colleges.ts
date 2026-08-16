import type { College } from "@/types";

let cache: College[] | null = null;
let countriesCache: string[] | null = null;

export async function loadColleges(): Promise<College[]> {
  if (cache) return cache;
  const res = await fetch("/data/colleges.json");
  if (!res.ok) throw new Error("Failed to load college directory");
  cache = (await res.json()) as College[];
  return cache;
}

export async function loadCountries(): Promise<string[]> {
  if (countriesCache) return countriesCache;
  const res = await fetch("/data/countries.json");
  if (!res.ok) throw new Error("Failed to load countries");
  countriesCache = (await res.json()) as string[];
  return countriesCache;
}

export function searchColleges(
  colleges: College[],
  query: string,
  country?: string,
  limit = 80,
): College[] {
  const q = query.trim().toLowerCase();
  const filtered = colleges.filter((c) => {
    if (country && country !== "All" && c.country !== country) return false;
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      (c.state?.toLowerCase().includes(q) ?? false) ||
      c.domains.some((d) => d.toLowerCase().includes(q))
    );
  });
  return filtered.slice(0, limit);
}
