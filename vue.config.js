module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  pluginOptions: {
    i18n: {} // do not remove
  },
  chainWebpack: config => {
    // YAML Loader
    config.module
      .rule('yaml')
      .test(/\.yml$/)
      .use('json-loader')
      .loader('json-loader')
      .end()
      .use('yaml-loader')
      .loader('yaml-loader')
      .end()
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
