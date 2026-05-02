import type { StateCode } from "@/lib/eligibility/types";

export interface ResourceLink {
  title: string;
  url: string;
  description: string;
  category: "Government" | "Advocacy" | "Legal Aid" | "Parent Center";
}

export const STATIC_RESOURCES: Record<StateCode, ResourceLink[]> = {
  CO: [
    {
      title: "Colorado Dept. of Education — Exceptional Student Services",
      url: "https://www.cde.state.co.us/cdesped",
      description:
        "Official rules, eligibility criteria, IEP forms, and dispute resolution for special education in Colorado.",
      category: "Government",
    },
    {
      title: "Colorado ECEA Rules (1 CCR 301-8)",
      url: "https://www.cde.state.co.us/spedlaw/rules",
      description:
        "Full text of the Exceptional Children's Educational Act rules — the legal basis for IEP eligibility in Colorado.",
      category: "Government",
    },
    {
      title: "PEAK Parent Center",
      url: "https://www.peakparent.org",
      description:
        "Colorado's federally-designated Parent Training & Information Center. Free 1:1 help understanding IEPs, 504s, and parent rights.",
      category: "Parent Center",
    },
    {
      title: "Disability Law Colorado",
      url: "https://disabilitylawco.org",
      description:
        "Colorado's protection & advocacy agency. Free legal help on special-education denials, restraint/seclusion, and discrimination.",
      category: "Legal Aid",
    },
    {
      title: "Early Intervention Colorado",
      url: "https://earlyintervention.coloradoofficeofearlychildhood.com",
      description:
        "Free evaluation and services for children birth–3 with developmental delays under IDEA Part C.",
      category: "Government",
    },
    {
      title: "Colorado COPAA Member Attorneys",
      url: "https://www.copaa.org/page/findattorney",
      description:
        "Directory of attorneys and advocates who specialize in IDEA and Section 504 cases.",
      category: "Advocacy",
    },
  ],
  CA: [
    {
      title: "California Dept. of Education — Special Education Division",
      url: "https://www.cde.ca.gov/sp/se/",
      description:
        "State guidance on IEPs, 504s, eligibility criteria, and complaint procedures.",
      category: "Government",
    },
    {
      title: "5 CCR § 3030 — Eligibility Criteria",
      url: "https://www.cde.ca.gov/sp/se/lr/eligibility.asp",
      description:
        "California's specific eligibility regulations for each IDEA category.",
      category: "Government",
    },
    {
      title: "Disability Rights California",
      url: "https://www.disabilityrightsca.org",
      description:
        "California's protection & advocacy agency. Free legal help, publications, and self-advocacy tools.",
      category: "Legal Aid",
    },
    {
      title: "Family Empowerment Centers (statewide map)",
      url: "https://www.cde.ca.gov/sp/se/qa/fecselpa.asp",
      description:
        "Free, parent-run resource centers in every region of California for families with kids ages 3–22 with disabilities.",
      category: "Parent Center",
    },
    {
      title: "Early Start (CA Part C)",
      url: "https://www.dds.ca.gov/services/early-start/",
      description:
        "Free evaluation and intervention for children birth–3 with developmental delays in California.",
      category: "Government",
    },
    {
      title: "OAH — Special Education Division (Due Process)",
      url: "https://www.dgs.ca.gov/OAH/Case-Types/Special-Education",
      description:
        "Where California special-education due-process complaints are filed and heard.",
      category: "Government",
    },
  ],
};

export const SCRAPE_TARGETS: Record<StateCode, string[]> = {
  CO: [
    "https://www.cde.state.co.us/cdesped",
    "https://www.cde.state.co.us/spedlaw/rules",
  ],
  CA: [
    "https://www.cde.ca.gov/sp/se/",
    "https://www.cde.ca.gov/sp/se/lr/eligibility.asp",
  ],
};
