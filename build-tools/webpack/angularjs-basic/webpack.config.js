const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // | "production"
  entry: {
    appjs: "./src/app/app.js",
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
        // Any time webpack sees an img tag it will require it `require(',/image.png');`
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // 2. Inject styles into DOM
          "css-loader", // 1. Turns css into commonjs
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          // Need file-loader to load images
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  }
};
