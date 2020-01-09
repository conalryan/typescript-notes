# [Webpack Demo App](https://www.youtube.com/watch?v=3On5Z0gjf4U&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8)

github: https://github.com/Colt/webpack-demo-app

Setting "private": true, in package.json means it won't be published to npm

.gitignore
```
node_modules
dist
```

## [Learn Webpack Pt. 2: Installing and Running Webpack and Webpack-CLI](https://www.youtube.com/watch?v=5XrYSbUbS9o&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=2)
https://github.com/Colt/webpack-demo-app/commit/2400d188ea69f4a3bc6dd0f35e58f81dd8135e35

```bash
npm instal --save-dev webpack webpack-cli
# or
yarn add --dev webpack webpack-cli
```

Add script package.json
```json
"scripts": {
  "start": "webpack"
}
```
By default entry point is an `index.js` file inside `./src`
By default webpack builds into `./dist/main.js`

## [Learn Webpack Pt. 3: Imports, Exports, & Webpack Modules](https://www.youtube.com/watch?v=8QYt1_17nk8&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=3)
https://github.com/Colt/webpack-demo-app/commit/2b11dd3624422ac8f57fced592dd824230c83693

Tells webpack how to bundle in the correct order i.e. who depends on what
e.g. 
```javascript
export const myService = () => {};
// ... another file imports myService
import { myService } from './my-service.js';
```

## [Learn Webpack Pt. 4: Configuring Webpack](https://www.youtube.com/watch?v=ZwWiDZoPMB0&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=4)
https://github.com/Colt/webpack-demo-app/commit/d13f75ab6c6c90e1e7232c2b03fde96b0dd8e6a5

You can call config file whatever you want
Use `path` to tell webpack where to put bundle. `path` is provided by Node so there is no need to install it. 

Change package.json to use config
```json
"scripts": {
  "start": "webpack --config webpack.config.js"
}
```
 
 By default `mode` is production and will minify the code.
 Mode tells webpack if to run in prod or dev
 webpack.config.js
 ```javascript
const path = require('path');

module.exports = {
  mode: "development",
  entry: "src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
 ```

 Set `devtool: "none",` in webpack.config.js to remove `eval` and have more readable code
 ```javascript
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "none",
  entry: "src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
 ```

## [Learn Webpack Pt. 5: Loaders, CSS, & SASS](https://www.youtube.com/watch?v=rrMGUnBmjwQ&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=5)
https://github.com/Colt/webpack-demo-app/commit/65c2ac47091e301b3adc5b35a68c1870b16eafb7

### [Loaders](https://webpack.js.org/concepts/loaders/) 
Key to get Webpack to load files other than Javascript.

Need `style-loader`, `css-loader` and `sass-loader`
Note: `sass-loader` required `node-sass`
```bash
npm install --save-dev style-loader css-loader
# or
yarn add -D style-loader css-loader sass-loader node-sass
```
`css-loader` converts css to javascript
`style-loader` takes javascript output of css-loader (converted css-to-js) and loads it into DOM by adding `<style>` tags to the `<head>` element. Make sure css-loader runs first by placing it last in the list; because in Webpack rules run in reverse order.

To use loaders append `module` to `webpack.config.js`
 ```javascript
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "none",
  entry: "src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 3. Takes javascript and injects it into the DOM
          "css-loader",   // 2. Turns css into javascript
          "sass-loader"   // 1. Turns sass into css
        ]
      }
    ]
  }
};
```

Import the scss into your index.js so that Webpack knows about it.
```javascript
import "./main.scss";
```

## [Learn Webpack Pt. 6: Cache Busting and Plugins](https://www.youtube.com/watch?v=qXRGKiHmtF8&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=6)
https://github.com/Colt/webpack-demo-app/commit/c932911657e0a7beb9c03f604eaafa7e954d51ba

Prevent browsers from caching bundles. Otherwise, the user would never get any updated content.

If we can break the build up into smaller junks (e.g. vendor.js, vendor.scss, module1.scss) the browser will be able to cache the files that haven't changed. Bazel can build only the files that have changed. Therefore, our builds will be faster and load times will be faster by taking advantage of the browser.

What's the cut-off point? Meaning how many files become detrimental to performance vs. having browser cache a few files that won't change often.

Content hash is based of content within the file. Thus, as the content of the file changes, so does the hash.
The hash is added to the output file name.

When using a content hash you cannot include a script tag with a hard-coded path `<script src="./dist/main.js"></script>`. You need to have Webpack inject it with the correct hash.

 ```javascript
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "none",
  entry: "src/index.js",
  output: {
    filename: "main.[contentHash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 3. Takes javascript and injects it into the DOM
          "css-loader",   // 2. Turns css into javascript
          "sass-loader"   // 1. Turns sass into css
        ]
      }
    ]
  }
};
```

### Plugins

#### HtmlWebpackPlugin
Use when you add a dynamic content hash to the file name.
```bash
npm install --save-dev html-webpack-plugin
# or
yarn add -D html-webpack-plugin
```

Pass an (optional) object into the plugin with a template to use.

