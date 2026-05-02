export type AIProvider = "openai" | "anthropic" | "openrouter" | "ollama";

export type ResponseLanguage = "en" | "es";

export interface ProviderOverrides {
  provider?: AIProvider;
  apiKey?: string;
  model?: string;
  /** OpenRouter only */
  siteUrl?: string;
  /** Ollama only */
  baseUrl?: string;
  /** Output language for AI narratives ("en" default, "es" for Spanish) */
  language?: ResponseLanguage;
}
