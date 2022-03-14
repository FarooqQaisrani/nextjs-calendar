module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#75969f', dark: '#2b4650' },
        textDark: '#000',
        textLight: '#222',
      },
    },
  },
  plugins: [],
}
