const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common.js");
module.exports = merge(baseConfig, {
  mode: "development", //开发环境
  devtool: "inline-source-map", //可以查看代码报错的位置
  //webpack-dev-server配置
  devServer: {
    // 端口号
    port: 1234,
    // 是否自动打开浏览器
    open: true,
  },
});
