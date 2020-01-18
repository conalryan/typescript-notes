Build Your own Bundler](https://www.youtube.com/watch?v=Gc9-7PBqOC8)
================================================================================

Run
```bash
node bundler.js
```

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
Need to traverse all the child dependencies and create a graph

```javascript
let COUNTER = 0;

/**
 * fileName is the path relative to bundler.js
 */
function createAsset(fileName) {
  // Read file content
  const content = fs.readFileSync(fileName, 'utf-8');
  // Transform file content to AST
  const ast = babelParser.parse(content, {
    sourceType: 'module'
  });
  // Traverse AST and collect imports
  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    }
  });
  // Return an object representing the module dependencies
  const id = COUNTER++;
  return {
    id,
    fileName,
    dependencies
  };
}

function createGraph(pathToEntryJs) {
  const mainAsset = createAsset(pathToEntryJs);
  // Loop and push to queue traversing through all modules
  const queue = [mainAsset];
  for(const asset of queue) {
    const dirname = path.dirname(asset.fileName);

    asset.mapping = {};

    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath);
      const childAsset = createAsset(absolutePath);
      asset.mapping[relativePath] = childAsset.id;
      queue.push(childAsset);
    });
  }
  return queue;
}

const graph = createGraph('./example/entry.js');
console.log(graph);
```

Transpile
--------------------------------------------------------------------------------
Install
```bash
yarn add -D @babel/core
```

Update bunder.js
```javascript

```
