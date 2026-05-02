export type StateCode = "CO" | "CA";

export type EligibilityProgram = "IEP" | "504";

export type Likelihood = "Likely" | "Possible" | "Unlikely" | "Insufficient data";

export interface EligibilityCategory {
  /** Short canonical name (e.g. "Specific Learning Disability") */
  name: string;
  /** Two-letter state code this rule belongs to */
  state: StateCode;
  /** IEP (IDEA) vs 504 (ADA / Section 504) */
  program: EligibilityProgram;
  /** State-specific code/abbrev, e.g. "SLD", "OHI", "AU" */
  code: string;
  /** Plain-English description for families */
  description: string;
  /** What evidence in documents tends to support this category */
  evidenceMarkers: string[];
  /** Citation to the underlying rule */
  citation: string;
}

export interface EligibilityFinding {
  category: EligibilityCategory;
  likelihood: Likelihood;
  /** 0-100 confidence in the finding from the rules engine */
  confidence: number;
  /** Why the engine flagged this category */
  rationale: string[];
  /** Specific snippets from the document that triggered the rule */
  evidence: string[];
  /** Recommended next steps for families */
  nextSteps: string[];
}

export interface EligibilityResult {
  state: StateCode;
  childAgeYears?: number;
  /** Sorted findings, most likely first */
  findings: EligibilityFinding[];
  /** A 2-3 sentence plain-English summary */
  summary: string;
  /** Concrete, prioritized action items for the family */
  recommendedActions: string[];
  /** Optional AI-augmented narrative if an AI provider is configured */
  aiNarrative?: string;
  /** Standardized scores the engine extracted from the text */
  extractedScores: ExtractedScore[];
  /** Diagnoses or conditions the engine extracted */
  extractedConditions: string[];
  /** Tests/instruments mentioned */
  extractedInstruments: string[];
  /** Disclaimers always shown to the user */
  disclaimers: string[];
}

export interface ExtractedScore {
  /** e.g. "Full Scale IQ", "Reading Comprehension" */
  label: string;
  /** Numeric standard score */
  value: number;
  /** Optional context phrase from doc */
  context?: string;
  /** Optional category like "below average", "borderline" */
  qualitativeBand?: string;
}
