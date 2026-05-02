"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  FileSearch,
  BookOpen,
  FileText,
  Github,
  Settings as SettingsIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/analyze", label: "Analyze", icon: FileSearch },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/templates", label: "Templates", icon: FileText },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft transition group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-slate-900">
              EduHelp
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              IEP &amp; 504 navigator
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/AaronGrace978/EduHelp"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden btn-ghost sm:inline-flex"
            aria-label="EduHelp on GitHub"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <Link href="/analyze" className="btn-primary px-4 py-2 text-sm">
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}
