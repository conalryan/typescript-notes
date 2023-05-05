# webpack-css-notes

Quick Guide
--------------------------------------------------------------------------------
```bash
npm install
npm build
npm start
```

References
--------------------------------------------------------------------------------

https://blog.angularindepth.com/this-is-how-angular-cli-webpack-delivers-your-css-styles-to-the-client-d4adf15c4975

https://github.com/maximusk/this-is-how-angular-cli-webpack-gets-your-CSS-styles-to-the-client

https://medium.com/a-beginners-guide-for-webpack-2/webpack-loaders-css-and-sass-2cc0079b5b3a

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
- Angular-CLI loads these styles as a separate bundle to the client. So we will do the same.
- Webpack creates bundles based on the entry points.
- Add styles specific entry point to the webpack configuration.

[Style Loader](https://github.com/webpack-contrib/style-loader)
--------------------------------------------------------------------------------
- CSS loader will generate js bundles but will not use them anywhere.
- To use them we need to include a style-loader.
Again, this one comes a separate package and need to be installed:
- The css-loader will generated a JS module that exports styles and style-loader will use them to add to the `<style>` tag in the html.

HTML Webpack Plugin
--------------------------------------------------------------------------------
- Automate inserting js bundles into index.html
- This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.
You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.
