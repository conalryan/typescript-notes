# AngularCompiler

https://blog.angularindepth.com/a-deep-deep-deep-deep-deep-dive-into-the-angular-compiler-5379171ffb7a
https://www.youtube.com/watch?v=QQ2plVD0gDI

## Generate App with Angular-CLI

```typescript
ng new angular-compiler --style scss
```

## Git Setup
1. Remove Angular CLI .git

````bash
ls -a
rm -rf .git
````

2. Initialize new Git Repo
````bash
git init
````

3. Initial comit
````bash
git add .
git commit -m "init"
git remote add origin https://github.com/conalryan/angular-compiler.git
git push -u origin master
````

## source-map-explorer
- Install it by running:

````bash
npm i -g source-map-explorer
````

## Build project

````bash
ng build
````

## Look inside bundles

````bash
source-map-explorer dist/angular-compiler/vendor.js
````

## Compiler

- We can see that the “compiler” module accounts for nearly 50% of the bundle size — that is about 1MB (or 320kb when minified) that goes down the wire for every client.
- To remove the complier run:

````bash
ng build --prod
````

- Now compiler is gone from bundle

## AoT Ahead of Time Compilation

- AoT runs the compile step during the build process instead of inside the browser, so when you build your project for production, the compiler can disappear completely from the output, saving precious CPU cycles when the page loads in the user’s browser.

## Dom and Browser

### AngularJS

- AngularJS the creation of the DOM was delegated to the browser, which parsed your HTML and created the DOM tree (that’s its job, after all).
- AngularJS traverses the DOM elements, figure out the directives and text binding expressions and replace them with the actual data https://github.com/angular/angular.js/blob/e65928eecb3443943e3f9431e394e9bc59787952/src/ng/compile.js#L2124.
- This approach introduced several problems:
  1. Browsers can be inconsistent. Different browsers sometimes parse the same HTML input into different DOM structure, and Angular has to account for that. 
  2. Browsers are not very good at dealing with errors — they will often try to cover up for the error by automatically closing elements or moving them around, and even if they do spit an error, they don’t tell line numbers. This makes debugging problems much more challenging, usually leading to elimination until we find the error.
  3. We need a browser just for parsing our templates and rendering them into HTML that can be served to clients and displayed immediately (and also to search engines) — making server-side rendering a complicated and error prone setup
  4. HTML is case-insensitive when it comes to html tags names and attributes. Not only that, it does not preserve the original case, converting tag names to upper case, and attributes to lower case. You can observe this behavior by running:
    document.createElement('h1').nodeName
    And you see that you get uppercase “H1”. 
    This is what led AngularJS to use the famous kebab-case (i.e. ng-if, ng-model, etc.) in contrast with camelCase, which is a standard in the JavaScript worlds.
  5. Summary: So if you use the browser HTML parser, we get different results on different browsers, lacking error information, can’t get server rendering and lose attribute case.

### Angular
- The compiler actually replaces the browser and parses the HTML for you.
- Consistent parsing across all browsers, and also means it can be run in the server (since it’s just a piece of JS code that parses your templates), provide detailed error information, and preserve tag/attribute case.
- Get tooling support.

## Running the Compiler
````
Add to "scripts" in package.json

````json
"scripts": {
  ...,
  "compile": "ngc"
}
````

- Run

```bash
npm run compile
```

- Check your output (refer to tsconfig.json#outDir)

````json
"outDir": "./dist/out-tsc",
````

## Explore Compiled Javascript
- Go to output
example: dist/out-tsc/src/app/app.component.ngfactory.js

app.component.html:
````html
<h1>Angular Compiler</h1>
````

app.component.ngfactory.js:
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  // evid = function viewDef(flags: ViewFlags, nodes: NodeDef[], updateDirectives?: null | ViewUpdateFn, updateRenderer?: null | ViewUpdateFn): ViewDefinition;
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(-1, null, ["Angular Compiler"]))
    ],
    null, null);
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````
    
