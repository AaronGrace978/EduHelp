/**
 * Plain-English glossary of special-education acronyms families encounter.
 * Used by the GlossaryTerm tooltip and the /glossary page.
 */

export interface GlossaryEntry {
  term: string;
  /** Common alternate forms (case-insensitive) */
  aliases?: string[];
  /** Short definition for tooltips */
  short: string;
  /** Longer plain-English explanation for the /glossary page */
  long: string;
  /** Optional citation or source */
  source?: string;
  category:
    | "law"
    | "process"
    | "assessment"
    | "team"
    | "service"
    | "discipline"
    | "rights";
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "IDEA",
    short: "Individuals with Disabilities Education Act — the federal law that gives kids with disabilities the right to a free public education tailored to their needs.",
    long: "IDEA (20 U.S.C. § 1400 et seq.) is the federal special-education law. It requires public schools to identify, evaluate, and provide a Free Appropriate Public Education (FAPE) in the Least Restrictive Environment (LRE) to children ages 3–21 with disabilities under one of 13 IDEA categories.",
    source: "20 U.S.C. § 1400; 34 C.F.R. Part 300",
    category: "law",
  },
  {
    term: "FAPE",
    short: "Free Appropriate Public Education — the right every child with a disability has to a public-school program designed for their needs, at no cost to the family.",
    long: "FAPE means the school must provide special education and related services that meet your child's individual needs, are designed to help them make progress, and are provided at public expense (no tuition, evaluation, or service fees).",
    source: "34 C.F.R. § 300.17",
    category: "rights",
  },
  {
    term: "LRE",
    short: "Least Restrictive Environment — the requirement that kids be educated with non-disabled peers as much as is appropriate.",
    long: "LRE means the school must educate your child alongside non-disabled peers to the maximum extent appropriate. Pulling a child out of general education or sending them to a separate school is only allowed when the disability is severe enough that supports in regular classes can't work.",
    source: "34 C.F.R. § 300.114",
    category: "rights",
  },
  {
    term: "IEP",
    short: "Individualized Education Program — a written plan with goals, services, and accommodations for a child who qualifies under IDEA.",
    long: "An IEP is a legal document developed by the IEP team (you + school staff). It must include the child's current performance levels, annual goals, special education and related services, accommodations, placement, and progress monitoring. It's reviewed at least annually and re-evaluated every 3 years.",
    source: "34 C.F.R. § 300.320",
    category: "process",
  },
  {
    term: "504 Plan",
    aliases: ["504"],
    short: "A plan of accommodations under Section 504 of the Rehabilitation Act for kids who don't qualify for an IEP but still have a substantially limiting impairment.",
    long: "A 504 plan provides accommodations (extended time, breaks, preferential seating, etc.) for any student with a physical or mental impairment that substantially limits a major life activity. Coverage is broader than IDEA but the supports are usually narrower (no specially designed instruction).",
    source: "29 U.S.C. § 794; 34 C.F.R. Part 104",
    category: "law",
  },
  {
    term: "PWN",
    short: "Prior Written Notice — a required written explanation any time the school proposes or refuses to start, change, or stop services.",
    long: "Prior Written Notice (PWN) is a federally required document. The school must give you a PWN whenever they propose or refuse to start, change, or end your child's evaluation, eligibility, services, or placement. It must explain WHY, what data they used, and what other options were considered.",
    source: "34 C.F.R. § 300.503",
    category: "rights",
  },
  {
    term: "IEE",
    short: "Independent Educational Evaluation — an evaluation by a qualified professional who isn't employed by the school district, paid for by the district.",
    long: "If you disagree with the school's evaluation, you have the right to request an Independent Educational Evaluation (IEE) at public expense. The district must either pay for the IEE without unnecessary delay, or file a due-process complaint to defend its own evaluation.",
    source: "34 C.F.R. § 300.502",
    category: "rights",
  },
  {
    term: "FBA",
    short: "Functional Behavior Assessment — a structured evaluation that figures out WHY a behavior is happening and how to support it.",
    long: "An FBA looks at the antecedents, behaviors, and consequences of challenging behavior to identify the function (escape, attention, sensory, tangible). Required when discipline removes a child for >10 days or when a behavior interferes with learning.",
    source: "34 C.F.R. § 300.530(d) & (f)",
    category: "assessment",
  },
  {
    term: "BIP",
    short: "Behavior Intervention Plan — a written plan based on an FBA that teaches replacement behaviors and prevents the problem behavior.",
    long: "A BIP follows an FBA. It documents target behaviors, replacement skills, environmental changes, and reinforcement strategies. It must be implemented and monitored, and is part of the IEP.",
    source: "34 C.F.R. § 300.324(a)(2)(i)",
    category: "service",
  },
  {
    term: "MTSS",
    aliases: ["RtI"],
    short: "Multi-Tiered System of Supports / Response to Intervention — a school-wide system of progressively more intensive interventions for students who struggle.",
    long: "MTSS / RtI uses three tiers: Tier 1 is universal good teaching, Tier 2 is small-group targeted intervention, Tier 3 is intensive 1:1 or small-group support. Many states require RtI / MTSS data before identifying a Specific Learning Disability.",
    category: "process",
  },
  {
    term: "BASC",
    aliases: ["BASC-3"],
    short: "Behavior Assessment System for Children — a parent / teacher / self rating scale used to measure social-emotional and behavior concerns.",
    long: "BASC-3 produces T-scores for Internalizing (anxiety, depression, withdrawal) and Externalizing (hyperactivity, aggression, conduct) behavior plus other scales. T-scores ≥70 are considered Clinically Significant.",
    category: "assessment",
  },
  {
    term: "WISC-V",
    aliases: ["WISC"],
    short: "Wechsler Intelligence Scale for Children, 5th edition — the most common IQ test for kids ages 6–16.",
    long: "Produces a Full Scale IQ (FSIQ) plus index scores for Verbal Comprehension, Visual Spatial, Fluid Reasoning, Working Memory, and Processing Speed. Standard scores have a mean of 100 and SD of 15.",
    category: "assessment",
  },
  {
    term: "Vineland",
    aliases: ["Vineland-3", "ABAS", "ABAS-3"],
    short: "Adaptive behavior rating scales used to measure how a child functions in daily life — communication, social skills, daily living, motor.",
    long: "Vineland-3 and ABAS-3 are parent / teacher rating scales required for Intellectual Disability eligibility and useful for many other categories. They produce a composite Adaptive Behavior score (mean 100, SD 15).",
    category: "assessment",
  },
  {
    term: "ESY",
    short: "Extended School Year — special education services provided during summer or breaks to prevent skill regression.",
    long: "ESY is required when a child would lose critical skills over a long break and not regain them in a reasonable time. Eligibility is decided by the IEP team and must be considered annually — schools cannot have a blanket policy of not offering ESY.",
    source: "34 C.F.R. § 300.106",
    category: "service",
  },
  {
    term: "Manifestation Determination",
    short: "A meeting required when a student with an IEP is going to be removed from school for more than 10 days, to decide if the behavior was caused by their disability.",
    long: "If the team decides the behavior WAS a manifestation of the disability, the school must conduct an FBA / revise the BIP and return the child to placement (with limited exceptions for weapons, drugs, serious bodily injury). If NOT, the discipline can proceed but services must continue.",
    source: "34 C.F.R. § 300.530(e)",
    category: "discipline",
  },
  {
    term: "Procedural Safeguards",
    short: "A written summary of your legal rights as a parent — must be given to you at least once a year.",
    long: "The Procedural Safeguards Notice covers your right to: an evaluation, an IEE, a PWN, mediation, due process, state complaints, attorney fees, confidentiality, and stay-put. You can ask for a copy at any time.",
    source: "34 C.F.R. § 300.504",
    category: "rights",
  },
  {
    term: "Stay-Put",
    short: "The right to keep current services in place during a dispute, until the dispute is resolved.",
    long: "If you file for due process, your child must remain in their then-current placement / services until the dispute is decided — schools cannot unilaterally change placement during the proceeding.",
    source: "34 C.F.R. § 300.518",
    category: "rights",
  },
  {
    term: "Due Process",
    short: "A formal legal complaint filed under IDEA to resolve a special-education dispute, with a hearing before an impartial officer.",
    long: "A due-process complaint can be filed up to 2 years after the alleged violation. A 30-day Resolution Period applies, then mediation or a hearing. Hearing decisions are appealable to state or federal court.",
    source: "34 C.F.R. § 300.507",
    category: "rights",
  },
  {
    term: "OCR",
    short: "U.S. Department of Education Office for Civil Rights — investigates discrimination complaints under Section 504 and Title II.",
    long: "OCR has 12 regional offices. Complaints are free, can be filed by parents or anyone, must be filed within 180 days of the discrimination, and OCR can order corrective action.",
    source: "34 C.F.R. § 100.7",
    category: "rights",
  },
  {
    term: "P&A",
    aliases: ["Protection and Advocacy"],
    short: "Each state's Protection & Advocacy agency — provides free legal information and sometimes representation in special-education matters.",
    long: "Every state has a P&A agency funded by federal dollars. They offer information, technical help, and limited legal representation for disability-related issues at school. Examples: Disability Law Colorado, Disability Rights California, Disability Rights Texas, Advocates for Children of New York, Disability Rights Florida, Equip for Equality (IL), Disability Law Center (MA).",
    category: "rights",
  },
  {
    term: "PSW",
    short: "Patterns of Strengths and Weaknesses — a model used to identify a Specific Learning Disability based on a profile mismatch.",
    long: "PSW is one of three legally allowed methods (along with severe-discrepancy and RtI) to identify SLD. It looks for areas of average / high cognitive ability paired with significantly low achievement in a specific area like reading or math.",
    category: "assessment",
  },
  {
    term: "SLD",
    aliases: ["Specific Learning Disability"],
    short: "Specific Learning Disability — IDEA category for processing-based learning issues like dyslexia, dysgraphia, and dyscalculia.",
    long: "SLD is a disorder in one or more of the basic psychological processes used in understanding or using language. Each state has its own model for identifying it (PSW, severe discrepancy, or RtI).",
    source: "34 C.F.R. § 300.8(c)(10)",
    category: "law",
  },
  {
    term: "SDI",
    short: "Specially Designed Instruction — the heart of an IEP: changes to instructional content, methodology, or delivery designed for the student.",
    long: "SDI is what makes special education 'special'. It's adapting the WHAT, HOW, or DELIVERY of instruction to the child's unique needs — different from accommodations, which only change how a child accesses the standard curriculum.",
    source: "34 C.F.R. § 300.39(b)(3)",
    category: "service",
  },
  {
    term: "Triennial",
    short: "The 3-year re-evaluation requirement — schools must re-evaluate kids on IEPs at least every 3 years.",
    long: "Schools must conduct a re-evaluation at least every 3 years (or sooner if requested by parent or teacher). If the team decides no new testing is needed, they must say that in writing and you can disagree.",
    source: "34 C.F.R. § 300.303",
    category: "process",
  },
];

/** Lookup a glossary entry by term or alias (case-insensitive). */
export function findGlossary(term: string): GlossaryEntry | undefined {
  const t = term.trim().toLowerCase();
  return GLOSSARY.find(
    (g) =>
      g.term.toLowerCase() === t ||
      (g.aliases ?? []).some((a) => a.toLowerCase() === t),
  );
}
