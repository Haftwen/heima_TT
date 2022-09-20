// 引入插件所有的postcss都是函数
const pxToRem = require('postcss-pxtorem')

module.exports = {
  // 插件配置
  plugins: [
    pxToRem({
      //根节点字体大小 10分之一的视口
      // 如果是vant返回根节点大小37.5如果不是那就75 之所以这么设置是因为不调2倍图的情况下可以这样
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      // 所有的属性 都转成rem 宽高 padding... *全部
      propList: ['*'],
      exclude: 'github-markdown'
    })
  ]
}
