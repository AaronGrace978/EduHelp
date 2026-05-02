import type { StateCode } from "./eligibility/types";

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

const STATE_RULES: Record<
  StateCode,
  { name: string; eval: string; eligibility: string; pwn: string; iee: string }
> = {
  CO: {
    name: "Colorado",
    eval: "Colorado ECEA Rules § 4.02(1)(b) and 34 C.F.R. § 300.301",
    eligibility: "Colorado ECEA Rules § 2.08",
    pwn: "34 C.F.R. § 300.503 and Colorado ECEA Rules § 6.02(7)",
    iee: "34 C.F.R. § 300.502 and Colorado ECEA Rules § 4.02(7)",
  },
  CA: {
    name: "California",
    eval: "California Education Code § 56321 and 34 C.F.R. § 300.301",
    eligibility: "5 CCR § 3030 and Cal. Ed. Code § 56333",
    pwn: "34 C.F.R. § 300.503 and Cal. Ed. Code § 56500.4",
    iee: "34 C.F.R. § 300.502 and Cal. Ed. Code § 56329(b)",
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
  4. Confirmation of the start date of the 60-calendar-day evaluation timeline.

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

function formatToday(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
