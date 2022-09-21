# Nx Mfe

1. `npx create-nx-workspace@latest nx-mfe --preset=empty`

2. `npm install --save-dev @nrwl/angular`

3. `nx g @nrwl/angular:host shell --remotes=shop,cart`
`nx g @nrwl/angular:remote about --host=shell`

4. `nx serve shell --open`

or `nx serve shell --open --devRemotes=shop,cart`
