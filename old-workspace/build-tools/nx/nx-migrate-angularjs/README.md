# nx migrate angularjs

https://nx.dev/migration/migration-angularjs

https://medium.com/@elenaorfe/migrate-angularjs-to-angular-through-angular-cli-hybrid-application-8790b272a1d7

`nx g @nrwl/angular:application angularjs-webpack-migration --e2eTestRunner=protractor --unitTestRunner=karma`

---

Steps from https://medium.com/@elenaorfe/migrate-angularjs-to-angular-through-angular-cli-hybrid-application-8790b272a1d7

1. `npm install -g @angular/cli`

2. `ng new angularjs-to-angular`

3. Copy AngularJS code

- Copy /app dir

- Copy package.json deps

- Add third party libs ~jquery, bootstrap, lodash to project.json scripts

- Import bootstrap in styles.scss

- Import appjs module into main.ts

- Replace index.html with ajs version

4. Hybrid Bootstrap `npm install @angular/upgrade --save`

- Update app.module.ts

5. Set angular as global var in main.ts


Try running

ERROR: npm i --save-dev @types/angular

ERROR: `npm i --save-dev @types/node`

Add runs but AngularJS is not working

---

Try steps in nx

`nx g @nrwl/angular:application phonecat --e2eTestRunner=protractor --unitTestRunner=karma`
