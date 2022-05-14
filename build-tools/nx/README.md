# NX

## Install

`npm i -g @angular/cli @nrwl/cli nx`

## [Create NX Workspace](https://nx.dev/cli/create-nx-workspace)

## Presets

`--presets=`

"angular",
"angular-nest",
"apps",
"core",
"empty",
"express",
"npm",
"nest",
"next",
"react",
"react-express",
"react-native",
"ts",
"web-components",

### [Core](https://nx.dev/getting-started/nx-core)

1. `npx create-nx-workspace@latest some-name --preset=core`

2. Create an NPM package

`nx g npm-package some-name`

3. Test cache

`nx test some-name`

And if you invoke this command a second time, the results are retrieved from cache.

### [Typescript](https://nx.dev/getting-started/nx-and-typescript)

1. `npx create-nx-workspace some-name --preset=ts`

2. `nx generate @nrwl/js:library --name=hello-tsc --buildable`

3. `npm i --save-dev @nrwl/node`
`nx generate @nrwl/node:app demonodeapp`

4. `npm i --save-dev @nrwl/web`
`nx generate @nrwl/web:app demowebapp`

5. `nx serve demowebapp`

### Angular 

1. Create Workspace
`npx create-nx-workspace --preset=angular`

`npm install -g nx`

`nx serve my-app`

### Setup MFE

1. Create Workspace
`npx create-nx-workspace --preset=angular`

`npm install -g nx`

`nx serve my-app`

2. Convert app into mfe
`nx generate setup-mfe`
or
`nx g @nrwl/angular:setup-mfe`

---

## [Workspace Overview](https://nx.dev/workspace/nrwl-workspace-overview)

## Create Worskpace

`npx create-nx-workspace` or `nx create-nx-workspace`

## Custom Generators

`nx g @nrwl/workspace:workspace-generator feature`
or
`nx workspace-generator feature`

## Moving Projects

`nx g @nrwl/workspace:move new/location/my-lib --projectName my-lib`

## Removing Projects

`nx g @nrwl/workspace:remove my-lib`

## Running Custom Commands

`nx g @nrwl/workspace:run-commands printhello --project my-feature-lib --command 'echo hello'`

## Add

`ng add @nrwl/angular`

`ng add @nrwl/react`

`ng add @nrwl/web`

`ng add @nrwl/nest`

`ng add @nrwl/express`

`ng add @nrwl/node`

## Affected

`nx affected:build`

`nx affected:e2e`

`nx affected:lint`

`nx affected:test`

## Build

`nx build my-app`

## Dependency graph

`nx dep-graph`

## End to end test

`nx e2e my-app`

## Generate

`nx g component my-component --project=my-app`

## Test

`nx test my-app`

