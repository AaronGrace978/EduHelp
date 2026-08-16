import { type FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  WORKLOAD_CATEGORIES,
  WORKLOAD_PRIORITIES,
  WORKLOAD_STATUSES,
} from "@/lib/adminCatalog";
import type {
  WorkloadCategory,
  WorkloadItem,
  WorkloadPriority,
  WorkloadStatus,
} from "@/types";

export function WorkloadPage() {
  const {
    state,
    addWorkloadItem,
    updateWorkloadItem,
    removeWorkloadItem,
  } = useApp();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<WorkloadCategory>("academic_affairs");
  const [priority, setPriority] = useState<WorkloadPriority>("medium");
  const [status, setStatus] = useState<WorkloadStatus>("backlog");
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [effortHours, setEffortHours] = useState("");

  const openItems = state.workload.filter((w) => w.status !== "done");
  const hoursOpen = openItems.reduce(
    (sum, w) => sum + (w.effortHours ?? 0),
    0,
  );

  const byAssignee = useMemo(() => {
    const map = new Map<string, { name: string; hours: number; count: number }>();
    for (const item of openItems) {
      const node = state.orgNodes.find((n) => n.id === item.assigneeId);
      const key = item.assigneeId ?? "unassigned";
      const name = node
        ? `${node.title}${node.personName ? ` — ${node.personName}` : ""}`
        : "Unassigned";
      const prev = map.get(key) ?? { name, hours: 0, count: 0 };
      prev.hours += item.effortHours ?? 0;
      prev.count += 1;
      map.set(key, prev);
    }
    return [...map.values()].sort((a, b) => b.hours - a.hours || b.count - a.count);
  }, [openItems, state.orgNodes]);

  function onAdd(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const hours = effortHours.trim() ? Number(effortHours) : undefined;
    addWorkloadItem({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      priority,
      status,
      assigneeId: assigneeId || undefined,
      dueDate: dueDate || undefined,
      effortHours:
        hours != null && Number.isFinite(hours) ? hours : undefined,
    });
    setTitle("");
    setDescription("");
    setEffortHours("");
    setDueDate("");
  }

  const priorityTone: Record<WorkloadPriority, string> = {
    critical: "text-red-700",
    high: "text-amber-700",
    medium: "text-pine-700",
    low: "text-ink-500",
  };

  return (
    <div>
      <p className="section-kicker">Administrative operations</p>
      <h1 className="display-title mt-2">Workload</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Track presidential, dean, and director work — accreditation, enrollment,
        compliance, budget — and assign it against your campus hierarchy at{" "}
        {state.selectedCollege?.name ?? "your institution"}.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="rounded-xl border border-ink-200/80 bg-white/70 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-pine-600">
            Open items
          </p>
          <p className="font-display text-2xl font-semibold text-ink-950">
            {openItems.length}
          </p>
        </div>
        <div className="rounded-xl border border-ink-200/80 bg-white/70 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-pine-600">
            Effort hours
          </p>
          <p className="font-display text-2xl font-semibold text-ink-950">
            {hoursOpen}
          </p>
        </div>
      </div>

      {byAssignee.length > 0 && (
        <section className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-pine-600" />
            <h2 className="font-display text-xl font-semibold text-ink-950">
              Load by role
            </h2>
          </div>
          <div className="divide-y divide-ink-200/80 border-y border-ink-200/80">
            {byAssignee.map((row, i) => (
              <motion.div
                key={`${row.name}-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                className="flex flex-wrap items-baseline justify-between gap-2 py-3"
              >
                <p className="font-medium text-ink-900">{row.name}</p>
                <p className="text-sm text-ink-500">
                  {row.count} open · {row.hours}h
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form onSubmit={onAdd} className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Add work item
          </h2>
          <label>
            <span className="label">Title</span>
            <input
              className="field"
              placeholder="HLC evidence binder — Standard 4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span className="label">Description</span>
            <textarea
              className="field min-h-[88px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className="label">Category</span>
              <select
                className="field"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as WorkloadCategory)
                }
              >
                {WORKLOAD_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">Priority</span>
              <select
                className="field"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as WorkloadPriority)
                }
              >
                {WORKLOAD_PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">Status</span>
              <select
                className="field"
                value={status}
                onChange={(e) => setStatus(e.target.value as WorkloadStatus)}
              >
                {WORKLOAD_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">Assignee (hierarchy)</span>
              <select
                className="field"
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
              >
                <option value="">Unassigned</option>
                {state.orgNodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.title}
                    {n.personName ? ` — ${n.personName}` : ""}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">Due date</span>
              <input
                type="date"
                className="field"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            <label>
              <span className="label">Effort (hours)</span>
              <input
                className="field"
                inputMode="decimal"
                value={effortHours}
                onChange={(e) => setEffortHours(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className="btn-primary">
            <Plus className="h-4 w-4" />
            Add item
          </button>
          {state.orgNodes.length === 0 && (
            <p className="text-xs text-ink-500">
              Tip: load the Org Hierarchy template first so you can assign work
              to the President, Deans, and Directors.
            </p>
          )}
        </form>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Queue
          </h2>
          {state.workload.length === 0 && (
            <p className="text-sm text-ink-500">No administrative work logged yet.</p>
          )}
          {state.workload.map((item) => (
            <WorkloadCard
              key={item.id}
              item={item}
              assigneeLabel={
                state.orgNodes.find((n) => n.id === item.assigneeId)?.title
              }
              priorityTone={priorityTone[item.priority]}
              onStatus={(status) => updateWorkloadItem(item.id, { status })}
              onRemove={() => removeWorkloadItem(item.id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

function WorkloadCard({
  item,
  assigneeLabel,
  priorityTone,
  onStatus,
  onRemove,
}: {
  item: WorkloadItem;
  assigneeLabel?: string;
  priorityTone: string;
  onStatus: (status: WorkloadStatus) => void;
  onRemove: () => void;
}) {
  const category =
    WORKLOAD_CATEGORIES.find((c) => c.value === item.category)?.label ??
    item.category;

  return (
    <article className="rounded-2xl border border-ink-200/80 bg-white/75 px-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-pine-600">
            {category}
            {assigneeLabel ? ` · ${assigneeLabel}` : ""}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-ink-950">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-1 text-sm text-ink-500">{item.description}</p>
          )}
          <p className={`mt-2 text-xs font-semibold ${priorityTone}`}>
            {item.priority}
            {item.dueDate ? ` · due ${item.dueDate}` : ""}
            {item.effortHours != null ? ` · ${item.effortHours}h` : ""}
          </p>
        </div>
        <button type="button" className="btn-ghost text-red-700" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <label className="mt-3 block">
        <span className="label">Status</span>
        <select
          className="field"
          value={item.status}
          onChange={(e) => onStatus(e.target.value as WorkloadStatus)}
        >
          {WORKLOAD_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </article>
  );
}
