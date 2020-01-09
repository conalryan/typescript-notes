## [Creating a schematics collection](https://angular.io/guide/schematics-for-libraries#creating-a-schematics-collection)

```bash
# cr create new project
ng new angular-io-guide-creating-schematic-collection --createApplication=false
```

```bash
# cr create new lib
cd angular-io-guide-creating-schematic-collection
ng g lib my-lib
```

- The following steps show you how to add initial support without modifying any project files.

- In your library's root folder, create a `schematics/` folder.
```bash
cd projects/my-lib
mkdir schematics
```

- In the schematics/ folder, create an `ng-add/` folder for your first schematic.
```bash
mkdir schematics/ng-add
```

- At the root level of the schematics/ folder, create a `collection.json` file.
```bash
touch schematics/collection.json
```

- Edit the `collection.json` file to define the initial schema for your collection.
e.g. projects/my-lib/schematics/collection.json (Schematics Collection)
```json
{
  "$schema": "../../../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "ng-add": {
      "description": "Add my library to the project.",
      "factory": "./ng-add/index#ngAdd"
    }
  }
}
```
- The $schema path is relative to the Angular Devkit collection schema.
- The schematics object describes the named schematics that are part of this collection.
- The first entry is for a schematic named `ng-add`. It contains the description, and points to the factory function that is called when your schematic is executed.

1. In your library project's `package.json` file, add a `"schematics"` entry with the path to your schema file. The Angular CLI uses this entry to find named schematics in your collection when it runs commands.

projects/my-lib/package.json 
```json
{
  "name": "my-lib",
  "version": "0.0.1",
  "schematics": "./schematics/collection.json"
}
```

## [Provding installation support](https://angular.io/guide/schematics-for-libraries#providing-installation-support)
- A schematic for the `ng add` command can enhance the initial installation process for your users. The following steps will define this type of schematic.

- Go to the `/schematics/ng-add/` folder.
- Create the main file, `index.ts`.
```bash
touch projects/my-lib/schematics/ng-add/index.ts
```
- Open index.ts and add the source code for your schematic factory function
```typescript
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// Just return the tree
export function ngAdd(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
```
- The only step needed to provide initial `ng add` support is to trigger an installation task using the `SchematicContext`. 
- The task uses the user's preferred package manager to add the library to the project's `package.json` configuration file, and install it in the project’s `node_modules` directory.
- In this example, the function receives the current Tree and returns it without any modifications. If you need to, you can do additional setup when your package is installed, such as generating files, updating configuration, or any other initial setup your library requires.

## [Building your schematics](https://angular.io/guide/schematics-for-libraries#building-your-schematics)
- To bundle your schematics together with your library, you must configure the library to build the schematics separately, then add them to the bundle. 
- You must build your schematics after you build your library, so they are placed in the correct directory.
- Your library needs a custom Typescript configuration file with instructions on how to compile your schematics into your distributed library.
- To add the schematics to the library bundle, add scripts to the library's `package.json` file.
- Assume you have a library project `my-lib` in your Angular workspace. 
- To tell the library how to build the schematics, add a `tsconfig.schematics.json` file next to the generated `tsconfig.lib.json` file that configures the library build.
```bash
touch projects/my-lib/tsconfig.schematics.json
```
- Edit the `tsconfig.schematics.json` file to add the following content.
projects/my-lib/tsconfig.schematics.json
```json 
{
  "compilerOptions": {
    "baseUrl": ".",
    "lib": [
      "es2018",
      "dom"
    ],
    "declaration": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noUnusedParameters": true,
    "noUnusedLocals": true,
    "rootDir": "schematics",
    "outDir": "../../dist/my-lib/schematics",
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strictNullChecks": true,
    "target": "es6",
    "types": [
      "jasmine",
      "node"
    ]
  },
  "include": [
    "schematics/**/*"
  ],
  "exclude": [
    "schematics/*/files/**/*"
  ]
}
```
- The `rootDir` specifies that your `schematics/` folder contains the input files to be compiled.
- The `outDir` maps to the library's output folder. By default, this is the `dist/my-lib` folder at the root of your workspace.
- To make sure your schematics source files get compiled into the library bundle, add the following scripts to the `package.json` file in your library project's root folder (`projects/my-lib`).
projects/my-lib/package.json
```json
{
  "name": "my-lib",
  "version": "0.0.1",
  "scripts": {
    "build": "../../node_modules/.bin/tsc -p tsconfig.schematics.json",
    "copy:schemas": "cp --parents schematics/*/schema.json ../../dist/my-lib/",
    "copy:files": "cp --parents -p schematics/*/files/** ../../dist/my-lib/",
    "copy:collection": "cp schematics/collection.json ../../dist/my-lib/schematics/collection.json",
    "postbuild": "npm run copy:schemas && npm run copy:files && npm run copy:collection"
  },
  "peerDependencies": {
    "@angular/common": "^7.2.0",
    "@angular/core": "^7.2.0"
  },
  "schematics": "./schematics/collection.json"
}
```
- The build script compiles your schematic using the custom `tsconfig.schematics.json` file.
- The `copy:*` statements copy compiled schematic files into the proper locations in the library output folder in order to preserve the file structure.
- The `postbuild` script copies the schematic files after the build script completes.

