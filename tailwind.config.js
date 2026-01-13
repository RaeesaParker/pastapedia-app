/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#FFF8F0',
          primary: '#8B9556',
          secondary: '#D4845C',
          accent: '#F4D19B',
          text: '#2C2416',
          textSecondary: '#6B5D4F',
          card: '#FFFFFF',
          border: '#E8DDD0',
        },
        dark: {
          background: '#1A1410',
          primary: '#A8B46E',
          secondary: '#E09670',
          accent: '#F4D19B',
          text: '#F5F1EB',
          textSecondary: '#B8AFA3',
          card: '#2C2416',
          border: '#3D3529',
        },
        difficulty: {
          beginner: '#4CAF50',
          intermediate: '#FF9800',
          advanced: '#F44336',
        }
      },
    },
  },
  plugins: [],
}
