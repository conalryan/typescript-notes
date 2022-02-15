const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        // Any time webpack sees an img tag it will require it `require(',/image.png');`
        test: /\.html$/,
        use: ["html-loader"]
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
