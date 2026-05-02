import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ShieldCheck className="h-4 w-4 text-brand-600" />
            EduHelp
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            EduHelp is an informational tool, not legal advice. Always confirm
            eligibility with your school's IEP / 504 team and consult an
            advocate or attorney for disputes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tool
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/analyze" className="text-slate-700 hover:text-brand-700">
                  Analyze documents
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-slate-700 hover:text-brand-700">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-slate-700 hover:text-brand-700">
                  Letter templates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              States
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/resources?state=CO"
                  className="text-slate-700 hover:text-brand-700"
                >
                  Colorado
                </Link>
              </li>
              <li>
                <Link
                  href="/resources?state=CA"
                  className="text-slate-700 hover:text-brand-700"
                >
                  California
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Project
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://github.com/AaronGrace978/EduHelp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-brand-700"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AaronGrace978/EduHelp/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-brand-700"
                >
                  Report an issue
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-4 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} EduHelp. Built for families.</p>
          <p>
            Citations: IDEA 34 C.F.R. § 300.8 · CO ECEA 1 CCR 301-8 · CA 5 CCR
            § 3030
          </p>
        </div>
      </div>
    </footer>
  );
}