## [Providing generation support](https://angular.io/guide/schematics-for-libraries#providing-generation-support)
- You can add a named schematic to your collection that lets your users use the `ng generate` command to create an artifact that is defined in your library.
```bash
ng generate my-lib:my-service
```
- To begin, create a new subfolder, my-service, in the schematics folder.
```bash
mkdir projects/my-lib/schematics/my-service
```

## [Configure the new schematic](https://angular.io/guide/schematics-for-libraries#configure-the-new-schematic)
- When you add a schematic to the collection, you have to point to it in the collection's schema, and provide configuration files to define options that a user can pass to the command.
- Edit the `schematics/collection.json` file to point to the new schematic subfolder, and include a pointer to a schema file that will specify inputs for the new schematic.
projects/my-lib/schematics/collection.json
```json
{
  "$schema": "../../../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "ng-add": {
      "description": "Add my library to the project.",
      "factory": "./ng-add/index#ngAdd"
    },
    "my-service": {
      "description": "Generate a service in the project.",
      "factory": "./my-service/index#myService",
      "schema": "./my-service/schema.json"
    }
  }
}
```
- Go to the `<lib-root>/schematics/my-service/` folder.
```bash
touch projects/my-lib/schematics/my-service/schema.json
```
- Create a `schema.json` file and define the available options for the schematic.
```json
{
  "$schema": "http://json-schema.org/schema",
  "id": "SchematicsMyService",
  "title": "My Service Schema",
  "type": "object",
  "properties": {
    "name": {
      "description": "The name of the service.",
      "type": "string"
    },
    "path": {
      "type": "string",
      "format": "path",
      "description": "The path to create the service.",
      "visible": false
    },
    "project": {
      "type": "string",
      "description": "The name of the project.",
      "$default": {
        "$source": "projectName"
      }
    }
   },
  "required": [
    "name"
  ]
}
```
Create a schema.ts file and define an interface that stores the values of the options defined in the schema.json file.
```bash
touch projects/my-lib/schematics/my-service/schema.ts
```
projects/my-lib/schematics/my-service/schema.ts
```typescript
export interface Schema {
  // The name of the service.
  name: string;

  // The path to create the service.
  path?: string;

  // The name of the project.
  project?: string;
}
```

## [Add template files](https://angular.io/guide/schematics-for-libraries#add-template-files)
- To add artifacts to a project, your schematic needs its own template files. 
- Schematic templates support special syntax to execute code and variable substitution.
- Create a files/ folder inside the schematics/my-service/ folder.
```bash
mkdir projects/my-lib/schematics/my-service/files
```
- Create a file named `__name@dasherize__.service.ts.template` that defines a template you can use for generating files.
```bash
touch projects/my-lib/schematics/my-service/files/__name@dasherize__.service.ts.template
```
- This template will generate a service that already has Angular's `HttpClient` injected into its constructor.
projects/my-lib/schematics/my-service/files/__name@dasherize__.service.ts.template

## [Add the factory function](https://angular.io/guide/schematics-for-libraries#add-the-factory-function)
- The Schematics framework provides a file templating system, which supports both path and content templates. 
- The system operates on placeholders defined inside files or paths that loaded in the input Tree. 
- It fills these in using values passed into the Rule.
- Create the main file, `index.ts` and add the source code for your schematic factory function.
```bash
touch projects/my-lib/schematics/my-service/index.ts
```
- First, import the schematics definitions you will need. 
- The Schematics framework offers many utility functions to create and use rules when running a schematic.
projects/my-lib/schematics/my-service/index.ts
```typescript
import {
  Rule, Tree, SchematicsException,
  apply, url, applyTemplates, move,
  chain, mergeWith
} from '@angular-devkit/schematics';

import { strings, normalize, experimental } from '@angular-devkit/core';
```
Import the defined schema interface that provides the type information for your schematic's options.
```typescript
import {
  Rule, Tree, SchematicsException,
  apply, url, applyTemplates, move,
  chain, mergeWith
} from '@angular-devkit/schematics';

import { strings, normalize, experimental } from '@angular-devkit/core';

import { Schema as MyServiceSchema } from './schema';
```
- To build up the generation schematic, start with an empty rule factory.
projects/my-lib/schematics/my-service/index.ts
```typescript
export function myService(options: MyServiceSchema): Rule {
  return (tree: Tree) => {
    return tree;
  };
}
```
- This simple rule factory returns the tree without modification. 
- The options are the option values passed through from the ng generate command.

