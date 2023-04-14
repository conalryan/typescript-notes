import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/**
 * The first part of the statement platformBrowserDynamic() creates a platform.
 * Angular docs describe the platform as:
 * - The entry point for Angular on a web page.
 * - Each page has exactly one platform, and services (such as reflection) which are common to every Angular application
 *   running on the page are bound in its scope.
 *
 * https://angular.io/api/core/ApplicationRef
 */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
