import type { NextRequest } from "next/server";
import type {
  AIProvider,
  ProviderOverrides,
  ResponseLanguage,
} from "@/lib/eligibility/ai-types";

const VALID_PROVIDERS: AIProvider[] = [
  "openai",
  "anthropic",
  "openrouter",
  "ollama",
];

/** Pull AI provider overrides out of the EduHelp client-settings headers. */
export function readOverrides(req: NextRequest): ProviderOverrides | undefined {
  const provider = req.headers.get("x-eduhelp-provider")?.toLowerCase() as
    | AIProvider
    | undefined;
  const apiKey = req.headers.get("x-eduhelp-key") || undefined;
  const model = req.headers.get("x-eduhelp-model") || undefined;
  const siteUrl = req.headers.get("x-eduhelp-openrouter-site") || undefined;
  const baseUrl = req.headers.get("x-eduhelp-ollama-base") || undefined;
  const lang = req.headers.get("x-eduhelp-language");
  const language: ResponseLanguage | undefined =
    lang === "es" ? "es" : lang === "en" ? "en" : undefined;

  if (!provider && !apiKey && !language) return undefined;
  if (provider && !VALID_PROVIDERS.includes(provider)) return undefined;

  return { provider, apiKey, model, siteUrl, baseUrl, language };
}
