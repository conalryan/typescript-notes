# NX

## Install

`npm i -g @angular/cli @nrwl/cli nx`

`npm i -g @angular-devkit/schematics-cli @nrwl/schematics @ngrx/schematics`

---

# [Workspace](https://nx.dev/workspace/nrwl-workspace-overview)

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

---

cr. here

## [Workspace](https://nx.dev/cli/create-nx-workspace)

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

``

### [Core](https://nx.dev/getting-started/nx-core)

1. `npx create-nx-workspace@latest npx-create-nx-workspace-preset-core --preset=core --nxCloud=false`

2. Create an NPM package

`nx g npm-package nx-g-npm-package`

3. Test cache

`nx test nx-g-npm-package`

And if you invoke this command a second time, the results are retrieved from cache.

### [Typescript](https://nx.dev/getting-started/nx-and-typescript)

1. `npx create-nx-workspace npx-create-nx-workspace-preset-ts --preset=ts --nxCloud=false`

2. `nx generate @nrwl/js:library --name=hello-tsc --buildable`

3. `npm i --save-dev @nrwl/node`
`nx generate @nrwl/node:app demonodeapp`

4. `npm i --save-dev @nrwl/web`
`nx generate @nrwl/web:app demowebapp`

5. `nx serve demowebapp`


# NPX Create NX Workspace v11 Angular Preset

# Quick start

1. Install cLI
`npm i g @nrwl/cli`
or
`npm i @nrwl/cli@11`

2. Create workspace
`npm i create-nx-workspace@11`

`npx create-nx-workspace@11 npx-create-nx-workspace-at-eleven-preset-angular --preset=angular`

`npx create-nx-workspace@11 some-org --appName=some-app --cli=nx --interactive=false --linter=eslint --nxCloud=false --packageManager=npm --preset=angular --style=scss`

`npx create-nx-workspace@11 akamai --appName=ng-property-manager --cli=angular --interactive=false --linter=eslint --nxCloud=false --packageManager=npm --prefix=pm --preset=angular --style=scss`

The some-org turns into the prefix, so npmScope in nx.json must match prefix else
```
InvalidInputOptions [Error]: Schematic input does not validate against the Schema: {"name":"example-angular-app","inlineStyle":false,"inlineTemplate":false,"prefix":"@akamai","skipTests":false,"style":"scss","enableIvy":true,"routing":false,"skipInstall":true,"skipPackageJson":false}
Errors:

  Data path ".prefix" should match format "html-selector".
```

Under the hood nx changes `ng` to point to `nx` so might as well use `nx` explicitly.
serve `ng serve some-angular-app` or `nx serve some-angular-app`

3. Add Angular App
`nx g @nrwl/angular:app example-angular-app --routing`

build `nx build example-angular-app` is alias for `nx run example-angular-app:build`
e2e `nx e2e example-angular-app-e2e` is alias for `nx run example-angular-app-e2e:e2e`
lint `nx lint example-angular-app` is alias for `nx run example-angular-app:lint`
serve `nx serve example-angular-app` is alias for `nx run example-angular-app:serve`
test `nx test example-angular-app` is alias for `nx run example-angular-app:test`

4. Add Angular Lib
`nx g @nrwl/angular:lib example-angular-lib`

if you have a buildable lib? build `nx build example-angular-app` is alias for `nx run example-angular-app:build`
lint `nx lint example-angular-app` is alias for `nx run example-angular-app:lint`
test `nx test example-angular-app` is alias for `nx run example-angular-app:test`

### Options
name (required)
Type: string
The name of the library.

buildable
Default: false
Type: boolean
Generate a buildable library.

directory
Type: string
A directory where the library is placed.

importPath
Type: string
The library name used to import it, like @myorg/my-awesome-lib. Must be a valid npm name.

lazy
Default: false
Type: boolean
Add RouterModule.forChild when set to true, and a simple array of routes when set to false.

parentModule
Type: string
Update the router configuration of the parent module using loadChildren or children, depending on what lazy is set to.

prefix
Alias(es): p
Type: string
The prefix to apply to generated selectors.

publishable
Default: false
Type: boolean
Generate a publishable library.