Require plugin in webpack.config
```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "none",
  entry: "src/index.js",
  output: {
    filename: "main.[contentHash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./scr/template.html"
  })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 3. Takes javascript and injects it into the DOM
          "css-loader",   // 2. Turns css into javascript
          "sass-loader"   // 1. Turns sass into css
        ]
      }
    ]
  }
};
```

## [Learn Webpack Pt. 7: Splitting Dev & Production](https://www.youtube.com/watch?v=VR5y93CNzeA&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=7)
https://github.com/Colt/webpack-demo-app/commit/eb66c0dc93141080f5b1abb335ec998a1e91d72e

Split webpack configs into:
- common, 
- development: include a dev server
- production: minify, export css into separate file

### webpack-merge
Use webpack-merge to combine development with common and combine production with common
```bash
npm install --save-dev webpack-merge
# or
yarn add -D webpack-merge
```

Require common in development and production and webpack merge.
module.exports = merge(common, {

});
```javascript
var common = require("./webpack.common");
var merge = require("webpack-merge");
const path = require('path');

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
});
```

Change package.json to point to correct config
e.g.
```json
"start": "webpack-dev-server --config webpack.dev.js --open",
"build": "webpack --config webpack.prod.js"
```

### dev-server
```bash
npm install --save-dev webpack-dev-server
# or
yarn add -D webpack-dev-server
```
 
You don't need to include the dev-server in any of the config files, but you will need to add it to package.json
```json
"start": "webpack-dev-server --config webpack.dev.js --open",
```

## [Learn Webpack Pt. 8: Html-loader, File-loader, & Clean-webpack](https://www.youtube.com/watch?v=mnS_1lolc44&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=8)
https://github.com/Colt/webpack-demo-app/commit/947290016d91f0cc2298faa86bedb1ee2180c276

To load images and keep paths correct in index.html and include cache busting strings

Move assets dir into src then have webpack copy the assets into the dist

### html-loader
Any time webpack sees an img tag it will require it `require(',/image.png');`

```bash
npm install --save-dev html-loader
# or
yarn add -D html-loader
```

Add to common webpack config
```javascript
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      }
    ]
  }
};
```

### file-loader
Need file-loader to load images
```bash
npm install --save-dev file-loader
# or
yarn add -D file-loader
```

Modify commont webpack config
```javascript
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
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
```

### clean-webpack-plugin
Cleans dist folder so old artifacts-<some-hash>.js don't hang around
```bash
npm install --save-dev clean-webpack-plugin
# or
yarn add -D clean-webpack-plugin
```

Add to prod webpack config
```javascript
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});
```

You only need it for production.

## [Learn Webpack Pt. 9: Multiple Entrypoints & Vendor.js](https://www.youtube.com/watch?v=PT0znBWIVnU&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=9)
https://github.com/Colt/webpack-demo-app/commit/34e7d30aefa510e7f10dc8b496b88eab8e4e9ce0

Add `vendor.js` to `src` and change "entry" to an object in  common webpack config
```javascript
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  }
};v
```

Update webpack production config since the file name will change ('main...' or 'vendor...')
```javascript
// ...
output: {
  filename: "[name].[contentHash].bundle.js",
  path: path.resolve(__dirname, "dist")
},
// ...
```

Update webpack development config with the file names ('main' and 'vendor')
```javascript
// ...
output: {
  filename: "[name].bundle.js",
  path: path.resolve(__dirname, "dist")
},
// ...
```

## [Learn Webpack Pt. 10: Extract CSS & Minify HTML/CSS/JS](https://www.youtube.com/watch?v=JlBDfj75T3Y&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=10)
https://github.com/Colt/webpack-demo-app/commit/991f703d058ece361b83180ada43dc5f61b40984

There's a flash of unstyled html when the page loads. This is because it takes time for the browser to parse the javascript, read the styles and inject them into the DOM as a `<style>` tag.

Ideally you want to separate your css from your javascript to improve performace.
 
It takes time to comples scss so during development you will want to load your styles in your javascript. However, for production you want to compile and separate scss from javascript.

### mini-css-extract-plugin
```bash
npm instal --save-dev mini-css-extract-plugin
# or 
yarn add -D mini-css-extract-plugin
```

webpack.prod.js
```javascript
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});
```

Remove `sytle-loader` from webpack.prod.js and replace with `MiniCssExtractPlugin.loader,`

### optimize-css-assets-webpack-plugin
```bash
npm install --save-dev optimize-css-assets-webpack-plugin
# or 
yarn add -D optimize-css-assets-webpack-plugin
```
 
 Only need to minify in production
 Modify webpack.prod.js
 ```javascript
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});
 ```

`OptimizeCssAssetsPlugin` will override the default minifier that was minifying the javascript.
Therefore when you add `OptimizeCssAssetsPlugin` you will need to "add back" the javascript minifier.
`new TerserPlugin(),`

You will need to require `const TerserPlugin = require("terser-webpack-plugin");` however you don't need to install it manually. It is installed along with webpack.

Add minify options to `HtmlWebpackPlugin`
 ```javascript
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      // Add back default webpack javascript minifier
      new TerserPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});
 ```