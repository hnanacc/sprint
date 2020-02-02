const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    plugins: [
      new MonacoEditorPlugin({
        languages: ['c', 'cpp', 'java', 'python'],
        features: ['!gotoSymbol']
      })
    ]

  },
  
  pluginOptions: {
    electronBuilder: {
      externals:['node-pty'],
      nodeModulesPath: ['../../node_modules', "./node_modules"],
      builderOptions: {
        publish: ['github']
      }
    }
  }
}