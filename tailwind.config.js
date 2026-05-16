// Segunda Vida · Tailwind config
// Los tokens vienen de constants/theme.ts (fuente de verdad única).
// jiti (incluido por NativeWind) resuelve el .ts directamente.

const { colors, fontFamily, fontSize, borderRadius, boxShadow } = require('./constants/theme.ts')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      fontFamily,
      fontSize,
      borderRadius,
      boxShadow,
    },
  },
  plugins: [],
}
