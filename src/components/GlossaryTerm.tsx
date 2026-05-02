"use client";

import Link from "next/link";
import { findGlossary } from "@/lib/glossary";

/**
 * Inline acronym tooltip. Renders the child as underlined text; on hover/focus
 * shows the short definition; clicking takes the user to /glossary#TERM.
 *
 * <GlossaryTerm word="FAPE">FAPE</GlossaryTerm>
 */
export function GlossaryTerm({
  word,
  children,
}: {
  word: string;
  children: React.ReactNode;
}) {
  const entry = findGlossary(word);
  if (!entry) return <>{children}</>;

  return (
    <Link
      href={`/glossary#${encodeURIComponent(entry.term)}`}
      className="group relative inline-flex items-baseline border-b border-dotted border-brand-500 text-brand-700 underline-offset-4 hover:text-brand-800"
      title={entry.short}
    >
      <span>{children}</span>
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute bottom-full left-0 z-50 mb-1 w-72 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-snug text-slate-700 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100"
      >
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-brand-700">
          {entry.term}
        </span>
        <span className="mt-1 block">{entry.short}</span>
        {entry.source && (
          <span className="mt-1 block text-[10px] text-slate-400">
            {entry.source}
          </span>
        )}
      </span>
    </Link>
  );
}
