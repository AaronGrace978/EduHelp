import type { StateCode } from "./eligibility/types";
import { STATE_NAMES } from "./eligibility/types";

export interface TemplateInputs {
  state: StateCode;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childGrade: string;
  schoolName: string;
  recipientName: string;
  recipientTitle: string;
  date: string;
  concerns: string;
  tone: "standard" | "firm";
}

export interface ProfileInputs {
  childName: string;
  childAge: string;
  childPronouns: string;
  state: StateCode;
  strengths: string;
  challenges: string;
  bestSupports: string;
  whatToAvoid: string;
  diagnoses: string;
  medications: string;
  emergencyContact: string;
}

interface StateRuleSet {
  name: string;
  eval: string;
  eligibility: string;
  pwn: string;
  iee: string;
  /** State-level complaint office for the escalation kit */
  stateComplaint: { agency: string; cite: string };
  /** Mediation citation */
  mediation: string;
  /** OCR (Office for Civil Rights) regional address */
  ocrRegion: string;
}

const STATE_RULES: Record<StateCode, StateRuleSet> = {
  CO: {
    name: "Colorado",
    eval: "Colorado ECEA Rules § 4.02(1)(b) and 34 C.F.R. § 300.301",
    eligibility: "Colorado ECEA Rules § 2.08",
    pwn: "34 C.F.R. § 300.503 and Colorado ECEA Rules § 6.02(7)",
    iee: "34 C.F.R. § 300.502 and Colorado ECEA Rules § 4.02(7)",
    stateComplaint: {
      agency: "Colorado Department of Education, Exceptional Student Services Unit",
      cite: "Colorado ECEA Rules § 6.02(8); 34 C.F.R. §§ 300.151–300.153",
    },
    mediation: "34 C.F.R. § 300.506; Colorado ECEA Rules § 6.02(9)",
    ocrRegion: "U.S. Department of Education OCR, Denver Office (Region VIII)",
  },
  CA: {
    name: "California",
    eval: "California Education Code § 56321 and 34 C.F.R. § 300.301",
    eligibility: "5 CCR § 3030 and Cal. Ed. Code § 56333",
    pwn: "34 C.F.R. § 300.503 and Cal. Ed. Code § 56500.4",
    iee: "34 C.F.R. § 300.502 and Cal. Ed. Code § 56329(b)",
    stateComplaint: {
      agency: "California Department of Education, Special Education Division",
      cite: "5 CCR §§ 4600–4687; 34 C.F.R. §§ 300.151–300.153",
    },
    mediation: "Cal. Ed. Code § 56500.3; 34 C.F.R. § 300.506",
    ocrRegion: "U.S. Department of Education OCR, San Francisco Office (Region IX)",
  },
  TX: {
    name: "Texas",
    eval: "19 TAC § 89.1011 and 34 C.F.R. § 300.301",
    eligibility: "19 TAC § 89.1040",
    pwn: "34 C.F.R. § 300.503 and 19 TAC § 89.1050",
    iee: "34 C.F.R. § 300.502 and 19 TAC § 89.1050",
    stateComplaint: {
      agency: "Texas Education Agency, Special Education Division",
      cite: "19 TAC § 89.1195; 34 C.F.R. §§ 300.151–300.153",
    },
    mediation: "19 TAC § 89.1193; 34 C.F.R. § 300.506",
    ocrRegion: "U.S. Department of Education OCR, Dallas Office (Region VI)",
  },
  NY: {
    name: "New York",
    eval: "8 NYCRR § 200.4(b) and 34 C.F.R. § 300.301",
    eligibility: "8 NYCRR § 200.1(zz) and § 200.4(c)",
    pwn: "34 C.F.R. § 300.503 and 8 NYCRR § 200.5",
    iee: "34 C.F.R. § 300.502 and 8 NYCRR § 200.5(g)",
    stateComplaint: {
      agency: "NYS Education Department, Office of Special Education",
      cite: "8 NYCRR § 200.5(l); 34 C.F.R. §§ 300.151–300.153",
    },
    mediation: "8 NYCRR § 200.5(h); 34 C.F.R. § 300.506",
    ocrRegion: "U.S. Department of Education OCR, New York Office (Region II)",
  },
  FL: {
    name: "Florida",
    eval: "Rule 6A-6.0331, F.A.C. and 34 C.F.R. § 300.301",
    eligibility: "Rules 6A-6.030xx, F.A.C.",
    pwn: "34 C.F.R. § 300.503 and Rule 6A-6.03311, F.A.C.",
    iee: "34 C.F.R. § 300.502 and Rule 6A-6.03311(6), F.A.C.",
    stateComplaint: {
      agency: "Florida Bureau of Exceptional Education and Student Services (BEESS)",
      cite: "Rule 6A-6.03311(9), F.A.C.; 34 C.F.R. §§ 300.151–300.153",
    },
    mediation: "Rule 6A-6.03311(8), F.A.C.; 34 C.F.R. § 300.506",
    ocrRegion: "U.S. Department of Education OCR, Atlanta Office (Region IV)",
  },
  IL: {
    name: "Illinois",
    eval: "23 IAC § 226.110 and 34 C.F.R. § 300.301",
    eligibility: "23 IAC § 226.75",
    pwn: "34 C.F.R. § 300.503 and 23 IAC § 226.520",
    iee: "34 C.F.R. § 300.502 and 23 IAC § 226.180",
    stateComplaint: {
      agency: "Illinois State Board of Education, Special Education Department",
      cite: "23 IAC § 226.570; 34 C.F.R. §§ 300.151–300.153",
    },
    mediation: "23 IAC § 226.560; 34 C.F.R. § 300.506",
    ocrRegion: "U.S. Department of Education OCR, Chicago Office (Region V)",
  },
  MA: {
    name: "Massachusetts",
    eval: "603 CMR 28.04 and 34 C.F.R. § 300.301",
    eligibility: "603 CMR 28.02(7) and 603 CMR 28.05",
    pwn: "34 C.F.R. § 300.503 and 603 CMR 28.07",
    iee: "34 C.F.R. § 300.502 and 603 CMR 28.04(5)",
    stateComplaint: {
      agency: "Massachusetts Department of Elementary and Secondary Education (DESE), Problem Resolution System Office",
      cite: "603 CMR 28.08; 34 C.F.R. §§ 300.151–300.153",
    },
    mediation: "603 CMR 28.08; 34 C.F.R. § 300.506",
    ocrRegion: "U.S. Department of Education OCR, Boston Office (Region I)",
  },
};

