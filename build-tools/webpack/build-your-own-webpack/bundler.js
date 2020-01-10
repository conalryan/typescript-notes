const fs = require('fs');
const path = require('path');
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
