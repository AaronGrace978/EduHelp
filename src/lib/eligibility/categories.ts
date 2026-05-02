import type { EligibilityCategory } from "./types";

/**
 * IEP categories under IDEA, with state-specific Colorado (ECEA) and
 * California (CCR Title 5) terminology and citations.
 *
 * Sources:
 *  - IDEA, 34 C.F.R. § 300.8
 *  - Colorado ECEA Rules, 1 CCR 301-8 § 2.08
 *  - California Education Code §§ 56026, 56333-56338 and 5 CCR §§ 3030, 3031
 *
 * NOTE: This is informational only — final eligibility is determined by the
 * IEP team / multidisciplinary team after a full evaluation.
 */
export const ELIGIBILITY_CATEGORIES: EligibilityCategory[] = [
  // ───────────── COLORADO IEP CATEGORIES ─────────────
  {
    name: "Specific Learning Disability",
    state: "CO",
    program: "IEP",
    code: "SLD",
    description:
      "A disorder in one or more basic psychological processes involved in understanding or using language — written or spoken — that may show up as trouble with reading, writing, listening, speaking, math, or reasoning.",
    evidenceMarkers: [
      "dyslexia",
      "dysgraphia",
      "dyscalculia",
      "reading disorder",
      "specific learning disability",
      "processing deficit",
      "phonological awareness",
      "patterns of strengths and weaknesses",
      "PSW",
    ],
    citation: "Colorado ECEA 2.08(8); 34 C.F.R. § 300.8(c)(10)",
  },
  {
    name: "Autism Spectrum Disorder",
    state: "CO",
    program: "IEP",
    code: "ASD",
    description:
      "A developmental disability significantly affecting verbal and nonverbal communication and social interaction, generally evident before age three, that adversely affects educational performance.",
    evidenceMarkers: [
      "autism",
      "autism spectrum",
      "ASD",
      "ADOS",
      "ADI-R",
      "social communication disorder",
      "restricted, repetitive",
      "stereotyped",
    ],
    citation: "Colorado ECEA 2.08(1); 34 C.F.R. § 300.8(c)(1)",
  },
  {
    name: "Other Health Impaired",
    state: "CO",
    program: "IEP",
    code: "OHI",
    description:
      "Limited strength, vitality, or alertness — including a heightened alertness to environmental stimuli — that adversely affects educational performance. Often used for ADHD, Tourette syndrome, epilepsy, diabetes, etc.",
    evidenceMarkers: [
      "ADHD",
      "ADD",
      "attention deficit",
      "Tourette",
      "epilepsy",
      "diabetes",
      "leukemia",
      "asthma",
      "chronic illness",
      "executive functioning",
    ],
    citation: "Colorado ECEA 2.08(7); 34 C.F.R. § 300.8(c)(9)",
  },
  {
    name: "Serious Emotional Disability",
    state: "CO",
    program: "IEP",
    code: "SED",
    description:
      "A condition exhibiting one or more emotional or behavioral characteristics over a long period of time and to a marked degree that adversely affects educational performance — for example, anxiety, depression, or trauma-related disorders.",
    evidenceMarkers: [
      "anxiety disorder",
      "major depression",
      "PTSD",
      "trauma",
      "oppositional defiant",
      "conduct disorder",
      "school refusal",
      "emotional disturbance",
    ],
    citation: "Colorado ECEA 2.08(11); 34 C.F.R. § 300.8(c)(4)",
  },
  {
    name: "Speech or Language Impairment",
    state: "CO",
    program: "IEP",
    code: "SLI",
    description:
      "A communication disorder such as stuttering, impaired articulation, language impairment, or voice impairment that adversely affects educational performance.",
    evidenceMarkers: [
      "articulation",
      "stuttering",
      "expressive language",
      "receptive language",
      "phonological",
      "voice disorder",
      "language disorder",
    ],
    citation: "Colorado ECEA 2.08(10); 34 C.F.R. § 300.8(c)(11)",
  },
  {
    name: "Intellectual Disability",
    state: "CO",
    program: "IEP",
    code: "ID",
    description:
      "Significantly subaverage general intellectual functioning existing concurrently with deficits in adaptive behavior and manifested during the developmental period.",
    evidenceMarkers: [
      "intellectual disability",
      "cognitive impairment",
      "adaptive behavior",
      "Vineland",
      "ABAS",
      "FSIQ below 70",
      "mild intellectual",
      "moderate intellectual",
    ],
    citation: "Colorado ECEA 2.08(6); 34 C.F.R. § 300.8(c)(6)",
  },
  {
    name: "Hearing Impairment, Including Deafness",
    state: "CO",
    program: "IEP",
    code: "HI",
    description:
      "An impairment in hearing — fluctuating or permanent — that adversely affects a child's educational performance.",
    evidenceMarkers: [
      "hearing loss",
      "deaf",
      "hard of hearing",
      "audiogram",
      "cochlear implant",
      "hearing aid",
      "sensorineural",
    ],
    citation: "Colorado ECEA 2.08(3); 34 C.F.R. § 300.8(c)(3) & (5)",
  },
  {
    name: "Visual Impairment, Including Blindness",
    state: "CO",
    program: "IEP",
    code: "VI",
    description:
      "An impairment in vision that, even with correction, adversely affects educational performance.",
    evidenceMarkers: [
      "visual impairment",
      "low vision",
      "legally blind",
      "cortical visual",
      "ophthalmologic",
    ],
    citation: "Colorado ECEA 2.08(13); 34 C.F.R. § 300.8(c)(13)",
  },
  {
    name: "Orthopedic Impairment",
    state: "CO",
    program: "IEP",
    code: "OI",
    description:
      "A severe orthopedic impairment that adversely affects a child's educational performance — including impairments caused by congenital anomaly, disease, or other causes (e.g., cerebral palsy, amputation).",
    evidenceMarkers: [
      "cerebral palsy",
      "muscular dystrophy",
      "spina bifida",
      "amputation",
      "orthopedic",
      "mobility impairment",
    ],
    citation: "Colorado ECEA 2.08(9); 34 C.F.R. § 300.8(c)(8)",
  },
  {
    name: "Traumatic Brain Injury",
    state: "CO",
    program: "IEP",
    code: "TBI",
    description:
      "An acquired injury to the brain caused by an external physical force resulting in total or partial functional disability or psychosocial impairment.",
    evidenceMarkers: [
      "traumatic brain injury",
      "TBI",
      "concussion sequelae",
      "post-concussive",
      "anoxic",
      "brain injury",
    ],
    citation: "Colorado ECEA 2.08(12); 34 C.F.R. § 300.8(c)(12)",
  },
  {
    name: "Multiple Disabilities",
    state: "CO",
    program: "IEP",
    code: "MD",
    description:
      "Concomitant impairments — the combination of which causes such severe educational needs that they cannot be accommodated in special education programs solely for one of the impairments.",
    evidenceMarkers: ["multiple disabilities", "co-occurring disabilities"],
    citation: "Colorado ECEA 2.08(5); 34 C.F.R. § 300.8(c)(7)",
  },
  {
    name: "Deaf-Blindness",
    state: "CO",
    program: "IEP",
    code: "DB",
    description:
      "Concomitant hearing and visual impairments, the combination of which causes such severe communication and other needs that the child cannot be accommodated in programs solely for deaf or blind children.",
    evidenceMarkers: ["deafblind", "deaf-blind", "dual sensory impairment"],
    citation: "Colorado ECEA 2.08(2); 34 C.F.R. § 300.8(c)(2)",
  },
  {
    name: "Developmental Delay (ages 3–8)",
    state: "CO",
    program: "IEP",
    code: "DD",
    description:
      "A child ages 3 through 8 experiencing developmental delays in physical, cognitive, communication, social-emotional, or adaptive development that adversely affects educational performance.",
    evidenceMarkers: [
      "developmental delay",
      "global delay",
      "early intervention",
      "Part C",
      "Bayley",
    ],
    citation: "Colorado ECEA 2.08(4); 34 C.F.R. § 300.8(b)",
  },
  {
    name: "Infant/Toddler with Disability (Part C)",
    state: "CO",
    program: "IEP",
    code: "EI",
    description:
      "Infants and toddlers (birth through age 2) who meet eligibility for Part C early intervention services through Early Intervention Colorado.",
    evidenceMarkers: [
      "Part C",
      "early intervention",
      "IFSP",
      "infant",
      "toddler",
    ],
    citation: "Early Intervention Colorado; 34 C.F.R. Part 303",
  },

  // ───────────── CALIFORNIA IEP CATEGORIES ─────────────
  {
    name: "Specific Learning Disability",
    state: "CA",
    program: "IEP",
    code: "SLD",
    description:
      "A disorder in one or more basic psychological processes that results in a severe discrepancy between intellectual ability and achievement, or that meets a Pattern of Strengths and Weaknesses or Response to Intervention model under California rules.",
    evidenceMarkers: [
      "dyslexia",
      "dysgraphia",
      "dyscalculia",
      "specific learning disability",
      "severe discrepancy",
      "PSW",
      "RTI",
      "MTSS",
      "processing disorder",
    ],
    citation: "5 CCR § 3030(b)(10); Cal. Ed. Code § 56337",
  },
  {
    name: "Autism",
    state: "CA",
    program: "IEP",
    code: "AUT",
    description:
      "A developmental disability significantly affecting verbal and nonverbal communication and social interaction, generally evident before age three, that adversely affects educational performance.",
    evidenceMarkers: [
      "autism",
      "ASD",
      "ADOS",
      "social communication",
      "restricted repetitive",
    ],
    citation: "5 CCR § 3030(b)(1)",
  },
  {
    name: "Other Health Impairment",
    state: "CA",
    program: "IEP",
    code: "OHI",
    description:
      "Limited strength, vitality, or alertness, including heightened alertness to environmental stimuli, due to chronic or acute health problems that adversely affect a child's educational performance — frequently the eligibility used for ADHD.",
    evidenceMarkers: [
      "ADHD",
      "ADD",
      "attention deficit",
      "diabetes",
      "epilepsy",
      "heart condition",
      "leukemia",
      "Tourette",
      "asthma",
    ],
    citation: "5 CCR § 3030(b)(9)",
  },
  {
    name: "Emotional Disturbance",
    state: "CA",
    program: "IEP",
    code: "ED",
    description:
      "A condition exhibiting one or more characteristics over a long period of time and to a marked degree that adversely affects educational performance — including pervasive mood, anxiety, or trauma-related disorders.",
    evidenceMarkers: [
      "emotional disturbance",
      "anxiety",
      "depression",
      "bipolar",
      "schizophrenia",
      "trauma",
      "school refusal",
    ],
    citation: "5 CCR § 3030(b)(4)",
  },
  {
    name: "Speech or Language Impairment",
    state: "CA",
    program: "IEP",
    code: "SLI",
    description:
      "A language or speech disorder such as articulation disorder, abnormal voice, fluency, or language disorder that adversely affects educational performance.",
    evidenceMarkers: [
      "articulation",
      "stuttering",
      "language disorder",
      "expressive",
      "receptive",
      "phonological",
    ],
    citation: "5 CCR § 3030(b)(11); Cal. Ed. Code § 56333",
  },
  {
    name: "Intellectual Disability",
    state: "CA",
    program: "IEP",
    code: "ID",
    description:
      "Significantly subaverage general intellectual functioning, existing concurrently with deficits in adaptive behavior, manifested during the developmental period.",
    evidenceMarkers: [
      "intellectual disability",
      "FSIQ below 70",
      "Vineland",
      "ABAS",
      "adaptive behavior",
    ],
    citation: "5 CCR § 3030(b)(6)",
  },
  {
    name: "Deaf / Hard of Hearing",
    state: "CA",
    program: "IEP",
    code: "DHH",
    description:
      "An impairment in hearing, fluctuating or permanent, that adversely affects educational performance.",
    evidenceMarkers: [
      "hearing loss",
      "deaf",
      "hard of hearing",
      "audiogram",
      "cochlear implant",
    ],
    citation: "5 CCR § 3030(b)(3) & (5)",
  },
  {
    name: "Visual Impairment, Including Blindness",
    state: "CA",
    program: "IEP",
    code: "VI",
    description:
      "An impairment in vision that, even with correction, adversely affects educational performance.",
    evidenceMarkers: [
      "visual impairment",
      "blind",
      "low vision",
      "cortical visual",
    ],
    citation: "5 CCR § 3030(b)(13)",
  },
  {
    name: "Orthopedic Impairment",
    state: "CA",
    program: "IEP",
    code: "OI",
    description:
      "A severe orthopedic impairment that adversely affects educational performance.",
    evidenceMarkers: [
      "cerebral palsy",
      "spina bifida",
      "muscular dystrophy",
      "orthopedic",
    ],
    citation: "5 CCR § 3030(b)(8)",
  },
  {
    name: "Traumatic Brain Injury",
    state: "CA",
    program: "IEP",
    code: "TBI",
    description:
      "An acquired injury to the brain caused by an external physical force resulting in functional or psychosocial impairment.",
    evidenceMarkers: ["TBI", "traumatic brain injury", "post-concussive"],
    citation: "5 CCR § 3030(b)(12)",
  },
  {
    name: "Multiple Disabilities",
    state: "CA",
    program: "IEP",
    code: "MD",
    description:
      "Two or more impairments occurring together, the combination of which causes such severe educational needs that they cannot be accommodated in programs designed solely for one of the impairments.",
    evidenceMarkers: ["multiple disabilities", "co-occurring"],
    citation: "5 CCR § 3030(b)(7)",
  },
  {
    name: "Deaf-Blindness",
    state: "CA",
    program: "IEP",
    code: "DB",
    description:
      "Concomitant hearing and visual impairments causing severe communication and other developmental needs.",
    evidenceMarkers: ["deafblind", "deaf-blind", "dual sensory"],
    citation: "5 CCR § 3030(b)(2)",
  },
  {
    name: "Established Medical Disability (ages 0–5)",
    state: "CA",
    program: "IEP",
    code: "EMD",
    description:
      "California-specific eligibility for children ages 3–5 with an established medical condition with a high probability of developmental delay.",
    evidenceMarkers: [
      "Down syndrome",
      "fragile X",
      "fetal alcohol",
      "congenital",
      "established medical disability",
    ],
    citation: "Cal. Ed. Code § 56441.11(b)(2)",
  },

  // ───────────── 504 PLAN (BOTH STATES) ─────────────
  {
    name: "Section 504 Plan",
    state: "CO",
    program: "504",
    code: "504",
    description:
      "A 504 plan provides accommodations for any student with a physical or mental impairment that substantially limits one or more major life activities — even if they don't qualify for an IEP.",
    evidenceMarkers: [
      "ADHD",
      "diabetes",
      "asthma",
      "anxiety",
      "depression",
      "food allergy",
      "seizure",
      "chronic pain",
      "concussion",
      "504",
      "accommodations",
    ],
    citation: "Section 504 of the Rehabilitation Act of 1973, 29 U.S.C. § 794",
  },
  {
    name: "Section 504 Plan",
    state: "CA",
    program: "504",
    code: "504",
    description:
      "A 504 plan provides accommodations for any student with a physical or mental impairment that substantially limits one or more major life activities — even if they don't qualify for an IEP.",
    evidenceMarkers: [
      "ADHD",
      "diabetes",
      "asthma",
      "anxiety",
      "depression",
      "food allergy",
      "seizure",
      "chronic pain",
      "concussion",
      "504",
      "accommodations",
    ],
    citation: "Section 504 of the Rehabilitation Act of 1973, 29 U.S.C. § 794",
  },
];
