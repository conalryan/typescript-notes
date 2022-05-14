const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = options => {
  return {
    entry: './src/main.js',
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
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.html$/,
          use: ["html-loader"]
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['angularjs-annotate'],
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './*.html' },
          { from: './src/assets', to: 'assets' }
        ]
      }),
      new ModuleFederationPlugin({
        // For remotes (please adjust)
        name: "angularjs",
        library: { type: "var", name: "angularjs" },
        filename: "remoteEntry.js",
        exposes: {
            './web-components': './src/app/app.js',
        },
        shared: []
      }),
    ],
    devServer: {
      port: 4204
    }
  }
}