routing
Default: false
Type: boolean
Add router configuration. See lazy for more information.

simpleModuleName
Default: false
Type: boolean
Keep the module name simple (when using --directory).

tags
Type: string
Add tags to the library (used for linting).

`ng g @nrwl/angular:lib --name='data-access' --directory='authz/groups' --importPath='@akamai/authz/groups/data-access' --prefix='pm' -tags='scope:authz,type:data-access'`
`ng g @nrwl/angular:lib --name='feature' --directory='authz/groups' --importPath='@akamai/authz/groups/feature' --prefix='pm' -tags='scope:authz,type:feature'`

5. Add Express App
`ng add @nrwl/express`
or
`ng add @nrwl/express@11`

ERROR
Can only convert projects with one app
Your workspace could not be converted into an Nx Workspace because of the above error.
Can only convert projects with one app

cr. Would npm i --save-dev @nrwl/express@11 work?

`nx g @nrwl/express:app example-express-app`

build `nx build example-express-app` is alias for `nx run example-express-app:build`
lint `nx lint example-express-app` is alias for `nx run example-express-app:lint`
serve `nx serve example-express-app` is alias for `nx run example-express-app:serve`
test `nx test example-express-app` is alias for `nx run example-express-app:test`

6. Add Express for Frontend
`nx g @nrwl/express:app example-express-frontendProject --frontendProject example-angular-app`

7. Add Nest App
`ng add @nrwl/nest`
or
`ng add @nrwl/nest@11`
or
`npm i --save-dev @nrwl/nest@11`

`nx g @nrwl/nest:app example-nest-app`

8. Add Nest for Frontend
`nx g @nrwl/nest:app example-nest-frontendProject --frontendProject some-angular-app`

9. Add nest lib
`ng g @nrwl/nest:lib example-nest-lib`

## Generate

### angular
```sh
nx g @nrwl/angular:app example-angular-app
nx g @nrwl/angular:library example-angular-lib
```

### express
```sh
nx g @nrwl/express:app example-express-app
nx g @nrwl/express:app example-express-frontendProject --frontendProject example-angular-app
```

### nest
```sh
nx g @nrwl/nest:app example-nest-app
```

### node
```sh
nx g @nrwl/node:app example-node-app
nx g @nrwl/node:library example-node-lib
```

### react
```sh
nx g @nrwl/react:app example-react-app
nx g @nrwl/react:library example-react-lib
```

### web
```sh
nx g @nrwl/web:app exmaple-web-app
```

---

# NPX Create NX Workspace v11 Angular Preset
round 2

```sh
❯ nvm use v12
Now using node v12.22.6 (npm v6.14.15)
❯ npx create-nx-workspace@v11 npx-create-nx-workspace-v-eleven-angular --preset=angular
npx: installed 66 in 15.191s
? Application name                    some-app
? Default stylesheet format           SASS(.scss)  [ http://sass-lang.com   ]
? Default linter                      ESLint [ Modern linting tool ]
? Use Nx Cloud? (It's free and doesn't require registration.) No

>  NX  Nx is creating your workspace.
```


---

# NPX Create NX Workspace v11 Express Preset

## Quick Start

1. Create Workspace
`npx create-nx-workspace@v11 npx-create-nx-workspace-eleven-express --preset=express`

serve `nx serve example-express-preset-app`

---

# NPX Create NX Workspace v11 Nest Preset

## Quick Start

1. Create Workspace
`npx create-nx-workspace@v11 npx-create-nx-workspace-eleven-nest --preset=nest`

serve `nx serve example-nest-preset-app`

# NPX Create NX Workspace v13 Angular Preset

## Quick Start

1. Create Workspace
`npx create-nx-workspace --preset=angular`

`npm install -g nx`

`nx serve my-app`

# NPX Create NX Workspace v13 Angular Preset into MFE

## Quick Start

1. Create Workspace
`npx create-nx-workspace --preset=angular`

`npm install -g nx`

`nx serve my-app`


2. Convert app into mfe
`nx generate setup-mfe`
or
`nx g @nrwl/angular:setup-mfe`
```


