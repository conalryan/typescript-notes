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

## Angular

`nx g @nrwl/angular:app notes --directory frameworks/angular --routing ---style scss --standalone --e2eTestRunner none`

## js

`nx g @nrwl/js:lib data-structures --directory lang --unitTestRunner jest `

## web

`nx g @nrwl/web:app hello-world --directory build-tools/webpack --bundler webpack --unitTestRunner jest`
