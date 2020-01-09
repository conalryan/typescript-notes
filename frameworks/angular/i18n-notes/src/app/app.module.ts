import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';

import {AppComponent} from './app.component';

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {UnicodeLanguageId} from '../locale/unicode-language-id';
import {FormsModule} from '@angular/forms';

// Register all the langs supported
registerLocaleData(localeFr, localeFrExtra);

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
    providers = [{provide: LOCALE_ID, useValue: 'fr'}];
    break;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule {
}
