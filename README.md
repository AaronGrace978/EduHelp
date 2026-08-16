# Aaron Grace, M.Ed.

> The go-to **education administration** toolkit — **Tauri 2** desktop app for campus hierarchy, admin workload, a generic Banner / PowerFAIDS / Oracle / SQL harness, professor mirrors with AI + TA coverage, disability support, textbooks, Rate My Professor, every college worldwide, and full activity histories.

Built by **Aaron Grace, M.Ed.**

---

## What you get

| Module | What it does |
| ------ | ------------ |
| **Org Hierarchy** | Board → President → Provost / VPs → Deans → Directors — reporting lines for the whole campus |
| **Workload** | Administrative work queues (accreditation, enrollment, compliance, budget) assigned to hierarchy roles |
| **System Harness** | Plug into Ellucian Banner, PowerFAIDS, Oracle, SQL Server, PeopleSoft, Colleague, Workday, custom APIs |
| **Professor Mirror** | Mirror each section; AI stand-in when faculty are unavailable; TAs, graders, SI leaders, tutors |
| **Colleges** | Search **10,000+** institutions across **200** countries and lock your active campus |
| **Ellucian Banner** | Save/open Banner Self-Service, track terms & holds, run a registration checklist |
| **PowerFAIDS** | Save your school aid portal URL, track award lines, and run an aid-year checklist |
| **Disability Support** | College ADA / Section 504 accommodation packs + DSS letter drafts with request history |
| **Amazon Books** | Search by title / author / ISBN / course, open Amazon, keep wishlist & order history |
| **Rate My Professor** | Campus-aware professor search, open RMP, save personal ratings & notes |
| **Histories** | One timeline across hierarchy, harness, mirrors, Banner, aid, DSS, books, and professors |

Selecting a college personalizes the rest of the app. Built for the **whole education ecosystem** — not students only.

---

## Downloads (Mac / Linux / Windows / Steam Deck)

See **[DOWNLOADS.md](DOWNLOADS.md)** for the per-platform installer table and Steam Deck Konsole steps.

Steam Deck (Desktop Mode → Konsole):

```bash
bash scripts/steam-deck-konsole.sh
```

---

## Stack

- [Tauri 2](https://tauri.app) (Rust shell + system webview)
- [React 19](https://react.dev) + [Vite](https://vite.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) + [Framer Motion](https://www.framer.com/motion/)
- World university directory sourced from the [Hipo university-domains-list](https://github.com/Hipo/university-domains-list)

---

## Develop

### Prerequisites

- Node.js 20+
- Rust (stable) — [rustup](https://rustup.rs)
- OS webview deps for Tauri: see [Tauri prerequisites](https://tauri.app/start/prerequisites/)

### Run

```bash
npm install
npm run tauri dev
```

Frontend-only (browser) for UI work:

```bash
npm run dev
```

Open [http://localhost:1420](http://localhost:1420).

### Build

```bash
npm run tauri build
```

Artifacts land under `src-tauri/target/release/bundle/` (platform-specific `.dmg` / `.msi` / `.AppImage` / `.deb`).

### Multi-platform GitHub Release (Mac / Linux / Windows)

This repo includes [`.github/workflows/release.yml`](.github/workflows/release.yml), which builds:

| Platform | Artifacts |
| -------- | --------- |
| macOS Apple Silicon | `.dmg` / app bundle |
| macOS Intel | `.dmg` / app bundle |
| Linux x64 | `.AppImage` / `.deb` |
| Windows x64 | `.msi` / `.exe` |

**Publish a draft release**

1. Merge to `main`.
2. In GitHub → **Settings → Actions → General → Workflow permissions**, enable **Read and write permissions**.
3. Either:
   - push a version tag: `git tag v1.1.0 && git push origin v1.1.0`, or
   - push/merge to a `release` branch, or
   - run **Actions → release → Run workflow**.
4. Open the draft release on the Releases page, review assets, and publish.

Version is read from `src-tauri/tauri.conf.json` / `package.json` (`1.1.0`).

---

## Privacy

- College selection, awards, books, professor notes, DSS drafts, and history are stored **locally** in the app webview (`localStorage`).
- External links (PowerFAIDS portals, Amazon, Rate My Professor, college sites) open in your system browser via Tauri’s opener plugin.
- No cloud account is required.

---

## License

Private / educational use unless otherwise stated by the repository owner.
