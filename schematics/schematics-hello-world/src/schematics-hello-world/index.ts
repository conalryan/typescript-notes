import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function schematicsHelloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log(_options);
    tree.create("schematics-hello-world.html", `<h1>Hello ${_options.name} 👋</h1>`);
    return tree;
  };
}
