import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Cable, ExternalLink, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  CONNECTOR_AUTH,
  CONNECTOR_KINDS,
  CONNECTOR_PRESETS,
} from "@/lib/adminCatalog";
import { openExternal } from "@/lib/openExternal";
import type {
  ConnectorAuth,
  ConnectorKind,
  SystemConnector,
} from "@/types";

export function HarnessPage() {
  const {
    state,
    addConnector,
    updateConnector,
    removeConnector,
    seedConnectorPresets,
  } = useApp();

  const [name, setName] = useState("");
  const [kind, setKind] = useState<ConnectorKind>("ellucian_banner");
  const [endpointOrHost, setEndpointOrHost] = useState("");
  const [authType, setAuthType] =
    useState<ConnectorAuth>("institutional_sso");
  const [connectionNotes, setConnectionNotes] = useState("");
  const [templateLabel, setTemplateLabel] = useState("");
  const [templateBody, setTemplateBody] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected =
    state.connectors.find((c) => c.id === selectedId) ?? null;

  function onAdd(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    addConnector({
      name: name.trim(),
      kind,
      endpointOrHost: endpointOrHost.trim(),
      authType,
      connectionNotes: connectionNotes.trim() || undefined,
      queryTemplates: [],
      status: endpointOrHost.trim() ? "configured" : "planned",
      tags: [],
    });
    setName("");
    setEndpointOrHost("");
    setConnectionNotes("");
  }

  function addTemplateToSelected(e: FormEvent) {
    e.preventDefault();
    if (!selected || !templateLabel.trim() || !templateBody.trim()) return;
    updateConnector(selected.id, {
      queryTemplates: [
        ...selected.queryTemplates,
        {
          id: crypto.randomUUID(),
          label: templateLabel.trim(),
          body: templateBody.trim(),
        },
      ],
      status:
        selected.status === "planned" ? "configured" : selected.status,
    });
    setTemplateLabel("");
    setTemplateBody("");
  }

  return (
    <div>
      <p className="section-kicker">Generic integration harness</p>
      <h1 className="display-title mt-2">System connectors</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Plug institutional systems into Aaron Grace — Banner, PowerFAIDS,
        Oracle, SQL Server, PeopleSoft, Colleague, Workday, and custom APIs.
        Configurations stay local; use them as your ops playbook for the whole
        education ecosystem.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary"
          onClick={() => seedConnectorPresets()}
        >
          <Cable className="h-4 w-4" />
          Load ecosystem presets ({CONNECTOR_PRESETS.length})
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form onSubmit={onAdd} className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Add connector
          </h2>
          <label>
            <span className="label">Name</span>
            <input
              className="field"
              placeholder="Production Banner Ethos"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span className="label">System</span>
            <select
              className="field"
              value={kind}
              onChange={(e) => setKind(e.target.value as ConnectorKind)}
            >
              {CONNECTOR_KINDS.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="label">Endpoint / host / DSN</span>
            <input
              className="field"
              placeholder="https://… or host:1521/SERVICE"
              value={endpointOrHost}
              onChange={(e) => setEndpointOrHost(e.target.value)}
            />
          </label>
          <label>
            <span className="label">Auth</span>
            <select
              className="field"
              value={authType}
              onChange={(e) => setAuthType(e.target.value as ConnectorAuth)}
            >
              {CONNECTOR_AUTH.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="label">Connection notes</span>
            <textarea
              className="field min-h-[88px]"
              placeholder="Service account, schema, Ethos tenant, SSO app…"
              value={connectionNotes}
              onChange={(e) => setConnectionNotes(e.target.value)}
            />
          </label>
          <button type="submit" className="btn-primary">
            <Plus className="h-4 w-4" />
            Save connector
          </button>
          <p className="text-xs text-ink-500">
            Secrets stay on this device. Prefer institutional vaults for
            production credentials — store only references here.
          </p>
        </form>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Installed connectors
          </h2>
          {state.connectors.length === 0 && (
            <p className="text-sm text-ink-500">
              No connectors yet. Load presets or add Banner / Oracle / SQL
              manually.
            </p>
          )}
          {state.connectors.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}
              className={`rounded-2xl border px-4 py-4 ${
                selectedId === c.id
                  ? "border-pine-400 bg-pine-50/60"
                  : "border-ink-200/80 bg-white/75"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <button
                  type="button"
                  className="text-left"
                  onClick={() =>
                    setSelectedId((id) => (id === c.id ? null : c.id))
                  }
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-pine-600">
                    {CONNECTOR_KINDS.find((k) => k.value === c.kind)?.label ??
                      c.kind}{" "}
                    · {c.status}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink-950">
                    {c.name}
                  </h3>
                  <p className="mt-1 break-all text-sm text-ink-500">
                    {c.endpointOrHost || "No endpoint set"}
                  </p>
                </button>
                <div className="flex gap-1">
                  {/^https?:\/\//i.test(c.endpointOrHost) && (
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => openExternal(c.endpointOrHost)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn-ghost text-red-700"
                    onClick={() => {
                      removeConnector(c.id);
                      if (selectedId === c.id) setSelectedId(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <label className="mt-3 block">
                <span className="label">Status</span>
                <select
                  className="field"
                  value={c.status}
                  onChange={(e) =>
                    updateConnector(c.id, {
                      status: e.target.value as SystemConnector["status"],
                      lastCheckedAt: new Date().toISOString(),
                    })
                  }
                >
                  <option value="planned">Planned</option>
                  <option value="configured">Configured</option>
                  <option value="connected">Connected</option>
                  <option value="error">Error</option>
                  <option value="disabled">Disabled</option>
                </select>
              </label>
              {c.queryTemplates.length > 0 && (
                <div className="mt-3 space-y-2">
                  {c.queryTemplates.map((t) => (
                    <details
                      key={t.id}
                      className="rounded-xl border border-ink-200/70 bg-white/80 px-3 py-2"
                    >
                      <summary className="cursor-pointer text-sm font-semibold text-ink-800">
                        {t.label}
                      </summary>
                      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs text-ink-600">
                        {t.body}
                      </pre>
                    </details>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </section>
      </div>

      {selected && (
        <form
          onSubmit={addTemplateToSelected}
          className="mt-10 space-y-3 rounded-2xl border border-ink-200/80 bg-white/75 p-5"
        >
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Query / API template — {selected.name}
          </h2>
          <p className="text-sm text-ink-500">
            Store SQL, Ethos paths, or report names your IR / IT teams run
            against Oracle, SQL Server, or Banner.
          </p>
          <label>
            <span className="label">Template label</span>
            <input
              className="field"
              value={templateLabel}
              onChange={(e) => setTemplateLabel(e.target.value)}
              placeholder="Census headcount by college"
            />
          </label>
          <label>
            <span className="label">Body</span>
            <textarea
              className="field min-h-[120px] font-mono text-xs"
              value={templateBody}
              onChange={(e) => setTemplateBody(e.target.value)}
              placeholder="SELECT …"
            />
          </label>
          <button type="submit" className="btn-primary">
            <Plus className="h-4 w-4" />
            Attach template
          </button>
        </form>
      )}
    </div>
  );
}