- Methods starting with the letter ɵ (Greek Theta) followed by 3 other English letters (e.g. ɵvid), the letter ɵ is used by the Angular team to indicate that some method is private to the framework and must not be called directly by the user, as the API for these method is not guaranteed to stay stable between Angular versions.
- The reason for using 3 letter shortcut instead of full method name, is simply to save bytes in the final bundle size. But if you Ctrl+click one of those methods (in Visual Studio Code or WebStorm), you will actually see the full method name. For ɵvid, that would be viewDef, the function that defines a view.

### Change detection - Interpolation

- Add to app.component.html:
````html
<h1>Angular Compiler Hi {{title}}</h1>
````
- Add to app.component.ts
````typescript
title = 'there';
````

app.component.ngfactory.js:
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      _ck(_v, 1, 0, currVal_0);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

#### 2nd Interpolation
- Add to app.component.html:
````html
<h1>Angular Compiler Hi {{title + subtitle}}</h1>
````
- Add to app.component.ts
````typescript
subtitle = 'compiler';
````

app.component.ngfactory.js:
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = (_co.title + _co.subtitle);
      _ck(_v, 1, 0, currVal_0);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

#### Modified Interpolation
- Add to app.component.html:
````html
<h1>Angular Compiler Hi {{title}} {{subtitle}}</h1>
````

app.component.ngfactory.js:
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

### Add Multiple Interpolations
- Add to app.component.html
````html
<h1>Angular Compiler Hi {{title}} {{subtitle}}</h1>
<p>Second line with title: {{title}}</p>
<span>Third line with subtitle: {{subtitle}}</span>
````

