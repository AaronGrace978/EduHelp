/**
 * Evidence-based accommodation library, matched to common eligibility profiles.
 *
 * Sources informally drawn from:
 *  - Council for Exceptional Children (CEC) practice guides
 *  - U.S. Dept. of Ed. IES "What Works Clearinghouse" reading/math reports
 *  - National Center on Accessible Educational Materials (AEM) guidance
 *  - NIMH ADHD school accommodations summary
 *  - APA Division 16 (School Psychology) consensus lists
 *
 * The library is intentionally conservative — only accommodations that are
 * widely accepted in IEP/504 plans across districts.
 */

import type { ExtractedScore } from "./eligibility/types";

interface AccommodationSet {
  matches: (
    conditions: string[],
    scores: ExtractedScore[],
    text: string,
  ) => boolean;
  items: string[];
  /** Source label so families can defend each item at the meeting. */
  source: string;
}

const SETS: AccommodationSet[] = [
  // ───────── Reading / Dyslexia ─────────
  {
    matches: (cond, scores, text) =>
      /dyslexia|reading disorder|specific learning disability.*reading/i.test(
        text,
      ) ||
      cond.some((c) => /dyslexia/i.test(c)) ||
      scores.some(
        (s) =>
          ["Basic Reading", "Reading Comprehension", "Reading Fluency"].includes(
            s.label,
          ) && s.value <= 85,
      ),
    items: [
      "Audio versions of textbooks and assignments (Bookshare / Learning Ally)",
      "Text-to-speech on all digital reading materials",
      "Structured Literacy / Orton-Gillingham reading intervention 4–5×/week",
      "Reduce volume of reading without reducing rigor",
      "Read-aloud of test directions and reading passages on non-reading tests",
      "Extended time (1.5×) on reading-heavy assessments",
      "Allow oral responses or speech-to-text for written work",
    ],
    source: "IDA Dyslexia Handbook; IES Practice Guide on Foundational Reading",
  },
  // ───────── Writing / Dysgraphia ─────────
  {
    matches: (cond, scores, text) =>
      /dysgraphia/i.test(text) ||
      cond.some((c) => /dysgraphia/i.test(c)) ||
      scores.some(
        (s) =>
          ["Written Expression", "Spelling"].includes(s.label) && s.value <= 85,
      ),
    items: [
      "Speech-to-text software (Google Voice Typing, Dictation)",
      "Use of word processor with spell-check + grammar check on all writing tasks",
      "Provide graphic organizers and sentence starters",
      "Reduced length of written assignments (output, not standards, is reduced)",
      "Scribe for in-class long-answer assessments",
      "Notes provided in advance (Cornell-style or guided notes)",
      "Allow keyboarding instead of handwriting for assignments",
    ],
    source: "AOTA School Mental Health resources; AEM Center accommodations menu",
  },
  // ───────── Math / Dyscalculia ─────────
  {
    matches: (cond, scores, text) =>
      /dyscalculia|math.*disability/i.test(text) ||
      cond.some((c) => /dyscalculia/i.test(c)) ||
      scores.some(
        (s) =>
          ["Math Calculation", "Math Problem Solving"].includes(s.label) &&
          s.value <= 85,
      ),
    items: [
      "Use of calculator on multi-step problems (not basic facts targeted by IEP goal)",
      "Multiplication chart and formula sheets available",
      "Concrete-Representational-Abstract math instruction",
      "Reduce number of problems per page; chunk worksheets",
      "Color-coded operations and place-value mats",
      "Extra time (1.5×) on math assessments",
      "Allow use of graph paper to align columns",
    ],
    source: "IES Practice Guide: Assisting Students Struggling With Mathematics",
  },
  // ───────── ADHD / Executive Functioning ─────────
  {
    matches: (cond, _scores, text) =>
      /\b(?:ADHD|ADD|attention[- ]deficit)\b/i.test(text) ||
      cond.some((c) => /adhd|add|attention/i.test(c)),
    items: [
      "Preferential seating near teacher and away from high-traffic areas",
      "Movement / sensory breaks every 20–30 minutes",
      "Test in a small-group or low-distraction setting",
      "Extended time (1.5×) on timed assessments",
      "Daily check-in / check-out routine for organization",
      "Visual schedule and assignment checklist taped to desk",
      "Chunked assignments with clear, short directions",
      "Allow fidgets that don't disrupt others",
    ],
    source: "NIMH ADHD School Accommodations; CHADD Educator's Manual",
  },
  // ───────── Autism / Social Communication ─────────
  {
    matches: (cond, _scores, text) =>
      /\b(?:autism|autism spectrum|ASD|asperger)\b/i.test(text) ||
      cond.some((c) => /autism/i.test(c)),
    items: [
      "Visual schedules and advance notice of routine changes",
      "Sensory-friendly space available (e.g. headphones, weighted vest, quiet corner)",
      "Social stories / scripts for new situations and unstructured time",
      "Speech-language services targeting pragmatic / social communication",
      "Direct teaching of perspective-taking and self-regulation (e.g. Zones of Regulation)",
      "Lunch club or structured peer-buddy program",
      "Reduced sensory load: dim lighting, no fluorescents, fragrance-free classroom",
      "Pre-teach new vocabulary and curriculum content",
    ],
    source: "National Autism Center National Standards Project; CEC autism guidance",
  },
  // ───────── Anxiety / Mood / Trauma ─────────
  {
    matches: (cond, scores, text) =>
      /\b(?:anxiety|depression|PTSD|trauma|emotional disturbance|school refusal)\b/i.test(
        text,
      ) ||
      cond.some((c) => /anxiety|depression|ptsd|trauma|odd/i.test(c)) ||
      scores.some(
        (s) =>
          ["BASC Internalizing", "BASC Externalizing"].includes(s.label) &&
          s.value >= 65,
      ),
    items: [
      "Access to a designated safe space and trusted adult",
      "Permission to leave class for breaks without penalty",
      "Extended time and reduced number of items on tests to lower stress",
      "Advance notice of presentations or oral reading; option to pre-record",
      "Behavior support plan / Functional Behavior Assessment if behaviors persist",
      "Counseling as a related service (school psychologist or social worker)",
      "Late arrival or modified schedule on flare-up days",
    ],
    source: "ASCA / NASP joint guidance on school mental health",
  },
  // ───────── Intellectual Disability ─────────
  {
    matches: (_cond, scores, _text) => {
      const fsiq = scores.find((s) => s.label === "Full Scale IQ");
      const adaptive = scores.find((s) => s.label === "Adaptive Behavior Composite");
      return Boolean(
        (fsiq && fsiq.value <= 75) ||
          (adaptive && adaptive.value <= 75),
      );
    },
    items: [
      "Functional and life-skills curriculum aligned to IEP goals",
      "Direct, repeated instruction with task analysis",
      "Modified grade-level standards (alternate achievement)",
      "Extended time and reduced complexity on assessments",
      "Visual supports and concrete manipulatives across subjects",
      "1:1 paraprofessional support during transitions and unstructured time",
      "Community-based instruction starting at age 14",
    ],
    source: "AAIDD Adaptive Behavior guidelines; CEC ID Division",
  },
  // ───────── Speech / Language ─────────
  {
    matches: (_cond, _scores, text) =>
      /\b(?:articulation|stutter|stuttering|expressive language|receptive language|language disorder|phonological)\b/i.test(
        text,
      ),
    items: [
      "Direct speech-language services per IEP/504",
      "Allow extra wait time for verbal responses",
      "Picture supports for vocabulary instruction",
      "Reduced demand for whole-class oral participation",
      "Use of AAC (Augmentative and Alternative Communication) device if recommended",
      "Pre-teach new vocabulary and academic language",
    ],
    source: "ASHA School-Based SLP guidance",
  },
  // ───────── Hearing / Vision ─────────
  {
    matches: (cond, _scores, text) =>
      /hearing loss|hard of hearing|hearing impairment|deaf|cochlear/i.test(
        text,
      ) ||
      cond.some((c) => /hearing|deaf/i.test(c)),
    items: [
      "FM/DM listening system in all instructional settings",
      "Preferential seating with full view of teacher's face",
      "Captioning on all video content",
      "Notetaker / shared notes for lectures",
      "Visual cues paired with auditory directions",
    ],
    source: "Hands & Voices; AG Bell School Accommodations",
  },
  {
    matches: (cond, _scores, text) =>
      /visual impairment|low vision|legally blind|cortical visual/i.test(text) ||
      cond.some((c) => /visual/i.test(c)),
    items: [
      "Large-print or braille materials per TVI recommendation",
      "Screen reader and screen magnification software",
      "Pre-printed lesson materials provided 24h in advance",
      "Allow oral responses or recorded responses",
      "Orientation & Mobility services as a related service",
    ],
    source: "American Foundation for the Blind school guidance",
  },
];

