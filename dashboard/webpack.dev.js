const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const port = 9000;

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    host: "0.0.0.0",
    compress: true,
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
});
