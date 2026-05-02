# EduHelp

> AI-assisted special-education eligibility navigator for families in **Colorado, California, Texas, New York, Florida, and Illinois**.

EduHelp lets parents, caregivers, and advocates upload an evaluation, IEP/504 report, doctor's letter, or test results — even **photos of paper docs** and **scanned PDFs** — and instantly see:

- which **IDEA categories** the child may qualify under (with state-specific citations)
- whether a **504 Plan** is the right fallback
- the **scores, diagnoses, and instruments** the engine pulled out of the document
- **what the evaluation is missing** (a domain-completeness scanner)
- prioritized **next steps** and a state-aware **timeline calculator** (consent → eligibility → IEP)
- evidence-based **suggested accommodations** matched to the profile
- ready-to-send **letter templates** + a full **escalation kit** (IEE, mediation, state complaint, OCR complaint, due process)
- a **1-page child profile** to share with new teachers and subs
- a **glossary** of every special-ed acronym in plain English (with hover tooltips)
- live **state DOE resources** for all 6 supported states
- **ask-the-document chat** (your AI provider answers follow-up questions about the uploaded report)
- **IEP goal SMART review** that scores each goal and suggests rewrites
- **Spanish output toggle** for the AI narrative & chat
- **Print + PDF export**, plus a **PWA / installable** experience

It runs **fully without any AI key** using a deterministic rules engine built on:

- IDEA — `34 C.F.R. § 300.8`
- Colorado ECEA Rules — `1 CCR 301-8 § 2.08`
- California `5 CCR § 3030` and `Cal. Ed. Code §§ 56026, 56333–56338`
- Texas `19 TAC § 89.1040`
- New York `8 NYCRR § 200.1(zz)`
- Florida Administrative Code Rule `6A-6.030xx`
- Illinois `23 IAC § 226.75`

You can plug in **OpenAI**, **Anthropic**, **OpenRouter**, or **Ollama Cloud** as a drop-in narrative generator on top of the rules engine.

---

## Why this exists

Schools' special-education paperwork is dense, the legal terms vary by state, and many families either give up or pay an advocate $250/hour to translate. EduHelp is a free, open-source tool that does the translation in seconds — and tells you exactly what to write to the school.

---

## Stack

