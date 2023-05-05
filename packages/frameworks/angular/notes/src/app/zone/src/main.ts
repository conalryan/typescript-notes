import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/**
 * To turn off zones add
 * ```typescript
 * {ngZone: 'noop'} after bootstrapModule
 * ```
 * Also need to comment:
 * // import 'zone.js/dist/zone';  // Included with Angular CLI.
 * in polyfills.ts
 */
platformBrowserDynamic().bootstrapModule(AppModule, {ngZone: 'noop'})
  .catch(err => console.log(err));
