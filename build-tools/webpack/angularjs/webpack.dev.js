const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge"); // webpack-merge v5 (and later) use named export
var HtmlWebpackPlugin = require("html-webpack-plugin");

const main = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
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

const menu = merge(main, {
  name: "menu",
  entry: {
    menu: ["./src/menu/menu-header.css", "./src/menu/menu-header.js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
});

module.exports = [main, menu];