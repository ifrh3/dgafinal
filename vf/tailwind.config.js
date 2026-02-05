/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006C35', // DGA Green
        secondary: '#C69C6D', // Gold
        hover: '#000000',   // Black for Hover
        bg: '#F9FAFB',
        border: '#E5E7EB',
        text: '#111827',
        grayText: '#6B7280',
        success: '#006C35', // Excellent
        warning: '#F59E0B', // Medium/Average
        danger: '#EF4444'   // Poor/Weak
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
