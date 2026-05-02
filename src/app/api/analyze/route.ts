import { NextRequest, NextResponse } from "next/server";
import { extractFile, looksLikeScan } from "@/lib/extract-file";
import { runEligibilityEngine } from "@/lib/eligibility/engine";
import { maybeGenerateAINarrative } from "@/lib/eligibility/ai";
import { readOverrides } from "@/lib/api-overrides";
import { SUPPORTED_STATES, type StateCode } from "@/lib/eligibility/types";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_BYTES = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const stateRaw = String(formData.get("state") ?? "").toUpperCase();
    const notes = String(formData.get("notes") ?? "").trim();

    if (!SUPPORTED_STATES.includes(stateRaw as StateCode)) {
      return NextResponse.json(
        {
          error: `State "${stateRaw}" isn't supported yet. Supported states: ${SUPPORTED_STATES.join(", ")}.`,
        },
        { status: 400 },
      );
    }
    const state = stateRaw as StateCode;
    const overrides = readOverrides(req);

    const files = formData.getAll("files").filter((f): f is File => f instanceof File);

    let combinedText = "";
    let scannedDetected = false;
    const fileSummaries: {
      name: string;
      size: number;
      type: string;
      kind: string;
      chars: number;
      scanned: boolean;
    }[] = [];

    for (const file of files) {
      if (file.size === 0) continue;
      if (file.size > MAX_BYTES) {
        return NextResponse.json(
          { error: `"${file.name}" is larger than 25 MB. Try a smaller file.` },
          { status: 413 },
        );
      }
      const arr = new Uint8Array(await file.arrayBuffer());
      const buf = Buffer.from(arr);

      const extracted = await extractFile(buf, file.name, file.type || "");
      if (extracted.kind === "unsupported") {
        return NextResponse.json(
          {
            error: `"${file.name}" is a ${file.type || "binary"} file. Please upload PDF, DOCX, TXT, Markdown, or an image (PNG / JPG).`,
          },
          { status: 415 },
        );
      }
      if (extracted.scanned) scannedDetected = true;
      combinedText += `\n\n===== FILE: ${file.name} =====\n${extracted.text}`;
      fileSummaries.push({
        name: file.name,
        size: file.size,
        type: file.type || "",
        kind: extracted.kind,
        chars: extracted.text.length,
        scanned: extracted.scanned,
      });
    }

    if (notes) {
      combinedText += `\n\n===== PARENT NOTES =====\n${notes}`;
    }

    if (!combinedText.trim() || looksLikeScan(combinedText)) {
      return NextResponse.json(
        {
          error:
            scannedDetected || !combinedText.trim()
              ? "We couldn't read any text from your upload. If your PDF is a scan, export each page as a JPG/PNG image and try again — EduHelp will OCR images automatically."
              : "We didn't get enough text to run the analysis. Try adding more documents or pasting details into the parent notes box.",
          scanned: scannedDetected,
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
      /** First 16k chars of extracted text — used by /api/chat for follow-ups. */
      excerpt: combinedText.slice(0, 16000),
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
