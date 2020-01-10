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