export function buildEvaluationLetter(inputs: TemplateInputs): string {
  const r = STATE_RULES[inputs.state];
  const date = inputs.date || formatToday();

  if (inputs.tone === "standard") {
    return `Subject: Request for Special Education Evaluation

Dear ${inputs.recipientTitle} ${inputs.recipientName || "[Principal/Special Education Director]"},

I am writing to request a full special education evaluation for my child, ${inputs.childName || "[Child's Name]"}, who is a student at ${inputs.schoolName || "[School Name]"} (${inputs.childGrade ? `${inputs.childGrade}, ` : ""}${r.name}). I am requesting this evaluation because I believe my child may need special education services and/or related supports under ${r.name} and federal law.

${inputs.concerns ? `My specific concerns are: ${inputs.concerns}\n\n` : ""}Please provide me with the consent form and any required prior written notice so the evaluation process can begin. I would also like to receive copies of all evaluation results and any eligibility determinations in writing.

Thank you for your prompt attention to this request.

Sincerely,
${inputs.parentName || "[Your Name]"}
${inputs.parentPhone || "[Phone Number]"}
${inputs.parentEmail || "[Email Address]"}
${date}`;
  }

  return `Subject: Formal Request for Comprehensive Special Education Evaluation — ${inputs.childName || "[Child's Name]"}

Dear ${inputs.recipientTitle} ${inputs.recipientName || "[Principal / Director of Special Education]"},

I am writing to formally request, in writing, a comprehensive initial special education evaluation for my child, ${inputs.childName || "[Child's Name]"}, ${inputs.childGrade ? `currently in ${inputs.childGrade} ` : ""}at ${inputs.schoolName || "[School Name]"}. This request is made under the Individuals with Disabilities Education Act (IDEA), Section 504 of the Rehabilitation Act, and ${r.eval}.

${inputs.concerns ? `My specific concerns include: ${inputs.concerns}\n\n` : ""}I am requesting that the evaluation cover all areas of suspected disability, including but not limited to: cognitive functioning, academic achievement, social/emotional/behavioral functioning, communication, adaptive behavior, motor skills, and health. I am specifically asking the team to consider eligibility under each of the categories in ${r.eligibility}, as well as Section 504 of the Rehabilitation Act of 1973 in the alternative.

Please provide the following within 15 school days of receipt of this letter:
  1. The Notice of Procedural Safeguards.
  2. A signed Prior Written Notice (PWN) consistent with ${r.pwn} either accepting or refusing this request.
  3. The proposed Assessment Plan / Notice of Consent for evaluation, with the full evaluation team listed.
  4. Confirmation of the start date of the evaluation timeline.

If the district declines to evaluate, the PWN must include the specific reasons for the refusal and the data the district relied upon. Please be advised that if I disagree with the district's evaluation, I reserve the right to request an Independent Educational Evaluation (IEE) at public expense under ${r.iee}.

Please send all communications in writing to ${inputs.parentEmail || "[your email]"} and copy ${inputs.parentPhone || "[your phone]"} for any urgent matters.

Sincerely,

${inputs.parentName || "[Your Name]"}
Parent/Legal Guardian of ${inputs.childName || "[Child's Name]"}
${inputs.parentPhone || "[Phone Number]"}
${inputs.parentEmail || "[Email Address]"}
${date}`;
}

