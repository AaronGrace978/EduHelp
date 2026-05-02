"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  ExternalLink,
  Globe,
  Loader2,
  Newspaper,
  Phone,
  Scale,
  Users,
  Building2,
} from "lucide-react";
import { StateToggle } from "@/components/analyze/StateToggle";
import {
  STATE_NAMES,
  SUPPORTED_STATES,
  type StateCode,
} from "@/lib/eligibility/types";
import type { ResourceLink } from "@/lib/resources/static";

interface ApiResponse {
  state: StateCode;
  static: ResourceLink[];
  live: { source: string; url: string; title: string; excerpt: string }[];
  scraped: boolean;
}

const ICONS: Record<ResourceLink["category"], React.ComponentType<{ className?: string }>> = {
  Government: Building2,
  Advocacy: Users,
  "Legal Aid": Scale,
  "Parent Center": Phone,
};

export default function ResourcesPage() {
  return (
    <Suspense fallback={<ResourcesFallback />}>
      <ResourcesPageInner />
    </Suspense>
  );
}

function ResourcesFallback() {
  return (
    <div className="container-page py-16">
      <div className="card mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading resources…
        </div>
      </div>
    </div>
  );
}

function ResourcesPageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialRaw = (params.get("state") ?? "CO").toUpperCase();
  const initial: StateCode = SUPPORTED_STATES.includes(initialRaw as StateCode)
    ? (initialRaw as StateCode)
    : "CO";

  const [state, setState] = useState<StateCode>(initial);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let aborted = false;
    setLoading(true);
    fetch(`/api/resources?state=${state}`)
      .then((r) => r.json())
      .then((d: ApiResponse) => {
        if (!aborted) setData(d);
      })
      .catch(() => {})
      .finally(() => !aborted && setLoading(false));
    return () => {
      aborted = true;
    };
  }, [state]);

  function changeState(s: StateCode) {
    setState(s);
    const sp = new URLSearchParams(params.toString());
    sp.set("state", s);
    router.replace(`${pathname}?${sp.toString()}`);
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="pill-accent">
          <Globe className="h-3.5 w-3.5" /> Curated + live resources
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          The right people, agencies, and laws — by state.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Hand-picked resources for Colorado, California, Texas, New York,
          Florida, Illinois, and Massachusetts families, plus live-scraped
          headlines from state Departments of Education.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <StateToggle value={state} onChange={changeState} />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">
          Trusted organizations
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Free help, advocacy, and legal aid for families in {STATE_NAMES[state]}.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {(data?.static ?? []).map((r) => {
            const Icon = ICONS[r.category];
            return (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="pill text-[10px]">{r.category}</span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-slate-900 group-hover:text-brand-700">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {r.description}
                    </p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 text-slate-400 group-hover:text-brand-600" />
                </div>
              </a>
            );
          })}
          {!data && loading && <ResourceSkeleton count={6} />}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
              <Newspaper className="h-5 w-5 text-brand-600" />
              Live from state DOE pages
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Headlines scraped on demand from the {STATE_NAMES[state]} Department
              of Education (cached 6 hrs).
            </p>
          </div>
          {loading && (
            <span className="pill">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Refreshing
            </span>
          )}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {data?.scraped === false && (
            <div className="card md:col-span-2">
              <p className="text-sm text-slate-600">
                Live scraping is disabled. Set{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                  ENABLE_WEB_SCRAPING=true
                </code>{" "}
                in your <code>.env.local</code> to turn it on.
              </p>
            </div>
          )}
          {(data?.live ?? []).map((h) => (
            <a
              key={h.url + h.title}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-700">
                {h.source}
              </p>
              <h3 className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-brand-700">
                {h.title}
              </h3>
              {h.excerpt && (
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {h.excerpt}
                </p>
              )}
            </a>
          ))}
          {!data && loading && <ResourceSkeleton count={4} />}
          {data && data.scraped && data.live.length === 0 && (
            <div className="card md:col-span-2">
              <p className="text-sm text-slate-600">
                No live headlines found this refresh — the static resources
                above are the most reliable starting point.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ResourceSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card">
          <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="mt-1 h-3 w-4/5 animate-pulse rounded bg-slate-100" />
        </div>
      ))}
    </>
  );
}
