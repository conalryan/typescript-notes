const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

let COUNTER = 0;

/**
 * fileName is the path relative to bundler.js
 */
function createAsset(fileName) {
  // 1. Read file content
  const content = fs.readFileSync(fileName, 'utf-8');
  
  // 2. Transform file content to AST
  const ast = babelParser.parse(content, {
    sourceType: 'module'
  });
  console.log('--> BUNDLER ast:');
  console.log(ast);
  
  // 3. Traverse AST and collect imports
  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    }
  });

  // 4. Transform AST
  let code = {}; 
  babel.transformFromAst(ast, {}, function(err, result) {
    console.log('--> BUNDLER babel.transform');
    console.log(result);
    console.log(err);
    code = {...result};
  });

  // 5. Return
  // Return an object representing the module dependencies
  const id = COUNTER++;
  return {
    id,
    fileName,
    dependencies,
    code
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

function bundleGraph(graph) {
  let modules = '';
  graph.forEach(mod => {
    modules += `${mod.id}: [
      function (require, module, exports) { 
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)}
    ]`;
  });
  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(relativePath) {
          return require(mapping[relativePath]);
        }
        const module = { exports: {} };
        fn(localRequire, module, module.exports);

        return module.exports;
      }
      require($0);
    })({${modules}})  
  `;
  return result;
}

const graph = createGraph('./example/entry.js');
console.log('--> BUNDLER graph');
console.log(graph);

const bundle = bundleGraph(graph);
console.log('---> BUNDLER bundle');
console.log(bundle);
