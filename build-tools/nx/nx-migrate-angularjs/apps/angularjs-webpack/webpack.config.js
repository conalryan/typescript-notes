const path = require('path');

module.exports = (config, context) => {
  return {
    ...config,
    module: {
      ...config.module,
      strictExportPresence: true,
      rules: [
        config.module.rules[0],
        {
          test: /\.html$/i,
          use: 'raw-loader',
        },
        {
          test: /\.css$/,
          use: [
            "style-loader", // 2. Inject styles into DOM
            "css-loader", // 1. Turns css into commonjs
          ]
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
      ],
    },
  };
};
