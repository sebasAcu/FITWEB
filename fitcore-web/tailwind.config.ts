import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#B7FF3C",
        dark: "#050505",
        "dark-2": "#121212",
        "dark-3": "#1A1A1A",
        "dark-4": "#222222",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out infinite 2s",
        "float-delay2": "float 6s ease-in-out infinite 4s",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "counter-spin": "spin 1s linear infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px #B7FF3C44" },
          "50%": { boxShadow: "0 0 60px #B7FF3C88, 0 0 100px #B7FF3C44" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "neon-gradient": "linear-gradient(135deg, #B7FF3C 0%, #7DD100 100%)",
        "dark-gradient": "linear-gradient(180deg, #050505 0%, #121212 100%)",
        "hero-gradient": "radial-gradient(ellipse at 50% 50%, #1a2e00 0%, #050505 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(183,255,60,0.05) 0%, rgba(183,255,60,0) 100%)",
      },
      boxShadow: {
        neon: "0 0 30px rgba(183,255,60,0.3)",
        "neon-lg": "0 0 60px rgba(183,255,60,0.4)",
        glass: "0 8px 32px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
