import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdaff",
          300: "#8dc1ff",
          400: "#579dff",
          500: "#2f7bff",
          600: "#1a5cf0",
          700: "#1748d1",
          800: "#173da6",
          900: "#173882",
          950: "#0f234f",
        },
        accent: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(to right, rgba(15,35,79,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,35,79,0.05) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(ellipse at top, rgba(47,123,255,0.15), transparent 60%), radial-gradient(ellipse at bottom right, rgba(16,185,129,0.12), transparent 60%)",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(15, 35, 79, 0.18)",
        ring: "0 0 0 4px rgba(47, 123, 255, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out both",
        "fade-up": "fadeUp 0.6s ease-out both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
