const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = options => {
  return {
    entry: './index.js',
    output: {
      filename: 'bundle.js',
      publicPath: "auto",
      uniqueName: "angularjs"
    },
    optimization: {
      moduleIds: 'named',
      chunkIds: 'named'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['angularjs-annotate'],
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        // For remotes (please adjust)
        name: "angularjs_basic", // must use underscores, hyphen throws error
        library: { type: "var", name: "angularjs_basic" },
        filename: "remoteEntry.js",
        exposes: {
          './web-components': './app.js',
        },
        shared: []
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './*.html' }
        ]
      })
    ],
    devServer: {
      port: 4204
    }
  }
}

