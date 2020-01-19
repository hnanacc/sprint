module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      externals:['node-pty'],
      nodeModulesPath: ['../../node_modules', "./node_modules"]
    }
  }
}