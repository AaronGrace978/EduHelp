"use client";

import { useMemo, useState } from "react";
import { Copy, Download, FileText, Check, Mail, Info, Printer } from "lucide-react";
import {
  build504Letter,
  buildEvaluationLetter,
  buildIEELetter,
  buildMediationLetter,
  buildOCRComplaintLetter,
  buildStateComplaintLetter,
  buildDueProcessLetter,
  buildChildProfile,
  type ProfileInputs,
  type TemplateInputs,
} from "@/lib/templates";
import {
  STATE_NAMES,
  SUPPORTED_STATES,
  type StateCode,
} from "@/lib/eligibility/types";
import { cn } from "@/lib/cn";

const TEMPLATE_TABS = [
  { id: "eval-standard", label: "Evaluation request", group: "Initial" },
  { id: "eval-firm", label: "Evaluation request (firm)", group: "Initial" },
  { id: "504", label: "504 plan request", group: "Initial" },
  { id: "iee", label: "IEE at public expense", group: "Escalation" },
  { id: "mediation", label: "Mediation", group: "Escalation" },
  { id: "state-complaint", label: "State complaint", group: "Escalation" },
  { id: "ocr-complaint", label: "OCR complaint", group: "Escalation" },
  { id: "due-process", label: "Due process", group: "Escalation" },
  { id: "profile", label: "1-page child profile", group: "Profile" },
] as const;

