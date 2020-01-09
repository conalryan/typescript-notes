const path = require('path');

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
    filename: "[name].js" // [name] returns the file name of the source e.g. styles.css -> styles.js
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
          'css-loader'
        ]
      }
    ]
  }
};

