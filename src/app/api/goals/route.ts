import { NextRequest, NextResponse } from "next/server";
import { callAI, type ChatMessage } from "@/lib/eligibility/ai";
import { readOverrides } from "@/lib/api-overrides";
import { STATE_NAMES, SUPPORTED_STATES, type StateCode } from "@/lib/eligibility/types";

export const runtime = "nodejs";
export const maxDuration = 60;

interface Body {
  goals?: string;
  state?: string;
}

const SMART_RUBRIC = `You are EduHelp's IEP Goal Review assistant. Given one or more IEP goals from a parent, score each goal on the SMART rubric:

- **S — Specific:** does it name the behavior, skill, condition, and criterion?
- **M — Measurable:** is there a quantifiable measure (X%, X of Y trials, on what timeline)?
- **A — Attainable:** is the bar realistic given the child's current baseline (which the goal should reference)?
- **R — Relevant:** is it tied to a real classroom or life-skill need?
- **T — Time-bound:** does it specify when (annual review, by next reporting period)?

For EACH goal, output a markdown block exactly in this format:

### Goal N
> *<original goal verbatim, max 80 words>*

| S | M | A | R | T |
|---|---|---|---|---|
| ✓ or ✗ | ✓ or ✗ | ✓ or ✗ | ✓ or ✗ | ✓ or ✗ |

**Diagnosis:** 1 sentence — *what's the weakest link*.

**Suggested rewrite:** a single, well-formed SMART goal that addresses the weak link. Always include a baseline ("from current X% accuracy") and an annual target ("to Y% accuracy by [date], measured by [method]").

If the goal is not actually a goal (e.g. a service minute or accommodation), say so and skip the table.

Keep the entire response under 1200 words.`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    if (!body?.goals?.trim()) {
      return NextResponse.json(
        { error: "Paste one or more IEP goals to review." },
        { status: 400 },
      );
    }
    const overrides = readOverrides(req);
    const state =
      body.state && SUPPORTED_STATES.includes(body.state.toUpperCase() as StateCode)
        ? (body.state.toUpperCase() as StateCode)
        : undefined;

    const messages: ChatMessage[] = [
      { role: "system", content: SMART_RUBRIC },
      {
        role: "user",
        content: `Please review the following IEP goal(s)${
          state ? ` for a student in ${STATE_NAMES[state]}` : ""
        }:\n\n${body.goals.slice(0, 6000)}`,
      },
    ];

    const resp = await callAI(messages, overrides, 1800);
    return NextResponse.json({
      ok: true,
      review: resp.text,
      provider: resp.provider,
      model: resp.model,
    });
  } catch (err) {
    console.error("[EduHelp] goals error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Goal review failed. Make sure an AI provider is configured on /settings.",
      },
      { status: 500 },
    );
  }
}
