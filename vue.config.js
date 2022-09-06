const { defineConfig } = require('@vue/cli-service')
// path.join的结构 下边直接用join
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
const views = resolve(__dirname, 'src/views')
module.exports = defineConfig({
  transpileDependencies: true,
  // 设置是否在开发环境下每次保存代码时都启用 eslint插件验证。
  // lintOnSave: false,
  // 这个就是默认的webpack.config.js的配置
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: 'localhost'
    },
    // 路径别名
    resolve: {
      alias: {
        cpns,
        views
      }
    }
  }
})
