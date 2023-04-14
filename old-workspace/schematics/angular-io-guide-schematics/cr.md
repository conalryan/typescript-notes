# [angular-io-guide-schematics](https://angular.io/guide/schematics)

## cr: Run hello-world example
```bash
cd angular-io-guide-schematics/ && cat cr.md

cd hello-world

yarn install

yarn run build
# tsc -p tsconfig.json
# Done in 2.90s.

# cr: Note that hello-world is the dir name. The function name is helloWorld
schematics .:hello-world
# helloWorld {}
# Nothing to be done.
```

## cr: Run goodbye-world example
```bash
# Repeat steps above if not done already.
schematics .:goodbye-world
# goodbyeWorld {}
# Nothing to be done.
```

## [Schematic Glossary Definition](https://angular.io/guide/glossary#schematic)
- scaffolding library that defines how to generate or transform a programming project by creating, modifying, refactoring, or moving files and code. 
- A schematic defines rules that operate on a virtual file system called a tree.
- Angular CLI uses schematics to generate and modify Angular projects and parts of projects.
- Angular provides a set of schematics for use with the CLI.
- `ng add` command runs schematics as part of adding a library to your project. 
- `ng generate` command runs schematics to create apps, libraries, and Angular code constructs.
- Add schematics to the npm package that you use to publish and share your library.

## [Schematics](https://angular.io/guide/schematics#schematics)
- template-based code generator that supports complex logic. 
- set of instructions for transforming a software project by generating or modifying code. 
- packaged into collections
- installed with npm
- powerful tool for creating, modifying, and maintaining any software project
- particularly useful for customizing Angular projects to suit the particular needs of your own organization. 
- generate commonly-used UI patterns or specific components, using predefined templates or layouts.
- enforce architectural rules and conventions, making your projects consistent and inter-operative.

## [Schematics for Angular CLI](https://angular.io/guide/schematics#schematics-for-the-angular-cli)
- Angular CLI uses schematics to apply transforms to a web-app project. 
- You can modify these schematics, and define new ones to do things like update your code to fix breaking changes in a dependency, or to add a new configuration option or framework to an existing project.
- Schematics that are included in the `@schematics/angular` collection are run by default by the commands `ng generate` and `ng add`. 
- The package contains named schematics that configure the options that are available to the CLI for ng generate sub-commands, such as ng generate component and ng generate service. 
- The subcommands for ng generate are shorthand for the corresponding schematic. 
- You can specify a particular schematic (or collection of schematics) to generate, using the long form:
```bash
ng generate my-schematic-collection:my-schematic-name
# or
ng generate my-schematic-name --collection collection-name
```

## [Configuring CLI Schematics](https://angular.io/guide/schematics#configuring-cli-schematics)
- A JSON schema associated with a schematic tells the Angular CLI what options are available to commands and subcommands, and determines the defaults. 
- These defaults can be overridden by providing a different value for an option on the command line.
- The JSON schemas for the default schematics used by the CLI to generate projects and parts of projects are collected in the package `@schematics/angular`. 

## [Developing Schemas for Libraries](https://angular.io/guide/schematics#developing-schematics-for-libraries)
- As a library developer, you can create your own collections of custom schematics to integrate your library with the Angular CLI.
- An add schematic allows developers to install your library in an Angular workspace using `ng add`.
- Generation schematics can tell the `ng generate` subcommands how to modify projects, add configurations and scripts, and scaffold artifacts that are defined in your library.
- An update schematic can tell the `ng update` command how to update your library's dependencies and adjust for breaking changes when you release a new version.

## [Add Schematics](https://angular.io/guide/schematics#add-schematics)
- An add schematic is typically supplied with a library, so that the library can be added to an existing project with `ng add`. 
- The add command uses your package manager to download new dependencies, and invokes an installation script that is implemented as a schematic.
- For example, the `@angular/material` schematic tells the add command to install and set up Angular Material and theming, and register new starter components that can be created with ng generate. You can look at this one as an example and model for your own add schematic.
- Partner and third party libraries also support the Angular CLI with add schematics. For example, `@ng-bootstrap/schematics` adds `ng-bootstrap` to an app, and `@clr/angular` installs and sets up Clarity from VMWare.
- An add schematic can also update a project with configuration changes, add additional dependencies (such as polyfills), or scaffold package-specific initialization code. 
- For example, the `@angular/pwa` schematic turns your application into a PWA by adding an app manifest and service worker, and the `@angular/elements` schematic adds the `document-register-element.js` polyfill and dependencies for Angular Elements.

## [Generation Schematics](https://angular.io/guide/schematics#generation-schematics)
- Generation schematics are instructions for the `ng generate` command. 
- The documented sub-commands use the default Angular generation schematics, but you can specify a different schematic (in place of a sub-command) to generate an artifact defined in your library.
- Angular Material, for example, supplies generation schematics for the UI components that it defines. The following command uses one of these schematics to render an Angular Material <mat-table> that is pre-configured with a datasource for sorting and pagination.
```bash
ng generate @angular/material:table 
```

