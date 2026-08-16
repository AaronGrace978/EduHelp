import { type FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  GraduationCap,
  Plus,
  Sparkles,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  COVERAGE_STATUSES,
  INSTRUCTIONAL_ROLES,
  MIRROR_CAPABILITIES,
  coverageLabel,
  instructionalRoleLabel,
} from "@/lib/adminCatalog";
import type {
  CoverageStatus,
  InstructionalRole,
  MirrorCapability,
  ProfessorMirror,
} from "@/types";

const DEFAULT_CAPABILITIES: MirrorCapability[] = [
  "office_hours_qa",
  "syllabus_guidance",
  "assignment_clarification",
];

export function ProfessorMirrorPage() {
  const {
    state,
    addProfessorMirror,
    updateProfessorMirror,
    removeProfessorMirror,
    addMirrorStaff,
    removeMirrorStaff,
    activateAiCoverage,
    restoreProfessorCoverage,
  } = useApp();

  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [term, setTerm] = useState("Fall 2026");
  const [department, setDepartment] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [professorEmail, setProfessorEmail] = useState("");
  const [aiPersonaNotes, setAiPersonaNotes] = useState("");
  const [syllabusOutline, setSyllabusOutline] = useState("");
  const [officeHours, setOfficeHours] = useState("");
  const [faqNotes, setFaqNotes] = useState("");
  const [capabilities, setCapabilities] =
    useState<MirrorCapability[]>(DEFAULT_CAPABILITIES);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [staffName, setStaffName] = useState("");
  const [staffRole, setStaffRole] = useState<InstructionalRole>("ta");
  const [staffEmail, setStaffEmail] = useState("");

  const selected =
    state.professorMirrors.find((m) => m.id === selectedId) ?? null;

  const covering = useMemo(
    () =>
      state.professorMirrors.filter((m) =>
        ["ai_covering", "ta_covering", "unavailable", "human_backup"].includes(
          m.coverageStatus,
        ),
      ),
    [state.professorMirrors],
  );

  function toggleCapability(cap: MirrorCapability) {
    setCapabilities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap],
    );
  }

  function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!courseCode.trim() || !professorName.trim()) return;
    addProfessorMirror({
      courseCode: courseCode.trim().toUpperCase(),
      courseTitle: courseTitle.trim() || courseCode.trim().toUpperCase(),
      term: term.trim() || "Current term",
      department: department.trim() || undefined,
      professorName: professorName.trim(),
      professorEmail: professorEmail.trim() || undefined,
      coverageStatus: "available",
      aiMirrorEnabled: true,
      aiPersonaNotes: aiPersonaNotes.trim(),
      syllabusOutline: syllabusOutline.trim(),
      officeHours: officeHours.trim(),
      faqNotes: faqNotes.trim(),
      capabilities,
      staff: [],
      humanOversightRequired: true,
    });
    setCourseCode("");
    setCourseTitle("");
    setDepartment("");
    setProfessorName("");
    setProfessorEmail("");
    setAiPersonaNotes("");
    setSyllabusOutline("");
    setOfficeHours("");
    setFaqNotes("");
    setCapabilities(DEFAULT_CAPABILITIES);
  }

  function onAddStaff(e: FormEvent) {
    e.preventDefault();
    if (!selected || !staffName.trim()) return;
    addMirrorStaff(selected.id, {
      name: staffName.trim(),
      role: staffRole,
      email: staffEmail.trim() || undefined,
    });
    setStaffName("");
    setStaffEmail("");
  }

  return (
    <div>
      <p className="section-kicker">Instructional continuity</p>
      <h1 className="display-title mt-2">Professor mirror</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Mirror each section with the professor&apos;s voice, syllabus, and FAQ —
        then hand coverage to an AI stand-in, TA, grader, or SI leader when the
        faculty member is unavailable. Built for the whole teaching ecosystem at{" "}
        {state.selectedCollege?.name ?? "your campus"}.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="rounded-xl border border-ink-200/80 bg-white/70 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-pine-600">
            Mirrored sections
          </p>
          <p className="font-display text-2xl font-semibold text-ink-950">
            {state.professorMirrors.length}
          </p>
        </div>
        <div className="rounded-xl border border-ink-200/80 bg-white/70 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-pine-600">
            Active coverage gaps
          </p>
          <p className="font-display text-2xl font-semibold text-ink-950">
            {covering.length}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form onSubmit={onCreate} className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Create mirror
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className="label">Course code</span>
              <input
                className="field"
                placeholder="EDU 510"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              />
            </label>
            <label>
              <span className="label">Term</span>
              <input
                className="field"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </label>
          </div>
          <label>
            <span className="label">Course title</span>
            <input
              className="field"
              placeholder="Foundations of Educational Administration"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
          </label>
          <label>
            <span className="label">Department</span>
            <input
              className="field"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className="label">Professor</span>
              <input
                className="field"
                placeholder="Dr. Rivera"
                value={professorName}
                onChange={(e) => setProfessorName(e.target.value)}
              />
            </label>
            <label>
              <span className="label">Professor email</span>
              <input
                className="field"
                value={professorEmail}
                onChange={(e) => setProfessorEmail(e.target.value)}
              />
            </label>
          </div>
          <label>
            <span className="label">AI persona / teaching voice</span>
            <textarea
              className="field min-h-[88px]"
              placeholder="Tone, catchphrases, how they explain concepts, what they never invent…"
              value={aiPersonaNotes}
              onChange={(e) => setAiPersonaNotes(e.target.value)}
            />
          </label>
          <label>
            <span className="label">Syllabus outline</span>
            <textarea
              className="field min-h-[88px]"
              value={syllabusOutline}
              onChange={(e) => setSyllabusOutline(e.target.value)}
            />
          </label>
          <label>
            <span className="label">Office hours</span>
            <input
              className="field"
              placeholder="Tue/Thu 2–4pm · Zoom link…"
              value={officeHours}
              onChange={(e) => setOfficeHours(e.target.value)}
            />
          </label>
          <label>
            <span className="label">FAQ / common clarifications</span>
            <textarea
              className="field min-h-[72px]"
              value={faqNotes}
              onChange={(e) => setFaqNotes(e.target.value)}
            />
          </label>
          <fieldset>
            <legend className="label">AI mirror capabilities</legend>
            <div className="mt-1 space-y-2">
              {MIRROR_CAPABILITIES.map((cap) => (
                <label
                  key={cap.value}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-ink-200/70 bg-white/70 px-3 py-2"
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={capabilities.includes(cap.value)}
                    onChange={() => toggleCapability(cap.value)}
                  />
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">
                      {cap.label}
                    </span>
                    <span className="text-xs text-ink-500">{cap.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="btn-primary">
            <Sparkles className="h-4 w-4" />
            Save professor mirror
          </button>
        </form>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Section mirrors
          </h2>
          {state.professorMirrors.length === 0 && (
            <p className="text-sm text-ink-500">
              No mirrors yet. Create one so AI or a TA can cover when faculty
              are out.
            </p>
          )}
          {state.professorMirrors.map((mirror, i) => (
            <MirrorCard
              key={mirror.id}
              mirror={mirror}
              selected={selectedId === mirror.id}
              delay={i}
              onSelect={() =>
                setSelectedId((id) => (id === mirror.id ? null : mirror.id))
              }
              onCoverage={(coverageStatus) =>
                updateProfessorMirror(mirror.id, { coverageStatus })
              }
              onActivateAi={() => activateAiCoverage(mirror.id)}
              onRestore={() => restoreProfessorCoverage(mirror.id)}
              onRemove={() => {
                removeProfessorMirror(mirror.id);
                if (selectedId === mirror.id) setSelectedId(null);
              }}
            />
          ))}
        </section>
      </div>

      {selected && (
        <section className="mt-10 rounded-2xl border border-ink-200/80 bg-white/75 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Users className="h-4 w-4 text-pine-600" />
            <h2 className="font-display text-xl font-semibold text-ink-950">
              Course staff — {selected.courseCode}
            </h2>
          </div>
          <p className="mt-2 text-sm text-ink-500">
            Add TAs, graders, SI leaders, tutors, and lab assistants who can
            cover or supervise the AI mirror.
          </p>

          <form
            onSubmit={onAddStaff}
            className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
          >
            <label>
              <span className="label">Name</span>
              <input
                className="field"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder="Jordan Lee"
              />
            </label>
            <label>
              <span className="label">Role</span>
              <select
                className="field"
                value={staffRole}
                onChange={(e) =>
                  setStaffRole(e.target.value as InstructionalRole)
                }
              >
                {INSTRUCTIONAL_ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">Email</span>
              <input
                className="field"
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
              />
            </label>
            <div className="flex items-end">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </form>

          <ul className="mt-4 divide-y divide-ink-200/80">
            {selected.staff.length === 0 && (
              <li className="py-3 text-sm text-ink-500">
                No TA / support staff on this mirror yet.
              </li>
            )}
            {selected.staff.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="font-medium text-ink-900">{s.name}</p>
                  <p className="text-xs text-ink-500">
                    {instructionalRoleLabel(s.role)}
                    {s.email ? ` · ${s.email}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-ghost text-red-700"
                  onClick={() => removeMirrorStaff(selected.id, s.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-xl border border-brass-300/40 bg-gradient-to-br from-brass-300/15 to-pine-50/80 p-4">
            <div className="flex items-start gap-3">
              <Bot className="mt-0.5 h-5 w-5 shrink-0 text-pine-700" />
              <div>
                <p className="font-display text-lg font-semibold text-ink-950">
                  AI coverage handoff
                </p>
                <p className="mt-1 text-sm text-ink-600">
                  When the professor is unavailable, activate the AI mirror.
                  Human oversight stays on
                  {selected.humanOversightRequired ? " (required)" : ""}. TAs
                  can take primary coverage while AI handles routine Q&A.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => activateAiCoverage(selected.id)}
                  >
                    <Sparkles className="h-4 w-4" />
                    AI take over
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() =>
                      updateProfessorMirror(selected.id, {
                        coverageStatus: "ta_covering",
                        unavailableReason:
                          selected.unavailableReason ||
                          "Professor unavailable — TA covering",
                      })
                    }
                  >
                    <UserRound className="h-4 w-4" />
                    TA take over
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => restoreProfessorCoverage(selected.id)}
                  >
                    <GraduationCap className="h-4 w-4" />
                    Professor back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function MirrorCard({
  mirror,
  selected,
  delay,
  onSelect,
  onCoverage,
  onActivateAi,
  onRestore,
  onRemove,
}: {
  mirror: ProfessorMirror;
  selected: boolean;
  delay: number;
  onSelect: () => void;
  onCoverage: (status: CoverageStatus) => void;
  onActivateAi: () => void;
  onRestore: () => void;
  onRemove: () => void;
}) {
  const covering =
    mirror.coverageStatus === "ai_covering" ||
    mirror.coverageStatus === "ta_covering" ||
    mirror.coverageStatus === "human_backup" ||
    mirror.coverageStatus === "unavailable";

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * delay }}
      className={`rounded-2xl border px-4 py-4 ${
        selected
          ? "border-pine-400 bg-pine-50/60"
          : covering
            ? "border-brass-300/60 bg-brass-300/10"
            : "border-ink-200/80 bg-white/75"
      }`}
    >
      <button type="button" className="w-full text-left" onClick={onSelect}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-pine-600">
          {mirror.term}
          {mirror.department ? ` · ${mirror.department}` : ""}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold text-ink-950">
          {mirror.courseCode} — {mirror.courseTitle}
        </h3>
        <p className="mt-1 text-sm text-ink-500">
          {mirror.professorName}
          {mirror.staff.length
            ? ` · ${mirror.staff.length} support staff`
            : ""}
        </p>
        <p className="mt-2 text-xs font-semibold text-ink-700">
          {coverageLabel(mirror.coverageStatus)}
          {mirror.aiMirrorEnabled ? " · AI mirror ready" : ""}
        </p>
      </button>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label>
          <span className="label">Coverage</span>
          <select
            className="field"
            value={mirror.coverageStatus}
            onChange={(e) => onCoverage(e.target.value as CoverageStatus)}
          >
            {COVERAGE_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end gap-1">
          <button type="button" className="btn-secondary flex-1" onClick={onActivateAi}>
            <Bot className="h-4 w-4" />
            AI cover
          </button>
          <button type="button" className="btn-ghost" onClick={onRestore}>
            Restore
          </button>
          <button
            type="button"
            className="btn-ghost text-red-700"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {mirror.capabilities.length > 0 && (
        <p className="mt-3 text-xs text-ink-500">
          Capabilities:{" "}
          {mirror.capabilities
            .map(
              (c) =>
                MIRROR_CAPABILITIES.find((x) => x.value === c)?.label ?? c,
            )
            .join(", ")}
        </p>
      )}
    </motion.article>
  );
}
