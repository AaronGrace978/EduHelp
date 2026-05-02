/**
 * Centralized model catalog for EduHelp.
 *
 * Source of truth for default model IDs and the curated list of frontier /
 * cloud models that EduHelp has been tested or wired against.
 *
 * Provider docs:
 *  - OpenAI:      https://developers.openai.com/api/docs/models
 *  - Anthropic:   https://docs.anthropic.com/en/docs/about-claude/models/all-models
 *  - OpenRouter:  https://openrouter.ai/models
 *  - Ollama Cloud:https://docs.ollama.com/cloud  ·  https://ollama.com/search?c=cloud
 */

// ─── OpenAI ───────────────────────────────────────────────────────────────────
/** OpenAI Chat Completions / Responses — newest frontier reasoning model. */
export const DEFAULT_OPENAI_MODEL = "gpt-5.5";

export const OPENAI_MODELS = {
  /** Flagship — best for complex reasoning + coding (1M ctx). */
  flagship: "gpt-5.5",
  /** Mid-tier — fast, cheaper, 1M ctx. */
  mid: "gpt-5.4-mini",
  /** Tiny — fastest, lowest cost, 400K ctx. */
  nano: "gpt-5.4-nano",
  /** Previous-gen non-reasoning model still useful for low-latency. */
  legacyFast: "gpt-4.1-mini",
  /** Previous-gen flagship. */
  legacyFlagship: "gpt-4.1",
} as const;

// ─── Anthropic ────────────────────────────────────────────────────────────────
/** Anthropic Messages API — balanced default (Sonnet 4.6, 1M ctx). */
export const DEFAULT_ANTHROPIC_MODEL = "claude-sonnet-4-6";

export const ANTHROPIC_MODELS = {
  /** Most capable — agentic coding + complex reasoning, 1M ctx. */
  opus: "claude-opus-4-7",
  /** Balanced — speed + intelligence, 1M ctx (default). */
  sonnet: "claude-sonnet-4-6",
  /** Fastest — near-frontier, 200K ctx. */
  haiku: "claude-haiku-4-5",
  /** Previous Opus. */
  legacyOpus: "claude-opus-4-6",
  /** Previous Sonnet. */
  legacySonnet: "claude-sonnet-4-5",
} as const;

// ─── OpenRouter ───────────────────────────────────────────────────────────────
/** OpenRouter unified slug — defaults to Claude Sonnet 4.6 via OpenRouter. */
export const DEFAULT_OPENROUTER_MODEL = "anthropic/claude-sonnet-4.6";

/**
 * A small curated set of OpenRouter slugs that work well for EduHelp.
 * Many more available — see https://openrouter.ai/models.
 */
export const OPENROUTER_MODELS = {
  /** "Always latest Sonnet" alias. */
  claudeSonnetLatest: "~anthropic/claude-sonnet-latest",
  /** Pinned Claude Sonnet 4.6. */
  claudeSonnet46: "anthropic/claude-sonnet-4.6",
  /** Pinned Claude Opus 4.7. */
  claudeOpus47: "anthropic/claude-opus-4.7",
  /** OpenAI flagship through OpenRouter. */
  gpt55: "openai/gpt-5.5",
  /** OpenAI mid-tier through OpenRouter. */
  gpt54Mini: "openai/gpt-5.4-mini",
  /** Google flagship via OR. */
  gemini3Flash: "google/gemini-3-flash-preview",
  /** Z.ai GLM 5.1 — strong agentic coding. */
  glm51: "z-ai/glm-5.1",
  /** DeepSeek V4 flagship. */
  deepseekV4Pro: "deepseek/deepseek-v4-pro",
  /** Kimi K2.6 multimodal. */
  kimiK26: "moonshotai/kimi-k2.6",
} as const;

// ─── Ollama Cloud ─────────────────────────────────────────────────────────────
/**
 * Ollama **remote** API (`OLLAMA_API_KEY` + `https://ollama.com/api/chat`) — use
 * the catalog name as shown by `curl https://ollama.com/api/tags`, e.g.
 * `gpt-oss:120b`. Local CLI cloud-offload uses `*-cloud` tags
 * (e.g. `gpt-oss:120b-cloud`).
 *
 * @see https://docs.ollama.com/cloud
 */
