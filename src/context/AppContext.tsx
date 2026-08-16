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
  CourseStaffMember,
  DisabilityRequest,
  HistoryEntry,
  OrgNode,
  PowerFaidsAward,
  ProfessorMirror,
  ProfessorNote,
  SystemConnector,
  WorkloadItem,
} from "@/types";
import {
  CONNECTOR_PRESETS,
  HIERARCHY_SEED,
} from "@/lib/adminCatalog";
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
  addOrgNode: (
    node: Omit<OrgNode, "id"> & { id?: string },
  ) => void;
  updateOrgNode: (id: string, patch: Partial<OrgNode>) => void;
  removeOrgNode: (id: string) => void;
  seedOrgHierarchy: () => void;
  clearOrgHierarchy: () => void;
  addWorkloadItem: (
    item: Omit<WorkloadItem, "id" | "createdAt" | "updatedAt"> & {
      id?: string;
    },
  ) => void;
  updateWorkloadItem: (id: string, patch: Partial<WorkloadItem>) => void;
  removeWorkloadItem: (id: string) => void;
  addConnector: (
    connector: Omit<SystemConnector, "id" | "createdAt"> & { id?: string },
  ) => void;
  updateConnector: (id: string, patch: Partial<SystemConnector>) => void;
  removeConnector: (id: string) => void;
  seedConnectorPresets: () => void;
  addProfessorMirror: (
    mirror: Omit<ProfessorMirror, "id" | "createdAt" | "updatedAt"> & {
      id?: string;
    },
  ) => void;
  updateProfessorMirror: (
    id: string,
    patch: Partial<ProfessorMirror>,
  ) => void;
  removeProfessorMirror: (id: string) => void;
  addMirrorStaff: (
    mirrorId: string,
    staff: Omit<CourseStaffMember, "id"> & { id?: string },
  ) => void;
  removeMirrorStaff: (mirrorId: string, staffId: string) => void;
  activateAiCoverage: (mirrorId: string, reason?: string) => void;
  restoreProfessorCoverage: (mirrorId: string) => void;
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

  const addOrgNode = useCallback(
    (node: Omit<OrgNode, "id"> & { id?: string }) => {
      setState((prev) => {
        const row: OrgNode = {
          ...node,
          id: node.id ?? crypto.randomUUID(),
        };
        return pushHistory(
          { ...prev, orgNodes: [...prev.orgNodes, row] },
          {
            kind: "hierarchy",
            title: `Role added: ${row.title}`,
            detail: row.personName || row.level,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const updateOrgNode = useCallback((id: string, patch: Partial<OrgNode>) => {
    setState((prev) => ({
      ...prev,
      orgNodes: prev.orgNodes.map((n) =>
        n.id === id ? { ...n, ...patch } : n,
      ),
    }));
  }, []);

  const removeOrgNode = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      orgNodes: prev.orgNodes
        .filter((n) => n.id !== id)
        .map((n) =>
          n.reportsToId === id ? { ...n, reportsToId: null } : n,
        ),
      workload: prev.workload.map((w) =>
        w.assigneeId === id ? { ...w, assigneeId: undefined } : w,
      ),
    }));
  }, []);

  const seedOrgHierarchy = useCallback(() => {
    setState((prev) => {
      if (prev.orgNodes.length > 0) return prev;
      const idByKey = new Map<string, string>();
      HIERARCHY_SEED.forEach((seed) => {
        idByKey.set(seed.key, crypto.randomUUID());
      });
      const nodes: OrgNode[] = HIERARCHY_SEED.map((seed) => ({
        id: idByKey.get(seed.key)!,
        title: seed.title,
        level: seed.level,
        personName: seed.personName,
        unit: seed.unit,
        reportsToId: seed.reportsTo
          ? (idByKey.get(seed.reportsTo) ?? null)
          : null,
        fte: seed.fte,
      }));
      return pushHistory(
        { ...prev, orgNodes: nodes },
        {
          kind: "hierarchy",
          title: "Leadership hierarchy template loaded",
          detail: `${nodes.length} roles — President through Deans & Directors`,
          collegeName: prev.selectedCollege?.name,
        },
      );
    });
  }, []);

  const clearOrgHierarchy = useCallback(() => {
    setState((prev) => ({
      ...prev,
      orgNodes: [],
      workload: prev.workload.map((w) => ({ ...w, assigneeId: undefined })),
    }));
  }, []);

  const addWorkloadItem = useCallback(
    (
      item: Omit<WorkloadItem, "id" | "createdAt" | "updatedAt"> & {
        id?: string;
      },
    ) => {
      setState((prev) => {
        const now = new Date().toISOString();
        const row: WorkloadItem = {
          ...item,
          id: item.id ?? crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        return pushHistory(
          { ...prev, workload: [row, ...prev.workload] },
          {
            kind: "workload",
            title: `Workload: ${row.title}`,
            detail: `${row.category} · ${row.priority}`,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const updateWorkloadItem = useCallback(
    (id: string, patch: Partial<WorkloadItem>) => {
      setState((prev) => ({
        ...prev,
        workload: prev.workload.map((w) =>
          w.id === id
            ? { ...w, ...patch, updatedAt: new Date().toISOString() }
            : w,
        ),
      }));
    },
    [],
  );

  const removeWorkloadItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      workload: prev.workload.filter((w) => w.id !== id),
    }));
  }, []);

  const addConnector = useCallback(
    (
      connector: Omit<SystemConnector, "id" | "createdAt"> & { id?: string },
    ) => {
      setState((prev) => {
        const row: SystemConnector = {
          ...connector,
          id: connector.id ?? crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        return pushHistory(
          { ...prev, connectors: [row, ...prev.connectors] },
          {
            kind: "connector",
            title: `Connector: ${row.name}`,
            detail: `${row.kind} · ${row.status}`,
            url: /^https?:\/\//i.test(row.endpointOrHost)
              ? row.endpointOrHost
              : undefined,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const updateConnector = useCallback(
    (id: string, patch: Partial<SystemConnector>) => {
      setState((prev) => ({
        ...prev,
        connectors: prev.connectors.map((c) =>
          c.id === id ? { ...c, ...patch } : c,
        ),
      }));
    },
    [],
  );

  const removeConnector = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      connectors: prev.connectors.filter((c) => c.id !== id),
    }));
  }, []);

  const seedConnectorPresets = useCallback(() => {
    setState((prev) => {
      if (prev.connectors.length > 0) return prev;
      const now = new Date().toISOString();
      const connectors: SystemConnector[] = CONNECTOR_PRESETS.map((p) => ({
        ...p,
        id: crypto.randomUUID(),
        status: p.status ?? "planned",
        createdAt: now,
        queryTemplates: p.queryTemplates.map((t) => ({
          ...t,
          id: t.id || crypto.randomUUID(),
        })),
      }));
      return pushHistory(
        { ...prev, connectors },
        {
          kind: "connector",
          title: "Ecosystem connector presets loaded",
          detail: `Banner, PowerFAIDS, Oracle, SQL, PeopleSoft, Colleague, Workday`,
          collegeName: prev.selectedCollege?.name,
        },
      );
    });
  }, []);

  const addProfessorMirror = useCallback(
    (
      mirror: Omit<ProfessorMirror, "id" | "createdAt" | "updatedAt"> & {
        id?: string;
      },
    ) => {
      setState((prev) => {
        const now = new Date().toISOString();
        const row: ProfessorMirror = {
          ...mirror,
          id: mirror.id ?? crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        return pushHistory(
          {
            ...prev,
            professorMirrors: [row, ...prev.professorMirrors],
          },
          {
            kind: "mirror",
            title: `Professor mirror: ${row.courseCode}`,
            detail: `${row.professorName} · ${row.term}`,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const updateProfessorMirror = useCallback(
    (id: string, patch: Partial<ProfessorMirror>) => {
      setState((prev) => ({
        ...prev,
        professorMirrors: prev.professorMirrors.map((m) =>
          m.id === id
            ? { ...m, ...patch, updatedAt: new Date().toISOString() }
            : m,
        ),
      }));
    },
    [],
  );

  const removeProfessorMirror = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      professorMirrors: prev.professorMirrors.filter((m) => m.id !== id),
    }));
  }, []);

  const addMirrorStaff = useCallback(
    (
      mirrorId: string,
      staff: Omit<CourseStaffMember, "id"> & { id?: string },
    ) => {
      setState((prev) => {
        const row: CourseStaffMember = {
          ...staff,
          id: staff.id ?? crypto.randomUUID(),
        };
        const mirrors = prev.professorMirrors.map((m) =>
          m.id === mirrorId
            ? {
                ...m,
                staff: [...m.staff, row],
                updatedAt: new Date().toISOString(),
              }
            : m,
        );
        const mirror = mirrors.find((m) => m.id === mirrorId);
        return pushHistory(
          { ...prev, professorMirrors: mirrors },
          {
            kind: "mirror",
            title: `Course staff added: ${row.name}`,
            detail: `${row.role}${mirror ? ` · ${mirror.courseCode}` : ""}`,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const removeMirrorStaff = useCallback(
    (mirrorId: string, staffId: string) => {
      setState((prev) => ({
        ...prev,
        professorMirrors: prev.professorMirrors.map((m) =>
          m.id === mirrorId
            ? {
                ...m,
                staff: m.staff.filter((s) => s.id !== staffId),
                updatedAt: new Date().toISOString(),
              }
            : m,
        ),
      }));
    },
    [],
  );

  const activateAiCoverage = useCallback(
    (mirrorId: string, reason?: string) => {
      setState((prev) => {
        const mirrors = prev.professorMirrors.map((m) =>
          m.id === mirrorId
            ? {
                ...m,
                coverageStatus: "ai_covering" as const,
                aiMirrorEnabled: true,
                unavailableReason:
                  reason ||
                  m.unavailableReason ||
                  "Professor unavailable — AI mirror covering",
                updatedAt: new Date().toISOString(),
              }
            : m,
        );
        const mirror = mirrors.find((m) => m.id === mirrorId);
        return pushHistory(
          { ...prev, professorMirrors: mirrors },
          {
            kind: "mirror",
            title: `AI covering: ${mirror?.courseCode ?? "section"}`,
            detail: mirror?.professorName,
            collegeName: prev.selectedCollege?.name,
          },
        );
      });
    },
    [],
  );

  const restoreProfessorCoverage = useCallback((mirrorId: string) => {
    setState((prev) => {
      const mirrors = prev.professorMirrors.map((m) =>
        m.id === mirrorId
          ? {
              ...m,
              coverageStatus: "available" as const,
              unavailableReason: undefined,
              unavailableUntil: undefined,
              updatedAt: new Date().toISOString(),
            }
          : m,
      );
      const mirror = mirrors.find((m) => m.id === mirrorId);
      return pushHistory(
        { ...prev, professorMirrors: mirrors },
        {
          kind: "mirror",
          title: `Professor restored: ${mirror?.courseCode ?? "section"}`,
          detail: mirror?.professorName,
          collegeName: prev.selectedCollege?.name,
        },
      );
    });
  }, []);

  const logHistory = useCallback(
    (entry: Omit<HistoryEntry, "id" | "createdAt">) => {
      setState((prev) => pushHistory(prev, entry));
    },
    [],
  );

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
      addOrgNode,
      updateOrgNode,
      removeOrgNode,
      seedOrgHierarchy,
      clearOrgHierarchy,
      addWorkloadItem,
      updateWorkloadItem,
      removeWorkloadItem,
      addConnector,
      updateConnector,
      removeConnector,
      seedConnectorPresets,
      addProfessorMirror,
      updateProfessorMirror,
      removeProfessorMirror,
      addMirrorStaff,
      removeMirrorStaff,
      activateAiCoverage,
      restoreProfessorCoverage,
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
      addOrgNode,
      updateOrgNode,
      removeOrgNode,
      seedOrgHierarchy,
      clearOrgHierarchy,
      addWorkloadItem,
      updateWorkloadItem,
      removeWorkloadItem,
      addConnector,
      updateConnector,
      removeConnector,
      seedConnectorPresets,
      addProfessorMirror,
      updateProfessorMirror,
      removeProfessorMirror,
      addMirrorStaff,
      removeMirrorStaff,
      activateAiCoverage,
      restoreProfessorCoverage,
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
