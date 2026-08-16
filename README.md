# Aaron Grace, M.Ed.

> The ultimate college toolkit — **Tauri 2** desktop app for PowerFAIDS, disability support, Amazon textbook orders, Rate My Professor, every college worldwide, and full activity histories.

Built by **Aaron Grace, M.Ed.**

---

## What you get

| Module | What it does |
| ------ | ------------ |
| **Colleges** | Search **10,000+** institutions across **200** countries and lock your active campus |
| **PowerFAIDS** | Save your school aid portal URL, track award lines, and run an aid-year checklist |
| **Disability Support** | College ADA / Section 504 accommodation packs + DSS letter drafts with request history |
| **Amazon Books** | Search by title / author / ISBN / course, open Amazon, keep wishlist & order history |
| **Rate My Professor** | Campus-aware professor search, open RMP, save personal ratings & notes |
| **Histories** | One timeline across college picks, aid, DSS, books, and professors |

Selecting a college personalizes the rest of the app.

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

Artifacts land under `src-tauri/target/release/bundle/`.

---

## Privacy

- College selection, awards, books, professor notes, DSS drafts, and history are stored **locally** in the app webview (`localStorage`).
- External links (PowerFAIDS portals, Amazon, Rate My Professor, college sites) open in your system browser via Tauri’s opener plugin.
- No cloud account is required.

---

## License

Private / educational use unless otherwise stated by the repository owner.
