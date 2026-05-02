import { ELIGIBILITY_CATEGORIES } from "./categories";
import {
  extractAgeYears,
  extractConditions,
  extractInstruments,
  extractScores,
  findEvidenceSnippets,
  normalizeText,
} from "./extract";
import type {
  EligibilityCategory,
  EligibilityFinding,
  EligibilityResult,
  ExtractedScore,
  Likelihood,
  StateCode,
} from "./types";

const DISCLAIMERS = [
  "EduHelp is an informational tool. It is not a legal or medical opinion.",
  "Final eligibility for an IEP or 504 Plan is determined by a multidisciplinary school team after a full evaluation.",
  "If the school denies a parent request, ask for the reason in writing — that document is legally important.",
];

interface RuleHit {
  rationale: string;
  evidence?: string[];
  weight: number;
}

function likelihoodFromConfidence(confidence: number): Likelihood {
  if (confidence >= 70) return "Likely";
  if (confidence >= 40) return "Possible";
  if (confidence >= 15) return "Unlikely";
  return "Insufficient data";
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function scoreCategory(
  category: EligibilityCategory,
  text: string,
  scores: ExtractedScore[],
  conditions: string[],
  ageYears: number | undefined,
): RuleHit[] {
  const hits: RuleHit[] = [];
  const lower = text.toLowerCase();

  const matchingMarkers = category.evidenceMarkers.filter((m) =>
    lower.includes(m.toLowerCase()),
  );
  if (matchingMarkers.length > 0) {
    const evidence = findEvidenceSnippets(text, matchingMarkers, 1);
    hits.push({
      rationale: `Document mentions ${matchingMarkers
        .slice(0, 4)
        .map((m) => `"${m}"`)
        .join(", ")}, which is consistent with ${category.name} (${category.code}).`,
      evidence,
      weight: clamp(20 + matchingMarkers.length * 12, 25, 70),
    });
  }

  switch (category.code) {
    case "SLD": {
      const academic = scores.filter((s) =>
        [
          "Reading Comprehension",
          "Basic Reading",
          "Reading Fluency",
          "Math Calculation",
          "Math Problem Solving",
          "Written Expression",
          "Spelling",
          "Listening Comprehension",
          "Oral Expression",
        ].includes(s.label),
      );
      const cognitive = scores.find((s) => s.label === "Full Scale IQ");
      const lowAcademic = academic.filter((s) => s.value <= 85);
      if (lowAcademic.length > 0 && (!cognitive || cognitive.value >= 80)) {
        hits.push({
          rationale: `Academic standard score${
            lowAcademic.length > 1 ? "s" : ""
          } in the ${lowAcademic.map((s) => s.label).join(", ")} area${
            lowAcademic.length > 1 ? "s" : ""
          } fall in the low-average to borderline range, while cognitive ability${
            cognitive ? ` (FSIQ ${cognitive.value})` : ""
          } is higher — a pattern consistent with a Specific Learning Disability.`,
          evidence: lowAcademic.map(
            (s) => `${s.label}: ${s.value} (${s.qualitativeBand})`,
          ),
          weight: clamp(35 + lowAcademic.length * 12, 35, 80),
        });
      }
      break;
    }
    case "ID": {
      const fsiq = scores.find((s) => s.label === "Full Scale IQ");
      const adaptive = scores.find((s) => s.label === "Adaptive Behavior Composite");
      if (fsiq && fsiq.value <= 75 && (!adaptive || adaptive.value <= 80)) {
        hits.push({
          rationale: `Cognitive ability is well below average (FSIQ ${fsiq.value})${
            adaptive
              ? ` with adaptive behavior at ${adaptive.value}`
              : ""
          }, which can support an Intellectual Disability eligibility.`,
          evidence: [
            `Full Scale IQ: ${fsiq.value} (${fsiq.qualitativeBand})`,
            adaptive
              ? `Adaptive Behavior: ${adaptive.value} (${adaptive.qualitativeBand})`
              : "",
          ].filter(Boolean),
          weight: 75,
        });
      } else if (fsiq && fsiq.value >= 90) {
        hits.push({
          rationale: `Cognitive scores are average or above (FSIQ ${fsiq.value}), which generally rules out Intellectual Disability.`,
          weight: -40,
        });
      }
      break;
    }
    case "OHI": {
      if (
        conditions.some(
          (c) =>
            /adhd|add|attention deficit|tourette|epilepsy|diabetes|leukemia|asthma/i.test(
              c,
            ),
        )
      ) {
        hits.push({
          rationale: `A chronic medical or neurodevelopmental condition is documented (e.g., ${conditions
            .filter((c) =>
              /adhd|add|tourette|epilepsy|diabetes|asthma/i.test(c),
            )
            .join(", ")}), which is the typical pathway for OHI eligibility.`,
          weight: 55,
        });
      }
      break;
    }
    case "ASD":
    case "AUT": {
      if (
        /\bados|adi-r|gars|social communication disorder|autism spectrum|autism\b/i.test(
          text,
        )
      ) {
        hits.push({
          rationale:
            "Autism-specific assessment instruments (ADOS, ADI-R, GARS) or an explicit ASD diagnosis appear in the document.",
          weight: 70,
        });
      }
      break;
    }
    case "ED":
    case "SED": {
      const internal = scores.find((s) => s.label === "BASC Internalizing");
      const external = scores.find((s) => s.label === "BASC Externalizing");
      const clinicallyHigh =
        (internal && internal.value >= 70) || (external && external.value >= 70);
      if (clinicallyHigh) {
        hits.push({
          rationale: `Behavior rating scales fall in the Clinically Significant range${
            internal && internal.value >= 70
              ? ` (Internalizing T=${internal.value})`
              : ""
          }${external && external.value >= 70 ? ` (Externalizing T=${external.value})` : ""}.`,
          weight: 65,
        });
      }
      break;
    }
    case "DD": {
      if (ageYears !== undefined && ageYears <= 8) {
        hits.push({
          rationale: `Child is age ${ageYears}, within the 3–8 range eligible for Developmental Delay in Colorado.`,
          weight: 25,
        });
      } else if (ageYears !== undefined && ageYears > 8) {
        hits.push({
          rationale: `Child is age ${ageYears}, above the Colorado DD eligibility ceiling of 8.`,
          weight: -50,
        });
      }
      break;
    }
    case "EI": {
      if (ageYears !== undefined && ageYears < 3) {
        hits.push({
          rationale: `Child is under 3, the eligibility window for Part C / Early Intervention Colorado services.`,
          weight: 60,
        });
      } else if (ageYears !== undefined && ageYears >= 3) {
        hits.push({
          rationale: `Child is ${ageYears}, above the Part C ceiling of age 3.`,
          weight: -50,
        });
      }
      break;
    }
    case "EMD": {
      if (ageYears !== undefined && ageYears <= 5) {
        if (
          /down syndrome|fragile x|fetal alcohol|congenital|established medical/i.test(
            text,
          )
        ) {
          hits.push({
            rationale: `Child is ${ageYears} and document references an established medical condition with high probability of developmental delay — fits California's EMD category.`,
            weight: 70,
          });
        }
      }
      break;
    }
    case "504": {
      if (conditions.length > 0) {
        hits.push({
          rationale: `At least one diagnosed impairment (${conditions
            .slice(0, 4)
            .join(", ")}) is documented. Even if your child does not qualify for an IEP, a 504 plan is a strong fallback for accommodations.`,
          weight: 55,
        });
      }
      break;
    }
  }

  return hits;
}

function buildNextSteps(
  category: EligibilityCategory,
  state: StateCode,
): string[] {
  const steps: string[] = [];
  if (category.program === "IEP") {
    steps.push(
      `Send a written request for a full special education evaluation under IDEA${
        state === "CO"
          ? " and Colorado ECEA Rules § 4.02"
          : " and California Ed. Code § 56321"
      }.`,
    );
    steps.push(
      `Ask for the school's prior written notice and consent forms — the evaluation timeline starts when you sign consent (${
        state === "CO" ? "60 calendar days in CO" : "60 calendar days in CA"
      }).`,
    );
    steps.push(
      `Bring all outside evaluations, doctor letters, and report cards to the eligibility meeting and request that the team consider them.`,
    );
  } else {
    steps.push(
      "Ask the school's 504 coordinator (often the counselor or principal) to convene a 504 team meeting.",
    );
    steps.push(
      "Bring documentation of the diagnosis (doctor's letter, evaluation, treatment plan) showing how it limits a major life activity.",
    );
    steps.push(
      "Propose specific accommodations (extended time, breaks, preferential seating, behavior plan, health plan, etc.).",
    );
  }
  return steps;
}

const STATE_FALLBACK_ACTIONS: Record<StateCode, string[]> = {
  CO: [
    "Submit your written evaluation request by email and keep a copy. CDE recommends a dated paper trail.",
    "If denied, ask for the school's Prior Written Notice (PWN) explaining the refusal — required by IDEA.",
    "If you disagree with the school's evaluation, you can request an Independent Educational Evaluation (IEE) at public expense.",
    "Free help: Colorado PEAK Parent Center, The Legal Center for People with Disabilities, and CDE's Exceptional Student Services Unit.",
  ],
  CA: [
    "Submit your written assessment request to the principal or director of special education. The 60-day timeline starts when you sign the assessment plan.",
    "If denied, request Prior Written Notice in writing — required by IDEA and Cal. Ed. Code.",
    "If you disagree with results, you can request an Independent Educational Evaluation (IEE) at public expense.",
    "Free help: Disability Rights California, your local Family Empowerment Center, and the CDE Special Education Division.",
  ],
};

export function runEligibilityEngine(
  rawText: string,
  state: StateCode,
): EligibilityResult {
  const text = normalizeText(rawText);
  const scores = extractScores(text);
  const conditions = extractConditions(text);
  const instruments = extractInstruments(text);
  const ageYears = extractAgeYears(text);

  const findings: EligibilityFinding[] = [];
  for (const cat of ELIGIBILITY_CATEGORIES.filter((c) => c.state === state)) {
    const hits = scoreCategory(cat, text, scores, conditions, ageYears);
    if (hits.length === 0) continue;

    const rawConfidence = hits.reduce((acc, h) => acc + h.weight, 0);
    const confidence = clamp(rawConfidence, 0, 95);
    if (confidence < 10) continue;

    const evidence = Array.from(
      new Set(hits.flatMap((h) => h.evidence ?? []).filter(Boolean)),
    ).slice(0, 6);

    findings.push({
      category: cat,
      likelihood: likelihoodFromConfidence(confidence),
      confidence,
      rationale: hits.filter((h) => h.weight > 0).map((h) => h.rationale),
      evidence,
      nextSteps: buildNextSteps(cat, state),
    });
  }

  findings.sort((a, b) => b.confidence - a.confidence);

  const top = findings[0];
  const summary = top
    ? buildSummary(top, state, findings)
    : `We couldn't extract enough specific evaluation data from the document to identify a likely eligibility category for a ${
        state === "CO" ? "Colorado" : "California"
      } student. The clearest next step is still to send the school a written request for a full special education evaluation.`;

  const recommendedActions = [
    ...(top ? top.nextSteps : []),
    ...STATE_FALLBACK_ACTIONS[state],
  ].slice(0, 7);

  return {
    state,
    childAgeYears: ageYears,
    findings,
    summary,
    recommendedActions,
    extractedScores: scores,
    extractedConditions: conditions,
    extractedInstruments: instruments,
    disclaimers: DISCLAIMERS,
  };
}

function buildSummary(
  top: EligibilityFinding,
  state: StateCode,
  findings: EligibilityFinding[],
): string {
  const stateName = state === "CO" ? "Colorado" : "California";
  const program =
    top.category.program === "IEP"
      ? "an Individualized Education Program (IEP)"
      : "a Section 504 Plan";
  const second = findings[1];
  const secondClause =
    second && second.confidence >= 30
      ? ` Secondary considerations include ${second.category.name} (${second.likelihood.toLowerCase()}).`
      : "";

  return `Based on the document, your child appears ${top.likelihood.toLowerCase()} to qualify for ${program} under ${stateName} rules — most likely under the **${top.category.name}** category (${top.category.code}). ${secondClause} This is a starting point only — the school's evaluation team makes the final call.`;
}