## [Update Schematics](https://angular.io/guide/schematics#update-schematics)
- `ng update` command can be used to update your workspace's library dependencies. 
- If you supply no options or use the help option, the command examines your workspace and suggests libraries to update.
```
ng update
    We analyzed your package.json, there are some packages to update:

      Name                               Version                  Command to update
     --------------------------------------------------------------------------------
      @angular/cdk                       7.2.2 -> 7.3.1           ng update @angular/cdk
      @angular/cli                       7.2.3 -> 7.3.0           ng update @angular/cli
      @angular/core                      7.2.2 -> 7.2.3           ng update @angular/core
      @angular/material                  7.2.2 -> 7.3.1           ng update @angular/material
      rxjs                               6.3.3 -> 6.4.0           ng update rxjs

    There might be additional packages that are outdated.
    Run "ng update --all" to try to update all at the same time.
```
- If you pass the command a set of libraries to update (or the `--all` flag), it updates those libraries, their peer dependencies, and the peer dependencies that depend on them.
- If there are inconsistencies (for example, if peer dependencies cannot be matched by a simple semver range), the command generates an error and does not change anything in the workspace.
- We recommend that you do not force an update of all dependencies by default. 
- Try updating specific dependencies first.
- If you create a new version of your library that introduces potential breaking changes, you can provide an update schematic to enable the `ng update` command to automatically resolve any such changes in the project being updated.
```bash
ng update @angular/material
```
- This command updates both `@angular/material` and its dependency `@angular/cdk` in your workspace's `package.json`. 
- If either package contains an update schematic that covers migration from the existing version to a new version, the command runs that schematic on your workspace.

## [Authoring Schematics](https://angular.io/guide/schematics-authoring#authoring-schematics)
- Schematics can be chained, running other schematics to perform complex operations.
- Angular Schematics tooling guards against side effects and errors by creating a virtual file system. - A schematic describes a pipeline of transformations that can be applied to the virtual file system. - When a schematic runs, the transformations are recorded in memory, and only applied in the real file system once they're confirmed to be valid.

## [Schematic Concepts](https://angular.io/guide/schematics-authoring#schematics-concepts)
- The public API for schematics defines classes that represent the basic concepts.

### Virtual File System
- virtual file system is represented by a Tree.

