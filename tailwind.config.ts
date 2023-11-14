import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        screen: "calc(100vh - 4rem - 2rem)", // extracting heights for header and footer
      },
      fontFamily: {
        ubuntu: ["var(--font-ubuntu)"],
      },
    },
  },
  plugins: [],
};
export default config;
