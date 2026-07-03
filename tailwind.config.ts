import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Identité de marque AnyxTech
        brand: {
          DEFAULT: "#1f429b",
          blue: "#1f429b",
          light: "#1db9ff",
          dark: "#1e4d9f",
          cyan: "#22d3ee",
          50: "#eef4ff",
          100: "#dae6ff",
          200: "#bcd2ff",
          300: "#8eb4ff",
          400: "#598bff",
          500: "#3563f6",
          600: "#1f429b",
          700: "#1b3a86",
          800: "#1c336d",
          900: "#1c2f5b",
          950: "#131d3a",
        },
        // Fonds sombres "ink" pour le nouveau design
        ink: {
          DEFAULT: "#070b18",
          900: "#070b18",
          800: "#0b1120",
          700: "#0f172a",
          600: "#131c33",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(29, 185, 255, 0.35)",
        "glow-lg": "0 0 60px rgba(29, 185, 255, 0.45)",
        brand: "0 20px 45px -15px rgba(31, 66, 155, 0.55)",
        card: "0 10px 40px -12px rgba(2, 8, 23, 0.25)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1f429b 0%, #1db9ff 100%)",
        "brand-radial": "radial-gradient(circle at 30% 20%, rgba(29,185,255,0.25), transparent 55%)",
        "grid-dark":
          "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-22px)" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(29,185,255,0.3)" },
          "50%": { boxShadow: "0 0 45px rgba(29,185,255,0.6)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-in-out",
        "slide-up": "slide-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
        aurora: "aurora 15s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
