/**
 * After `next build` with `output: "standalone"`, Next puts a minimal server in
 * `.next/standalone` but does not copy `.next/static` or `public/`.
 * This script finishes the bundle so `node server.js` serves CSS/JS correctly.
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standalone = path.join(root, ".next", "standalone");
const staticSrc = path.join(root, ".next", "static");
const staticDest = path.join(standalone, ".next", "static");
const publicSrc = path.join(root, "public");
const publicDest = path.join(standalone, "public");
const envExample = path.join(root, ".env.example");
const runTxt = path.join(standalone, "HOW-TO-RUN.txt");

if (!fs.existsSync(standalone)) {
  console.error(
    "Missing .next/standalone. Run: npm run build  (standalone output must be enabled in next.config.mjs)",
  );
  process.exit(1);
}
if (!fs.existsSync(staticSrc)) {
  console.error(".next/static not found — build may have failed.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(staticDest), { recursive: true });
fs.cpSync(staticSrc, staticDest, { recursive: true });
if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
}
if (fs.existsSync(envExample)) {
  fs.copyFileSync(envExample, path.join(standalone, ".env.example"));
}

const ver = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"))
  .version;
fs.writeFileSync(
  runTxt,
  `EduHelp ${ver} — standalone bundle
================================

You need Node.js 20 or newer: https://nodejs.org

1. (Optional) Rename .env.example to .env.local and add AI keys — or skip;
   the app works without AI. You can also paste keys in the browser at /settings.

2. Open a terminal in THIS folder (where server.js lives).

3. Run:
     node server.js

4. Open http://localhost:3000 in your browser.

To use another port:
     set PORT=3001 && node server.js   (Windows CMD)
     $env:PORT=3001; node server.js    (PowerShell)

Stop the server with Ctrl+C.
`,
  "utf8",
);

console.log("Standalone bundle is ready:");
console.log("  ", standalone);
console.log("Run from that folder: node server.js");
