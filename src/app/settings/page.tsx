"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  Check,
  DollarSign,
  Eye,
  EyeOff,
  Info,
  Languages,
  Lock,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  DEFAULT_SETTINGS,
  hasAnyKey,
  loadSettings,
  saveSettings,
  clearSettings,
  type ClientAISettings,
} from "@/lib/client-settings";
import { OLLAMA_CLOUD_MODEL_FAMILIES } from "@/lib/ai-models";
import { cn } from "@/lib/cn";
import type {
  AIProvider,
  ResponseLanguage,
} from "@/lib/eligibility/ai-types";

interface ProviderSpec {
  id: AIProvider | "auto";
  label: string;
  blurb: string;
  href?: string;
}

const PROVIDERS: ProviderSpec[] = [
  {
    id: "auto",
    label: "Auto",
    blurb: "Use the first provider with a key (OpenAI → Anthropic → OpenRouter → Ollama).",
  },
  {
    id: "openai",
    label: "OpenAI",
    blurb: "GPT-5.5 frontier · GPT-5.4-mini fast / cheap.",
    href: "https://platform.openai.com/api-keys",
  },
  {
    id: "anthropic",
    label: "Anthropic",
    blurb: "Claude Opus 4.7 / Sonnet 4.6 / Haiku 4.5.",
    href: "https://console.anthropic.com/settings/keys",
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    blurb: "One key, every model — Claude, GPT, Gemini, GLM, DeepSeek, Kimi…",
    href: "https://openrouter.ai/keys",
  },
  {
    id: "ollama",
    label: "Ollama Cloud",
    blurb: "Open-weights frontier (gpt-oss, kimi, glm, deepseek, gemma…).",
    href: "https://ollama.com/settings/keys",
  },
];

const OPENAI_PRESETS = [
  { id: "gpt-5.5", label: "gpt-5.5 — frontier (1M ctx)" },
  { id: "gpt-5.4-mini", label: "gpt-5.4-mini — fast & cheap" },
  { id: "gpt-5.4-nano", label: "gpt-5.4-nano — fastest" },
  { id: "gpt-4.1", label: "gpt-4.1 — legacy flagship" },
  { id: "gpt-4.1-mini", label: "gpt-4.1-mini — legacy fast" },
  { id: "gpt-4o-mini", label: "gpt-4o-mini — legacy budget" },
];

const ANTHROPIC_PRESETS = [
  { id: "claude-opus-4-7", label: "claude-opus-4-7 — most capable" },
  { id: "claude-sonnet-4-6", label: "claude-sonnet-4-6 — balanced" },
  { id: "claude-haiku-4-5", label: "claude-haiku-4-5 — fastest" },
  { id: "claude-opus-4-6", label: "claude-opus-4-6 — legacy Opus" },
  { id: "claude-sonnet-4-5", label: "claude-sonnet-4-5 — legacy Sonnet" },
];

const OPENROUTER_PRESETS = [
  { id: "anthropic/claude-sonnet-4.6", label: "anthropic/claude-sonnet-4.6" },
  { id: "anthropic/claude-opus-4.7", label: "anthropic/claude-opus-4.7" },
  { id: "~anthropic/claude-sonnet-latest", label: "~anthropic/claude-sonnet-latest (always latest)" },
  { id: "openai/gpt-5.5", label: "openai/gpt-5.5" },
  { id: "openai/gpt-5.4-mini", label: "openai/gpt-5.4-mini" },
  { id: "google/gemini-3-flash-preview", label: "google/gemini-3-flash-preview" },
  { id: "z-ai/glm-5.1", label: "z-ai/glm-5.1" },
  { id: "deepseek/deepseek-v4-pro", label: "deepseek/deepseek-v4-pro" },
  { id: "moonshotai/kimi-k2.6", label: "moonshotai/kimi-k2.6" },
];

const OLLAMA_PRESETS = OLLAMA_CLOUD_MODEL_FAMILIES.map((m) => ({
  id: m.family,
  label: `${m.family} — ${m.blurb}`,
}));

