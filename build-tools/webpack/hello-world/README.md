Hello World
================================================================================

Quick Guide
--------------------------------------------------------------------------------
```bash
yarn install
webpack --mode development
npx webpack
yarn build:dev
```

Default webpack directory structure
`
src
  index.html
  index.js
webpack.config.js
`

```bash
yarn init
# follow the prompts
```

Install webpack and webpack-cli
```bash
yarn add -D webpack webpack-cli
```

As of webpack 4.0 you don't even need a configuration file

Run webpack
```bash
npx webpack
# or
node_modules/webpack/bin/webpack.js
```

Default output `dist/main.js`

Add main.js to index.html via script tag
```index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <header>
        <span>span inside header</span>
    </header>
    <span>span outside header</span>
    <script type="text/javascript" src="../dist/main.js"></script>
</body>
</html>
```

[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
--------------------------------------------------------------------------------
Install
```bash
yarn add -D html-webpack-plugin
```

Cofigure webpack.config.js
```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  plugins: [new HtmlWebpackPlugin()]
};
```

Build
```bash
yarn build:dev
```

There will now be an `index.html` file created with a `link` tag to `main.js` in the `dist` dir


