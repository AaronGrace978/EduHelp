// Thin wrapper around pdf-parse to keep its top-level side effects out
// of Next.js route bundlers.
export async function pdfToText(buf: Buffer): Promise<string> {
  // dynamic import keeps Next from trying to bundle test fixtures
  const mod = await import("pdf-parse/lib/pdf-parse.js");
  const pdfParse = (mod as unknown as { default: (b: Buffer) => Promise<{ text: string }> })
    .default;
  const result = await pdfParse(buf);
  return result.text || "";
}