const STATE_CITATIONS: Record<StateCode, string> = {
  CO: "1 CCR 301-8 § 2.08",
  CA: "5 CCR § 3030 / Ed. Code § 56333",
  TX: "19 TAC § 89.1040",
  NY: "8 NYCRR § 200.1(zz)",
  FL: "Rule 6A-6.030xx, F.A.C.",
  IL: "23 IAC § 226.75",
  MA: "603 CMR 28.02(7)",
};

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

  const [profile, setProfile] = useState<ProfileInputs>({
    childName: "",
    childAge: "",
    childPronouns: "",
    state: "CO",
    strengths: "",
    challenges: "",
    bestSupports: "",
    whatToAvoid: "",
    diagnoses: "",
    medications: "",
    emergencyContact: "",
  });

  const letter = useMemo(() => {
    const merged: TemplateInputs = {
      ...inputs,
      state,
      tone: tab === "eval-firm" ? "firm" : "standard",
    };
    switch (tab) {
      case "504":
        return build504Letter(merged);
      case "iee":
        return buildIEELetter(merged);
      case "mediation":
        return buildMediationLetter(merged);
      case "state-complaint":
        return buildStateComplaintLetter(merged);
      case "ocr-complaint":
        return buildOCRComplaintLetter(merged);
      case "due-process":
        return buildDueProcessLetter(merged);
      case "profile":
        return buildChildProfile({ ...profile, state });
      case "eval-firm":
      case "eval-standard":
      default:
        return buildEvaluationLetter(merged);
    }
  }, [inputs, profile, state, tab]);

  function update<K extends keyof TemplateInputs>(
    key: K,
    value: TemplateInputs[K],
  ) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  function updateProfile<K extends keyof ProfileInputs>(
    key: K,
    value: ProfileInputs[K],
  ) {
    setProfile((prev) => ({ ...prev, [key]: value }));
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
    a.download = `EduHelp_${tab}_${state}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function mailto() {
    const subject =
      letter.split("\n", 1)[0]?.replace(/^Subject:\s*/i, "") ??
      "Special Education Request";
    const body = letter.replace(/^Subject:.*\n+/, "");
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  function printDoc() {
    window.print();
  }

  const isProfile = tab === "profile";

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="pill-brand">
          <FileText className="h-3.5 w-3.5" /> Letter generator + escalation kit
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Send the right letter to the right person.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Nine editable templates with the right state-specific citations:
          initial requests, escalation kit (IEE, mediation, state &amp; OCR
          complaints, due process), and a 1-page child profile to share with
          new teachers.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl">
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              <p className="font-semibold">How this works</p>
              <p className="mt-1 text-brand-900/80">
                Pick a template, fill in the fields, and EduHelp produces a
                final letter with the correct {STATE_NAMES[state]} citations.
                Click <strong>Copy</strong> to paste into Gmail,{" "}
                <strong>Download</strong> for a .txt, <strong>Print</strong> for
                a paper copy, or <strong>Open email</strong> if you have a
                default mail app.
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
              <label
                htmlFor="template-state"
                className="text-[10px] font-semibold uppercase tracking-wider text-slate-500"
              >
                State
              </label>
              <select
                id="template-state"
                value={state}
                onChange={(e) => {
                  const s = e.target.value as StateCode;
                  setState(s);
                  update("state", s);
                  updateProfile("state", s);
                }}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              >
                {SUPPORTED_STATES.map((code) => (
                  <option key={code} value={code}>
                    {STATE_NAMES[code]} ({code})
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">
                Uses {STATE_CITATIONS[state]} for {STATE_NAMES[state]} citations.
              </p>
            </div>
            <div className="mt-4">
              {(["Initial", "Escalation", "Profile"] as const).map((group) => (
                <div key={group} className="mt-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {group}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {TEMPLATE_TABS.filter((t) => t.group === group).map((t) => (
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
              ))}
            </div>
          </div>

          {!isProfile && (
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
          )}

          {!isProfile ? (
            <div className="mt-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Specific concerns / facts of the dispute
              </label>
              <textarea
                value={inputs.concerns}
                onChange={(e) => update("concerns", e.target.value)}
                rows={5}
                placeholder="Reading 2 grade levels behind; tutor reports difficulty with phonics; pediatrician suspects dyslexia and ADHD."
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Field
                label="Child name"
                value={profile.childName}
                onChange={(v) => updateProfile("childName", v)}
                placeholder="Sam"
              />
              <Field
                label="Age"
                value={profile.childAge}
                onChange={(v) => updateProfile("childAge", v)}
                placeholder="8"
              />
              <Field
                label="Pronouns"
                value={profile.childPronouns}
                onChange={(v) => updateProfile("childPronouns", v)}
                placeholder="they/them"
                className="sm:col-span-2"
              />
              <BigField
                label="What I'm great at"
                value={profile.strengths}
                onChange={(v) => updateProfile("strengths", v)}
                placeholder="Loves Lego, kind to younger kids, super creative…"
                className="sm:col-span-2"
              />
              <BigField
                label="What's hard for me"
                value={profile.challenges}
                onChange={(v) => updateProfile("challenges", v)}
                placeholder="Reading aloud, transitions, loud cafeterias…"
                className="sm:col-span-2"
              />
              <BigField
                label="What helps me succeed"
                value={profile.bestSupports}
                onChange={(v) => updateProfile("bestSupports", v)}
                placeholder="Visual schedule, fidget, advance notice of changes…"
                className="sm:col-span-2"
              />
              <BigField
                label="What to avoid"
                value={profile.whatToAvoid}
                onChange={(v) => updateProfile("whatToAvoid", v)}
                placeholder="Public correction, surprise tests, fluorescent lighting…"
                className="sm:col-span-2"
              />
              <BigField
                label="Diagnoses / formal supports"
                value={profile.diagnoses}
                onChange={(v) => updateProfile("diagnoses", v)}
                placeholder="ADHD, dyslexia; IEP under SLD"
                className="sm:col-span-2"
              />
              <Field
                label="Medications (school-day only)"
                value={profile.medications}
                onChange={(v) => updateProfile("medications", v)}
                placeholder="Stimulant at lunch"
                className="sm:col-span-2"
              />
              <BigField
                label="In an emergency"
                value={profile.emergencyContact}
                onChange={(v) => updateProfile("emergencyContact", v)}
                placeholder="Mom: (555) 555-0001 · Dad: (555) 555-0002"
                className="sm:col-span-2"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-900">
                {TEMPLATE_TABS.find((t) => t.id === tab)?.label} ·{" "}
                {STATE_NAMES[state]}
              </h2>
              <div className="flex flex-wrap gap-2">
                {!isProfile && (
                  <button onClick={mailto} className="btn-secondary px-3 py-2 text-xs">
                    <Mail className="h-3.5 w-3.5" /> Open email
                  </button>
                )}
                <button onClick={printDoc} className="btn-secondary px-3 py-2 text-xs">
                  <Printer className="h-3.5 w-3.5" /> Print
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
              <li>State complaints have a 1-year statute; due process has 2.</li>
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

function BigField({
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
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
      />
    </div>
  );
}
