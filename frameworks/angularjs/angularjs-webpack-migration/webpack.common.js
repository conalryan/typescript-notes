const path = require("path");

module.exports = {
  entry: {
    main: "./src/main.ts",
  },
  module: {
    rules: [
      {
        // Any time webpack sees an img tag it will require it `require(',/image.png');`
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['env']
      //     }
      //   }
      // },
      // Load js files through Babel
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['angularjs-annotate'],
        },
      },
    ]
  }
};
