"use client";

import { useMemo, useState } from "react";
import { Copy, Download, FileText, Check, Mail, Info } from "lucide-react";
import { StateToggle } from "@/components/analyze/StateToggle";
import {
  build504Letter,
  buildEvaluationLetter,
  type TemplateInputs,
} from "@/lib/templates";
import type { StateCode } from "@/lib/eligibility/types";
import { cn } from "@/lib/cn";

const TEMPLATE_TABS = [
  { id: "eval-standard", label: "Eval request (standard)" },
  { id: "eval-firm", label: "Eval request (firm)" },
  { id: "504", label: "504 plan request" },
] as const;

type TabId = (typeof TEMPLATE_TABS)[number]["id"];

export default function TemplatesPage() {
  const [state, setState] = useState<StateCode>("CO");
  const [tab, setTab] = useState<TabId>("eval-standard");
  const [copied, setCopied] = useState(false);

  const [inputs, setInputs] = useState<TemplateInputs>({
    state: "CO",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    childName: "",
    childGrade: "",
    schoolName: "",
    recipientName: "",
    recipientTitle: "Dear",
    date: "",
    concerns: "",
    tone: "standard",
  });

  const letter = useMemo(() => {
    const merged: TemplateInputs = {
      ...inputs,
      state,
      tone: tab === "eval-firm" ? "firm" : "standard",
    };
    if (tab === "504") return build504Letter(merged);
    return buildEvaluationLetter(merged);
  }, [inputs, state, tab]);

  function update<K extends keyof TemplateInputs>(
    key: K,
    value: TemplateInputs[K],
  ) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  function download() {
    const blob = new Blob([letter], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const fname =
      tab === "504"
        ? `EduHelp_504_request_${state}.txt`
        : `EduHelp_eval_request_${state}_${tab === "eval-firm" ? "firm" : "standard"}.txt`;
    a.download = fname;
    a.click();
    URL.revokeObjectURL(url);
  }

  function mailto() {
    const subject = letter.split("\n", 1)[0]?.replace(/^Subject:\s*/i, "") ??
      "Special Education Request";
    const body = letter.replace(/^Subject:.*\n+/, "");
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="pill-brand">
          <FileText className="h-3.5 w-3.5" /> Letter generator
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Send the right letter to the right person.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Three editable templates that cite the correct Colorado or California
          statutes — with a firm version when "no" is the only answer the
          school will hear.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl">
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              <p className="font-semibold">What is this?</p>
              <p className="mt-1 text-brand-900/80">
                Fill in your name, your child's info, and what you're worried
                about. EduHelp drops it into a parent-rights letter (with the
                right state-specific citations) so the school can't just say
                "we'll get back to you." Click <strong>Copy</strong> to paste
                into Gmail, <strong>Download</strong> to save a .txt, or{" "}
                <strong>Open email</strong> if you have a default mail app
                installed (otherwise just use Copy).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <div className="card lg:col-span-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              State &amp; template
            </h2>
            <div className="mt-3">
              <StateToggle
                value={state}
                onChange={(s) => {
                  setState(s);
                  update("state", s);
                }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {TEMPLATE_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 text-xs font-semibold transition",
                    tab === t.id
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Field
              label="Parent / guardian name"
              value={inputs.parentName}
              onChange={(v) => update("parentName", v)}
              placeholder="Jane Doe"
            />
            <Field
              label="Phone"
              value={inputs.parentPhone}
              onChange={(v) => update("parentPhone", v)}
              placeholder="(555) 555-1234"
            />
            <Field
              label="Email"
              value={inputs.parentEmail}
              onChange={(v) => update("parentEmail", v)}
              placeholder="jane@example.com"
              className="sm:col-span-2"
            />
            <Field
              label="Child name"
              value={inputs.childName}
              onChange={(v) => update("childName", v)}
              placeholder="Sam Doe"
            />
            <Field
              label="Grade"
              value={inputs.childGrade}
              onChange={(v) => update("childGrade", v)}
              placeholder="3rd grade"
            />
            <Field
              label="School name"
              value={inputs.schoolName}
              onChange={(v) => update("schoolName", v)}
              placeholder="Cherry Creek Elementary"
              className="sm:col-span-2"
            />
            <Field
              label="Recipient title"
              value={inputs.recipientTitle}
              onChange={(v) => update("recipientTitle", v)}
              placeholder="Dr."
            />
            <Field
              label="Recipient name"
              value={inputs.recipientName}
              onChange={(v) => update("recipientName", v)}
              placeholder="Smith, Principal"
            />
          </div>

          <div className="mt-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Specific concerns
            </label>
            <textarea
              value={inputs.concerns}
              onChange={(e) => update("concerns", e.target.value)}
              rows={4}
              placeholder="Reading 2 grade levels behind; tutor reports difficulty with phonics; pediatrician suspects dyslexia and ADHD."
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-900">
                {TEMPLATE_TABS.find((t) => t.id === tab)?.label} ·{" "}
                {state === "CO" ? "Colorado" : "California"}
              </h2>
              <div className="flex flex-wrap gap-2">
                <button onClick={mailto} className="btn-secondary px-3 py-2 text-xs">
                  <Mail className="h-3.5 w-3.5" /> Open email
                </button>
                <button onClick={download} className="btn-secondary px-3 py-2 text-xs">
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
                <button onClick={copy} className="btn-primary px-3 py-2 text-xs">
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <pre className="mt-4 max-h-[70vh] overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
{letter}
            </pre>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">A few tips</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Send by email AND keep a copy.</li>
              <li>Ask for a dated response in writing.</li>
              <li>If the school says no, ask for the reason in writing (Prior Written Notice).</li>
              <li>You can request a 504 plan as a fallback if your child does not qualify for an IEP.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
      />
    </div>
  );
}
