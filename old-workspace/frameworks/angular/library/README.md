# Angular Library

https://www.youtube.com/watch?v=l3wjN4datGs&t=16s

1. Generate Workspace
```bash
ng new my-app --createApplication=false
```

2. Generate Library in Workspace
```bash
ng g library my-lib
```
A projects folder is created with 'my-lib' within.
`projects/my-lib/src/public-api.ts` is the entry point to the library

3. Generate an Application to use the Library
```bash
ng g application my-app
```
A new folder is added projects directory `my-app`
`angular.json` will list the projects `my-lib` and `my-app` note that the projectType is different "library" and "application" respectively. `sourceRoot` will point to the correct directory.
`package.json` now includes `"ng-packagr": "^4.2.0",`
`tsconfig.json` includes `"paths"` to library directory

4. Add Script in package.json to Build Library
```json
"my-lib-build": "ng build my-lib"
```

5. Add Library to Application
my-app/src/app/app.module.ts
```typescript
import { MyLibModule } from 'my-lib'; // tsconfig resolves location
// ...
imports: [
  MyLibModule
],
// ...
```

6. Package Library

Option 1: Package as tar file
```bash
cd ./dist/my-lib
npm pack
```
npm install tar file
```bash
npm install ./dist/my-lib/my-lib-0.0.1.tgz
```
module will be added to package.json using file url
```json
"my-lib": "file:dist/my-lib/my-lib-0.0.1.tgz",
```
now you can remove the paths section to check in tsconfig.json
```json
"paths": {
  "my-lib": [
    "dist/my-lib"
  ],
  "my-lib/*": [
    "dist/my-lib/*"
  ]
}
```
Build app again
```bash
ng build my-app
```

Run app with simple http-server
```bash
cd ./dist/my-app
http-server
```

Option 2: Push to Repository
- Modify package.json in my-lib add a scope name to "name"
```json
"name": "@my/my-lib"
```

- Add publish task in root package.json
```json
"my-lib-build": "ng build my-lib && cd dist/my-lib && npm publish"
```

- Add .npmrc to target private repository
```
registry=https://repository.my.company.com/api/npm/
```
- Or pass --registry
```json
"my-lib-build": "ng build my-lib && cd dist/my-lib && npm publish --registry https://repository.my.company.com/api/npm/"
```

