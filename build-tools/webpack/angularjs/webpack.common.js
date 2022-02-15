const path = require("path");

module.exports = {
  /**
   * By default entry point is an `index.js` file inside `./src`
   * By default webpack builds into `./dist/main.js`
   */
  entry: {
    main: "./src/app.js",
    // vendor: "./src/vendor.js"
  },
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
