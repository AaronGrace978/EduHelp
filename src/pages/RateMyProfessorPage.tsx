import { type FormEvent, useState } from "react";
import { ExternalLink, Plus, Star, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { openExternal, rateMyProfessorUrl } from "@/lib/openExternal";

export function RateMyProfessorPage() {
  const { state, addProfessor, removeProfessor, logHistory } = useApp();
  const [professor, setProfessor] = useState("");
  const [department, setDepartment] = useState("");
  const [rating, setRating] = useState("4");
  const [notes, setNotes] = useState("");
  const collegeName = state.selectedCollege?.name ?? "";

  function rmpUrl(name = professor) {
    return rateMyProfessorUrl(collegeName || "university", name);
  }

  function onSave(e: FormEvent) {
    e.preventDefault();
    if (!professor.trim()) return;
    const url = rmpUrl();
    addProfessor({
      professor: professor.trim(),
      department: department.trim() || undefined,
      collegeName: collegeName || "Unspecified college",
      rating: Number(rating) || undefined,
      notes: notes.trim() || undefined,
      rmpUrl: url,
    });
    setProfessor("");
    setDepartment("");
    setNotes("");
  }

  return (
    <div>
      <p className="section-kicker">Instructors</p>
      <h1 className="display-title mt-2">Rate My Professor</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Search professors for{" "}
        <span className="font-semibold text-ink-800">
          {collegeName || "your selected college"}
        </span>
        , open Rate My Professors, and keep personal notes in history.
      </p>

      {!collegeName && (
        <p className="mt-4 rounded-xl border border-brass-300 bg-brass-300/20 px-4 py-3 text-sm text-ink-800">
          Tip: select a college first so RMP searches target the right campus.
        </p>
      )}

      <form onSubmit={onSave} className="panel mt-8 grid gap-3 p-5 md:grid-cols-2">
        <label>
          <span className="label">Professor</span>
          <input
            className="field"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            placeholder="Last name or full name"
          />
        </label>
        <label>
          <span className="label">Department</span>
          <input
            className="field"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Psychology"
          />
        </label>
        <label>
          <span className="label">Your rating (1–5)</span>
          <input
            className="field"
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <label>
          <span className="label">Notes</span>
          <input
            className="field"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Clear lectures, tough exams…"
          />
        </label>
        <div className="flex flex-wrap gap-2 md:col-span-2">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              const url = rmpUrl();
              void openExternal(url);
              logHistory({
                kind: "rmp",
                title: `RMP search: ${professor || collegeName || "campus"}`,
                url,
                collegeName: collegeName || undefined,
              });
            }}
          >
            Open Rate My Professor
            <ExternalLink className="h-4 w-4" />
          </button>
          <button type="submit" className="btn-secondary">
            <Plus className="h-4 w-4" />
            Save professor note
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-2">
        {state.professors.length === 0 && (
          <p className="text-sm text-ink-500">No professor notes saved yet.</p>
        )}
        {state.professors.map((note) => (
          <div
            key={note.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-200 bg-white/75 px-4 py-3"
          >
            <div>
              <p className="flex items-center gap-2 font-semibold text-ink-950">
                {note.professor}
                {note.rating != null && (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brass-700">
                    <Star className="h-3.5 w-3.5 fill-brass-500 text-brass-500" />
                    {note.rating}
                  </span>
                )}
              </p>
              <p className="text-xs text-ink-500">
                {[note.department, note.collegeName, note.notes]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => openExternal(note.rmpUrl)}
              >
                RMP
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                className="btn-ghost text-red-600"
                onClick={() => removeProfessor(note.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
