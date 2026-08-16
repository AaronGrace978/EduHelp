import type {
  ConnectorAuth,
  ConnectorKind,
  CoverageStatus,
  InstructionalRole,
  MirrorCapability,
  OrgRoleLevel,
  SystemConnector,
  WorkloadCategory,
  WorkloadPriority,
  WorkloadStatus,
} from "@/types";

export const ORG_LEVELS: {
  value: OrgRoleLevel;
  label: string;
  rank: number;
}[] = [
  { value: "governing_board", label: "Governing Board", rank: 0 },
  { value: "president", label: "President / Chancellor", rank: 1 },
  { value: "cabinet", label: "Cabinet / VP / Provost", rank: 2 },
  { value: "dean", label: "Dean", rank: 3 },
  { value: "chair", label: "Department Chair", rank: 4 },
  { value: "director", label: "Director", rank: 5 },
  { value: "coordinator", label: "Coordinator", rank: 6 },
  { value: "faculty", label: "Faculty", rank: 7 },
  { value: "staff", label: "Staff", rank: 8 },
  { value: "other", label: "Other", rank: 9 },
];

export const WORKLOAD_CATEGORIES: {
  value: WorkloadCategory;
  label: string;
}[] = [
  { value: "accreditation", label: "Accreditation" },
  { value: "academic_affairs", label: "Academic Affairs" },
  { value: "enrollment", label: "Enrollment" },
  { value: "student_affairs", label: "Student Affairs" },
  { value: "budget", label: "Budget & Finance" },
  { value: "compliance", label: "Compliance / Title IX / Clery" },
  { value: "hr", label: "Human Resources" },
  { value: "facilities", label: "Facilities" },
  { value: "it_systems", label: "IT / SIS / ERP" },
  { value: "advancement", label: "Advancement" },
  { value: "other", label: "Other" },
];

