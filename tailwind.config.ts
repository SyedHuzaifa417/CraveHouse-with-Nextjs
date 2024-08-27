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
        food_red: "#f9572a",
        food_yellow: "#ff9b05",
        h1Text: "#e9e6e3",
        pText: "#ddd4c6",
      },
      fontFamily: {
        bodyFont: ["Montserrat", "sans-serif"],
        htmlFont: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".text-shadow": {
          "text-shadow": "0 0 18px rgba(248, 190, 42, 0.8)",
        },
      });
    },
  ],
};
export default config;
