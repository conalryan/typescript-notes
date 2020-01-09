# _typescript_notes

TypeScript Maintained by Microsoft

Write code in TypeScript (to be run in Node or Browser) then transpile to JavaScript

## Install TypeScript

```
npm install -g typescript
```

## Transpile TypeScript to JavaScript
Transpiler
TypeScript > TSC > JavaScript

run command:
```
$ tsc someTypeScriptClass.ts
```

## Type definitions
TypeScipt contains typing for standard JavaScript objects
[definitelytyped.org](http://definitelytyped.org/)

You don't need to add references (i.e. /// reference) to the type of .ts files for Type defintions.
The transpiler automatically finds them if they are located in the project structure

## Bootstrap app
bootstrapper.js
is entry point into application, it starts the application, instantiate classes, setup databinding etc

## vs code shortcuts

search tasks
cmd + shift + p

build
cmd + shift + b