- [Next.js 14](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) + custom design system
- [react-dropzone](https://react-dropzone.js.org) for uploads
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) — PDF text extraction
- [mammoth](https://www.npmjs.com/package/mammoth) — DOCX text extraction
- [tesseract.js](https://tesseract.projectnaptha.com/) — server-side OCR for image / scanned-doc uploads
- [jspdf](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) — client-side PDF export of the report
- [cheerio](https://cheerio.js.org) for live state-DOE scraping
- [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [OpenRouter](https://openrouter.ai), [Ollama Cloud](https://ollama.com) — pick one (or "auto")

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

## Easiest installs (no Git required)

| Method | Who it's for | Steps |
| ------ | ------------ | ----- |
| **GitHub Release ZIP** | Friends / family who just want to run the app | Download `EduHelp-standalone-v*.zip` from the [Releases](https://github.com/AaronGrace978/EduHelp/releases) page → unzip → install [Node.js 20+](https://nodejs.org) → open the folder → read `HOW-TO-RUN.txt` → run `node server.js` → visit [http://localhost:3000](http://localhost:3000). Optional: copy `.env.example` to `.env.local` for server-side AI keys, or paste keys in the browser at `/settings`. |
| **Docker** | Anyone with [Docker Desktop](https://www.docker.com/products/docker-desktop/) | In the project folder: `docker compose up --build` → open [http://localhost:3000](http://localhost:3000). Optional: copy `.env.example` to `.env`, fill in keys, then `docker compose --env-file .env up --build`. |
| **Windows menu** | You already have the repo | Double-click `EduHelp.bat` → **5. Create portable ZIP** — shares a ZIP that only needs Node.js on the other machine (same as the Release bundle). |

Maintainers: from a clean clone, `release.bat` (or `npm run release:bundle` then zip `.next/standalone`) produces the same standalone folder Next.js documents for production — minimal `node_modules`, one `node server.js` entrypoint. Version numbers stay in sync via `package.json` → `EduHelp-standalone-v{version}.zip`.

### Adding an AI provider

You have **two ways** to give EduHelp an AI key — pick whichever you prefer:

1. **In the browser (recommended for one-off / personal use)** — open `/settings`, paste your key, pick a model, hit save. Keys live only in your browser's `localStorage` and are sent to the API as request headers; they never touch the server's `.env` file.
2. **Server-side `.env.local` (recommended for hosting / sharing one instance)** — copy `.env.example` → `.env.local` and fill in **any one** block below. EduHelp uses the first provider whose key it finds (or whichever you set with `AI_PROVIDER=openai|anthropic|openrouter|ollama`).

If you set **no** key at all, EduHelp still produces the full structured report from the deterministic rules engine — the AI just adds a parent-friendly narrative on top.

The full curated list of model IDs lives in [`src/lib/ai-models.ts`](src/lib/ai-models.ts).

---

#### 1. OpenAI (default: `gpt-5.5`)

**Get a key**

1. Sign up at <https://platform.openai.com/signup>.
2. Add a payment method at <https://platform.openai.com/settings/organization/billing/overview> (OpenAI requires a card on file — there is no permanently free tier, but new accounts get a small starting credit).
3. Go to <https://platform.openai.com/api-keys> → **Create new secret key** → name it `EduHelp` → copy the `sk-...` value (you'll only see it once).
4. Optional: at <https://platform.openai.com/settings/organization/limits> set a low monthly hard cap (e.g. `$5`) so you can never be surprised by a bill.

**Configure**

```ini
# .env.local
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
```

**Models you can drop in** (from [`OPENAI_MODELS`](src/lib/ai-models.ts))

| ID              | Notes                                                |
| --------------- | ---------------------------------------------------- |
| `gpt-5.5`       | Flagship reasoning, 1M ctx — **default**             |
| `gpt-5.4-mini`  | ~10× cheaper, still very capable                     |
| `gpt-5.4-nano`  | Fastest / lowest cost                                |
| `gpt-4.1`       | Previous-gen flagship if you need legacy             |
| `gpt-4.1-mini`  | Previous-gen low-latency                             |

Full catalog: <https://developers.openai.com/api/docs/models>.

---

#### 2. Anthropic (default: `claude-sonnet-4-6`)

**Get a key**

1. Sign up at <https://console.anthropic.com/signup>.
2. New accounts get a small free credit grant; for sustained use add a card at <https://console.anthropic.com/settings/billing>.
3. Go to <https://console.anthropic.com/settings/keys> → **Create Key** → name it `EduHelp` → copy the `sk-ant-...` value.
4. (Optional) set a monthly spend limit at <https://console.anthropic.com/settings/limits>.

**Configure**

```ini
# .env.local
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-6
```

**Models you can drop in** (from [`ANTHROPIC_MODELS`](src/lib/ai-models.ts))

| ID                  | Notes                                                       |
| ------------------- | ----------------------------------------------------------- |
| `claude-sonnet-4-6` | Balanced flagship, 1M ctx — **default**                     |
| `claude-opus-4-7`   | Most capable, best for nuanced legal / clinical reasoning   |
| `claude-haiku-4-5`  | Fastest + cheapest, 200K ctx — great for short documents    |
| `claude-sonnet-4-5` | Previous-gen Sonnet                                         |
| `claude-opus-4-6`   | Previous-gen Opus                                           |

Full catalog: <https://docs.anthropic.com/en/docs/about-claude/models/all-models>.

---

#### 3. OpenRouter — one key, every provider (default: `anthropic/claude-sonnet-4.6`)

OpenRouter is a unified API gateway that lets a single key reach OpenAI, Anthropic, Google, DeepSeek, Z.ai, Moonshot, Mistral, etc. Useful if you want to A/B different models without juggling multiple accounts.

**Get a key**

1. Sign up at <https://openrouter.ai/signup> (Google / GitHub / email).
2. Add credit at <https://openrouter.ai/credits> — you can prepay as little as $5; pay-as-you-go after that.
3. Visit <https://openrouter.ai/keys> → **Create Key** → name it `EduHelp` → copy the `sk-or-v1-...` value.
4. (Optional, recommended) at the same key page set a spend cap and a list of allowed models.

**Configure**

```ini
# .env.local
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=anthropic/claude-sonnet-4.6
OPENROUTER_SITE_URL=https://eduhelp.app   # used in HTTP-Referer header (optional)
```

**Models you can drop in** (from [`OPENROUTER_MODELS`](src/lib/ai-models.ts) — many more on the [catalog](https://openrouter.ai/models))

| Slug                                | Notes                                |
| ----------------------------------- | ------------------------------------ |
| `anthropic/claude-sonnet-4.6`       | Balanced, our **default**            |
| `~anthropic/claude-sonnet-latest`   | Auto-tracks the newest Sonnet        |
| `anthropic/claude-opus-4.7`         | Top-tier reasoning                   |
| `openai/gpt-5.5`                    | OpenAI flagship through OR           |
| `openai/gpt-5.4-mini`               | OpenAI mid-tier through OR           |
| `google/gemini-3-flash-preview`     | Fast multimodal                      |
| `z-ai/glm-5.1`                      | Strong agentic + coding              |
| `deepseek/deepseek-v4-pro`          | 1M-ctx reasoning, very cheap         |
| `moonshotai/kimi-k2.6`              | Multimodal / long-horizon            |

---

#### 4. Ollama Cloud (default: `gpt-oss:120b`)

Ollama Cloud runs large open-weights models on Ollama's GPUs and exposes them via a hosted API — no local install needed. (You can also run models locally with the Ollama CLI; see the bottom of this section.)

**Get a key**

1. Sign up at <https://ollama.com/signup>.
2. Activate Cloud at <https://ollama.com/cloud> (you'll see a per-account free quota; paid tiers unlock more concurrent usage).
3. Go to <https://ollama.com/settings/keys> → **Create API key** → name it `EduHelp` → copy the value.
4. Confirm your key works and list the models your account has access to:

```bash
curl -H "Authorization: Bearer $OLLAMA_API_KEY" https://ollama.com/api/tags
```

The output is the canonical list of `model:tag` strings you can put into `OLLAMA_MODEL`.

**Configure**

```ini
# .env.local
AI_PROVIDER=ollama
OLLAMA_API_KEY=...
OLLAMA_MODEL=gpt-oss:120b
OLLAMA_BASE_URL=https://ollama.com/api      # leave as-is for Ollama Cloud
```

**Cloud model families currently wired into EduHelp** (from [`OLLAMA_CLOUD_MODEL_FAMILIES`](src/lib/ai-models.ts) — full live catalog at <https://ollama.com/search?c=cloud>)

| Family                  | Why you'd pick it                                        |
| ----------------------- | -------------------------------------------------------- |
| `gpt-oss`               | OpenAI open-weights, 20B + 120B, 128K ctx — **default**  |
| `kimi-k2.6`             | Multimodal agentic, long-horizon                         |
| `glm-5.1`               | Z.ai SOTA on SWE-Bench Pro                               |
| `deepseek-v4-pro`       | Frontier MoE w/ 1M ctx                                   |
| `deepseek-v4-flash`     | Fast 284B-MoE / 13B-active reasoner                      |
| `gemma4`                | Google open-weights, multimodal + audio                  |
| `qwen3.5`               | Alibaba multimodal, 0.8B → 122B sizes                    |
| `qwen3-coder-next`      | Coding-focused agentic                                   |
| `gemini-3-flash-preview`| Google flagship at speed                                 |
| `minimax-m2.7`          | Coding + agentic                                         |
| `nemotron-3-super`      | NVIDIA 120B MoE for multi-agent                          |
| `devstral-small-2`      | 24B software-engineering agent                           |

> **Tip — finding the exact tag.** Cloud entries use plain tags like `gpt-oss:120b` or `glm-5.1:latest`. The local CLI uses `*-cloud` suffixed tags (e.g. `gpt-oss:120b-cloud`) — those are *only* for the local Ollama daemon's cloud-offload mode and will **not** work with the remote `ollama.com` API.

**Optional: run Ollama locally instead**

If you'd rather run a small model on your own machine (no API key, no per-request cost, complete privacy):

```bash
# Install (macOS / Windows / Linux)
# https://ollama.com/download
ollama pull llama3.2:3b
ollama serve
```

Then point EduHelp at your local daemon:

```ini
AI_PROVIDER=ollama
OLLAMA_API_KEY=local                 # any non-empty string
OLLAMA_MODEL=llama3.2:3b
OLLAMA_BASE_URL=http://localhost:11434/api
```

Local mode skips the cloud quota entirely; the trade-off is that 1B–8B local models give noticeably less polished narratives than `gpt-oss:120b` on cloud or any of the flagship hosted providers above.

---

#### Switching providers from the UI

After the dev server is running, open <http://localhost:3000/settings>:

- Pick a provider from the dropdown
- Paste the key you just generated
- Pick (or type in) the exact model ID from the table above
- Click **Save** — you'll see an "AI: ✓ configured" pill on `/analyze`

These settings live in `localStorage` and are sent as `x-eduhelp-provider`, `x-eduhelp-key`, `x-eduhelp-model`, etc. headers on each request to `/api/analyze`. They override anything in `.env.local`, so you can ship one hosted instance with a default key and still let advanced users plug in their own.

---

## Pages

| Route          | What it does                                                                              |
| -------------- | ----------------------------------------------------------------------------------------- |
| `/`            | Landing page with feature overview                                                                 |
| `/analyze`     | Upload PDFs / DOCX / TXT / images, get a state-specific eligibility report + accommodations + completeness scan + ask-the-document chat + PDF export |
| `/goals`       | Paste IEP goals → AI scores them on the SMART rubric and suggests rewrites                |
| `/timeline`    | State-specific IDEA timeline calculator from consent → eligibility → IEP, with `.ics` export |
| `/templates`   | Letter generator + escalation kit (eval, 504, IEE, mediation, state complaint, OCR, due process) + 1-page child profile |
| `/resources`   | Curated state agencies & advocacy organizations + live-scraped DOE headlines              |
| `/glossary`    | Searchable plain-English glossary of every special-ed acronym families encounter           |
| `/settings`    | Configure AI provider, paste keys, pick model, choose English / Spanish output, see cost estimate |

---

## How the eligibility engine works

1. **Extract** — pulls text from PDF / DOCX / images (server-side OCR), then standardized scores (FSIQ, VCI, BASC T-scores, etc.), diagnoses, instruments, and child age.
2. **Score** — runs each state's IDEA categories through a rule set that combines keyword matches with score-based heuristics (e.g., low academic + average cognitive → SLD; FSIQ ≤ 75 with low adaptive → ID; ADOS/ADI-R mention → ASD; age 3–5 + established medical → CA EMD / FL ECDD / TX NCEC).
3. **Rank** — sorts findings by confidence (0–100) and assigns a likelihood band (`Likely`, `Possible`, `Unlikely`, `Insufficient data`).
4. **Match** — runs an evidence-based accommodation library against the conditions and scores, surfacing 8–18 specific classroom / testing accommodations to bring to the IEP / 504 meeting.
5. **Scan** — flags missing evaluation domains (cognitive, achievement, adaptive, social-emotional, language, FBA, hearing/vision screen, EL status, MTSS data, severe-discrepancy / PSW analysis).
6. **Narrate** — if an AI provider is configured, sends the structured findings + a 6,000-char document excerpt and asks the model to produce a parent-friendly summary, evidence bullets, and an action checklist (in English or Spanish). The AI never invents categories — it only narrates the rules engine output.

All findings include the underlying citation so families and advocates can verify them.

---

## Privacy

- Documents are streamed to the API route, parsed in memory, then discarded.
- Nothing is written to disk by default. The `/uploads/` and `/tmp/` paths in `.gitignore` exist as a safety net.
- If you enable an AI provider, the relevant excerpt is sent to that provider — review their data-handling policies before uploading PHI.

---

## What's new in v0.2.0

- **Six states** — added Texas, New York, Florida, and Illinois rule sets alongside CO / CA
- **DOCX uploads** via `mammoth`
- **Server-side OCR** for PNG / JPG / WEBP scans via `tesseract.js`
- **Document completeness scanner** — flags missing assessment domains
- **Accommodation library** — evidence-based matches per profile
- **IEP goal SMART review** — `/goals` page with AI-driven rubric scoring
- **Ask-the-document chat** — embedded in the analyze page, doc-grounded answers
- **Timeline calculator** — `/timeline` with `.ics` export per state
- **Glossary** — `/glossary` page + `<GlossaryTerm>` hover tooltips
- **Escalation kit** — IEE, mediation, state complaint, OCR complaint, due process letters
- **1-page child profile** generator
- **PDF / print export** of the eligibility report
- **PWA** — installable on mobile, app-shell offline support
- **Spanish output toggle** for AI narrative + chat
- **Cost estimator** in `/settings` (rough $ per analysis based on selected model)

## Roadmap

- Multi-document case file with timeline view & encrypted local storage
- Annotated source viewer (link findings → exact PDF page / sentence)
- Native installer via Tauri
- Local-only / WebGPU AI mode (no cloud round-trip)
- Full UI i18n (Spanish UI strings, not just AI output)
- More states (AZ, GA, OH, MA, WA, …)
- WCAG AAA accessibility audit
- Save / share secure report links

---

## Disclaimer

EduHelp is **not legal advice**. Final eligibility for an IEP or 504 plan is determined by the school's multidisciplinary team after a full evaluation. For disputes, consult an attorney or your state's protection-and-advocacy agency (Disability Law Colorado, Disability Rights California, Disability Rights Texas, Disability Rights New York, Disability Rights Florida, Equip for Equality (IL), …).

---

## License

MIT © 2026 — built for families.
