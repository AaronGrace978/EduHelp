export type College = {
  id: string;
  name: string;
  country: string;
  code: string;
  state: string | null;
  website: string | null;
  domains: string[];
};

export type HistoryKind =
  | "college"
  | "powerfaids"
  | "disability"
  | "books"
  | "rmp"
  | "general";

export type HistoryEntry = {
  id: string;
  kind: HistoryKind;
  title: string;
  detail?: string;
  collegeId?: string;
  collegeName?: string;
  url?: string;
  meta?: Record<string, string>;
  createdAt: string;
};

export type PowerFaidsAward = {
  id: string;
  year: string;
  source: string;
  amount: number;
  status: "pending" | "accepted" | "declined" | "disbursed";
  notes?: string;
};

export type BookOrder = {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  course?: string;
  amazonUrl: string;
  status: "wishlist" | "ordered" | "received";
  createdAt: string;
};

export type ProfessorNote = {
  id: string;
  professor: string;
  department?: string;
  collegeName: string;
  rating?: number;
  wouldTakeAgain?: boolean;
  notes?: string;
  rmpUrl: string;
  createdAt: string;
};

export type DisabilityRequest = {
  id: string;
  condition: string;
  accommodations: string[];
  letterDraft: string;
  status: "draft" | "submitted" | "approved" | "needs-docs";
  createdAt: string;
};

export type AppState = {
  selectedCollege: College | null;
  history: HistoryEntry[];
  awards: PowerFaidsAward[];
  books: BookOrder[];
  professors: ProfessorNote[];
  disabilityRequests: DisabilityRequest[];
  powerFaidsPortalUrl: string;
};
