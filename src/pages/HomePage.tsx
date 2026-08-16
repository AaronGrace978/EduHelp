import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Cable,
  ClipboardList,
  GraduationCap,
  HandHeart,
  History,
  Network,
  Server,
  Star,
  Wallet,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const MODULES = [
  {
    to: "/hierarchy",
    icon: Network,
    title: "Org hierarchy",
    body: "President, Provost, Deans, Directors — the full campus leadership chart.",
  },
  {
    to: "/workload",
    icon: ClipboardList,
    title: "Admin workload",
    body: "Accreditation, enrollment, compliance, and cabinet-level work queues.",
  },
  {
    to: "/harness",
    icon: Cable,
    title: "System harness",
    body: "Plug into Banner, PowerFAIDS, Oracle, SQL, PeopleSoft, Workday, and more.",
  },
  {
    to: "/mirror",
    icon: Bot,
    title: "Professor mirror",
    body: "AI stand-in when faculty are out — plus TAs, graders, and SI leaders.",
  },
  {
    to: "/colleges",
    icon: GraduationCap,
    title: "Every college",
    body: "Search 10,000+ campuses worldwide and lock your active school.",
  },
  {
    to: "/banner",
    icon: Server,
    title: "Ellucian Banner",
    body: "Self-Service portal, terms, holds, registration checklist.",
  },
  {
    to: "/powerfaids",
    icon: Wallet,
    title: "PowerFAIDS",
    body: "Awards, verification tasks, and your campus aid portal.",
  },
  {
    to: "/disability",
    icon: HandHeart,
    title: "Disability support",
    body: "ADA / 504 packs and ready-to-send DSS letters.",
  },
  {
    to: "/books",
    icon: BookOpen,
    title: "Amazon books",
    body: "Find textbooks by title, course, or ISBN.",
  },
  {
    to: "/rmp",
    icon: Star,
    title: "Rate My Professor",
    body: "Campus-aware professor search and personal notes.",
  },
  {
    to: "/history",
    icon: History,
    title: "Histories",
    body: "One timeline across admin, systems, mirrors, aid, and DSS.",
  },
];

export function HomePage() {
  const { state } = useApp();
  const college = state.selectedCollege;

  return (
    <div>
      <section className="relative overflow-hidden rounded-[28px] bg-hero-mesh px-7 py-14 text-white shadow-lift sm:px-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-300">
            Education administration
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
            Aaron Grace,{" "}
            <span className="text-brass-300">M.Ed.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-100/90 sm:text-lg">
            The go-to toolkit for the whole education ecosystem — hierarchy,
            workload, Banner / Oracle / SQL harness, and professor mirrors with
            AI + TA coverage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/hierarchy"
              className="btn-primary bg-brass-500 text-ink-950 hover:bg-brass-400"
            >
              Build your hierarchy
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/harness"
              className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/15"
            >
              Open system harness
            </Link>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="pointer-events-none absolute -right-10 -top-10 hidden h-72 w-72 rounded-full border border-white/10 md:block"
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.35, duration: 1 }}
          className="pointer-events-none absolute bottom-6 right-10 hidden h-24 w-24 rounded-full border border-brass-300/30 md:block"
        />
      </section>

      <section className="mt-12">
        <p className="section-kicker">Campus lock</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink-950">
              {college ? college.name : "No college selected yet"}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-500">
              {college
                ? `${[college.state, college.country].filter(Boolean).join(" · ")} — hierarchy, harness, mirrors, Banner, and aid personalize here.`
                : "Choose any college in the world to personalize administration and student tools."}
            </p>
          </div>
          <Link to="/colleges" className="btn-secondary">
            {college ? "Change college" : "Browse colleges"}
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <p className="section-kicker">Ecosystem toolkit</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink-950">
          Built for everyone on campus
        </h2>
        <div className="mt-6 divide-y divide-ink-200/80 border-y border-ink-200/80">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.to}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35 }}
            >
              <Link
                to={mod.to}
                className="group flex items-start gap-4 py-5 transition hover:bg-pine-50/50 sm:items-center"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pine-700 text-white transition group-hover:bg-pine-600">
                  <mod.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl font-semibold text-ink-950">
                      {mod.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-pine-600 opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">
                    {mod.body}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
