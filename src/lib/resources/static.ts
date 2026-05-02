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
  TX: [
    {
      title: "Texas Education Agency — Special Education",
      url: "https://tea.texas.gov/academics/special-student-populations/special-education",
      description:
        "TEA guidance on the ARD process, eligibility, dispute resolution, and parent rights in Texas.",
      category: "Government",
    },
    {
      title: "TEA SPEDTex Information Center",
      url: "https://www.spedtex.org",
      description:
        "Free statewide resource center: helpline (1-855-773-3839), parent guides, and ARD prep.",
      category: "Parent Center",
    },
    {
      title: "Disability Rights Texas",
      url: "https://disabilityrightstx.org",
      description:
        "Texas's protection & advocacy agency — free legal help with IEP / 504 disputes and discrimination.",
      category: "Legal Aid",
    },
    {
      title: "Partners Resource Network (PRN)",
      url: "https://prntexas.org",
      description:
        "Texas's federally-designated Parent Training & Information centers (PATH, PEN, TEAM).",
      category: "Parent Center",
    },
    {
      title: "ECI — Early Childhood Intervention",
      url: "https://www.hhs.texas.gov/services/disability/early-childhood-intervention-services",
      description:
        "Free Part C services for Texas children birth–3 with developmental delays.",
      category: "Government",
    },
    {
      title: "19 TAC § 89.1040 — Eligibility Criteria",
      url: "https://tea.texas.gov/about-tea/laws-and-rules/sboe-rules-tac/sboe-tac-currently-in-effect/ch089aa.pdf",
      description:
        "Full text of Texas's special-education eligibility rules under the Texas Administrative Code.",
      category: "Government",
    },
  ],
  NY: [
    {
      title: "NYSED Office of Special Education",
      url: "https://www.nysed.gov/special-education",
      description:
        "Official guidance on CPSE / CSE process, eligibility, and parent rights in New York.",
      category: "Government",
    },
    {
      title: "Advocates for Children of New York",
      url: "https://www.advocatesforchildren.org",
      description:
        "Free legal help and parent training for New York City families dealing with school-based disability issues.",
      category: "Parent Center",
    },
    {
      title: "INCLUDEnyc",
      url: "https://www.includenyc.org",
      description:
        "NYC's parent training & information center — webinars, helpline (212-677-4660), and 1:1 advice for families.",
      category: "Parent Center",
    },
    {
      title: "Disability Rights New York",
      url: "https://www.drny.org",
      description:
        "New York's protection & advocacy agency — free legal services for special-education and disability rights cases.",
      category: "Legal Aid",
    },
    {
      title: "Parent Network of WNY",
      url: "https://parentnetworkwny.org",
      description:
        "Western New York's parent training & information center, serving 16 counties.",
      category: "Parent Center",
    },
    {
      title: "8 NYCRR Part 200 — Special Education Regulations",
      url: "https://www.nysed.gov/special-education/special-education-regulations-part-200-and-part-201",
      description:
        "Full New York Commissioner's Regulations governing IEP eligibility and procedure.",
      category: "Government",
    },
  ],
  FL: [
    {
      title: "Florida Bureau of Exceptional Education and Student Services (BEESS)",
      url: "https://www.fldoe.org/academics/exceptional-student-edu/",
      description:
        "Florida's official ESE office — eligibility rules, dispute resolution, and parent rights.",
      category: "Government",
    },
    {
      title: "FDLRS Family Services",
      url: "https://www.fdlrs.org",
      description:
        "Florida's network of regional resource centers offering free family training and consultation.",
      category: "Parent Center",
    },
    {
      title: "Disability Rights Florida",
      url: "https://disabilityrightsflorida.org",
      description:
        "Florida's protection & advocacy agency — free legal help for special-education and disability rights matters.",
      category: "Legal Aid",
    },
    {
      title: "Family Network on Disabilities",
      url: "https://fndusa.org",
      description:
        "Florida's federally-designated parent training and information center.",
      category: "Parent Center",
    },
    {
      title: "Early Steps (FL Part C)",
      url: "https://www.floridahealth.gov/AlternateSites/CMS-Kids/families/early_steps/early_steps.html",
      description:
        "Free Part C evaluation and intervention for Florida children birth–3 with developmental delays.",
      category: "Government",
    },
    {
      title: "Rule 6A-6.030xx, F.A.C. — ESE Eligibility",
      url: "https://www.flrules.org/gateway/ChapterHome.asp?Chapter=6A-6",
      description:
        "Full text of Florida's exceptional student education eligibility rules.",
      category: "Government",
    },
  ],
  IL: [
    {
      title: "Illinois State Board of Education — Special Education",
      url: "https://www.isbe.net/Pages/Special-Education.aspx",
      description:
        "ISBE's official guidance on IEPs, 504s, eligibility, and dispute resolution.",
      category: "Government",
    },
    {
      title: "Equip for Equality",
      url: "https://www.equipforequality.org",
      description:
        "Illinois's protection & advocacy agency — free legal help for special-education denials, discipline, and discrimination.",
      category: "Legal Aid",
    },
    {
      title: "Family Resource Center on Disabilities (FRCD)",
      url: "https://frcd.org",
      description:
        "Chicago-based parent training & information center serving Illinois families since 1970.",
      category: "Parent Center",
    },
    {
      title: "Family Matters PTI (Downstate IL)",
      url: "https://www.fmptic.org",
      description:
        "Federally-designated PTI for the southern half of Illinois.",
      category: "Parent Center",
    },
    {
      title: "Illinois Early Intervention Services",
      url: "https://www2.illinois.gov/sites/OECD/EarlyChildhood/Pages/EarlyIntervention.aspx",
      description:
        "Free Part C services for Illinois children birth–3 with developmental delays.",
      category: "Government",
    },
    {
      title: "23 IAC § 226 — Special Education Rules",
      url: "https://www.isbe.net/Documents/226ARK.pdf",
      description:
        "Full Illinois special-education administrative code — the legal basis for eligibility.",
      category: "Government",
    },
  ],
  MA: [
    {
      title: "Massachusetts DESE — Special Education",
      url: "https://www.doe.mass.edu/sped/",
      description:
        "Official guidance on evaluation, Team meetings, IEPs, 603 CMR 28, and dispute resolution in Massachusetts.",
      category: "Government",
    },
    {
      title: "603 CMR 28 — Special Education Regulations",
      url: "https://www.doe.mass.edu/lawsregs/603cmr28.html",
      description:
        "Full text of Massachusetts special-education regulations — eligibility, timelines, and procedural safeguards.",
      category: "Government",
    },
    {
      title: "Disability Law Center (Massachusetts)",
      url: "https://www.dlc-ma.org",
      description:
        "Massachusetts protection & advocacy agency — free legal help with IEP / 504 disputes, restraint, and discrimination.",
      category: "Legal Aid",
    },
    {
      title: "Federation for Children with Special Needs",
      url: "https://fcsn.org",
      description:
        "Boston-based parent center offering workshops, 1:1 support, and resources for families statewide.",
      category: "Parent Center",
    },
    {
      title: "Massachusetts Parent Teacher Association — Special Education",
      url: "https://masspta.org",
      description:
        "Statewide PTA with special-education advocacy resources and local council connections.",
      category: "Parent Center",
    },
    {
      title: "Massachusetts Early Intervention (Part C)",
      url: "https://www.mass.gov/info-details/early-intervention-program",
      description:
        "State overview of Massachusetts Early Intervention — evaluation and services for infants and toddlers with developmental concerns.",
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
  TX: [
    "https://tea.texas.gov/academics/special-student-populations/special-education",
  ],
  NY: ["https://www.nysed.gov/special-education"],
  FL: ["https://www.fldoe.org/academics/exceptional-student-edu/"],
  IL: ["https://www.isbe.net/Pages/Special-Education.aspx"],
  MA: [
    "https://www.doe.mass.edu/sped/",
    "https://www.doe.mass.edu/lawsregs/603cmr28.html",
  ],
};
