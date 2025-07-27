/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#1FF2BF', // The vibrant green/cyan for buttons
        'accent-focus': '#1BE0B0',
        'neutral': '#111827',      // A darker gray for text (Gray-900)
        'gradient-start': '#E0FFFA',
        'gradient-end': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // We can define the gradient directly as a background image utility
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}