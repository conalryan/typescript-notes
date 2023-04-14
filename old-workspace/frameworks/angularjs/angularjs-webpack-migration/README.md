webpack-angularjs
================================================================================

Install
```bash
npm install
```

Build
```bash
npm run build
```

Run
```bash
npm run start
```

# AngularJS Migration Guide

https://angular.io/guide/upgrade

1. Migrate to Typescript

## [Bootstrappying hybrid applications](https://angular.io/guide/upgrade#bootstrapping-hybrid-applications)

To bootstrap a hybrid application, you must bootstrap each of the Angular and AngularJS parts of the application. You must bootstrap the Angular bits first and then ask the UpgradeModule to bootstrap the AngularJS bits next.

In an AngularJS application you have a root AngularJS module, which will also be used to bootstrap the AngularJS application.

Pure AngularJS applications can be automatically bootstrapped by using an ng-app directive somewhere on the HTML page.
But for hybrid applications, you manually bootstrap using the UpgradeModule.
Therefore, it is a good preliminary step to switch AngularJS applications to use the manual JavaScript `angular.bootstrap` method even before switching them to hybrid mode.

2. Install Upgrage Module

`npm install @angular/upgrade --save`


```bash
angular.element(document).ready(function() {
	angular.bootstrap(document, ['myApp']);
});
```

Install the latest versions of the Angular framework packages by running:
```bash
npm install --save @angular/common@latest @angular/compiler@latest @angular/core@latest @angular/forms@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/router@latest
```

Install the latest versions of other packages used by Angular (RxJS, TypeScript, Zone.js) by running:

```bash
npm install --save rxjs@latest zone.js@latest
npm install --save-dev typescript@latest
```

## [PhoneCat Upgrade Tutorial](https://angular.io/guide/upgrade#phonecat-upgrade-tutorial)

1. Switching to Typescript

`npm i typescript --save-dev`

2. Install Types

`npm install @types/jasmine @types/angular @types/angular-animate @types/angular-aria @types/angular-cookies @types/angular-mocks @types/angular-resource @types/angular-route @types/angular-sanitize --save-dev`

3. tsconfig.json

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "lib": [
      "es2018",
      "dom"
    ],
    "module": "es2020",
    "moduleResolution": "node",
    "outDir": "./dist/",
    "sourceMap": true,
    "target": "es5"
  },
  "include": [
    "./src/**/*"
  ]
}
```

4. Convert `.js` files to `.ts` files

5. Add script to package.json
```json
"scripts": {
  "tsc": "tsc",
  "tsc:w": "tsc -w",
  …
```

Loaders
```json
"babel-core": "^6.26.0",
"babel-loader": "^7.1.1",
"babel-preset-env": "^1.6.0",
"css-loader": "^0.28.4",
"file-loader": "^0.11.2",
"html-loader": "^0.4.5",
"sass-loader": "^6.0.5",
"source-map-loader": "^0.2.0",
"style-loader": "^0.18.1",
"svg-fill-loader": "0.0.8",
"ts-loader": "^3.1.3",
"url-loader": "^0.5.8",
```
