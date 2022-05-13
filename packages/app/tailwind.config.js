const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      gray: {
        0: colors.white,
        ...colors.gray,
        1000: colors.black,
      },
      red: colors.red,
      yellow: colors.yellow,
      green: colors.emerald,
      blue: colors.blue,
      skeleton: colors.gray[300],
    },
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
      auto: 'auto',
    },
    extend: {},
  },
  plugins: [],
}