### Tree
- The Tree data structure contains a base (a set of files that already exists) and a staging area (a list of changes to be applied to the base) (cr: Isn't that how React uses a virtual DOM>). 
- When making modifications, you don't actually change the base, but add those modifications to the staging area.

### Rule
- A Rule object defines a function that takes a Tree, applies transformations, and returns a new Tree.
- The main file for a schematic, `index.ts`, defines a set of rules that implement the schematic's logic.
- cr: A Rule is a function that accepts a `Tree` and `SchematicContext` as args and returns a new `Tree`.
- cr: Rules apply actions. There are 4 types of actions: Create, Rename, Overwrite, Delete.

### Action
- A transformation is represented by an Action. 
- There are four action types: 
  - Create
  - Rename
  - Overwrite
  - Delete

### SchematicContext object
- Each schematic runs in a context, represented by a SchematicContext object.
- The context object passed into a rule provides access to utility functions and metadata that the schematic may need to work with, including a logging API to help with debugging. 
- The context also defines a merge strategy that determines how changes are merged from the staged tree into the base tree. 
- A change can be accepted or ignored, or throw an exception.

## [Defining Rules and Actions](https://angular.io/guide/schematics-authoring#defining-rules-and-actions)
- When you create a new blank schematic with the Schematics CLI, the generated entry function is a rule factory.
- A `RuleFactoryobject` defines a higher-order function that creates a Rule.
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

- Your rules can make changes to your projects by calling external tools and implementing logic. 
- You need a rule, for example, to define how a template in the schematic is to be merged into the hosting project.
- Rules can make use of utilities provided with the `@schematics/angular` package. 
- Look for helper functions for working with modules, dependencies, TypeScript, AST, JSON, Angular CLI workspaces and projects, and more.
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

## [Defining input options with a schema and interfaces](https://angular.io/guide/schematics-authoring#defining-input-options-with-a-schema-and-interfaces)
- `Rules` can collect option values from the caller and inject them into templates. 
- The options available to your rules, with their allowed values and defaults, are defined in the schematic's JSON schema file, `<schematic>/schema.json`. 
- You can define variable or enumerated data types for the schema using TypeScript interfaces.
- You can see examples of schema files for the Angular CLI command schematics in `@schematics/angular`.

## [Schematics CLI](https://angular.io/guide/schematics-authoring#schematics-cli)
- Schematics come with their own command-line tool. 
- Using Node 6.9 or above, install the Schematics command line tool globally:
```bash
npm install -g @angular-devkit/schematics-cli
```
- This installs the schematics executable, which you can use to create a new schematics collection in its own project folder, add a new schematic to an existing collection, or extend an existing schematic.
- Most common use of schematics, is to integrate an Angular library with the Angular CLI. 
- You can do this by creating the schematic files directly within the library project in an Angular workspace, without using the Schematics CLI.

## [Creating a Schematic Collection](https://angular.io/guide/schematics-authoring#creating-a-schematics-collection)
- Create a new schematic named hello-world in a new project folder of the same name.
```bash
schematics blank --name=hello-world
```
- The `blank` schematic is provided by the Schematics CLI. 
- The command creates a new project folder (the root folder for the collection) and an initial named schematic in the collection.
- Go to the collection folder, install your npm dependencies, and open your new collection in your favorite editor to see the generated files. 
- For example, if you are using VSCode:
```bash
cd hello-world
yarn install
yarn run build
code .
```
- The initial schematic gets the same name as the project folder, and is generated in `src/hello-world`. 
- You can add related schematics to this collection, and modify the generated skeleton code to define your schematic's functionality. 
- Each schematic name must be unique within the collection.

## [Running a Schematic](https://angular.io/guide/schematics-authoring#running-a-schematic)
- Use the schematics command to run a named schematic. 
- Provide the path to the project folder, the schematic name, and any mandatory options, in the following format.
```bash
schematics <path-to-schematics-project>:<schematics-name> --<required-option>=<value>
```
- The path can be absolute or relative to the current working directory where the command is executed. 
- For example, to run the schematic we just generated (which has no required options), use the following command.
```bash
schematics .:hello-world
# Nothing to be done.
```

## [Adding a Schematic to a Collection](https://angular.io/guide/schematics-authoring#adding-a-schematic-to-a-collection)
- To add a schematic to an existing collection, use the same command you use to start a new schematics project, but run the command inside the project folder.
```bash
cd hello-world
schematics blank --name=goodbye-world
```
- The command generates the new named schematic inside your collection, with a main `index.ts` file and its associated test spec. 
- It also adds the name, description, and factory function for the new schematic to the collection's schema in the `collection.json` file.
colleciton.json
```json

  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "hello-world": {
      "description": "A blank schematic.",
      "factory": "./hello-world/index#helloWorld"
    },
    "goodbye-world": {
      "description": "A blank schematic.",
      "factory": "./goodbye-world/index#goodbyeWorld"
    }
  }
}
```

## [Collection contents](https://angular.io/guide/schematics-authoring#collection-contents)
- The top level of the root project folder for a collection contains
  - configuration files
  - `node_modules` folder
  - `src/` folder
    - contains subfolders for named schematics in the collection
    - contains a schema `collection.json`, which describes the collected schematics.
    - Each schematic is created with a name, description, and factory function.
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
- The `$schema` property specifies the schema that the CLI uses for validation.
- The `schematics` property lists named schematics that belong to this collection. 
- Each schematic has a plain-text description, and points to the generated entry function in the main file.
- The factory property points to the generated entry function. 
- In this example, you invoke the hello-world schematic by calling the helloWorld() factory function.
- The optional `schema` property points to a JSON schema file that defines the command-line options available to the schematic.
- The optional `aliases` array specifies one or more strings that can be used to invoke the schematic. - For example, the schematic for the Angular CLI “generate” command has an alias “g”, allowing you to use the command ng g.

## [Nested schematics](https://angular.io/guide/schematics-authoring#named-schematics)
- When you use the Schematics CLI to create a blank schematics project, the new blank schematic is the first member of the collection, and has the same name as the collection. 
- When you add a new named schematic to this collection, it is automatically added to the `collection.json` schema.
- In addition to the name and description, each schematic has a **factory** property that identifies the schematic’s **entry point**. 
- In the example, you invoke the schematic's defined functionality by calling the `helloWorld()` function in the main file, `hello-world/index.ts`.
- Each named schematic in the collection has the following main parts.
  - `index.ts`	Code that defines the transformation logic for a named schematic.
  - `schema.json`	Schematic variable definition.
  - `schema.d.ts`	Schematic variables.
  - `files/`	Optional component/template files to replicate.
- It is possible for a schematic to provide all of its logic in the `index.ts` file, without additional templates. 
- You can create dynamic schematics for Angular, however, by providing components and templates in the files/ folder, like those in standalone Angular projects. 
- The logic in the index file configures these templates by defining rules that inject data and modify variables.

## [Schematics for Libraries](https://angular.io/guide/schematics-for-libraries#schematics-for-libraries)
- provide and package schematics with your library.
- Users can use `ng add` to install an initial version of your library, `ng generate` to create artifacts defined in your library, and `ng update` to adjust their project for a new version of your library that introduces breaking changes.

