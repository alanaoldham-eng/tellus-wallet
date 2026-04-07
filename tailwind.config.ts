import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}", "./hooks/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        tellus: {
          bg: "#08111f",
          surface: "#10192b",
          border: "#273247",
          muted: "#9aa7bd"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
