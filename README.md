# EduHelp

> AI-assisted special-education eligibility navigator for families in **Colorado** and **California**.

EduHelp lets parents, caregivers, and advocates upload an evaluation, IEP/504 report, doctor's letter, or test results and instantly see:

- which **IDEA categories** the child may qualify under (with state-specific citations)
- whether a **504 Plan** is the right fallback
- the **scores, diagnoses, and instruments** the engine pulled out of the document
- prioritized **next steps** (who to email, what to ask for, what timeline applies)
- ready-to-send **letter templates** with the right legal citations
- live **state DOE resources** and curated parent advocacy organizations

It runs **fully without any AI key** using a deterministic rules engine built on:

- IDEA — `34 C.F.R. § 300.8`
- Colorado ECEA Rules — `1 CCR 301-8 § 2.08`
- California `5 CCR § 3030` and `Cal. Ed. Code §§ 56026, 56333–56338`

You can plug in **OpenAI**, **Anthropic**, **OpenRouter**, or **Ollama Cloud** as a drop-in narrative generator on top of the rules engine.

---

## Why this exists

Schools' special-education paperwork is dense, the legal terms vary by state, and many families either give up or pay an advocate $250/hour to translate. EduHelp is a free, open-source tool that does the translation in seconds — and tells you exactly what to write to the school.

---

## Stack

- [Next.js 14](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) + custom design system
- [react-dropzone](https://react-dropzone.js.org) for uploads
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) for PDF text extraction
- [cheerio](https://cheerio.js.org) for live state-DOE scraping
- [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [OpenRouter](https://openrouter.ai), [Ollama Cloud](https://ollama.com) — pick one

---

## Quick start

```bash
git clone https://github.com/AaronGrace978/EduHelp.git
cd EduHelp
cp .env.example .env.local   # add an AI key if you want — totally optional
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're in.

### Adding an AI provider

Open `.env.local` and fill in **any one** of the following blocks. EduHelp picks the first one with a key (or the one you set with `AI_PROVIDER=`).

```ini
# OpenAI — see https://developers.openai.com/api/docs/models
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5

# Anthropic — see https://docs.anthropic.com/en/docs/about-claude/models/all-models
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-6

# OpenRouter — see https://openrouter.ai/models
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=anthropic/claude-sonnet-4.6

# Ollama Cloud — https://docs.ollama.com/cloud · catalog https://ollama.com/search?c=cloud
OLLAMA_API_KEY=...
OLLAMA_MODEL=gpt-oss:120b
# List models: curl -H "Authorization: Bearer $OLLAMA_API_KEY" https://ollama.com/api/tags
```

Defaults are also defined in `src/lib/ai-models.ts` (including a checklist of current [Ollama cloud model families](https://ollama.com/search?c=cloud) you can try once your key has access).

If you set none of these, EduHelp still produces the full structured report from the deterministic rules engine.

---

## Pages

| Route        | What it does                                                                              |
| ------------ | ----------------------------------------------------------------------------------------- |
| `/`          | Landing page with feature overview                                                        |
| `/analyze`   | Upload PDFs / text + state selector → eligibility report with evidence and next steps     |
| `/resources` | Curated state-specific resources + live-scraped headlines from CDE / CDE-CA               |
| `/templates` | Editable letter generator (eval request standard / firm, plus 504 request) with citations |

---

## How the eligibility engine works

1. **Extract** — pulls standardized scores (FSIQ, VCI, BASC T-scores, etc.), diagnoses, instruments, and child age from the document text.
2. **Score** — runs each Colorado / California IDEA category through a rule set that combines keyword matches with score-based heuristics (e.g., low academic + average cognitive → SLD; FSIQ ≤ 75 with low adaptive → ID; ADOS/ADI-R mention → ASD).
3. **Rank** — sorts findings by confidence (0–100) and assigns a likelihood band (`Likely`, `Possible`, `Unlikely`, `Insufficient data`).
4. **Narrate** — if an AI provider is configured, sends the structured findings + a 6,000-char document excerpt and asks the model to produce a parent-friendly summary, evidence bullets, and an action checklist. The AI never invents categories — it only narrates the rules engine output.

All findings include the underlying citation so families and advocates can verify them.

---

## Privacy

- Documents are streamed to the API route, parsed in memory, then discarded.
- Nothing is written to disk by default. The `/uploads/` and `/tmp/` paths in `.gitignore` exist as a safety net.
- If you enable an AI provider, the relevant excerpt is sent to that provider — review their data-handling policies before uploading PHI.

---

## Roadmap

- Image / scanned-PDF OCR
- DOCX upload support
- Spanish-language UI
- Additional states (Texas, NY, FL, IL)
- Automatic IEE-request and Due Process complaint templates
- Save / share secure report links

---

## Disclaimer

EduHelp is **not legal advice**. Final eligibility for an IEP or 504 plan is determined by the school's multidisciplinary team after a full evaluation. For disputes, consult an attorney or your state's protection-and-advocacy agency (Disability Law Colorado / Disability Rights California).

---

## License

MIT © 2026 — built for families.
