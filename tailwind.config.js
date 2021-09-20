module.exports = {
  purge: {
    mode: 'all',
    content: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.jsx', './public/index.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
