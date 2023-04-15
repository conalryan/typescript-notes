# Typescript Notes

## Workspace
--preset
"angular-monorepo"
"angular-standalone"
"angular"
"apps"
"core"
"empty"
"expo"
"express"
"nest"
"next"
"node-standalone"
"npm"
"react-monorepo"
"react-native"
"react-standalone"
"react"
"ts"
"web-components"

*ts means packages

`npx create-nx-workspace@15 typescript-notes --preset=ts --nxCloud false --defaultBase master --packageManager yarn`

## web-components
`yarn add -D @nrwl/web`

`nx g @nrwl/web:app hello-world --bundler webpack --directory web-components --e2eTestRunner none --style scss --unitTestRunner none`

## lang
`nx g @nrwl/js:lib basic --directory lang/ts --unitTestRunner none`

## design-patterns
`nx g @nrwl/js:lib functional-programming --bundler tsc --directory design-patterns --unitTestRunner jest`

`nx g @nrwl/js:lib iterator --bundler tsc --directory design-patterns --unitTestRunner jest`

`nx g @nrwl/js:lib observer --bundler tsc --directory design-patterns --unitTestRunner jest`

`nx g @nrwl/js:lib reactor --bundler tsc --directory design-patterns --unitTestRunner jest`

## node
`yarn add -D @nrwl/node`

`nx g @nrwl/node:lib commonjs --directory node --unitTestRunner none`

`nx g @nrwl/node:lib esm --directory node --unitTestRunner none`
