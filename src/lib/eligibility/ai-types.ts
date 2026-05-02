export type AIProvider = "openai" | "anthropic" | "openrouter" | "ollama";

export interface ProviderOverrides {
  provider?: AIProvider;
  apiKey?: string;
  model?: string;
  /** OpenRouter only */
  siteUrl?: string;
  /** Ollama only */
  baseUrl?: string;
}