Note you can use [verdaccio](https://github.com/verdaccio/verdaccio) as a local npm repository for testing

- Install your package in your app
```bash
npm i @my/my-lib --save
```
or pass registry
```bash
npm i @my/my-lib --save --registry https://repository.my.company.com/api/npm/
```

Check package.json
```json
"@my/mylib": "^0.0.1"
```

[Angular Libraries](https://angular.io/guide/creating-libraries)
==================================================================================================

Refactoring parts of an app into a library
- It must not depend on app-specific code. 
- **Declarations** such as **components** and **pipes** should be designed as **stateless**, meaning they don’t rely on or alter external variables. 
- If you do rely on state, you need to evaluate every case and decide whether it is application state or state that the library would manage.
- Any **observables** that the components subscribe to internally should be **cleaned up** and disposed of during the lifecycle of those components.
- **Components** should expose their interactions through **inputs** for providing context, and **outputs** for communicating events to other components.
- **Services** should declare their **own providers** (rather than declaring providers in the NgModule or a component), so that they are tree-shakable. This allows the compiler to leave the service out of the bundle if it never gets injected into the application that imports the library. For more about this, see Tree-shakable providers.
- If you register **global service** providers or share providers across **multiple NgModules**, use the **forRoot**() and **forChild**() patterns provided by the RouterModule.
- Check all internal dependencies.
  - For custom classes or interfaces used in components or service, check whether they depend on additional classes or interfaces that also need to be migrated.
  - Similarly, if your library code depends on a service, that service needs to be migrated.
  - If your library code or its templates depend on other libraries (such a Angular Material, for instance), you must configure your library with those dependencies.

[Reusable Code and Schematics](https://angular.io/guide/creating-libraries#reusable-code-and-schematics)
A library is packaged into an npm package for publishing and sharing, and this package can also include schematics that provide instructions for generating or transforming code directly in your project, in the same way that the CLI creates a generic skeleton app with ng generate component. A schematic that is combined with a library can, for example, provide the Angular CLI with the information it needs to generate a particular component defined in that library.

Suppose you want to read a configuration file and then generate a form based on that configuration. If that form will need additional customization by the user, it might work best as a schematic. However, if the forms will always be the same and not need much customization by developers, then you could create a dynamic component that takes the configuration and generates the form. In general, the more complex the customization, the more useful the schematic approach.

Integrating with the CLI
- A library can include schematics that allow it to integrate with the Angular CLI.
- Include an installation schematic so that ng add can add your library to a project.
- Include generation schematics in your library so that ng generate can scaffold your defined artifacts (components, services, tests, and so on) in a project.
- Include an update schematic so that ng update can update your library’s dependencies and provide migrations for breaking changes in new releases.

Publish
Use the Angular CLI and the npm package manager to build and publish your library as an npm package. Libraries are built in AoT mode by default, so you do not need to specify the -prod flag when building for publication.
```bash
ng build my-lib
cd dist/my-lib
npm publish
```

Linked libraries
While working on a published library, you can use [npm link](https://docs.npmjs.com/cli/link) to avoid reinstalling the library on every build.

The library must be rebuilt on every change. When linking a library, make sure that the build step runs in watch mode, and that the library's package.json configuration points at the correct entry points. For example, main should point at a JavaScript file, not a TypeScript file.

Incremental builds can be run as a backround process in your dev environment. To take advantage of this feature add the --watch flag to the build command:
```bash
ng build my-lib --watch
```

[Schematics](https://angular.io/guide/schematics)
==================================================================================================
A schematic is a template-based code generator that supports complex logic. It is a set of instructions for transforming a software project by generating or modifying code. Schematics are packaged into collections and installed with npm.

Schematics that are included in the @schematics/angular collection are run by default by the commands ng generate and ng add. The package contains named schematics that configure the options that are available to the CLI for ng generate sub-commands, such as ng generate component and ng generate service. The subcommands for ng generate are shorthand for the corresponding schematic. You can specify a particular schematic (or collection of schematics) to generate, using the long form:
```bash
ng generate my-schematic-collection:my-schematic-name
# or
ng generate my-schematic-name --collection collection-name
```

Configuring CLI schematics
- A JSON schema associated with a schematic defines Angular CLI:
  - Options available to commands and subcommands
  - Determines the defaults
  -  Defaults can be overridden by providing a different value for an option on the command line (e.g. `--style=scss`).
- JSON schemas for the default schematics used by the CLI:
  - To **generate** projects and parts of projects are collected in the package [@schematics/angular](https://raw.githubusercontent.com/angular/angular-cli/v7.0.0/packages/schematics/angular/application/schema.json). 
  - The schema describes the options available to the CLI for each of the `ng generate` sub-commands, as shown in the --help output.

Developing Schematics for Libraries
- Create your own collections of custom schematics to integrate your library with the Angular CLI.
- An **add schematic** allows developers to install your library in an Angular workspace using `ng add`.
- **Generation schematics** can tell the `ng generate` subcommands how to modify projects, add configurations and scripts, and scaffold artifacts that are defined in your library.
- An **update schematic** can tell the `ng update` command how to update your library's dependencies and adjust for breaking changes when you release a new version.

[Add Schematic](https://angular.io/guide/schematics#add-schematics)
- Typically supplied with library
- Allows developers to install your library in an Angular workspace using `ng add`.
- Partner and third party libraries also support the Angular CLI with add schematics. 
- `@ng-bootstrap/schematics` adds ng-bootstrap to an app.
- `@clr/angular` installs and sets up Clarity from VMWare.
- `@angular/pwa` schematic turns your application into a PWA by adding an app manifest and service worker.
- `@angular/elements` schematic adds the document-register-element.js polyfill and dependencies for Angular Elements.

[Generation Schematic](https://angular.io/guide/schematics#generation-schematics)
- Instructions for the `ng generate` command. 
- The documented sub-commands use the default Angular generation schematics, but you can specify a different schematic (in place of a sub-command) to generate an artifact defined in your library.

[Update Schematic](https://angular.io/guide/schematics#update-schematics)
- `ng update` command can be used to update your workspace's library dependencies. If you supply no options or use the help option, the command examines your workspace and suggests libraries to update.
- Accepts a set of libraries (or the `--all` flag), to update those libraries, their peer dependencies, and the peer dependencies that depend on them.
- Provide schematic for breaking changes so the ng update command will automatically resolve any such changes in the project being updated.

[Authoring Schematics](https://angular.io/guide/schematics-authoring)
- Library schematics to `ng add` your library. 
- Stand-alone schematics to manipulate the files and constructs in Angular applications as a way of customizing them for your development environment and making them conform to your standards and constraints. 
- Schematics can be chained, running other schematics to perform complex operations.

[Schematic concepts](https://angular.io/guide/schematics-authoring#schematics-concepts)
- The public API for schematics defines **classes** that represent the basic concepts.
- The **virtual file system** is represented by a **Tree**. 
- The Tree data structure contains a **base** (a set of files that already exists) and a **staging** area (a list of changes to be applied to the base). 
- Modifications applied to the staging area rather than the base.
- The main file for a schematic, **index.ts**, defines a set of rules that implement the schematic's logic.
- A **Rule object** defines a function that takes a Tree, applies transformations, and returns a new Tree. 
- A transformation is represented by an Action. 
- There are four action types: 
  1. Create
  2. Rename
  3. Overwrite
  4. Delete
- Each schematic runs in a context, represented by a `SchematicContext object`.

The `context object` passed into a rule provides access to utility functions and metadata that the schematic may need to work with, including a logging API to help with debugging. 
The context also defines a merge strategy that determines how changes are merged from the staged tree into the base tree. A change can be accepted or ignored, or throw an exception.

[Defining Rules and Actions](https://angular.io/guide/schematics-authoring#defining-rules-and-actions)
```bash
yarn global add @angular-devkit/schematics-cli
```

Use schematics-cli to create a new schematics collection in its own project folder, add a new schematic to an existing collection, or extend an existing schematic.

```typescript
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

// You don't have to export the function as default.
// You can also have more than one rule factory per file.
export function helloWorld(_options: any): Rule {
 return (tree: Tree, _context: SchematicContext) => {
   return tree;
 };
}
```

Your rules can make changes to your projects by calling external tools and implementing logic. You need a rule, for example, to define how a template in the schematic is to be merged into the hosting project.

Rules can make use of utilities provided with the `@schematics/angular` package. 
- helper functions for working with modules, dependencies, TypeScript, AST, JSON, Angular CLI workspaces and projects, and more.
```typescript
import {
  JsonAstObject,
  JsonObject,
  JsonValue,
  Path,
  normalize,
  parseJsonAst,
  strings,
} from '@angular-devkit/core';
```

[Defining input options with a schema and interfaces](https://angular.io/guide/schematics-authoring#defining-input-options-with-a-schema-and-interfaces)
- Rules can collect option values from the caller and inject them into templates. 
- The options available to your rules, with their allowed values and defaults, are defined in the schematic's JSON schema file, `<schematic>/schema.json`. 
- You can define variable or enumerated data types for the schema using TypeScript interfaces.
- Example [@schematics/angular](https://github.com/angular/angular-cli/blob/7.0.x/packages/schematics/angular/application/schema.json).
  
[Creating a Schematic Collection](https://angular.io/guide/schematics-authoring#creating-a-schematics-collection)
- The most common use of schematics is to integrate an Angular library with the Angular CLI. 
- You can do this by creating the schematic files directly within the library project in an Angular workspace, without using the Schematics CLI. See Schematics for Libraries.

1. Create a hello-world schematic
```bash
schematics blank --name=hello-world
```
- The command creates a new project folder at root dir (the root folder for the collection) and an initial named schematic in the collection.
- You can add related schematics to this collection, and modify the generated skeleton code to define your schematic's functionality. Each schematic name must be unique within the collection.
- Go to the collection folder, install your npm dependencies, and open your new collection in your favorite editor to see the generated files.
```bash
yarn install
yarn build # package.json "build": "tsc -p tsconfig.json",
```

index.ts
```typescript
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function helloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
```

[Running a Schematic](https://angular.io/guide/schematics-authoring#running-a-schematic)
```bash
# path can be absolute or relative to cwd
schematics <path-to-schematics-project>:<schematics-name> --<required-option>=<value>
# or
cd hello-world
schematics .:hello-world
```

[Adding a schematic to a collection](https://angular.io/guide/schematics-authoring#adding-a-schematic-to-a-collection)
- Use the same command you use to start a new schematics project, but run the command inside the project folder.
```bash
cd hello-world
schematics blank --name=goodbye-world
```

[Collection Contents](https://angular.io/guide/schematics-authoring#collection-contents)
collection.json
```json
{
  "$schema":
     "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "hello-world": {
      "description": "A blank schematic.",
      "factory": "./hello-world/index#helloWorld"
    }
  }
}
```
- `$schema` property specifies the schema that the CLI uses for validation.
  - The schematics property lists named schematics that belong to this collection. Each schematic has a plain-text description, and points to the generated entry function in the main file.
- `factory` property points to the generated entry function. In this example, you invoke the hello-world schematic by calling the helloWorld() factory function.
- `schema` property (optional) points to a JSON schema file that defines the command-line options available to the schematic.
- `aliases`(optional) array specifies one or more strings that can be used to invoke the schematic. For example, the schematic for the Angular CLI “generate” command has an alias “g”, allowing you to use the command ng g.

[Named Schematics](https://angular.io/guide/schematics-authoring#named-schematics)
- When you use `schematics blank --name=hello-world`, the new blank schematic is the first member of the collection, and has the same name as the collection. When you add a new named schematic to this collection, it is automatically added to the `collection.json` schema.

In addition to the **name** and **description**, each schematic has a **factory** property that identifies the schematic’s entry point. In the example, you invoke the schematic's defined functionality by calling the helloWorld() function in the main file, `hello-world/index.ts`.

Each named schematic in the collection has the following main parts:
- `index.ts`	Code that defines the transformation logic for a named schematic.
- `schema.json`	Schematic variable definition.
- `schema.d.ts`	Schematic variables.
- `files/`	Optional component/template files to replicate.

It is possible for a schematic to provide all of its logic in the index.ts file, without additional templates. You can create dynamic schematics for Angular, however, by providing components and templates in the files/ folder, like those in standalone Angular projects. The logic in the index file configures these templates by defining rules that inject data and modify variables.

[Schematics for Libraries](https://angular.io/guide/schematics-for-libraries)
--------------------------------------------------------------------------------------------------
- Provide and package your library with schematics that integrate it with the Angular CLI. 
- Users can use `ng add` to install an initial version of your library, `ng generate` to create artifacts defined in your library, and `ng update` to adjust their project for a new version of your library that introduces breaking changes.
- All three types of schematics [`ng add`, `ng generate`, `ng update`] can be part of a collection that you package with your library.

[Creating a Schematics Collection](https://angular.io/guide/schematics-for-libraries#creating-a-schematics-collection)
- To start a collection, you need to create the schematic files. 
- In your library's root folder, create a `schematics/` folder.
- In the `schematics/` folder, create an `ng-add/` folder for your first schematic.
- At the root level of the `schematics/` folder, create a `collection.json` file.
- Edit the `collection.json` file to define the initial schema for your collection.
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
- `$schema` path is relative to the Angular Devkit collection schema.
- `schematics` object describes the named schematics that are part of this collection.
- The first entry is for a schematic named ng-add. It contains the description, and points to the factory function that is called when your schematic is executed.

1. In your library project's package.json file, add a "schematics" entry with the path to your schema file. The Angular CLI uses this entry to find named schematics in your collection when it runs commands.
```json
{
  "name": "my-lib",
  "version": "0.0.1",
  "schematics": "./schematics/collection.json"
}
```

[Providing Installation Support](https://angular.io/guide/schematics-for-libraries#providing-installation-support)
- Create schematic for the `ng add` command:
  1. In `/schematics/ng-add/` folder: Create the main file, `index.ts`.
  2. Open `index.ts` and add the source code for your schematic factory function.
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
- The only step needed to provide initial `ng add` support is to trigger an installation task using the SchematicContext `_context.addTask(new NodePackageInstallTask());`
- The task uses the user's preferred package manager to add the library to the project's `package.json` configuration file, and install it in the project’s `node_modules` directory.
- If you need to, you can do additional setup when your package is installed, such as generating files, updating configuration, or any other initial setup your library requires.

[Building Schematics](https://angular.io/guide/schematics-for-libraries#building-your-schematics)
- To bundle your schematics together with your library, you must configure the library to build the schematics separately, then add them to the bundle. 
- You must build your **schematics** **after** you build your **library**, so they are placed in the correct directory.
- Your library needs a custom Typescript configuration file `tsconfig.schematics.json` with instructions on how to compile your schematics into your distributed library.
- `tsconfig.schematics.json` should be placed next to the generated `tsconfig.lib.json` file that configures the library build.
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
- `rootDir` specifies that your `schematics/` folder contains the input files to be compiled.
- `outDir` maps to the library's output folder. By default, this is the dist/my-lib folder at the root of your workspace.
- To make sure your schematics source files get compiled into the library bundle, add the following scripts to the `package.json` file in your library project's root folder (projects/my-lib).
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
- `build` script compiles your schematic using the custom `tsconfig.schematics.json` file.
- `copy:*` statements copy compiled schematic files into the proper locations in the library output folder in order to preserve the file structure.
- `postbuild` script copies the schematic files after the build script completes.

[Providing Generation Support](https://angular.io/guide/schematics-for-libraries#providing-generation-support)
- You can add a `named schematic` to your collection that lets your users use the `ng generate` command to create an artifact that is defined in your library.
- We'll assume that your library defines a service, my-service, that requires some setup. You want your users to be able to generate it using the following CLI command.
```bash
ng generate my-lib:my-service
```

[Configure the new Schematic](https://angular.io/guide/schematics-for-libraries#configure-the-new-schematic)
