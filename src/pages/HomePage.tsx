import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HandHeart,
  History,
  Star,
  Wallet,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const MODULES = [
  {
    to: "/colleges",
    icon: GraduationCap,
    title: "Every college",
    body: "Search 10,000+ campuses across 200 countries and lock your active school.",
  },
  {
    to: "/powerfaids",
    icon: Wallet,
    title: "PowerFAIDS",
    body: "Track awards, verification tasks, and open your campus financial-aid portal.",
  },
  {
    to: "/disability",
    icon: HandHeart,
    title: "Disability support",
    body: "College ADA / 504 accommodation packs and ready-to-send DSS letters.",
  },
  {
    to: "/books",
    icon: BookOpen,
    title: "Amazon books",
    body: "Find textbooks by title, course, or ISBN and keep an order history.",
  },
  {
    to: "/rmp",
    icon: Star,
    title: "Rate My Professor",
    body: "Search professors for your campus, open RMP, and save notes.",
  },
  {
    to: "/history",
    icon: History,
    title: "Histories",
    body: "One timeline for college picks, aid, books, professors, and DSS drafts.",
  },
];

export function HomePage() {
  const { state } = useApp();
  const college = state.selectedCollege;

  return (
    <div>
      <section className="relative overflow-hidden rounded-[28px] bg-hero-mesh px-8 py-14 text-white shadow-lift sm:px-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
            Aaron Grace, M.Ed.
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            The ultimate college tool.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-100/90 sm:text-lg">
            PowerFAIDS, disability support, Amazon textbooks, Rate My Professor,
            and a directory of colleges worldwide — unified around the campus
            you choose.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/colleges" className="btn-primary bg-brass-500 text-ink-950 hover:bg-brass-400">
              Select your college
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/powerfaids" className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/15">
              Open PowerFAIDS
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
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 1 }}
          className="pointer-events-none absolute bottom-8 right-10 hidden text-right md:block"
        >
          <p className="font-display text-5xl font-semibold text-white/15">AG</p>
          <p className="mt-1 text-xs tracking-[0.18em] text-white/35">LOCK IN</p>
        </motion.div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Campus lock</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink-950">
              {college ? college.name : "No college selected yet"}
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              {college
                ? `${[college.state, college.country].filter(Boolean).join(" · ")} — tools below personalize to this campus.`
                : "Choose any college in the world to personalize PowerFAIDS, books, RMP, and DSS letters."}
            </p>
          </div>
          <Link to="/colleges" className="btn-secondary">
            {college ? "Change college" : "Browse colleges"}
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.to}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
            >
              <Link
                to={mod.to}
                className="group block h-full rounded-2xl border border-ink-200/80 bg-white/70 p-5 transition hover:border-pine-300 hover:bg-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pine-50 text-pine-700 transition group-hover:bg-pine-700 group-hover:text-white">
                  <mod.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-950">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {mod.body}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
