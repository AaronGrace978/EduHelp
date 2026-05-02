/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** Emits `.next/standalone` — one folder you can zip and run with `node server.js`. */
  output: "standalone",
  experimental: {
    /**
     * Keep heavy text-extraction libs out of the bundler so Next doesn't try
     * to inline their fixtures, WASM, or worker files.
     *
     *  - pdf-parse:   ships with sample PDFs the bundler tries to read at build time
     *  - mammoth:     uses sax/xmldom internals
     *  - tesseract.js: pulls in WASM + workers; must run via require at runtime
     */
    serverComponentsExternalPackages: ["pdf-parse", "mammoth", "tesseract.js"],
  },
};

export default nextConfig;
