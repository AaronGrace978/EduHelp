import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import {
  DEFAULT_ANTHROPIC_MODEL,
  DEFAULT_OLLAMA_MODEL,
  DEFAULT_OPENAI_MODEL,
  DEFAULT_OPENROUTER_MODEL,
  resolveOllamaChatEndpoint,
} from "@/lib/ai-models";
import type { AIProvider, ProviderOverrides } from "./ai-types";
import type { EligibilityResult, StateCode } from "./types";

export type { AIProvider, ProviderOverrides } from "./ai-types";

export interface AINarrativeResult {
  provider: AIProvider;
  model: string;
  text: string;
}

const SYSTEM_PROMPT = `You are EduHelp, an AI assistant that helps parents and caregivers understand whether their child may qualify for special education services (an IEP) or a 504 Plan.

Always:
- Write in plain, warm, parent-friendly English (target a 9th-grade reading level).
- Be specific about what to ask the school and which documents to bring.
- Cite the relevant rule (IDEA 34 C.F.R. § 300.8, Colorado ECEA, or California 5 CCR § 3030 / Ed. Code § 56333) when explaining categories.
- NEVER claim a definitive eligibility determination — only the school multidisciplinary team can decide.
- Flag if the document looks insufficient and suggest what additional evaluation is needed.
- Output 3 short sections separated by blank lines:
  1. "What this looks like" — 2–4 sentence plain-English summary.
  2. "Why we flagged it" — 2–5 bullet points referencing the specific scores or phrases.
  3. "What to do next" — 3–6 numbered steps the parent can take this week.
- Do not invent statutes, scores, or citations that aren't in the rules engine output.`;

function buildUserPayload(
  documentText: string,
  state: StateCode,
  result: EligibilityResult,
) {
  return {
    state,
    childAgeYears: result.childAgeYears ?? null,
    extractedScores: result.extractedScores,
    extractedConditions: result.extractedConditions,
    extractedInstruments: result.extractedInstruments,
    findings: result.findings.slice(0, 4).map((f) => ({
      name: f.category.name,
      code: f.category.code,
      program: f.category.program,
      likelihood: f.likelihood,
      confidence: f.confidence,
      citation: f.category.citation,
      rationale: f.rationale,
      evidence: f.evidence,
    })),
    documentExcerpt: documentText.slice(0, 6000),
  };
}

function userInstruction(state: StateCode, payload: unknown) {
  return `Here is the EduHelp rules-engine output and a document excerpt. Produce the three sections described in your instructions for a family in ${
    state === "CO" ? "Colorado" : "California"
  }.\n\n${JSON.stringify(payload, null, 2)}`;
}

interface ResolvedProvider {
  provider: AIProvider;
  apiKey: string;
  model: string;
  siteUrl?: string;
  baseUrl?: string;
}

/**
 * Resolve the provider to use. Overrides (per-request, from the user's
 * client settings) take priority. If overrides specify a provider but
 * no API key, we still try the env var for that provider. If overrides
 * specify nothing, we auto-detect from env in the documented order.
 */
function resolveProvider(
  overrides?: ProviderOverrides,
): ResolvedProvider | undefined {
  // 1. Explicit override with an API key — use it.
  if (overrides?.provider && overrides.apiKey) {
    return finishResolved({
      provider: overrides.provider,
      apiKey: overrides.apiKey,
      model: overrides.model ?? defaultModelFor(overrides.provider),
      siteUrl: overrides.siteUrl,
      baseUrl: overrides.baseUrl,
    });
  }

  // 2. Explicit AI_PROVIDER env or specific override provider — try env key.
  const explicit = (
    overrides?.provider ??
    (process.env.AI_PROVIDER?.toLowerCase() as AIProvider | undefined)
  );
  if (explicit && envKeyFor(explicit)) {
    return finishResolved({
      provider: explicit,
      apiKey: envKeyFor(explicit)!,
      model: overrides?.model ?? envModelFor(explicit) ?? defaultModelFor(explicit),
      siteUrl: overrides?.siteUrl ?? process.env.OPENROUTER_SITE_URL,
      baseUrl: overrides?.baseUrl ?? process.env.OLLAMA_BASE_URL,
    });
  }

  // 3. Auto-detect from env, in priority order.
  const order: AIProvider[] = ["openai", "anthropic", "openrouter", "ollama"];
  for (const p of order) {
    const k = envKeyFor(p);
    if (!k) continue;
    return finishResolved({
      provider: p,
      apiKey: k,
      model: envModelFor(p) ?? defaultModelFor(p),
      siteUrl: process.env.OPENROUTER_SITE_URL,
      baseUrl: process.env.OLLAMA_BASE_URL,
    });
  }
  return undefined;
}

