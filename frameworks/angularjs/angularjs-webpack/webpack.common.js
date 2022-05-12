const path = require("path");

module.exports = {
  entry: {
    main: "./src/main.js",
  },
  module: {
    rules: [
      {
        // Any time webpack sees an img tag it will require it `require(',/image.png');`
        test: /\.html$/,
        use: ["html-loader"]
      },
    ]
  }
};