export function build504Letter(inputs: TemplateInputs): string {
  const r = STATE_RULES[inputs.state];
  const date = inputs.date || formatToday();
  return `Subject: Request for Section 504 Evaluation and Plan — ${inputs.childName || "[Child's Name]"}

Dear ${inputs.recipientTitle} ${inputs.recipientName || "[504 Coordinator / Principal]"},

I am writing to request a Section 504 evaluation and plan for my child, ${inputs.childName || "[Child's Name]"}, ${inputs.childGrade ? `${inputs.childGrade}, ` : ""}at ${inputs.schoolName || "[School Name]"}, in accordance with Section 504 of the Rehabilitation Act of 1973 (29 U.S.C. § 794) and applicable ${r.name} guidance.

${inputs.concerns ? `My child's documented condition(s) and concerns: ${inputs.concerns}\n\n` : ""}Please convene the school's 504 team to determine eligibility and, if appropriate, develop a written 504 plan with specific accommodations. I will provide medical and educational documentation in advance of the meeting.

Please send the meeting date, the parent participation rights notice, and the names of the team members in writing.

Sincerely,
${inputs.parentName || "[Your Name]"}
${inputs.parentPhone || "[Phone Number]"}
${inputs.parentEmail || "[Email Address]"}
${date}`;
}

export function buildIEELetter(inputs: TemplateInputs): string {
  const r = STATE_RULES[inputs.state];
  const date = inputs.date || formatToday();
  return `Subject: Request for an Independent Educational Evaluation (IEE) at Public Expense — ${inputs.childName || "[Child's Name]"}

Dear ${inputs.recipientTitle} ${inputs.recipientName || "[Director of Special Education]"},

I am writing to formally request an Independent Educational Evaluation (IEE) at public expense for my child, ${inputs.childName || "[Child's Name]"}, ${inputs.childGrade ? `${inputs.childGrade}, ` : ""}at ${inputs.schoolName || "[School Name]"} pursuant to ${r.iee}.

I disagree with the school district's most recent evaluation${
    inputs.concerns ? ` for the following reasons: ${inputs.concerns}` : ""
  }. The district must, without unnecessary delay, either (a) ensure that an IEE is provided at public expense, or (b) file a due-process complaint to defend its evaluation.

Please provide me, in writing, with:
  1. The district's IEE policy, including the agency criteria.
  2. A list of qualified independent evaluators not employed by the district.
  3. Confirmation in writing of the public-expense decision.

I expect to receive this response within 15 calendar days. If I do not, I will treat the silence as agreement to fund the IEE.

