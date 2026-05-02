import type { ExtractedScore } from "./types";

const COMMON_INSTRUMENTS = [
  "WISC-V",
  "WISC-IV",
  "WPPSI-IV",
  "WAIS-IV",
  "WJ-IV",
  "Woodcock-Johnson",
  "WIAT-4",
  "WIAT-III",
  "KTEA-3",
  "KTEA-II",
  "DAS-II",
  "Stanford-Binet",
  "SB-5",
  "BASC-3",
  "BASC-2",
  "Conners-3",
  "Vanderbilt",
  "ADOS-2",
  "ADOS",
  "ADI-R",
  "GARS-3",
  "Vineland-3",
  "Vineland",
  "ABAS-3",
  "CTOPP-2",
  "GORT-5",
  "TAPS-4",
  "PPVT-5",
  "EVT-3",
  "CELF-5",
  "CASL-2",
];

const CONDITION_KEYWORDS = [
  "ADHD",
  "ADD",
  "Autism",
  "Autism Spectrum Disorder",
  "ASD",
  "dyslexia",
  "dysgraphia",
  "dyscalculia",
  "Specific Learning Disability",
  "Anxiety",
  "Depression",
  "PTSD",
  "Tourette",
  "Epilepsy",
  "Diabetes",
  "Cerebral palsy",
  "Down syndrome",
  "Fragile X",
  "Fetal alcohol",
  "Traumatic Brain Injury",
  "TBI",
  "Hearing loss",
  "Visual impairment",
  "Speech delay",
  "Language disorder",
  "Intellectual disability",
  "Oppositional Defiant",
  "Conduct disorder",
  "OCD",
  "Sensory processing disorder",
];

/**
 * Strip OCR / PDF noise so regex matching is more reliable.
 */
export function normalizeText(input: string): string {
  return input
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\t\f\v]/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

const SCORE_LABEL_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "Full Scale IQ", pattern: /\b(?:Full[\s-]?Scale|FSIQ|GAI|General Ability Index)\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Verbal Comprehension", pattern: /\bVerbal Comprehension(?: Index| \(VCI\))?\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Visual Spatial", pattern: /\bVisual[\s-]?Spatial(?: Index| \(VSI\))?\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Fluid Reasoning", pattern: /\bFluid Reasoning(?: Index| \(FRI\))?\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Working Memory", pattern: /\bWorking Memory(?: Index| \(WMI\))?\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Processing Speed", pattern: /\bProcessing Speed(?: Index| \(PSI\))?\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Reading Comprehension", pattern: /\bReading Comprehension\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Basic Reading", pattern: /\bBasic Reading(?: Skills)?\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Reading Fluency", pattern: /\bReading Fluency\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Math Calculation", pattern: /\bMath(?:ematics)? Calculation\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Math Problem Solving", pattern: /\bMath(?:ematics)? Problem Solving\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Written Expression", pattern: /\bWritten Expression\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Spelling", pattern: /\bSpelling\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Listening Comprehension", pattern: /\bListening Comprehension\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Oral Expression", pattern: /\bOral Expression\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "Adaptive Behavior Composite", pattern: /\bAdaptive Behavior(?: Composite)?\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "BASC Externalizing", pattern: /\bExternalizing(?: Problems)?\b[^\n]{0,40}?(\d{2,3})/gi },
  { label: "BASC Internalizing", pattern: /\bInternalizing(?: Problems)?\b[^\n]{0,40}?(\d{2,3})/gi },
];

function bandFor(score: number): string {
  if (score >= 130) return "Very Superior";
  if (score >= 120) return "Superior";
  if (score >= 110) return "High Average";
  if (score >= 90) return "Average";
  if (score >= 80) return "Low Average";
  if (score >= 70) return "Borderline";
  return "Extremely Low";
}

export function extractScores(text: string): ExtractedScore[] {
  const found = new Map<string, ExtractedScore>();
  for (const { label, pattern } of SCORE_LABEL_PATTERNS) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      const value = Number(match[1]);
      if (!Number.isFinite(value)) continue;
      if (value < 40 || value > 200) continue;
      const existing = found.get(label);
      if (!existing || value < existing.value) {
        const startIdx = Math.max(0, match.index - 60);
        const endIdx = Math.min(text.length, match.index + match[0].length + 40);
        found.set(label, {
          label,
          value,
          context: text.slice(startIdx, endIdx).replace(/\s+/g, " ").trim(),
          qualitativeBand: bandFor(value),
        });
      }
    }
  }
  return Array.from(found.values()).sort((a, b) => a.value - b.value);
}

export function extractInstruments(text: string): string[] {
  const lower = text.toLowerCase();
  const found = new Set<string>();
  for (const inst of COMMON_INSTRUMENTS) {
    if (lower.includes(inst.toLowerCase())) found.add(inst);
  }
  return Array.from(found);
}

export function extractConditions(text: string): string[] {
  const lower = text.toLowerCase();
  const found = new Set<string>();
  for (const cond of CONDITION_KEYWORDS) {
    if (lower.includes(cond.toLowerCase())) found.add(cond);
  }
  return Array.from(found);
}

const AGE_PATTERNS: RegExp[] = [
  /\bage[d]?[:\s]+(\d{1,2})(?:\s*years?)?\b/i,
  /\b(\d{1,2})\s*-?\s*year[s]?\s*-?\s*old\b/i,
  /\bchronological age[:\s]+(\d{1,2})\b/i,
];

export function extractAgeYears(text: string): number | undefined {
  for (const re of AGE_PATTERNS) {
    const m = text.match(re);
    if (m) {
      const n = Number(m[1]);
      if (n > 0 && n < 22) return n;
    }
  }
  return undefined;
}

export function findEvidenceSnippets(
  text: string,
  markers: string[],
  maxPerMarker = 1,
): string[] {
  const snippets: string[] = [];
  const lower = text.toLowerCase();
  const seen = new Set<string>();
  for (const marker of markers) {
    const m = marker.toLowerCase();
    let idx = lower.indexOf(m);
    let count = 0;
    while (idx !== -1 && count < maxPerMarker) {
      const start = Math.max(0, idx - 80);
      const end = Math.min(text.length, idx + m.length + 80);
      const snippet = text.slice(start, end).replace(/\s+/g, " ").trim();
      const key = snippet.slice(0, 100);
      if (!seen.has(key)) {
        seen.add(key);
        snippets.push(`…${snippet}…`);
      }
      idx = lower.indexOf(m, idx + m.length);
      count += 1;
    }
  }
  return snippets.slice(0, 6);
}
