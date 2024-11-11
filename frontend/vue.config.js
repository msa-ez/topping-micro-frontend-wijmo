module.exports = {
  configureWebpack: {
    output: {
      libraryTarget: "system",
      filename: "js/app.js",
    },
  },
  
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    disableHostCheck: true
  }
}
