/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#071018",
          900: "#0c1824",
          800: "#132536",
          700: "#1d364c",
          600: "#2a4a63",
          500: "#3d647f",
          400: "#6b8aa0",
          300: "#9bb0bf",
          200: "#c7d4de",
          100: "#e6edf2",
          50: "#f4f7fa",
        },
        pine: {
          900: "#0a2f2c",
          800: "#0f433f",
          700: "#145750",
          600: "#1a6b62",
          500: "#22857a",
          400: "#3aa597",
          300: "#6fc2b6",
          200: "#a8ddd5",
          100: "#d5efeB",
          50: "#eef8f6",
        },
        brass: {
          700: "#8a6d2f",
          600: "#a8873a",
          500: "#c4a35a",
          400: "#d4b978",
          300: "#e4cfa0",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Outfit"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        lift: "0 18px 50px -28px rgba(7, 16, 24, 0.45)",
      },
      backgroundImage: {
        atmosphere:
          "radial-gradient(1200px 600px at 12% -10%, rgba(58, 165, 151, 0.22), transparent 55%), radial-gradient(900px 500px at 92% 8%, rgba(196, 163, 90, 0.16), transparent 45%), linear-gradient(165deg, #f4f7fa 0%, #e8f2f0 42%, #eef3f7 100%)",
        "hero-mesh":
          "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(20, 87, 80, 0.55), transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(196, 163, 90, 0.18), transparent 60%), linear-gradient(145deg, #0a2f2c 0%, #0c1824 55%, #132536 100%)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        rise: "rise 0.7s ease-out both",
        shimmer: "shimmer 8s ease infinite",
      },
    },
  },
  plugins: [],
};
