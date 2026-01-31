/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#60A5FA',
        },
        secondary: '#DBEAFE',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: {
          main: '#0F172A',
          muted: '#64748B',
        },
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
}