/** Returns a deduplicated, prioritized list of suggested accommodations. */
export function suggestAccommodations(
  conditions: string[],
  scores: ExtractedScore[],
  rawText: string,
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const set of SETS) {
    if (!set.matches(conditions, scores, rawText)) continue;
    for (const item of set.items) {
      const key = item.toLowerCase().slice(0, 40);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }
  }
  return out.slice(0, 18);
}

/** Returns a per-finding list of accommodations matched to a category code. */
export function accommodationsForCategoryCode(
  code: string,
  text: string,
  conditions: string[],
  scores: ExtractedScore[],
): string[] {
  const map: Record<string, string[]> = {};
  // Build a concise map by re-running the relevant matchers for the category.
  // Simple heuristic: match by code → reuse the matching SETS.
  const buckets: Record<string, AccommodationSet[]> = {
    SLD: [SETS[0], SETS[1], SETS[2]],
    LD: [SETS[0], SETS[1], SETS[2]],
    OHI: [SETS[3]],
    ASD: [SETS[4]],
    AUT: [SETS[4]],
    AU: [SETS[4]],
    SED: [SETS[5]],
    ED: [SETS[5]],
    ID: [SETS[6]],
    SLI: [SETS[7]],
    SI: [SETS[7]],
    DHH: [SETS[8]],
    HI: [SETS[8]],
    AI: [SETS[8]],
    VI: [SETS[9]],
  };
  const sets = buckets[code] ?? [];
  const items: string[] = [];
  const seen = new Set<string>();
  for (const set of sets) {
    if (!set.matches(conditions, scores, text)) continue;
    for (const item of set.items) {
      const k = item.toLowerCase().slice(0, 40);
      if (seen.has(k)) continue;
      seen.add(k);
      items.push(item);
    }
  }
  map[code] = items;
  return items.slice(0, 8);
}
