import { type FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Network, Plus, Trash2, Users } from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  HIERARCHY_SEED,
  ORG_LEVELS,
  levelLabel,
  levelRank,
} from "@/lib/adminCatalog";
import type { OrgNode, OrgRoleLevel } from "@/types";

type TreeNode = OrgNode & { children: TreeNode[] };

function buildTree(nodes: OrgNode[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  nodes.forEach((n) => map.set(n.id, { ...n, children: [] }));
  const roots: TreeNode[] = [];
  map.forEach((node) => {
    if (node.reportsToId && map.has(node.reportsToId)) {
      map.get(node.reportsToId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  const sortRec = (list: TreeNode[]) => {
    list.sort(
      (a, b) =>
        levelRank(a.level) - levelRank(b.level) ||
        a.title.localeCompare(b.title),
    );
    list.forEach((c) => sortRec(c.children));
  };
  sortRec(roots);
  return roots;
}

function TreeBranch({
  node,
  depth,
  onSelect,
  selectedId,
}: {
  node: TreeNode;
  depth: number;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  const selected = selectedId === node.id;
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        className={`w-full rounded-xl px-3 py-2.5 text-left transition ${
          selected
            ? "bg-pine-700 text-white shadow-lift"
            : "hover:bg-pine-50 text-ink-800"
        }`}
        style={{ paddingLeft: `${12 + depth * 18}px` }}
      >
        <p className="font-display text-base font-semibold leading-tight">
          {node.title}
        </p>
        <p
          className={`mt-0.5 text-xs ${selected ? "text-brass-300" : "text-ink-500"}`}
        >
          {node.personName || "Vacant"} · {levelLabel(node.level)}
          {node.unit ? ` · ${node.unit}` : ""}
        </p>
      </button>
      {node.children.length > 0 && (
        <ul className="mt-1 space-y-1">
          {node.children.map((child) => (
            <TreeBranch
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function HierarchyPage() {
  const {
    state,
    addOrgNode,
    updateOrgNode,
    removeOrgNode,
    seedOrgHierarchy,
    clearOrgHierarchy,
  } = useApp();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [personName, setPersonName] = useState("");
  const [level, setLevel] = useState<OrgRoleLevel>("dean");
  const [unit, setUnit] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reportsToId, setReportsToId] = useState("");
  const [fte, setFte] = useState("1");
  const [notes, setNotes] = useState("");

  const tree = useMemo(() => buildTree(state.orgNodes), [state.orgNodes]);
  const selected = state.orgNodes.find((n) => n.id === selectedId) ?? null;

  const byLevel = useMemo(() => {
    const counts = new Map<OrgRoleLevel, number>();
    state.orgNodes.forEach((n) => {
      counts.set(n.level, (counts.get(n.level) ?? 0) + 1);
    });
    return ORG_LEVELS.map((l) => ({
      ...l,
      count: counts.get(l.value) ?? 0,
    })).filter((l) => l.count > 0);
  }, [state.orgNodes]);

  function onAdd(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const n = fte.trim() ? Number(fte) : undefined;
    addOrgNode({
      title: title.trim(),
      personName: personName.trim(),
      level,
      unit: unit.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      reportsToId: reportsToId || null,
      notes: notes.trim() || undefined,
      fte: n != null && Number.isFinite(n) ? n : undefined,
    });
    setTitle("");
    setPersonName("");
    setUnit("");
    setEmail("");
    setPhone("");
    setNotes("");
  }

  function loadSelectedIntoForm(node: OrgNode) {
    setSelectedId(node.id);
    setTitle(node.title);
    setPersonName(node.personName);
    setLevel(node.level);
    setUnit(node.unit ?? "");
    setEmail(node.email ?? "");
    setPhone(node.phone ?? "");
    setReportsToId(node.reportsToId ?? "");
    setFte(node.fte != null ? String(node.fte) : "");
    setNotes(node.notes ?? "");
  }

  function onSaveSelected(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const n = fte.trim() ? Number(fte) : undefined;
    updateOrgNode(selected.id, {
      title: title.trim() || selected.title,
      personName: personName.trim(),
      level,
      unit: unit.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      reportsToId: reportsToId || null,
      notes: notes.trim() || undefined,
      fte: n != null && Number.isFinite(n) ? n : undefined,
    });
  }

  return (
    <div>
      <p className="section-kicker">Institutional leadership</p>
      <h1 className="display-title mt-2">Org hierarchy</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Map the whole campus ecosystem — Board, President, Provost, Deans,
        Directors, Chairs — and keep reporting lines ready for workload and
        systems work at{" "}
        {state.selectedCollege?.name ?? "your institution"}.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary"
          onClick={() => seedOrgHierarchy()}
        >
          <Network className="h-4 w-4" />
          Load leadership template
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            clearOrgHierarchy();
            setSelectedId(null);
          }}
          disabled={state.orgNodes.length === 0}
        >
          Clear hierarchy
        </button>
      </div>

      {byLevel.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {byLevel.map((l, i) => (
            <motion.div
              key={l.value}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              className="rounded-xl border border-ink-200/80 bg-white/70 px-3 py-2"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-pine-600">
                {l.label}
              </p>
              <p className="font-display text-xl font-semibold text-ink-950">
                {l.count}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-pine-600" />
            <h2 className="font-display text-xl font-semibold text-ink-950">
              Reporting tree
            </h2>
          </div>
          {tree.length === 0 ? (
            <p className="text-sm text-ink-500">
              Empty chart. Load the {HIERARCHY_SEED.length}-role leadership
              template (President → Deans → Directors) or add roles manually.
            </p>
          ) : (
            <ul className="space-y-1 rounded-2xl border border-ink-200/80 bg-white/70 p-2">
              {tree.map((node) => (
                <TreeBranch
                  key={node.id}
                  node={node}
                  depth={0}
                  onSelect={(id) => {
                    const n = state.orgNodes.find((x) => x.id === id);
                    if (n) loadSelectedIntoForm(n);
                  }}
                  selectedId={selectedId}
                />
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-950">
            {selected ? "Edit role" : "Add role"}
          </h2>
          <form
            onSubmit={selected ? onSaveSelected : onAdd}
            className="mt-4 space-y-3"
          >
            <label>
              <span className="label">Title</span>
              <input
                className="field"
                placeholder="Dean of Education"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <span className="label">Person</span>
              <input
                className="field"
                placeholder="Name (or leave vacant)"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
              />
            </label>
            <label>
              <span className="label">Level</span>
              <select
                className="field"
                value={level}
                onChange={(e) => setLevel(e.target.value as OrgRoleLevel)}
              >
                {ORG_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">Unit / office</span>
              <input
                className="field"
                placeholder="College of Education"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </label>
            <label>
              <span className="label">Reports to</span>
              <select
                className="field"
                value={reportsToId}
                onChange={(e) => setReportsToId(e.target.value)}
              >
                <option value="">— Top of chart / none —</option>
                {state.orgNodes
                  .filter((n) => n.id !== selectedId)
                  .map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.title}
                      {n.personName ? ` (${n.personName})` : ""}
                    </option>
                  ))}
              </select>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label>
                <span className="label">Email</span>
                <input
                  className="field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <span className="label">Phone</span>
                <input
                  className="field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>
            <label>
              <span className="label">FTE</span>
              <input
                className="field"
                inputMode="decimal"
                value={fte}
                onChange={(e) => setFte(e.target.value)}
              />
            </label>
            <label>
              <span className="label">Notes</span>
              <textarea
                className="field min-h-[80px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button type="submit" className="btn-primary">
                <Plus className="h-4 w-4" />
                {selected ? "Save role" : "Add role"}
              </button>
              {selected && (
                <>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setSelectedId(null);
                      setTitle("");
                      setPersonName("");
                      setUnit("");
                      setEmail("");
                      setPhone("");
                      setReportsToId("");
                      setFte("1");
                      setNotes("");
                      setLevel("dean");
                    }}
                  >
                    New role
                  </button>
                  <button
                    type="button"
                    className="btn-ghost text-red-700"
                    onClick={() => {
                      removeOrgNode(selected.id);
                      setSelectedId(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
