import {LOCALE_ID, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {UnicodeLanguageId} from './unicode-language-id';

// Use the require method provided by webpack
declare const require;
// Find user's lang in locale storage, else browser lang, else default to 'en-US'
const localeInStorage = localStorage.getItem('localeId');
const browserLang = window.navigator.language || /* IE */ window.navigator['userLanguage'];
const userLang = localeInStorage ? localeInStorage : browserLang ? browserLang : 'en-US';

export class Locale {

  private static _id: string = userLang;
  private static _boostrapProviders: any[];
  private static _moduleProvider: {};

  private constructor() {
    // prevent instantiation
  }

  static get id(): string {
    return this._id;
  }

  /**
   * Find translation file for user's lang and set providers accordingly
   * Use the webpack raw-loader to return the content as a string
   *
   * @returns {any}
   */
  static get boostrapProviders() {
    /*switch (Locale._id) {
      case UnicodeLanguageId.EN_US:
        // it's the default yo, don't do shit
        break;
      case UnicodeLanguageId.FR:
        Locale._boostrapProviders = [
          {provide: TRANSLATIONS, useValue: require(`raw-loader!./locale/messages.fr.xlf`)},
          {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
        ];
        break;
    }*/
    Locale.setProviders();
    return this._boostrapProviders;
  }

  static get moduleProvider() {
    /*switch (Locale._id) {
      case UnicodeLanguageId.EN_US:
        // it's the default yo, don't do shit
        break;
      case UnicodeLanguageId.FR:
        Locale._boostrapProviders = [
          {provide: TRANSLATIONS, useValue: require(`raw-loader!./locale/messages.fr.xlf`)},
          {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
        ];
        break;
    }*/
    Locale.setProviders();
    return this._boostrapProviders;
  }

  private static setProviders() {
    switch (Locale._id) {
      case UnicodeLanguageId.EN_US:
        // it's the default yo, don't do shit
        break;
      case UnicodeLanguageId.FR:
        Locale._boostrapProviders = [
          {provide: TRANSLATIONS, useValue: require(`raw-loader!./messages.fr.xlf`)},
          {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
        ];
        Locale._moduleProvider = {provide: LOCALE_ID, useValue: 'fr'};
        break;
    }
  }
}
