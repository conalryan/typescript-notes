import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// Just return the tree
export function ngAdd(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // The only step needed to provide initial `ng add` support is to trigger an installation task using the SchematicContext
    _context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
