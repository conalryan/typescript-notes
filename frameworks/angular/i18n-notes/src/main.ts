import {enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {UnicodeLanguageId} from './locale/unicode-language-id';

if (environment.production) {
  enableProdMode();
}

// Find user's lang in locale storage, else browser lang, else default to 'en-US'
const localeInStorage = localStorage.getItem('localeId');
const browserLang = window.navigator.language || /* IE */ window.navigator['userLanguage'];
const userLang = localeInStorage ? localeInStorage : browserLang ? browserLang : 'en-US';

// Find translation file for user's lang and set providers accordingly
// Use the require method provided by webpack and use the webpack raw-loader to return the content as a string
declare const require;
let providers = [];
switch (userLang) {
  case UnicodeLanguageId.EN_US:
    // it's the default yo, don't do shit
    break;
  case UnicodeLanguageId.FR:
    providers = [
      {provide: TRANSLATIONS, useValue: require(`raw-loader!./locale/messages.fr.xlf`)},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
    ];
    break;
}

// Set providers to bootstrap
platformBrowserDynamic().bootstrapModule(AppModule, {providers});
