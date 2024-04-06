import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        desktop: "url('/images/bg-desktop.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
