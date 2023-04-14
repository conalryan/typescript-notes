import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import {AppModuleNgFactory} from '../dist/out-tsc/src/app/app.module.ngfactory';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
 .catch(err => console.log(err));

// platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory)
//   .catch(err => console.log(err));
