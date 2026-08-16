import { NavLink } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  HandHeart,
  History,
  Landmark,
  LayoutDashboard,
  Star,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

const NAV = [
  { to: "/", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/colleges", label: "Colleges", icon: GraduationCap },
  { to: "/powerfaids", label: "PowerFAIDS", icon: Wallet },
  { to: "/disability", label: "Disability Support", icon: HandHeart },
  { to: "/books", label: "Amazon Books", icon: BookOpen },
  { to: "/rmp", label: "Rate My Professor", icon: Star },
  { to: "/history", label: "History", icon: History },
];

export function Sidebar() {
  const { state } = useApp();
  const college = state.selectedCollege;

  return (
    <aside className="flex w-[272px] shrink-0 flex-col border-r border-ink-200/70 bg-white/55 backdrop-blur-md">
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
          The ultimate college toolkit — locked to your campus.
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
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
    </aside>
  );
}
