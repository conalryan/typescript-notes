const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  
  /**
   * Angular-CLI loads these styles as a separate bundle to the client. So we will do the same.
   * - Webpack creates bundles based on the entry points.
   * - Add styles specific entry point to the webpack configuration.
   */
  entry: {
    styles: "./styles.css"
  },
  /**
   * Specify where the output should go.
   */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  /**
   * Every file/module we want to be used in the bundle webpack expects to be a valid JavaScript module.
   * And certainly styles.css is not a valid JavaScript module.
   * So we need something to turn this CSS module into JS module.
   * And this is where loaders come in.
   */
  module: {
    rules: [
      {
        /**
         * test property:
         * - Webpack applies that regexp to each request/file and if there’s a match the loaders from the use array are
         *   applied to the contents of the file.
         */
        test: /\.css$/, // matches all files that end with .css
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      /**
       * By default this plugin generates its own index.html file.
       * Use template option to specify the path to an existing index.html:
       */
      template: "./index.html"
    })
  ]
};