Sincerely,
${inputs.parentName || "[Your Name]"}
Parent/Legal Guardian of ${inputs.childName || "[Child's Name]"}
${inputs.parentPhone || "[Phone Number]"}
${inputs.parentEmail || "[Email Address]"}
${date}`;
}

export function buildMediationLetter(inputs: TemplateInputs): string {
  const r = STATE_RULES[inputs.state];
  const date = inputs.date || formatToday();
  return `Subject: Request for Special Education Mediation — ${inputs.childName || "[Child's Name]"}

Dear ${inputs.recipientTitle} ${inputs.recipientName || "[Director of Special Education]"},

I am writing to formally request mediation under ${r.mediation} to resolve the special education dispute regarding my child, ${inputs.childName || "[Child's Name]"}, ${inputs.childGrade ? `${inputs.childGrade}, ` : ""}at ${inputs.schoolName || "[School Name]"}.

${inputs.concerns ? `Nature of the dispute: ${inputs.concerns}\n\n` : ""}Mediation is voluntary, confidential, and at no cost to either party. I am willing to participate in good faith with a state-appointed neutral mediator.

Please contact the ${r.name} state mediation office and copy me on the request, or provide me with the office's contact information so I can initiate it directly. The dispute will not delay any agreed-upon services to my child during mediation.

Sincerely,
${inputs.parentName || "[Your Name]"}
Parent/Legal Guardian of ${inputs.childName || "[Child's Name]"}
${inputs.parentPhone || "[Phone Number]"}
${inputs.parentEmail || "[Email Address]"}
${date}`;
}

export function buildStateComplaintLetter(inputs: TemplateInputs): string {
  const r = STATE_RULES[inputs.state];
  const date = inputs.date || formatToday();
  return `Subject: State Complaint Under IDEA — ${inputs.childName || "[Child's Name]"} / ${inputs.schoolName || "[District]"}

To: ${r.stateComplaint.agency}

I am filing a formal state complaint under ${r.stateComplaint.cite} alleging that ${inputs.schoolName || "[District/School Name]"} has violated the Individuals with Disabilities Education Act with respect to my child, ${inputs.childName || "[Child's Name]"}, ${inputs.childGrade ? `${inputs.childGrade}, ` : ""}.

Statement of facts:
${inputs.concerns ? inputs.concerns : "[Describe specifically what the district did or failed to do, when, and how it violated IDEA.]"}

Resolution requested:
[Describe the corrective action you want — e.g., compensatory services, completion of evaluation, IEP amendments, training for staff.]

Documentation:
I have attached relevant emails, IEPs, evaluations, and meeting notes. Additional documents are available on request. I have shared this complaint with the district at the same time it is filed with the state.

This complaint is filed within one year of the alleged violation, as required by 34 C.F.R. § 300.153(c).

Sincerely,
${inputs.parentName || "[Your Name]"}
Parent/Legal Guardian of ${inputs.childName || "[Child's Name]"}
${inputs.parentPhone || "[Phone Number]"}
${inputs.parentEmail || "[Email Address]"}
${date}`;
}

export function buildOCRComplaintLetter(inputs: TemplateInputs): string {
  const r = STATE_RULES[inputs.state];
  const date = inputs.date || formatToday();
  return `Subject: Civil Rights Complaint Under Section 504 / Title II — ${inputs.childName || "[Child's Name]"}

To: ${r.ocrRegion}
U.S. Department of Education — Office for Civil Rights

I am filing a discrimination complaint against ${inputs.schoolName || "[District/School Name]"} (${r.name}) under Section 504 of the Rehabilitation Act of 1973 (29 U.S.C. § 794) and Title II of the Americans with Disabilities Act (42 U.S.C. § 12132).

Complainant: ${inputs.parentName || "[Your Name]"}, on behalf of my child, ${inputs.childName || "[Child's Name]"} (${inputs.childGrade || "[grade]"}).

Statement of facts:
${inputs.concerns ? inputs.concerns : "[Describe specifically how the school discriminated based on disability — e.g., refused accommodations, denied access to programs, failed to implement a 504 plan.]"}

Relief requested:
[Describe what you want OCR to do — e.g., investigate, order corrective action, training, compensatory services.]

This complaint is filed within 180 days of the most recent act of discrimination, as required by 34 C.F.R. § 100.7. I authorize OCR to share my identity with the school district to investigate.