export const WORKLOAD_PRIORITIES: {
  value: WorkloadPriority;
  label: string;
}[] = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export const WORKLOAD_STATUSES: { value: WorkloadStatus; label: string }[] = [
  { value: "backlog", label: "Backlog" },
  { value: "in_progress", label: "In progress" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Done" },
];

export const CONNECTOR_KINDS: { value: ConnectorKind; label: string }[] = [
  { value: "ellucian_banner", label: "Ellucian Banner" },
  { value: "powerfaids", label: "PowerFAIDS" },
  { value: "oracle", label: "Oracle Database" },
  { value: "sql_server", label: "Microsoft SQL Server" },
  { value: "postgres", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL / MariaDB" },
  { value: "peoplesoft", label: "PeopleSoft Campus Solutions" },
  { value: "colleague", label: "Ellucian Colleague" },
  { value: "workday", label: "Workday Student / HCM" },
  { value: "salesforce", label: "Salesforce Education Cloud" },
  { value: "custom_api", label: "Custom REST / GraphQL API" },
  { value: "odbc", label: "ODBC / generic warehouse" },
  { value: "other", label: "Other institutional system" },
];

export const CONNECTOR_AUTH: { value: ConnectorAuth; label: string }[] = [
  { value: "institutional_sso", label: "Institutional SSO" },
  { value: "oauth2", label: "OAuth 2.0" },
  { value: "api_key", label: "API key" },
  { value: "bearer", label: "Bearer token" },
  { value: "basic", label: "Basic auth" },
  { value: "connection_string", label: "DB connection string" },
  { value: "none", label: "None / browser portal only" },
];

export type HierarchySeedNode = {
  key: string;
  title: string;
  level: OrgRoleLevel;
  personName: string;
  unit?: string;
  reportsTo?: string;
  fte?: number;
};

/** Canonical higher-ed leadership skeleton — customize per campus. */
export const HIERARCHY_SEED: HierarchySeedNode[] = [
  {
    key: "board",
    title: "Chair, Board of Trustees",
    level: "governing_board",
    personName: "",
    unit: "Governing Board",
  },
  {
    key: "president",
    title: "President",
    level: "president",
    personName: "",
    unit: "Office of the President",
    reportsTo: "board",
    fte: 1,
  },
  {
    key: "provost",
    title: "Provost & VP Academic Affairs",
    level: "cabinet",
    personName: "",
    unit: "Academic Affairs",
    reportsTo: "president",
    fte: 1,
  },
  {
    key: "vp-student",
    title: "VP Student Affairs",
    level: "cabinet",
    personName: "",
    unit: "Student Affairs",
    reportsTo: "president",
    fte: 1,
  },
  {
    key: "vp-finance",
    title: "VP Finance / CFO",
    level: "cabinet",
    personName: "",
    unit: "Finance & Administration",
    reportsTo: "president",
    fte: 1,
  },
  {
    key: "vp-enrollment",
    title: "VP Enrollment Management",
    level: "cabinet",
    personName: "",
    unit: "Enrollment",
    reportsTo: "president",
    fte: 1,
  },
  {
    key: "cio",
    title: "Chief Information Officer",
    level: "cabinet",
    personName: "",
    unit: "Information Technology",
    reportsTo: "president",
    fte: 1,
  },
  {
    key: "dean-as",
    title: "Dean, Arts & Sciences",
    level: "dean",
    personName: "",
    unit: "College of Arts & Sciences",
    reportsTo: "provost",
    fte: 1,
  },
  {
    key: "dean-bus",
    title: "Dean, Business",
    level: "dean",
    personName: "",
    unit: "College of Business",
    reportsTo: "provost",
    fte: 1,
  },
  {
    key: "dean-edu",
    title: "Dean, Education",
    level: "dean",
    personName: "",
    unit: "College of Education",
    reportsTo: "provost",
    fte: 1,
  },
  {
    key: "dean-health",
    title: "Dean, Health Sciences",
    level: "dean",
    personName: "",
    unit: "College of Health Sciences",
    reportsTo: "provost",
    fte: 1,
  },
  {
    key: "dir-finaid",
    title: "Director of Financial Aid",
    level: "director",
    personName: "",
    unit: "Financial Aid",
    reportsTo: "vp-enrollment",
    fte: 1,
  },
  {
    key: "dir-registrar",
    title: "Registrar",
    level: "director",
    personName: "",
    unit: "Registrar",
    reportsTo: "provost",
    fte: 1,
  },
  {
    key: "dir-dss",
    title: "Director, Disability Support Services",
    level: "director",
    personName: "",
    unit: "Student Affairs / DSS",
    reportsTo: "vp-student",
    fte: 1,
  },
  {
    key: "dir-ir",
    title: "Director, Institutional Research",
    level: "director",
    personName: "",
    unit: "Institutional Research",
    reportsTo: "provost",
    fte: 1,
  },
];

export type ConnectorPreset = Omit<
  SystemConnector,
  "id" | "createdAt" | "status" | "lastCheckedAt"
> & { status?: SystemConnector["status"] };

export const CONNECTOR_PRESETS: ConnectorPreset[] = [
  {
    name: "Ellucian Banner SIS",
    kind: "ellucian_banner",
    endpointOrHost: "https://banner.your-campus.edu",
    authType: "institutional_sso",
    connectionNotes:
      "Banner Self-Service / Admin pages. Map SSRMEET, SFBETRM, SPRIDEN via Ethos API or Oracle views when available.",
    queryTemplates: [
      {
        id: "banner-terms",
        label: "Active registration terms",
        body: "-- Ethos / Banner term catalog\n-- GET /api/academic-periods?status=active",
      },
      {
        id: "banner-holds",
        label: "Open student holds",
        body: "-- Hold codes by student\n-- GET /api/persons/{id}/holds",
      },
    ],
    tags: ["SIS", "registration", "Ethos"],
  },
  {
    name: "PowerFAIDS",
    kind: "powerfaids",
    endpointOrHost: "https://aid.your-campus.edu",
    authType: "institutional_sso",
    connectionNotes:
      "Campus financial aid packaging. Sync award years, verification flags, and disbursement status.",
    queryTemplates: [
      {
        id: "pf-awards",
        label: "Aid year award summary",
        body: "-- Award year packaging rollup by fund source\n-- Export: award year, fund, offered, accepted, disbursed",
      },
    ],
    tags: ["financial aid", "packaging"],
  },
  {
    name: "Oracle (Banner DB / warehouse)",
    kind: "oracle",
    endpointOrHost: "oracle-host:1521/BANNER",
    authType: "connection_string",
    connectionNotes:
      "Read-only service account recommended. Store DSN locally — never commit production passwords to git.",
    queryTemplates: [
      {
        id: "ora-enrollment",
        label: "Census enrollment by college",
        body: "SELECT college_code, term_code, COUNT(*) AS headcount\nFROM enrollment_census\nWHERE term_code = :term\nGROUP BY college_code, term_code\nORDER BY college_code;",
      },
      {
        id: "ora-fte",
        label: "Instructional FTE by department",
        body: "SELECT dept_code, SUM(credit_hours) / 15 AS fte\nFROM course_sections\nWHERE term_code = :term\nGROUP BY dept_code;",
      },
    ],
    tags: ["SQL", "warehouse", "IR"],
  },
  {
    name: "SQL Server (reporting)",
    kind: "sql_server",
    endpointOrHost: "sql-report.your-campus.edu",
    authType: "connection_string",
    connectionNotes:
      "Common for IR extracts, ODS mirrors, and Power BI datasets.",
    queryTemplates: [
      {
        id: "mssql-retention",
        label: "Fall-to-fall retention cohort",
        body: "SELECT cohort_term, retained_flag, COUNT(*) AS students\nFROM retention_cohort\nGROUP BY cohort_term, retained_flag;",
      },
    ],
    tags: ["SQL", "IR", "retention"],
  },
  {
    name: "PeopleSoft Campus Solutions",
    kind: "peoplesoft",
    endpointOrHost: "https://cs.your-campus.edu",
    authType: "institutional_sso",
    connectionNotes: "Student records, financials, and campus community.",
    queryTemplates: [
      {
        id: "ps-class",
        label: "Class schedule extract",
        body: "-- Class_Tbl / CLASS_TBL term extract for schedule of classes",
      },
    ],
    tags: ["SIS"],
  },
  {
    name: "Ellucian Colleague",
    kind: "colleague",
    endpointOrHost: "https://colleague.your-campus.edu",
    authType: "institutional_sso",
    connectionNotes: "Colleague UI / Colleague Self-Service / Ethos.",
    queryTemplates: [],
    tags: ["SIS"],
  },
  {
    name: "Workday Student / HCM",
    kind: "workday",
    endpointOrHost: "https://impl.workday.com/your-tenant",
    authType: "oauth2",
    connectionNotes: "RAAS / REST integrations for HR and student lifecycle.",
    queryTemplates: [
      {
        id: "wd-org",
        label: "Supervisory org snapshot",
        body: "-- Workday: Supervisory Organization + Workers report",
      },
    ],
    tags: ["HCM", "student"],
  },
];

export function levelLabel(level: OrgRoleLevel) {
  return ORG_LEVELS.find((l) => l.value === level)?.label ?? level;
}

export function levelRank(level: OrgRoleLevel) {
  return ORG_LEVELS.find((l) => l.value === level)?.rank ?? 99;
}

export const INSTRUCTIONAL_ROLES: {
  value: InstructionalRole;
  label: string;
}[] = [
  { value: "professor", label: "Professor" },
  { value: "associate_professor", label: "Associate Professor" },
  { value: "assistant_professor", label: "Assistant Professor" },
  { value: "adjunct", label: "Adjunct" },
  { value: "lecturer", label: "Lecturer" },
  { value: "instructor", label: "Instructor" },
  { value: "ta", label: "Teaching Assistant (TA)" },
  { value: "grader", label: "Grader" },
  { value: "si_leader", label: "SI / Peer Leader" },
  { value: "tutor", label: "Tutor" },
  { value: "lab_assistant", label: "Lab Assistant" },
  { value: "guest", label: "Guest Lecturer" },
  { value: "other", label: "Other" },
];

export const COVERAGE_STATUSES: {
  value: CoverageStatus;
  label: string;
}[] = [
  { value: "available", label: "Professor available" },
  { value: "unavailable", label: "Professor unavailable" },
  { value: "ai_covering", label: "AI mirror covering" },
  { value: "ta_covering", label: "TA covering" },
  { value: "human_backup", label: "Human backup covering" },
];

export const MIRROR_CAPABILITIES: {
  value: MirrorCapability;
  label: string;
  hint: string;
}[] = [
  {
    value: "office_hours_qa",
    label: "Office-hours Q&A",
    hint: "Answer routine course questions in the professor's voice",
  },
  {
    value: "syllabus_guidance",
    label: "Syllabus guidance",
    hint: "Point students to policies, dates, and grading rules",
  },
  {
    value: "lecture_outline",
    label: "Lecture outlines",
    hint: "Share prepared outlines when a session is missed",
  },
  {
    value: "assignment_clarification",
    label: "Assignment clarification",
    hint: "Clarify prompts without inventing new requirements",
  },
  {
    value: "discussion_facilitation",
    label: "Discussion facilitation",
    hint: "Keep online threads moving with prompts",
  },
  {
    value: "grading_assist",
    label: "Grading assist",
    hint: "Draft rubric-aligned feedback for human review",
  },
  {
    value: "announcements",
    label: "Announcements",
    hint: "Draft campus LMS announcements for approval",
  },
];

export function instructionalRoleLabel(role: InstructionalRole) {
  return INSTRUCTIONAL_ROLES.find((r) => r.value === role)?.label ?? role;
}

export function coverageLabel(status: CoverageStatus) {
  return COVERAGE_STATUSES.find((s) => s.value === status)?.label ?? status;
}