app.component.ngfactory.ts:
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""])),
      (_l()(), i1.ɵeld(2, 0, null, null, 1, "p", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(3, null, ["Second line with title: ", ""])),
      (_l()(), i1.ɵeld(4, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(5, null, ["Third line with subtitle: ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
      
      var currVal_2 = _co.title;
      _ck(_v, 3, 0, currVal_2);
      
      var currVal_3 = _co.subtitle;
      _ck(_v, 5, 0, currVal_3);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

### Add Button
- Add to app.component.html
````html
<button type="button"
        class="btn btn-primary"
        id="counter-increment"
        (click)="incrementCounter()">
  Increment counter
</button>
<span>Counter is: {{counter}}</span>
````

- Add to app.component.ts
````typescript
incrementCounter() {
    this.counter++;
  }
````

app.component.ngfactory.js:
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  // evid = function viewDef(flags: ViewFlags, nodes: NodeDef[], updateDirectives?: null | ViewUpdateFn,
  // updateRenderer?: null | ViewUpdateFn): ViewDefinition;
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""])),
      (_l()(), i1.ɵeld(2, 0, null, null, 1, "p", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(3, null, ["Second line with title: ", ""])),
      (_l()(), i1.ɵeld(4, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(5, null, ["Third line with subtitle: ", ""])),
      (_l()(),
        // eeld = function elementDef(checkIndex: number, flags: NodeFlags, matchedQueriesDsl: null | [string | number,
        // QueryValueType][], ngContentIndex: null | number, childCount: number, namespaceAndName: string | null,
        // fixedAttrs?: null | [string, string][], bindings?: null | [BindingFlags, string, string | SecurityContext |
        // null][], outputs?: null | ([string, string])[], handleEvent?: null | ElementHandleEventFn, componentView?:
        // null | ViewDefinitionFactory, componentRendererType?: RendererType2 | null): NodeDef;
        i1.ɵeld(
          6,
          0,
          null,
          null,
          1,
          "button",
          [["class", "btn btn-primary"], ["id", "counter-increment"], ["type", "button"]],
          null,
          [[null, "click"]],
          function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (("click" === en)) {
              var pd_0 = (_co.incrementCounter() !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },
          null,
          null)
      ),
      (_l()(), i1.ɵted(-1, null, [" Increment counter\n"])),
      (_l()(), i1.ɵeld(8, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(9, null, ["Counter is: ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
      
      var currVal_2 = _co.title;
      _ck(_v, 3, 0, currVal_2);
      
      var currVal_3 = _co.subtitle;
      _ck(_v, 5, 0, currVal_3);
      
      var currVal_4 = _co.counter;
      _ck(_v, 9, 0, currVal_4);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0,
    RenderType_AppComponent)), i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)], null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

### Add Lifecycle Hook
- Add to app.component.ts
````typescript
ngOnInit() {
  this.title = 'ngOnInit was run!';
}
````

app.component.ngfactory.js
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""])),
      (_l()(), i1.ɵeld(2, 0, null, null, 1, "p", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(3, null, ["Second line with title: ", ""])),
      (_l()(), i1.ɵeld(4, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(5, null, ["Third line with subtitle: ", ""])),
      (_l()(),
          i1.ɵeld(
            6,
            0,
            null,
            null,
            1,
            "button",
            [["class", "btn btn-primary"], ["id", "counter-increment"], ["type", "button"]],
            null,
            [[null, "click"]],
            function (_v, en, $event) {
              var ad = true;
              var _co = _v.component;
              if (("click" === en)) {
                var pd_0 = (_co.incrementCounter() !== false);
                ad = (pd_0 && ad);
              }
              return ad;
            },
            null,
            null)
      ),
      (_l()(), i1.ɵted(-1, null, [" Increment counter\n"])),
      (_l()(), i1.ɵeld(8, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(9, null, ["Counter is: ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
      
      var currVal_2 = _co.title;
      _ck(_v, 3, 0, currVal_2);
      
      var currVal_3 = _co.subtitle;
      _ck(_v, 5, 0, currVal_3);
      
      var currVal_4 = _co.counter;
      _ck(_v, 9, 0, currVal_4);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0,
        RenderType_AppComponent)),
      i1.ɵdid(1, 114688, null, 0, i2.AppComponent, [], null, null)
    ],
    function (_ck, _v) {
      _ck(_v, 1, 0);
    },
    null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

- Add a console log

````javascript
console.log(i1.ɵvid(0, 
  [
    (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
    (_l()(), i1.ɵted(1, null, ["Hi, ", " !!"])),
    (_l()(), i1.ɵted(2, null, ["Hi, ", " !!"]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = (_co.title.toUpperCase());
      _ck(_v, 1, 0, currVal_0);
    
      var currVal_0 = (_co.title);
      _ck(_v, 2, 0, currVal_0);
    }));
````

### Add a service

app.module.ngfactory.js
````javascript
"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("@angular/core");
var i1 = require("./app.module");
var i2 = require("./app.component");
var i3 = require("./app.component.ngfactory");
var i4 = require("@angular/common");
var i5 = require("@angular/platform-browser");
var i6 = require("./emoji.service");
var AppModuleNgFactory = i0.ɵcmf(i1.AppModule, [i2.AppComponent], function (_l) {
  return i0.ɵmod(
    [
      i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver,
        [[8, [i3.AppComponentNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]),
      i0.ɵmpd(5120, i0.LOCALE_ID, i0.ɵangular_packages_core_core_l, [[3, i0.LOCALE_ID]]),
      i0.ɵmpd(4608, i4.NgLocalization, i4.NgLocaleLocalization,
        [i0.LOCALE_ID, [2, i4.ɵangular_packages_common_common_a]]),
      i0.ɵmpd(4608, i0.Compiler, i0.Compiler, []),
      i0.ɵmpd(5120, i0.APP_ID, i0.ɵangular_packages_core_core_f, []),
      i0.ɵmpd(5120, i0.IterableDiffers, i0.ɵangular_packages_core_core_j, []),
      i0.ɵmpd(5120, i0.KeyValueDiffers, i0.ɵangular_packages_core_core_k, []),
      i0.ɵmpd(4608, i5.DomSanitizer, i5.ɵangular_packages_platform_browser_platform_browser_e, [i4.DOCUMENT]),
      i0.ɵmpd(6144, i0.Sanitizer, null, [i5.DomSanitizer]),
      i0.ɵmpd(4608, i5.HAMMER_GESTURE_CONFIG, i5.HammerGestureConfig, []),
      i0.ɵmpd(5120, i5.EVENT_MANAGER_PLUGINS, function (p0_0, p0_1, p1_0, p2_0, p2_1, p2_2) {
        return [new i5.ɵDomEventsPlugin(p0_0, p0_1), new i5.ɵKeyEventsPlugin(p1_0),
          new i5.ɵHammerGesturesPlugin(p2_0, p2_1, p2_2)];
      }, [i4.DOCUMENT, i0.NgZone, i4.DOCUMENT, i4.DOCUMENT, i5.HAMMER_GESTURE_CONFIG, i0.ɵConsole]),
      i0.ɵmpd(4608, i5.EventManager, i5.EventManager, [i5.EVENT_MANAGER_PLUGINS, i0.NgZone]),
      i0.ɵmpd(135680, i5.ɵDomSharedStylesHost, i5.ɵDomSharedStylesHost, [i4.DOCUMENT]),
      i0.ɵmpd(4608, i5.ɵDomRendererFactory2, i5.ɵDomRendererFactory2, [i5.EventManager, i5.ɵDomSharedStylesHost]),
      i0.ɵmpd(6144, i0.RendererFactory2, null, [i5.ɵDomRendererFactory2]),
      i0.ɵmpd(6144, i5.ɵSharedStylesHost, null, [i5.ɵDomSharedStylesHost]),
      i0.ɵmpd(4608, i0.Testability, i0.Testability, [i0.NgZone]),
      i0.ɵmpd(4608, i5.Meta, i5.Meta, [i4.DOCUMENT]),
      i0.ɵmpd(4608, i5.Title, i5.Title, [i4.DOCUMENT]),
      i0.ɵmpd(4608, i6.EmojiService, i6.EmojiService, []),
      i0.ɵmpd(1073742336, i4.CommonModule, i4.CommonModule, []),
      i0.ɵmpd(1024, i0.ErrorHandler, i5.ɵangular_packages_platform_browser_platform_browser_a, []),
      i0.ɵmpd(1024, i0.APP_INITIALIZER, function (p0_0) {
        return [i5.ɵangular_packages_platform_browser_platform_browser_h(p0_0)];
      }, [[2, i0.NgProbeToken]]),
      i0.ɵmpd(512, i0.ApplicationInitStatus, i0.ApplicationInitStatus, [[2, i0.APP_INITIALIZER]]),
      i0.ɵmpd(131584, i0.ApplicationRef, i0.ApplicationRef,
        [i0.NgZone, i0.ɵConsole, i0.Injector, i0.ErrorHandler, i0.ComponentFactoryResolver, i0.ApplicationInitStatus]),
      i0.ɵmpd(1073742336, i0.ApplicationModule, i0.ApplicationModule, [i0.ApplicationRef]),
      i0.ɵmpd(1073742336, i5.BrowserModule, i5.BrowserModule, [[3, i5.BrowserModule]]),
      i0.ɵmpd(1073742336, i1.AppModule, i1.AppModule, []),
      i0.ɵmpd(256, i0.ɵAPP_ROOT, true, [])
    ]
  );
});
exports.AppModuleNgFactory = AppModuleNgFactory;
//# sourceMappingURL=app.module.ngfactory.js.map
````

app.component.ngfactory.js
````javascript
"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var i3 = require("./emoji.service");
var styles_AppComponent = [i0.styles];
var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0, 
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Hi, ", " !! ", " end"]))
    ], 
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
    }
  );
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0, 
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [i3.EmojiService], null, null)
    ], 
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;
var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

### Styles
- Add style to app.component.scss

````scss
h1 {
  color: red;
}
````

- Run compiler, then check app.component.scss.shim.ngstyle.js

```javascript
Object.defineProperty(exports, "__esModule", { value: true });
var styles = ["h1[_ngcontent-%COMP%] {\n  color: red;\n}"];
exports.styles = styles;
//# sourceMappingURL=app.component.scss.shim.ngstyle.js.map
```

````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

## Experiment

- Note you must serve the app before changing main.ts else get an error:
ERROR in Tried to find bootstrap code, but could not. Specify either statically analyzable bootstrap code or pass in an entryModule to the plugins options.

```bash
ng serve
```

- Change main.ts

````typescript
import { AppModuleNgFactory } from '../dist/out-tsc/src/app/app.module.ngfactory';
...
platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);
````

### Make title uppercase
- Modify app.component.ngfactory.js
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title.toUpperCase();
      var currVal_1 = _co.subtitle.toUpperCase();
      _ck(_v, 1, 0, currVal_0, currVal_1);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````
