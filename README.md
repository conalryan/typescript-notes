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


## Web-components
`yarn add -D @nrwl/web`

`nx g @nrwl/web:app hello-world --bundler webpack --directory web-components --e2eTestRunner none --style scss --unitTestRunner none`

## lang

`nx g @nrwl/js:lib basic --directory lang/ts --unitTestRunner none`
