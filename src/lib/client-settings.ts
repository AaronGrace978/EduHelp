"use client";

/**
 * Client-side AI provider settings, persisted in localStorage.
 *
 * IMPORTANT: API keys are stored in the user's browser only. They are sent as
 * HTTP headers to /api/analyze, where the server uses them for a single
 * outbound API call and discards them. They are never persisted server-side.
 *
 * If no provider is configured here, EduHelp falls back to whatever
 * env-var keys the server has — and if neither is set, returns the
 * deterministic rules-engine output without any AI narrative.
 */

import type { AIProvider } from "@/lib/eligibility/ai-types";

export const SETTINGS_STORAGE_KEY = "eduhelp.settings.v1";

export interface ClientAISettings {
  provider: AIProvider | "auto";
  openaiKey: string;
  openaiModel: string;
  anthropicKey: string;
  anthropicModel: string;
  openrouterKey: string;
  openrouterModel: string;
  openrouterSiteUrl: string;
  ollamaKey: string;
  ollamaModel: string;
  ollamaBaseUrl: string;
}

export const DEFAULT_SETTINGS: ClientAISettings = {
  provider: "auto",
  openaiKey: "",
  openaiModel: "gpt-5.5",
  anthropicKey: "",
  anthropicModel: "claude-sonnet-4-6",
  openrouterKey: "",
  openrouterModel: "anthropic/claude-sonnet-4.6",
  openrouterSiteUrl: "https://eduhelp.app",
  ollamaKey: "",
  ollamaModel: "gpt-oss:120b",
  ollamaBaseUrl: "https://ollama.com/api",
};

export function loadSettings(): ClientAISettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<ClientAISettings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: ClientAISettings) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(s));
  } catch {
    // swallow — quota / private mode
  }
}

export function clearSettings() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SETTINGS_STORAGE_KEY);
}

/**
 * Convert a settings object into the request headers EduHelp's API
 * routes understand. Empty / unused fields are omitted.
 */
export function settingsToHeaders(s: ClientAISettings): Record<string, string> {
  const h: Record<string, string> = {};
  if (s.provider && s.provider !== "auto") h["x-eduhelp-provider"] = s.provider;

  // Pick which key/model to send based on the chosen (or auto) provider.
  const candidates: AIProvider[] =
    s.provider === "auto"
      ? ["openai", "anthropic", "openrouter", "ollama"]
      : [s.provider];

  for (const p of candidates) {
    const key = providerKey(s, p);
    if (!key) continue;
    h["x-eduhelp-provider"] = p;
    h["x-eduhelp-key"] = key;
    const model = providerModel(s, p);
    if (model) h["x-eduhelp-model"] = model;
    if (p === "openrouter" && s.openrouterSiteUrl)
      h["x-eduhelp-openrouter-site"] = s.openrouterSiteUrl;
    if (p === "ollama" && s.ollamaBaseUrl)
      h["x-eduhelp-ollama-base"] = s.ollamaBaseUrl;
    break;
  }
  return h;
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

function providerModel(s: ClientAISettings, p: AIProvider): string {
  switch (p) {
    case "openai":
      return s.openaiModel;
    case "anthropic":
      return s.anthropicModel;
    case "openrouter":
      return s.openrouterModel;
    case "ollama":
      return s.ollamaModel;
  }
}

export function hasAnyKey(s: ClientAISettings): boolean {
  return Boolean(
    s.openaiKey || s.anthropicKey || s.openrouterKey || s.ollamaKey,
  );
}
