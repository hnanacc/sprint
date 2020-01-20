const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    plugins: [
      new MonacoEditorPlugin({
        languages: ['cpp', 'java', 'python']
      })
    ]

  },
  
  pluginOptions: {
    electronBuilder: {
      externals:['node-pty'],
      nodeModulesPath: ['../../node_modules', "./node_modules"]
    }
  }
}