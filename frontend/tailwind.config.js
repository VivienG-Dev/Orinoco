module.exports = {
  purge: [
    '*.html',
    '*.js',
    'js/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#f3e9f1',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    }
  },
  plugins: [],
}
