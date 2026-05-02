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

  // ───────────── TEXAS IEP CATEGORIES (19 TAC § 89.1040) ─────────────
  {
    name: "Learning Disability",
    state: "TX",
    program: "IEP",
    code: "LD",
    description:
      "A disorder in one or more basic psychological processes that causes problems with learning, including dyslexia, dysgraphia, and dyscalculia. Texas requires Response to Intervention data and a Pattern of Strengths and Weaknesses analysis.",
    evidenceMarkers: [
      "dyslexia",
      "dysgraphia",
      "dyscalculia",
      "specific learning disability",
      "PSW",
      "RtI",
      "tier 3",
      "processing deficit",
    ],
    citation: "19 TAC § 89.1040(c)(10); 34 C.F.R. § 300.8(c)(10)",
  },
  {
    name: "Autism",
    state: "TX",
    program: "IEP",
    code: "AU",
    description:
      "A developmental disability significantly affecting verbal and nonverbal communication and social interaction, generally evident before age three.",
    evidenceMarkers: ["autism", "ASD", "ADOS", "social communication", "stereotyped"],
    citation: "19 TAC § 89.1040(c)(1)",
  },
  {
    name: "Other Health Impairment",
    state: "TX",
    program: "IEP",
    code: "OHI",
    description:
      "Limited strength, vitality, or alertness due to chronic or acute health problems — frequently the eligibility used for ADHD in Texas.",
    evidenceMarkers: [
      "ADHD",
      "ADD",
      "attention deficit",
      "diabetes",
      "epilepsy",
      "Tourette",
      "asthma",
      "leukemia",
    ],
    citation: "19 TAC § 89.1040(c)(9)",
  },
  {
    name: "Emotional Disturbance",
    state: "TX",
    program: "IEP",
    code: "ED",
    description:
      "A condition exhibiting one or more emotional or behavioral characteristics over a long period of time and to a marked degree that adversely affects educational performance.",
    evidenceMarkers: [
      "emotional disturbance",
      "anxiety disorder",
      "major depression",
      "bipolar",
      "PTSD",
      "trauma",
      "school refusal",
    ],
    citation: "19 TAC § 89.1040(c)(5)",
  },
  {
    name: "Speech Impairment",
    state: "TX",
    program: "IEP",
    code: "SI",
    description:
      "A communication disorder, including stuttering, impaired articulation, language impairment, or voice impairment that adversely affects educational performance.",
    evidenceMarkers: [
      "articulation",
      "stuttering",
      "expressive language",
      "receptive language",
      "phonological",
      "voice disorder",
    ],
    citation: "19 TAC § 89.1040(c)(11)",
  },
  {
    name: "Intellectual Disability",
    state: "TX",
    program: "IEP",
    code: "ID",
    description:
      "Significantly subaverage general intellectual functioning, existing concurrently with deficits in adaptive behavior, manifested during the developmental period.",
    evidenceMarkers: [
      "intellectual disability",
      "FSIQ below 70",
      "adaptive behavior",
      "Vineland",
      "ABAS",
    ],
    citation: "19 TAC § 89.1040(c)(6)",
  },
  {
    name: "Auditory Impairment",
    state: "TX",
    program: "IEP",
    code: "AI",
    description:
      "An impairment in hearing — fluctuating or permanent — that adversely affects a child's educational performance. Texas uses 'Auditory Impairment' instead of 'Hearing Impairment'.",
    evidenceMarkers: ["hearing loss", "deaf", "hard of hearing", "audiogram", "cochlear"],
    citation: "19 TAC § 89.1040(c)(3)",
  },
  {
    name: "Visual Impairment",
    state: "TX",
    program: "IEP",
    code: "VI",
    description:
      "An impairment in vision that, even with correction, adversely affects educational performance.",
    evidenceMarkers: ["visual impairment", "low vision", "legally blind", "cortical visual"],
    citation: "19 TAC § 89.1040(c)(13)",
  },
  {
    name: "Orthopedic Impairment",
    state: "TX",
    program: "IEP",
    code: "OI",
    description:
      "A severe orthopedic impairment that adversely affects educational performance.",
    evidenceMarkers: ["cerebral palsy", "spina bifida", "muscular dystrophy", "orthopedic"],
    citation: "19 TAC § 89.1040(c)(8)",
  },
  {
    name: "Traumatic Brain Injury",
    state: "TX",
    program: "IEP",
    code: "TBI",
    description:
      "An acquired injury to the brain caused by an external physical force resulting in functional or psychosocial impairment.",
    evidenceMarkers: ["TBI", "traumatic brain injury", "post-concussive", "concussion sequelae"],
    citation: "19 TAC § 89.1040(c)(12)",
  },
  {
    name: "Multiple Disabilities",
    state: "TX",
    program: "IEP",
    code: "MD",
    description:
      "Concomitant impairments such that the combination causes severe educational needs that cannot be addressed by programs solely for one of the impairments.",
    evidenceMarkers: ["multiple disabilities", "co-occurring"],
    citation: "19 TAC § 89.1040(c)(7)",
  },
  {
    name: "Deaf-Blindness",
    state: "TX",
    program: "IEP",
    code: "DB",
    description:
      "Concomitant hearing and visual impairments causing severe communication and other developmental needs.",
    evidenceMarkers: ["deafblind", "deaf-blind", "dual sensory"],
    citation: "19 TAC § 89.1040(c)(2)",
  },
  {
    name: "Non-Categorical Early Childhood (ages 3–5)",
    state: "TX",
    program: "IEP",
    code: "NCEC",
    description:
      "Texas-specific eligibility for children ages 3 through 5 with a disability where a single categorical determination is not yet appropriate.",
    evidenceMarkers: [
      "non-categorical",
      "early childhood",
      "developmental delay",
      "early intervention",
    ],
    citation: "19 TAC § 89.1040(c)(4)",
  },

  // ───────────── NEW YORK IEP CATEGORIES (8 NYCRR § 200.1(zz)) ─────────────
  {
    name: "Learning Disability",
    state: "NY",
    program: "IEP",
    code: "LD",
    description:
      "A disorder in one or more of the basic psychological processes that may manifest as imperfect ability to listen, think, speak, read, write, spell, or do mathematical calculations.",
    evidenceMarkers: [
      "dyslexia",
      "dysgraphia",
      "dyscalculia",
      "learning disability",
      "PSW",
      "RtI",
      "processing",
    ],
    citation: "8 NYCRR § 200.1(zz)(6); 34 C.F.R. § 300.8(c)(10)",
  },
  {
    name: "Autism",
    state: "NY",
    program: "IEP",
    code: "AU",
    description:
      "A developmental disability significantly affecting verbal and nonverbal communication and social interaction, generally evident before age three.",
    evidenceMarkers: ["autism", "ASD", "ADOS", "social communication", "restricted repetitive"],
    citation: "8 NYCRR § 200.1(zz)(1)",
  },
  {
    name: "Other Health-Impairment",
    state: "NY",
    program: "IEP",
    code: "OHI",
    description:
      "Limited strength, vitality, or alertness, including a heightened alertness to environmental stimuli, that adversely affects educational performance — frequently used for ADHD in NY.",
    evidenceMarkers: ["ADHD", "ADD", "attention deficit", "Tourette", "epilepsy", "diabetes", "asthma"],
    citation: "8 NYCRR § 200.1(zz)(10)",
  },
  {
    name: "Emotional Disability",
    state: "NY",
    program: "IEP",
    code: "ED",
    description:
      "A condition exhibiting characteristics over a long period of time and to a marked degree adversely affecting educational performance — including anxiety, depression, and trauma-related conditions.",
    evidenceMarkers: [
      "emotional disturbance",
      "anxiety disorder",
      "major depression",
      "bipolar",
      "PTSD",
      "school refusal",
    ],
    citation: "8 NYCRR § 200.1(zz)(4)",
  },
  {
    name: "Speech or Language Impairment",
    state: "NY",
    program: "IEP",
    code: "SLI",
    description:
      "A communication disorder such as stuttering, impaired articulation, a language impairment, or a voice impairment that adversely affects a student's educational performance.",
    evidenceMarkers: ["articulation", "stuttering", "expressive", "receptive", "phonological"],
    citation: "8 NYCRR § 200.1(zz)(11)",
  },
  {
    name: "Intellectual Disability",
    state: "NY",
    program: "IEP",
    code: "ID",
    description:
      "Significantly subaverage general intellectual functioning, existing concurrently with deficits in adaptive behavior, manifested during the developmental period.",
    evidenceMarkers: ["intellectual disability", "FSIQ below 70", "Vineland", "ABAS", "adaptive"],
    citation: "8 NYCRR § 200.1(zz)(7)",
  },
  {
    name: "Hearing Impairment",
    state: "NY",
    program: "IEP",
    code: "HI",
    description:
      "An impairment in hearing, fluctuating or permanent, that adversely affects educational performance but is not included under the definition of deafness.",
    evidenceMarkers: ["hearing loss", "hard of hearing", "audiogram", "cochlear"],
    citation: "8 NYCRR § 200.1(zz)(5)",
  },
  {
    name: "Deafness",
    state: "NY",
    program: "IEP",
    code: "D",
    description:
      "A hearing impairment so severe that the student is impaired in processing linguistic information through hearing, with or without amplification.",
    evidenceMarkers: ["deaf", "profound hearing loss", "ASL"],
    citation: "8 NYCRR § 200.1(zz)(3)",
  },
  {
    name: "Visual Impairment Including Blindness",
    state: "NY",
    program: "IEP",
    code: "VI",
    description:
      "An impairment in vision that, even with correction, adversely affects educational performance.",
    evidenceMarkers: ["visual impairment", "low vision", "legally blind", "cortical visual"],
    citation: "8 NYCRR § 200.1(zz)(13)",
  },
  {
    name: "Orthopedic Impairment",
    state: "NY",
    program: "IEP",
    code: "OI",
    description:
      "A severe orthopedic impairment that adversely affects educational performance.",
    evidenceMarkers: ["cerebral palsy", "spina bifida", "muscular dystrophy", "orthopedic"],
    citation: "8 NYCRR § 200.1(zz)(9)",
  },
  {
    name: "Traumatic Brain Injury",
    state: "NY",
    program: "IEP",
    code: "TBI",
    description:
      "An acquired injury to the brain caused by an external physical force resulting in functional or psychosocial impairment.",
    evidenceMarkers: ["TBI", "traumatic brain injury", "post-concussive"],
    citation: "8 NYCRR § 200.1(zz)(12)",
  },
  {
    name: "Multiple Disabilities",
    state: "NY",
    program: "IEP",
    code: "MD",
    description:
      "Concomitant impairments, the combination of which causes such severe educational needs that they cannot be accommodated in special education programs solely for one of the impairments.",
    evidenceMarkers: ["multiple disabilities", "co-occurring"],
    citation: "8 NYCRR § 200.1(zz)(8)",
  },
  {
    name: "Deaf-Blindness",
    state: "NY",
    program: "IEP",
    code: "DB",
    description:
      "Concomitant hearing and visual impairments causing severe communication and other developmental and educational needs.",
    evidenceMarkers: ["deafblind", "deaf-blind", "dual sensory"],
    citation: "8 NYCRR § 200.1(zz)(2)",
  },
  {
    name: "Preschool Student with a Disability (ages 3–5)",
    state: "NY",
    program: "IEP",
    code: "PSWD",
    description:
      "Children ages 3–5 evaluated under New York's Committee on Preschool Special Education (CPSE) framework who exhibit a significant delay or specific impairment.",
    evidenceMarkers: ["preschool", "CPSE", "developmental delay", "early intervention"],
    citation: "8 NYCRR § 200.1(mm)",
  },

  // ───────────── FLORIDA IEP CATEGORIES (Rule 6A-6.030xx FAC) ─────────────
  {
    name: "Specific Learning Disabilities",
    state: "FL",
    program: "IEP",
    code: "SLD",
    description:
      "A disorder in one or more of the basic psychological processes; Florida uses a Response-to-Intervention model under Rule 6A-6.03018.",
    evidenceMarkers: [
      "dyslexia",
      "dysgraphia",
      "dyscalculia",
      "specific learning disability",
      "RtI",
      "MTSS",
      "tier 3",
    ],
    citation: "Rule 6A-6.03018, F.A.C.",
  },
  {
    name: "Autism Spectrum Disorder",
    state: "FL",
    program: "IEP",
    code: "ASD",
    description:
      "A range of pervasive developmental disorders, with onset typically before age three, adversely affecting verbal and non-verbal communication and social interaction.",
    evidenceMarkers: ["autism", "ASD", "ADOS", "social communication", "restricted repetitive"],
    citation: "Rule 6A-6.03023, F.A.C.",
  },
  {
    name: "Other Health Impaired",
    state: "FL",
    program: "IEP",
    code: "OHI",
    description:
      "Limited strength, vitality, or alertness due to chronic or acute health problems that adversely affect educational performance.",
    evidenceMarkers: ["ADHD", "ADD", "diabetes", "epilepsy", "Tourette", "asthma", "leukemia"],
    citation: "Rule 6A-6.030152, F.A.C.",
  },
  {
    name: "Emotional/Behavioral Disability",
    state: "FL",
    program: "IEP",
    code: "EBD",
    description:
      "A persistent pattern of emotional or behavioral responses adversely affecting performance to the extent that it requires special education and related services.",
    evidenceMarkers: ["emotional disturbance", "anxiety disorder", "major depression", "trauma", "PTSD"],
    citation: "Rule 6A-6.03016, F.A.C.",
  },
  {
    name: "Language Impaired",
    state: "FL",
    program: "IEP",
    code: "LI",
    description:
      "A disorder of language (phonology, morphology, syntax, semantics, pragmatics) that adversely affects educational performance.",
    evidenceMarkers: ["expressive language", "receptive language", "language disorder", "CELF"],
    citation: "Rule 6A-6.030121, F.A.C.",
  },
  {
    name: "Speech Impaired",
    state: "FL",
    program: "IEP",
    code: "SI",
    description:
      "A communication disorder of articulation, fluency, or voice that adversely affects educational performance.",
    evidenceMarkers: ["articulation", "stuttering", "fluency", "voice disorder"],
    citation: "Rule 6A-6.030122, F.A.C.",
  },
  {
    name: "Intellectual Disabilities",
    state: "FL",
    program: "IEP",
    code: "InD",
    description:
      "Significantly below average general intellectual and adaptive functioning manifested during the developmental period.",
    evidenceMarkers: ["intellectual disability", "FSIQ below 70", "adaptive behavior", "Vineland"],
    citation: "Rule 6A-6.03011, F.A.C.",
  },
  {
    name: "Deaf or Hard-of-Hearing",
    state: "FL",
    program: "IEP",
    code: "DHH",
    description:
      "An impairment in hearing, fluctuating or permanent, that adversely affects educational performance.",
    evidenceMarkers: ["hearing loss", "deaf", "hard of hearing", "audiogram", "cochlear"],
    citation: "Rule 6A-6.03013, F.A.C.",
  },
  {
    name: "Visually Impaired",
    state: "FL",
    program: "IEP",
    code: "VI",
    description:
      "An impairment in vision that, even with correction, adversely affects educational performance.",
    evidenceMarkers: ["visual impairment", "low vision", "legally blind"],
    citation: "Rule 6A-6.03014, F.A.C.",
  },
  {
    name: "Orthopedically Impaired",
    state: "FL",
    program: "IEP",
    code: "OI",
    description:
      "A severe orthopedic impairment that adversely affects educational performance.",
    evidenceMarkers: ["cerebral palsy", "spina bifida", "muscular dystrophy", "orthopedic"],
    citation: "Rule 6A-6.03014, F.A.C.",
  },
  {
    name: "Traumatic Brain Injured",
    state: "FL",
    program: "IEP",
    code: "TBI",
    description:
      "An acquired injury to the brain caused by an external physical force resulting in functional or psychosocial impairment.",
    evidenceMarkers: ["TBI", "traumatic brain injury", "post-concussive"],
    citation: "Rule 6A-6.030241, F.A.C.",
  },
  {
    name: "Dual-Sensory Impaired",
    state: "FL",
    program: "IEP",
    code: "DSI",
    description:
      "Concomitant hearing and visual impairments causing severe communication and other educational needs.",
    evidenceMarkers: ["deafblind", "deaf-blind", "dual sensory"],
    citation: "Rule 6A-6.03022, F.A.C.",
  },
  {
    name: "Established Conditions / Developmentally Delayed (ages 3–5)",
    state: "FL",
    program: "IEP",
    code: "ECDD",
    description:
      "Florida eligibility for children ages 3 through 5 with an established medical condition or significant developmental delay.",
    evidenceMarkers: [
      "Down syndrome",
      "fragile X",
      "fetal alcohol",
      "developmental delay",
      "established condition",
    ],
    citation: "Rule 6A-6.03027, F.A.C.",
  },
  {
    name: "Hospital/Homebound",
    state: "FL",
    program: "IEP",
    code: "HH",
    description:
      "Florida eligibility for students confined at home or in a hospital setting for medical reasons for an extended period.",
    evidenceMarkers: ["homebound", "hospital instruction", "medically fragile"],
    citation: "Rule 6A-6.03020, F.A.C.",
  },

  // ───────────── ILLINOIS IEP CATEGORIES (23 IAC § 226.75) ─────────────
  {
    name: "Specific Learning Disability",
    state: "IL",
    program: "IEP",
    code: "SLD",
    description:
      "A disorder in one or more of the basic psychological processes. Illinois allows either a Response to Intervention model or a discrepancy model.",
    evidenceMarkers: [
      "dyslexia",
      "dysgraphia",
      "dyscalculia",
      "specific learning disability",
      "PSW",
      "RtI",
      "MTSS",
    ],
    citation: "23 IAC § 226.75; 34 C.F.R. § 300.8(c)(10)",
  },
  {
    name: "Autism",
    state: "IL",
    program: "IEP",
    code: "AU",
    description:
      "A developmental disability significantly affecting verbal and nonverbal communication and social interaction.",
    evidenceMarkers: ["autism", "ASD", "ADOS", "social communication"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Other Health Impairment",
    state: "IL",
    program: "IEP",
    code: "OHI",
    description:
      "Limited strength, vitality, or alertness due to chronic or acute health problems — common pathway for ADHD eligibility in Illinois.",
    evidenceMarkers: ["ADHD", "ADD", "Tourette", "epilepsy", "diabetes", "asthma"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Emotional Disability",
    state: "IL",
    program: "IEP",
    code: "ED",
    description:
      "A condition exhibiting characteristics over a long period of time and to a marked degree that adversely affects educational performance.",
    evidenceMarkers: [
      "emotional disturbance",
      "anxiety disorder",
      "major depression",
      "PTSD",
      "trauma",
      "school refusal",
    ],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Speech or Language Impairment",
    state: "IL",
    program: "IEP",
    code: "SLI",
    description:
      "A communication disorder such as stuttering, impaired articulation, language impairment, or voice impairment.",
    evidenceMarkers: ["articulation", "stuttering", "expressive", "receptive", "phonological"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Intellectual Disability",
    state: "IL",
    program: "IEP",
    code: "ID",
    description:
      "Significantly subaverage general intellectual functioning with deficits in adaptive behavior manifested during the developmental period.",
    evidenceMarkers: ["intellectual disability", "FSIQ below 70", "adaptive behavior", "Vineland", "ABAS"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Hearing Impairment",
    state: "IL",
    program: "IEP",
    code: "HI",
    description:
      "An impairment in hearing, fluctuating or permanent, that adversely affects educational performance.",
    evidenceMarkers: ["hearing loss", "hard of hearing", "audiogram"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Deafness",
    state: "IL",
    program: "IEP",
    code: "D",
    description:
      "A hearing impairment so severe that the child is impaired in processing linguistic information through hearing with or without amplification.",
    evidenceMarkers: ["deaf", "profound hearing loss", "ASL"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Visual Impairment",
    state: "IL",
    program: "IEP",
    code: "VI",
    description:
      "An impairment in vision that, even with correction, adversely affects educational performance.",
    evidenceMarkers: ["visual impairment", "low vision", "legally blind"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Orthopedic Impairment",
    state: "IL",
    program: "IEP",
    code: "OI",
    description:
      "A severe orthopedic impairment that adversely affects educational performance.",
    evidenceMarkers: ["cerebral palsy", "spina bifida", "muscular dystrophy"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Traumatic Brain Injury",
    state: "IL",
    program: "IEP",
    code: "TBI",
    description:
      "An acquired injury to the brain caused by an external physical force resulting in functional or psychosocial impairment.",
    evidenceMarkers: ["TBI", "traumatic brain injury", "post-concussive"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Multiple Disabilities",
    state: "IL",
    program: "IEP",
    code: "MD",
    description:
      "Concomitant impairments such that the combination causes severe educational needs that cannot be addressed by programs solely for one of the impairments.",
    evidenceMarkers: ["multiple disabilities", "co-occurring"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Deaf-Blindness",
    state: "IL",
    program: "IEP",
    code: "DB",
    description:
      "Concomitant hearing and visual impairments causing severe communication and other developmental needs.",
    evidenceMarkers: ["deafblind", "deaf-blind", "dual sensory"],
    citation: "23 IAC § 226.75",
  },
  {
    name: "Developmental Delay (ages 3–9)",
    state: "IL",
    program: "IEP",
    code: "DD",
    description:
      "Illinois eligibility for children ages 3 through 9 experiencing developmental delay in physical, cognitive, communication, social-emotional, or adaptive development.",
    evidenceMarkers: ["developmental delay", "global delay", "early intervention"],
    citation: "23 IAC § 226.75; 34 C.F.R. § 300.8(b)",
  },

  // ───────────── MASSACHUSETTS IEP CATEGORIES (603 CMR 28) ─────────────
  {
    name: "Specific Learning Disability",
    state: "MA",
    program: "IEP",
    code: "SLD",
    description:
      "A disorder in one or more of the basic psychological processes affecting listening, thinking, speaking, reading, writing, spelling, or math. Teams consider instructional response and assessment data.",
    evidenceMarkers: [
      "dyslexia",
      "dysgraphia",
      "dyscalculia",
      "specific learning disability",
      "PSW",
      "RtI",
      "MTSS",
      "tier 2",
    ],
    citation: "603 CMR 28.02(7); 34 C.F.R. § 300.8(c)(10)",
  },
  {
    name: "Autism",
    state: "MA",
    program: "IEP",
    code: "AU",
    description:
      "A developmental disability significantly affecting verbal and nonverbal communication and social interaction.",
    evidenceMarkers: ["autism", "ASD", "ADOS", "social communication"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Other Health Impairment",
    state: "MA",
    program: "IEP",
    code: "OHI",
    description:
      "Limited strength, vitality, or alertness due to chronic or acute health problems — a common pathway for ADHD eligibility.",
    evidenceMarkers: ["ADHD", "ADD", "Tourette", "epilepsy", "diabetes", "asthma"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Emotional Disability",
    state: "MA",
    program: "IEP",
    code: "ED",
    description:
      "A condition exhibiting one or more characteristics over a long period of time and to a marked degree that adversely affects educational performance.",
    evidenceMarkers: [
      "emotional disturbance",
      "anxiety disorder",
      "major depression",
      "PTSD",
      "trauma",
      "school refusal",
    ],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Communication",
    state: "MA",
    program: "IEP",
    code: "SLI",
    description:
      "Speech, language, and communication disorders including articulation, fluency, voice, and language impairment.",
    evidenceMarkers: ["articulation", "stuttering", "expressive", "receptive", "phonological", "CELF"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Intellectual Disability",
    state: "MA",
    program: "IEP",
    code: "ID",
    description:
      "Significantly subaverage general intellectual functioning with concurrent deficits in adaptive behavior.",
    evidenceMarkers: ["intellectual disability", "FSIQ below 70", "adaptive behavior", "Vineland", "ABAS"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Hearing Impairment",
    state: "MA",
    program: "IEP",
    code: "HI",
    description:
      "An impairment in hearing, whether permanent or fluctuating, that adversely affects educational performance.",
    evidenceMarkers: ["hearing loss", "hard of hearing", "audiogram"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Deafness",
    state: "MA",
    program: "IEP",
    code: "D",
    description:
      "A hearing impairment so severe that the student is impaired in processing linguistic information through hearing, with or without amplification.",
    evidenceMarkers: ["deaf", "profound hearing loss", "ASL"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Visual Impairment",
    state: "MA",
    program: "IEP",
    code: "VI",
    description:
      "An impairment in vision that, even with correction, adversely affects educational performance.",
    evidenceMarkers: ["visual impairment", "low vision", "legally blind"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Orthopedic Impairment",
    state: "MA",
    program: "IEP",
    code: "OI",
    description:
      "A severe orthopedic impairment that adversely affects educational performance.",
    evidenceMarkers: ["cerebral palsy", "spina bifida", "muscular dystrophy"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Traumatic Brain Injury",
    state: "MA",
    program: "IEP",
    code: "TBI",
    description:
      "An acquired injury to the brain caused by an external physical force resulting in functional disability.",
    evidenceMarkers: ["TBI", "traumatic brain injury", "post-concussive"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Multiple Disabilities",
    state: "MA",
    program: "IEP",
    code: "MD",
    description:
      "Concomitant impairments that cause such severe educational needs that they cannot be addressed through a program for one impairment alone.",
    evidenceMarkers: ["multiple disabilities", "co-occurring"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Deaf-Blindness",
    state: "MA",
    program: "IEP",
    code: "DB",
    description:
      "Concomitant hearing and visual impairments causing severe communication and other developmental needs.",
    evidenceMarkers: ["deafblind", "deaf-blind", "dual sensory"],
    citation: "603 CMR 28.02(7)",
  },
  {
    name: "Developmental Delay (ages 3–7)",
    state: "MA",
    program: "IEP",
    code: "DD",
    description:
      "Massachusetts allows developmental delay eligibility for students at least 3 but not more than 7 years of age who demonstrate delays in one or more developmental areas.",
    evidenceMarkers: ["developmental delay", "global delay", "early intervention", "preschool"],
    citation: "603 CMR 28.02(7)",
  },

  // ───────────── 504 PLAN — TX, NY, FL, IL, MA ─────────────
  ...(["TX", "NY", "FL", "IL", "MA"] as const).map((s) => ({
    name: "Section 504 Plan",
    state: s,
    program: "504" as const,
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
  })),
];
