import { openUrl } from "@tauri-apps/plugin-opener";

export async function openExternal(url: string) {
  try {
    await openUrl(url);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export function amazonSearchUrl(query: string) {
  const q = encodeURIComponent(query.trim());
  return `https://www.amazon.com/s?k=${q}&i=stripbooks`;
}

export function amazonIsbnUrl(isbn: string) {
  const clean = isbn.replace(/[^0-9Xx]/g, "");
  return `https://www.amazon.com/s?k=${encodeURIComponent(clean)}&i=stripbooks`;
}

export function rateMyProfessorUrl(collegeName: string, professor?: string) {
  const school = encodeURIComponent(collegeName.trim());
  if (professor?.trim()) {
    return `https://www.ratemyprofessors.com/search/professors/${school}?q=${encodeURIComponent(professor.trim())}`;
  }
  return `https://www.ratemyprofessors.com/search/schools?q=${school}`;
}
