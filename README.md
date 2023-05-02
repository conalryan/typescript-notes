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

`nx g @nrwl/web:app component-library --bundler webpack --directory web-components --e2eTestRunner none --style scss --unitTestRunner none`

`nx g @nrwl/web:app notes --bundler webpack --directory web-components --e2eTestRunner none --style scss --unitTestRunner none`

`nx g @nrwl/web:app practical-web-components --bundler webpack --directory web-components/tutorial --e2eTestRunner none --style scss --unitTestRunner none`

`nx g @nrwl/web:app fifty-projects --bundler webpack --directory web-components/tutorial --e2eTestRunner none --style scss --unitTestRunner none`

## lang
`nx g @nrwl/js:lib basic --directory lang/ts --unitTestRunner none`

`nx g @nrwl/web:app scss --directory lang --unitTestRunner none`

`nx g @nrwl/js:lib algorithms --directory lang`

## design-patterns
`nx g @nrwl/js:lib functional-programming --bundler tsc --directory design-patterns --unitTestRunner jest`

`nx g @nrwl/js:lib iterator --bundler tsc --directory design-patterns --unitTestRunner jest`

`nx g @nrwl/js:lib observer --bundler tsc --directory design-patterns --unitTestRunner jest`

`nx g @nrwl/js:lib reactor --bundler tsc --directory design-patterns --unitTestRunner jest`

## node
`yarn add -D @nrwl/node`

`nx g @nrwl/node:lib commonjs --directory node --unitTestRunner none`

`nx g @nrwl/node:lib esm --directory node --unitTestRunner none`

---

# cleanup

## design-patterns

- functional-programming
- iterator
- observer
- reactor

## lang

- algorithm
- ts

## node

- commonjs
- esm

## web-components

- component-lbrary
- hello-world
- notes
- tutorial

---

## remove

`nx g @nrwl/web:app scss --directory lang --unitTestRunner none`

`nx g @nrwl/workspace:remove scss --directory lang`

 >  NX   Cannot find configuration for 'scss'

`nx g @nrwl/workspace:remove scss`

 >  NX   Cannot find configuration for 'scss'

 `nx g @nrwl/workspace:remove lang/scss`

 >  NX   Cannot find configuration for 'lang/scss'

