import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syncopate: ["Syncopate", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      colors: {
        bg: "#050505",
        surface: "#0e0e0e",
        "surface-2": "#161616",
        border: "#1c1c1c",
        "border-bright": "#2a2a2a",
        ice: "#06b6d4",
        "ice-dim": "#0891b2",
        silver: "#e5e7eb",
        "silver-dim": "#9ca3af",
        "silver-muted": "#4b5563",
      },
      animation: {
        "scan": "scan 3s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glitch": "glitch 0.3s steps(2) infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glitch: {
          "0%": { clipPath: "inset(40% 0 61% 0)" },
          "20%": { clipPath: "inset(92% 0 1% 0)" },
          "40%": { clipPath: "inset(43% 0 1% 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)" },
          "80%": { clipPath: "inset(54% 0 7% 0)" },
          "100%": { clipPath: "inset(58% 0 43% 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
