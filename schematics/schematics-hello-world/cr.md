# [Schematics Hello World](https://brianflove.com/2018/12/11/angular-schematics-tutorial/)

## Install schematics cli
```bash
npm install -g @angular-devkit/schematics-cli
# or
yarn add -g @angular-devkit/schematics-cli
```

## Generate new schematic
```bash
schematics blank --name=schematics-hello-world
```

Let’s review the `src/collection.json` configuration:

`$schema` property 
- specifies the schema for validation.

`schematics` property
- object where each key is the name of a schematic.

`description` property 
- Each schematic has a `description` property - provides a description of the schematic.

`factory` property 
- Each schematic also a factory property
- string that specifies the file location of our schematic’s entry point, followed by a hash symbol, followed by the function that will be invoked; in this case we’ll invoke the schematicsHelloWorld() function in the hello-world/index.js file.


We can also specify some additional properties for a schematic:

`aliases` property (optional)
- array that we can use to specify one or more aliases for our schematic. 
- For example, an alias for the “generate” schematic that ships with the Angular cli is “g”. This enables us to execute the generate command via $ ng g.

`schema` property (optional)
- specify a schema for each individual schematic
- specify all of the command line options that are available for the schematic.

`package.json` file contains a new `schematics` property that points to the `src/collections.json` file:
```json
...
  "schematics": "./src/collection.json",
...
```

## [Entry Function](https://brianflove.com/2018/12/11/angular-schematics-tutorial/#entry-function)
`src/schematics-hello-world/index.ts`
```typescript
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function schematicsHelloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
```
`schematicsHelloWorld function` 
- export the that will be invoked as the “entry function”.
- The function accepts an `options` argument, which is an object of command line argument key/value pairs.
- Our function is a higher order function, meaning that it either accepts or returns a function reference. 
- In this case, our function returns a function that accepts the `Tree` and the `SchematicContext` objects.

## [Tree](https://brianflove.com/2018/12/11/angular-schematics-tutorial/#what-is-a-tree)
- A staging area for changes, containing the original file system, and a list of changes to apply to it.

A few of things we can use the tree to accomplish include:

- `exists(path: string): boolean;` - determine if a path exists
- `read(path: string): Buffer | null;` - read the path specified
- `create(path: string, content: Buffer | string): void;` - creates a new file at the specified path with the specified content
- `beginUpdate(path: string): UpdateRecorder;` - returns a new UpdateRecorder instance for the file at the specified path
- `commitUpdate(record: UpdateRecorder): void;` - commits the actions of an UpdateRecorder

## [What is a Rule]()
A Rule is a function that applies actions to a Tree given the SchematicContext:
```typescript
declare type Rule = 
 (tree: Tree, context: SchematicContext) => 
 Tree | Observable<Tree> | Rule | void;
 ```
 In the hello world example code above, note that the schematicsHelloWorld() “entry” function returns a Rule.


## Build and Execute
```bash
yarn build
schematics .:schematics-hello-world --foo=bar
# Nothing to be done.
```

Note
- We are executing the schematics using the schematics CLI, not the Angular CLI.
- The first option is to specify the collection name (cr: aka Build.bazel). In this instance we are pointing to the current directory, ., as the collection (cr: aka Build.bazel).
- The collection name optional. If we omit the collection name the internal collection is used. We used the internal collection previously when we executed the “blank” schematic.
- If we specify a collection name, we use the colon ( : ) to separate the collection name followed by the schematic name (cr: aka the Build Rule or target?).
- In this example we are executing the “schematics-hello-world” schematic.
- Finally, we also specify the “foo” option to our schematic, which has the value “bar”.

## Modify Entry Function
Let’s start by adding a log statement to the function that we return from the schematicsHelloWorld function:
```typescript
export function schematicsHelloWorld(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log(options);
    return tree;
  };
}
```

```bash
# REMEMBER: must rebuild to see changes
yarn build
schematics .:schematics-hello-world --foo=bar
# { foo: 'bar' }
# Nothing to be done.
```

## [Generate a Template](https://brianflove.com/2018/12/11/angular-schematics-tutorial/#generate-a-hello-world-template)
Let’s update our Rule function to use the tree.create() method to create a new file:
```typescript
export function schematicsHelloWorld(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create("hello-world.html", `<h1>Hello ${options.name} 👋</h1>`);
    return tree;
  };
}
```
- `create()` method accepts the `path` to the file we are creating along with the `content` for the file. 
```bash
yarn build
schematics .:schematics-hello-world --name="Angular Community" --dry-run
# { name: 'Angular Community' }
# CREATE /schematics-hello-world.html (37 bytes)
```
Removing --dry-run flag did not create the file. Why not?


## [Unit Tests](https://brianflove.com/2018/12/11/angular-schematics-tutorial/#unit-tests)
Angular schematics include a SchematicTestRunner for building a suite of unit tests to ensure the quality of your schematics collection.
```typescript
const collectionPath = path.join(__dirname, "../collection.json");

describe("schematics-hello-world", () => {
 it("works", () => {
   const runner = new SchematicTestRunner("schematics", collectionPath);
   const tree = runner.runSchematic("schematics-hello-world", {}, Tree.empty());

   expect(tree.files.length).toEqual(1);
 });
});
```

- The test is executed using Jasmine.
- new-up the `SchematicTestRunner` class, specifying the `collectionName` followed by the `collectionPath`.
- Using the test runner we invoke `runSchematic()`, specifying the `schematicName`, the options object and the source Tree.

```bash
yarn run test
```

# Notes from https://www.youtube.com/watch?v=X06tuCohJPQ&t=655s

## Schematics
- Packaged into a collection
- Collections define each schematic and the command to execute it
- Collections can be installed via npm

### collection.json
- Define each schematic in collection

### Tree
- Staging area for changes
- Contains original file system and a list of changes to apply to it
```bash
Tree.create()
Tree.delete()
Tree.exists()
Tree.read()
```

### Rule
- Factory function that applies action to the tree, returns new tree.
- Chain rules and modify file tree

### schematics CLI
Install
```bash
npm install -g @angular-devkit/schematics-cli
```

Create a new schematic "foo" (equivalent to ng new)
```
schematics blank foo
schematics <directory>:<schematic> [options]
```
