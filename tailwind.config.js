/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#f5f5f5',
        accent: '#dc2626',
        'accent-light': '#ef4444',
        muted: '#737373',
        border: '#262626',
        card: '#141414',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
