import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  Bot,
  Cable,
  ClipboardList,
  GraduationCap,
  HandHeart,
  History,
  Landmark,
  LayoutDashboard,
  Menu,
  Network,
  Server,
  Star,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

const NAV = [
  { to: "/", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/colleges", label: "Colleges", icon: GraduationCap },
  { to: "/hierarchy", label: "Org Hierarchy", icon: Network },
  { to: "/workload", label: "Workload", icon: ClipboardList },
  { to: "/harness", label: "System Harness", icon: Cable },
  { to: "/mirror", label: "Professor Mirror", icon: Bot },
  { to: "/banner", label: "Ellucian Banner", icon: Server },
  { to: "/powerfaids", label: "PowerFAIDS", icon: Wallet },
  { to: "/disability", label: "Disability Support", icon: HandHeart },
  { to: "/books", label: "Amazon Books", icon: BookOpen },
  { to: "/rmp", label: "Rate My Professor", icon: Star },
  { to: "/history", label: "History", icon: History },
];

function NavBody({ onNavigate }: { onNavigate?: () => void }) {
  const { state } = useApp();
  const college = state.selectedCollege;

  return (
    <>
      <div className="border-b border-ink-200/70 px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-hero-mesh text-brass-400 shadow-lift">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-tight text-ink-950">
              Aaron Grace
            </p>
            <p className="text-xs font-semibold tracking-[0.12em] text-pine-600">
              M.Ed.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-500">
          The go-to education administration toolkit — for the whole campus
          ecosystem.
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-pine-700 text-white shadow-lift"
                  : "text-ink-600 hover:bg-pine-50 hover:text-pine-800",
              )
            }
          >
            <Icon className="h-4 w-4 opacity-90" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-2xl border border-brass-300/50 bg-gradient-to-br from-brass-300/20 to-pine-100/60 p-4">
        <p className="section-kicker">Active college</p>
        <p className="mt-2 font-display text-base font-semibold text-ink-950">
          {college?.name ?? "None selected"}
        </p>
        <p className="mt-1 text-xs text-ink-500">
          {college
            ? [college.state, college.country].filter(Boolean).join(" · ")
            : "Pick any campus worldwide to personalize tools."}
        </p>
      </div>
    </>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-200/70 bg-white/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-hero-mesh text-brass-400">
            <Landmark className="h-4 w-4" />
          </div>
          <div>
            <p className="font-display text-base font-semibold text-ink-950">
              Aaron Grace
            </p>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-pine-600">
              M.Ed.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn-ghost"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-ink-950/35 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-ink-200/70 bg-white/95 backdrop-blur-md transition-transform duration-300 lg:static lg:translate-x-0 lg:bg-white/55",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <NavBody onNavigate={() => setOpen(false)} />
      </aside>
    </>
  );
}