export const DEFAULT_OLLAMA_MODEL = "gpt-oss:120b";

/**
 * Cloud model families currently published in Ollama's cloud catalog
 * (https://ollama.com/search?c=cloud).
 *
 * The Ollama API expects a fully qualified `model:tag`. The exact tag varies
 * per family and may include sizes (e.g. `glm-5.1:latest`, `gemma4:31b`,
 * `qwen3.5:122b`). After setting `OLLAMA_API_KEY`, list real tags with:
 *
 *   curl -H "Authorization: Bearer $OLLAMA_API_KEY" https://ollama.com/api/tags
 */
export const OLLAMA_CLOUD_MODEL_FAMILIES = [
  // Newest frontier
  { family: "kimi-k2.6", capabilities: ["vision", "tools", "thinking"], blurb: "Multimodal agentic, long-horizon coding & swarm orchestration." },
  { family: "glm-5.1", capabilities: ["tools", "thinking"], blurb: "Z.ai flagship for agentic engineering; SOTA on SWE-Bench Pro." },
  { family: "deepseek-v4-flash", capabilities: ["tools", "thinking"], blurb: "MoE 284B/13B active, 1M ctx, fast reasoning." },
  { family: "deepseek-v4-pro", capabilities: ["tools", "thinking"], blurb: "Frontier MoE w/ 1M ctx and three reasoning modes." },
  { family: "gemma4", capabilities: ["vision", "tools", "thinking", "audio"], blurb: "Google open-weights, frontier per-size." },
  { family: "qwen3.5", capabilities: ["vision", "tools", "thinking"], blurb: "Alibaba multimodal family, 0.8B → 122B." },
  { family: "qwen3-coder-next", capabilities: ["tools"], blurb: "Coding-focused agentic model from Alibaba." },
  { family: "ministral-3", capabilities: ["vision", "tools"], blurb: "Mistral edge family, 3B / 8B / 14B." },
  { family: "devstral-small-2", capabilities: ["vision", "tools"], blurb: "24B software-engineering agent model." },
  { family: "nemotron-3-super", capabilities: ["tools", "thinking"], blurb: "NVIDIA 120B MoE (12B active) for multi-agent." },
  { family: "qwen3-next", capabilities: ["tools", "thinking"], blurb: "Qwen3-Next 80B — efficient + fast inference." },
  { family: "rnj-1", capabilities: ["tools"], blurb: "Essential AI 8B — code/STEM, MIT license." },
  { family: "kimi-k2.5", capabilities: ["vision", "tools", "thinking"], blurb: "Multimodal agentic, instant + thinking modes." },
  { family: "nemotron-3-nano", capabilities: ["tools", "thinking"], blurb: "NVIDIA efficient agentic, 4B / 30B." },
  { family: "minimax-m2.7", capabilities: ["tools", "thinking"], blurb: "MiniMax M2 series — coding + agentic." },
  { family: "glm-5", capabilities: ["tools", "thinking"], blurb: "Z.ai 744B MoE (40B active), long-horizon tasks." },
  { family: "minimax-m2.5", capabilities: ["tools", "thinking"], blurb: "MiniMax-M2.5 — productivity + coding." },
  { family: "devstral-2", capabilities: ["tools"], blurb: "123B software-engineering agent model." },
  { family: "gemini-3-flash-preview", capabilities: ["vision", "tools", "thinking"], blurb: "Google Gemini 3 Flash — frontier intelligence at speed." },
  { family: "cogito-2.1", capabilities: [], blurb: "Cogito 671B instruction-tuned, MIT license." },
  // OpenAI gpt-oss
  { family: "gpt-oss", capabilities: ["tools", "thinking"], blurb: "OpenAI open-weights — 20B + 120B, 128K ctx." },
] as const;

/** Resolves `OLLAMA_BASE_URL` to a full `/api/chat` URL per Ollama Cloud docs. */
export function resolveOllamaChatEndpoint(): string {
  const raw = (
    process.env.OLLAMA_BASE_URL ?? "https://ollama.com/api"
  ).replace(/\/$/, "");
  if (/\/chat$/i.test(raw)) return raw;
  if (/\/api$/i.test(raw)) return `${raw}/chat`;
  return `${raw}/api/chat`;
}
