import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        food_red: "#f9572a",
        food_yellow: "#ff9b05",
        h1Text: "#e9e6e3",
        pText: "#ddd4c6",
      },
      fontFamily: {
        bodyFont: ["Montserrat", "sans-serif"],
        htmlFont: ["Quicksand", "sans-serif"],
        handFont: ["Short stack"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss-animate"),
    function ({ addUtilities }: any) {
      addUtilities({
        ".text-shadow": {
          "text-shadow": "0 0 18px rgba(248, 190, 42, 0.8)",
        },
      });
    },
  ],
} satisfies Config;

export default config;
