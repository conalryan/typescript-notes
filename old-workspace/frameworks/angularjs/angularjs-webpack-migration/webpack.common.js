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
  },
  // Warn: without resolve ERROR in ./src/app/app.ts 2:0-26 Module not found: Error: Can't resolve './menu'
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
};
