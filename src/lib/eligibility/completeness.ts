import type {
  CompletenessIssue,
  ExtractedScore,
  StateCode,
} from "./types";

interface DomainCheck {
  domain: string;
  /** Returns true if the domain appears to be present in the document. */
  isPresent: (
    text: string,
    scores: ExtractedScore[],
    instruments: string[],
  ) => boolean;
  detail: string;
  severity: CompletenessIssue["severity"];
}

const COMMON_CHECKS: DomainCheck[] = [
  {
    domain: "Cognitive (intellectual functioning)",
    isPresent: (text, scores, instruments) =>
      scores.some((s) =>
        [
          "Full Scale IQ",
          "Verbal Comprehension",
          "Visual Spatial",
          "Fluid Reasoning",
          "Working Memory",
          "Processing Speed",
        ].includes(s.label),
      ) ||
      instruments.some((i) => /WISC|WPPSI|WAIS|DAS|Stanford-Binet|SB-5/i.test(i)),
    detail:
      "No cognitive (IQ) score was found. A full evaluation should include a measure like the WISC-V, DAS-II, or Stanford-Binet 5.",
    severity: "missing",
  },
  {
    domain: "Academic achievement",
    isPresent: (text, scores, instruments) =>
      scores.some((s) =>
        [
          "Reading Comprehension",
          "Basic Reading",
          "Reading Fluency",
          "Math Calculation",
          "Math Problem Solving",
          "Written Expression",
          "Spelling",
        ].includes(s.label),
      ) ||
      instruments.some((i) => /WJ-IV|WIAT|KTEA|Woodcock-Johnson/i.test(i)),
    detail:
      "No academic achievement scores were found. Ask the team to administer a comprehensive academic battery (WJ-IV, WIAT-4, or KTEA-3) covering reading, math, and writing.",
    severity: "missing",
  },
  {
    domain: "Adaptive behavior",
    isPresent: (text, scores, instruments) =>
      scores.some((s) => s.label === "Adaptive Behavior Composite") ||
      instruments.some((i) => /Vineland|ABAS/i.test(i)) ||
      /\badaptive (?:behavior|functioning)\b/i.test(text),
    detail:
      "Adaptive functioning was not assessed. This is required for ID eligibility and helpful for many other categories. Ask for the Vineland-3 or ABAS-3.",
    severity: "thin",
  },
  {
    domain: "Social-emotional / behavioral",
    isPresent: (text, scores, instruments) =>
      scores.some((s) =>
        ["BASC Internalizing", "BASC Externalizing"].includes(s.label),
      ) ||
      instruments.some((i) => /BASC|Conners|Vanderbilt/i.test(i)) ||
      /\b(BASC|behavioral rating|social[- ]emotional)\b/i.test(text),
    detail:
      "No standardized behavioral or social-emotional rating scale (BASC-3, Conners-3) appears in the document. Without this, ED/SED eligibility is hard to support.",
    severity: "thin",
  },
  {
    domain: "Speech and language",
    isPresent: (text, _scores, instruments) =>
      instruments.some((i) => /CELF|CASL|PPVT|EVT/i.test(i)) ||
      /\b(speech[- ]language|articulation|expressive language|receptive language)\b/i.test(
        text,
      ),
    detail:
      "No speech-language assessment is referenced. If language or articulation is a concern, request a CELF-5 or CASL-2.",
    severity: "thin",
  },
  {
    domain: "Functional Behavior Assessment (FBA)",
    isPresent: (text) =>
      /\b(FBA|functional behavior(?:al)? assessment|behavior intervention plan|BIP)\b/i.test(
        text,
      ),
    detail:
      "If your child has had behavioral issues at school (suspensions, classroom removals, frequent referrals), an FBA / BIP is typically required and should be in the file.",
    severity: "thin",
  },
  {
    domain: "Health / vision / hearing screening",
    isPresent: (text) =>
      /\b(audiogram|hearing screen|vision screen|ophthalmolog|optometr|hearing test)\b/i.test(
        text,
      ),
    detail:
      "Vision and hearing screening should be ruled out before any IEP eligibility. Ask for the most recent screening results.",
    severity: "thin",
  },
  {
    domain: "English-Learner / language status",
    isPresent: (text) =>
      /\b(EL|English Learner|ELD|primary language|home language|bilingual evaluation)\b/i.test(
        text,
      ),
    detail:
      "If your child is or was an English Learner, the evaluation must rule out language acquisition as the primary cause of academic challenges. Ask for the language history and a bilingual evaluation if needed.",
    severity: "thin",
  },
];

/** Per-state extra checks (e.g. CO/CA RTI/MTSS data, TX RtI documentation). */
const STATE_CHECKS: Partial<Record<StateCode, DomainCheck[]>> = {
  CO: [
    {
      domain: "Multi-Tiered System of Supports (MTSS) data",
      isPresent: (text) =>
        /\bMTSS|RtI|Response to Intervention|Tier (?:2|3)|progress monitoring\b/i.test(
          text,
        ),
      detail:
        "Colorado expects MTSS / progress-monitoring data as part of an SLD evaluation. Ask the school for tier-by-tier intervention data and progress charts.",
      severity: "thin",
    },
  ],
  CA: [
    {
      domain: "Severe discrepancy or PSW analysis",
      isPresent: (text) =>
        /severe discrepancy|patterns of strengths and weaknesses|PSW|response to intervention|RtI/i.test(
          text,
        ),
      detail:
        "California schools must use either a severe-discrepancy model, a PSW model, or RtI for SLD. Ask which model was used and to see the underlying data.",
      severity: "thin",
    },
  ],
  TX: [
    {
      domain: "Response-to-Intervention documentation",
      isPresent: (text) =>
        /\bRtI|Response to Intervention|Tier (?:2|3)\b/i.test(text),
      detail:
        "Texas RtI / Tier 2-3 progress data is typically expected for SLD eligibility under 19 TAC § 89.1040.",
      severity: "thin",
    },
  ],
};

export function scanCompleteness(
  text: string,
  scores: ExtractedScore[],
  instruments: string[],
  state: StateCode,
): CompletenessIssue[] {
  const issues: CompletenessIssue[] = [];
  const all = [...COMMON_CHECKS, ...(STATE_CHECKS[state] ?? [])];
  for (const check of all) {
    if (!check.isPresent(text, scores, instruments)) {
      issues.push({
        domain: check.domain,
        detail: check.detail,
        severity: check.severity,
      });
    }
  }
  return issues;
}
