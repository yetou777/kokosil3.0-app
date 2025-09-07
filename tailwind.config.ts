import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
      },
      colors: {
        primary: "#31A52F",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