## [Define a generation rule](https://angular.io/guide/schematics-for-libraries#define-a-generation-rule)
- The Angular workspace where the user has installed your library contains multiple projects (applications and libraries). 
- The user can specify the project on the command line, or allow it to default. 
- In either case, your code needs to identify the specific project to which this schematic is being applied, so that you can retrieve information from the project configuration.
- You can do this using the `Tree` object that is passed in to the factory function. 
- The Tree methods give you access to the complete file tree in your workspace, allowing you to read and write files during the execution of the schematic.

## [Get the project configuration](https://angular.io/guide/schematics-for-libraries#get-the-project-configuration)
- To determine the destination project, use the `Tree.read()` method to read the contents of the workspace configuration file, `angular.json`, at the root of the workspace. 
- Add the following code to your factory function.
projects/my-lib/schematics/my-service/index.ts
```typescript
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
  };
}
```

## [Define the rule](https://angular.io/guide/schematics-for-libraries#define-the-rule)
- A Rule can use external template files, transform them, and return another Rule object with the transformed template. 
- You can use the templating to generate any custom files required for your schematic.
projects/my-lib/schematics/my-service/index.ts
```typescript
const templateSource = apply(url('./files'), [
  applyTemplates({
    classify: strings.classify,
    dasherize: strings.dasherize,
    name: options.name
  }),
  move(normalize(options.path as string))
]);
```
- The apply() method applies multiple rules to a source and returns the transformed source. It takes 2 arguments, a source and an array of rules.
- The url() method reads source files from your filesystem, relative to the schematic.
- The applyTemplates() method receives an argument of methods and properties you want make available to the schematic template and the schematic filenames. It returns a Rule. This is where you define the classify() and dasherize() methods, and the name property.
- The classify() method takes a value and returns the value in title case. For example, if the provided name is my service, it is returned as MyService
- The dasherize() method takes a value and returns the value in dashed and lowercase. For example, if the provided name is MyService, it is returned as `my-service.
- The move method moves the provided source files to their destination when the schematic is applied.
- Finally, the rule factory must return a rule.
projects/my-lib/schematics/my-service/index.ts
```typescript
return chain([
  mergeWith(templateSource)
]);
```
The chain() method allows you to combine multiple rules into a single rule, so that you can perform multiple operations in a single schematic. Here you are only merging the template rules with any code executed by the schematic.

See a complete exampled of the schematic rule function.
projects/my-lib/schematics/my-service/index.ts
```typescript
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
    if (!options.project) {
      options.project = workspace.defaultProject;
    }

    const projectName = options.project as string;

    const project = workspace.projects[projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';

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
```

## [Running your library and schematics](https://angular.io/guide/schematics-for-libraries#running-your-library-schematic)
- After you build your library and schematics, you can install the schematics collection to run against your project. 
- The steps below show you how to generate a service using the schematic you created above.

Build your library and schematics
From the root of your workspace, run the `ng build` command for your library.
```bash
ng build my-lib
```
Then, you change into your library directory to build the schematic
```bash
cd projects/my-lib
npm run build
```

## [Link the library](https://angular.io/guide/schematics-for-libraries#link-the-library)
- Your library and schematics are packaged and placed in the `dist/my-lib` folder at the root of your workspace. 
- For running the schematic, you need to link the library into your `node_modules` folder. 
- From the root of your workspace, run the `npm link` command with the path to your distributable library.
```bash
npm link dist/my-lib
Run the schematic
```
- Now that your library is installed, you can run the schematic using the `ng generate` command.
```bash
ng generate my-lib:my-service --name my-data
```
- In the console, you will see that the schematic was run and the `my-data.service.ts` file was created in your app folder.
```bash
CREATE src/app/my-data.service.ts (208 bytes)
```