Sincerely,
${inputs.parentName || "[Your Name]"}
${inputs.parentPhone || "[Phone Number]"}
${inputs.parentEmail || "[Email Address]"}
${date}`;
}

export function buildDueProcessLetter(inputs: TemplateInputs): string {
  const r = STATE_RULES[inputs.state];
  const date = inputs.date || formatToday();
  return `Subject: Due Process Complaint Notice Under IDEA — ${inputs.childName || "[Child's Name]"}

To: ${inputs.schoolName || "[District/School Name]"}, Director of Special Education
Cc: ${r.stateComplaint.agency}

This is a Due Process Complaint Notice filed pursuant to 34 C.F.R. § 300.508 and ${r.eval}.

Student: ${inputs.childName || "[Child's Name]"}, ${inputs.childGrade ? `${inputs.childGrade}, ` : ""}${inputs.schoolName || "[School Name]"}
Parent: ${inputs.parentName || "[Your Name]"} — ${inputs.parentEmail || "[email]"} — ${inputs.parentPhone || "[phone]"}

Description of the problem:
${inputs.concerns ? inputs.concerns : "[Describe the alleged violation in detail — what the district did or failed to do, when, and the harm to your child.]"}

Proposed resolution:
[State what you want — e.g., compensatory education, specific placement, IEP changes, an IEE at public expense.]

I understand that within 15 days the district must convene a Resolution Meeting under 34 C.F.R. § 300.510 unless waived in writing, and that the parties have 30 days to resolve the complaint before the hearing officer takes the matter.

Date of alleged violation: [date]
This notice is filed within two years (or your state's statute, whichever is shorter) of when the parent knew or should have known of the alleged violation.

Sincerely,
${inputs.parentName || "[Your Name]"}
Parent/Legal Guardian of ${inputs.childName || "[Child's Name]"}
${date}`;
}

export function buildChildProfile(inputs: ProfileInputs): string {
  const today = formatToday();
  return `# About ${inputs.childName || "[Child's Name]"}

A 1-page profile to share with new teachers, subs, after-school staff, or anyone supporting my child.

**State:** ${STATE_NAMES[inputs.state]}
**Age:** ${inputs.childAge || "[age]"}    **Pronouns:** ${inputs.childPronouns || "[they/them]"}
**Date prepared:** ${today}

## What I'm great at
${bulletize(inputs.strengths || "[List strengths — interests, social skills, talents, things that motivate me.]")}

## What's hard for me
${bulletize(inputs.challenges || "[List challenges in plain language — reading, transitions, sensory overload, etc.]")}

## What helps me succeed
${bulletize(inputs.bestSupports || "[List supports that work — visual schedules, breaks, fidgets, preferential seating, etc.]")}

## What to avoid
${bulletize(inputs.whatToAvoid || "[List things that escalate me — surprises, public correction, unexpected loud noises, etc.]")}

## Diagnoses / formal supports
${inputs.diagnoses || "[List diagnoses, IEP / 504 status, and any related services.]"}

## Medications (school-day only)
${inputs.medications || "[List medications taken at school — or 'none'.]"}

## In an emergency
${inputs.emergencyContact || "[Parent name, phone, alternate contact.]"}

---
Prepared by ${inputs.childName ? "the family of " + inputs.childName : "the family"} with help from EduHelp · eduhelp.app
`;
}

function bulletize(input: string): string {
  return input
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.startsWith("- ") || line.startsWith("• ") ? line : `- ${line}`))
    .join("\n");
}

function formatToday(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const TEMPLATE_KINDS = [
  { id: "eval-standard", label: "Evaluation request — standard" },
  { id: "eval-firm", label: "Evaluation request — firm / formal" },
  { id: "504", label: "Section 504 plan request" },
  { id: "iee", label: "Independent Educational Evaluation (IEE) at public expense" },
  { id: "mediation", label: "Special-education mediation request" },
  { id: "state-complaint", label: "State IDEA complaint" },
  { id: "ocr-complaint", label: "OCR civil-rights complaint (Section 504 / ADA)" },
  { id: "due-process", label: "Due-process complaint (formal hearing)" },
  { id: "profile", label: "1-page child profile" },
] as const;

export type TemplateKind = (typeof TEMPLATE_KINDS)[number]["id"];
