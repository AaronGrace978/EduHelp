import { NextRequest, NextResponse } from "next/server";
import { callAI, type ChatMessage } from "@/lib/eligibility/ai";
import { readOverrides } from "@/lib/api-overrides";

export const runtime = "nodejs";
export const maxDuration = 60;

interface Body {
  history?: { role: "user" | "assistant"; content: string }[];
  currentPath?: string;
  state?: string;
}

const SYSTEM_PROMPT = `You are EduHelp's friendly assistant. You help U.S. families navigate special education for their child.

Scope:
- IDEA (IEP) and Section 504 plans, eligibility, evaluations, services, accommodations.
- Seven states are supported in detail with the correct administrative-code citations:
  - Colorado (1 CCR 301-8 § 2.08)
  - California (5 CCR § 3030, Cal. Ed. Code § 56333)
  - Texas (19 TAC § 89.1040)
  - New York (8 NYCRR § 200.1(zz))
  - Florida (Rule 6A-6.030xx F.A.C.)
  - Illinois (23 IAC § 226.75)
  - Massachusetts (603 CMR 28)
- Federal IDEA citations (34 C.F.R. §§ 300.x) apply nationwide.

Tone:
- Warm, plain-spoken, parent-friendly. Aim for a 9th-grade reading level.
- Be specific and practical: name the form, the deadline, the office.
- Use short paragraphs and bulleted lists. Bold the action steps.
- Always answer the immediate question first; offer next-step links second.

Rules:
- DO NOT provide legal advice. For disputes, recommend the state's protection-and-advocacy agency or a COPAA attorney.
- If a question is outside special education / 504 / school disability supports, kindly redirect ("I focus on IEPs and 504 plans — for that, you'd want…").
- Cite the right federal reg and (when known) the user's state code.
- If a question is ambiguous about state, ask which state.
- Keep replies under ~250 words unless the user explicitly asks for more.
- Where relevant, point families to the matching on-site tool: /analyze, /goals, /timeline, /templates, /resources, /glossary, /settings.

Disclaimers:
- Always end advice that touches on a dispute with: "For your specific situation, contact your state's P&A agency or a special-education attorney."`;

const PAGE_HINTS: Record<string, string> = {
  "/": "User is on the EduHelp landing page.",
  "/analyze":
    "User is on /analyze (eligibility analyzer). If they ask about uploads, scanned PDFs, OCR, or how findings are scored — speak to that.",
  "/goals":
    "User is on /goals (IEP goal SMART review). They may want help drafting or critiquing goals.",
  "/timeline":
    "User is on /timeline (state IDEA evaluation timeline calculator). They may want to know about consent → eligibility → IEP deadlines.",
  "/templates":
    "User is on /templates (letter generator + escalation kit: evaluation, 504, IEE, mediation, state complaint, OCR complaint, due process, child profile).",
  "/resources":
    "User is on /resources (curated state agencies and parent centers).",
  "/glossary":
    "User is on /glossary (plain-English glossary of special-ed acronyms).",
  "/settings":
    "User is on /settings (AI provider configuration). Don't store API keys; they live in the user's browser.",
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    if (!body?.history?.length) {
      return NextResponse.json(
        { error: "No question to answer." },
        { status: 400 },
      );
    }
    const overrides = readOverrides(req);
    const pageContext =
      body.currentPath && PAGE_HINTS[body.currentPath]
        ? `\n\nCurrent page: ${PAGE_HINTS[body.currentPath]}`
        : "";
    const stateContext = body.state ? `\nUser's state of interest: ${body.state}.` : "";

    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT + pageContext + stateContext },
      ...body.history.slice(-12),
    ];

    const resp = await callAI(messages, overrides, 700);
    return NextResponse.json({
      ok: true,
      message: resp.text,
      provider: resp.provider,
      model: resp.model,
    });
  } catch (err) {
    console.error("[EduHelp] assistant error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Assistant failed. Make sure an AI provider is configured on /settings.",
      },
      { status: 500 },
    );
  }
}
