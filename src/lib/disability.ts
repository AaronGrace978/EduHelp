export type AccommodationPack = {
  id: string;
  label: string;
  matches: RegExp;
  items: string[];
  guidance: string;
};

/** Higher-ed focused accommodation packs (ADA / Section 504). */
export const COLLEGE_ACCOMMODATION_PACKS: AccommodationPack[] = [
  {
    id: "adhd",
    label: "ADHD / Executive Function",
    matches: /adhd|attention|executive/i,
    items: [
      "Extended time (50–100%) on timed exams",
      "Reduced-distraction testing environment",
      "Priority seating near instructor / away from exits",
      "Permission to audio-record lectures",
      "Access to lecture notes or outline when available",
      "Breaks during long exams without time penalty",
    ],
    guidance:
      "Document diagnosis + functional impact on concentration, timed performance, and organization. DSS offices typically want recent (within 3–5 years) clinical documentation.",
  },
  {
    id: "dyslexia",
    label: "Dyslexia / Reading Disability",
    matches: /dyslexia|reading|specific learning/i,
    items: [
      "Text-to-speech / screen reader access for course materials",
      "Digital textbooks (Bookshare, publisher e-text)",
      "Extended time on reading-heavy assessments",
      "Permission to use spell-check / grammar tools on writing tasks",
      "Oral clarification of complex written instructions",
      "Alternative formats for handouts when possible",
    ],
    guidance:
      "Bring psychoeducational evaluation showing processing deficits and academic impact. Ask DSS about accessible media timelines before the term starts.",
  },
  {
    id: "anxiety",
    label: "Anxiety / Mental Health",
    matches: /anxiety|depression|ptsd|mental health|panic/i,
    items: [
      "Flexible attendance within syllabus limits when flare-ups occur",
      "Make-up exams when medically documented",
      "Quiet testing space",
      "Extended time on exams",
      "Option to present privately or record presentations when appropriate",
      "Priority registration to manage course load",
    ],
    guidance:
      "Provide a licensed clinician letter describing functional limitations (not just diagnosis). Clarify attendance flexibility vs. essential course requirements early.",
  },
  {
    id: "mobility",
    label: "Mobility / Physical Access",
    matches: /mobility|wheelchair|physical|chronic pain|ms|cerebral palsy/i,
    items: [
      "Accessible classroom / lab seating",
      "Elevator access routing and early room change requests",
      "Extra time between classes for transit",
      "Accessible exam seating and adjustable desks",
      "Permission for service animal if applicable",
      "Lab assistant or adaptive equipment coordination",
    ],
    guidance:
      "Tour campus with DSS before the semester. Flag lab, studio, and field courses that need equipment or assistant support.",
  },
  {
    id: "deaf-hoh",
    label: "Deaf / Hard of Hearing",
    matches: /deaf|hard of hearing|hearing loss|auditory/i,
    items: [
      "ASL interpreters or CART captioning",
      "Preferential seating for lip-reading / sightlines",
      "Captioned video content",
      "Written announcements that were delivered orally",
      "Assistive listening systems when available",
      "Note-taking support",
    ],
    guidance:
      "Request interpreters/CART as early as possible — scheduling lead time is often 1–2 weeks minimum.",
  },
  {
    id: "vision",
    label: "Blind / Low Vision",
    matches: /blind|low vision|visual impair/i,
    items: [
      "Screen reader compatible materials",
      "Enlarged print / high-contrast materials",
      "Extended time for visually intensive tasks",
      "Describer or tactile materials for diagrams when feasible",
      "Priority access to accessible e-texts",
      "Testing with assistive tech already configured",
    ],
    guidance:
      "Submit textbook ISBNs early so DSS can source accessible formats before classes begin.",
  },
];

export function matchAccommodationPacks(condition: string) {
  return COLLEGE_ACCOMMODATION_PACKS.filter((p) => p.matches.test(condition));
}

export function buildAccommodationLetter(opts: {
  studentName: string;
  collegeName: string;
  condition: string;
  accommodations: string[];
}) {
  const { studentName, collegeName, condition, accommodations } = opts;
  const list = accommodations.map((a) => `• ${a}`).join("\n");
  return `Disability Support Services
${collegeName}

Re: Accommodation request — ${studentName || "[Student Name]"}

I am a student at ${collegeName || "[College]"} requesting academic accommodations under the Americans with Disabilities Act (ADA) and Section 504 of the Rehabilitation Act.

Condition / functional limitation:
${condition || "[Describe diagnosis and how it affects learning, testing, attendance, or access]"}

Requested accommodations:
${list || "• [List accommodations]"}

I can provide supporting documentation from a qualified professional and am available to meet to discuss reasonable accommodations that preserve essential course requirements.

Thank you for your partnership.

Sincerely,
${studentName || "[Student Name]"}
[Student ID]
[Email] · [Phone]
`;
}
