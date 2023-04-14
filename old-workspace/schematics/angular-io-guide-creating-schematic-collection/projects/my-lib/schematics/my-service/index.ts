import {
  Rule, Tree, SchematicsException,
  apply, url, applyTemplates, move,
  chain, mergeWith
} from '@angular-devkit/schematics';

import { strings, normalize, experimental } from '@angular-devkit/core';

import { Schema as MyServiceSchema } from './schema';

export function myService(options: MyServiceSchema): Rule {
  return (tree: Tree) => {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }

    // convert workspace to string
    const workspaceContent = workspaceConfig.toString();

    // parse workspace string into JSON object
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

    // The WorkspaceSchema contains all the properties of the workspace configuration, including a defaultProject value for determining which project to use if not provided.
    // We will use that value as a fallback, if no project is explicitly specified in the ng generate command.
    if (!options.project) {
      options.project = workspace.defaultProject;
    }

    // Now that you have the project name, use it to retrieve the project-specific configuration information.
    const projectName = options.project as string;

    const project = workspace.projects[projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    // The options.path determines where the schematic template files are moved to once the schematic is applied.
    // The path option in the schematic's schema is substituted by default with the current working directory.
    // If the path is not defined, use the sourceRoot from the project configuration along with the projectType.
    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name
      }),
      move(normalize(options.path as string))
    ]);

    return chain([
      mergeWith(templateSource)
    ]);
  };
}