export default function SettingsPage() {
  const [settings, setSettings] = useState<ClientAISettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setLoaded(true);
  }, []);

  function update<K extends keyof ClientAISettings>(
    key: K,
    value: ClientAISettings[K],
  ) {
    setSettings((s) => ({ ...s, [key]: value }));
    setSaved(false);
  }

  function onSave() {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function onClear() {
    if (!confirm("Clear all saved AI settings on this device?")) return;
    clearSettings();
    setSettings(DEFAULT_SETTINGS);
    setSaved(false);
  }

  if (!loaded) {
    return (
      <div className="container-page py-16">
        <div className="card mx-auto max-w-3xl">Loading…</div>
      </div>
    );
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="pill-brand">
          <Sparkles className="h-3.5 w-3.5" /> AI provider settings
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Bring your own AI.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Pick the provider, paste your API key, choose a model. Everything
          stays in this browser only — your keys are never stored on EduHelp's
          servers.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl">
        <div className="card">
          <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
            <Lock className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              <p className="font-semibold">Your keys live on your device.</p>
              <p className="mt-1 text-brand-900/80">
                EduHelp stores them in <code className="rounded bg-white/70 px-1 py-0.5 text-[11px]">localStorage</code>{" "}
                and forwards them in HTTP headers only when you analyze a
                document. They are never written to disk on the server, never
                logged, never shared.
              </p>
            </div>
          </div>

          {/* Provider picker */}
          <div className="mt-6">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active provider
            </label>
            <div className="mt-2 grid gap-2 sm:grid-cols-5">
              {PROVIDERS.map((p) => {
                const active = settings.provider === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => update("provider", p.id)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left text-xs transition",
                      active
                        ? "border-brand-500 bg-brand-50 text-brand-800"
                        : "border-slate-200 bg-white hover:border-slate-300",
                    )}
                  >
                    <span className="block text-sm font-semibold text-slate-900">
                      {p.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
                      {p.blurb}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Languages className="mr-1 inline h-3.5 w-3.5" />
              Output language
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:max-w-xs">
              {[
                { id: "en" as ResponseLanguage, label: "English" },
                { id: "es" as ResponseLanguage, label: "Español" },
              ].map((opt) => {
                const active = settings.language === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => update("language", opt.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-sm font-semibold transition",
                      active
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500">
              Affects AI narrative + chat answers. State citations stay in
              English (legal accuracy).
            </p>
          </div>

          <ProviderSection
            title="OpenAI"
            href="https://platform.openai.com/api-keys"
            apiKey={settings.openaiKey}
            onApiKey={(v) => update("openaiKey", v)}
            model={settings.openaiModel}
            onModel={(v) => update("openaiModel", v)}
            presets={OPENAI_PRESETS}
            keyPlaceholder="sk-…"
            modelHelp="See https://developers.openai.com/api/docs/models for all options."
          />
          <ProviderSection
            title="Anthropic"
            href="https://console.anthropic.com/settings/keys"
            apiKey={settings.anthropicKey}
            onApiKey={(v) => update("anthropicKey", v)}
            model={settings.anthropicModel}
            onModel={(v) => update("anthropicModel", v)}
            presets={ANTHROPIC_PRESETS}
            keyPlaceholder="sk-ant-…"
            modelHelp="See https://docs.anthropic.com/en/docs/about-claude/models/all-models."
          />
          <ProviderSection
            title="OpenRouter"
            href="https://openrouter.ai/keys"
            apiKey={settings.openrouterKey}
            onApiKey={(v) => update("openrouterKey", v)}
            model={settings.openrouterModel}
            onModel={(v) => update("openrouterModel", v)}
            presets={OPENROUTER_PRESETS}
            keyPlaceholder="sk-or-…"
            modelHelp="One key, hundreds of models — see https://openrouter.ai/models."
            extra={
              <TextField
                label="Site URL (sent as HTTP-Referer)"
                value={settings.openrouterSiteUrl}
                onChange={(v) => update("openrouterSiteUrl", v)}
                placeholder="https://eduhelp.app"
              />
            }
          />
          <ProviderSection
            title="Ollama Cloud"
            href="https://ollama.com/settings/keys"
            apiKey={settings.ollamaKey}
            onApiKey={(v) => update("ollamaKey", v)}
            model={settings.ollamaModel}
            onModel={(v) => update("ollamaModel", v)}
            presets={OLLAMA_PRESETS}
            keyPlaceholder="ollama-…"
            modelHelp="Use a tag from `curl -H 'Authorization: Bearer $OLLAMA_API_KEY' https://ollama.com/api/tags`. See https://docs.ollama.com/cloud."
            extra={
              <TextField
                label="API base URL"
                value={settings.ollamaBaseUrl}
                onChange={(v) => update("ollamaBaseUrl", v)}
                placeholder="https://ollama.com/api"
              />
            }
          />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
            <div className="text-xs text-slate-500">
              {hasAnyKey(settings)
                ? "At least one key is configured. EduHelp will use it on the next analysis."
                : "No keys yet — EduHelp will run on the rules engine only."}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onClear}
                className="btn-secondary px-4 py-2 text-xs"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear all
              </button>
              <button
                type="button"
                onClick={onSave}
                className="btn-primary px-4 py-2 text-xs"
              >
                {saved ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Saved
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" /> Save settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <CostEstimator settings={settings} />

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
            <div>
              <p className="font-semibold text-slate-900">
                Don't have a key?
              </p>
              <p className="mt-1">
                EduHelp's deterministic rules engine still produces a full
                eligibility report for any of the 7 supported states without
                any AI key — AI just adds a parent-friendly narrative on top.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PresetItem {
  id: string;
  label: string;
}

/**
 * Per-1M-token rough USD pricing for typical models. Used as a coarse
 * estimator only — actual prices change frequently.
 */
const PRICE_TABLE: Record<string, { in: number; out: number }> = {
  "gpt-5.5": { in: 5, out: 15 },
  "gpt-5.4-mini": { in: 0.6, out: 2.4 },
  "gpt-5.4-nano": { in: 0.15, out: 0.6 },
  "gpt-4.1": { in: 5, out: 15 },
  "gpt-4.1-mini": { in: 0.6, out: 2.4 },
  "gpt-4o-mini": { in: 0.15, out: 0.6 },
  "claude-opus-4-7": { in: 15, out: 75 },
  "claude-sonnet-4-6": { in: 3, out: 15 },
  "claude-haiku-4-5": { in: 0.8, out: 4 },
  "anthropic/claude-sonnet-4.6": { in: 3, out: 15 },
  "anthropic/claude-opus-4.7": { in: 15, out: 75 },
  "openai/gpt-5.5": { in: 5, out: 15 },
  "google/gemini-3-flash-preview": { in: 0.3, out: 1.2 },
  "z-ai/glm-5.1": { in: 0.5, out: 2 },
  "deepseek/deepseek-v4-pro": { in: 0.5, out: 2 },
  "moonshotai/kimi-k2.6": { in: 0.5, out: 2 },
  "gpt-oss:120b": { in: 0, out: 0 },
};

function CostEstimator({ settings }: { settings: ClientAISettings }) {
  const summary = useMemo(() => {
    const provider = settings.provider === "auto"
      ? hasAnyKey(settings)
        ? (["openai", "anthropic", "openrouter", "ollama"] as AIProvider[]).find(
            (p) => providerKey(settings, p),
          ) ?? "openai"
        : null
      : settings.provider;
    if (!provider) return null;
    const model =
      provider === "openai"
        ? settings.openaiModel
        : provider === "anthropic"
          ? settings.anthropicModel
          : provider === "openrouter"
            ? settings.openrouterModel
            : settings.ollamaModel;
    const price = PRICE_TABLE[model];
    if (!price) return { provider, model, costPerAnalysis: null as null };
    // Typical usage: ~3000 input tokens (doc + payload), ~800 output tokens.
    const cost = (3000 * price.in + 800 * price.out) / 1_000_000;
    return { provider, model, costPerAnalysis: cost };
  }, [settings]);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
      <div className="flex items-start gap-3">
        <DollarSign className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600" />
        <div>
          <p className="font-semibold text-slate-900">Approximate cost</p>
          {!summary && (
            <p className="mt-1">
              No provider with a key yet — running on the free deterministic
              rules engine.
            </p>
          )}
          {summary && summary.costPerAnalysis !== null && (
            <p className="mt-1">
              ~<strong>{formatCost(summary.costPerAnalysis)}</strong> per typical
              analysis (3K input / 800 output tokens) using{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                {summary.provider}:{summary.model}
              </code>
              . Chat replies and goal reviews are usually cheaper.
            </p>
          )}
          {summary && summary.costPerAnalysis === null && (
            <p className="mt-1">
              Pricing for{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                {summary.model}
              </code>{" "}
              isn't in our table — check the provider's pricing page for a
              quote.
            </p>
          )}
          <p className="mt-2 text-[11px] text-slate-400">
            Estimates only — actual provider pricing may differ. Rules engine
            is always free.
          </p>
        </div>
      </div>
    </div>
  );
}

function formatCost(usd: number): string {
  if (usd < 0.001) return "<$0.001";
  if (usd < 0.01) return `$${usd.toFixed(4)}`;
  if (usd < 1) return `$${usd.toFixed(3)}`;
  return `$${usd.toFixed(2)}`;
}

function providerKey(s: ClientAISettings, p: AIProvider): string {
  switch (p) {
    case "openai":
      return s.openaiKey;
    case "anthropic":
      return s.anthropicKey;
    case "openrouter":
      return s.openrouterKey;
    case "ollama":
      return s.ollamaKey;
  }
}

function ProviderSection({
  title,
  href,
  apiKey,
  onApiKey,
  model,
  onModel,
  presets,
  keyPlaceholder,
  modelHelp,
  extra,
}: {
  title: string;
  href?: string;
  apiKey: string;
  onApiKey: (v: string) => void;
  model: string;
  onModel: (v: string) => void;
  presets: PresetItem[];
  keyPlaceholder: string;
  modelHelp?: string;
  extra?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-brand-600" />
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-brand-700 hover:underline"
          >
            Get API key →
          </a>
        )}
      </div>

      <div className="mt-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          API key
        </label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type={show ? "text" : "password"}
            value={apiKey}
            onChange={(e) => onApiKey(e.target.value)}
            placeholder={keyPlaceholder}
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="btn-secondary px-3 py-2 text-xs"
            aria-label={show ? "Hide key" : "Show key"}
          >
            {show ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Model
        </label>
        <div className="mt-1 grid gap-2 sm:grid-cols-2">
          <input
            type="text"
            value={model}
            onChange={(e) => onModel(e.target.value)}
            placeholder={presets[0]?.id}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
          <select
            value={presets.some((p) => p.id === model) ? model : ""}
            onChange={(e) => {
              if (e.target.value) onModel(e.target.value);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          >
            <option value="">— pick a preset —</option>
            {presets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        {modelHelp && (
          <p className="mt-1.5 text-[11px] text-slate-500">{modelHelp}</p>
        )}
      </div>

      {extra && <div className="mt-3">{extra}</div>}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
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
