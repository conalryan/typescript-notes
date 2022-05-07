const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge"); // webpack-merge v5 (and later) use named export
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  entry: {
    appjs: "./src/app.js",
  },
  output: {
    clean: true,
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", // 3. Inject styles into DOM
          "css-loader", // 2. Turns css into commonjs
          // "sass-loader" // 1. Turns sass into css
        ],
      },
    ],
  },
});
