# webpack-css-notes
https://blog.angularindepth.com/this-is-how-angular-cli-webpack-delivers-your-css-styles-to-the-client-d4adf15c4975

https://github.com/maximusk/this-is-how-angular-cli-webpack-gets-your-CSS-styles-to-the-client

# @import in css
https://developer.mozilla.org/en-US/docs/Web/CSS/%40import
- The @import CSS at-rule is used to import style rules from other style sheets.
- These rules must precede all other types of rules, except @charset rules; as it is not a nested statement.
- @import cannot be used inside conditional group at-rules.

```css
@import url;
@import url list-of-media-queries;
```

# Angular-CLI
- Angular-CLI uses webpack under the hood and only configures it.

Setup
--------------------------------------------------------------------------------
index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <header>
        <span>span inside header</span>
    </header>
    <span>span outside of header</span>
</body>
</html>
```

styles.css
```css
@import "app/header.css";

span {
    color: green;
}
```

app/header.css
```css
header span {
    color: blue;
}
```

package.json
```json
{
  "name": "style-loader-css-loader",
  "version": "0.0.1",
}
```

http-server to serve html locally
```bash
yarn add -D http-server
# or globally
yarn global add http-server
```

Test server
```bash
./node_modules/http-server/bin/http-server
# or if installed globally
http-server
```


# Install Webpack
```bash
yarn add -D webpack
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


Webpack Config
--------------------------------------------------------------------------------
- Requires valid JavaScript modules as file/module inputs
- CSS is not a valid JavaScript module. Therefore, we must transform CSS module to a JS module.
- Loaders:
    - Transformations that are applied on the source code of a module.
    - They allow you to pre-process files as you import or “load” them.
    - Loaders can transform files from a different language (like TypeScript) to JavaScript, or inline images as data URLs.


CSS Loader
--------------------------------------------------------------------------------
- Most loaders and plugins come as separate packages so let’s install it:
```bash
yarn add -D css-loader
```


Style Loader
--------------------------------------------------------------------------------
- CSS loader will generate js bundles but will not use them anywhere.
- To use them we need to include a style-loader.
Again, this one comes a separate package and need to be installed:
```bash
yarn add -D style-loader
```
- The css-loader will generated a JS module that exports styles and style-loader will use them to add to the `<style>` tag in the html.


HTML Webpack Plugin
--------------------------------------------------------------------------------
- Automate inserting js bundles into index.html
- This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.
You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.
```bash
yarn add -D html-webpack-plugin
```
