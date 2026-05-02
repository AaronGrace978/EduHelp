"use client";

import { cn } from "@/lib/cn";
import type { StateCode } from "@/lib/eligibility/types";

const STATES: { code: StateCode; label: string; sub: string }[] = [
  { code: "CO", label: "Colorado", sub: "ECEA / 1 CCR 301-8" },
  { code: "CA", label: "California", sub: "5 CCR § 3030 / Ed. Code 56333" },
];

export function StateToggle({
  value,
  onChange,
}: {
  value: StateCode;
  onChange: (s: StateCode) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {STATES.map((s) => {
        const active = s.code === value;
        return (
          <button
            key={s.code}
            type="button"
            onClick={() => onChange(s.code)}
            className={cn(
              "rounded-2xl border p-4 text-left transition",
              active
                ? "border-brand-500 bg-brand-50 shadow-ring"
                : "border-slate-200 bg-white hover:border-slate-300",
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl text-sm font-bold",
                  active
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-700",
                )}
              >
                {s.code}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {s.label}
                </p>
                <p className="text-xs text-slate-500">{s.sub}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
