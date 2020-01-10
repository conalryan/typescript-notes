[Build Your own Webpack](https://www.youtube.com/watch?v=Gc9-7PBqOC8)
================================================================================

Bundler
--------------------------------------------------------------------------------
Bundlers let us write modules that work in the browser.

EcmaScript Modules
--------------------------------------------------------------------------------

```javascript
// this module depends on lodash
import _ from 'lodash';

// this is what this module exports
export default: someValue;
```

CommonJS / RequireJS
--------------------------------------------------------------------------------
CommonJS defines a module format. Unfortunately, it was defined without giving browsers equal footing to other JavaScript environments. Because of that, there are CommonJS spec proposals for Transport formats and an asynchronous require.

RequireJS tries to keep with the spirit of CommonJS, with using string names to refer to dependencies, and to avoid modules defining global objects, but still allow coding a module format that works well natively in the browser. RequireJS implements the Asynchronous Module Definition (formerly Transport/C) proposal.

```javascript
// this module depends on lodash
const _ = require('lodash');

// this is what this module exports
module.exports = someValue;
```

Entry File
--------------------------------------------------------------------------------
Bundler needs to start somewhere to build the dependency graph


Create Bundler
--------------------------------------------------------------------------------
Create `bundler.js`
```javascript
const fs = require('fs');

function createAsset(fileName) {
  const content = fs.readFileSync(fileName, 'utf-8');
  console.log(content);
}

createAsset('./example/entry.js');
```

This will print out the content of entry.js
```bash
import message from './message.js';

console.log(message);
```

Run
```bash
node bundler.js
```

AST
--------------------------------------------------------------------------------
Rather than parsing content as string with regex, you can use AST for more precission

Install
```bash
yarn add -D @babel/parser @babel/traverse
```

Config bundler.js
```javascript
const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse');

function createAsset(fileName) {
  const content = fs.readFileSync(fileName, 'utf-8');
  const ast = babelParser.parse(content, {
    sourceType: 'module'
  });
  console.log(ast);
}

createAsset('./example/entry.js');
```

Collect all the dependencies
```javascript
const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function createAsset(fileName) {
  const content = fs.readFileSync(fileName, 'utf-8');
  const ast = babelParser.parse(content, {
    sourceType: 'module'
  });
  
  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    }
  });
}

createAsset('./example/entry.js');

```

Return an object with the dependencies
```javascript
const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

let COUNTER = 0;

function createAsset(fileName) {
  const content = fs.readFileSync(fileName, 'utf-8');
  const ast = babelParser.parse(content, {
    sourceType: 'module'
  });
  
  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    }
  });

  const id = COUNTER++;
  
  return {
    id,
    fileName,
    dependencies
  };
}

const mainAsset = createAsset('./example/entry.js');

console.log(mainAsset);
```

Graph
--------------------------------------------------------------------------------

