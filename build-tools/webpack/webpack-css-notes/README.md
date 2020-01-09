# webpack-css-notes
https://blog.angularindepth.com/this-is-how-angular-cli-webpack-delivers-your-css-styles-to-the-client-d4adf15c4975

https://github.com/maximusk/this-is-how-angular-cli-webpack-gets-your-CSS-styles-to-the-client

# @import in css
https://developer.mozilla.org/en-US/docs/Web/CSS/%40import
- The @import CSS at-rule is used to import style rules from other style sheets.
- These rules must precede all other types of rules, except @charset rules; as it is not a nested statement.
- @import cannot be used inside conditional group at-rules.

```css
@import url("fineprint.css") print;
@import url("bluish.css") projection, tv;
@import 'custom.css';
@import url("chrome://communicator/skin/");
@import "common.css" screen, projection;
@import url('landscape.css') screen and (orientation:landscape);
```

# Angular-CLI
- Angular-CLI uses webpack under the hood and only configures it.

# Install Webpack
```bash
npm i webpack --save-dev
```
- Angular-CLI loads these styles as a separate bundle to the client. So we will do the same.
- Webpack creates bundles based on the entry points.
- Add styles specific entry point to the webpack configuration.
```javascript
// webpack-config.js
const path = require('path');

module.exports = {
    entry: {
        styles: "./styles.css"
    }
};
```

# Webpack Config
Every file/module we want to be used in the bundle webpack expects to be a valid JavaScript module. And certainly styles.css is not a valid JavaScript module. So we need something to turn this CSS module into JS module. And this is where loaders come in. Here is what webpack docs say about loaders:

Loaders are transformations that are applied on the source code of a module. They allow you to pre-process files as you import or “load” them… Loaders can transform files from a different language (like TypeScript) to JavaScript, or inline images as data URLs.

# CSS Loader
- Most loaders and plugins come as separate packages so let’s install it:
```bash
npm install --save-dev css-loader
```

# Style Loader
- CSS loader will generate js bundles but will not use them anywhere.
- To use them we need to include a style-loader.
Again, this one comes a separate package and need to be installed:
```bash
npm install style-loader --save-dev
```
- The css-loader will generated a JS module that exports styles and style-loader will use them to add to the <style> tag in the html.

# HTML Webpack Plugin
- Automate inserting js bundles into index.html
…simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.
````bash
npm install save-dev html-webpack-plugin
````
