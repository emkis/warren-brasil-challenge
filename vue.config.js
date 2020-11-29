module.exports = {
  pages: {
    index: {
      entry: './src/main.js',
      title: process.env.VUE_APP_TITLE || 'Warren Brasil Challenge',
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/constants.scss";`,
      },
    },
  },
}
