import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AppState,
  BannerHold,
  BannerTerm,
  BookOrder,
  College,
  DisabilityRequest,
  HistoryEntry,
  PowerFaidsAward,
  ProfessorNote,
} from "@/types";
import { loadState, pushHistory, saveState } from "@/lib/storage";

type AppContextValue = {
  state: AppState;
  setSelectedCollege: (college: College | null) => void;
  setPowerFaidsPortalUrl: (url: string) => void;
  setBannerPortalUrl: (url: string) => void;
  setBannerStudentId: (id: string) => void;
  addAward: (award: Omit<PowerFaidsAward, "id"> & { id?: string }) => void;
  updateAward: (id: string, patch: Partial<PowerFaidsAward>) => void;
  removeAward: (id: string) => void;
  addBannerTerm: (term: Omit<BannerTerm, "id"> & { id?: string }) => void;
  updateBannerTerm: (id: string, patch: Partial<BannerTerm>) => void;
  removeBannerTerm: (id: string) => void;
  addBannerHold: (
    hold: Omit<BannerHold, "id" | "createdAt"> & { id?: string },
  ) => void;
  updateBannerHold: (id: string, patch: Partial<BannerHold>) => void;
  removeBannerHold: (id: string) => void;
  addBook: (book: Omit<BookOrder, "id" | "createdAt"> & { id?: string }) => void;
  updateBook: (id: string, patch: Partial<BookOrder>) => void;
  removeBook: (id: string) => void;
  addProfessor: (
    note: Omit<ProfessorNote, "id" | "createdAt"> & { id?: string },
  ) => void;
  removeProfessor: (id: string) => void;
  addDisabilityRequest: (
    req: Omit<DisabilityRequest, "id" | "createdAt"> & { id?: string },
  ) => void;
  updateDisabilityRequest: (
    id: string,
    patch: Partial<DisabilityRequest>,
  ) => void;
  logHistory: (entry: Omit<HistoryEntry, "id" | "createdAt">) => void;
  clearHistory: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setSelectedCollege = useCallback((college: College | null) => {
    setState((prev) => {
      let next = { ...prev, selectedCollege: college };
      if (college) {
        next = pushHistory(next, {
          kind: "college",
          title: `Selected ${college.name}`,
          detail: [college.state, college.country].filter(Boolean).join(", "),
          collegeId: college.id,
          collegeName: college.name,
          url: college.website ?? undefined,
        });
      }
      return next;
    });
  }, []);

  const setPowerFaidsPortalUrl = useCallback((url: string) => {
    setState((prev) => ({ ...prev, powerFaidsPortalUrl: url }));
  }, []);

  const setBannerPortalUrl = useCallback((url: string) => {
    setState((prev) => ({ ...prev, bannerPortalUrl: url }));
  }, []);

  const setBannerStudentId = useCallback((id: string) => {
    setState((prev) => ({ ...prev, bannerStudentId: id }));
  }, []);

  const addAward = useCallback(
    (award: Omit<PowerFaidsAward, "id"> & { id?: string }) => {
      setState((prev) => {
        const row: PowerFaidsAward = {
          ...award,
          id: award.id ?? crypto.randomUUID(),
        };
        return pushHistory(
          { ...prev, awards: [row, ...prev.awards] },
          {
            kind: "powerfaids",
            title: `Aid recorded: ${row.source}`,
            detail: `${row.year} · $${row.amount} · ${row.status}`,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const updateAward = useCallback(
    (id: string, patch: Partial<PowerFaidsAward>) => {
      setState((prev) => ({
        ...prev,
        awards: prev.awards.map((a) => (a.id === id ? { ...a, ...patch } : a)),
      }));
    },
    [],
  );

  const removeAward = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      awards: prev.awards.filter((a) => a.id !== id),
    }));
  }, []);

  const addBannerTerm = useCallback(
    (term: Omit<BannerTerm, "id"> & { id?: string }) => {
      setState((prev) => {
        const row: BannerTerm = {
          ...term,
          id: term.id ?? crypto.randomUUID(),
        };
        return pushHistory(
          { ...prev, bannerTerms: [row, ...prev.bannerTerms] },
          {
            kind: "banner",
            title: `Banner term: ${row.term}`,
            detail: row.status,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const updateBannerTerm = useCallback(
    (id: string, patch: Partial<BannerTerm>) => {
      setState((prev) => ({
        ...prev,
        bannerTerms: prev.bannerTerms.map((t) =>
          t.id === id ? { ...t, ...patch } : t,
        ),
      }));
    },
    [],
  );

  const removeBannerTerm = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      bannerTerms: prev.bannerTerms.filter((t) => t.id !== id),
    }));
  }, []);

  const addBannerHold = useCallback(
    (hold: Omit<BannerHold, "id" | "createdAt"> & { id?: string }) => {
      setState((prev) => {
        const row: BannerHold = {
          ...hold,
          id: hold.id ?? crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        return pushHistory(
          { ...prev, bannerHolds: [row, ...prev.bannerHolds] },
          {
            kind: "banner",
            title: `Banner hold: ${row.label}`,
            detail: row.office,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const updateBannerHold = useCallback(
    (id: string, patch: Partial<BannerHold>) => {
      setState((prev) => ({
        ...prev,
        bannerHolds: prev.bannerHolds.map((h) =>
          h.id === id ? { ...h, ...patch } : h,
        ),
      }));
    },
    [],
  );

  const removeBannerHold = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      bannerHolds: prev.bannerHolds.filter((h) => h.id !== id),
    }));
  }, []);

  const addBook = useCallback(
    (book: Omit<BookOrder, "id" | "createdAt"> & { id?: string }) => {
      setState((prev) => {
        const row: BookOrder = {
          ...book,
          id: book.id ?? crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        return pushHistory(
          { ...prev, books: [row, ...prev.books] },
          {
            kind: "books",
            title: `Book saved: ${row.title}`,
            detail: row.course || row.author,
            url: row.amazonUrl,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const updateBook = useCallback((id: string, patch: Partial<BookOrder>) => {
    setState((prev) => ({
      ...prev,
      books: prev.books.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  }, []);

  const removeBook = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      books: prev.books.filter((b) => b.id !== id),
    }));
  }, []);

  const addProfessor = useCallback(
    (note: Omit<ProfessorNote, "id" | "createdAt"> & { id?: string }) => {
      setState((prev) => {
        const row: ProfessorNote = {
          ...note,
          id: note.id ?? crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        return pushHistory(
          { ...prev, professors: [row, ...prev.professors] },
          {
            kind: "rmp",
            title: `Professor saved: ${row.professor}`,
            detail: row.collegeName,
            url: row.rmpUrl,
            collegeName: row.collegeName,
          },
        );
      });
    },
    [],
  );

  const removeProfessor = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      professors: prev.professors.filter((p) => p.id !== id),
    }));
  }, []);

  const addDisabilityRequest = useCallback(
    (
      req: Omit<DisabilityRequest, "id" | "createdAt"> & { id?: string },
    ) => {
      setState((prev) => {
        const row: DisabilityRequest = {
          ...req,
          id: req.id ?? crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        return pushHistory(
          {
            ...prev,
            disabilityRequests: [row, ...prev.disabilityRequests],
          },
          {
            kind: "disability",
            title: `Accommodation draft: ${row.condition}`,
            detail: `${row.accommodations.length} accommodations · ${row.status}`,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const updateDisabilityRequest = useCallback(
    (id: string, patch: Partial<DisabilityRequest>) => {
      setState((prev) => ({
        ...prev,
        disabilityRequests: prev.disabilityRequests.map((r) =>
          r.id === id ? { ...r, ...patch } : r,
        ),
      }));
    },
    [],
  );

  const logHistory = useCallback((entry: Omit<HistoryEntry, "id" | "createdAt">) => {
    setState((prev) => pushHistory(prev, entry));
  }, []);

  const clearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, history: [] }));
  }, []);

  const value = useMemo(
    () => ({
      state,
      setSelectedCollege,
      setPowerFaidsPortalUrl,
      setBannerPortalUrl,
      setBannerStudentId,
      addAward,
      updateAward,
      removeAward,
      addBannerTerm,
      updateBannerTerm,
      removeBannerTerm,
      addBannerHold,
      updateBannerHold,
      removeBannerHold,
      addBook,
      updateBook,
      removeBook,
      addProfessor,
      removeProfessor,
      addDisabilityRequest,
      updateDisabilityRequest,
      logHistory,
      clearHistory,
    }),
    [
      state,
      setSelectedCollege,
      setPowerFaidsPortalUrl,
      setBannerPortalUrl,
      setBannerStudentId,
      addAward,
      updateAward,
      removeAward,
      addBannerTerm,
      updateBannerTerm,
      removeBannerTerm,
      addBannerHold,
      updateBannerHold,
      removeBannerHold,
      addBook,
      updateBook,
      removeBook,
      addProfessor,
      removeProfessor,
      addDisabilityRequest,
      updateDisabilityRequest,
      logHistory,
      clearHistory,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
