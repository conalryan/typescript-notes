const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appjs = {
  entry: {
    appjs: "./src/app.js"
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
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          // Need file-loader to load images
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // 3. Inject styles into DOM
          "css-loader", // 2. Turns css into commonjs
          // "sass-loader" // 1. Turns sass into css
        ]
      }
    ]
  }
};

// const standalone = {
//   entry: {
//     standalone: "./src/standalone.js"
//   },
//   module: {
//     rules: [
//       {
//         // Any time webpack sees an img tag it will require it `require(',/image.png');`
//         test: /\.html$/,
//         use: ["html-loader"],
//       },
//       {
//         test: /\.(svg|png|jpg|gif)$/,
//         use: {
//           // Need file-loader to load images
//           loader: "file-loader",
//           options: {
//             name: "[name].[hash].[ext]",
//             outputPath: "imgs",
//           },
//         },
//       },
//     ],
//   }
// };

// module.exports = [main, standalone];
module.exports = appjs;
