module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'precss': {},
    'postcss-pxtorem': {
      propList: ['*']
    }
  },
  sourcemap: true
};