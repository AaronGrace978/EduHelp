import { NextRequest, NextResponse } from "next/server";
import { pdfToText } from "@/lib/pdf";
import { runEligibilityEngine } from "@/lib/eligibility/engine";
import { maybeGenerateAINarrative } from "@/lib/eligibility/ai";
import type {
  AIProvider,
  ProviderOverrides,
} from "@/lib/eligibility/ai-types";
import type { StateCode } from "@/lib/eligibility/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 15 * 1024 * 1024;
const ACCEPTED_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "text/markdown",
]);

const VALID_PROVIDERS: AIProvider[] = [
  "openai",
  "anthropic",
  "openrouter",
  "ollama",
];

function readOverrides(req: NextRequest): ProviderOverrides | undefined {
  const provider = req.headers.get("x-eduhelp-provider")?.toLowerCase() as
    | AIProvider
    | undefined;
  const apiKey = req.headers.get("x-eduhelp-key") || undefined;
  const model = req.headers.get("x-eduhelp-model") || undefined;
  const siteUrl = req.headers.get("x-eduhelp-openrouter-site") || undefined;
  const baseUrl = req.headers.get("x-eduhelp-ollama-base") || undefined;

  if (!provider && !apiKey) return undefined;
  if (provider && !VALID_PROVIDERS.includes(provider)) return undefined;

  return { provider, apiKey, model, siteUrl, baseUrl };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const stateRaw = String(formData.get("state") ?? "").toUpperCase();
    const notes = String(formData.get("notes") ?? "").trim();

    if (stateRaw !== "CO" && stateRaw !== "CA") {
      return NextResponse.json(
        { error: "Please choose either Colorado (CO) or California (CA)." },
        { status: 400 },
      );
    }
    const state = stateRaw as StateCode;
    const overrides = readOverrides(req);

    const files = formData.getAll("files").filter((f): f is File => f instanceof File);

    let combinedText = "";
    const fileSummaries: { name: string; size: number; type: string; chars: number }[] = [];

    for (const file of files) {
      if (file.size === 0) continue;
      if (file.size > MAX_BYTES) {
        return NextResponse.json(
          { error: `"${file.name}" is larger than 15 MB. Try a smaller file.` },
          { status: 413 },
        );
      }
      const arr = new Uint8Array(await file.arrayBuffer());
      const buf = Buffer.from(arr);
      let text = "";
      const type = file.type || guessTypeByExt(file.name);
      if (type === "application/pdf") {
        text = await pdfToText(buf);
      } else if (
        ACCEPTED_TYPES.has(type) ||
        /\.(txt|md|markdown)$/i.test(file.name)
      ) {
        text = buf.toString("utf8");
      } else {
        return NextResponse.json(
          {
            error: `"${file.name}" is a ${type || "binary"} file. Please upload PDF, TXT, or Markdown only. (Image OCR is on the roadmap.)`,
          },
          { status: 415 },
        );
      }
      combinedText += `\n\n===== FILE: ${file.name} =====\n${text}`;
      fileSummaries.push({
        name: file.name,
        size: file.size,
        type,
        chars: text.length,
      });
    }

    if (notes) {
      combinedText += `\n\n===== PARENT NOTES =====\n${notes}`;
    }

    if (!combinedText.trim()) {
      return NextResponse.json(
        {
          error:
            "We couldn't read any text from the documents you uploaded. If your PDF is a scan, it may need OCR first.",
        },
        { status: 400 },
      );
    }

    const result = runEligibilityEngine(combinedText, state);
    const ai = await maybeGenerateAINarrative(
      combinedText,
      state,
      result,
      overrides,
    );

    if (ai) {
      result.aiNarrative = ai.text;
    }

    return NextResponse.json({
      ok: true,
      result,
      ai: ai
        ? { provider: ai.provider, model: ai.model }
        : { provider: null, model: null },
      files: fileSummaries,
    });
  } catch (err) {
    console.error("[EduHelp] analyze error:", err);
    return NextResponse.json(
      {
        error:
          "Something went wrong while analyzing your documents. Please try again — and if it keeps happening, check the server logs.",
      },
      { status: 500 },
    );
  }
}

function guessTypeByExt(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".txt")) return "text/plain";
  if (lower.endsWith(".md") || lower.endsWith(".markdown"))
    return "text/markdown";
  return "";
}
