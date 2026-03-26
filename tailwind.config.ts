import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: 'tw-',
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
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
export default config;
