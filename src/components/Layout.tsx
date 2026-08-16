import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";

export function Layout() {
  const location = useLocation();

  return (
    <div className="shell flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <main className="relative min-h-screen flex-1 overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cg fill=%22%23145750%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M0 39h40v1H0zM39 0v40h1V0z%22/%3E%3C/g%3E%3C/svg%3E')]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-6xl px-5 py-7 sm:px-10 sm:py-10"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