function finishResolved(r: ResolvedProvider): ResolvedProvider {
  return r;
}

function envKeyFor(p: AIProvider): string | undefined {
  switch (p) {
    case "openai":
      return process.env.OPENAI_API_KEY;
    case "anthropic":
      return process.env.ANTHROPIC_API_KEY;
    case "openrouter":
      return process.env.OPENROUTER_API_KEY;
    case "ollama":
      return process.env.OLLAMA_API_KEY;
  }
}

function envModelFor(p: AIProvider): string | undefined {
  switch (p) {
    case "openai":
      return process.env.OPENAI_MODEL;
    case "anthropic":
      return process.env.ANTHROPIC_MODEL;
    case "openrouter":
      return process.env.OPENROUTER_MODEL;
    case "ollama":
      return process.env.OLLAMA_MODEL;
  }
}

function defaultModelFor(p: AIProvider): string {
  switch (p) {
    case "openai":
      return DEFAULT_OPENAI_MODEL;
    case "anthropic":
      return DEFAULT_ANTHROPIC_MODEL;
    case "openrouter":
      return DEFAULT_OPENROUTER_MODEL;
    case "ollama":
      return DEFAULT_OLLAMA_MODEL;
  }
}

export async function maybeGenerateAINarrative(
  documentText: string,
  state: StateCode,
  result: EligibilityResult,
  overrides?: ProviderOverrides,
): Promise<AINarrativeResult | undefined> {
  const resolved = resolveProvider(overrides);
  if (!resolved) return undefined;

  const payload = buildUserPayload(documentText, state, result);
  const userMessage = userInstruction(state, payload);

  try {
    switch (resolved.provider) {
      case "openai":
        return await callOpenAI(userMessage, resolved);
      case "anthropic":
        return await callAnthropic(userMessage, resolved);
      case "openrouter":
        return await callOpenRouter(userMessage, resolved);
      case "ollama":
        return await callOllamaCloud(userMessage, resolved);
    }
  } catch (err) {
    console.error(`[EduHelp] ${resolved.provider} narrative failed:`, err);
    return undefined;
  }
}

async function callOpenAI(
  userMessage: string,
  r: ResolvedProvider,
): Promise<AINarrativeResult> {
  const client = new OpenAI({ apiKey: r.apiKey });
  const resp = await client.chat.completions.create({
    model: r.model,
    temperature: 0.2,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
  });
  return {
    provider: "openai",
    model: r.model,
    text: resp.choices[0]?.message?.content?.trim() ?? "",
  };
}

async function callAnthropic(
  userMessage: string,
  r: ResolvedProvider,
): Promise<AINarrativeResult> {
  const client = new Anthropic({ apiKey: r.apiKey });
  const resp = await client.messages.create({
    model: r.model,
    max_tokens: 1500,
    temperature: 0.2,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });
  const text =
    resp.content
      .map((c) => (c.type === "text" ? c.text : ""))
      .join("\n")
      .trim() || "";
  return { provider: "anthropic", model: r.model, text };
}

async function callOpenRouter(
  userMessage: string,
  r: ResolvedProvider,
): Promise<AINarrativeResult> {
  const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${r.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": r.siteUrl || "https://eduhelp.app",
      "X-Title": "EduHelp",
    },
    body: JSON.stringify({
      model: r.model,
      temperature: 0.2,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    }),
  });
  if (!resp.ok) {
    throw new Error(
      `OpenRouter ${resp.status}: ${await resp.text().catch(() => "")}`,
    );
  }
  const data = (await resp.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return {
    provider: "openrouter",
    model: r.model,
    text: data.choices?.[0]?.message?.content?.trim() ?? "",
  };
}

async function callOllamaCloud(
  userMessage: string,
  r: ResolvedProvider,
): Promise<AINarrativeResult> {
  // Use override base URL if provided; else fall back to env-aware resolver.
  const baseRaw = r.baseUrl?.replace(/\/$/, "");
  let url: string;
  if (baseRaw) {
    if (/\/chat$/i.test(baseRaw)) url = baseRaw;
    else if (/\/api$/i.test(baseRaw)) url = `${baseRaw}/chat`;
    else url = `${baseRaw}/api/chat`;
  } else {
    url = resolveOllamaChatEndpoint();
  }

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${r.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: r.model,
      stream: false,
      options: { temperature: 0.2 },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    }),
  });
  if (!resp.ok) {
    throw new Error(
      `Ollama Cloud ${resp.status}: ${await resp.text().catch(() => "")}`,
    );
  }
  const data = (await resp.json()) as { message?: { content?: string } };
  return {
    provider: "ollama",
    model: r.model,
    text: data.message?.content?.trim() ?? "",
  };
}
