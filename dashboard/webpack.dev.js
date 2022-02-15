const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const port = 3001;

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    host: "localhost",
    compress: true,
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
});
