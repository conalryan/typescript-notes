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
  // Transpile to CommonJs/RequireJs
  // TODO below code is throwing error
  // https://github.com/babel/babel/issues/10085
  // const {code} = babel.transformFromAst(ast, null, {
  //   presets: ['@babel/env']
  // });
  const {code} = babel.transformFromAst(ast);
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

function bundle(graph) {
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
console.log(graph);

const result = bundle(graph);
console.log(result);
