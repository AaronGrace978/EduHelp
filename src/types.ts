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
  | "banner"
  | "disability"
  | "books"
  | "rmp"
  | "hierarchy"
  | "workload"
  | "connector"
  | "mirror"
  | "general";

export type OrgRoleLevel =
  | "governing_board"
  | "president"
  | "cabinet"
  | "dean"
  | "chair"
  | "director"
  | "coordinator"
  | "faculty"
  | "staff"
  | "other";

export type InstructionalRole =
  | "professor"
  | "associate_professor"
  | "assistant_professor"
  | "adjunct"
  | "lecturer"
  | "instructor"
  | "ta"
  | "grader"
  | "si_leader"
  | "tutor"
  | "lab_assistant"
  | "guest"
  | "other";

export type CoverageStatus =
  | "available"
  | "unavailable"
  | "ai_covering"
  | "ta_covering"
  | "human_backup";

export type MirrorCapability =
  | "office_hours_qa"
  | "syllabus_guidance"
  | "lecture_outline"
  | "assignment_clarification"
  | "discussion_facilitation"
  | "grading_assist"
  | "announcements";

export type CourseStaffMember = {
  id: string;
  name: string;
  role: InstructionalRole;
  email?: string;
  notes?: string;
};

export type ProfessorMirror = {
  id: string;
  courseCode: string;
  courseTitle: string;
  term: string;
  department?: string;
  professorName: string;
  professorEmail?: string;
  coverageStatus: CoverageStatus;
  unavailableReason?: string;
  unavailableUntil?: string;
  aiMirrorEnabled: boolean;
  aiPersonaNotes: string;
  syllabusOutline: string;
  officeHours: string;
  faqNotes: string;
  capabilities: MirrorCapability[];
  staff: CourseStaffMember[];
  humanOversightRequired: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OrgNode = {
  id: string;
  title: string;
  level: OrgRoleLevel;
  personName: string;
  unit?: string;
  email?: string;
  phone?: string;
  reportsToId: string | null;
  notes?: string;
  fte?: number;
};

export type WorkloadPriority = "critical" | "high" | "medium" | "low";
export type WorkloadStatus = "backlog" | "in_progress" | "blocked" | "done";
export type WorkloadCategory =
  | "accreditation"
  | "budget"
  | "enrollment"
  | "compliance"
  | "hr"
  | "facilities"
  | "student_affairs"
  | "academic_affairs"
  | "it_systems"
  | "advancement"
  | "other";

export type WorkloadItem = {
  id: string;
  title: string;
  description?: string;
  category: WorkloadCategory;
  priority: WorkloadPriority;
  status: WorkloadStatus;
  assigneeId?: string;
  dueDate?: string;
  effortHours?: number;
  createdAt: string;
  updatedAt: string;
};

export type ConnectorKind =
  | "ellucian_banner"
  | "powerfaids"
  | "oracle"
  | "sql_server"
  | "postgres"
  | "mysql"
  | "peoplesoft"
  | "colleague"
  | "workday"
  | "salesforce"
  | "custom_api"
  | "odbc"
  | "other";

export type ConnectorAuth =
  | "none"
  | "basic"
  | "bearer"
  | "oauth2"
  | "api_key"
  | "connection_string"
  | "institutional_sso";

export type ConnectorQueryTemplate = {
  id: string;
  label: string;
  body: string;
};

export type SystemConnector = {
  id: string;
  name: string;
  kind: ConnectorKind;
  status: "planned" | "configured" | "connected" | "error" | "disabled";
  endpointOrHost: string;
  authType: ConnectorAuth;
  connectionNotes?: string;
  queryTemplates: ConnectorQueryTemplate[];
  tags?: string[];
  lastCheckedAt?: string;
  createdAt: string;
};

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

export type BannerTerm = {
  id: string;
  term: string;
  status: "upcoming" | "registering" | "enrolled" | "completed";
  credits?: number;
  notes?: string;
};

export type BannerHold = {
  id: string;
  label: string;
  office?: string;
  resolved: boolean;
  createdAt: string;
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
  bannerPortalUrl: string;
  bannerStudentId: string;
  bannerTerms: BannerTerm[];
  bannerHolds: BannerHold[];
  orgNodes: OrgNode[];
  workload: WorkloadItem[];
  connectors: SystemConnector[];
  professorMirrors: ProfessorMirror[];
};
