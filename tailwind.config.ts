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
        trustBlue: '#2B4592',
        vibrantGold: '#FFD740',
        skyTint: '#F0F9FF',
        creativeRed: '#E53935',
        artisticGreen: '#4CAF50',
        deepPurple: '#7B1FA2',
        cyanBlue: '#00BCD4',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
