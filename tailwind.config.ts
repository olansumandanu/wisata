import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        desktop: "url('/images/bg-desktop.png')",
        mobile: "url('/images/bg-mobile.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
