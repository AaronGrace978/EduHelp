import type { AppState, HistoryEntry } from "@/types";

const STORAGE_KEY = "aaron-grace-med-v1";

export const defaultState = (): AppState => ({
  selectedCollege: null,
  history: [],
  awards: [],
  books: [],
  professors: [],
  disabilityRequests: [],
  powerFaidsPortalUrl: "",
  bannerPortalUrl: "",
  bannerStudentId: "",
  bannerTerms: [],
  bannerHolds: [],
  orgNodes: [],
  workload: [],
  connectors: [],
  professorMirrors: [],
});

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...defaultState(),
      ...parsed,
      orgNodes: parsed.orgNodes ?? [],
      workload: parsed.workload ?? [],
      connectors: parsed.connectors ?? [],
      professorMirrors: parsed.professorMirrors ?? [],
    };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function pushHistory(
  state: AppState,
  entry: Omit<HistoryEntry, "id" | "createdAt"> & {
    id?: string;
    createdAt?: string;
  },
): AppState {
  const next: HistoryEntry = {
    id: entry.id ?? crypto.randomUUID(),
    createdAt: entry.createdAt ?? new Date().toISOString(),
    kind: entry.kind,
    title: entry.title,
    detail: entry.detail,
    collegeId: entry.collegeId,
    collegeName: entry.collegeName,
    url: entry.url,
    meta: entry.meta,
  };
  return {
    ...state,
    history: [next, ...state.history].slice(0, 250),
  };
}
