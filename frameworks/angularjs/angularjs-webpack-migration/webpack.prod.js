const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge') // webpack-merge v5 (and later) use named export
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  entry: {
    appjs: "./src/app/app.ts"
  },
  output: {
    clean: true, // replaces CleanWebpackPlugin in Webpack 5
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
      // Add back default webpack javascript minifier
      new TerserPlugin(),
      // Minify html
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[hash].css" })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extract css into files
          "css-loader", // 2. Turns css into commonjs
          // "sass-loader" // 1. Turns sass into css
        ]
      }
    ]
  }
});
