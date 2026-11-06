import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tetris-i': '#00f0f0',
        'tetris-j': '#0000f0',
        'tetris-l': '#f0a000',
        'tetris-o': '#f0f000',
        'tetris-s': '#00f000',
        'tetris-t': '#a000f0',
        'tetris-z': '#f00000',
        'tetris-garbage': '#a0a0a0',
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#FFF7ED",
              100: "#FFEDD5",
              200: "#FED7AA",
              300: "#FDBA74",
              400: "#FB923C",
              500: "#F97316",
              600: "#C2410C",
              700: "#9A3412",
              800: "#7C2D12",
              900: "#431407",
              DEFAULT: "#C2410C",
              foreground: "#FFFFFF",
            },
            secondary: {
              50: "#FFF1F2",
              100: "#FFE4E6",
              200: "#FECDD3",
              300: "#FDA4AF",
              400: "#FB7185",
              500: "#F43F5E",
              600: "#BE123C",
              700: "#9F1239",
              800: "#881337",
              900: "#4C0519",
              DEFAULT: "#BE123C",
              foreground: "#FFFFFF",
            },
            focus: "#C2410C",
          },
        },
      },
    }),
  ],
};
export default config;
