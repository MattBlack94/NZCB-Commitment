import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": "#3c886c",
        "dark-navy": "#1d4354",
        "bright-green": "#6fda44",
        "light-gray": "#f3f3f3",
        "dark-gray": "#373737",
        "medium-gray": "#3f3f3f",
      },
      fontFamily: {
        nunito: ["'Nunito'", "sans-serif"],
      },
      boxShadow: {
        "wgbc": "6px 6px 9px rgba(0,0,0,0.2)",
      },
      borderRadius: {
        none: "0",
      },
    },
  },
  plugins: [],
};

export default config;
