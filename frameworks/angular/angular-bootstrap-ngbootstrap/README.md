# Angular - Bootstrap - Ngbootstrap

1. Create the new app
```bash
ng g angular-bootstrap-ngbootstrap --style scss
```

2. Install Bootstrap
```bash
npm install bootstrap@4.0.0-beta.2
```

3. Add Bootstrap to styles.scss
```scss
@import "~bootstrap/scss/bootstrap.scss";
```

4. Install NgBootstrap
```bash
npm install --save @ng-bootstrap/ng-bootstrap
```

5. Add NgBootstrap to the app module imports
```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```
