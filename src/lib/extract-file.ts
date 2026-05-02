/**
 * Server-side file → text extractor used by /api/analyze.
 *
 * Supports:
 *   - PDF                (pdf-parse, dynamic import to avoid bundling fixtures)
 *   - DOCX               (mammoth, text-only)
 *   - TXT / Markdown     (raw UTF-8)
 *   - PNG / JPG / JPEG / WEBP / TIFF / BMP   (tesseract.js, English)
 *
 * Scanned PDFs still produce empty text from pdf-parse. The caller should
 * detect that case (see `looksLikeScan`) and surface a helpful error.
 */

export type ExtractKind =
  | "pdf"
  | "docx"
  | "text"
  | "image"
  | "unsupported";

export interface ExtractedFile {
  text: string;
  kind: ExtractKind;
  /** True if the extractor returned suspiciously little content (likely scanned). */
  scanned: boolean;
}

const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|tiff?|bmp)$/i;
const IMAGE_MIME = /^image\//i;

export function detectKind(name: string, mime?: string): ExtractKind {
  const lower = name.toLowerCase();
  const t = (mime || "").toLowerCase();
  if (lower.endsWith(".pdf") || t === "application/pdf") return "pdf";
  if (
    lower.endsWith(".docx") ||
    t === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx";
  if (
    lower.endsWith(".txt") ||
    lower.endsWith(".md") ||
    lower.endsWith(".markdown") ||
    t === "text/plain" ||
    t === "text/markdown"
  )
    return "text";
  if (IMAGE_EXTENSIONS.test(lower) || IMAGE_MIME.test(t)) return "image";
  return "unsupported";
}

export function looksLikeScan(text: string): boolean {
  return text.replace(/\s+/g, "").length < 80;
}

export async function extractFile(
  buf: Buffer,
  name: string,
  mime: string,
): Promise<ExtractedFile> {
  const kind = detectKind(name, mime);
  switch (kind) {
    case "pdf": {
      const text = await pdfToText(buf);
      return { text, kind, scanned: looksLikeScan(text) };
    }
    case "docx": {
      const text = await docxToText(buf);
      return { text, kind, scanned: false };
    }
    case "text":
      return { text: buf.toString("utf8"), kind, scanned: false };
    case "image": {
      const text = await imageToText(buf);
      return { text, kind, scanned: false };
    }
    case "unsupported":
      return { text: "", kind, scanned: false };
  }
}

async function pdfToText(buf: Buffer): Promise<string> {
  const mod = await import("pdf-parse/lib/pdf-parse.js");
  const pdfParse = (
    mod as unknown as { default: (b: Buffer) => Promise<{ text: string }> }
  ).default;
  const result = await pdfParse(buf);
  return result.text || "";
}

async function docxToText(buf: Buffer): Promise<string> {
  const mammoth = (await import("mammoth")).default ?? (await import("mammoth"));
  const ext = mammoth as unknown as {
    extractRawText: (opts: { buffer: Buffer }) => Promise<{ value: string }>;
  };
  const out = await ext.extractRawText({ buffer: buf });
  return out.value || "";
}

/** OCR an image via tesseract.js (server-side, English). */
async function imageToText(buf: Buffer): Promise<string> {
  // Import dynamically — the lib pulls in WASM and worker modules at startup.
  type TesseractMod = {
    createWorker: (lang: string) => Promise<{
      recognize: (img: Buffer) => Promise<{ data: { text: string } }>;
      terminate: () => Promise<void>;
    }>;
  };
  const mod = (await import("tesseract.js")) as unknown as TesseractMod;
  const worker = await mod.createWorker("eng");
  try {
    const result = await worker.recognize(buf);
    return result.data.text || "";
  } finally {
    await worker.terminate();
  }
}
