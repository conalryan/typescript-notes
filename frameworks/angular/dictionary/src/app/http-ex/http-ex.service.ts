import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError} from 'rxjs/operators';

const reqresUrl = 'https://reqres.in/api/';

@Injectable({
  providedIn: 'root'
})
export class HttpExService {

  constructor(private _httpClient: HttpClient) { }

  getUsers() {
    return this._httpClient.get(`${reqresUrl}users`);
  }

  makeIntentionalError() {
    return this._httpClient.get('not/a/real/url')
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
