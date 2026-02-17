/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        active: "#4338CA",
        darkColor: "#0F172A",
        navbg: "#EEF2FF",
        darkblue: "#312E81",
        clientBg: "#F1F5F9",
        base: "#F8F9FB",
        surface: "#FFFFFF",
        elevated: "#EEF2FF",
        textPrimary: "#0F172A",
        textMuted: "#64748B",
        borderSubtle: "#E2E8F0",
        accent: "#4F46E5",
        accentHover: "#4338CA",
      },
      boxShadow: {
        box: "0 12px 30px rgba(15, 23, 42, 0.08)",
        soft: "0 18px 45px rgba(79, 70, 229, 0.10)",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      screens: {
        laptop: "1136px",
        tab: "900px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
