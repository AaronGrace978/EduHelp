"use client";

import { cn } from "@/lib/cn";
import { SUPPORTED_STATES, STATE_NAMES } from "@/lib/eligibility/types";
import type { StateCode } from "@/lib/eligibility/types";

const SUB: Record<StateCode, string> = {
  CO: "1 CCR 301-8 § 2.08",
  CA: "5 CCR § 3030 / Ed. Code 56333",
  TX: "19 TAC § 89.1040",
  NY: "8 NYCRR § 200.1(zz)",
  FL: "Rule 6A-6.030xx",
  IL: "23 IAC § 226.75",
  MA: "603 CMR 28.02(7)",
};

export function StateToggle({
  value,
  onChange,
}: {
  value: StateCode;
  onChange: (s: StateCode) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {SUPPORTED_STATES.map((code) => {
        const active = code === value;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            className={cn(
              "rounded-2xl border p-3 text-left transition",
              active
                ? "border-brand-500 bg-brand-50 shadow-ring"
                : "border-slate-200 bg-white hover:border-slate-300",
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-lg text-xs font-bold",
                  active
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-700",
                )}
              >
                {code}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {STATE_NAMES[code]}
                </p>
                <p className="truncate text-[11px] text-slate-500">
                  {SUB[code]}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
